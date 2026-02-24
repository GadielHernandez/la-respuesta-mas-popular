'use client'

import { localStorageAdapter } from '@/lib/storage/localStorage'
import type { GameResult } from '@/types/game.types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function WinnerBadge({ result }: { result: GameResult }): React.ReactElement {
  if (result.winner === 'draw') {
    return (
      <span className="px-2 py-0.5 rounded-full bg-game-card border border-warm-border text-[10px] font-black uppercase tracking-widest text-gray-400">
        Empate
      </span>
    )
  }
  const name = result.winner === 'team1' ? result.team1.name : result.team2.name
  return (
    <span className="px-2 py-0.5 rounded-full bg-primary/15 border border-primary/40 text-[10px] font-black uppercase tracking-widest text-primary">
      🏆 {name}
    </span>
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Historial de partidas guardadas en localStorage.
 * Solo visible en el dispositivo donde se jugó — no requiere cuenta.
 */
export default function HistoryLocalPage(): React.ReactElement {
  const history: GameResult[] = localStorageAdapter.getGameHistory()
  const sorted = [...history].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )

  return (
    <div className="min-h-screen bg-game-config flex flex-col">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-warm-border px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-primary">history</span>
          <div>
            <h1 className="text-lg font-black uppercase tracking-wider text-white leading-tight">
              Historial <span className="italic text-primary">Local</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Partidas guardadas en este dispositivo
            </p>
          </div>
        </div>

        <a
          href="/play"
          className="flex items-center gap-2 rounded-lg border border-warm-border bg-game-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary/50 transition-colors"
          aria-label="Volver al setup del juego"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Nueva Partida
        </a>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-8 py-8">

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-700">history</span>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              Sin partidas guardadas
            </p>
            <p className="text-gray-600 text-xs max-w-sm">
              Completa una partida desde el panel de control para que aparezca aquí.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2">
              {sorted.length} partida{sorted.length !== 1 ? 's' : ''} registrada{sorted.length !== 1 ? 's' : ''}
            </p>

            {sorted.map(result => (
              <div
                key={result.id}
                className="bg-game-card border border-warm-border rounded-2xl p-5 flex items-center gap-6"
              >
                {/* Fecha */}
                <div className="w-32 shrink-0">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">Jugado</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5 leading-tight">
                    {formatDate(result.completedAt)}
                  </p>
                </div>

                {/* Equipos y puntos */}
                <div className="flex-1 flex items-center gap-4">
                  <div className={`text-sm font-black ${result.winner === 'team1' ? 'text-primary' : 'text-gray-400'}`}>
                    {result.team1.name}
                    <span className="ml-2 text-xs text-gray-500 font-bold">{result.team1.score} pts</span>
                  </div>
                  <span className="text-gray-700 font-black text-xs">VS</span>
                  <div className={`text-sm font-black ${result.winner === 'team2' ? 'text-primary' : 'text-gray-400'}`}>
                    {result.team2.name}
                    <span className="ml-2 text-xs text-gray-500 font-bold">{result.team2.score} pts</span>
                  </div>
                </div>

                {/* Rondas */}
                <div className="text-center w-16 shrink-0">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">Rondas</p>
                  <p className="text-sm font-black text-gray-400">{result.totalRounds}</p>
                </div>

                {/* Ganador */}
                <div className="shrink-0">
                  <WinnerBadge result={result} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-warm-border px-8 py-2 flex items-center justify-center text-[10px] text-gray-600 font-medium uppercase tracking-widest">
        <span className="text-primary font-bold italic">La Respuesta más Popular</span>
        <span className="mx-2">·</span>
        <span>Datos almacenados localmente</span>
      </footer>
    </div>
  )
}
