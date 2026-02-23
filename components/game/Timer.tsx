'use client'

import { useEffect, useRef, useState } from 'react'

export interface TimerProps {
  /** Duración total en segundos. Cambia la key del componente (desde el padre) para resetear. */
  duration: number
  /** `true` = corriendo · `false` = pausado */
  isActive: boolean
  /** Callback cuando el contador llega a 0 */
  onExpire: () => void
  /** Callback en cada tick con los segundos restantes */
  onTick?: (remaining: number) => void
  /**
   * `true` en `/play/board` — solo muestra el valor recibido via prop `duration`,
   * nunca corre su propio interval. El padre pasa el tiempo actualizado via BC.
   */
  readonly?: boolean
  className?: string
}

/** Formatea segundos a MM:SS */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Color del arco SVG según tiempo restante */
function getRingColor(remaining: number, duration: number): string {
  if (duration === 0) return '#383429'
  const pct = remaining / duration
  if (remaining <= 10) return '#bc2c2c' // danger-strike
  if (pct <= 0.5) return '#FF8C42'     // warning
  return '#22c55e'                      // success
}

/**
 * Componente de countdown timer.
 *
 * Dos modos:
 * - `readonly={false}` (default) → corre su propio interval. Usado en `/play/control`.
 *   El padre controla start/pause via `isActive`, y resetea cambiando la `key`.
 * - `readonly={true}` → solo muestra el valor de `duration` prop (actualizado via BC).
 *   Usado en `/play/board` — nunca corre interval propio.
 *
 * Note: setState dentro del callback de setInterval es asíncrono (no en el body del effect),
 * por lo que NO viola la regla react-hooks/set-state-in-effect.
 */
export function Timer({
  duration,
  isActive,
  onExpire,
  onTick,
  readonly = false,
  className = '',
}: TimerProps): React.ReactElement {
  const [remaining, setRemaining] = useState(duration)

  // Refs para callbacks — evita stale closures sin agregar al dep array del effect
  const onExpireRef = useRef(onExpire)
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  // Countdown interval — solo en modo activo y no-readonly
  useEffect(() => {
    if (readonly || !isActive) return

    const id = setInterval(() => {
      // setState asíncrono dentro del callback — válido, no viola set-state-in-effect
      setRemaining(prev => {
        if (prev <= 1) {
          onExpireRef.current()
          onTickRef.current?.(0)
          return 0
        }
        const next = prev - 1
        onTickRef.current?.(next)
        return next
      })
    }, 1000)

    return (): void => clearInterval(id)
  }, [isActive, readonly])

  // En readonly el tiempo mostrado viene del prop (BroadcastChannel lo actualiza)
  const displayTime = readonly ? duration : remaining

  // SVG ring
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const progress = duration > 0 ? displayTime / duration : 0
  const dashOffset = circumference * (1 - progress)
  const ringColor = getRingColor(displayTime, duration)

  const isUrgent = displayTime <= 10 && displayTime > 0
  const isExpired = displayTime === 0

  return (
    <div
      className={`flex flex-col items-center gap-2 ${className}`}
      role="timer"
      aria-label={`Tiempo restante: ${formatTime(displayTime)}`}
      aria-live="off"
    >
      <div className="relative">
        {/* SVG circular ring — rotado -90° para que empiece desde arriba */}
        <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90" aria-hidden="true">
          {/* Track de fondo */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#383429"
            strokeWidth="7"
          />
          {/* Arco de progreso */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: isActive && !readonly ? 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' : 'none',
            }}
          />
        </svg>

        {/* Tiempo en el centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-xl font-black tabular-nums leading-none transition-colors duration-500
              ${isExpired
                ? 'text-danger-strike'
                : isUrgent
                  ? 'text-danger-strike animate-pulse'
                  : 'text-white'
              }`}
          >
            {formatTime(displayTime)}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        Tiempo
      </span>
    </div>
  )
}
