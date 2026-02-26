/**
 * Tipos para las filas de Supabase (Database layer).
 * Refleja el schema definido en supabase/migrations/20260226120000_initial_schema.sql
 *
 * Convención de nombres:
 *  - `Db*`       → fila tal como viene de la base de datos (snake_case)
 *  - `Db*Insert` → campos necesarios para crear un registro (omite id, created_at, etc.)
 *  - `Db*Update` → campos opcionales para actualizar un registro
 */

// ─── profiles ─────────────────────────────────────────────────────────────────

export interface DbProfile {
  id: string
  username: string | null
  created_at: string
  updated_at: string
}

export interface DbProfileInsert {
  id: string
  username?: string | null
}

export interface DbProfileUpdate {
  username?: string | null
}

// ─── question_sets ────────────────────────────────────────────────────────────

export interface DbQuestionSet {
  id: string
  user_id: string | null
  title: string
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface DbQuestionSetInsert {
  user_id?: string | null
  title: string
  description?: string | null
  is_public?: boolean
}

export interface DbQuestionSetUpdate {
  title?: string
  description?: string | null
  is_public?: boolean
}

// ─── questions ────────────────────────────────────────────────────────────────

export interface DbQuestion {
  id: string
  set_id: string
  question_text: string
  order_index: number
  multiplier: number
  created_at: string
  updated_at: string
}

export interface DbQuestionInsert {
  set_id: string
  question_text: string
  order_index?: number
  multiplier?: number
}

export interface DbQuestionUpdate {
  question_text?: string
  order_index?: number
  multiplier?: number
}

// ─── answers ─────────────────────────────────────────────────────────────────

export interface DbAnswer {
  id: string
  question_id: string
  answer_text: string
  points: number
  order_index: number
  created_at: string
}

export interface DbAnswerInsert {
  question_id: string
  answer_text: string
  points: number
  order_index?: number
}

export interface DbAnswerUpdate {
  answer_text?: string
  points?: number
  order_index?: number
}

// ─── games ────────────────────────────────────────────────────────────────────

export interface DbGame {
  id: string
  user_id: string | null
  set_id: string | null
  team1_name: string
  team2_name: string
  team1_score: number
  team2_score: number
  winner: 'team1' | 'team2' | 'draw' | null
  total_rounds: number
  started_at: string
  finished_at: string | null
  duration_seconds: number | null
  created_at: string
}

export interface DbGameInsert {
  user_id?: string | null
  set_id?: string | null
  team1_name: string
  team2_name: string
  team1_score?: number
  team2_score?: number
  winner?: 'team1' | 'team2' | 'draw' | null
  total_rounds: number
  started_at?: string
  finished_at?: string | null
  duration_seconds?: number | null
}

export interface DbGameUpdate {
  team1_score?: number
  team2_score?: number
  winner?: 'team1' | 'team2' | 'draw' | null
  finished_at?: string | null
  duration_seconds?: number | null
}

// ─── game_rounds ──────────────────────────────────────────────────────────────

export interface DbGameRound {
  id: string
  game_id: string
  question_id: string | null
  round_number: number
  team_turn: 'team1' | 'team2' | null
  strikes: number
  points_earned: number
  winner: 'team1' | 'team2' | 'stolen' | null
  answers_revealed: number[]
  created_at: string
}

export interface DbGameRoundInsert {
  game_id: string
  question_id?: string | null
  round_number: number
  team_turn?: 'team1' | 'team2' | null
  strikes?: number
  points_earned?: number
  winner?: 'team1' | 'team2' | 'stolen' | null
  answers_revealed?: number[]
}

export interface DbGameRoundUpdate {
  team_turn?: 'team1' | 'team2' | null
  strikes?: number
  points_earned?: number
  winner?: 'team1' | 'team2' | 'stolen' | null
  answers_revealed?: number[]
}
