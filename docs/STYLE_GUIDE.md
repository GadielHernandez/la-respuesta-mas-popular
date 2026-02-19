# Design System — La Respuesta más Popular

> **Fuente de verdad:** Los diseños en `docs/design/` son el "Figma" oficial del proyecto.
> Todos los tokens, utilidades y componentes deben derivarse de esas pantallas.

---

## Pantallas de Referencia (Stitch)

| Archivo | Pantalla | Uso |
|---|---|---|
| `docs/design/html/01-public-game-board-1.html` | Tablero público — Respuestas reveladas | Pantalla de TV durante el juego |
| `docs/design/html/02-game-moderator-panel-1.html` | Panel de moderador — En sesión | Control del host/moderador |
| `docs/design/html/03-game-config-logout.html` | Configuración — Sin sesión iniciada | Setup antes del juego |
| `docs/design/html/04-public-game-board-2.html` | Tablero público — Inicio de ronda | Pantalla de TV (slots vacíos) |
| `docs/design/html/05-game-config-login.html` | Configuración — Con sesión iniciada | Setup con cuenta conectada |
| `docs/design/html/06-game-moderator-panel-2.html` | Modal "Cargar Partida Guardada" | Modal sobre configuración |

---

## Paleta de Colores

### Dorado Principal
| Variable CSS | Valor | Uso |
|---|---|---|
| `--primary` | `#DBA61F` | CTAs, acentos, bordes activos, texto destacado |
| `--primary-dark` | `#C4931A` | Hover states de gold |
| `--primary-light` | `#E8C56A` | Gradientes, glows secundarios |

### Fondos Warm-Dark
| Variable CSS | Tailwind | Valor | Uso |
|---|---|---|---|
| `--bg-base` | `bg-game-bg` | `#121212` | Fondo del tablero público |
| `--bg-config` | `bg-game-config` | `#0F0F0C` | Fondo de pantalla de configuración |
| `--bg-moderator` | `bg-game-moderator` | `#171611` | Fondo del panel de moderador |
| `--bg-panel` | `bg-game-panel` | `#1A1814` | Paneles secundarios, inputs |
| `--bg-panel-alt` | `bg-game-card` | `#26231C` | Tarjetas sobre panel |
| `--bg-card` | `bg-game-section` | `#1A1A1A` | Tablero de respuestas |

### Bordes Warm
| Variable CSS | Valor | Uso |
|---|---|---|
| `--border-warm` | `#383429` | Bordes de tarjetas y secciones |
| `--border-warm-light` | `#2D2A22` | Bordes sutiles |
| `--border-warm-subtle` | `#463D25` | Texto en slots revelados |

### Estados Semánticos
| Rol | Valor | Notas |
|---|---|---|
| Error/Strike | `#BC2C2C` | Más oscuro que el red estándar, tono warm |
| Error estándar | `#EF4444` | Para validaciones de formulario |
| Éxito | `#22C55E` | Dot de "conectado", estado OK |
| Warning | `#FF8C42` | Advertencias no críticas |

---

## Tipografía

### Fuente Principal: **Lexend**
- Importada via `next/font/google` como `--font-lexend`
- Aplica a **todo el proyecto** — body y headings
- Poppins se mantiene como variable `--font-poppins` por compatibilidad

### Jerarquía Visual

```
Título de pantalla:   font-black italic uppercase text-3xl tracking-tight
Subtítulo de sección: font-black uppercase tracking-widest text-sm text-primary
Labels de campo:      font-bold uppercase tracking-widest text-[10px] text-gray-500
Puntuaciones/números: font-black text-7xl (lg) / text-3xl (sm)
Cuerpo general:       font-medium text-sm text-gray-400
Badges/status:        font-bold uppercase tracking-[0.3em] text-[10px]
```

### Patrones de texto recurrentes en Stitch

- Siempre `uppercase` + `tracking-widest` para labels y secciones
- `italic` para el nombre de la app y texto de marca
- `font-black` (900) para números de score y botones CTA
- `text-primary` para acentos de palabras en títulos

---

## Espaciado y Border-Radius

Stitch usa un sistema de radios **tight** — más cuadrado que redondeado:

| Variable | Valor | Componente |
|---|---|---|
| `--radius-xs` | `4px` | Badges pequeños |
| `--radius-sm` | `6px` | Botones sm |
| `--radius` | `8px` | Inputs, botones ghost |
| `--radius-base` | `12px` | Botones md/lg, cards |
| `--radius-lg` | `16px` | Modales, panels grandes |
| `rounded-full` | `9999px` | Badges de ronda, dots de status, botón Strike |

