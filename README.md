# La Respuesta más Popular

> A digital version of the popular game show "Family Feud" (known as "100 Mexicanos Dijeron" in Mexico)

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

## Overview

**La Respuesta más Popular** is a multiplayer game where teams compete to guess the most popular answers to survey questions. Built with modern web technologies, it supports both offline play (localStorage) and cloud sync (Supabase) for authenticated users.

### Key Features
- 🎮 Local multiplayer gameplay
- 📝 Custom question creation
- ☁️ Cloud sync with Supabase
- 🎨 Modern, responsive UI
- 📊 Game statistics and history
- 🔐 Optional authentication

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

The project follows a modular architecture with clear separation of concerns:

```
la-respuesta-mas-popular/
├── app/                    # Next.js 14+ App Router
│   ├── api/               # API routes
│   │   └── test-supabase/ # Supabase connection test endpoint
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── game/             # Game-specific components (GameBoard, AnswerCard, etc.)
│   ├── questions/        # Question management UI
│   ├── ui/               # Reusable UI components (Button, Card, Input, Modal)
│   └── layout/           # Layout components (Header, Footer, Navigation)
│
├── lib/                  # Business logic and utilities
│   ├── supabase/         # Supabase client setup
│   │   ├── client.ts     # Browser client
│   │   ├── server.ts     # Server client
│   │   └── types.ts      # Database type definitions
│   ├── game/             # Game engine logic (scoring, rounds, state management)
│   ├── storage/          # Data persistence layer (localStorage/Supabase adapter)
│   ├── utils/            # Helper functions and utilities
│   └── utils.ts          # Common utilities (cn function for class names)
│
├── hooks/                # Custom React hooks
│   └── (useGameState, useAuth, useQuestions, etc.)
│
├── types/                # TypeScript type definitions
│   └── (game.types.ts, question.types.ts, user.types.ts)
│
├── contexts/             # React Context providers
│   └── (GameContext, AuthContext)
│
├── data/                 # Static data
│   └── (demo questions, seed data)
│
├── supabase/            # Supabase configuration
│   └── migrations/      # Database migrations
│
├── public/              # Static assets (images, fonts)
│
├── .claude/             # Claude Code agent configuration
│
├── CLAUDE.md            # Development conventions and coding standards
├── DEVELOPMENT_PLAN.md  # Project roadmap and implementation plan
└── GITHUB_ISSUES.md     # Detailed issue descriptions
```

### Directory Descriptions

#### `/app` - Next.js App Router
- **Purpose:** Contains all routes, layouts, and page components
- **Key Files:**
  - `layout.tsx`: Root layout with global metadata
  - `page.tsx`: Homepage/landing page
  - `globals.css`: Global styles and Tailwind imports
  - `api/`: API routes for server-side operations

#### `/components` - React Components
Organized by feature/domain:
- **`/game`**: Game-specific components (GameBoard, ScoreDisplay, Timer, etc.)
- **`/questions`**: Question management interface (QuestionEditor, QuestionList)
- **`/ui`**: Reusable UI primitives (Button, Card, Input, Modal)
- **`/layout`**: Layout components (Header, Footer, Sidebar)

#### `/lib` - Business Logic
Core application logic separated from UI:
- **`/supabase`**: Database client configuration (client/server split for Next.js)
- **`/game`**: Game engine (scoring, round management, answer validation)
- **`/storage`**: Abstraction layer for data persistence (supports localStorage and Supabase)
- **`/utils`**: Shared utilities (formatting, validation, helpers)

#### `/hooks` - Custom React Hooks
Reusable stateful logic:
- `useGameState`: Game state management
- `useAuth`: Authentication state
- `useQuestions`: Question data fetching and management

#### `/types` - TypeScript Definitions
Centralized type definitions:
- `game.types.ts`: Game state, rounds, teams
- `question.types.ts`: Questions, answers, question sets
- `user.types.ts`: User profiles, authentication

#### `/contexts` - React Contexts
Global state providers:
- `GameContext`: Game state and actions
- `AuthContext`: User authentication state

#### `/data` - Static Data
- Demo questions for testing
- Seed data for development
- Configuration files

#### `/supabase` - Database
- **`/migrations`**: SQL migration files for database schema

### Key Configuration Files

