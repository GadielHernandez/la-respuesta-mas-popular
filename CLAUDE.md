# Convenciones de Desarrollo - La Respuesta más Popular

## Información del Proyecto

**Nombre:** La Respuesta más Popular
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Supabase
**Plan de Desarrollo:** Ver `DEVELOPMENT_PLAN.md`

---

## Filosofía de Desarrollo

### Principios Core

1. **Incremental & Iterative:** Desarrollar en pequeños pasos verificables
2. **Type-Safe First:** TypeScript estricto, evitar `any`
3. **Component Reusability:** DRY (Don't Repeat Yourself)
4. **User Experience:** UI clara, responsive, accesible
5. **Data Integrity:** Validaciones en cliente y servidor
6. **Performance:** Optimizar desde el inicio (lazy loading, memoization)

### Prioridades

- ✅ Funcionalidad correcta > Features adicionales
- ✅ Código legible > Código clever
- ✅ Testing manual exhaustivo antes de merge
- ✅ Consistencia en patrones y estilos

---

## Estructura del Proyecto

### Organización de Carpetas

Seguir estrictamente la estructura definida en `DEVELOPMENT_PLAN.md`:

```
app/           → Rutas Next.js (App Router)
components/    → Componentes React reutilizables
lib/           → Lógica de negocio, utilidades
hooks/         → Custom React Hooks
types/         → TypeScript type definitions
contexts/      → React Contexts
data/          → Data estática (preguntas demo)
supabase/      → Migraciones y configuración DB
public/        → Assets estáticos
```

### Reglas de Imports

Usar aliases de TypeScript configurados en `tsconfig.json`:

```typescript
// ✅ Correcto
import { Button } from '@/components/ui/Button'
import { useGameState } from '@/hooks/useGameState'
import type { GameState } from '@/types/game.types'

// ❌ Evitar
import { Button } from '../../../components/ui/Button'
```

**Orden de imports:**

1. Librerías externas (React, Next, etc.)
2. Aliases internos (`@/`)
3. Imports relativos (`./ ../`)
4. Type imports al final

```typescript
// Ejemplo
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import type { User } from '@/types/user.types'

import { localFunction } from './helpers'
```

---

## Convenciones de Código TypeScript

### TypeScript Configuration

**tsconfig.json debe incluir:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Type Definitions

**Ubicación:** Siempre en `types/` directory

**Naming:**

- Interfaces: PascalCase con `I` prefix opcional
- Types: PascalCase
- Enums: PascalCase

```typescript
// types/game.types.ts
export type Team = 'team1' | 'team2'
export type GamePhase = 'setup' | 'playing' | 'stealing' | 'finished'

export interface GameState {
  id: string
  phase: GamePhase
  currentRound: number
  team1: TeamData
  team2: TeamData
}

export interface TeamData {
  name: string
  score: number
}
```

**Reglas:**

- ✅ Exportar todos los tipos
- ✅ Usar tipos literales en lugar de enums cuando sea posible
- ✅ Definir tipos de retorno explícitos en funciones
- ❌ NUNCA usar `any` (usar `unknown` si es necesario)

### Funciones y Variables

```typescript
// ✅ Naming: camelCase para funciones y variables
const calculateScore = (points: number, multiplier: number): number => {
  return points * multiplier
}

// ✅ Arrow functions para componentes
const GameBoard: React.FC<GameBoardProps> = ({ gameState, onAction }) => {
  return <div>...</div>
}

// ✅ Funciones normales para utilities
function formatDate(date: Date): string {
  return date.toLocaleDateString('es-MX')
}
```

---

## Convenciones de React/Next.js

### Componentes

**Ubicación:** `components/` con subcarpetas por categoría

**Naming:** PascalCase, un componente por archivo

**Estructura de componente:**

```typescript
// components/game/AnswerCard.tsx
import React from 'react'
import type { Answer } from '@/types/game.types'

interface AnswerCardProps {
  answer: Answer
  isRevealed: boolean
  onReveal: (answerId: string) => void
  className?: string
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  isRevealed,
  onReveal,
  className = ''
}) => {
  // Hooks primero
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Handlers
  const handleClick = () => {
    if (!isRevealed) {
      onReveal(answer.id)
    }
  }

  // Render
  return (
    <div
      className={`answer-card ${className}`}
      onClick={handleClick}
    >
      {isRevealed ? (
        <div className="revealed">
          <span className="text">{answer.text}</span>
          <span className="points">{answer.points}</span>
        </div>
      ) : (
        <div className="hidden">
          <span className="number">{answer.orderIndex}</span>
        </div>
      )}
    </div>
  )
}
```

**Orden dentro del componente:**

1. Props interface
2. Component definition
3. Hooks (useState, useEffect, custom hooks)
4. Event handlers
5. Helper functions
6. Return/JSX

### Custom Hooks

**Ubicación:** `hooks/`
**Naming:** `use` prefix + PascalCase

```typescript
// hooks/useGameState.ts
import { useState, useCallback } from 'react'
import type { GameState, Team } from '@/types/game.types'

export const useGameState = (initialState: GameState) => {
  const [gameState, setGameState] = useState<GameState>(initialState)

  const revealAnswer = useCallback((answerIndex: number) => {
    setGameState(prev => ({
      ...prev,
      revealedAnswers: [...prev.revealedAnswers, answerIndex],
    }))
  }, [])

  const addStrike = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      strikes: prev.strikes + 1,
    }))
  }, [])

  return {
    gameState,
    revealAnswer,
    addStrike,
    // ... más acciones
  }
}
```

### Server vs Client Components

**Next.js App Router:**

- Por defecto, componentes son Server Components
- Agregar `'use client'` solo cuando sea necesario

**Cuándo usar 'use client':**

- useState, useEffect, otros hooks de React
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- Context providers y consumers

```typescript
// components/game/GameBoard.tsx
'use client'

import { useState } from 'react'
import { QuestionDisplay } from './QuestionDisplay'

export const GameBoard = () => {
  const [gameState, setGameState] = useState(/* ... */)
  // Component interactivo necesita 'use client'
}
```

```typescript
// components/ui/Card.tsx
// Sin 'use client' - puede ser Server Component
export const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>
}
```

---

## Styling con Tailwind CSS

### Configuración

**Archivo:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#1E40AF', // blue-800
          light: '#93C5FD', // blue-300
        },
        secondary: {
          DEFAULT: '#10B981', // green-500
          dark: '#047857', // green-700
          light: '#6EE7B7', // green-300
        },
        danger: '#EF4444', // red-500
        warning: '#F59E0B', // amber-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### Convenciones de Clases

