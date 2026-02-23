export interface QuestionDisplayProps {
  question: string
  roundNumber: number
  multiplier: number
  totalRounds: number
  /** Visual variant: `board` = tablero público (proyector), `control` = panel del moderador */
  variant?: 'board' | 'control'
  className?: string
}

/**
 * Muestra la pregunta actual del juego.
 *
 * Componente puro — no accede a ningún contexto. Recibe todo por props,
 * lo que permite usarlo tanto en el tablero público (datos de `useGameBoard()`)
 * como en el panel del moderador (datos de `useGame()`).
 *
 * - `variant="board"` → texto grande dorado con glow, para proyector
 * - `variant="control"` → tarjeta compacta con acento gold, para moderador
 *
 * La prop `question` actúa como `key` en el texto animado, provocando
 * un re-mount del elemento y re-disparando la animación CSS `.animate-question-fade`
 * en cada cambio de pregunta — sin setState ni useEffect.
 */
export function QuestionDisplay({
  question,
  roundNumber,
  multiplier,
  totalRounds,
  variant = 'board',
  className = '',
}: QuestionDisplayProps): React.ReactElement {
  if (variant === 'control') {
    return (
      <div
        className={`bg-game-card border border-warm-border rounded-xl p-6 shadow-2xl relative overflow-hidden ${className}`}
      >
        {/* Left gold accent bar */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-xl" />

        {/* Header row */}
        <div className="flex items-center justify-between mb-3 pl-3">
          <span className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">
            Pregunta actual
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            Ronda {roundNumber} de {totalRounds}
          </span>
        </div>

        {/* Question text — key forces re-mount → re-triggers CSS animation */}
        <h2
          key={question}
          className="text-2xl font-extrabold text-white leading-tight pl-3 animate-question-fade"
        >
          {question}
        </h2>

        {/* Multiplier badge (only if > 1) */}
        {multiplier > 1 && (
          <div className="mt-3 pl-3">
            <span className="multiplier-badge inline-block px-3 py-0.5 rounded-full text-[10px] font-black tracking-tighter uppercase italic text-game-board border border-white/20">
              x{multiplier} Puntos
            </span>
          </div>
        )}
      </div>
    )
  }

  // variant === 'board'
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Badges row */}
      <div className="flex items-center gap-3 mb-5">
        {/* Round badge */}
        <div className="round-badge px-5 py-1 rounded-full">
          <span className="text-primary text-sm font-bold tracking-[0.4em] uppercase">
            Ronda {roundNumber}
          </span>
        </div>

        {/* Multiplier badge (only if > 1) */}
        {multiplier > 1 && (
          <div className="multiplier-badge px-4 py-1 rounded-full border border-white/20">
            <span className="text-game-board text-sm font-black tracking-tighter uppercase italic">
              x{multiplier} Puntos
            </span>
          </div>
        )}
      </div>

      {/* Question text — key forces re-mount → re-triggers CSS animation */}
      <h1
        key={question}
        className="text-primary text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center max-w-4xl text-glow-gold animate-question-fade"
      >
        {question}
      </h1>
    </div>
  )
}