---

## Componentes UI (`components/ui/`)

### Button
```tsx
// Variantes disponibles
<Button variant="primary">Lanzar Juego</Button>  // Gold fill + italic + uppercase
<Button variant="outline">Cancelar</Button>       // Borde gold transparente
<Button variant="danger">Strike</Button>          // #BC2C2C rojo
<Button variant="ghost">Manual Adj.</Button>      // Borde warm, texto gris
```

**Reglas:**
- `primary` siempre en `italic` y `uppercase` — es la voz del brand
- Los botones CTA grandes (Lanzar Juego, Siguiente Pregunta) usan `.btn-launch` o `size="lg"`
- El botón de Strike es un caso especial con `rounded-full` + CSS class `.btn-strike`

### Card
```tsx
<Card variant="default">...</Card>    // bg #26231C, border #383429
<Card variant="gold">...</Card>       // hover dorado (card-gold)
<Card variant="selected">...</Card>   // borde izquierdo gold (question library selected)
```

### Input
- Fondo `#1A1814` con borde `#2D2A22`
- Focus → borde `#DBA61F` + ring dorado sutil
- Error → borde `#BC2C2C`
- Soporte para `type="range"` (sliders de configuración)
- Labels en `uppercase tracking-widest text-[10px] text-gray-500`

### Modal
- Fondo `#1A1814`, borde `#383429`
- Header: título con primera palabra blanca, resto en dorado italic
- Icono de Material Symbols en el header (prop `titleIcon`)
- Close button con `material-symbols-outlined: close`
- Cerrar con Escape key + click en overlay

---

## CSS Utilities (globals.css)

### Efectos de Brillo
```css
.glow-gold          /* box-shadow dorado para tarjetas/elementos activos */
.glow-gold-sm       /* glow sutil */
.text-glow-gold     /* text-shadow dorado para títulos del tablero */
.text-glow-red      /* rojo brillante para strikes activos */
.pot-glow           /* drop-shadow dorado para el contador de puntos */
```

### Tablero Público
```css
.spotlight          /* Radial gradient desde arriba */
.board-gradient     /* Fondo del grid de respuestas */
.glass-panel        /* Panel translúcido con backdrop-blur */
.active-team-glow   /* Team card con posesión activa */
.revealed-slot      /* Slot con respuesta visible (blanco) */
.hidden-slot        /* Slot sin revelar (oscuro + número) */
.multiplier-badge   /* Badge X2/X3 con gradiente dorado */
.round-badge        /* Badge "Ronda 1" con borde sutil */
```

### Configuración
```css
.card-gold          /* Tarjeta con hover dorado */
.card-gold-selected /* Tarjeta seleccionada (borde izq gold) */
.btn-launch         /* Botón CTA "Lanzar Juego" con glow */
.bg-config-page     /* Fondo con patrón grid sutil */
.input-warm         /* Input de config con estilo warm-dark */
```

### Panel de Moderador
```css
.possession-glow    /* Team card del equipo con posesión */
.btn-strike         /* Botón Strike circular rojo */
.custom-scrollbar   /* Scrollbar dorado en listas de respuestas */
```

---

## Iconografía

Usar exclusivamente **Material Symbols Outlined** (Google):
```html
<span class="material-symbols-outlined">trophy</span>
<span class="material-symbols-outlined">close</span>
<span class="material-symbols-outlined">visibility</span>
```

En React, importar la hoja de estilos en el `<head>` o usar un componente wrapper.

Iconos clave del proyecto:
- `trophy` — Header del panel de moderador
- `close` — Strike, botón de cierre
- `visibility` — Revelar respuesta
- `groups` — Sección de equipos
- `library_books` — Librería de preguntas
- `settings_suggest` — Configuración
- `rocket_launch` — Lanzar juego / Equipo 2
- `shield` — Equipo 1
- `stars` — Badge de posesión
- `swap_horiz` — Robo exitoso
- `refresh` — Reset strikes
- `arrow_forward` — Siguiente pregunta

---

## Layout por Pantalla

### Tablero Público (`app/(game)/board/`)
- Full screen, sin scroll (`overflow: hidden`)
- 3 columnas: `aside (w-64)` | `section (flex-1)` | `aside (w-64)`
- Header con pregunta centrada
- Footer con strikes y puntos acumulados
- Decoradores de esquina (`.corner-decorator`)

