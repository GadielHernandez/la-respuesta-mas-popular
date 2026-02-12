# La Respuesta más Popular

A digital version of the popular game show "Family Feud" (known as "100 Mexicanos Dijeron" in Mexico), built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Authentication:** Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 1. Clone the repository

```bash
git clone <repository-url>
cd la-respuesta-mas-popular
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to **Settings > API**
4. Copy your **Project URL** and **anon/public key**
5. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

6. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Test Supabase Connection

To verify your Supabase connection is working:

```bash
curl http://localhost:3000/api/test-supabase
```

You should see a success message indicating the connection is working.

## Project Structure

```
app/              # Next.js App Router pages and layouts
components/       # React components
  ├── game/       # Game-specific components
  ├── questions/  # Question management components
  ├── ui/         # Reusable UI components
  └── layout/     # Layout components
lib/              # Business logic and utilities
  ├── supabase/   # Supabase client configuration
  ├── game/       # Game logic
  ├── storage/    # Data persistence layer
  └── utils/      # Utility functions
hooks/            # Custom React hooks
types/            # TypeScript type definitions
contexts/         # React Context providers
data/             # Static data (demo questions)
supabase/         # Database migrations
```

## Development Guidelines

See [CLAUDE.md](./CLAUDE.md) for detailed development conventions and best practices.

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for the complete development roadmap.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