**Orden de clases Tailwind (recomendado):**

1. Layout (display, position)
2. Box model (width, height, padding, margin)
3. Typography (font, text)
4. Visual (background, border, shadow)
5. Interactivity (cursor, transition)

```typescript
// ✅ Orden consistente
<div className="flex flex-col w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">

// ✅ Usar clases condicionales con clsx o cn
import { cn } from '@/lib/utils'

<button className={cn(
  "px-4 py-2 rounded-md font-semibold",
  isActive ? "bg-primary text-white" : "bg-gray-200 text-gray-700",
  className
)}>
```

**Responsive Design:**

```typescript
// Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px */}
</div>
```

**Componentes reutilizables con variants:**

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick
}) => {
  const baseStyles = "font-semibold rounded-md transition-colors"

  const variantStyles = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary: "bg-secondary hover:bg-secondary-dark text-white",
    danger: "bg-danger hover:bg-red-600 text-white"
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

---

## Supabase Integration

### Client Setup

**lib/supabase/client.ts** (Client-side):

```typescript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**lib/supabase/server.ts** (Server-side):

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Queries Organization

**lib/supabase/queries.ts:**

```typescript
import type { SupabaseClient } from '@supabase/supabase-js'
import type { QuestionSet, Question } from '@/types/question.types'

export const questionSetQueries = {
  // Obtener sets del usuario
  async getUserSets(supabase: SupabaseClient, userId: string): Promise<QuestionSet[]> {
    const { data, error } = await supabase
      .from('question_sets')
      .select('*, questions(*, answers(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as QuestionSet[]
  },

  // Crear nuevo set
  async createSet(
    supabase: SupabaseClient,
    userId: string,
    setData: Omit<QuestionSet, 'id' | 'createdAt'>
  ): Promise<QuestionSet> {
    const { data, error } = await supabase
      .from('question_sets')
      .insert({ ...setData, user_id: userId })
      .select()
      .single()

    if (error) throw error
    return data as QuestionSet
  },

  // Más queries...
}

export const gameQueries = {
  // Guardar partida completada
  async saveGame(supabase: SupabaseClient, gameData: any) {
    // Implementation
  },

  // Obtener historial
  async getGameHistory(supabase: SupabaseClient, userId: string) {
    // Implementation
  },
}
```

### Error Handling

```typescript
// ✅ Siempre manejar errores de Supabase
try {
  const { data, error } = await supabase.from('table').select()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error('Failed to fetch data')
  }

  return data
} catch (err) {
  // Handle error appropriately
  throw err
}
```

---

## State Management

### Strategy

Para este proyecto usaremos:

- **React Context + useReducer** para game state (complejo, muchas acciones)
- **useState** para estado local de componentes
- **Custom hooks** para encapsular lógica reutilizable

### Game Context Example

**contexts/GameContext.tsx:**

```typescript
'use client'

import React, { createContext, useContext, useReducer } from 'react'
import type { GameState, Team } from '@/types/game.types'

// Action types
type GameAction =
  | { type: 'REVEAL_ANSWER'; payload: number }
  | { type: 'ADD_STRIKE' }
  | { type: 'SWITCH_TEAM' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET_GAME' }

// Initial state
const initialState: GameState = {
  id: crypto.randomUUID(),
  phase: 'setup',
  currentQuestionIndex: 0,
  currentRound: 1,
  team1: { name: 'Equipo 1', score: 0 },
  team2: { name: 'Equipo 2', score: 0 },
  activeTeam: 'team1',
  strikes: 0,
  revealedAnswers: [],
  roundPoints: 0,
  multiplier: 1,
}

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'REVEAL_ANSWER':
      return {
        ...state,
        revealedAnswers: [...state.revealedAnswers, action.payload]
      }

    case 'ADD_STRIKE':
      const newStrikes = state.strikes + 1
      if (newStrikes >= 3) {
        return {
          ...state,
          strikes: newStrikes,
          phase: 'stealing'
        }
      }
      return { ...state, strikes: newStrikes }

    case 'SWITCH_TEAM':
      return {
        ...state,
        activeTeam: state.activeTeam === 'team1' ? 'team2' : 'team1',
        strikes: 0
      }

    // Más casos...

    default:
      return state
  }
}

