'use client'

import { GameProvider } from '@/contexts/GameContext'

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <div className="min-h-screen bg-game-board">{children}</div>
    </GameProvider>
  )
}