- **`CLAUDE.md`**: Comprehensive development conventions, coding standards, and best practices
- **`DEVELOPMENT_PLAN.md`**: Complete project roadmap with phases and milestones
- **`tailwind.config.ts`**: Tailwind CSS configuration with custom theme
- **`tsconfig.json`**: TypeScript configuration with strict mode and path aliases
- **`.env.local`**: Environment variables (Supabase credentials)

### Import Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import { Button } from '@/components/ui/Button'
import { useGameState } from '@/hooks/useGameState'
import type { GameState } from '@/types/game.types'
```

All imports use the `@/` alias pointing to the project root.

## Features

### Game Modes
- **Local Multiplayer**: Play with friends on the same device
- **Demo Mode**: Try the game with pre-loaded questions
- **Custom Questions**: Create and manage your own question sets

### Gameplay Features
- Real-time scoring system
- Strike counter (3 strikes = team switch)
- Answer reveal animations
- Point multipliers
- Timer support (optional)
- Team stealing mechanic
- Game history and statistics

### Data Management
- **Offline Mode**: Play without login using localStorage
- **Authenticated Mode**: Save progress to Supabase cloud
- Custom question set creation and management
- Import/export question sets

## Game Rules

**La Respuesta más Popular** (Family Feud) gameplay:

1. **Setup**: Two teams compete, each with 1-6 players
2. **Rounds**: Each round features a survey question with multiple answers
3. **Face-Off**: One player from each team competes for control
4. **Playing**: The team with control tries to reveal all answers
5. **Strikes**: Wrong answers give strikes (3 strikes = opponent can steal)
6. **Scoring**: Each answer has points based on survey popularity
7. **Stealing**: Opponent team can steal all points with one correct answer
8. **Winner**: Team with most points after all rounds wins

## Development Guidelines

See [CLAUDE.md](./CLAUDE.md) for detailed development conventions and best practices.

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for the complete development roadmap.

## Contributing

This project follows strict development conventions:

1. **TypeScript**: Strict mode, no `any` types
2. **Code Style**: Consistent patterns defined in CLAUDE.md
3. **Git Workflow**: Feature branches, conventional commits
4. **Testing**: Manual testing checklist before PR
5. **Documentation**: Update README for structural changes

### Branch Naming
```
feature/#<issue-number>-brief-description
fix/<issue-number>-bug-description
docs/<description>
```

### Commit Messages
```
feat: add new feature
fix: correct bug
refactor: improve code structure
docs: update documentation
style: format code
```

## Troubleshooting

### Common Issues

**Supabase Connection Failed**
- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Test connection: `curl http://localhost:3000/api/test-supabase`

**TypeScript Errors**
- Ensure you're using TypeScript strict mode
- Check `tsconfig.json` path aliases are configured
- Run `npm run build` to catch all errors

**Styles Not Applying**
- Verify Tailwind configuration in `tailwind.config.ts`
- Check `globals.css` imports Tailwind directives
- Clear `.next` cache: `rm -rf .next && npm run dev`

**Module Not Found**
- Check import uses `@/` alias correctly
- Verify file exists in specified path
- Restart dev server after adding new files

## Project Documentation

### Core Documentation
- **[CLAUDE.md](./CLAUDE.md)**: Complete development conventions, TypeScript patterns, React best practices, and coding standards
- **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)**: Project roadmap with phases, milestones, and implementation strategy
- **[GITHUB_ISSUES.md](./GITHUB_ISSUES.md)**: Detailed issue descriptions and acceptance criteria

### Technology Resources
- [Next.js 14 Documentation](https://nextjs.org/docs) - App Router, Server Components, API Routes
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system and best practices
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Supabase Docs](https://supabase.com/docs) - Database, authentication, and real-time features
- [React 18 Docs](https://react.dev) - Hooks, Context, and component patterns

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js application:

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL)
4. Deploy

### Alternative Deployment Options

- **Netlify**: Supports Next.js with edge functions
- **Railway**: Easy deployment with Postgres support
- **Self-hosted**: Use `npm run build` and `npm start`

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

For more deployment details, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is open source and available for educational and personal use.

## Acknowledgments

- Inspired by the classic game show "Family Feud"
- Built with modern web technologies from Vercel, Supabase, and the open-source community
