/**
 * Queries y funciones reutilizables para todas las operaciones de base de datos.
 * Cada función recibe un SupabaseClient ya inicializado (browser o server)
 * y mapea las filas DB (snake_case) a los tipos de la app (camelCase).
 *
 * Uso:
 *   import { questionSetQueries } from '@/lib/supabase/queries'
 *   import { createClient } from '@/lib/supabase/client'
 *
 *   const supabase = createClient()
 *   const sets = await questionSetQueries.getUserSets(supabase, userId)
 */

import type { SupabaseClient } from '@supabase/supabase-js'

import type { Answer, Question, QuestionSet, QuestionSetSummary } from '@/types/question.types'
import type { GameResult } from '@/types/game.types'
import type {
  DbAnswer,
  DbAnswerInsert,
  DbAnswerUpdate,
  DbGame,
  DbGameInsert,
  DbGameRound,
  DbGameRoundInsert,
  DbGameRoundUpdate,
  DbQuestion,
  DbQuestionInsert,
  DbQuestionSet,
  DbQuestionSetInsert,
  DbQuestionSetUpdate,
  DbQuestionUpdate,
} from '@/types/database.types'

// ─── Tipos internos para filas anidadas de Supabase ──────────────────────────

type QuestionRowWithAnswers = DbQuestion & { answers: DbAnswer[] }
type QuestionSetRowFull = DbQuestionSet & { questions: QuestionRowWithAnswers[] }
type QuestionSetRowSummary = DbQuestionSet & { questions: { id: string }[] }

// ─── Mapper functions: DB → App ───────────────────────────────────────────────

function toAnswer(row: DbAnswer): Answer {
  return {
    id: row.id,
    text: row.answer_text,
    points: row.points,
    orderIndex: row.order_index,
  }
}

function toQuestion(row: QuestionRowWithAnswers): Question {
  return {
    id: row.id,
    text: row.question_text,
    multiplier: row.multiplier,
    answers: [...(row.answers ?? [])]
      .sort((a, b) => a.order_index - b.order_index)
      .map(toAnswer),
  }
}

function toQuestionSet(row: QuestionSetRowFull): QuestionSet {
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
      .map(toQuestion),
  }
}

