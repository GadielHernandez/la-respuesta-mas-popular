'use client'

/**
 * GameContext — estado global del juego vía React Context + useReducer.
 *
 * El reducer delega cada acción al gameEngine puro, garantizando que
 * toda la lógica de negocio esté centralizada y sin efectos secundarios.
 *
 * Persistencia (solo desde /play/control):
 * - Auto-guarda en localStorage cada vez que el estado cambia (phase !== 'setup')
 * - Al montar, detecta si hay una partida guardada y expone `hasSavedGame`
 * - `restoreSavedGame()` restaura el estado completo guardado
 * - `RESET_GAME` sin payload limpia el estado guardado de localStorage
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

import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'

import { GAME_CHANNEL_NAME, type GameChannelMessage } from '@/lib/game/broadcastChannel'
import { gameEngine } from '@/lib/game/gameEngine'
import { localStorageAdapter } from '@/lib/storage/localStorage'
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

    case 'RESTORE_GAME':
      return action.payload

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  /** Indica si existe una partida guardada en localStorage pendiente de restaurar */
  hasSavedGame: boolean
  /** Restaura el estado completo desde localStorage y cierra el prompt */
  restoreSavedGame: () => void
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
  const [state, baseDispatch] = useReducer(gameReducer, initialState)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Partida guardada detectada al montar. Lazy initializer: lee localStorage
  // una sola vez en el cliente; retorna null en SSR para evitar mismatch.
  const [savedGame, setSavedGame] = useState<GameState | null>(() => {
    if (typeof window === 'undefined') return null
    const saved = localStorageAdapter.getCurrentGame()
    return saved && saved.phase !== 'setup' ? saved : null
  })

  const hasSavedGame = savedGame !== null

  // ── BroadcastChannel ──────────────────────────────────────────────────────

  // Open channel once on mount, close on unmount
  useEffect(() => {
    if (typeof window === 'undefined') return
    channelRef.current = new BroadcastChannel(GAME_CHANNEL_NAME)
    return () => {
      channelRef.current?.close()
      channelRef.current = null
    }
  }, [])

  // Broadcast full state on every change
  useEffect(() => {
    const message: GameChannelMessage = { type: 'STATE_UPDATE', state }
    channelRef.current?.postMessage(message)
  }, [state])

  // ── Persistencia localStorage ─────────────────────────────────────────────

  // Auto-guardar con debounce de 1 s cuando el juego está activo
  useEffect(() => {
    if (state.phase === 'setup') return

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      localStorageAdapter.saveCurrentGame(state)
    }, 1000)

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [state])

  // ── Dispatch envuelto ─────────────────────────────────────────────────────

  /**
   * Dispatch que intercepta `RESET_GAME` sin payload para limpiar localStorage.
   */
  const dispatch: React.Dispatch<GameAction> = useCallback(
    (action) => {
      if (action.type === 'RESET_GAME' && !action.payload) {
        localStorageAdapter.clearCurrentGame()
      }
      baseDispatch(action)
    },
    []
  )

  // ── restoreSavedGame ──────────────────────────────────────────────────────

  const restoreSavedGame = useCallback((): void => {
    if (!savedGame) return
    baseDispatch({ type: 'RESTORE_GAME', payload: savedGame })
    setSavedGame(null)
  }, [savedGame])

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <GameContext.Provider value={{ state, dispatch, hasSavedGame, restoreSavedGame }}>
      {children}
    </GameContext.Provider>
  )
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
