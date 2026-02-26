-- =====================================================
-- Migration: Row Level Security Policies
-- Created: 2026-02-26
-- Issue: #39
-- =====================================================
--
-- Description:
-- Enables RLS on all tables and defines security policies so that:
--   - Users can only read and modify their own data
--   - Public question_sets are viewable by anyone (including unauthenticated)
--   - questions and answers inherit access from their parent set
--   - game_rounds inherit access from their parent game
--
-- Depends on: 20260226120000_initial_schema.sql
--
-- =====================================================

BEGIN;

-- =====================================================
-- TABLE: profiles
-- Users can only view and edit their own profile.
-- INSERT is allowed so users can create their own profile on first sign-in.
-- (Alternatively, a trigger on auth.users can create profiles server-side,
--  which bypasses RLS entirely — see Supabase docs on "handle new user".)
-- =====================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (first sign-in)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- TABLE: question_sets
-- Public sets are viewable by anyone.
-- Only the owner can create, update, or delete their sets.
-- =====================================================

ALTER TABLE question_sets ENABLE ROW LEVEL SECURITY;

-- Public sets are viewable by anyone (including unauthenticated users)
CREATE POLICY "Public sets are viewable by all"
  ON question_sets FOR SELECT
  USING (is_public = true);

-- Users can view their own sets (public or private)
CREATE POLICY "Users can view own sets"
  ON question_sets FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create sets for themselves
CREATE POLICY "Users can create own sets"
  ON question_sets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sets
CREATE POLICY "Users can update own sets"
  ON question_sets FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own sets
CREATE POLICY "Users can delete own sets"
  ON question_sets FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- TABLE: questions
-- Access is inherited from the parent question_set.
-- =====================================================

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Questions are viewable if the parent set is accessible (public or own)
CREATE POLICY "Questions viewable if set is accessible"
  ON questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM question_sets
      WHERE id = questions.set_id
        AND (is_public = true OR user_id = auth.uid())
    )
  );

-- Users can manage (insert/update/delete) questions in their own sets
CREATE POLICY "Users can insert questions in own sets"
  ON questions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM question_sets
      WHERE id = questions.set_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update questions in own sets"
  ON questions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM question_sets
      WHERE id = questions.set_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM question_sets
      WHERE id = questions.set_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete questions in own sets"
  ON questions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM question_sets
      WHERE id = questions.set_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- TABLE: answers
-- Access is inherited from the parent question → question_set.
-- =====================================================

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Answers are viewable if the parent question's set is accessible
CREATE POLICY "Answers viewable if question is accessible"
  ON answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM questions q
      JOIN question_sets qs ON qs.id = q.set_id
      WHERE q.id = answers.question_id
        AND (qs.is_public = true OR qs.user_id = auth.uid())
    )
  );

-- Users can manage answers in their own question sets
CREATE POLICY "Users can insert answers in own questions"
  ON answers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM questions q
      JOIN question_sets qs ON qs.id = q.set_id
      WHERE q.id = answers.question_id AND qs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update answers in own questions"
  ON answers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM questions q
      JOIN question_sets qs ON qs.id = q.set_id
      WHERE q.id = answers.question_id AND qs.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM questions q
      JOIN question_sets qs ON qs.id = q.set_id
      WHERE q.id = answers.question_id AND qs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete answers in own questions"
  ON answers FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM questions q
      JOIN question_sets qs ON qs.id = q.set_id
      WHERE q.id = answers.question_id AND qs.user_id = auth.uid()
    )
  );

-- =====================================================
-- TABLE: games
-- Users can only view, create, and update their own games.
-- =====================================================

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Users can view their own games
CREATE POLICY "Users can view own games"
  ON games FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create games for themselves
CREATE POLICY "Users can create own games"
  ON games FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own games (e.g., set winner, finished_at)
CREATE POLICY "Users can update own games"
  ON games FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- TABLE: game_rounds
-- Access is inherited from the parent game.
-- =====================================================

ALTER TABLE game_rounds ENABLE ROW LEVEL SECURITY;

-- Users can view rounds of their own games
CREATE POLICY "Users can view rounds of own games"
  ON game_rounds FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM games
      WHERE id = game_rounds.game_id AND user_id = auth.uid()
    )
  );

-- Users can insert rounds into their own games
CREATE POLICY "Users can insert rounds in own games"
  ON game_rounds FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM games
      WHERE id = game_rounds.game_id AND user_id = auth.uid()
    )
  );

-- Users can update rounds of their own games
CREATE POLICY "Users can update rounds in own games"
  ON game_rounds FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM games
      WHERE id = game_rounds.game_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM games
      WHERE id = game_rounds.game_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- DONE
-- =====================================================

COMMIT;
