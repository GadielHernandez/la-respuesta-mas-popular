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
20240211090000_create_games_table.sql
```

## Migration Order

Migrations are applied in chronological order based on their timestamp prefix. Always use a timestamp in the format `YYYYMMDDHHmmss`.

## Best Practices

1. **Always test migrations locally first** before deploying to production
2. **Make migrations reversible** when possible (though we don't currently use down migrations)
3. **Include comments** explaining complex changes
4. **Keep migrations focused** on a single concern or feature
5. **Use transactions** (`BEGIN;` ... `COMMIT;`) for multi-step migrations
6. **Never modify** existing migration files - create a new migration instead
7. **Test with production data** (anonymized copy) when possible

## Creating Migrations

### Using Supabase CLI (Recommended)

```bash
# Generate a new migration file with timestamp
supabase migration new create_games_table

# This creates: supabase/migrations/YYYYMMDDHHmmss_create_games_table.sql
```

### Manual Creation

Create a new file following the naming convention:
```bash
touch supabase/migrations/20240213140000_add_question_multipliers.sql
```

## Applying Migrations

### Local Development

```bash
# Reset database and apply all migrations from scratch
supabase db reset

# Apply only new/pending migrations
supabase db push

# Check migration status
supabase migration list
```

### Production

```bash
# Link to production project (one-time)
supabase link --project-ref your-project-ref

# Push migrations to production
supabase db push --linked

# Or use the Supabase Dashboard:
# Settings > Database > Migrations
```

## Migration Template

Use this template for new migrations:

```sql
-- =====================================================
-- Migration: <Brief Description>
-- Created: <YYYY-MM-DD>
-- Issue: #<issue-number>
-- =====================================================
--
-- Description:
-- <Detailed description of what this migration does>
--
-- Changes:
-- - <Change 1>
-- - <Change 2>
--
-- =====================================================

BEGIN;

-- ============= CREATE TABLES =============

CREATE TABLE IF NOT EXISTS table_name (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============= CREATE INDEXES =============

CREATE INDEX IF NOT EXISTS idx_table_name_user_id
  ON table_name(user_id);

CREATE INDEX IF NOT EXISTS idx_table_name_created_at
  ON table_name(created_at DESC);

-- ============= ROW LEVEL SECURITY =============

ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own records
CREATE POLICY "Users can view own records"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own records
CREATE POLICY "Users can insert own records"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own records
CREATE POLICY "Users can update own records"
  ON table_name FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own records
CREATE POLICY "Users can delete own records"
  ON table_name FOR DELETE
  USING (auth.uid() = user_id);

-- ============= TRIGGERS (if needed) =============

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_table_name_updated_at
  BEFORE UPDATE ON table_name
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============= DONE =============

COMMIT;
```

## Migration Checklist

Before committing a migration, verify:

- [ ] Migration file name follows timestamp format
- [ ] Wrapped in `BEGIN;` ... `COMMIT;` transaction
- [ ] Includes header comment with description and issue number
- [ ] Uses `IF NOT EXISTS` for safety
- [ ] Creates necessary indexes for performance
- [ ] Enables RLS and creates appropriate policies
- [ ] Tested locally with `supabase db reset`
- [ ] No errors during migration
- [ ] Data integrity verified after migration

## Schema Reference

See [DEVELOPMENT_PLAN.md](../../DEVELOPMENT_PLAN.md) for:
- Complete database schema
- All table definitions
- Index specifications
- RLS policy details
- Relationships between tables

## Common Patterns

### Adding a Column
```sql
ALTER TABLE table_name
ADD COLUMN IF NOT EXISTS new_column TEXT;
```

### Creating an Index
```sql
CREATE INDEX IF NOT EXISTS idx_table_column
ON table_name(column_name);
```

### Enabling RLS
```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Foreign Key
```sql
user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
```

## Troubleshooting

### Migration Failed
1. Check SQL syntax
2. Verify table/column names
3. Check for conflicts with existing schema
4. Review error logs: `supabase db logs`

### RLS Blocking Queries
1. Verify policies are correct
2. Test with `auth.uid()` function
3. Check user permissions
4. Review policy with: `\d+ table_name` in psql

## References

- [Supabase Migrations Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [PostgreSQL CREATE POLICY](https://www.postgresql.org/docs/current/sql-createpolicy.html)
- [DEVELOPMENT_PLAN.md](../../DEVELOPMENT_PLAN.md) - Full schema reference
