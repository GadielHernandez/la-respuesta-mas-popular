# Supabase Integration

This directory contains the Supabase client configuration for the application.

## Files

### `client.ts`

Browser-side Supabase client using `@supabase/ssr`.

**Usage in Client Components:**

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export function MyComponent() {
  const supabase = createClient()

  // Use the client for queries
  const { data } = await supabase.from('table').select()
}
```

### `server.ts`

Server-side Supabase client with cookie support for Next.js App Router.

**Usage in Server Components:**

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()

  // Use the client for queries
  const { data } = await supabase.from('table').select()

  return <div>{/* render data */}</div>
}
```

**Usage in API Routes:**

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.from('table').select()

  return NextResponse.json(data)
}
```

### `types.ts`

TypeScript type definitions for the database schema. This file will be updated as the database schema evolves.

**Note:** For production applications, you can auto-generate this file using:

```bash
npx supabase gen types typescript --project-id <project-id> > lib/supabase/types.ts
```

## Configuration

Supabase credentials are stored in environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

See `.env.example` for the template.

## Best Practices

1. **Always use the appropriate client**: Use `client.ts` in client components and `server.ts` in server components/API routes
2. **Handle errors**: Always check for errors in Supabase responses
3. **Type safety**: Import types from `types.ts` for type-safe queries
4. **Security**: Never expose service role keys in client-side code

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase SSR Package](https://github.com/supabase/ssr)
