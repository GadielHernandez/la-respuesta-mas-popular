export interface StrikeIndicatorProps {
  /** Número de strikes actuales (0 al valor de maxStrikes) */
  strikes: number
  /** Máximo de strikes antes de perder el turno (default: 3) */
  maxStrikes?: number
  /**
   * `board` (default) → iconos grandes con glow rojo, dentro de glass-panel, para proyector.
   * `control` → cuadros compactos con borde rojo, para panel del moderador.
   */
  displayMode?: 'board' | 'control'
  className?: string
}

/**
 * Indicador de strikes del equipo activo.
 *
 * Componente puro — solo props, sin contexto.
 * La animación del strike nuevo usa `key` dinámico por slot: cuando el slot
 * pasa de inactivo a activo cambia su key, forzando re-mount y
 * re-disparando `.animate-strike-in` — sin useState ni useEffect.
 */
export function StrikeIndicator({
  strikes,
  maxStrikes = 3,
  displayMode = 'board',
  className = '',
}: StrikeIndicatorProps): React.ReactElement {
  const slots = [...Array(maxStrikes).keys()]
  const isActive = (i: number): boolean => i < strikes

  // ─── Modo tablero público ─────────────────────────────────────────────────
  if (displayMode === 'board') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className="glass-panel px-8 py-4 rounded-xl flex items-center justify-center gap-10 shadow-xl">
          {slots.map(i => (
            <span
              key={isActive(i) ? `active-${i}` : `inactive-${i}`}
              className={`material-symbols-outlined text-[70px] leading-none select-none
                ${isActive(i) ? 'text-glow-red animate-strike-in' : 'text-white/5'}`}
              aria-label={isActive(i) ? 'Strike' : 'Sin strike'}
            >
              close
            </span>
          ))}
        </div>
        <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">
          Strikes
        </p>
      </div>
    )
  }

  // ─── Modo panel de moderador ──────────────────────────────────────────────
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        Marcador de Errores
      </span>

      <div className="flex gap-3">
        {slots.map(i => (
          <div
            key={isActive(i) ? `active-${i}` : `inactive-${i}`}
            className={`size-14 rounded-xl border-4 flex items-center justify-center transition-all duration-300
              ${isActive(i)
                ? 'border-danger-strike bg-danger-strike/10 shadow-[0_0_15px_rgba(188,44,44,0.4)] animate-strike-in'
                : 'border-warm-border'
              }`}
            aria-label={isActive(i) ? 'Strike activo' : 'Sin strike'}
          >
            <span
              className={`material-symbols-outlined text-3xl leading-none select-none font-black
                ${isActive(i) ? 'text-danger-strike' : 'text-warm-border'}`}
            >
              close
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
