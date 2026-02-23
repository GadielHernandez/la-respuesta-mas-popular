'use client'

import { useGame } from '@/contexts/GameContext'

export default function ControlPage() {
  const { state, dispatch: _dispatch } = useGame()
  return (
    <div className="min-h-screen bg-game-moderator p-6">
      <header className="mb-6 border-b border-warm-border pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Panel de Control</p>
        <h1 className="text-2xl font-black uppercase text-white">Moderador</h1>
      </header>
      {/* Moderator controls — issues #18-24 */}
      <p className="font-mono text-xs text-gray-600">
        Fase: {state.phase} · Ronda {state.currentRound}/{state.totalRounds}
      </p>
    </div>
  )
}
