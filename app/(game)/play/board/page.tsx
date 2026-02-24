'use client'

import { useGameBoard } from '@/hooks/useGameBoard'

import { GameBoardDisplay } from '@/components/game/GameBoardDisplay'

export default function BoardPage(): React.ReactElement {
  const state = useGameBoard()

  if (state === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-game-board">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Esperando panel de control...
        </p>
      </div>
    )
  }

  return <GameBoardDisplay state={state} />
}
