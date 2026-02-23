'use client'

import { useGameBoard } from '@/hooks/useGameBoard'

export default function BoardPage() {
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

  return (
    <div className="min-h-screen bg-game-board">
      {/* GameBoard components — issues #18-24 */}
      <p className="p-4 font-mono text-xs text-gray-600">
        Ronda {state.currentRound} · {state.phase}
      </p>
    </div>
  )
}