// Context
interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// Hook
export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
```

---

## LocalStorage Abstraction

### Storage Adapter Pattern

**lib/storage/localStorage.ts:**

```typescript
import type { QuestionSet, GameHistory } from '@/types'

const STORAGE_KEYS = {
  QUESTION_SETS: 'lrmp_question_sets',
  GAME_HISTORY: 'lrmp_game_history',
  CURRENT_GAME: 'lrmp_current_game',
} as const

export const localStorageAdapter = {
  // Question Sets
  getQuestionSets(): QuestionSet[] {
    const data = localStorage.getItem(STORAGE_KEYS.QUESTION_SETS)
    return data ? JSON.parse(data) : []
  },

  saveQuestionSet(set: QuestionSet): void {
    const sets = this.getQuestionSets()
    const index = sets.findIndex(s => s.id === set.id)

    if (index >= 0) {
      sets[index] = set
    } else {
      sets.push(set)
    }

    localStorage.setItem(STORAGE_KEYS.QUESTION_SETS, JSON.stringify(sets))
  },

  deleteQuestionSet(setId: string): void {
    const sets = this.getQuestionSets().filter(s => s.id !== setId)
    localStorage.setItem(STORAGE_KEYS.QUESTION_SETS, JSON.stringify(sets))
  },

  // Game History
  getGameHistory(): GameHistory[] {
    const data = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY)
    return data ? JSON.parse(data) : []
  },

  saveGameHistory(game: GameHistory): void {
    const history = this.getGameHistory()
    history.push(game)
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history))
  },

  // Current Game State (para pausar/reanudar)
  getCurrentGame(): any {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME)
    return data ? JSON.parse(data) : null
  },

  saveCurrentGame(gameState: any): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameState))
  },

  clearCurrentGame(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME)
  },
}
```

**lib/storage/supabaseStorage.ts:**

```typescript
import type { SupabaseClient } from '@supabase/supabase-js'
import type { QuestionSet, GameHistory } from '@/types'

