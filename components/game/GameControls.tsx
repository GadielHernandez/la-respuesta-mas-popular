'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

import { GameButton } from '@/components/game/GameButton'

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
        <GameButton
          variant="action-danger"
          icon="close"
          onClick={onAddStrike}
          disabled={!canAddStrike}
          ariaLabel="Agregar strike al equipo activo"
          title={canAddStrike ? 'Agregar strike' : 'Solo disponible en fase de juego'}
        >
          STRIKE
        </GameButton>

        {/* ── Siguiente pregunta ───────────────────────────────────────────── */}
        <GameButton
          variant="action-gold"
          icon="arrow_forward"
          iconPosition="right"
          onClick={onNextQuestion}
          disabled={!canNextQuestion}
          ariaLabel="Avanzar a la siguiente pregunta"
          title={canNextQuestion ? 'Siguiente pregunta' : 'No disponible en fase de configuración'}
        >
          SIGUIENTE PREGUNTA
        </GameButton>

        {/* ── Cambiar turno ────────────────────────────────────────────────── */}
        <GameButton
          variant="utility"
          icon="swap_horiz"
          onClick={onSwitchTeam}
          ariaLabel="Cambiar turno al equipo contrario"
          title="Transferir posesión al equipo contrario"
        >
          CAMBIAR TURNO
        </GameButton>

        {/* ── Reiniciar juego ──────────────────────────────────────────────── */}
        <GameButton
          variant="utility-danger"
          icon="restart_alt"
          onClick={() => setShowResetConfirm(true)}
          ariaLabel="Reiniciar juego completo"
          title="Reiniciar el juego desde el principio"
        >
          REINICIAR JUEGO
        </GameButton>
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
