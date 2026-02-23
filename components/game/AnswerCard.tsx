'use client'

import type { Answer } from '@/types/question.types'

export interface AnswerCardProps {
  answer: Answer
  isRevealed: boolean
  orderIndex: number
  onReveal: () => void
  disabled?: boolean
  /**
   * `true` (default) → modo moderador: fila compacta con botón Reveal, texto visible para el host.
   * `false` → modo tablero público: slot grande con flip animation, texto oculto hasta revelar.
   */
  interactive?: boolean
  className?: string
}

/**
 * Tarjeta de respuesta del juego.
 *
 * Componente puro — no accede a ningún contexto. Recibe todo por props.
 *
 * - `interactive={true}` (default) → panel del moderador (`/play/control`): el host ve el texto
 *   siempre, tiene botón Reveal y puede hacer click en la fila.
 * - `interactive={false}` → tablero público (`/play/board`): el número queda oculto al público
 *   hasta revelar; al revelar se activa la animación CSS flip.
 *
 * Hotkeys (teclas 1-8): deben manejarse en el componente padre (`GameControlPanel`),
 * que llama a `onReveal` del card correspondiente.
 */
export function AnswerCard({
  answer,
  isRevealed,
  orderIndex,
  onReveal,
  disabled = false,
  interactive = true,
  className = '',
}: AnswerCardProps): React.ReactElement {
  const canReveal = interactive && !isRevealed && !disabled

  // ─── Modo tablero público (interactive={false}) ───────────────────────────
  if (!interactive) {
    return (
      <div className={`relative h-20 overflow-hidden rounded-lg ${className}`}>
        {isRevealed ? (
          // Slot revelado — animación flip en mount via key
          <div
            key="revealed"
            className="revealed-slot absolute inset-0 flex items-center justify-between px-5 rounded-lg border-b-4 border-gray-300 animate-slot-reveal"
          >
            <span className="answer-text text-xl font-black uppercase tracking-wider truncate pr-3">
              {answer.text}
            </span>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary rounded-md shadow-sm">
              <span className="text-game-board text-xl font-black">{answer.points}</span>
            </div>
          </div>
        ) : (
          // Slot oculto — solo el número
          <div
            key="hidden"
            className="absolute inset-0 border border-primary/30 bg-gradient-to-br from-warm-border-subtle/40 to-black/80 flex items-center justify-center shadow-inner rounded-lg"
          >
            <span className="text-primary text-3xl font-bold italic opacity-20">
              {orderIndex}
            </span>
          </div>
        )}
      </div>
    )
  }

  // ─── Modo moderador (interactive={true}) ─────────────────────────────────
  if (isRevealed) {
    return (
      <div
        className={`flex items-center gap-4 bg-game-panel/40 border-2 border-primary rounded-xl p-4 shadow-lg ${className}`}
      >
        {/* Número */}
        <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary text-game-board font-black rounded-lg text-lg">
          {orderIndex}
        </span>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold uppercase tracking-wide truncate">{answer.text}</p>
        </div>

        {/* Puntos + badge */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-2xl font-black text-primary">{answer.points}</span>
          <div className="px-3 py-1.5 bg-warm-border/50 text-gray-400 rounded-lg text-[10px] font-black text-center uppercase border border-warm-border">
            Revelada
          </div>
        </div>
      </div>
    )
  }

  // Moderador — no revelada (visible para el host, con botón Reveal)
  return (
    <button
      type="button"
      onClick={canReveal ? onReveal : undefined}
      disabled={disabled}
      aria-label={`Revelar respuesta ${orderIndex}: ${answer.text}`}
      className={`w-full flex items-center gap-4 bg-game-card border border-warm-border rounded-xl p-4 transition-all duration-200 group
        ${canReveal ? 'hover:border-primary/50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
        ${className}`}
    >
      {/* Número */}
      <span
        className={`w-10 h-10 flex-shrink-0 flex items-center justify-center font-black rounded-lg text-lg transition-colors duration-200
          ${canReveal ? 'bg-warm-border text-gray-400 group-hover:bg-primary group-hover:text-game-board' : 'bg-warm-border/50 text-gray-600'}`}
      >
        {orderIndex}
      </span>

      {/* Texto (visible para moderador) */}
      <div className="flex-1 min-w-0 text-left">
        <p
          className={`text-base font-bold uppercase tracking-wide truncate transition-colors duration-200
            ${canReveal ? 'text-gray-400 group-hover:text-white' : 'text-gray-600'}`}
        >
          {answer.text}
        </p>
      </div>

      {/* Puntos + botón Reveal */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <span
          className={`text-2xl font-black transition-colors duration-200
            ${canReveal ? 'text-warm-border group-hover:text-primary/50' : 'text-gray-700'}`}
        >
          {answer.points}
        </span>

        {canReveal ? (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-primary text-game-board rounded-lg text-[10px] font-black uppercase hover:brightness-110 transition-all shadow-lg min-w-[5.5rem] justify-center">
            <span className="material-symbols-outlined text-sm font-black leading-none">
              visibility
            </span>
            Reveal
          </div>
        ) : (
          <div className="px-3 py-2 bg-warm-border/10 rounded-lg text-[10px] font-black text-gray-700 text-center uppercase min-w-[5.5rem]">
            Hidden
          </div>
        )}
      </div>
    </button>
  )
}