export const supabaseStorageAdapter = (supabase: SupabaseClient) => ({
  async getQuestionSets(userId: string): Promise<QuestionSet[]> {
    const { data, error } = await supabase
      .from('question_sets')
      .select('*, questions(*, answers(*))')
      .eq('user_id', userId)

    if (error) throw error
    return data as QuestionSet[]
  },

  async saveQuestionSet(set: QuestionSet, userId: string): Promise<void> {
    const { error } = await supabase.from('question_sets').upsert({ ...set, user_id: userId })

    if (error) throw error
  },

  // Más métodos...
})
```

---

## Testing Guidelines

### Manual Testing Checklist

Antes de crear PR, verificar:

**Game Flow:**

- [ ] Revelar respuestas funciona correctamente
- [ ] Sistema de strikes cuenta correctamente (máximo 3)
- [ ] Cambio de turno funciona al llegar a 3 strikes
- [ ] Modo "stealing" permite al otro equipo robar puntos
- [ ] Puntuación se suma correctamente
- [ ] Multiplicadores aplican correctamente
- [ ] Timer funciona si está habilitado
- [ ] Navegación a siguiente pregunta funciona

**Data Persistence:**

- [ ] Modo sin login guarda en localStorage
- [ ] Modo con login guarda en Supabase
- [ ] Datos persisten al recargar página
- [ ] No hay pérdida de datos durante el juego

**UI/UX:**

- [ ] Responsive en tablet/desktop
- [ ] Botones y controles responden correctamente
- [ ] Loading states visibles cuando aplique
- [ ] Errores se muestran claramente
- [ ] Navegación intuitiva

### Unit Testing (futuro)

Cuando se agreguen tests:

```typescript
// __tests__/lib/game/scoring.test.ts
import { calculateScore } from '@/lib/game/scoring'

describe('calculateScore', () => {
  it('should calculate score with multiplier', () => {
    expect(calculateScore(100, 2)).toBe(200)
  })

  it('should handle zero points', () => {
    expect(calculateScore(0, 3)).toBe(0)
  })
})
```

---

## Git Workflow

### Branch Naming

```
feature/#<issue-number>-brief-description
hotfix/critical-bug-name
docs/update-readme
```

**Ejemplos:**

- `feature/#12-create-game-engine`
- `feature/#18-implement-gameboard`
- `hotfix/scoring-calculation-bug`

### Commit Messages

**Formato:** `<type>: <description>`

**Types:**

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `refactor:` Refactorización sin cambio de funcionalidad
- `style:` Cambios de estilo (formato, CSS)
- `docs:` Documentación
- `test:` Tests
- `chore:` Tareas de mantenimiento

**Ejemplos:**

```
feat: implement answer reveal animation
fix: correct strike counter logic
refactor: extract scoring logic to separate module
style: update button hover states
docs: add setup instructions to README
```

### Pull Request Template

**Título:** `[#<issue-number>] Brief description`

**Descripción:**

```markdown
## Descripción

Breve explicación de qué se implementó y por qué.

## Cambios realizados

- Cambio 1
- Cambio 2
- Cambio 3

## Cómo probar

1. Paso 1
2. Paso 2
3. Resultado esperado

## Screenshots (si aplica)

[Agregar screenshots de UI]

## Checklist

- [ ] Código funciona correctamente
- [ ] Testing manual completado
- [ ] Sin errores de TypeScript
- [ ] Código sigue convenciones del proyecto

Closes #<issue-number>
```

---

## Environment Variables

