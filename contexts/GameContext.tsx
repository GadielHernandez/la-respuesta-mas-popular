'use client'

/**
 * GameContext — estado global del juego vía React Context + useReducer.
 *
 * El reducer delega cada acción al gameEngine puro, garantizando que
 * toda la lógica de negocio esté centralizada y sin efectos secundarios.
 *
 * Uso básico:
 *   // En una página de juego:
 *   <GameProvider>
 *     <GameBoard />
 *   </GameProvider>
 *
 *   // En cualquier componente hijo:
 *   const { state, dispatch } = useGame()
 *   dispatch({ type: 'REVEAL_ANSWER', payload: 0 })
 */

import { createContext, useContext, useReducer } from 'react'

import { gameEngine } from '@/lib/game/gameEngine'
import type { GameAction, GameState } from '@/types/game.types'

// ─── Estado inicial ──────────────────────────────────────────────────────────

/**
 * Estado por defecto antes de iniciar una partida.
 * La fase `setup` indica que aún no hay un juego activo.
 */
const initialState: GameState = {
  id: '',
  phase: 'setup',
  currentQuestionIndex: 0,
  currentRound: 1,
  totalRounds: 5,
  team1: { name: 'Equipo 1', score: 0 },
  team2: { name: 'Equipo 2', score: 0 },
  activeTeam: 'team1',
  strikes: 0,
  revealedAnswers: [],
  roundPoints: 0,
  multiplier: 1,
  questions: [],
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

/**
 * Reducer que mapea cada `GameAction` a la función correspondiente
 * del `gameEngine`. Todas las transiciones son inmutables.
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'REVEAL_ANSWER':
      return gameEngine.revealAnswer(state, action.payload)

    case 'ADD_STRIKE':
      return gameEngine.addStrike(state)

    case 'SWITCH_TEAM':
      return gameEngine.switchTeam(state)

    case 'ATTEMPT_STEAL':
      return gameEngine.attemptSteal(state, action.payload)

    case 'NEXT_QUESTION':
      return gameEngine.nextQuestion(state)

    case 'END_GAME':
      return { ...state, phase: 'finished' }

    case 'RESET_GAME':
      return action.payload
        ? gameEngine.createGame(action.payload)
        : initialState

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Envuelve las páginas o secciones que necesitan acceso al estado del juego.
 *
 * Ejemplo de uso en una página de juego:
 * ```tsx
 * export default function PlayPage() {
 *   return (
 *     <GameProvider>
 *       <GameBoard />
 *     </GameProvider>
 *   )
 * }
 * ```
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Hook para acceder al estado y dispatcher del juego.
 * Debe usarse dentro de un componente envuelto por `GameProvider`.
 *
 * @throws Error si se usa fuera de un `GameProvider`
 */
export function useGame(): GameContextType {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
