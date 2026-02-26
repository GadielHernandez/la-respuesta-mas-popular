-- =====================================================
-- Migration: Initial Schema
-- Created: 2026-02-26
-- Issue: #38
-- =====================================================
--
-- Description:
-- Creates the complete database schema for "La Respuesta más Popular".
-- Includes all tables, foreign keys, indexes, and updated_at triggers.
-- RLS policies are managed in a separate migration (002_rls_policies).
--
-- Tables:
-- - profiles        → extends auth.users
-- - question_sets   → colecciones de preguntas
-- - questions       → preguntas individuales
-- - answers         → respuestas de cada pregunta
-- - games           → historial de partidas
-- - game_rounds     → detalle por ronda
--
-- Note: Uses gen_random_uuid() (built-in since PostgreSQL 13).
--       The uuid-ossp extension is NOT required.
--
-- =====================================================

BEGIN;

-- =====================================================
-- HELPER: updated_at trigger function
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TABLE: profiles
-- Extiende auth.users con datos adicionales del usuario.
-- =====================================================

CREATE TABLE IF NOT EXISTS profiles (
  -- id referencia directa al usuario de Supabase Auth
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username    TEXT UNIQUE,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: question_sets
-- Colección de preguntas creada por un usuario.
-- =====================================================

CREATE TABLE IF NOT EXISTS question_sets (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  is_public   BOOLEAN DEFAULT false NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_question_sets_user_id
  ON question_sets(user_id);

CREATE INDEX IF NOT EXISTS idx_question_sets_is_public
  ON question_sets(is_public)
  WHERE is_public = true;

CREATE TRIGGER update_question_sets_updated_at
  BEFORE UPDATE ON question_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: questions
-- Pregunta individual dentro de un set.
-- =====================================================

CREATE TABLE IF NOT EXISTS questions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id        UUID REFERENCES question_sets(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT NOT NULL,
  order_index   INTEGER NOT NULL DEFAULT 0,
  multiplier    INTEGER NOT NULL DEFAULT 1
    CONSTRAINT questions_multiplier_positive CHECK (multiplier > 0),
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_questions_set_id
  ON questions(set_id);

CREATE INDEX IF NOT EXISTS idx_questions_set_order
  ON questions(set_id, order_index);

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: answers
-- Respuesta de una encuesta vinculada a una pregunta.
-- =====================================================

CREATE TABLE IF NOT EXISTS answers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  answer_text TEXT NOT NULL,
  points      INTEGER NOT NULL
    CONSTRAINT answers_points_non_negative CHECK (points >= 0),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_answers_question_id
  ON answers(question_id);

CREATE INDEX IF NOT EXISTS idx_answers_question_order
  ON answers(question_id, order_index);

-- =====================================================
-- TABLE: games
-- Historial de partidas jugadas.
-- =====================================================

CREATE TABLE IF NOT EXISTS games (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES profiles(id) ON DELETE SET NULL,
  set_id           UUID REFERENCES question_sets(id) ON DELETE SET NULL,
  team1_name       TEXT NOT NULL,
  team2_name       TEXT NOT NULL,
  team1_score      INTEGER NOT NULL DEFAULT 0
    CONSTRAINT games_team1_score_non_negative CHECK (team1_score >= 0),
  team2_score      INTEGER NOT NULL DEFAULT 0
    CONSTRAINT games_team2_score_non_negative CHECK (team2_score >= 0),
  winner           TEXT
    CONSTRAINT games_winner_valid CHECK (winner IN ('team1', 'team2', 'draw')),
  total_rounds     INTEGER NOT NULL DEFAULT 1
    CONSTRAINT games_total_rounds_positive CHECK (total_rounds > 0),
  started_at       TIMESTAMPTZ DEFAULT now() NOT NULL,
  finished_at      TIMESTAMPTZ,
  duration_seconds INTEGER
    CONSTRAINT games_duration_non_negative CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_games_user_id
  ON games(user_id);

CREATE INDEX IF NOT EXISTS idx_games_created_at
  ON games(created_at DESC);

-- =====================================================
-- TABLE: game_rounds
-- Detalle de cada ronda dentro de una partida.
-- =====================================================

CREATE TABLE IF NOT EXISTS game_rounds (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id          UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  question_id      UUID REFERENCES questions(id) ON DELETE SET NULL,
  round_number     INTEGER NOT NULL
    CONSTRAINT game_rounds_round_number_positive CHECK (round_number > 0),
  team_turn        TEXT
    CONSTRAINT game_rounds_team_turn_valid CHECK (team_turn IN ('team1', 'team2')),
  strikes          INTEGER NOT NULL DEFAULT 0
    CONSTRAINT game_rounds_strikes_range CHECK (strikes >= 0 AND strikes <= 3),
  points_earned    INTEGER NOT NULL DEFAULT 0
    CONSTRAINT game_rounds_points_non_negative CHECK (points_earned >= 0),
  winner           TEXT
    CONSTRAINT game_rounds_winner_valid CHECK (winner IN ('team1', 'team2', 'stolen')),
  answers_revealed INTEGER[] NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_game_rounds_game_id
  ON game_rounds(game_id);

CREATE INDEX IF NOT EXISTS idx_game_rounds_game_round
  ON game_rounds(game_id, round_number);

-- =====================================================
-- DONE
-- =====================================================

COMMIT;
