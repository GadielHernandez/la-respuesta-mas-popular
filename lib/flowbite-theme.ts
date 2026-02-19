import { createTheme } from 'flowbite-react'

/**
 * Tema global de Flowbite para La Respuesta más Popular.
 * Fuente de verdad visual: docs/design/ (pantallas de diseño Stitch).
 *
 * REGLA DE COLORES — siempre usar tokens de globals.css @theme, nunca hex:
 *   primary            → #DBA61F  (oro principal)
 *   primary-dark       → #C4931A  (oro oscuro hover)
 *   primary-light      → #E8C56A  (oro claro)
 *   danger-strike      → #BC2C2C  (rojo strike)
 *   warning            → #FF8C42  (naranja)
 *   success            → #22C55E  (verde)
 *   game-board         → #121212  (fondo base / bg-base)
 *   game-config        → #0F0F0C  (fondo config)
 *   game-panel         → #1A1814  (panel oscuro)
 *   game-card          → #26231C  (card / panel-alt)
 *   warm-border        → #383429  (borde cálido oscuro)
 *   warm-border-light  → #2D2A22  (borde cálido claro)
 *   warm-border-subtle → #463D25  (borde cálido sutil)
 *
 * Valores sin token (usar hex solo si no hay mapeo directo):
 *   #574d2e  — hover border ghost button (warm-border intermedio)
 *   #352a0d  — spinner track oscuro dorado
 */