function toQuestionSetSummary(row: QuestionSetRowSummary): QuestionSetSummary {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    isPublic: row.is_public,
    questionCount: row.questions?.length ?? 0,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toGameResult(row: DbGame): GameResult {
  return {
    id: row.id,
    team1: { name: row.team1_name, score: row.team1_score },
    team2: { name: row.team2_name, score: row.team2_score },
    winner: (row.winner ?? 'draw') as 'team1' | 'team2' | 'draw',
    totalRounds: row.total_rounds,
    completedAt: row.finished_at ?? row.created_at,
    questionSetId: row.set_id ?? '',
  }
}

// ─── questionSetQueries ───────────────────────────────────────────────────────

export const questionSetQueries = {
  /**
   * Obtiene todos los sets del usuario (públicos y privados).
   * Retorna resúmenes con el conteo de preguntas, sin cargar respuestas.
   */
  async getUserSets(
    supabase: SupabaseClient,
    userId: string
  ): Promise<QuestionSetSummary[]> {
    const { data, error } = await supabase
      .from('question_sets')
      .select('*, questions(id)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`getUserSets: ${error.message}`)
    return (data as unknown as QuestionSetRowSummary[]).map(toQuestionSetSummary)
  },

  /**
   * Obtiene todos los sets marcados como públicos.
   * Retorna resúmenes con el conteo de preguntas.
   */
  async getPublicSets(supabase: SupabaseClient): Promise<QuestionSetSummary[]> {
    const { data, error } = await supabase
      .from('question_sets')
      .select('*, questions(id)')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`getPublicSets: ${error.message}`)
    return (data as unknown as QuestionSetRowSummary[]).map(toQuestionSetSummary)
  },

  /**
   * Obtiene un set completo con todas sus preguntas y respuestas anidadas.
   * Lanza error si el set no existe o el usuario no tiene acceso.
   */
  async getSet(supabase: SupabaseClient, setId: string): Promise<QuestionSet> {
    const { data, error } = await supabase
      .from('question_sets')
      .select('*, questions(*, answers(*))')
      .eq('id', setId)
      .single()

    if (error) throw new Error(`getSet: ${error.message}`)
    return toQuestionSet(data as unknown as QuestionSetRowFull)
  },

  /**
   * Crea un nuevo set de preguntas vacío para el usuario dado.
   * Las preguntas se agregan después con `questionQueries.createQuestion`.
   */
  async createSet(
    supabase: SupabaseClient,
    userId: string,
    data: Pick<DbQuestionSetInsert, 'title' | 'description' | 'is_public'>
  ): Promise<QuestionSet> {
    const { data: row, error } = await supabase
      .from('question_sets')
      .insert({ ...data, user_id: userId })
      .select()
      .single()

    if (error) throw new Error(`createSet: ${error.message}`)

    // Recién creado: no tiene preguntas aún
    return toQuestionSet({ ...(row as unknown as DbQuestionSet), questions: [] })
  },

  /**
   * Actualiza los metadatos de un set (título, descripción, visibilidad).
   * Retorna el set completo con todas sus preguntas y respuestas.
   */
  async updateSet(
    supabase: SupabaseClient,
    setId: string,
    data: DbQuestionSetUpdate
  ): Promise<QuestionSet> {
    const { error } = await supabase
      .from('question_sets')
      .update(data)
      .eq('id', setId)

    if (error) throw new Error(`updateSet: ${error.message}`)

    // Refetch con datos completos tras la actualización
    return questionSetQueries.getSet(supabase, setId)
  },

  /**
   * Elimina un set y todas sus preguntas/respuestas (cascade).
   */
  async deleteSet(supabase: SupabaseClient, setId: string): Promise<void> {
    const { error } = await supabase.from('question_sets').delete().eq('id', setId)

    if (error) throw new Error(`deleteSet: ${error.message}`)
  },
}

// ─── questionQueries ──────────────────────────────────────────────────────────

export const questionQueries = {
  /**
   * Obtiene todas las preguntas de un set con sus respuestas anidadas,
   * ordenadas por `order_index`.
   */
  async getQuestionsForSet(
    supabase: SupabaseClient,
    setId: string
  ): Promise<Question[]> {
    const { data, error } = await supabase
      .from('questions')
      .select('*, answers(*)')
      .eq('set_id', setId)
      .order('order_index', { ascending: true })

    if (error) throw new Error(`getQuestionsForSet: ${error.message}`)
    return (data as unknown as QuestionRowWithAnswers[]).map(toQuestion)
  },

  /**
   * Crea una nueva pregunta dentro del set dado.
   * Las respuestas se agregan después con `answerQueries.createAnswer`.
   */
  async createQuestion(
    supabase: SupabaseClient,
    data: DbQuestionInsert
  ): Promise<Question> {
    const { data: row, error } = await supabase
      .from('questions')
      .insert(data)
      .select()
      .single()

    if (error) throw new Error(`createQuestion: ${error.message}`)
    return toQuestion({ ...(row as unknown as DbQuestion), answers: [] })
  },

  /**
   * Actualiza el texto, posición o multiplicador de una pregunta.
   * Retorna la pregunta con sus respuestas actuales.
   */
  async updateQuestion(
    supabase: SupabaseClient,
    questionId: string,
    data: DbQuestionUpdate
  ): Promise<Question> {
    const { error } = await supabase
      .from('questions')
      .update(data)
      .eq('id', questionId)

    if (error) throw new Error(`updateQuestion: ${error.message}`)

    // Refetch con respuestas
    const { data: row, error: fetchError } = await supabase
      .from('questions')
      .select('*, answers(*)')
      .eq('id', questionId)
      .single()

    if (fetchError) throw new Error(`updateQuestion (refetch): ${fetchError.message}`)
    return toQuestion(row as unknown as QuestionRowWithAnswers)
  },

  /**
   * Elimina una pregunta y todas sus respuestas (cascade).
   */
  async deleteQuestion(supabase: SupabaseClient, questionId: string): Promise<void> {
    const { error } = await supabase.from('questions').delete().eq('id', questionId)

    if (error) throw new Error(`deleteQuestion: ${error.message}`)
  },
}

// ─── answerQueries ────────────────────────────────────────────────────────────

export const answerQueries = {
  /**
   * Crea una nueva respuesta para la pregunta dada.
   */
  async createAnswer(supabase: SupabaseClient, data: DbAnswerInsert): Promise<Answer> {
    const { data: row, error } = await supabase
      .from('answers')
      .insert(data)
      .select()
      .single()

    if (error) throw new Error(`createAnswer: ${error.message}`)
    return toAnswer(row as unknown as DbAnswer)
  },

  /**
   * Actualiza el texto, puntos u orden de una respuesta.
   */
  async updateAnswer(
    supabase: SupabaseClient,
    answerId: string,
    data: DbAnswerUpdate
  ): Promise<Answer> {
    const { data: row, error } = await supabase
      .from('answers')
      .update(data)
      .eq('id', answerId)
      .select()
      .single()

    if (error) throw new Error(`updateAnswer: ${error.message}`)
    return toAnswer(row as unknown as DbAnswer)
  },

  /**
   * Elimina una respuesta.
   */
  async deleteAnswer(supabase: SupabaseClient, answerId: string): Promise<void> {
    const { error } = await supabase.from('answers').delete().eq('id', answerId)

    if (error) throw new Error(`deleteAnswer: ${error.message}`)
  },
}

// ─── gameQueries ──────────────────────────────────────────────────────────────

export const gameQueries = {
  /**
   * Crea un registro de partida nueva.
   * Retorna la fila DB directamente (sin mapear) para uso interno.
   */
  async createGame(supabase: SupabaseClient, data: DbGameInsert): Promise<DbGame> {
    const { data: row, error } = await supabase
      .from('games')
      .insert(data)
      .select()
      .single()

    if (error) throw new Error(`createGame: ${error.message}`)
    return row as unknown as DbGame
  },

  /**
   * Actualiza una partida (p.ej. al finalizarla: winner, finished_at, scores).
   */
  async updateGame(
    supabase: SupabaseClient,
    gameId: string,
    data: { team1_score?: number; team2_score?: number; winner?: 'team1' | 'team2' | 'draw' | null; finished_at?: string | null; duration_seconds?: number | null }
  ): Promise<DbGame> {
    const { data: row, error } = await supabase
      .from('games')
      .update(data)
      .eq('id', gameId)
      .select()
      .single()

    if (error) throw new Error(`updateGame: ${error.message}`)
    return row as unknown as DbGame
  },

  /**
   * Obtiene el historial de partidas completadas del usuario,
   * ordenadas de más reciente a más antigua.
   */
  async getGameHistory(
    supabase: SupabaseClient,
    userId: string
  ): Promise<GameResult[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('user_id', userId)
      .not('finished_at', 'is', null)
      .order('finished_at', { ascending: false })

    if (error) throw new Error(`getGameHistory: ${error.message}`)
    return (data as unknown as DbGame[]).map(toGameResult)
  },

  /**
   * Obtiene los detalles de una partida específica.
   */
  async getGameDetails(
    supabase: SupabaseClient,
    gameId: string
  ): Promise<GameResult> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single()

    if (error) throw new Error(`getGameDetails: ${error.message}`)
    return toGameResult(data as unknown as DbGame)
  },
}

