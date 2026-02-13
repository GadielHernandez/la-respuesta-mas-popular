# Supabase Configuration

This directory contains Supabase-related configuration files and database migrations.

## Purpose

This folder manages:
- Database migrations (SQL schema changes)
- Database seed data (optional)
- Supabase CLI configuration
- Schema documentation

## Structure

```
supabase/
├── migrations/              # Database migration files (timestamped SQL files)
│   ├── 20240101000000_initial_schema.sql
│   ├── 20240102000000_add_indexes.sql
│   └── ...
├── seed.sql                 # Seed data for development (optional)
└── config.toml              # Supabase project configuration (optional)
```

## Database Schema

The database schema follows the structure defined in [DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md):

### Core Tables
- **profiles** - User profiles (extends Supabase Auth users)
- **question_sets** - User's custom question collections
- **questions** - Individual questions within sets
- **answers** - Possible answers for each question
- **games** - Completed game records (history)
- **game_rounds** - Detailed round-by-round game data

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public question sets are viewable by all
- See DEVELOPMENT_PLAN.md for full RLS policies

## Migrations

Database migrations should:
- Be numbered sequentially with timestamps
- Have descriptive names (e.g., `20240210120000_create_question_sets_table.sql`)
- Be idempotent when possible
- Include both schema changes and necessary data migrations
- Use transactions for safety

### Creating Migrations

If using Supabase CLI locally:
```bash
supabase migration new create_games_table
```

### Applying Migrations

For local development:
```bash
supabase db reset      # Reset and apply all migrations
supabase db push       # Apply pending migrations
```

For production (via Supabase Dashboard or CLI):
```bash
supabase db push --linked  # Push to linked project
```

## Migration Template

```sql
-- Migration: <Description>
-- Created: <Date>
-- Issue: #<issue-number>

BEGIN;

-- Your schema changes here
CREATE TABLE IF NOT EXISTS example_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_example_user ON example_table(user_id);

-- RLS Policies
ALTER TABLE example_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records"
  ON example_table FOR SELECT
  USING (auth.uid() = user_id);

COMMIT;
```

## Notes

- All migrations are tracked in the `migrations/` subfolder
- Always test migrations locally before deploying to production
- Keep migrations focused on a single concern
- Document complex schema changes with comments
- Use `BEGIN;` and `COMMIT;` for transaction safety

## References

- [DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md) - Full database schema and RLS policies
- [lib/supabase/](../lib/supabase/) - Supabase client configuration
- [Supabase Documentation](https://supabase.com/docs) - Official Supabase docs
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - PostgreSQL reference
