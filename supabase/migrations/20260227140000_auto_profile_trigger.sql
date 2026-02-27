-- =====================================================
-- Migration: Auto-create profile on user registration
-- Created: 2026-02-27
-- Issue: #43 (found during testing)
-- =====================================================
--
-- Description:
-- Creates a trigger that automatically inserts a row in
-- `profiles` whenever a new user is created in `auth.users`.
--
-- This fixes the FK constraint on `question_sets.user_id →
-- profiles(id)` that prevented newly registered users from
-- saving data until their profile row existed.
--
-- Uses SECURITY DEFINER so the trigger runs with elevated
-- privileges and can bypass RLS on profiles.
--
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $func$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