### Panel de Moderador (`app/(moderator)/panel/`)
- Full height, sidebar + main + aside
- `section w-1/5` | `section w-[55%]` | `section w-1/4`
- Sticky header con sesión live
- Status footer fijo en bottom

### Configuración (`app/(config)/setup/`)
- `grid grid-cols-12`: 4 cols teams | 5 cols question lib | 3 cols display
- Background con patrón grid sutil (`.bg-config-page`)
- CTA "Lanzar Juego" full-width en col-3

---

## Interactividad

| Estado | Comportamiento |
|---|---|
| Hover botón primary | `brightness(1.1) + scale(1.02) + glow +30%` |
| Hover card-gold | `border-color: #DBA61F + box-shadow sutil` |
| Active (click) | `scale(0.95-0.97)` |
| Focus | `outline 2px solid #DBA61F` (`.focus-gold`) |
| Team con posesión | `.active-team-glow` — borde dorado + inner glow |
| Respuesta revelada | Flip animation + `.revealed-slot` (blanco) |
| Strike button | `active:scale-95` + red glow |

Transiciones: `duration-200` a `duration-300`, siempre `ease`.

---

## Accesibilidad

- Contraste WCAG AA: texto blanco sobre `#121212` ✅
- Contraste WCAG AA: texto `#121212` sobre `#DBA61F` (botones) ✅
- Focus states visibles con outline dorado en todos los interactivos
- Tamaños táctiles mínimo 44×44px
- Roles ARIA en modales (`role="dialog"` + `aria-modal`)
- Labels semánticos en todos los inputs

---

## Regla de Diseño: Flowbite-First

> **Siempre usar componentes de Flowbite React cuando exista el equivalente.**
> Nunca crear un componente nativo si Flowbite ya lo provee.

El tema global está en `lib/flowbite-theme.ts` (aplicado via `ThemeProvider` en `app/providers.tsx`).
Todos los componentes Flowbite heredan automáticamente el diseño Stitch sin props extra.

### Cuándo usar cada enfoque

| Componente | Fuente | Razón |
|---|---|---|
| `Button` | `flowbite-react` `Button` | Accesible + themed vía `stitchTheme.button` |
| `Card` | `flowbite-react` `Card` | Themed vía `stitchTheme.card` |
| `Modal` | `flowbite-react` `Modal + ModalHeader/Body/Footer` | Accesible (focus trap, escape, backdrop) + themed |
| `Input` (text) | `flowbite-react` `TextInput` | Themed vía `stitchTheme.textInput` |
| `Label` | `flowbite-react` `Label` | Themed vía `stitchTheme.label` |
| `HelperText` | `flowbite-react` `HelperText` | Themed vía `stitchTheme.helperText` |
| `Select`, `Textarea` | `flowbite-react` | Misma razón que TextInput |
| `Checkbox`, `Toggle` | `flowbite-react` | Accesibilidad nativa |
| `Badge`, `Spinner`, `Tooltip`, `Alert` | `flowbite-react` | Themed + evitan reescribir utilidades |
| `RangeSlider` | `flowbite-react` | Para sliders de configuración |
| Slots de respuesta | Custom | Únicos del juego, no existen en Flowbite |
| Team cards | Custom | Tienen `active-team-glow`, posesión, strikes |
| Moderator controls | Custom | Layouts muy específicos del juego |

### Wrapping pattern (regla)

Los componentes en `components/ui/` son wrappers sobre Flowbite que:
1. Mapean las variantes semánticas del proyecto (`primary/outline/danger/ghost`) a colores Flowbite
2. Aplican props defaults del proyecto (e.g. `size="md"` por defecto)
3. Añaden lógica específica del proyecto (e.g. `SplitTitle` en Modal)

---

## Patrones a Evitar

- ❌ Fondos azul-oscuro (`#1B2134`, `#232B42`) — fueron reemplazados por warm-dark
- ❌ `font-sans` sin Lexend — toda la app usa Lexend como fuente base
- ❌ `rounded-2xl` o `rounded-3xl` en cards — Stitch usa radios más tight
- ❌ Primary `#FDB42D` — el gold correcto es `#DBA61F`
- ❌ Borders azulados (`#31405E`) — usar bordes warm (`#383429`)
- ❌ `flowbite-react` para Button/Input directo — usar los wrappers de `components/ui/`

---

**Última actualización:** 2026-02-19
**Fuente de diseño:** Stitch Project `8617709389988637214` — Fast Money Round
**Archivos de diseño:** `docs/design/html/` (HTML) · `docs/design/screenshots/` (PNGs)
