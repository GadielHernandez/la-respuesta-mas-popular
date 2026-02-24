'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useGame } from '@/contexts/GameContext'
import { localStorageAdapter } from '@/lib/storage/localStorage'
import { DEMO_QUESTION_SET } from '@/data/demoQuestions'
import type { QuestionSet } from '@/types/question.types'
import type { GameConfig } from '@/types/game.types'

// ─── Constantes ───────────────────────────────────────────────────────────────

const ROUND_OPTIONS = [3, 5, 7, 10, 12]

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Página de configuración de partida (modo sin login).
 *
 * Flujo: `/play` (setup) → `/play/control` (moderador) + `/play/board` (proyector)
 * El moderador abre /play/control y la audiencia abre /play/board en otro dispositivo.
 */
export default function PlaySetupPage(): React.ReactElement {
  const { dispatch } = useGame()
  const router = useRouter()

  const savedSets = localStorageAdapter.getQuestionSets()
  const allSets: QuestionSet[] = [DEMO_QUESTION_SET, ...savedSets]

  const [team1Name, setTeam1Name] = useState('Equipo 1')
  const [team2Name, setTeam2Name] = useState('Equipo 2')
  const [totalRounds, setTotalRounds] = useState(5)
  const [selectedSetId, setSelectedSetId] = useState(DEMO_QUESTION_SET.id)

  const selectedSet = allSets.find(s => s.id === selectedSetId) ?? DEMO_QUESTION_SET
  const maxRounds = selectedSet.questions.length

  const handleLaunch = (): void => {
    const config: GameConfig = {
      team1Name: team1Name.trim() || 'Equipo 1',
      team2Name: team2Name.trim() || 'Equipo 2',
      totalRounds: Math.min(totalRounds, maxRounds),
      questions: selectedSet.questions,
    }
    dispatch({ type: 'RESET_GAME', payload: config })
    router.push('/play/control')
  }

  return (
    <div className="min-h-screen bg-game-config flex flex-col">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-warm-border px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-primary">settings</span>
          <div>
            <h1 className="text-lg font-black uppercase tracking-wider text-white leading-tight">
              Configuración <span className="italic text-primary">del Juego</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Game Setup &amp; Configuration
            </p>
          </div>
        </div>

        <a
          href="/play/board"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-warm-border bg-game-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary/50 transition-colors"
          aria-label="Abrir tablero público en nueva pestaña"
        >
          <span className="material-symbols-outlined text-sm">tv</span>
          Abrir Tablero
        </a>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 grid grid-cols-[1fr_1.4fr_1fr] gap-6 p-8">

        {/* ── Columna izquierda — equipos + reglas ───────────────────────── */}
        <section className="flex flex-col gap-6">

          {/* Teams Setup */}
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
              <span className="material-symbols-outlined text-sm text-primary">groups</span>
              Teams Setup
            </h2>

            {/* Equipo 1 */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Equipo 1 (Alpha)
              </label>
              <div className="flex items-center gap-2 bg-game-board border border-warm-border rounded-lg px-3 py-2">
                <span className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary font-black text-xs">1</span>
                <input
                  type="text"
                  value={team1Name}
                  onChange={e => setTeam1Name(e.target.value)}
                  placeholder="Nombre del equipo"
                  maxLength={24}
                  className="flex-1 bg-transparent text-sm font-bold text-white placeholder-gray-600 outline-none"
                  aria-label="Nombre del equipo 1"
                />
              </div>
            </div>

            {/* Equipo 2 */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Equipo 2 (Omega)
              </label>
              <div className="flex items-center gap-2 bg-game-board border border-warm-border rounded-lg px-3 py-2">
                <span className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary font-black text-xs">2</span>
                <input
                  type="text"
                  value={team2Name}
                  onChange={e => setTeam2Name(e.target.value)}
                  placeholder="Nombre del equipo"
                  maxLength={24}
                  className="flex-1 bg-transparent text-sm font-bold text-white placeholder-gray-600 outline-none"
                  aria-label="Nombre del equipo 2"
                />
              </div>
            </div>
          </div>

          {/* Game Rules */}
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
              <span className="material-symbols-outlined text-sm text-primary">rule</span>
              Game Rules
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Número de Rondas
                <span className="ml-2 text-gray-600">(máx. {maxRounds} en este set)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {ROUND_OPTIONS.filter(n => n <= maxRounds).map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTotalRounds(n)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-black border transition-all
                      ${totalRounds === n
                        ? 'bg-primary text-game-board border-primary'
                        : 'bg-game-board border-warm-border text-gray-400 hover:border-primary/50'
                      }`}
                    aria-label={`${n} rondas`}
                    aria-pressed={totalRounds === n}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 mt-1">
                {totalRounds} ronda{totalRounds !== 1 ? 's' : ''} seleccionada{totalRounds !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </section>

        {/* ── Columna central — biblioteca de preguntas ───────────────────── */}
        <section className="bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
            <span className="material-symbols-outlined text-sm text-primary">quiz</span>
            Question Library
          </h2>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#383429 #171611' }}
          >
            {allSets.map(set => {
              const isSelected = set.id === selectedSetId
              const isDemo = set.id === DEMO_QUESTION_SET.id
              return (
                <button
                  key={set.id}
                  type="button"
                  onClick={() => {
                    setSelectedSetId(set.id)
                    // Adjust rounds if needed
                    if (totalRounds > set.questions.length) {
                      setTotalRounds(Math.min(5, set.questions.length))
                    }
                  }}
                  className={`w-full text-left rounded-xl p-4 border transition-all
                    ${isSelected
                      ? 'bg-primary/10 border-primary/60'
                      : 'bg-game-board border-warm-border hover:border-warm-border-light'
                    }`}
                  aria-label={`Seleccionar set: ${set.title}`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${isSelected ? 'text-primary' : 'text-white'}`}>
                        {set.title}
                        {isDemo && (
                          <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-primary/70">Demo</span>
                        )}
                      </p>
                      {set.description && (
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{set.description}</p>
                      )}
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border
                      ${isSelected ? 'border-primary/40 text-primary/80' : 'border-warm-border text-gray-600'}`}>
                      {set.questions.length} pregs
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {savedSets.length === 0 && (
            <p className="text-center text-xs text-gray-600 py-2">
              Solo tienes el set de demostración. Crea sets personalizados desde tu cuenta.
            </p>
          )}
        </section>

        {/* ── Columna derecha — instrucciones + lanzar ────────────────────── */}
        <section className="flex flex-col gap-6">

          {/* Instrucciones del proyector */}
          <div className="bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
              <span className="material-symbols-outlined text-sm text-primary">tv</span>
              Display Setup
            </h2>

            <div className="bg-game-board border border-primary/20 rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Instrucciones para 2 pantallas:
              </p>
              <ol className="flex flex-col gap-2">
                <li className="flex gap-2 text-[11px] text-gray-400">
                  <span className="shrink-0 size-4 rounded-full bg-primary/20 text-primary font-black text-[10px] flex items-center justify-center">1</span>
                  Lanza el juego — se abrirá el <span className="font-bold text-white mx-1">Panel de Control</span>
                </li>
                <li className="flex gap-2 text-[11px] text-gray-400">
                  <span className="shrink-0 size-4 rounded-full bg-primary/20 text-primary font-black text-[10px] flex items-center justify-center">2</span>
                  En el proyector o TV, abre:
                  <code className="font-mono text-primary bg-game-card px-1 rounded text-[10px] ml-1">/play/board</code>
                </li>
                <li className="flex gap-2 text-[11px] text-gray-400">
                  <span className="shrink-0 size-4 rounded-full bg-primary/20 text-primary font-black text-[10px] flex items-center justify-center">3</span>
                  El tablero se sincroniza automáticamente en tiempo real
                </li>
              </ol>
            </div>
          </div>

          {/* Status + Launch */}
          <div className="mt-auto flex flex-col gap-3">
            <div className="bg-game-card border border-warm-border rounded-xl p-4 flex flex-col gap-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center">
                Status Ready
              </p>
              <p className="text-[11px] text-center text-gray-400">
                <span className="text-primary font-bold">{selectedSet.title}</span>
                {' · '}{totalRounds} ronda{totalRounds !== 1 ? 's' : ''}
                {' · '}{team1Name || 'Equipo 1'} vs {team2Name || 'Equipo 2'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLaunch}
              className="w-full h-16 rounded-2xl bg-primary text-game-board font-black text-lg uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(219,166,31,0.3)]"
              aria-label="Lanzar juego"
            >
              <span className="material-symbols-outlined text-2xl">rocket_launch</span>
              Lanzar Juego
            </button>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-warm-border px-8 py-2 flex items-center justify-between text-[10px] text-gray-600 font-medium uppercase tracking-widest">
        <span>Hardware Accelerated</span>
        <span className="text-primary font-bold italic">La Respuesta más Popular · Control Engine v2.4.0</span>
      </footer>
    </div>
  )
}
