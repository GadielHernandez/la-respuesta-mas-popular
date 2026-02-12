# Database Migrations

This directory contains all database migration files for the project.

## Naming Convention
Migrations follow this format:
```
<timestamp>_<description>.sql
```

Example:
```
20240210120000_create_question_sets_table.sql
20240210130000_add_user_id_index.sql
```

## Migration Order
Migrations are applied in chronological order based on their timestamp prefix.

## Best Practices
1. Always test migrations locally first
2. Make migrations reversible when possible
3. Include comments explaining complex changes
4. Keep migrations focused on a single concern
5. Use transactions for multi-step migrations

## Creating Migrations
Use Supabase CLI to generate new migrations:
```bash
supabase migration new create_games_table
```

This will create a new file with the current timestamp.

## Applying Migrations
Local development:
```bash
supabase db reset      # Reset and apply all migrations
supabase db push       # Apply pending migrations
```

Production:
```bash
supabase db push       # After thorough testing
```

## Migration Template
```sql
-- Migration: <Description>
-- Created: <Date>

BEGIN;

-- Your changes here
CREATE TABLE IF NOT EXISTS example_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMIT;
```
