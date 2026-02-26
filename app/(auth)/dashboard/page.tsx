'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { localStorageAdapter } from '@/lib/storage/localStorage'
import type { GameResult } from '@/types/game.types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function winnerLabel(result: GameResult): string {
  if (result.winner === 'draw') return 'Empate'
  return result.winner === 'team1' ? result.team1.name : result.team2.name
}

// ─── Componente ──────────────────────────────────────────────────────────────

export default function DashboardPage(): React.ReactElement {
  const router = useRouter()
  const { user, signOut, isLoading } = useAuth()

  // Lazy initializer — se ejecuta solo en el cliente al montar el componente.
  // Evita la necesidad de useEffect + setState para leer localStorage.
  const [localData] = useState<{ history: GameResult[]; setsCount: number }>(() => {
    if (typeof window === 'undefined') return { history: [], setsCount: 0 }
    const gameHistory = localStorageAdapter.getGameHistory()
    const sets = localStorageAdapter.getQuestionSets()
    return {
      history: [...gameHistory].reverse(), // más recientes primero
      setsCount: sets.length,
    }
  })
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true)
    await signOut()
    router.push('/')
  }

  // Stats calculadas del historial
  const totalGames = localData.history.length
  const wins = localData.history.filter(g => g.winner !== 'draw').length
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0
  const recentGames = localData.history.slice(0, 5)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-game-config flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-game-config">
      <div className="fixed inset-0 spotlight pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* ── Bienvenida ───────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
              Panel de usuario
            </p>
            <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
              ¡Bienvenido! <span className="text-primary not-italic normal-case tracking-normal font-medium text-lg">{user?.email}</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-warm-border text-xs font-bold uppercase tracking-widest text-gray-400
              hover:border-danger-strike/50 hover:text-danger-strike transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isLoggingOut ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-sm">logout</span>
            )}
            Cerrar sesión
          </button>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-white">{totalGames}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
              Partidas
            </p>
          </div>
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-white">{localData.setsCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
              Sets creados
            </p>
          </div>
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-primary">{winRate}%</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
              Con ganador
            </p>
          </div>
        </div>

        {/* ── Quick actions ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Link
            href="/play"
            className="group bg-primary/10 border border-primary/30 rounded-2xl p-5 flex flex-col items-center gap-3
              hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(219,166,31,0.15)] transition-all"
          >
            <span className="material-symbols-outlined text-4xl text-primary">play_circle</span>
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Jugar
            </span>
          </Link>
          <Link
            href="/my-questions"
            className="group bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col items-center gap-3
              hover:border-primary/40 hover:bg-game-panel transition-all"
          >
            <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary transition-colors">
              quiz
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-gray-300">
              Mis Preguntas
            </span>
          </Link>
          <Link
            href="/history-local"
            className="group bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col items-center gap-3
              hover:border-primary/40 hover:bg-game-panel transition-all"
          >
            <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-primary transition-colors">
              history
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-gray-300">
              Historial
            </span>
          </Link>
        </div>

        {/* ── Partidas recientes ────────────────────────────────────────── */}
        <div className="bg-game-card border border-warm-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-warm-border">
            <h2 className="text-sm font-black uppercase tracking-widest text-white">
              Últimas partidas
            </h2>
          </div>

          {recentGames.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <span className="material-symbols-outlined text-4xl text-gray-700 mb-3 block">
                sports_esports
              </span>
              <p className="text-sm text-gray-500">Todavía no hay partidas registradas.</p>
              <Link
                href="/play"
                className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-primary hover:text-primary-light transition-colors"
              >
                Jugar ahora
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <ul>
              {recentGames.map((game, i) => (
                <li
                  key={game.id}
                  className={`flex items-center justify-between px-6 py-4 ${i < recentGames.length - 1 ? 'border-b border-warm-border' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-gray-600 text-base">
                      {game.winner === 'draw' ? 'handshake' : 'emoji_events'}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {game.team1.name} vs {game.team2.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {game.team1.score} – {game.team2.score} · {game.totalRounds} rondas · {formatDate(game.completedAt)}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${game.winner === 'draw' ? 'text-gray-400' : 'text-primary'}`}>
                    {winnerLabel(game)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