// ─── gameRoundQueries ─────────────────────────────────────────────────────────

export const gameRoundQueries = {
  /**
   * Crea un registro de ronda para la partida dada.
   */
  async createRound(
    supabase: SupabaseClient,
    data: DbGameRoundInsert
  ): Promise<DbGameRound> {
    const { data: row, error } = await supabase
      .from('game_rounds')
      .insert(data)
      .select()
      .single()

    if (error) throw new Error(`createRound: ${error.message}`)
    return row as unknown as DbGameRound
  },

  /**
   * Obtiene todas las rondas de una partida, ordenadas por número de ronda.
   */
  async getRoundsForGame(
    supabase: SupabaseClient,
    gameId: string
  ): Promise<DbGameRound[]> {
    const { data, error } = await supabase
      .from('game_rounds')
      .select('*')
      .eq('game_id', gameId)
      .order('round_number', { ascending: true })

    if (error) throw new Error(`getRoundsForGame: ${error.message}`)
    return data as unknown as DbGameRound[]
  },

  /**
   * Actualiza una ronda (p.ej. al revelar respuestas o registrar el ganador).
   */
  async updateRound(
    supabase: SupabaseClient,
    roundId: string,
    data: DbGameRoundUpdate
  ): Promise<DbGameRound> {
    const { data: row, error } = await supabase
      .from('game_rounds')
      .update(data)
      .eq('id', roundId)
      .select()
      .single()

    if (error) throw new Error(`updateRound: ${error.message}`)
    return row as unknown as DbGameRound
  },
}