export const stitchTheme = createTheme({
  /* ─────────────────────────────────────────────
     BUTTON
     Variants: primary | outline | danger | ghost
     Sizes:    xs | sm | md | lg | xl
  ───────────────────────────────────────────── */
  button: {
    base: 'group inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
    color: {
      // Gold fill — CTA principal
      primary:
        'border border-transparent bg-primary italic text-game-board hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_30px_rgba(219,166,31,0.4)] shadow-[0_0_20px_rgba(219,166,31,0.2)]',
      // Gold outline — acción secundaria
      outline:
        'border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_12px_rgba(219,166,31,0.2)]',
      // Rojo strike
      danger:
        'border border-transparent bg-danger-strike text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(188,44,44,0.3)]',
      // Neutro oscuro — acciones terciarias
      ghost:
        'border border-warm-border bg-transparent text-gray-400 hover:border-[#574d2e] hover:bg-game-card hover:text-white',
      // Soporte Flowbite defaults requeridos
      default:
        'border border-transparent bg-primary italic text-game-board hover:brightness-110',
      alternative: 'border border-warm-border bg-transparent text-gray-400 hover:bg-game-card',
      blue: 'border border-transparent bg-blue-600 text-white hover:brightness-110',
      cyan: 'border border-transparent bg-cyan-500 text-white hover:brightness-110',
      dark: 'border border-transparent bg-game-card text-white hover:bg-warm-border',
      green: 'border border-transparent bg-green-600 text-white hover:brightness-110',
      indigo: 'border border-transparent bg-indigo-600 text-white hover:brightness-110',
      light: 'border border-warm-border bg-game-panel text-gray-300 hover:bg-game-card',
      lime: 'border border-transparent bg-lime-500 text-white hover:brightness-110',
      pink: 'border border-transparent bg-pink-600 text-white hover:brightness-110',
      purple: 'border border-transparent bg-purple-600 text-white hover:brightness-110',
      red: 'border border-transparent bg-red-600 text-white hover:brightness-110',
      teal: 'border border-transparent bg-teal-500 text-white hover:brightness-110',
      yellow: 'border border-transparent bg-primary text-game-board hover:brightness-110',
      // Estados de éxito para feedback
      success: 'border border-transparent bg-green-600 text-white hover:brightness-110',
      failure: 'border border-transparent bg-danger-strike text-white hover:brightness-110',
      warning: 'border border-transparent bg-warning text-white hover:brightness-110',
      info: 'border border-transparent bg-blue-500 text-white hover:brightness-110',
    },
    outlineColor: {
      primary: 'border-primary text-primary',
      default: 'border-warm-border text-gray-400',
      alternative: 'border-warm-border text-gray-400',
      blue: 'border-blue-600 text-blue-400',
      cyan: 'border-cyan-500 text-cyan-400',
      dark: 'border-warm-border text-gray-400',
      green: 'border-green-600 text-green-400',
      indigo: 'border-indigo-600 text-indigo-400',
      light: 'border-warm-border text-gray-400',
      lime: 'border-lime-500 text-lime-400',
      pink: 'border-pink-600 text-pink-400',
      purple: 'border-purple-600 text-purple-400',
      red: 'border-red-600 text-red-400',
      teal: 'border-teal-500 text-teal-400',
      yellow: 'border-primary text-primary',
      danger: 'border-danger-strike text-danger-strike',
      outline: 'border-primary text-primary',
      ghost: 'border-warm-border text-gray-400',
      success: 'border-green-600 text-green-400',
      failure: 'border-danger-strike text-danger-strike',
      warning: 'border-warning text-warning',
      info: 'border-blue-500 text-blue-400',
    },
    size: {
      xs: 'px-2 py-1 text-xs rounded-md',
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-5 py-2.5 text-sm rounded-xl',
      lg: 'px-6 py-4 text-base rounded-2xl',
      xl: 'px-8 py-5 text-lg rounded-2xl',
    },
    disabled: 'cursor-not-allowed opacity-50',
    fullSized: 'w-full',
    grouped:
      'p-0 [&>span]:rounded-none [&>span]:border-l-0 first:[&>span]:rounded-l-xl first:[&>span]:border-l last:[&>span]:rounded-r-xl',
    pill: '!rounded-full',
  },

  /* ─────────────────────────────────────────────
     CARD
     Variante hover dorada cuando se pasa href.
  ───────────────────────────────────────────── */
  card: {
    root: {
      base: 'flex rounded-xl border border-warm-border bg-game-card transition-all duration-300',
      children: 'flex h-full flex-col justify-center gap-4 p-5',
      horizontal: {
        off: 'flex-col',
        on: 'flex-col md:max-w-xl md:flex-row',
      },
      href: 'hover:border-primary hover:shadow-[0_0_15px_rgba(219,166,31,0.1)] cursor-pointer',
    },
    img: {
      base: 'rounded-t-xl',
      horizontal: {
        off: '',
        on: 'h-96 w-full rounded-none rounded-l-xl object-cover md:h-auto md:w-48',
      },
    },
  },

  /* ─────────────────────────────────────────────
     MODAL
     Overlay oscuro, contenedor warm-dark.
  ───────────────────────────────────────────── */
  modal: {
    root: {
      base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-black/70 backdrop-blur-sm',
        off: 'hidden',
      },
      sizes: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
      positions: {
        'top-left': 'items-start justify-start',
        'top-center': 'items-start justify-center',
        'top-right': 'items-start justify-end',
        'center-left': 'items-center justify-start',
        center: 'items-center justify-center',
        'center-right': 'items-center justify-end',
        'bottom-right': 'items-end justify-end',
        'bottom-center': 'items-end justify-center',
        'bottom-left': 'items-end justify-start',
      },
    },
    content: {
      base: 'relative h-full w-full p-4 md:h-auto',
      inner:
        'relative flex max-h-[90dvh] flex-col rounded-2xl border border-warm-border bg-game-panel shadow-2xl',
    },
    body: {
      base: 'flex-1 overflow-auto px-6 py-5',
      popup: 'pt-0',
    },
    header: {
      base: 'flex items-center justify-between rounded-t-2xl border-b border-warm-border px-6 py-4',
      popup: 'border-b-0 p-2',
      title: 'text-base font-black uppercase tracking-widest text-white',
      close: {
        base: 'ml-auto inline-flex items-center rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-warm-border hover:text-white focus:ring-2 focus:ring-primary/30 focus:outline-none',
        icon: 'h-5 w-5',
      },
    },
    footer: {
      base: 'flex items-center gap-3 rounded-b-2xl border-t border-warm-border px-6 py-4',
      popup: 'pt-0',
    },
  },

  /* ─────────────────────────────────────────────
     TEXT INPUT
     Estado normal: borde warm-border-light, focus: primary.
     Estado error:  borde danger-strike.
  ───────────────────────────────────────────── */
  textInput: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-lg border border-r-0 border-warm-border bg-game-card px-3 text-sm text-gray-400',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500',
      },
      rightIcon: {
        base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
        svg: 'h-5 w-5 text-gray-500',
      },
      input: {
        base: 'block w-full rounded-lg border bg-game-panel font-medium text-white placeholder:text-gray-600 transition-all duration-200 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        sizes: {
          sm: 'p-2 text-xs',
          md: 'p-2.5 text-sm',
          lg: 'p-4 text-base',
        },
        colors: {
          gray: 'border-warm-border-light focus:border-primary focus:shadow-[0_0_0_1px_rgba(219,166,31,0.2)]',
          info: 'border-blue-500 focus:border-blue-400 focus:shadow-[0_0_0_1px_rgba(59,130,246,0.2)]',
          failure:
            'border-danger-strike focus:border-danger-strike focus:shadow-[0_0_0_1px_rgba(188,44,44,0.2)]',
          warning:
            'border-warning focus:border-warning focus:shadow-[0_0_0_1px_rgba(255,140,66,0.2)]',
          success:
            'border-success focus:border-success focus:shadow-[0_0_0_1px_rgba(34,197,94,0.2)]',
        },
        withIcon: { on: 'pl-10', off: '' },
        withRightIcon: { on: 'pr-10', off: '' },
        withAddon: { on: 'rounded-l-none', off: '' },
        withShadow: { on: 'shadow-sm', off: '' },
      },
    },
  },

  /* ─────────────────────────────────────────────
     LABEL — Estilo Stitch para labels de campos
  ───────────────────────────────────────────── */
  label: {
    root: {
      base: 'text-[10px] font-bold uppercase tracking-widest text-gray-500',
      colors: {
        default: 'text-gray-500',
        info: 'text-blue-400',
        failure: 'text-danger-strike',
        warning: 'text-warning',
        success: 'text-green-400',
      },
      disabled: 'opacity-50',
    },
  },

  /* ─────────────────────────────────────────────
     HELPER TEXT — Mensajes de error y ayuda
  ───────────────────────────────────────────── */
  helperText: {
    root: {
      base: 'mt-1 text-xs',
      colors: {
        gray: 'text-gray-500',
        info: 'text-blue-400',
        success: 'text-green-400',
        failure: 'text-danger-strike',
        warning: 'text-warning',
      },
    },
  },

  /* ─────────────────────────────────────────────
     BADGE — Badges de estado/ronda/multiplicador
  ───────────────────────────────────────────── */
  badge: {
    root: {
      base: 'flex h-fit items-center gap-1 font-bold uppercase tracking-widest',
      color: {
        info: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
        gray: 'bg-game-card text-gray-400 border border-warm-border',
        failure: 'bg-danger-strike/10 text-danger-strike border border-danger-strike/30',
        success: 'bg-green-500/10 text-green-400 border border-green-500/30',
        warning: 'bg-warning/10 text-warning border border-warning/30',
        indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
        purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
        pink: 'bg-pink-500/10 text-pink-400 border border-pink-500/30',
        yellow: 'bg-primary/10 text-primary border border-primary/30',
        dark: 'bg-game-card text-gray-300 border border-warm-border',
        blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
        cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
        green: 'bg-green-500/10 text-green-400 border border-green-500/30',
        lime: 'bg-lime-500/10 text-lime-400 border border-lime-500/30',
        red: 'bg-red-500/10 text-red-400 border border-red-500/30',
        teal: 'bg-teal-500/10 text-teal-400 border border-teal-500/30',
      },
      size: {
        xs: 'p-1 text-[10px] rounded',
        sm: 'px-2.5 py-1 text-xs rounded-lg',
      },
    },
    icon: {
      off: 'rounded-lg px-2.5 py-1',
      on: 'rounded-full p-1.5',
      size: {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
      },
    },
  },

  /* ─────────────────────────────────────────────
     SPINNER — Loading state dorado
  ───────────────────────────────────────────── */
  spinner: {
    base: 'inline animate-spin text-gray-600',
    color: {
      default: 'fill-primary',
      failure: 'fill-danger-strike',
      gray: 'fill-gray-400',
      info: 'fill-blue-500',
      pink: 'fill-pink-500',
      purple: 'fill-purple-500',
      success: 'fill-green-500',
      warning: 'fill-warning',
    },
    light: {
      off: {
        base: 'text-game-card',
        color: {
          default: 'text-[#352a0d]', // sin token directo — dark amber track
          failure: 'text-red-900',
          gray: 'text-game-card',
          info: 'text-blue-900',
          pink: 'text-pink-900',
          purple: 'text-purple-900',
          success: 'text-green-900',
          warning: 'text-orange-900',
        },
      },
      on: {
        base: 'text-gray-300',
        color: {
          default: 'text-primary/20',
          failure: 'text-red-100',
          gray: 'text-gray-600',
          info: 'text-blue-100',
          pink: 'text-pink-100',
          purple: 'text-purple-100',
          success: 'text-green-100',
          warning: 'text-orange-100',
        },
      },
    },
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-10 w-10',
    },
  },

  /* ─────────────────────────────────────────────
     TOGGLE SWITCH — Controles de configuración
  ───────────────────────────────────────────── */
  toggleSwitch: {
    root: {
      base: 'group flex rounded-lg focus:outline-none',
      active: {
        on: 'cursor-pointer',
        off: 'cursor-not-allowed opacity-50',
      },
      label: 'ms-3 mt-0.5 text-sm font-medium text-gray-400',
    },
    toggle: {
      base: 'relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all',
      checked: {
        on: 'after:translate-x-full after:border-white rtl:after:-translate-x-full',
        off: 'border-warm-border bg-game-card',
        color: {
          blue: 'border-blue-600 bg-blue-600',
          default: 'border-primary bg-primary',
          green: 'border-green-500 bg-green-500',
          red: 'border-red-500 bg-red-500',
          purple: 'border-purple-500 bg-purple-500',
          yellow: 'border-primary bg-primary',
        },
      },
      sizes: {
        sm: 'h-5 w-9 min-w-9 after:left-[2px] after:top-[2px] after:h-4 after:w-4',
        md: 'h-6 w-11 min-w-11 after:left-[2px] after:top-[2px] after:h-5 after:w-5',
        lg: 'h-7 w-14 min-w-14 after:left-[4px] after:top-0.5 after:h-6 after:w-6',
      },
    },
  },

  /* ─────────────────────────────────────────────
     SELECT — Mismo estilo que TextInput
  ───────────────────────────────────────────── */
  select: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-lg border border-r-0 border-warm-border bg-game-card px-3 text-sm text-gray-400',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500',
      },
      select: {
        base: 'block w-full rounded-lg border bg-game-panel font-medium text-white transition-all duration-200 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        withIcon: { on: 'pl-10', off: '' },
        withAddon: { on: 'rounded-l-none', off: '' },
        withShadow: { on: 'shadow-sm', off: '' },
        sizes: {
          sm: 'p-2 text-xs',
          md: 'p-2.5 text-sm',
          lg: 'p-4 text-base',
        },
        colors: {
          gray: 'border-warm-border-light focus:border-primary',
          info: 'border-blue-500 focus:border-blue-400',
          failure: 'border-danger-strike focus:border-danger-strike',
          warning: 'border-warning focus:border-warning',
          success: 'border-success focus:border-success',
        },
      },
    },
  },

  /* ─────────────────────────────────────────────
     RANGE SLIDER — Sliders de configuración (volumen, rondas)
  ───────────────────────────────────────────── */
  rangeSlider: {
    root: {
      base: 'flex',
    },
    field: {
      base: 'relative w-full',
      input: {
        base: 'w-full cursor-pointer appearance-none rounded-lg bg-warm-border accent-primary',
        sizes: {
          sm: 'h-1 range-sm',
          md: 'h-1.5',
          lg: 'h-2.5 range-lg',
        },
      },
    },
  },

  /* ─────────────────────────────────────────────
     TOOLTIP — Tooltips de información contextual
  ───────────────────────────────────────────── */
  tooltip: {
    target: 'w-fit',
    animation: 'transition-opacity',
    arrow: {
      base: 'absolute z-10 h-2 w-2 rotate-45',
      style: {
        auto: 'bg-game-card',
        light: 'bg-game-card',
        dark: 'bg-game-panel',
      },
      placement: '-4px',
    },
    base: 'absolute z-10 inline-block rounded-lg px-3 py-2 text-xs font-medium shadow-sm',
    hidden: 'invisible opacity-0',
    style: {
      auto: 'border border-warm-border bg-game-card text-white',
      light: 'border border-warm-border bg-game-card text-white',
      dark: 'bg-game-panel text-white',
    },
    content: 'relative z-20',
  },
})
