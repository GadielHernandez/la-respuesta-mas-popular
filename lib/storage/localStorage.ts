import type { GameState, GameResult } from '@/types/game.types'
import type { QuestionSet } from '@/types/question.types'

// ─── Storage keys ────────────────────────────────────────────────────────────

const KEYS = {
  QUESTION_SETS: 'lrmp_question_sets',
  GAME_HISTORY: 'lrmp_game_history',
  CURRENT_GAME: 'lrmp_current_game',
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    // QuotaExceededError or SecurityError — surface to caller
    throw err
  }
}

// ─── Adaptador ───────────────────────────────────────────────────────────────

/**
 * Adaptador de persistencia sobre `localStorage`.
 *
 * Todas las operaciones son síncronas. Los errores de parseo se absorben
 * devolviendo el valor vacío; los errores de escritura (cuota excedida) se
 * propagan al llamador.
 *
 * Keys utilizados:
 * - `lrmp_question_sets`  — array de QuestionSet del usuario
 * - `lrmp_game_history`   — array de GameResult (partidas completadas)
 * - `lrmp_current_game`   — GameState de la partida en curso (nullable)
 */
export const localStorageAdapter = {
  // ── Question Sets ───────────────────────────────────────────────────────

  /** Devuelve todos los sets guardados. Retorna `[]` si no hay datos. */
  getQuestionSets(): QuestionSet[] {
    return readJSON<QuestionSet[]>(KEYS.QUESTION_SETS, [])
  },

  /**
   * Guarda o actualiza un set de preguntas.
   * Si ya existe un set con el mismo `id`, lo reemplaza.
   */
  saveQuestionSet(set: QuestionSet): void {
    const sets = this.getQuestionSets()
    const idx = sets.findIndex(s => s.id === set.id)
    if (idx >= 0) {
      sets[idx] = set
    } else {
      sets.push(set)
    }
    writeJSON(KEYS.QUESTION_SETS, sets)
  },

  /** Elimina el set con el `id` dado. No-op si no existe. */
  deleteQuestionSet(setId: string): void {
    const sets = this.getQuestionSets().filter(s => s.id !== setId)
    writeJSON(KEYS.QUESTION_SETS, sets)
  },

  // ── Game History ────────────────────────────────────────────────────────

  /** Devuelve el historial de partidas completadas. */
  getGameHistory(): GameResult[] {
    return readJSON<GameResult[]>(KEYS.GAME_HISTORY, [])
  },

  /** Agrega un resultado al historial. */
  saveGameHistory(result: GameResult): void {
    const history = this.getGameHistory()
    history.push(result)
    writeJSON(KEYS.GAME_HISTORY, history)
  },

  // ── Current Game ────────────────────────────────────────────────────────

  /** Devuelve el estado de la partida en curso, o `null` si no hay ninguna. */
  getCurrentGame(): GameState | null {
    return readJSON<GameState | null>(KEYS.CURRENT_GAME, null)
  },

  /** Persiste el estado actual de la partida (checkpoint). */
  saveCurrentGame(state: GameState): void {
    writeJSON(KEYS.CURRENT_GAME, state)
  },

  /** Elimina la partida en curso (tras completarla o reiniciarla). */
  clearCurrentGame(): void {
    try {
      localStorage.removeItem(KEYS.CURRENT_GAME)
    } catch {
      // Ignorar errores de acceso — browser en modo incógnito restringido
    }
  },
}
