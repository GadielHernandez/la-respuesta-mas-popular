/**
 * Adaptador de persistencia sobre Supabase.
 *
 * Expone la misma API que `localStorageAdapter` pero usando Supabase
 * como backend. La función factory recibe un `SupabaseClient` ya
 * inicializado (browser o server) y retorna el adaptador.
 *
 * Uso:
 *   import { supabaseStorageAdapter } from '@/lib/storage/supabaseStorage'
 *   import { createClient } from '@/lib/supabase/client'
 *
 *   const adapter = supabaseStorageAdapter(createClient())
 *   const sets = await adapter.getQuestionSets(userId)
 *
 * Nota sobre loading states:
 *   Todas las funciones son async. El llamador es responsable de manejar
 *   los estados de carga (isLoading, error) en el hook o componente.
 *
 * Nota sobre estado actual de partida:
 *   getCurrentGame / saveCurrentGame / clearCurrentGame usan localStorage
 *   como almacenamiento transiente (rápido, sin latencia de red). El estado
 *   en curso se sincroniza a Supabase solo al finalizar la partida via
 *   saveGameHistory.
 */

import type { SupabaseClient } from '@supabase/supabase-js'

import type { Answer, Question, QuestionSet } from '@/types/question.types'
import type { GameResult, GameState } from '@/types/game.types'
import type { DbAnswer, DbQuestion, DbQuestionSet } from '@/types/database.types'
import { questionSetQueries, gameQueries } from '@/lib/supabase/queries'

// ─── Interfaz pública del adaptador ──────────────────────────────────────────

/**
 * Contrato de la capa de storage. Implementado por `localStorageAdapter`
 * (síncrono) y `supabaseStorageAdapter` (async). El `storageManager` usa
 * esta interfaz para elegir el adaptador correcto según el estado de auth.
 */
export interface StorageAdapter {
  getQuestionSets(userId?: string): Promise<QuestionSet[]> | QuestionSet[]
  saveQuestionSet(set: QuestionSet, userId?: string): Promise<void> | void
  deleteQuestionSet(setId: string): Promise<void> | void
  getGameHistory(userId?: string): Promise<GameResult[]> | GameResult[]
  saveGameHistory(result: GameResult, userId?: string): Promise<void> | void
  getCurrentGame(): GameState | null
  saveCurrentGame(state: GameState): void
  clearCurrentGame(): void
}

// ─── Retry helper ─────────────────────────────────────────────────────────────

const RETRY_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 500

/**
 * Ejecuta `fn` hasta `attempts` veces con backoff lineal entre reintentos.
 * Solo reintenta en errores de red (no en errores 4xx de la app).
 */
async function withRetry<T>(fn: () => Promise<T>, attempts = RETRY_ATTEMPTS): Promise<T> {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      const isNetworkError =
        err instanceof Error &&
        (err.message.includes('fetch') ||
          err.message.includes('network') ||
          err.message.includes('timeout'))
      // Solo reintenta en errores de red; falla inmediatamente en errores de app
      if (!isNetworkError || i === attempts - 1) break
      await new Promise(resolve => setTimeout(resolve, RETRY_BASE_DELAY_MS * (i + 1)))
    }
  }
  throw lastError
}

// ─── Mapper functions: DB row → App type ──────────────────────────────────────

type AnswerRow = DbAnswer
type QuestionRow = DbQuestion & { answers: AnswerRow[] }
type QuestionSetRow = DbQuestionSet & { questions: QuestionRow[] }

function rowToAnswer(row: AnswerRow): Answer {
  return {
    id: row.id,
    text: row.answer_text,
    points: row.points,
    orderIndex: row.order_index,
  }
}

function rowToQuestion(row: QuestionRow): Question {
  return {
    id: row.id,
    text: row.question_text,
    multiplier: row.multiplier,
    answers: [...(row.answers ?? [])]
      .sort((a, b) => a.order_index - b.order_index)
      .map(rowToAnswer),
  }
}

function rowToQuestionSet(row: QuestionSetRow): QuestionSet {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    isPublic: row.is_public,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    questions: [...(row.questions ?? [])]
      .sort((a, b) => a.order_index - b.order_index)
      .map(rowToQuestion),
  }
}

// ─── Current game key (localStorage) ─────────────────────────────────────────

const CURRENT_GAME_KEY = 'lrmp_current_game'

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Crea el adaptador de Supabase storage para el cliente dado.
 * @param supabase - SupabaseClient ya inicializado (browser o server)
 */
