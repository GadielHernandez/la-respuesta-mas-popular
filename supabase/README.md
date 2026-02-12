# Supabase Configuration

This directory contains Supabase-related configuration files and database migrations.

## Purpose
This folder manages:
- Database migrations
- Supabase configuration files
- Database schema definitions
- Seed data (if needed)

## Structure
```
supabase/
├── migrations/              # Database migration files
│   ├── 20240101000000_initial_schema.sql
│   └── 20240102000000_add_indexes.sql
├── seed.sql                 # Seed data for development (optional)
└── config.toml              # Supabase project configuration (optional)
```

## Migrations
Database migrations should:
- Be numbered sequentially with timestamps
- Have descriptive names
- Be idempotent when possible
- Include both up and down migrations

## Usage
To create a new migration:
```bash
supabase migration new <migration_name>
```

To apply migrations:
```bash
supabase db push
```

## Notes
- Migrations are managed by Supabase CLI
- Always test migrations locally before deploying
- Keep migrations small and focused
- Document complex schema changes

## Schema
The database schema follows the structure defined in `DEVELOPMENT_PLAN.md`:
- `question_sets` - User's custom question collections
- `questions` - Individual questions
- `answers` - Possible answers for questions
- `games` - Completed game records
- User authentication handled by Supabase Auth