### Archivo .env.local

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App Config
NEXT_PUBLIC_APP_NAME="La Respuesta más Popular"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Uso en código

```typescript
// ✅ Usar variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const appName = process.env.NEXT_PUBLIC_APP_NAME || 'La Respuesta más Popular'

// ❌ NUNCA hardcodear valores sensibles
const apiKey = 'abc123' // NO HACER ESTO
```

---

## Performance Best Practices

### Next.js Optimizations

```typescript
// ✅ Lazy load componentes pesados
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Si no necesita SSR
})

// ✅ Optimizar imágenes
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // Solo para above-the-fold images
/>

// ✅ Memoizar cálculos costosos
import { useMemo } from 'react'

const totalScore = useMemo(() => {
  return calculateComplexScore(gameState)
}, [gameState])

// ✅ Evitar re-renders innecesarios
import { memo } from 'react'

export const AnswerCard = memo(({ answer, onReveal }) => {
  // Component implementation
})
```

### Supabase Query Optimization

```typescript
// ✅ Select solo columnas necesarias
const { data } = await supabase
  .from('games')
  .select('id, team1_score, team2_score')
  .eq('user_id', userId)

// ❌ Evitar select(*)
const { data } = await supabase.from('games').select('*') // Trae todo, incluso datos que no necesitas

// ✅ Usar paginación
const { data } = await supabase.from('games').select('*').range(0, 9) // Primeros 10 resultados
```

---

## Accessibility (A11y) Basics

```typescript
// ✅ Usar elementos semánticos
<button onClick={handleClick}>Click me</button>

// ❌ Evitar divs clickeables
<div onClick={handleClick}>Click me</div>

// ✅ Agregar aria-labels cuando sea necesario
<button aria-label="Revelar respuesta 1" onClick={() => reveal(1)}>
  1
</button>

// ✅ Keyboard navigation
<input
  type="text"
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }}
/>

// ✅ Focus states visibles
className="focus:outline-none focus:ring-2 focus:ring-primary"
```

---

## Common Patterns

### Loading States

```typescript
const [isLoading, setIsLoading] = useState(false)

const fetchData = async () => {
  setIsLoading(true)
  try {
    const data = await fetch(/* ... */)
    // Handle data
  } catch (error) {
    // Handle error
  } finally {
    setIsLoading(false)
  }
}

return (
  <div>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>Content</div>
    )}
  </div>
)
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null)

const handleAction = async () => {
  setError(null)
  try {
    await riskyOperation()
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error')
  }
}

return (
  <div>
    {error && (
      <div className="bg-red-100 text-red-700 p-3 rounded">
        {error}
      </div>
    )}
    <button onClick={handleAction}>Do something</button>
  </div>
)
```

### Form Handling

```typescript
const [formData, setFormData] = useState({
  teamName: '',
  playerCount: 2
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}

return (
  <form onSubmit={handleSubmit}>
    <input
      name="teamName"
      value={formData.teamName}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)
```

---

## Debugging Tips

### Next.js Debugging

```typescript
// Server-side logging (visible en terminal)
console.log('Server:', data)

// Client-side logging (visible en browser console)
console.log('Client:', data)

// Debugging Server Components
export default async function Page() {
  const data = await fetchData()
  console.log('Data fetched:', data) // Logs en terminal
  return <div>{/* ... */}</div>
}
```

### Supabase Debugging

```typescript
// Ver query SQL generado
const { data, error } = await supabase.from('games').select().eq('user_id', userId)

console.log('Data:', data)
console.log('Error:', error)

// Ver session actual
const {
  data: { session },
} = await supabase.auth.getSession()
console.log('Current session:', session)
```

---

## Resources

### Documentación Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

### Herramientas Útiles

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com)
- [Supabase Studio](https://app.supabase.com)

---

## Contacto y Soporte

Si tienes dudas sobre estas convenciones:

1. Revisa este documento primero
2. Consulta el DEVELOPMENT_PLAN.md
3. Pregunta en el issue correspondiente de GitHub

---

**Última actualización:** 2026-02-10
**Versión:** 1.0.0
