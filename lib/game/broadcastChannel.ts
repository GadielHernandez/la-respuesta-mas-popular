import type { GameState } from '@/types/game.types'

export const GAME_CHANNEL_NAME = 'lrmp-game-state' as const

export interface GameChannelMessage {
  type: 'STATE_UPDATE'
  state: GameState
}
