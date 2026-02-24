import { cn } from '@/lib/utils'

/**
 * Variantes visuales de los botones de acción del panel de juego.
 *
 * - `action-danger`   → Strike (fondo rojo, h-14, activo escala)
 * - `action-gold`     → Siguiente Pregunta (fondo dorado, h-14, shadow glow hover)
 * - `utility`         → Acciones compactas con borde cálido (Cambiar Turno)
 * - `utility-danger`  → Acción destructiva compacta (Reiniciar Juego)
 * - `steal-gold`      → Robo Exitoso (borde dorado, hover invierte a fondo dorado)
 * - `steal-danger`    → Robo Fallido (borde rojo, hover invierte a fondo rojo)
 */
export type GameButtonVariant =
  | 'action-danger'
  | 'action-gold'
  | 'utility'
  | 'utility-danger'
  | 'steal-gold'
  | 'steal-danger'

export interface GameButtonProps {
  /** Variante visual del botón. Default: `utility` */
  variant?: GameButtonVariant
  /** Nombre del Material Symbol a mostrar (e.g. `'close'`, `'arrow_forward'`) */
  icon?: string
  /** Posición del ícono relativa al texto. Default: `left` */
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  title?: string
  type?: 'button' | 'submit'
}

// ─── Clases por variante ────────────────────────────────────────────────────

const variantClasses: Record<GameButtonVariant, string> = {
  'action-danger':
    'h-14 rounded-xl bg-danger-strike text-white text-base border-0 ' +
    'hover:brightness-110 active:scale-95 group',

  'action-gold':
    'h-14 rounded-xl bg-primary text-game-board text-sm ' +
    'hover:shadow-[0_0_20px_rgba(219,166,31,0.4)] group',

  'utility':
    'py-2.5 rounded-lg bg-game-card border border-warm-border ' +
    'text-xs text-gray-400 hover:text-white hover:bg-warm-border',

  'utility-danger':
    'py-2.5 rounded-lg bg-transparent border border-warm-border ' +
    'text-xs text-gray-500 hover:text-danger-strike hover:border-danger-strike/50',

  'steal-gold':
    'py-3 rounded-lg bg-game-card border border-primary/20 ' +
    'text-xs text-primary hover:bg-primary hover:text-game-board',

  'steal-danger':
    'py-3 rounded-lg bg-game-card border border-danger-strike/20 ' +
    'text-xs text-danger-strike hover:bg-danger-strike hover:text-white',
}

// ─── Componente ─────────────────────────────────────────────────────────────

/**
 * Botón de acción del panel de juego.
 *
 * Componente puro — sin hooks, sin `'use client'`.
 * Encapsula las variantes visuales del panel del moderador para evitar
 * duplicación de clases Tailwind entre `GameControls` y `GameControlPanel`.
 *
 * @example
 * // Botón primario rojo (Strike)
 * <GameButton variant="action-danger" icon="close" onClick={onAddStrike} disabled={!canAddStrike}>
 *   STRIKE
 * </GameButton>
 *
 * // Botón utilitario compacto
 * <GameButton variant="utility" icon="swap_horiz" onClick={onSwitchTeam}>
 *   CAMBIAR TURNO
 * </GameButton>
 */
export function GameButton({
  variant = 'utility',
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  children,
  className,
  ariaLabel,
  title,
  type = 'button',
}: GameButtonProps): React.ReactElement {
  const iconEl = icon ? (
    <span
      className={cn(
        'material-symbols-outlined text-sm leading-none select-none',
        // La flecha de "Siguiente Pregunta" se desliza en hover
        variant === 'action-gold' && iconPosition === 'right' &&
          'font-black group-hover:translate-x-1 transition-transform',
        // El ícono de Strike escala al activar
        variant === 'action-danger' && 'font-black group-active:scale-125 transition-transform',
      )}
    >
      {icon}
    </span>
  ) : null

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        // Base — compartida por todas las variantes
        'w-full flex items-center justify-center gap-2 font-black transition-all',
        'disabled:opacity-40 disabled:pointer-events-none',
        // Variante específica
        variantClasses[variant],
        className,
      )}
    >
      {iconPosition === 'left' && iconEl}
      {children}
      {iconPosition === 'right' && iconEl}
    </button>
  )
}
