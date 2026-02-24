'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export interface GameControlsProps {
  /** Avanzar a la siguiente pregunta */
  onNextQuestion: () => void
  /** Agregar un strike manual al equipo activo */
  onAddStrike: () => void
  /** Cambiar el equipo con posesión del turno */
  onSwitchTeam: () => void
  /** Reiniciar el juego completo (acción destructiva — muestra confirmación) */
  onResetGame: () => void
  /** Habilita el botón "Siguiente Pregunta" (false cuando el juego está en setup) */
  canNextQuestion: boolean
  /** Habilita el botón "Strike" (true solo en fase `playing`) */
  canAddStrike: boolean
  className?: string
}

/**
 * Controles de acción del moderador.
 *
 * Componente exclusivo de `/play/control` — nunca aparece en el tablero público.
 * Recibe callbacks ya conectados al `dispatch` del `GameContext`.
 *
 * Acciones:
 * - **Strike** → agrega un fallo al equipo activo
 * - **Siguiente Pregunta** → avanza la ronda
 * - **Cambiar Turno** → transfiere posesión al equipo contrario
 * - **Reiniciar Juego** → resetea el estado (con confirmación modal)
 */
export function GameControls({
  onNextQuestion,
  onAddStrike,
  onSwitchTeam,
  onResetGame,
  canNextQuestion,
  canAddStrike,
  className = '',
}: GameControlsProps): React.ReactElement {
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleResetConfirm = (): void => {
    onResetGame()
    setShowResetConfirm(false)
  }

  return (
    <>
      <div className={`flex flex-col gap-3 ${className}`}>

        {/* ── Strike ──────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={onAddStrike}
          disabled={!canAddStrike}
          aria-label="Agregar strike al equipo activo"
          title={canAddStrike ? 'Agregar strike' : 'Solo disponible en fase de juego'}
          className="w-full h-14 bg-danger-strike text-white rounded-xl font-black text-base flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none group"
        >
          <span className="material-symbols-outlined text-xl font-black group-active:scale-125 transition-transform">
            close
          </span>
          STRIKE
        </button>

        {/* ── Siguiente pregunta ───────────────────────────────────────────── */}
        <button
          type="button"
          onClick={onNextQuestion}
          disabled={!canNextQuestion}
          aria-label="Avanzar a la siguiente pregunta"
          title={canNextQuestion ? 'Siguiente pregunta' : 'No disponible en fase de configuración'}
          className="w-full h-14 bg-primary text-game-board rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(219,166,31,0.4)] transition-all disabled:opacity-40 disabled:pointer-events-none group"
        >
          SIGUIENTE PREGUNTA
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* ── Cambiar turno ────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={onSwitchTeam}
          aria-label="Cambiar turno al equipo contrario"
          title="Transferir posesión al equipo contrario"
          className="w-full py-2.5 bg-game-card border border-warm-border rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-warm-border transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">swap_horiz</span>
          CAMBIAR TURNO
        </button>

        {/* ── Reiniciar juego ──────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          aria-label="Reiniciar juego completo"
          title="Reiniciar el juego desde el principio"
          className="w-full py-2.5 bg-transparent border border-warm-border rounded-lg text-xs font-bold text-gray-500 hover:text-danger-strike hover:border-danger-strike/50 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">restart_alt</span>
          REINICIAR JUEGO
        </button>
      </div>

      {/* ── Modal de confirmación de reset ──────────────────────────────────── */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reiniciar Juego"
        footer={
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(false)}
              ariaLabel="Cancelar reinicio"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleResetConfirm}
              ariaLabel="Confirmar reinicio del juego"
            >
              Sí, reiniciar
            </Button>
          </div>
        }
      >
        <p className="text-gray-300 text-sm leading-relaxed">
          ¿Estás seguro que deseas reiniciar el juego? Se perderán todos los puntos
          y el progreso de la partida actual.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Esta acción no se puede deshacer.
        </p>
      </Modal>
    </>
  )
}