export const supabaseStorageAdapter = (supabase: SupabaseClient): StorageAdapter => ({
  // ── Question Sets ───────────────────────────────────────────────────────

  /**
   * Obtiene todos los sets del usuario con sus preguntas y respuestas anidadas.
   * Equivalente a `localStorageAdapter.getQuestionSets()`.
   */
  async getQuestionSets(userId: string): Promise<QuestionSet[]> {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('question_sets')
        .select('*, questions(*, answers(*))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw new Error(`getQuestionSets: ${error.message}`)
      return (data as unknown as QuestionSetRow[]).map(rowToQuestionSet)
    })
  },

  /**
   * Guarda o actualiza un set completo: upserta el set, sus preguntas y
   * sus respuestas. No elimina preguntas/respuestas que hayan sido quitadas
   * del set — usar `questionQueries.deleteQuestion` para eso.
   * Equivalente a `localStorageAdapter.saveQuestionSet(set)`.
   */
  async saveQuestionSet(set: QuestionSet, userId: string): Promise<void> {
    return withRetry(async () => {
      // 1. Upsert del question_set
      const { error: setError } = await supabase.from('question_sets').upsert({
        id: set.id,
        user_id: userId,
        title: set.title,
        description: set.description ?? null,
        is_public: set.isPublic,
      })
      if (setError) throw new Error(`saveQuestionSet (set): ${setError.message}`)

      // 2. Upsert de cada pregunta y sus respuestas
      for (let qi = 0; qi < set.questions.length; qi++) {
        const q = set.questions[qi]

        const { error: qError } = await supabase.from('questions').upsert({
          id: q.id,
          set_id: set.id,
          question_text: q.text,
          order_index: qi,
          multiplier: q.multiplier ?? 1,
        })
        if (qError) throw new Error(`saveQuestionSet (question ${q.id}): ${qError.message}`)

        for (let ai = 0; ai < q.answers.length; ai++) {
          const a = q.answers[ai]

          const { error: aError } = await supabase.from('answers').upsert({
            id: a.id,
            question_id: q.id,
            answer_text: a.text,
            points: a.points,
            order_index: ai,
          })
          if (aError) throw new Error(`saveQuestionSet (answer ${a.id}): ${aError.message}`)
        }
      }
    })
  },

  /**
   * Elimina un set y todas sus preguntas/respuestas (cascade).
   * Equivalente a `localStorageAdapter.deleteQuestionSet(setId)`.
   */
  async deleteQuestionSet(setId: string): Promise<void> {
    return withRetry(() => questionSetQueries.deleteSet(supabase, setId))
  },

  // ── Game History ────────────────────────────────────────────────────────

  /**
   * Obtiene el historial de partidas completadas del usuario.
   * Equivalente a `localStorageAdapter.getGameHistory()`.
   */
  async getGameHistory(userId: string): Promise<GameResult[]> {
    return withRetry(() => gameQueries.getGameHistory(supabase, userId))
  },

  /**
   * Persiste una partida completada en el historial.
   * Equivalente a `localStorageAdapter.saveGameHistory(result)`.
   */
  async saveGameHistory(result: GameResult, userId: string): Promise<void> {
    return withRetry(async () => {
      await gameQueries.createGame(supabase, {
        user_id: userId,
        set_id: result.questionSetId || null,
        team1_name: result.team1.name,
        team2_name: result.team2.name,
        team1_score: result.team1.score,
        team2_score: result.team2.score,
        winner: result.winner,
        total_rounds: result.totalRounds,
        finished_at: result.completedAt,
      })
    })
  },

  // ── Current Game (localStorage) ────────────────────────────────────────
  // El estado en curso es transiente: se guarda localmente para acceso
  // rápido sin latencia de red. Se persiste en Supabase al finalizar
  // la partida via saveGameHistory.

  /** Devuelve el estado de la partida en curso, o `null` si no hay ninguna. */
  getCurrentGame(): GameState | null {
    try {
      const raw = localStorage.getItem(CURRENT_GAME_KEY)
      return raw ? (JSON.parse(raw) as GameState) : null
    } catch {
      return null
    }
  },

  /** Persiste el estado actual de la partida (checkpoint). */
  saveCurrentGame(state: GameState): void {
    try {
      localStorage.setItem(CURRENT_GAME_KEY, JSON.stringify(state))
    } catch (err) {
      throw err
    }
  },

  /** Elimina la partida en curso (tras completarla o reiniciarla). */
  clearCurrentGame(): void {
    try {
      localStorage.removeItem(CURRENT_GAME_KEY)
    } catch {
      // Ignorar errores en modo incógnito restringido
    }
  },
})

/** Alias para el tipo de retorno del adaptador Supabase. */
export type SupabaseStorageAdapter = StorageAdapter
