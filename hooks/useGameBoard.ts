'use client'

import { useEffect, useState } from 'react'

import { GAME_CHANNEL_NAME, type GameChannelMessage } from '@/lib/game/broadcastChannel'
import type { GameState } from '@/types/game.types'

/**
 * Hook exclusivo del tablero público. Escucha el BroadcastChannel
 * y mantiene una copia local del estado. Nunca expone dispatch.
 *
 * Retorna `null` hasta recibir el primer broadcast — el tablero
 * muestra "Esperando panel de control..." en ese estado.
 */
export function useGameBoard(): GameState | null {
  const [state, setState] = useState<GameState | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const channel = new BroadcastChannel(GAME_CHANNEL_NAME)
    channel.onmessage = (event: MessageEvent<GameChannelMessage>) => {
      if (event.data.type === 'STATE_UPDATE') setState(event.data.state)
    }
    return () => channel.close()
  }, [])

  return state
}
