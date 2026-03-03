'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'
import { useStorage } from '@/hooks/useStorage'
import type { GameResult, Team } from '@/types/game.types'

// ─── Constantes ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 20

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function winnerName(result: GameResult): string {
  if (result.winner === 'draw') return 'Empate'
  return result.winner === 'team1' ? result.team1.name : result.team2.name
}

function isWinner(result: GameResult, team: Team): boolean {
  return result.winner === team
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function WinnerBadge({ result }: { result: GameResult }): React.ReactElement {
  if (result.winner === 'draw') {
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-game-card border border-warm-border text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span className="material-symbols-outlined text-[11px] leading-none">handshake</span>
        Empate
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 border border-primary/40 text-[10px] font-black uppercase tracking-widest text-primary">
      <span className="material-symbols-outlined text-[11px] leading-none">emoji_events</span>
      {winnerName(result)}
    </span>
  )
}

function EmptyState(): React.ReactElement {
  return (
    <div className="bg-game-card border border-warm-border rounded-2xl px-6 py-20 text-center">
      <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">history</span>
      <p className="text-sm font-bold text-white mb-1">
        Todavía no hay partidas registradas
      </p>
      <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
        Las partidas que completes desde el panel de control aparecerán aquí.
      </p>
      <Link
        href="/play"
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
      >
        <span className="material-symbols-outlined text-sm leading-none">play_circle</span>
        Jugar ahora
      </Link>
    </div>
  )
}

interface GameCardProps {
  result: GameResult
}

function GameCard({ result }: GameCardProps): React.ReactElement {
  return (
    <Link
      href={`/history/${result.id}`}
      className="group bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-warm-border-subtle hover:bg-game-panel transition-all"
      aria-label={`Ver detalle de partida: ${result.team1.name} vs ${result.team2.name}`}
    >
      {/* Fecha */}
      <div className="w-36 shrink-0">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Jugado</p>
        <p className="text-xs font-bold text-gray-400 mt-0.5 leading-tight">
          {formatDate(result.completedAt)}
        </p>
      </div>

      {/* Equipos y puntos */}
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className={`flex flex-col min-w-0 ${isWinner(result, 'team1') ? '' : ''}`}>
          <p className={`text-sm font-black truncate ${isWinner(result, 'team1') ? 'text-primary' : 'text-gray-300'}`}>
            {result.team1.name}
          </p>
          <p className="text-xs font-bold text-gray-500">{result.team1.score} pts</p>
        </div>

        <span className="text-gray-700 font-black text-[10px] uppercase tracking-widest shrink-0">VS</span>

        <div className="flex flex-col min-w-0">
          <p className={`text-sm font-black truncate ${isWinner(result, 'team2') ? 'text-primary' : 'text-gray-300'}`}>
            {result.team2.name}
          </p>
          <p className="text-xs font-bold text-gray-500">{result.team2.score} pts</p>
        </div>
      </div>

      {/* Rondas */}
      <div className="text-center w-14 shrink-0">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Rondas</p>
        <p className="text-sm font-black text-gray-400">{result.totalRounds}</p>
      </div>

      {/* Ganador */}
      <div className="shrink-0 flex items-center gap-3">
        <WinnerBadge result={result} />
        <span className="material-symbols-outlined text-gray-600 group-hover:text-gray-400 transition-colors text-base leading-none">
          chevron_right
        </span>
      </div>
    </Link>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

/**
 * Página de historial de partidas del usuario autenticado.
 * Obtiene el historial desde Supabase (o localStorage si no hay sesión).
 */
export default function HistoryPage(): React.ReactElement {
  const { user, isLoading: authLoading } = useAuth()
  const storage = useStorage()

  const [history, setHistory] = useState<GameResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // ── Cargar historial ────────────────────────────────────────────────────

  const loadHistory = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await storage.getGameHistory(user?.id)
      const sorted = [...results].sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )
      setHistory(sorted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el historial')
    } finally {
      setIsLoading(false)
    }
  }, [storage, user?.id])

  useEffect(() => {
    if (!authLoading) {
      loadHistory()
    }
  }, [authLoading, loadHistory])

  // ── Paginación ───────────────────────────────────────────────────────────

  const totalPages = Math.ceil(history.length / PAGE_SIZE)
  const paginatedHistory = history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // ─────────────────────────────────────────────────────────────────────────

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
            Mi cuenta
          </p>
          <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
            Historial <span className="text-primary not-italic">de Partidas</span>
          </h1>
        </div>

        <Link
          href="/play"
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
          aria-label="Iniciar nueva partida"
        >
          <span className="material-symbols-outlined text-sm leading-none">play_circle</span>
          Nueva Partida
        </Link>
      </div>

      {/* ── Error ──────────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-danger-strike/10 border border-danger-strike/30 text-sm text-danger-strike">
          <span className="material-symbols-outlined text-base leading-none">error</span>
          {error}
          <button
            type="button"
            onClick={loadHistory}
            className="ml-auto text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* ── Contenido ──────────────────────────────────────────────────── */}
      {!error && history.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">

          {/* Contador */}
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">
            {history.length} partida{history.length !== 1 ? 's' : ''} registrada{history.length !== 1 ? 's' : ''}
          </p>

          {/* Lista de partidas */}
          {paginatedHistory.map(result => (
            <GameCard key={result.id} result={result} />
          ))}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-warm-border text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <span className="material-symbols-outlined text-base leading-none">chevron_left</span>
              </button>

              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-warm-border text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Página siguiente"
              >
                <span className="material-symbols-outlined text-base leading-none">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
