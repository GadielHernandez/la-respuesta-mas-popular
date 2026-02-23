'use client'

import { useGame } from '@/contexts/GameContext'

export default function PlaySetupPage() {
  const { state } = useGame()
  return (
    <div className="flex min-h-screen items-center justify-center bg-game-config p-8">
      <div className="text-center">
        <h1 className="font-black uppercase italic tracking-wider text-white text-3xl">
          Configurar Partida
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Fase: <span className="font-mono text-primary">{state.phase}</span>
        </p>
        {/* Game config form — issues #18-24 */}
      </div>
    </div>
  )
}
