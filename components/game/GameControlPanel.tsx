'use client'

import { useGame } from '@/contexts/GameContext'

import { AnswerCard } from '@/components/game/AnswerCard'
import { GameButton } from '@/components/game/GameButton'
import { GameControls } from '@/components/game/GameControls'
import { QuestionDisplay } from '@/components/game/QuestionDisplay'
import { StrikeIndicator } from '@/components/game/StrikeIndicator'
import { TeamScore } from '@/components/game/TeamScore'

/**
 * Panel de control del moderador — fuente de verdad del juego.
 *
 * Accede a `useGame()` para leer el estado y despachar acciones.
 * Debe estar dentro de un `GameProvider`.
 *
 * Layout (3 columnas):
 * - Izquierda (w-1/5): marcadores de equipo + botones de robo
 * - Centro (w-[55%]): pregunta actual + lista de respuestas
 * - Derecha (w-1/4): strikes + botón Strike + siguiente pregunta
 */
export function GameControlPanel(): React.ReactElement {
  const { state, dispatch } = useGame()
  const currentQuestion = state.questions[state.currentQuestionIndex]

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleRevealAnswer = (idx: number): void => {
    dispatch({ type: 'REVEAL_ANSWER', payload: idx })
  }

  const handleAddStrike = (): void => {
    dispatch({ type: 'ADD_STRIKE' })
  }

  const handleSwitchTeam = (): void => {
    dispatch({ type: 'SWITCH_TEAM' })
  }

  const handleNextQuestion = (): void => {
    dispatch({ type: 'NEXT_QUESTION' })
  }

  const handleStealSuccess = (): void => {
    if (!currentQuestion) return
    const firstUnrevealed = currentQuestion.answers.findIndex(
      (_, idx) => !state.revealedAnswers.includes(idx)
    )
    dispatch({ type: 'ATTEMPT_STEAL', payload: firstUnrevealed })
  }

  const handleStealFail = (): void => {
    dispatch({ type: 'ATTEMPT_STEAL', payload: -1 })
  }

  const handleResetGame = (): void => {
    dispatch({ type: 'RESET_GAME' })
  }

  const isSetupOrFinished = state.phase === 'setup' || state.phase === 'finished'

  return (
    <div className="min-h-screen bg-game-moderator flex flex-col overflow-hidden">

      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-warm-border px-6 py-2 bg-game-card/50 backdrop-blur-md sticky top-0 z-50">

        {/* Logo + título */}
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-primary">trophy</span>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-white">
              Control Panel
            </h2>
            <p className="text-[10px] text-primary font-medium uppercase tracking-widest leading-none">
              {state.phase === 'setup'
                ? 'Esperando inicio'
                : `Ronda ${state.currentRound} de ${state.totalRounds}`}
            </p>
          </div>
        </div>

        {/* Puntos acumulados */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-0.5">
            Puntos Acumulados
          </span>
          <div className="bg-game-card border border-primary/50 px-6 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(219,166,31,0.2)]">
            <span className="material-symbols-outlined text-primary text-lg">database</span>
            <span className="text-xl font-black text-white tracking-tighter">
              {state.roundPoints}
            </span>
          </div>
        </div>

        {/* Navegación de rondas */}
        <nav
          className="flex items-center bg-game-board rounded-lg p-0.5 border border-warm-border"
          aria-label="Rondas"
        >
          {Array.from({ length: state.totalRounds }, (_, i) => i + 1).map(round => (
            <span
              key={round}
              className={`px-3 py-1 rounded text-xs font-bold
                ${round === state.currentRound
                  ? 'bg-primary text-game-board'
                  : 'text-gray-400'
                }`}
            >
              R{round}
            </span>
          ))}
        </nav>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6">

        {/* ── Columna izquierda — equipos ─────────────────────────────────── */}
        <section className="w-1/5 flex flex-col gap-4">
          <div className="px-2">
            <h3 className="text-sm font-bold flex items-center gap-2 text-gray-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">groups</span>
              Equipos
            </h3>
            <p className="text-[10px] text-gray-500 mt-1">
              Equipo con posesión activa de la ronda
            </p>
          </div>

          <TeamScore
            teamName={state.team1.name}
            score={state.team1.score}
            isActive={state.activeTeam === 'team1'}
            variant="team1"
            displayMode="control"
          />

          <TeamScore
            teamName={state.team2.name}
            score={state.team2.score}
            isActive={state.activeTeam === 'team2'}
            variant="team2"
            displayMode="control"
          />

          {/* Cambiar turno manual */}
          <GameButton
            variant="utility"
            icon="swap_horiz"
            onClick={handleSwitchTeam}
            disabled={isSetupOrFinished}
            ariaLabel="Cambiar turno al equipo contrario"
          >
            CAMBIAR TURNO
          </GameButton>

          {/* Fase de robo */}
          <div className="mt-auto border-t border-warm-border pt-4">
            <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest mb-3">
              Fase de Robo
            </p>
            <div
              className={`bg-game-card/30 border border-dashed border-warm-border rounded-xl p-3 space-y-2 transition-opacity duration-300
                ${state.phase !== 'stealing' ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <GameButton
                variant="steal-gold"
                icon="swap_horiz"
                onClick={handleStealSuccess}
                ariaLabel="Robo exitoso"
              >
                ROBO EXITOSO
              </GameButton>
              <GameButton
                variant="steal-danger"
                icon="close"
                onClick={handleStealFail}
                ariaLabel="Robo fallido"
              >
                ROBO FALLIDO
              </GameButton>
            </div>
          </div>
        </section>

        {/* ── Columna central — pregunta + respuestas ──────────────────────── */}
        <section className="w-[55%] flex flex-col gap-6">
          {currentQuestion ? (
            <>
              <QuestionDisplay
                question={currentQuestion.text}
                roundNumber={state.currentRound}
                multiplier={state.multiplier}
                totalRounds={state.totalRounds}
                variant="control"
              />

              <div
                className="flex-1 overflow-y-auto pr-2 space-y-3"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#383429 #171611' }}
              >
                {currentQuestion.answers.map((answer, idx) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    isRevealed={state.revealedAnswers.includes(idx)}
                    orderIndex={answer.orderIndex}
                    onReveal={() => handleRevealAnswer(idx)}
                    disabled={isSetupOrFinished}
                    interactive={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Sin pregunta activa
              </p>
            </div>
          )}
        </section>

        {/* ── Columna derecha — strikes + controles ───────────────────────── */}
        <section className="w-1/4 flex flex-col gap-6">

          {/* Marcador de strikes */}
          <div className="bg-game-card border border-warm-border rounded-2xl p-6 flex flex-col items-center">
            <StrikeIndicator strikes={state.strikes} displayMode="control" />
          </div>

          {/* Botones de acción — GameControls */}
          <GameControls
            onNextQuestion={handleNextQuestion}
            onAddStrike={handleAddStrike}
            onSwitchTeam={handleSwitchTeam}
            onResetGame={handleResetGame}
            canNextQuestion={!isSetupOrFinished}
            canAddStrike={state.phase === 'playing'}
          />

          {/* Estado de conexión */}
          <div className="mt-auto flex items-center justify-center gap-3 py-2 px-4 bg-game-card/30 rounded-full border border-warm-border/50">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Tablero conectado
            </span>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="h-8 border-t border-warm-border px-6 flex items-center justify-between bg-game-card text-[10px] text-gray-500 font-medium uppercase tracking-widest">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-green-500" />
            Engine: Activo
          </span>
          <span>Fase: {state.phase}</span>
          {state.phase !== 'setup' && (
            <span className="flex items-center gap-1 text-green-500/60">
              <span className="material-symbols-outlined text-[10px] leading-none">save</span>
              Auto-guardado
            </span>
          )}
        </div>
        <span className="text-primary font-bold">La Respuesta más Popular</span>
      </footer>
    </div>
  )
}
