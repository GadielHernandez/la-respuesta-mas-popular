'use client'

import { useState } from 'react'

import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { GameControlPanel } from '@/components/game/GameControlPanel'

/**
 * Página del moderador — panel de control del juego.
 *
 * Al cargar, detecta si hay una partida guardada en localStorage y
 * muestra un prompt para que el moderador decida si continuar o reiniciar.
 */
export default function ControlPage(): React.ReactElement {
  const { hasSavedGame, restoreSavedGame, dispatch, gameSaveState } = useGame()
  const [dismissed, setDismissed] = useState(false)

  const showPrompt = hasSavedGame && !dismissed

  const handleContinue = (): void => {
    restoreSavedGame()
    setDismissed(true)
  }

  const handleNewGame = (): void => {
    dispatch({ type: 'RESET_GAME' })
    setDismissed(true)
  }

  return (
    <>
      <GameControlPanel />

      {/* ── Banner: estado del guardado de la partida ────────────────────── */}
      {gameSaveState === 'saving' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-game-card border border-warm-border shadow-lg text-sm text-gray-300">
          <span className="material-symbols-outlined text-primary text-base animate-spin leading-none">progress_activity</span>
          Guardando partida…
        </div>
      )}

      {gameSaveState === 'saved' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-game-card border border-success/40 shadow-lg text-sm text-success">
          <span className="material-symbols-outlined text-base leading-none">check_circle</span>
          Partida guardada en el historial
        </div>
      )}

      {gameSaveState === 'error' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-game-card border border-danger-strike/40 shadow-lg text-sm text-danger-strike">
          <span className="material-symbols-outlined text-base leading-none">error</span>
          No se pudo guardar la partida
        </div>
      )}

      {/* ── Modal: continuar partida guardada ───────────────────────────── */}
      <Modal
        isOpen={showPrompt}
        onClose={handleNewGame}
        title="Continuar partida"
        dismissible={false}
        footer={
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="outline"
              onClick={handleNewGame}
              ariaLabel="Iniciar nuevo juego"
            >
              Nuevo juego
            </Button>
            <Button
              variant="primary"
              onClick={handleContinue}
              ariaLabel="Continuar partida guardada"
            >
              Sí, continuar
            </Button>
          </div>
        }
      >
        <p className="text-gray-300 text-sm leading-relaxed">
          Se encontró una partida guardada. ¿Deseas continuar desde donde la dejaste?
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Selecciona <strong className="text-gray-400">Nuevo juego</strong> para descartarla e iniciar desde cero.
        </p>
      </Modal>
    </>
  )
}
