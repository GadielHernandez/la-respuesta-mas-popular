import type { GameState } from '@/types/game.types'

import { AnswerCard } from '@/components/game/AnswerCard'
import { QuestionDisplay } from '@/components/game/QuestionDisplay'
import { StrikeIndicator } from '@/components/game/StrikeIndicator'
import { TeamScore } from '@/components/game/TeamScore'

export interface GameBoardDisplayProps {
  /** Estado completo del juego. Viene de `useGameBoard()` en `/play/board`. */
  state: GameState
}

/** No-op para AnswerCard en modo no-interactivo (el tablero público nunca revela) */
function noop(): void {}

/**
 * Tablero público del juego — modo proyector / pantalla pública.
 *
 * Componente puro de presentación: recibe `state: GameState` por props.
 * No accede a ningún contexto ni dispara acciones.
 *
 * Layout:
 * - Spotlight + corner decorators + top gold line
 * - Header: pregunta actual (QuestionDisplay board)
 * - Main (3 cols): TeamScore | Puntos + AnswerGrid + StrikeIndicator | TeamScore
 *
 * Cuando la fase es `setup` o no hay pregunta activa muestra un mensaje de espera.
 */
export function GameBoardDisplay({ state }: GameBoardDisplayProps): React.ReactElement {
  const currentQuestion = state.questions[state.currentQuestionIndex]

  if (state.phase === 'setup' || !currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-game-board">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Esperando inicio del juego...
        </p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-game-board flex flex-col items-center select-none overflow-hidden">
      {/* Spotlight radial glow desde la parte superior */}
      <div className="fixed inset-0 spotlight pointer-events-none" />

      {/* Línea dorada superior */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Corner decorators */}
      <div className="fixed top-0 left-0 ml-6 mt-6 w-32 h-32 border-t-2 border-l-2 border-primary/20 pointer-events-none" />
      <div className="fixed top-0 right-0 mr-6 mt-6 w-32 h-32 border-t-2 border-r-2 border-primary/20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 ml-6 mb-6 w-32 h-32 border-b-2 border-l-2 border-primary/20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 mr-6 mb-6 w-32 h-32 border-b-2 border-r-2 border-primary/20 pointer-events-none" />

      {/* Header — pregunta actual */}
      <header className="relative z-20 w-full pt-12 flex flex-col items-center">
        <QuestionDisplay
          question={currentQuestion.text}
          roundNumber={state.currentRound}
          multiplier={state.multiplier}
          totalRounds={state.totalRounds}
          variant="board"
        />
      </header>

      {/* Main — equipos + respuestas */}
      <main className="relative z-10 w-full max-w-[1920px] flex-1 flex items-center justify-between px-16 gap-4">

        {/* Equipo 1 — izquierda */}
        <aside className="w-64 flex flex-col items-center justify-center h-full">
          <TeamScore
            teamName={state.team1.name}
            score={state.team1.score}
            isActive={state.activeTeam === 'team1'}
            variant="team1"
            displayMode="board"
          />
        </aside>

        {/* Centro — puntos + grid de respuestas + strikes */}
        <section className="flex-1 flex flex-col items-center justify-center">

          {/* Puntos acumulados en la ronda */}
          <div className="mb-8 flex flex-col items-center">
            <span className="text-primary/60 text-xs font-bold tracking-[0.3em] uppercase mb-1">
              Puntos Acumulados
            </span>
            <div className="glass-panel px-10 py-3 rounded-xl pot-glow">
              <span className="text-5xl font-black text-primary leading-none">
                {state.roundPoints}
              </span>
            </div>
          </div>

          {/* Grid de respuestas 2 columnas */}
          <div className="grid grid-cols-2 gap-5 w-full max-w-4xl p-6 rounded-2xl board-gradient border border-warm-border-subtle/30 shadow-2xl">
            {currentQuestion.answers.map((answer, idx) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                isRevealed={state.revealedAnswers.includes(idx)}
                orderIndex={answer.orderIndex}
                onReveal={noop}
                interactive={false}
              />
            ))}
          </div>

          {/* Strikes */}
          <div className="mt-12">
            <StrikeIndicator strikes={state.strikes} displayMode="board" />
          </div>
        </section>

        {/* Equipo 2 — derecha */}
        <aside className="w-64 flex flex-col items-center justify-center h-full">
          <TeamScore
            teamName={state.team2.name}
            score={state.team2.score}
            isActive={state.activeTeam === 'team2'}
            variant="team2"
            displayMode="board"
          />
        </aside>
      </main>
    </div>
  )
}
