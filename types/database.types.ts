/**
 * Tipos para las filas de Supabase (Database layer).
 * Placeholder: se actualizará cuando se integren las migraciones reales.
 *
 * Convención de nombres:
 *  - `Db*`      → fila tal como viene de la base de datos (snake_case)
 *  - `Db*Insert` → campos necesarios para crear un registro
 *  - `Db*Update` → campos opcionales para actualizar un registro
 */

// ─── question_sets ────────────────────────────────────────────────────────────

export interface DbQuestionSet {
  id: string
  title: string
  description: string | null
  user_id: string | null
  created_at: string
  updated_at: string
}

export interface DbQuestionSetInsert {
  title: string
  description?: string | null
  user_id?: string | null
}

export interface DbQuestionSetUpdate {
  title?: string
  description?: string | null
  updated_at?: string
}

// ─── questions ────────────────────────────────────────────────────────────────

export interface DbQuestion {
  id: string
  question_set_id: string
  text: string
  created_at: string
}

export interface DbQuestionInsert {
  question_set_id: string
  text: string
}

export interface DbQuestionUpdate {
  text?: string
}

// ─── answers ─────────────────────────────────────────────────────────────────

export interface DbAnswer {
  id: string
  question_id: string
  text: string
  points: number
  order_index: number
}

export interface DbAnswerInsert {
  question_id: string
  text: string
  points: number
  order_index: number
}

export interface DbAnswerUpdate {
  text?: string
  points?: number
  order_index?: number
}

// ─── games ────────────────────────────────────────────────────────────────────

export interface DbGame {
  id: string
  user_id: string | null
  question_set_id: string
  team1_name: string
  team1_score: number
  team2_name: string
  team2_score: number
  winner: 'team1' | 'team2' | 'draw'
  total_rounds: number
  completed_at: string
  created_at: string
}

export interface DbGameInsert {
  user_id?: string | null
  question_set_id: string
  team1_name: string
  team1_score: number
  team2_name: string
  team2_score: number
  winner: 'team1' | 'team2' | 'draw'
  total_rounds: number
  completed_at: string
}
