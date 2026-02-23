# GitHub Issues - La Respuesta más Popular

Este archivo contiene todos los issues listos para crear en GitHub. Cada issue incluye título, descripción, labels, milestone, y prioridad.

**Instrucciones:**

1. Crear milestones en GitHub primero (nombrados como las fases)
2. Copiar y pegar cada issue en GitHub
3. Asignar el milestone correspondiente
4. Agregar los labels sugeridos

---

## FASE 0: Setup Inicial

### Issue #1: Inicializar proyecto Next.js con TypeScript y configuraciones

**Labels:** `setup`, `P0: Critical`
**Milestone:** Phase 0: Project Setup
**Estimación:** 2-3 horas

**Descripción:**
Configurar el proyecto inicial de Next.js 14+ con App Router, TypeScript, y todas las configuraciones base necesarias.

**Tareas:**

- [ ] Ejecutar `npx create-next-app@latest` con opciones: TypeScript, App Router, Tailwind CSS
- [ ] Configurar `tsconfig.json` con strict mode y path aliases (`@/`)
- [ ] Configurar `next.config.js` (si necesario)
- [ ] Instalar dependencias base: `@supabase/supabase-js`, `@supabase/ssr`
- [ ] Configurar `.env.local` con variables de Supabase (usar placeholders)
- [ ] Crear `.env.example` como template
- [ ] Configurar `.gitignore` apropiadamente
- [ ] Verificar que el proyecto corre con `npm run dev`

**Criterios de Aceptación:**

- Proyecto Next.js funcional en http://localhost:3000
- TypeScript configurado correctamente sin errores
- Path aliases `@/` funcionan
- Variables de entorno configuradas

**Archivos a crear/modificar:**

- `package.json`
- `tsconfig.json`
- `.env.local`
- `.env.example`
- `.gitignore`

---

### Issue #2: Configurar Tailwind CSS y sistema de diseño base

**Labels:** `setup`, `styling`, `P0: Critical`
**Milestone:** Phase 0: Project Setup
**Estimación:** 2 horas

**Descripción:**
Configurar Tailwind CSS con colores personalizados, fuentes, y utilidades adicionales para el proyecto.

**Tareas:**

- [ ] Configurar `tailwind.config.ts` con tema extendido (colores primary, secondary, danger)
- [ ] Configurar fuentes (Inter para texto, Poppins para títulos)
- [ ] Crear `app/globals.css` con estilos base
- [ ] Agregar utility classes personalizadas si necesario
- [ ] Crear archivo `lib/utils.ts` con función `cn()` para merge de classes
- [ ] Instalar `clsx` y `tailwind-merge`
- [ ] Probar configuración con componente de ejemplo

**Criterios de Aceptación:**

- Tailwind funciona correctamente
- Colores personalizados disponibles (`bg-primary`, etc.)
- Función `cn()` funciona para merge de classes
- No hay warnings de Tailwind en consola

**Archivos a crear/modificar:**

- `tailwind.config.ts`
- `app/globals.css`
- `lib/utils.ts`
- `package.json` (nuevas dependencias)

---

### Issue #3: Configurar Supabase (proyecto, conexión, tipos)

**Labels:** `setup`, `database`, `P0: Critical`
**Milestone:** Phase 0: Project Setup
**Estimación:** 2-3 horas

**Descripción:**
Configurar conexión con Supabase, crear proyecto, y configurar clientes para server-side y client-side rendering.

**Tareas:**

- [ ] Crear proyecto en Supabase (si no existe)
- [ ] Obtener URL y anon key del proyecto
- [ ] Actualizar `.env.local` con credenciales reales
- [ ] Crear `lib/supabase/client.ts` (browser client)
- [ ] Crear `lib/supabase/server.ts` (server client con cookies)
- [ ] Instalar dependencias: `@supabase/supabase-js`, `@supabase/ssr`
- [ ] Probar conexión con query simple
- [ ] Documentar proceso de setup en README.md

**Criterios de Aceptación:**

- Conexión a Supabase funciona desde cliente y servidor
- No hay errores de autenticación
- Variables de entorno configuradas correctamente
- README incluye instrucciones de setup de Supabase

**Archivos a crear/modificar:**

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `.env.local`
- `README.md`

**Nota Técnica:**
Ver CLAUDE.md sección "Supabase Integration" para ejemplos de código.

---

### Issue #4: Crear estructura de carpetas y archivos base

**Labels:** `setup`, `documentation`, `P1: High`
**Milestone:** Phase 0: Project Setup
**Estimación:** 1 hora

**Descripción:**
Crear toda la estructura de carpetas del proyecto según lo definido en DEVELOPMENT_PLAN.md.

**Tareas:**

- [ ] Crear carpeta `components/` con subcarpetas: `game/`, `questions/`, `ui/`, `layout/`
- [ ] Crear carpeta `lib/` con subcarpetas: `supabase/`, `game/`, `storage/`, `utils/`
- [ ] Crear carpeta `hooks/`
- [ ] Crear carpeta `types/`
- [ ] Crear carpeta `contexts/`
- [ ] Crear carpeta `data/`
- [ ] Crear carpeta `supabase/migrations/`
- [ ] Agregar `.gitkeep` en carpetas vacías para tracking
- [ ] Crear archivos README.md en carpetas principales explicando su propósito

**Criterios de Aceptación:**

- Estructura de carpetas completa
- Todas las carpetas trackeadas en Git
- READMEs en carpetas principales

**Estructura completa:**

```
app/
components/ (game/, questions/, ui/, layout/)
lib/ (supabase/, game/, storage/, utils/)
hooks/
types/
contexts/
data/
supabase/
```

---

### Issue #5: Configurar TypeScript paths y aliases

**Labels:** `setup`, `P1: High`
**Milestone:** Phase 0: Project Setup
**Estimación:** 30 minutos

**Descripción:**
Configurar path mapping en TypeScript para usar imports absolutos con `@/`.

**Tareas:**

- [ ] Actualizar `tsconfig.json` con paths configuration
- [ ] Verificar que `@/*` mapea a `./*`
- [ ] Probar imports en archivo de ejemplo: `import { X } from '@/lib/utils'`
- [ ] Asegurar que VSCode autocomplete funciona con paths
- [ ] Documentar uso de path aliases en CLAUDE.md

**Criterios de Aceptación:**

- Imports con `@/` funcionan sin errores
- VSCode autocomplete funciona
- No hay errores de TypeScript

**Configuración en tsconfig.json:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Issue #6: Crear CLAUDE.md con convenciones del proyecto

**Labels:** `documentation`, `P1: High`
**Milestone:** Phase 0: Project Setup
**Estimación:** N/A (Ya creado)

**Descripción:**
Crear archivo CLAUDE.md que documenta todas las convenciones de código, patrones, y estándares del proyecto.

**Tareas:**

- [x] Ya fue creado en el setup inicial

**Criterios de Aceptación:**

- [x] Archivo CLAUDE.md existe en la raíz del proyecto
- [x] Incluye todas las convenciones necesarias

---

## FASE 1: UI Foundation & Design System

### Issue #7: Crear componentes UI base (Button, Card, Input, Modal)

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 1: UI Components
**Estimación:** 4-5 horas

**Descripción:**
Crear componentes UI reutilizables que serán la base de toda la interfaz del juego.

**Tareas:**

- [ ] Crear `components/ui/Button.tsx` con variants (primary, secondary, danger) y sizes (sm, md, lg)
- [ ] Crear `components/ui/Card.tsx` para contenedores
- [ ] Crear `components/ui/Input.tsx` para formularios
- [ ] Crear `components/ui/Modal.tsx` para dialogs
- [ ] Agregar TypeScript interfaces para props de cada componente
- [ ] Implementar estados hover, focus, disabled
- [ ] Agregar Storybook o página de demo (opcional)

**Criterios de Aceptación:**

- Todos los componentes funcionan correctamente
- Props typesafe con TypeScript
- Estilos consistentes con sistema de diseño
- Accesibilidad básica (aria-labels, keyboard navigation)
- Componentes reutilizables y composables

**Ejemplo Button:**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}
```

**Archivos a crear:**

- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Input.tsx`
- `components/ui/Modal.tsx`

---

### Issue #8: Implementar layout principal y navegación

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 1: UI Components
**Estimación:** 3-4 horas

**Descripción:**
Crear el layout principal de la aplicación con header, navegación, y footer.

**Tareas:**

- [ ] Crear `components/layout/Header.tsx`
- [ ] Crear `components/layout/Navigation.tsx` con links principales
- [ ] Actualizar `app/layout.tsx` con estructura base
- [ ] Implementar navegación responsive (mobile menu)
- [ ] Agregar logo/título de la aplicación
- [ ] Implementar indicador de usuario logueado (placeholder por ahora)
- [ ] Crear footer básico

**Criterios de Aceptación:**

- Header visible en todas las páginas
- Navegación funcional (links a diferentes secciones)
- Responsive en mobile/tablet/desktop
- Layout consistente en toda la app

**Páginas en navegación:**

- Inicio
- Jugar
- Mis Preguntas (auth required)
- Historial (auth required)

**Archivos a crear:**

- `components/layout/Header.tsx`
- `components/layout/Navigation.tsx`
- `app/layout.tsx` (modificar)

---

### Issue #9: Diseñar y crear landing page

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 1: UI Components
**Estimación:** 3-4 horas

**Descripción:**
Crear la página de inicio (landing page) que presenta el juego y permite iniciar partida o registrarse.

**Tareas:**

- [ ] Actualizar `app/page.tsx` con contenido de landing
- [ ] Crear sección hero con título y descripción del juego
- [ ] Agregar botones principales: "Jugar sin registro" y "Crear cuenta"
- [ ] Agregar sección "Cómo jugar" con reglas básicas
- [ ] Agregar sección de features
- [ ] Implementar diseño responsive
- [ ] Optimizar imágenes (si hay)

**Criterios de Aceptación:**

- Landing page atractiva y clara
- CTA buttons funcionan (links a /play y /register)
- Responsive en todos los tamaños de pantalla
- Contenido explica claramente el juego

**Secciones:**

1. Hero (título, subtítulo, CTA buttons)
2. Cómo jugar (reglas básicas)
3. Features (sin login, con login, personalizar preguntas)
4. Footer

**Archivos a crear/modificar:**

- `app/page.tsx`

---

### Issue #10: Crear página de setup del juego (configuración inicial)

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 1: UI Components
**Estimación:** 3-4 horas

**Descripción:**
Crear página donde usuarios configuran la partida antes de jugar (nombres de equipos, selección de set de preguntas).

**Tareas:**

- [ ] Crear `app/(game)/setup/page.tsx`
- [ ] Crear formulario para nombres de equipos (Team 1, Team 2)
- [ ] Crear selector de set de preguntas (dropdown o lista)
- [ ] Agregar opciones: multiplicadores, timer, número de rondas
- [ ] Implementar validaciones (nombres no vacíos)
- [ ] Botón "Iniciar Juego" que navega a `/play`
- [ ] Guardar configuración en state/context

**Criterios de Aceptación:**

- Formulario completo y funcional
- Validaciones previenen iniciar juego sin datos completos
- Configuración se pasa correctamente a la página de juego
- UI clara e intuitiva

**Campos del formulario:**

- Nombre Equipo 1 (input text, required)
- Nombre Equipo 2 (input text, required)
- Set de preguntas (select, required)
- Habilitar timer (checkbox)
- Tiempo por ronda (number input, condicional)
- Habilitar multiplicadores (checkbox)

**Archivos a crear:**

- `app/(game)/setup/page.tsx`
- `app/(game)/layout.tsx` (si necesario)

---

### Issue #11: Implementar diseño responsive para tablet/desktop

**Labels:** `enhancement`, `ui`, `P1: High`
**Milestone:** Phase 1: UI Components
**Estimación:** 2-3 horas

**Descripción:**
Asegurar que todos los componentes creados hasta ahora son completamente responsive.

**Tareas:**

- [ ] Revisar breakpoints de Tailwind (sm, md, lg, xl)
- [ ] Ajustar layout para tablet (768px+)
- [ ] Ajustar layout para desktop (1024px+)
- [ ] Probar en diferentes tamaños de pantalla
- [ ] Ajustar font sizes para mejor legibilidad
- [ ] Verificar que elementos no se rompan en ninguna resolución
- [ ] Probar navegación mobile vs desktop

**Criterios de Aceptación:**

- Landing page responsive en todos los tamaños
- Header/Navigation adapta a mobile (hamburger menu si necesario)
- Setup page funciona bien en tablet/desktop
- No hay overflow horizontal
- Elementos mantienen proporciones correctas

**Testing en:**

- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

---

## FASE 2: Game Engine Core

### Issue #12: Crear tipos TypeScript para el juego

**Labels:** `feature`, `types`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 2-3 horas

**Descripción:**
Definir todos los tipos TypeScript necesarios para el game engine y state management.

**Tareas:**

- [ ] Crear `types/game.types.ts` con tipos del juego
- [ ] Definir `GameState` interface completo
- [ ] Definir `Team`, `GamePhase` types
- [ ] Definir `TeamData`, `Answer`, `Question` interfaces
- [ ] Crear `types/question.types.ts` para preguntas y sets
- [ ] Crear `types/database.types.ts` para Supabase (placeholder)
- [ ] Exportar todos los tipos correctamente

**Criterios de Aceptación:**

- Todos los tipos necesarios definidos
- No hay tipos `any`
- Tipos son reutilizables y composables
- Documentación con JSDoc en tipos complejos

**Tipos principales:**

```typescript
type Team = 'team1' | 'team2'
type GamePhase = 'setup' | 'playing' | 'stealing' | 'finished'

interface GameState {
  id: string
  phase: GamePhase
  currentQuestionIndex: number
  currentRound: number
  team1: TeamData
  team2: TeamData
  activeTeam: Team
  strikes: number
  revealedAnswers: number[]
  roundPoints: number
  multiplier: number
}
```

**Archivos a crear:**

- `types/game.types.ts`
- `types/question.types.ts`
- `types/database.types.ts`

---

### Issue #13: Implementar GameEngine (lógica de turnos, strikes, puntuación)

**Labels:** `feature`, `game-logic`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 6-8 horas

**Descripción:**
Crear el motor del juego con toda la lógica de turnos, strikes, y reglas del juego.

**Tareas:**

- [ ] Crear `lib/game/gameEngine.ts`
- [ ] Implementar función `revealAnswer()`
- [ ] Implementar función `addStrike()`
- [ ] Implementar función `switchTeam()`
- [ ] Implementar lógica de "stealing" (robo de puntos)
- [ ] Implementar función `nextQuestion()`
- [ ] Implementar función `calculateRoundWinner()`
- [ ] Implementar función `checkGameEnd()`
- [ ] Agregar validaciones y edge cases

**Criterios de Aceptación:**

- Todas las reglas del juego implementadas correctamente
- 3 strikes causa cambio de turno
- Modo "stealing" funciona correctamente
- Puntos se calculan y asignan correctamente
- Código bien documentado y testeado manualmente

**Funciones principales:**

```typescript
export const gameEngine = {
  revealAnswer(state: GameState, answerIndex: number): GameState
  addStrike(state: GameState): GameState
  switchTeam(state: GameState): GameState
  attemptSteal(state: GameState, answerIndex: number): GameState
  nextQuestion(state: GameState): GameState
  calculateRoundScore(answers: Answer[], revealed: number[]): number
}
```

**Archivos a crear:**

- `lib/game/gameEngine.ts`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #14: Crear Context/State management para el juego

**Labels:** `feature`, `state-management`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 4-5 horas

**Descripción:**
Implementar React Context con useReducer para manejar el estado global del juego.

**Tareas:**

- [ ] Crear `contexts/GameContext.tsx`
- [ ] Definir action types para todas las acciones del juego
- [ ] Implementar reducer con todos los casos
- [ ] Crear GameProvider component
- [ ] Crear hook `useGame()` para acceder al context
- [ ] Agregar estado inicial del juego
- [ ] Integrar con gameEngine del issue #13

**Criterios de Aceptación:**

- Context funciona correctamente
- Todas las acciones del juego disponibles
- State updates son inmutables
- Hook `useGame()` tipado correctamente
- Provider envuelve la app correctamente

**Actions a implementar:**

```typescript
type GameAction =
  | { type: 'REVEAL_ANSWER'; payload: number }
  | { type: 'ADD_STRIKE' }
  | { type: 'SWITCH_TEAM' }
  | { type: 'ATTEMPT_STEAL'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
```

**Archivos a crear:**

- `contexts/GameContext.tsx`

**Dependencias:**

- Issue #12 (tipos)
- Issue #13 (gameEngine)

---

### Issue #15: Implementar sistema de scoring y multiplicadores

**Labels:** `feature`, `game-logic`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 3-4 horas

**Descripción:**
Crear lógica de puntuación detallada incluyendo multiplicadores por ronda.

**Tareas:**

- [ ] Crear `lib/game/scoring.ts`
- [ ] Implementar `calculateScore(points, multiplier)`
- [ ] Implementar `applyMultiplier(roundNumber)`
- [ ] Implementar `awardPoints(team, points)`
- [ ] Implementar lógica de puntos robados
- [ ] Agregar soporte para rondas con multiplicador x2, x3
- [ ] Crear tests manuales de escenarios de scoring

**Criterios de Aceptación:**

- Puntuación básica funciona correctamente
- Multiplicadores aplican correctamente según ronda
- Puntos robados se calculan correctamente
- Edge cases manejados (empates, cero puntos)

**Funciones:**

```typescript
export const scoring = {
  calculateScore(points: number, multiplier: number): number
  awardPoints(state: GameState, team: Team, points: number): GameState
  calculateRoundTotal(answers: Answer[], revealedIndices: number[]): number
  getMultiplierForRound(roundNumber: number, totalRounds: number): number
}
```

**Reglas de multiplicadores:**

- Rondas 1-3: x1
- Ronda 4: x2 (si hay 5 rondas)
- Ronda 5: x3 (ronda final)

**Archivos a crear:**

- `lib/game/scoring.ts`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #16: Refactorizar layout con Route Groups y crear páginas skeleton del juego

**Labels:** `feature`, `routing`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 3-4 horas

**Descripción:**
El layout raíz agrega Header+Footer a todas las rutas. Las pantallas de juego deben ser fullscreen sin navegación. Usar Route Groups de Next.js App Router para aislar layouts.

> Nota: La lógica de sistema de strikes (título original) está cubierta por `lib/game/gameEngine.ts` (PR #90).

**Tareas:**

- [x] Modificar `app/layout.tsx` — eliminar Header/Footer, dejar solo `<Providers>{children}</Providers>`
- [x] Crear `app/(main)/layout.tsx` — shell con Header + main + Footer
- [x] Mover `app/page.tsx` → `app/(main)/page.tsx` (URL `/` se preserva)
- [x] Mover `app/demo/` → `app/(main)/demo/` (URLs `/demo/*` se preservan)
- [x] Crear `app/(game)/play/layout.tsx` — fullscreen, envuelve con `<GameProvider>`
- [x] Crear `app/(game)/play/page.tsx` — setup de partida, usa `useGame()`
- [x] Crear `app/(game)/play/board/page.tsx` — tablero público, usa `useGameBoard()`, muestra "Esperando..." si `state === null`
- [x] Crear `app/(game)/play/control/page.tsx` — panel del moderador, usa `useGame()` + dispatch

**Criterios de Aceptación:**

- `/` y `/demo` siguen mostrando Header y Footer
- `/play`, `/play/board`, `/play/control` son fullscreen sin Header/Footer
- `npx tsc --noEmit` sin errores
- Sin regresiones en rutas existentes

**Archivos creados/modificados:**

- `app/layout.tsx` (modificado)
- `app/(main)/layout.tsx` (creado)
- `app/(main)/page.tsx` (movido)
- `app/(main)/demo/` (movido)
- `app/(game)/play/layout.tsx` (creado)
- `app/(game)/play/page.tsx` (creado)
- `app/(game)/play/board/page.tsx` (creado)
- `app/(game)/play/control/page.tsx` (creado)

**Dependencias:**

- Issue #17 (BroadcastChannel)

---

### Issue #17: Implementar BroadcastChannel para sincronización two-screen

**Labels:** `feature`, `game-logic`, `P0: Critical`
**Milestone:** Phase 2: Game Logic
**Estimación:** 2-3 horas

**Descripción:**
El juego corre en un solo dispositivo (laptop + proyector). Sincronizar estado entre el panel del moderador (`/play/control`) y el tablero público (`/play/board`) usando BroadcastChannel API (nativa del browser, same-origin, sin servidor).

> Nota: La lógica de sistema de puntuación (título original) está cubierta por `lib/game/gameEngine.ts` (PR #90).

**Tareas:**

- [x] Crear `lib/game/broadcastChannel.ts` — constante `GAME_CHANNEL_NAME` y tipo `GameChannelMessage`
- [x] Modificar `contexts/GameContext.tsx` — agregar `useRef<BroadcastChannel>` + dos `useEffect` (ciclo de vida del canal y broadcast por cambio de estado)
- [x] Crear `hooks/useGameBoard.ts` — escucha BC, retorna `GameState | null`, nunca expone dispatch

**Criterios de Aceptación:**

- `GameProvider` emite `STATE_UPDATE` tras cada dispatch
- `useGameBoard` retorna `null` hasta el primer mensaje → board muestra "Esperando panel de control..."
- Abrir `/play/control` y `/play/board` en dos tabs: cambios en control se reflejan en board en tiempo real
- `npx tsc --noEmit` sin errores

**Archivos creados/modificados:**

- `lib/game/broadcastChannel.ts` (creado)
- `contexts/GameContext.tsx` (modificado — añade broadcast)
- `hooks/useGameBoard.ts` (creado)

**Dependencias:**

- Issue #14 (GameContext)
- Issue #13 (tipos)

---

## FASE 3: Game UI Components

### Issue #18: Crear componentes GameBoard (tablero principal)

**Labels:** `feature`, `ui`, `game-component`, `P0: Critical`
**Milestone:** Phase 3: Game Interface
**Estimación:** 5-6 horas

**Descripción:**
Crear los componentes del tablero del juego. En la arquitectura two-screen hay **dos vistas** del tablero:

- `GameBoardDisplay` — tablero público (read-only), usado en `/play/board` con datos de `useGameBoard()`
- `GameControlPanel` — panel del moderador, usado en `/play/control` con `useGame()` + dispatch

**Tareas:**

- [ ] Crear `components/game/GameBoardDisplay.tsx` (read-only, sin dispatch)
  - Diseñar layout del tablero (pregunta arriba, respuestas en grid, scores a los lados)
  - Integrar QuestionDisplay, AnswerCard, TeamScore, StrikeIndicator
  - Props: `state: GameState` (recibe el estado, no lo consume directamente del contexto)
  - Hacer responsive para proyector (1080p landscape)
- [ ] Crear `components/game/GameControlPanel.tsx` (fuente de verdad, con dispatch)
  - Conectar con `useGame()` hook
  - Integrar GameControls para las acciones del moderador
  - Mostrar estado actual del juego en formato compacto
- [ ] Actualizar `app/(game)/play/board/page.tsx` para usar `GameBoardDisplay`
- [ ] Actualizar `app/(game)/play/control/page.tsx` para usar `GameControlPanel`

**Criterios de Aceptación:**

- Tablero público muestra todos los elementos del juego (read-only)
- Panel de control permite todas las acciones del moderador
- Layout claro y organizado en ambas vistas
- Transiciones suaves entre estados

**Layout tablero público (`/play/board`):**

```
+----------------------------------+
|        Equipo 1    |    Equipo 2 |
|        Score       |       Score |
+----------------------------------+
|       Pregunta actual            |
+----------------------------------+
|  [Resp1] [Resp2] [Resp3]        |
|  [Resp4] [Resp5] [Resp6]        |
+----------------------------------+
|     Strikes: X X X               |
+----------------------------------+
```

**Archivos a crear:**

- `components/game/GameBoardDisplay.tsx`
- `components/game/GameControlPanel.tsx`

**Dependencias:**

- Issue #16 (route groups, páginas /play/board y /play/control)
- Issue #17 (BroadcastChannel, useGameBoard)
- Issues #19-23 (sub-componentes)

---

### Issue #19: Implementar QuestionDisplay (mostrar pregunta)

**Labels:** `feature`, `ui`, `game-component`, `P0: Critical`
**Milestone:** Phase 3: Game Interface
**Estimación:** 2 horas

**Descripción:**
Componente que muestra la pregunta actual del juego de forma destacada. Es un componente **puro y reutilizable** en ambas pantallas del juego (`/play/board` y `/play/control`).

> **Contexto Two-Screen:** Este componente no accede a ningún contexto directamente — recibe todo por props. Así puede usarse tanto en el tablero público (datos de `useGameBoard()`) como en el panel del moderador (datos de `useGame()`).

**Tareas:**

- [ ] Crear `components/game/QuestionDisplay.tsx`
- [ ] Diseñar card grande para la pregunta
- [ ] Mostrar número de ronda y multiplicador si aplica
- [ ] Agregar animación de entrada cuando cambia pregunta
- [ ] Responsive (texto se ajusta al tamaño de pantalla)
- [ ] Props: `question`, `roundNumber`, `multiplier`
- [ ] Sin acceso directo a contexto (solo props)

**Criterios de Aceptación:**

- Pregunta visible y legible
- Información adicional (ronda, multiplicador) clara
- Animación suave al cambiar pregunta
- Responsive en todos los tamaños
- Funciona igual en board y control

**Props interface:**

```typescript
interface QuestionDisplayProps {
  question: string
  roundNumber: number
  multiplier: number
  totalRounds: number
}
```

**Archivos a crear:**

- `components/game/QuestionDisplay.tsx`

**Dependencias:**

- Issue #12 (tipos)
- Issue #16 (páginas /play/board y /play/control donde se usa)

---

### Issue #20: Crear AnswerCard (tarjetas de respuestas con reveal)

**Labels:** `feature`, `ui`, `game-component`, `P0: Critical`
**Milestone:** Phase 3: Game Interface
**Estimación:** 4-5 horas

**Descripción:**
Componente para cada respuesta que puede estar oculta o revelada, con animación de flip. Soporta modo interactivo (moderador) y modo read-only (tablero público).

> **Contexto Two-Screen:** En `/play/board` las cards son puramente visuales (`interactive={false}`) — no tienen onClick ni hotkeys. En `/play/control` son interactivas y el moderador puede revelarlas con click o teclado.

**Tareas:**

- [ ] Crear `components/game/AnswerCard.tsx`
- [ ] Implementar estado oculto (mostrar solo número)
- [ ] Implementar estado revelado (mostrar texto y puntos)
- [ ] Agregar animación de "flip" al revelar
- [ ] Prop `interactive` (default `true`): cuando `false`, deshabilitar click y hotkeys
- [ ] Hacer clickeable para revelar (solo si `interactive={true}`)
- [ ] Agregar soporte para hotkeys (número de teclado, solo en control)
- [ ] Diseñar estilos atractivos (tipo Family Feud)

**Criterios de Aceptación:**

- Cards se ven profesionales
- Animación de reveal es fluida y clara
- Click y hotkeys funcionan en modo interactivo
- En modo `interactive={false}` no responde a inputs del usuario
- Estado oculto/revelado visualmente obvio

**Estados del card:**

1. **Oculto:** Muestra número (1-8), fondo neutro
2. **Revelado:** Muestra texto de respuesta + puntos, fondo destacado

**Props interface:**

```typescript
interface AnswerCardProps {
  answer: Answer
  isRevealed: boolean
  orderIndex: number
  onReveal: () => void
  disabled?: boolean
  interactive?: boolean  // false en /play/board
}
```

**Archivos a crear:**

- `components/game/AnswerCard.tsx`

**Dependencias:**

- Issue #12 (tipos)
- Issue #16 (diferencia board vs control)

---

### Issue #21: Implementar TeamScore (marcador de equipos)

**Labels:** `feature`, `ui`, `game-component`, `P0: Critical`
**Milestone:** Phase 3: Game Interface
**Estimación:** 2-3 horas

**Descripción:**
Componente que muestra el nombre y score de cada equipo, destacando al equipo activo.

**Tareas:**

- [ ] Crear `components/game/TeamScore.tsx`
- [ ] Mostrar nombre del equipo
- [ ] Mostrar score actual
- [ ] Destacar visualmente el equipo activo (border, glow, etc.)
- [ ] Agregar animación cuando el score cambia
- [ ] Responsive (side-by-side en desktop, stacked en mobile)

**Criterios de Aceptación:**

- Scores visibles y legibles
- Equipo activo claramente identificable
- Animación de score increment es clara
- Layout funciona en diferentes tamaños

**Props interface:**

```typescript
interface TeamScoreProps {
  teamName: string
  score: number
  isActive: boolean
  variant: 'team1' | 'team2'
}
```

**Archivos a crear:**

- `components/game/TeamScore.tsx`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #22: Crear StrikeIndicator (indicador de strikes)

**Labels:** `feature`, `ui`, `game-component`, `P1: High`
**Milestone:** Phase 3: Game Interface
**Estimación:** 2 horas

**Descripción:**
Componente que muestra visualmente los strikes acumulados (máximo 3).

**Tareas:**

- [ ] Crear `components/game/StrikeIndicator.tsx`
- [ ] Mostrar 3 indicadores (círculos o X)
- [ ] Llenar indicadores según strikes actuales (0-3)
- [ ] Agregar animación al agregar strike
- [ ] Color rojo/warning cuando se acercan a 3
- [ ] Props: `strikes` (número 0-3)

**Criterios de Aceptación:**

- Strikes visibles y claros
- Animación llama la atención al agregar strike
- Diseño consistente con tema del juego

**Visual:**

```
Strikes: ⭕ ⭕ ⭕  (0 strikes)
Strikes: ❌ ⭕ ⭕  (1 strike)
Strikes: ❌ ❌ ⭕  (2 strikes)
Strikes: ❌ ❌ ❌  (3 strikes - game over)
```

**Props interface:**

```typescript
interface StrikeIndicatorProps {
  strikes: number
  maxStrikes?: number
}
```

**Archivos a crear:**

- `components/game/StrikeIndicator.tsx`

---

### Issue #23: Implementar Timer componente (countdown opcional)

**Labels:** `feature`, `ui`, `game-component`, `P1: High`
**Milestone:** Phase 3: Game Interface
**Estimación:** 3-4 horas

**Descripción:**
Componente de timer que cuenta regresivamente y puede usarse opcionalmente durante el juego.

> **Contexto Two-Screen:** El Timer es **fuente de verdad en `/play/control`**. Los ticks se emiten automáticamente via BroadcastChannel (a través de `GameContext`) al tablero público. El board muestra el tiempo recibido — nunca corre su propio timer independiente.

**Tareas:**

- [ ] Crear `components/game/Timer.tsx`
- [ ] Implementar countdown con useState/useEffect
- [ ] Mostrar tiempo en formato MM:SS
- [ ] Cambiar color cuando queda poco tiempo (últimos 10 segundos)
- [ ] Callback cuando el tiempo se acaba
- [ ] Controles: start, pause, reset (solo en `/play/control`)
- [ ] Prop `readonly` para modo display puro (en `/play/board`)
- [ ] Agregar sonido/alerta cuando expira (opcional, solo en control)

**Criterios de Aceptación:**

- Timer cuenta correctamente en el control
- Board refleja el tiempo del control via BC (sin desync)
- Callback de onExpire funciona
- Puede pausarse y resumirse desde el control
- Color/estilo cambia en últimos segundos en ambas pantallas

**Props interface:**

```typescript
interface TimerProps {
  duration: number // segundos
  isActive: boolean
  onExpire: () => void
  onTick?: (remaining: number) => void
  readonly?: boolean  // true en /play/board
}
```

**Archivos a crear:**

- `components/game/Timer.tsx`

**Dependencias:**

- Issue #17 (BroadcastChannel — ticks llegan al board via estado)

---

### Issue #24: Crear controles del juego (botones de acción, navegación)

**Labels:** `feature`, `ui`, `game-component`, `P1: High`
**Milestone:** Phase 3: Game Interface
**Estimación:** 2-3 horas

**Descripción:**
Componente con botones de control del juego (siguiente pregunta, cambiar turno, reset, etc.).

> **Contexto Two-Screen:** `GameControls` es **exclusivo de `/play/control`**. No aparece en el tablero público (`/play/board`). Todas las acciones despachan al `GameContext` → el estado se emite via BroadcastChannel → el board se actualiza automáticamente.

**Tareas:**

- [ ] Crear `components/game/GameControls.tsx`
- [ ] Botón "Siguiente Pregunta" (disabled si ronda no terminó)
- [ ] Botón "Cambiar Turno Manualmente" (moderador)
- [ ] Botón "Reiniciar Juego" con confirmación
- [ ] Botón "Pausar/Reanudar" (si hay timer)
- [ ] Botón "Agregar Strike" manual
- [ ] Conectar con `useGame().dispatch` (nunca con `useGameBoard`)
- [ ] Agregar tooltips explicativos

**Criterios de Aceptación:**

- Botones funcionan correctamente
- Estados disabled cuando no aplican
- Confirmaciones para acciones destructivas
- Solo renderiza en `/play/control`

**Controles principales:**

- Siguiente Pregunta
- Agregar Strike Manual
- Cambiar Turno
- Pausar/Reanudar Timer
- Reiniciar Juego

**Props interface:**

```typescript
interface GameControlsProps {
  onNextQuestion: () => void
  onAddStrike: () => void
  onSwitchTeam: () => void
  onResetGame: () => void
  canNextQuestion: boolean
  canAddStrike: boolean
}
```

**Archivos a crear:**

- `components/game/GameControls.tsx`

**Dependencias:**

- Issue #16 (ruta /play/control donde vive)
- Issue #17 (dispatch → BC → board se actualiza)
- Issue #7 (Button component)

---

## FASE 4: LocalStorage Mode

### Issue #25: Crear set de preguntas demo (data/demoQuestions.ts)

**Labels:** `content`, `data`, `P0: Critical`
**Milestone:** Phase 4: Offline Game
**Estimación:** 2-3 horas

**Descripción:**
Crear un set de 10-15 preguntas demo en español estilo "100 mexicanos dijeron" para testing y juego sin login.

**Tareas:**

- [ ] Crear `data/demoQuestions.ts`
- [ ] Escribir 10-15 preguntas divertidas y variadas
- [ ] Cada pregunta con 5-8 respuestas
- [ ] Asignar puntos a cada respuesta (más populares = más puntos)
- [ ] Seguir estructura de tipos definida
- [ ] Exportar como constante `DEMO_QUESTION_SET`

**Criterios de Aceptación:**

- Al menos 10 preguntas completas
- Preguntas en español, culturalmente relevantes
- Puntos balanceados (más populares tienen más puntos)
- Tipos TypeScript correctos

**Ejemplo de pregunta:**

```typescript
{
  id: '1',
  questionText: '¿Qué hace la gente cuando no puede dormir?',
  answers: [
    { id: '1', text: 'Ver televisión', points: 35, orderIndex: 1 },
    { id: '2', text: 'Leer un libro', points: 25, orderIndex: 2 },
    { id: '3', text: 'Contar ovejas', points: 20, orderIndex: 3 },
    { id: '4', text: 'Tomar leche', points: 12, orderIndex: 4 },
    { id: '5', text: 'Usar el teléfono', points: 8, orderIndex: 5 },
  ],
  multiplier: 1,
  orderIndex: 1
}
```

**Archivos a crear:**

- `data/demoQuestions.ts`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #26: Implementar adaptador de localStorage

**Labels:** `feature`, `storage`, `P0: Critical`
**Milestone:** Phase 4: Offline Game
**Estimación:** 3-4 horas

**Descripción:**
Crear abstracción para guardar y cargar datos del juego en localStorage del navegador.

**Tareas:**

- [ ] Crear `lib/storage/localStorage.ts`
- [ ] Implementar `getQuestionSets()`
- [ ] Implementar `saveQuestionSet(set)`
- [ ] Implementar `deleteQuestionSet(id)`
- [ ] Implementar `getGameHistory()`
- [ ] Implementar `saveGameHistory(game)`
- [ ] Implementar `getCurrentGame()` / `saveCurrentGame(state)`
- [ ] Agregar manejo de errores (storage full, parse errors)
- [ ] Agregar keys prefixados para evitar colisiones

**Criterios de Aceptación:**

- Datos se guardan correctamente en localStorage
- Datos se recuperan correctamente al recargar página
- Manejo de errores robusto
- API limpia y fácil de usar
- Keys organizados con prefijo (`lrmp_`)

**API del adaptador:**

```typescript
export const localStorageAdapter = {
  getQuestionSets(): QuestionSet[]
  saveQuestionSet(set: QuestionSet): void
  deleteQuestionSet(setId: string): void
  getGameHistory(): GameHistory[]
  saveGameHistory(game: GameHistory): void
  getCurrentGame(): GameState | null
  saveCurrentGame(state: GameState): void
  clearCurrentGame(): void
}
```

**Storage keys:**

- `lrmp_question_sets`
- `lrmp_game_history`
- `lrmp_current_game`

**Archivos a crear:**

- `lib/storage/localStorage.ts`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #27: Crear hook useLocalStorage para persistencia

**Labels:** `feature`, `hooks`, `P1: High`
**Milestone:** Phase 4: Offline Game
**Estimación:** 2-3 horas

**Descripción:**
Custom hook que facilita el uso de localStorage en componentes React con sincronización automática.

**Tareas:**

- [ ] Crear `hooks/useLocalStorage.ts`
- [ ] Implementar hook genérico `useLocalStorage<T>(key, initialValue)`
- [ ] Sincronizar con localStorage automáticamente
- [ ] Detectar cambios en otras tabs/ventanas (storage event)
- [ ] Tipar correctamente con TypeScript
- [ ] Agregar error handling

**Criterios de Aceptación:**

- Hook funciona como useState pero persiste en localStorage
- Sincronización cross-tab funciona
- TypeScript inference correcto
- API simple y familiar

**API del hook:**

```typescript
const [value, setValue] = useLocalStorage<QuestionSet[]>('lrmp_question_sets', [])

// Funciona como useState normal
setValue(newValue)
```

**Archivos a crear:**

- `hooks/useLocalStorage.ts`

**Dependencias:**

- Ninguna (standalone hook)

---

### Issue #28: Implementar guardar/cargar estado del juego en localStorage

**Labels:** `feature`, `storage`, `P1: High`
**Milestone:** Phase 4: Offline Game
**Estimación:** 3-4 horas

**Descripción:**
Integrar localStorage adapter con GameContext para auto-guardar y restaurar estado del juego.

> **Contexto Two-Screen:** Solo el `GameContext` (en `/play/control`) escribe en localStorage. El tablero público (`/play/board`) es read-only y nunca persiste datos. Al recargar `/play/control`, el moderador puede continuar la partida; el board sigue recibiendo el estado via BroadcastChannel normalmente.

**Tareas:**

- [ ] Modificar `contexts/GameContext.tsx` para auto-guardar en localStorage (debounced)
- [ ] Cargar estado al iniciar si existe partida guardada (solo en `/play/control`)
- [ ] Mostrar prompt para continuar partida guardada
- [ ] Implementar "Nuevo Juego" que limpia localStorage
- [ ] Agregar indicador de "auto-save" en UI del control

**Criterios de Aceptación:**

- Estado se guarda automáticamente durante el juego (desde control)
- Al recargar `/play/control`, se puede continuar partida
- Usuario puede elegir continuar o iniciar nuevo juego
- No hay pérdida de progreso
- `/play/board` no tiene lógica de persistencia

**Flow:**

1. Moderador abre `/play/control` → se detecta partida guardada (si existe)
2. Mostrar modal: "¿Continuar partida anterior?"
3. Si acepta → cargar estado guardado → BC emite al board automáticamente
4. Si rechaza → iniciar juego nuevo

**Archivos a modificar:**

- `contexts/GameContext.tsx`
- `app/(game)/play/control/page.tsx`

**Dependencias:**

- Issue #14 (GameContext)
- Issue #17 (BC emite estado restaurado al board)
- Issue #26 (localStorage adapter)

---

### Issue #29: Conectar UI con localStorage (modo sin login)

**Labels:** `feature`, `integration`, `P1: High`
**Milestone:** Phase 4: Offline Game
**Estimación:** 3-4 horas

**Descripción:**
Implementar flujo completo de juego sin autenticación usando solo localStorage. Con la arquitectura two-screen, el flujo es: setup (`/play`) → moderador en `/play/control` + audiencia en `/play/board`.

> **Contexto Two-Screen:** El flujo sin login usa las rutas creadas en issue #16. La persistencia de datos es responsabilidad de `/play/control` (issue #28). El board se sincroniza via BroadcastChannel automáticamente.

**Tareas:**

- [ ] Completar `app/(game)/play/page.tsx` — configurar partida y redirigir a `/play/control`
- [ ] Cargar set de preguntas demo por defecto en el setup
- [ ] Implementar "Guardar set personalizado" en localStorage
- [ ] Crear página para ver historial local (sin DB): `app/(game)/history-local/page.tsx`
- [ ] Agregar opción de exportar/importar datos (JSON)
- [ ] Instrucciones en setup: "Abre /play/board en el proyector"

**Criterios de Aceptación:**

- Juego funciona completamente sin login
- Flujo: `/play` (setup) → `/play/control` (moderador) + `/play/board` (proyector)
- Preguntas demo cargadas por defecto
- Historial se guarda y visualiza correctamente
- Usuario puede crear sets personalizados que persisten

**Páginas a crear/completar:**

- `app/(game)/play/page.tsx` (setup, ya existe como skeleton)
- `app/(game)/history-local/page.tsx` (historial localStorage)

**Archivos a crear:**

- `app/(game)/history-local/page.tsx`

**Dependencias:**

- Issue #16 (rutas /play, /play/control, /play/board ya creadas)
- Issue #17 (BC sync)
- Issue #18 (GameBoard components)
- Issue #25 (demo questions)
- Issue #26 (localStorage adapter)
- Issue #28 (save/load state)

---

### Issue #30: Testing completo del flujo sin autenticación

**Labels:** `testing`, `P1: High`
**Milestone:** Phase 4: Offline Game
**Estimación:** 3-4 horas

**Descripción:**
Testing exhaustivo del modo sin login para asegurar que todo funciona correctamente, incluyendo la sincronización two-screen via BroadcastChannel.

> **Contexto Two-Screen:** Agregar escenarios multi-tab: abrir `/play/control` y `/play/board` simultáneamente y verificar sincronización en tiempo real.

**Tareas:**

- [ ] Crear checklist de testing completo
- [ ] Probar flujo completo: setup (`/play`) → control+board → finalizar
- [ ] Probar sincronización BC: acciones en control se reflejan en board inmediatamente
- [ ] Probar guardar/cargar estado (solo desde `/play/control`)
- [ ] Probar board sin control abierto (debe mostrar "Esperando...")
- [ ] Probar reabrir control con partida guardada: board debe sincronizarse
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Probar con localStorage vacío, lleno, corrupto
- [ ] Documentar bugs encontrados
- [ ] Crear issues para bugs críticos

**Criterios de Aceptación:**

- Todos los flujos principales funcionan
- Sincronización BC en tiempo real sin delay perceptible
- Board muestra "Esperando panel de control..." cuando control no está abierto
- No hay bugs críticos
- Documentación de issues encontrados

**Escenarios de testing:**

1. Primera vez (localStorage vacío): setup → control → board
2. Juego completo inicio a fin (dos tabs simultáneas)
3. Pausar y continuar partida (recargar control → board se resincroniza)
4. Múltiples partidas seguidas
5. Crear y usar set personalizado
6. Ver historial de partidas
7. Exportar/importar datos
8. **Multi-tab:** Cerrar y reabrir tab del control (board debe volver a "Esperando...")
9. Edge cases: cerrar board tab, reabrir, recibir estado

**Archivos a crear:**

- `TESTING_CHECKLIST.md` (documentación)

**Dependencias:**

- Issue #16 (rutas /play, /play/control, /play/board)
- Issue #17 (BroadcastChannel sync)
- Issues #25-29 (todas las features de localStorage)

---

## FASE 5: Authentication

### Issue #31: Configurar Supabase Auth (email/password)

**Labels:** `feature`, `auth`, `P0: Critical`
**Milestone:** Phase 5: User Auth
**Estimación:** 3-4 horas

**Descripción:**
Configurar autenticación de usuarios con Supabase usando email y password.

**Tareas:**

- [ ] Habilitar Email Auth en Supabase dashboard
- [ ] Configurar redirect URLs
- [ ] Crear funciones de auth en `lib/supabase/auth.ts`
- [ ] Implementar `signUp(email, password)`
- [ ] Implementar `signIn(email, password)`
- [ ] Implementar `signOut()`
- [ ] Implementar `resetPassword(email)`
- [ ] Configurar email templates en Supabase

**Criterios de Aceptación:**

- Sign up funciona correctamente
- Sign in funciona correctamente
- Sign out funciona correctamente
- Reset password envía email
- Errores se manejan apropiadamente

**Funciones a crear:**

```typescript
export const auth = {
  async signUp(email: string, password: string)
  async signIn(email: string, password: string)
  async signOut()
  async resetPassword(email: string)
  async getSession()
  async getUser()
}
```

**Archivos a crear:**

- `lib/supabase/auth.ts`

**Dependencias:**

- Issue #3 (Supabase setup)

---

### Issue #32: Crear páginas de Login y Register

**Labels:** `feature`, `ui`, `auth`, `P0: Critical`
**Milestone:** Phase 5: User Auth
**Estimación:** 4-5 horas

**Descripción:**
Crear páginas de login y registro con formularios completos y validaciones.

**Tareas:**

- [ ] Crear `app/login/page.tsx`
- [ ] Crear `app/register/page.tsx`
- [ ] Implementar formularios con validación (email, password)
- [ ] Agregar estados de loading durante auth
- [ ] Mostrar errores de auth claramente
- [ ] Link entre login y register
- [ ] Redirect después de login exitoso
- [ ] "Olvidé mi contraseña" link

**Criterios de Aceptación:**

- Formularios funcionan correctamente
- Validaciones client-side (email válido, password mínimo)
- Errores de auth se muestran claramente
- UX fluida (loading states, redirects)
- Responsive en mobile/desktop

**Validaciones:**

- Email: formato válido
- Password: mínimo 8 caracteres
- Password confirmation en register

**Archivos a crear:**

- `app/login/page.tsx`
- `app/register/page.tsx`

**Dependencias:**

- Issue #31 (auth functions)
- Issue #7 (UI components)

---

### Issue #33: Implementar AuthContext y useAuth hook

**Labels:** `feature`, `auth`, `P0: Critical`
**Milestone:** Phase 5: User Auth
**Estimación:** 3-4 horas

**Descripción:**
Crear context de autenticación para manejar estado de usuario en toda la app.

**Tareas:**

- [ ] Crear `contexts/AuthContext.tsx`
- [ ] Manejar estado de usuario (loading, authenticated, user data)
- [ ] Escuchar cambios de auth state (onAuthStateChange)
- [ ] Crear hook `useAuth()` para acceder al context
- [ ] Implementar loading state durante verificación de sesión
- [ ] Persistir sesión en cookies (SSR compatible)

**Criterios de Aceptación:**

- Context funciona en toda la app
- Estado de usuario sincronizado
- Hook fácil de usar en componentes
- SSR compatible (sesión persiste en server)

**API del context:**

```typescript
const { user, session, isLoading, isAuthenticated, signIn, signUp, signOut } = useAuth()
```

**Archivos a crear:**

- `contexts/AuthContext.tsx`

**Dependencias:**

- Issue #31 (auth functions)

---

### Issue #34: Crear middleware de autenticación para rutas protegidas

**Labels:** `feature`, `auth`, `P1: High`
**Milestone:** Phase 5: User Auth
**Estimación:** 2-3 horas

**Descripción:**
Implementar middleware de Next.js para proteger rutas que requieren autenticación.

**Tareas:**

- [ ] Crear `middleware.ts` en root del proyecto
- [ ] Definir rutas protegidas (dashboard, my-questions, history)
- [ ] Verificar sesión en cada request
- [ ] Redirect a /login si no autenticado
- [ ] Redirect a /dashboard si ya autenticado y visita /login
- [ ] Agregar matchers de rutas

**Criterios de Aceptación:**

- Rutas protegidas inaccesibles sin login
- Redirects funcionan correctamente
- No hay flashes de contenido protegido
- Performance no afectada

**Rutas protegidas:**

- `/dashboard`
- `/my-questions`
- `/history`

**Archivos a crear:**

- `middleware.ts`

**Dependencias:**

- Issue #33 (AuthContext)

---

### Issue #35: Implementar página de Dashboard (usuario autenticado)

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 5: User Auth
**Estimación:** 3-4 horas

**Descripción:**
Crear página de dashboard que muestra resumen de actividad del usuario autenticado.

**Tareas:**

- [ ] Crear `app/(auth)/dashboard/page.tsx`
- [ ] Mostrar información del usuario (email, username)
- [ ] Mostrar estadísticas: total partidas, sets creados
- [ ] Links rápidos a: Jugar, Mis Preguntas, Historial
- [ ] Mostrar últimas 5 partidas jugadas
- [ ] Botón de logout
- [ ] Diseño limpio y profesional

**Criterios de Aceptación:**

- Dashboard muestra info relevante
- Links funcionan correctamente
- Solo accesible con login
- Responsive en todos los tamaños

**Secciones del dashboard:**

1. Header con nombre de usuario
2. Stats cards (partidas, sets, win rate)
3. Quick actions (botones principales)
4. Recent games (últimas 5)

**Archivos a crear:**

- `app/(auth)/dashboard/page.tsx`
- `app/(auth)/layout.tsx`

**Dependencias:**

- Issue #33 (useAuth)
- Issue #34 (middleware)

---

### Issue #36: Crear manejo de sesiones y logout

**Labels:** `feature`, `auth`, `P1: High`
**Milestone:** Phase 5: User Auth
**Estimación:** 2 horas

**Descripción:**
Implementar lógica completa de logout y limpieza de sesión.

**Tareas:**

- [ ] Implementar botón de logout en header/dashboard
- [ ] Crear función `handleLogout()` que limpia todo
- [ ] Limpiar localStorage de usuario al logout
- [ ] Redirect a landing page después de logout
- [ ] Mostrar confirmación de logout exitoso
- [ ] Implementar auto-logout por sesión expirada

**Criterios de Aceptación:**

- Logout funciona correctamente
- Sesión se limpia completamente
- Redirect apropiado
- No quedan datos sensibles en localStorage

**Flow de logout:**

1. Usuario click en "Cerrar Sesión"
2. Confirmar acción (modal opcional)
3. Llamar a `supabase.auth.signOut()`
4. Limpiar estados locales
5. Redirect a `/`

**Archivos a modificar:**

- `components/layout/Header.tsx`
- `lib/supabase/auth.ts`

**Dependencias:**

- Issue #33 (useAuth)

---

## FASE 6: Database Integration

### Issue #37: Ejecutar migraciones de Supabase (schema completo)

**Labels:** `database`, `setup`, `P0: Critical`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 3-4 horas

**Descripción:**
Crear y ejecutar migraciones para crear todas las tablas de la base de datos.

**Tareas:**

- [ ] Crear `supabase/migrations/001_initial_schema.sql`
- [ ] Definir tablas: profiles, question_sets, questions, answers, games, game_rounds
- [ ] Agregar constraints, foreign keys, indexes
- [ ] Crear extension uuid-ossp si necesario
- [ ] Ejecutar migración en Supabase
- [ ] Verificar schema en Supabase Studio

**Criterios de Aceptación:**

- Todas las tablas creadas correctamente
- Relaciones (foreign keys) funcionan
- Indexes creados para performance
- Schema match con diseño en DEVELOPMENT_PLAN.md

**Tablas a crear:**

- profiles (extensión de auth.users)
- question_sets
- questions
- answers
- games
- game_rounds

**Archivos a crear:**

- `supabase/migrations/001_initial_schema.sql`

**Dependencias:**

- Issue #3 (Supabase setup)

---

### Issue #38: Configurar Row Level Security policies

**Labels:** `database`, `security`, `P0: Critical`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 3-4 horas

**Descripción:**
Implementar RLS policies para asegurar que usuarios solo accedan a sus propios datos.

**Tareas:**

- [ ] Crear `supabase/migrations/002_rls_policies.sql`
- [ ] Habilitar RLS en todas las tablas
- [ ] Crear policies para profiles (SELECT, UPDATE own)
- [ ] Crear policies para question_sets (CRUD own, SELECT public)
- [ ] Crear policies para questions (heredan de sets)
- [ ] Crear policies para answers (heredan de questions)
- [ ] Crear policies para games (SELECT, INSERT own)
- [ ] Crear policies para game_rounds (heredan de games)
- [ ] Probar policies con diferentes usuarios

**Criterios de Aceptación:**

- RLS habilitado en todas las tablas
- Usuarios solo ven sus propios datos
- Sets públicos visibles para todos
- No hay leaks de datos entre usuarios

**Policies principales:**

```sql
-- Profiles
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Question Sets
CREATE POLICY "Public sets viewable by all" ON question_sets FOR SELECT USING (is_public = true);
CREATE POLICY "Users view own sets" ON question_sets FOR SELECT USING (auth.uid() = user_id);
```

**Archivos a crear:**

- `supabase/migrations/002_rls_policies.sql`

**Dependencias:**

- Issue #37 (schema)

---

### Issue #39: Crear queries y funciones de Supabase (lib/supabase/queries.ts)

**Labels:** `feature`, `database`, `P0: Critical`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 5-6 horas

**Descripción:**
Crear funciones reutilizables para todas las operaciones de base de datos.

**Tareas:**

- [ ] Crear `lib/supabase/queries.ts`
- [ ] Implementar queries para question_sets (CRUD)
- [ ] Implementar queries para questions (CRUD)
- [ ] Implementar queries para answers (CRUD)
- [ ] Implementar queries para games (create, list, get)
- [ ] Implementar queries para game_rounds (create, list)
- [ ] Agregar error handling robusto
- [ ] Tipar correctamente con TypeScript
- [ ] Agregar JSDoc comments

**Criterios de Aceptación:**

- Todas las queries funcionan correctamente
- Error handling apropiado
- TypeScript types correctos
- API limpia y consistente

**Queries principales:**

```typescript
export const questionSetQueries = {
  getUserSets(supabase, userId): Promise<QuestionSet[]>
  getPublicSets(supabase): Promise<QuestionSet[]>
  createSet(supabase, userId, data): Promise<QuestionSet>
  updateSet(supabase, setId, data): Promise<QuestionSet>
  deleteSet(supabase, setId): Promise<void>
}

export const gameQueries = {
  createGame(supabase, gameData): Promise<Game>
  getGameHistory(supabase, userId): Promise<GameHistory[]>
  getGameDetails(supabase, gameId): Promise<GameHistory>
}
```

**Archivos a crear:**

- `lib/supabase/queries.ts`

**Dependencias:**

- Issue #37 (schema)
- Issue #38 (RLS)

---

### Issue #40: Implementar adaptador de Supabase storage

**Labels:** `feature`, `storage`, `P1: High`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 4-5 horas

**Descripción:**
Crear adaptador equivalente al localStorage pero usando Supabase como backend.

**Tareas:**

- [ ] Crear `lib/storage/supabaseStorage.ts`
- [ ] Implementar misma API que localStorageAdapter
- [ ] Usar queries de Issue #39
- [ ] Agregar error handling y retry logic
- [ ] Implementar caching local (opcional)
- [ ] Agregar loading states

**Criterios de Aceptación:**

- API idéntica a localStorageAdapter
- Funciona correctamente con Supabase
- Error handling robusto
- Performance aceptable

**API del adaptador:**

```typescript
export const supabaseStorageAdapter = (supabase: SupabaseClient) => ({
  async getQuestionSets(userId: string): Promise<QuestionSet[]>
  async saveQuestionSet(set: QuestionSet, userId: string): Promise<void>
  async deleteQuestionSet(setId: string): Promise<void>
  async getGameHistory(userId: string): Promise<GameHistory[]>
  async saveGameHistory(game: GameHistory, userId: string): Promise<void>
})
```

**Archivos a crear:**

- `lib/storage/supabaseStorage.ts`

**Dependencias:**

- Issue #39 (queries)

---

### Issue #41: Crear sistema de abstracción (localStorage vs Supabase)

**Labels:** `feature`, `architecture`, `P1: High`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 3-4 horas

**Descripción:**
Crear capa de abstracción que automáticamente usa localStorage o Supabase según si el usuario está autenticado.

**Tareas:**

- [ ] Crear `lib/storage/storageManager.ts`
- [ ] Implementar función que detecta si usuario está autenticado
- [ ] Retornar adaptador apropiado (local o Supabase)
- [ ] Crear hook `useStorage()` que usa el manager
- [ ] Agregar migración de localStorage a Supabase al hacer login

**Criterios de Aceptación:**

- Abstracción funciona transparentemente
- Switch automático según auth state
- Migración de datos al login funciona
- API consistente en ambos casos

**API del manager:**

```typescript
export const getStorageAdapter = (user?: User) => {
  if (user) {
    return supabaseStorageAdapter(supabase)
  }
  return localStorageAdapter
}

// Hook
export const useStorage = () => {
  const { user } = useAuth()
  return useMemo(() => getStorageAdapter(user), [user])
}
```

**Archivos a crear:**

- `lib/storage/storageManager.ts`
- `hooks/useStorage.ts`

**Dependencias:**

- Issue #26 (localStorage adapter)
- Issue #40 (Supabase adapter)
- Issue #33 (useAuth)

---

### Issue #42: Testing de persistencia con Supabase

**Labels:** `testing`, `P1: High`
**Milestone:** Phase 6: Data Persistence
**Estimación:** 3-4 horas

**Descripción:**
Testing completo de persistencia de datos con Supabase.

**Tareas:**

- [ ] Crear usuario de prueba
- [ ] Probar crear sets de preguntas
- [ ] Probar editar/eliminar sets
- [ ] Probar guardar partidas
- [ ] Probar obtener historial
- [ ] Probar RLS (intentar acceder datos de otro usuario)
- [ ] Probar migración de localStorage a Supabase
- [ ] Documentar bugs encontrados

**Criterios de Aceptación:**

- Todos los flujos de datos funcionan
- RLS policies funcionan correctamente
- No hay data leaks
- Migración funciona sin pérdida de datos

**Escenarios de testing:**

1. Usuario nuevo (sin datos en localStorage)
2. Usuario con datos en localStorage hace login (migración)
3. Usuario crea set de preguntas
4. Usuario juega partida y se guarda en DB
5. Usuario ve historial
6. Usuario logout y vuelve a login (datos persisten)

**Archivos a crear:**

- `TESTING_SUPABASE.md` (documentación)

**Dependencias:**

- Issues #37-41 (todas las features de Supabase)

---

## FASE 7: CRUD de Preguntas

### Issue #43: Crear página "Mis Preguntas" (lista de sets)

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 7: Question Management
**Estimación:** 4-5 horas

**Descripción:**
Página que lista todos los sets de preguntas del usuario con opciones de crear, editar, eliminar.

**Tareas:**

- [ ] Crear `app/(auth)/my-questions/page.tsx`
- [ ] Obtener sets del usuario (localStorage o Supabase)
- [ ] Mostrar lista de sets en cards
- [ ] Botón "Crear Nuevo Set"
- [ ] Acciones: Editar, Eliminar, Jugar con este set
- [ ] Confirmación antes de eliminar
- [ ] Loading states
- [ ] Empty state (sin sets aún)

**Criterios de Aceptación:**

- Lista muestra todos los sets del usuario
- Botones de acción funcionan
- Confirmación de delete previene eliminación accidental
- Responsive en todos los tamaños

**Info mostrada por set:**

- Nombre del set
- Descripción
- Número de preguntas
- Fecha de creación
- Acciones (editar, eliminar, jugar)

**Archivos a crear:**

- `app/(auth)/my-questions/page.tsx`

**Dependencias:**

- Issue #41 (storage abstraction)

---

### Issue #44: Implementar QuestionSetEditor (crear/editar set)

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 7: Question Management
**Estimación:** 6-8 horas

**Descripción:**
Página/modal para crear o editar un set completo de preguntas.

**Tareas:**

- [ ] Crear `app/(auth)/my-questions/edit/[id]/page.tsx`
- [ ] Formulario: nombre del set, descripción
- [ ] Lista de preguntas del set (drag & drop para reordenar)
- [ ] Botón "Agregar Pregunta"
- [ ] Botón "Eliminar Pregunta"
- [ ] Botón "Guardar Set"
- [ ] Validaciones (nombre requerido, mínimo 1 pregunta)
- [ ] Preview del set

**Criterios de Aceptación:**

- Editor completo y funcional
- Se puede crear nuevo set o editar existente
- Reordenar preguntas funciona (drag & drop o botones)
- Validaciones previenen guardar set inválido
- UX fluida y clara

**Estructura del editor:**

1. Información del set (nombre, descripción, público/privado)
2. Lista de preguntas (QuestionForm inline)
3. Botones de acción (Guardar, Cancelar, Preview)

**Archivos a crear:**

- `app/(auth)/my-questions/edit/[id]/page.tsx`
- `app/(auth)/my-questions/new/page.tsx`

**Dependencias:**

- Issue #43 (lista de sets)
- Issue #45 (QuestionForm)

---

### Issue #45: Crear QuestionForm (añadir/editar pregunta individual)

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 7: Question Management
**Estimación:** 5-6 horas

**Descripción:**
Componente de formulario para crear o editar una pregunta individual con sus respuestas.

**Tareas:**

- [ ] Crear `components/questions/QuestionForm.tsx`
- [ ] Input para texto de la pregunta
- [ ] Lista dinámica de respuestas (añadir/eliminar)
- [ ] Input para puntos de cada respuesta
- [ ] Selector de multiplicador (1x, 2x, 3x)
- [ ] Validaciones (pregunta no vacía, mínimo 2 respuestas)
- [ ] Reordenar respuestas
- [ ] Botones: Guardar, Cancelar

**Criterios de Aceptación:**

- Formulario completo y funcional
- Validaciones previenen guardar pregunta inválida
- Añadir/eliminar respuestas funciona fluidamente
- UX clara e intuitiva

**Campos:**

- Texto de pregunta (textarea)
- Respuestas (array):
  - Texto de respuesta (input)
  - Puntos (number input)
  - Botón eliminar
- Botón "Agregar Respuesta"
- Multiplicador (select: 1x, 2x, 3x)

**Validaciones:**

- Pregunta no vacía
- Mínimo 2 respuestas
- Cada respuesta tiene texto y puntos > 0
- Puntos en orden descendente (opcional, sugerencia)

**Archivos a crear:**

- `components/questions/QuestionForm.tsx`

**Dependencias:**

- Issue #12 (tipos)
- Issue #7 (UI components)

---

### Issue #46: Implementar gestión de respuestas (añadir, editar, eliminar)

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 7: Question Management
**Estimación:** 3-4 horas

**Descripción:**
Componente específico para manejar el array de respuestas dentro de QuestionForm.

**Tareas:**

- [ ] Crear `components/questions/AnswerManager.tsx`
- [ ] Lista de respuestas con inputs inline
- [ ] Botón "+" para agregar respuesta
- [ ] Botón "X" para eliminar respuesta
- [ ] Drag handles para reordenar
- [ ] Validación de duplicados (opcional)
- [ ] Auto-sugerir orden por puntos

**Criterios de Aceptación:**

- Gestión de respuestas fluida
- Añadir/eliminar sin bugs
- Reordenar funciona correctamente
- UI clara y no cluttered

**Props interface:**

```typescript
interface AnswerManagerProps {
  answers: Answer[]
  onChange: (answers: Answer[]) => void
  minAnswers?: number
  maxAnswers?: number
}
```

**Archivos a crear:**

- `components/questions/AnswerManager.tsx`

**Dependencias:**

- Issue #45 (QuestionForm)

---

### Issue #47: Crear validaciones de preguntas (mínimo respuestas, puntos)

**Labels:** `feature`, `validation`, `P1: High`
**Milestone:** Phase 7: Question Management
**Estimación:** 2-3 horas

**Descripción:**
Implementar validaciones completas para preguntas y respuestas.

**Tareas:**

- [ ] Crear `lib/validation/questionValidation.ts`
- [ ] Validar estructura de pregunta completa
- [ ] Validar número de respuestas (mínimo 2, máximo 8)
- [ ] Validar puntos (positivos, no duplicados)
- [ ] Validar textos no vacíos
- [ ] Retornar mensajes de error descriptivos
- [ ] Integrar con QuestionForm

**Criterios de Aceptación:**

- Todas las validaciones funcionan
- Mensajes de error claros y útiles
- Se previene guardar datos inválidos

**Validaciones:**

```typescript
export const questionValidation = {
  validateQuestion(question: Question): ValidationResult
  validateAnswer(answer: Answer): ValidationResult
  validateQuestionSet(set: QuestionSet): ValidationResult
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}
```

**Reglas:**

- Pregunta: texto no vacío, min 10 caracteres
- Respuestas: mínimo 2, máximo 8
- Cada respuesta: texto no vacío, puntos > 0
- No respuestas duplicadas (mismo texto)

**Archivos a crear:**

- `lib/validation/questionValidation.ts`

**Dependencias:**

- Issue #12 (tipos)

---

### Issue #48: Implementar importar/exportar sets (JSON)

**Labels:** `feature`, `enhancement`, `P2: Medium`
**Milestone:** Phase 7: Question Management
**Estimación:** 3-4 horas

**Descripción:**
Permitir a usuarios exportar sus sets de preguntas como JSON e importar sets externos.

**Tareas:**

- [ ] Crear botón "Exportar" en lista de sets
- [ ] Generar archivo JSON descargable
- [ ] Crear botón "Importar"
- [ ] Subir archivo JSON y parsear
- [ ] Validar estructura del JSON
- [ ] Importar set validado a biblioteca del usuario
- [ ] Manejar errores de formato

**Criterios de Aceptación:**

- Exportar genera JSON válido y completo
- Importar acepta JSON en formato correcto
- Validaciones previenen importar datos corruptos
- UX clara con feedback de éxito/error

**Formato JSON:**

```json
{
  "name": "Nombre del Set",
  "description": "Descripción",
  "questions": [
    {
      "questionText": "Pregunta?",
      "answers": [
        { "text": "Respuesta 1", "points": 50 },
        { "text": "Respuesta 2", "points": 30 }
      ],
      "multiplier": 1
    }
  ]
}
```

**Archivos a modificar:**

- `app/(auth)/my-questions/page.tsx`
- Crear `lib/utils/importExport.ts`

**Dependencias:**

- Issue #43 (lista de sets)
- Issue #47 (validaciones)

---

### Issue #49: Crear previsualización de set antes de jugar

**Labels:** `feature`, `ui`, `P2: Medium`
**Milestone:** Phase 7: Question Management
**Estimación:** 2-3 horas

**Descripción:**
Modal o página que muestra preview de un set completo antes de usarlo en una partida.

**Tareas:**

- [ ] Crear componente `QuestionSetPreview`
- [ ] Mostrar información del set (nombre, descripción, total preguntas)
- [ ] Listar todas las preguntas (sin respuestas visibles)
- [ ] Botón "Jugar con este set"
- [ ] Botón "Editar"
- [ ] Modal o página dedicada

**Criterios de Aceptación:**

- Preview muestra información completa
- No revela respuestas (para no spoilear)
- Botones funcionan correctamente
- Diseño limpio y profesional

**Info en preview:**

- Nombre y descripción del set
- Total de preguntas
- Listado de preguntas (solo texto)
- Metadata (creado por, fecha)

**Archivos a crear:**

- `components/questions/QuestionSetPreview.tsx`

**Dependencias:**

- Issue #43 (lista de sets)

---

## FASE 8: Game History & Stats

### Issue #50: Guardar partidas completadas en Supabase

**Labels:** `feature`, `database`, `P0: Critical`
**Milestone:** Phase 8: History
**Estimación:** 4-5 horas

**Descripción:**
Implementar lógica para guardar partidas completadas con todos los detalles en Supabase.

> **Contexto Two-Screen:** El guardado ocurre desde `GameContext` en `/play/control` al detectar fase `finished`. Antes de guardar, el estado `finished` ya fue emitido via BroadcastChannel al board (que lo muestra automáticamente). El guardado es transparente para el board.

**Tareas:**

- [ ] Modificar `GameContext` para detectar cuando juego termina (`phase === 'finished'`)
- [ ] Emitir estado `finished` via BroadcastChannel (ya ocurre automáticamente por el issue #17)
- [ ] Construir objeto GameHistory completo
- [ ] Guardar en Supabase usando queries del Issue #39
- [ ] Guardar también game_rounds (detalle por ronda)
- [ ] Calcular y guardar estadísticas (duración, winner)
- [ ] Manejar errores de guardado
- [ ] Mostrar confirmación al usuario (en `/play/control`)

**Criterios de Aceptación:**

- Partidas se guardan automáticamente al terminar
- El board refleja el estado `finished` antes de que empiece el guardado
- Datos completos (equipos, scores, rondas)
- No se pierde información
- Moderador recibe confirmación en su panel

**Datos a guardar:**

```typescript
interface GameHistory {
  setId: string
  team1Name: string
  team2Name: string
  team1Score: number
  team2Score: number
  winner: 'team1' | 'team2' | 'tie'
  startedAt: string
  finishedAt: string
  durationSeconds: number
  rounds: GameRound[] // detalle por ronda
}
```

**Archivos a modificar:**

- `contexts/GameContext.tsx`
- Usar `lib/supabase/queries.ts`

**Dependencias:**

- Issue #17 (BC — estado finished emitido al board antes del guardado)
- Issue #39 (queries)
- Issue #41 (storage abstraction)

---

### Issue #51: Crear página de historial de partidas

**Labels:** `feature`, `ui`, `P0: Critical`
**Milestone:** Phase 8: History
**Estimación:** 4-5 horas

**Descripción:**
Página que muestra lista de todas las partidas jugadas por el usuario.

**Tareas:**

- [ ] Crear `app/(auth)/history/page.tsx`
- [ ] Obtener historial de partidas (Supabase o localStorage)
- [ ] Mostrar lista en tabla o cards
- [ ] Info por partida: equipos, scores, fecha, duración
- [ ] Click en partida para ver detalle
- [ ] Ordenar por fecha (más reciente primero)
- [ ] Paginación si hay muchas partidas
- [ ] Empty state (sin partidas aún)

**Criterios de Aceptación:**

- Historial completo visible
- Información clara por partida
- Click para ver detalle funciona
- Responsive en todos los tamaños

**Info mostrada:**

- Fecha y hora
- Set de preguntas usado
- Nombres de equipos
- Scores finales
- Ganador destacado
- Duración de partida

**Archivos a crear:**

- `app/(auth)/history/page.tsx`

**Dependencias:**

- Issue #50 (guardar partidas)
- Issue #41 (storage abstraction)

---

### Issue #52: Implementar detalle de partida (ver rondas jugadas)

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 8: History
**Estimación:** 4-5 horas

**Descripción:**
Página de detalle que muestra información completa de una partida específica, incluyendo todas las rondas.

**Tareas:**

- [ ] Crear `app/(auth)/history/[id]/page.tsx`
- [ ] Obtener datos completos de la partida
- [ ] Mostrar header con resumen (equipos, scores, winner)
- [ ] Listar todas las rondas jugadas
- [ ] Por ronda: pregunta, respuestas reveladas, strikes, puntos ganados
- [ ] Mostrar timeline de la partida
- [ ] Botón "Jugar de nuevo con este set"

**Criterios de Aceptación:**

- Detalle completo visible
- Información clara y organizada
- Timeline/rondas fáciles de seguir
- Botón de replay funciona

**Estructura de la página:**

1. Header: Resumen (fecha, equipos, scores, winner)
2. Stats: Duración, total rondas, multiplicadores usados
3. Timeline: Lista de rondas con detalles
4. Actions: Jugar de nuevo, Compartir (futuro)

**Archivos a crear:**

- `app/(auth)/history/[id]/page.tsx`

**Dependencias:**

- Issue #51 (lista de historial)

---

### Issue #53: Crear estadísticas generales (total juegos, win rate, etc.)

**Labels:** `feature`, `ui`, `P2: Medium`
**Milestone:** Phase 8: History
**Estimación:** 4-5 horas

**Descripción:**
Página o sección que muestra estadísticas agregadas de todas las partidas del usuario.

**Tareas:**

- [ ] Crear `app/(auth)/stats/page.tsx` o sección en dashboard
- [ ] Calcular total de partidas jugadas
- [ ] Calcular win rate (si jugó siempre con mismo equipo)
- [ ] Calcular total de puntos acumulados
- [ ] Mostrar set más jugado
- [ ] Mostrar duración promedio de partidas
- [ ] Visualizar con cards y números grandes
- [ ] Gráficos simples (barras, líneas) opcional

**Criterios de Aceptación:**

- Stats se calculan correctamente
- Visualización clara y atractiva
- Información útil e interesante
- Performance aceptable (cálculos optimizados)

**Estadísticas a mostrar:**

- Total partidas jugadas
- Sets creados
- Sets públicos usados
- Duración promedio
- Partidas esta semana/mes
- Tendencias (opcional)

**Archivos a crear:**

- `app/(auth)/stats/page.tsx`

**Dependencias:**

- Issue #51 (historial)

---

### Issue #54: Implementar filtros y búsqueda en historial

**Labels:** `feature`, `enhancement`, `P2: Medium`
**Milestone:** Phase 8: History
**Estimación:** 3-4 horas

**Descripción:**
Agregar capacidad de filtrar y buscar en el historial de partidas.

**Tareas:**

- [ ] Agregar barra de búsqueda (buscar por nombre de equipo)
- [ ] Filtro por set de preguntas usado
- [ ] Filtro por fecha (última semana, último mes, personalizado)
- [ ] Filtro por ganador (team1, team2, empate)
- [ ] Ordenar por: fecha, duración, score
- [ ] Limpiar filtros

**Criterios de Aceptación:**

- Búsqueda funciona correctamente
- Filtros se aplican sin recargar página
- Combinar múltiples filtros funciona
- UX fluida y responsive

**Filtros:**

- Búsqueda por texto (nombre equipo)
- Set de preguntas (dropdown)
- Fecha (datepicker o presets)
- Ganador (dropdown)
- Ordenar (dropdown)

**Archivos a modificar:**

- `app/(auth)/history/page.tsx`

**Dependencias:**

- Issue #51 (historial)

---

### Issue #55: Crear gráficos de estadísticas (opcional)

**Labels:** `enhancement`, `ui`, `P3: Low`
**Milestone:** Phase 8: History
**Estimación:** 4-6 horas

**Descripción:**
Agregar gráficos visuales para estadísticas usando librería como Recharts.

**Tareas:**

- [ ] Instalar librería de gráficos (Recharts, Chart.js)
- [ ] Crear gráfico de línea: partidas por día/semana
- [ ] Crear gráfico de barras: sets más usados
- [ ] Crear gráfico de pie: distribución de winners
- [ ] Agregar tooltips informativos
- [ ] Responsive (adaptar a mobile)

**Criterios de Aceptación:**

- Gráficos visualizan datos correctamente
- Responsive en todos los tamaños
- Performance aceptable
- Tooltips/leyendas claras

**Gráficos sugeridos:**

1. Partidas por fecha (línea)
2. Sets más populares (barras)
3. Win rate (pie o donut)
4. Scores promedio (barras)

**Archivos a modificar:**

- `app/(auth)/stats/page.tsx`

**Dependencias:**

- Issue #53 (stats)
- Librería externa: `recharts` o similar

---

## FASE 9: Game Features Avanzados

### Issue #56: Implementar Timer funcional (countdown con alarma)

**Labels:** `feature`, `game-logic`, `P0: Critical`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 3-4 horas

**Descripción:**
Integrar Timer component completamente en el flujo del juego con lógica de expiración.

> **Contexto Two-Screen:** El timer corre **solo en `/play/control`**. Los ticks se emiten via BroadcastChannel automáticamente (el tiempo restante debe estar en `GameState`). El board muestra el tiempo recibido como display puro — nunca corre su propio countdown independiente.

**Tareas:**

- [ ] Agregar campo `timerRemaining: number | null` a `GameState` en `types/game.types.ts`
- [ ] Conectar Timer con `GameContext` en `/play/control`
- [ ] En cada tick del timer: `dispatch({ type: 'TICK_TIMER' })` para actualizar `timerRemaining` en estado → BC lo propaga al board
- [ ] Al expirar: `dispatch({ type: 'ADD_STRIKE' })` automáticamente
- [ ] Configurar duración desde setup del juego
- [ ] Opción de desactivar timer en setup
- [ ] En `/play/board`: `Timer` con `readonly={true}`, mostrando `state.timerRemaining`
- [ ] Sonido/alerta al expirar (solo en control, opcional)
- [ ] Visual feedback cuando está por expirar (últimos 10 seg, en ambas pantallas)

**Criterios de Aceptación:**

- Timer corre en `/play/control`, board lo muestra sincronizado
- Expiración causa strike automáticamente (dispatch desde control)
- Se puede habilitar/deshabilitar desde setup
- Sin desync entre control y board

**Comportamiento:**

1. Timer inicia cuando se revela pregunta (desde control)
2. Cada tick actualiza `GameState.timerRemaining` → BC sincroniza al board
3. Si expira: +1 strike via dispatch
4. Timer se resetea en cada nueva pregunta

**Archivos a modificar:**

- `types/game.types.ts` (agregar timerRemaining)
- `lib/game/gameEngine.ts` (acción TICK_TIMER)
- `contexts/GameContext.tsx`
- `app/(game)/play/control/page.tsx`
- `app/(game)/play/board/page.tsx`

**Dependencias:**

- Issue #17 (BroadcastChannel — ticks propagan via estado)
- Issue #23 (Timer component con prop readonly)
- Issue #14 (GameContext)

---

### Issue #57: Integrar multiplicadores de puntos por ronda

**Labels:** `feature`, `game-logic`, `P0: Critical`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 2-3 horas

**Descripción:**
Implementar completamente la lógica de multiplicadores que incrementan puntos en rondas finales.

> **Contexto Two-Screen:** La lógica de multiplicadores vive en `/play/control` (cálculo y aplicación en `GameEngine`). El `multiplier` ya está en `GameState` y se propaga via BroadcastChannel al board, donde `QuestionDisplay` lo muestra como dato recibido.

**Tareas:**

- [ ] Conectar scoring con multiplicadores en `GameEngine`
- [ ] Mostrar multiplicador actual en `QuestionDisplay` (x1, x2, x3) — en ambas pantallas via estado BC
- [ ] Aplicar multiplicador al calcular puntos de ronda
- [ ] Destacar visualmente rondas con multiplicador (en ambas pantallas)
- [ ] Configurar qué rondas tienen multiplicador desde setup (`/play`)
- [ ] Probar cálculos exhaustivamente

**Criterios de Aceptación:**

- Multiplicadores aplican correctamente (lógica en GameEngine)
- Ambas pantallas muestran el mismo multiplicador (via BC)
- Puntos se calculan correctamente con multiplicadores
- No hay bugs en scoring

**Reglas por defecto:**

- 5 rondas: rondas 1-3 (x1), ronda 4 (x2), ronda 5 (x3)
- 3 rondas: rondas 1-2 (x1), ronda 3 (x2)

**Archivos a modificar:**

- `lib/game/scoring.ts`
- `components/game/QuestionDisplay.tsx`
- `contexts/GameContext.tsx`

**Dependencias:**

- Issue #17 (BC — multiplier en GameState llega al board automáticamente)
- Issue #15 (scoring)
- Issue #19 (QuestionDisplay)

---

### Issue #58: Crear modo de ronda de desempate

**Labels:** `feature`, `game-logic`, `P2: Medium`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 3-4 horas

**Descripción:**
Implementar ronda especial de desempate cuando hay empate al final del juego.

> **Contexto Two-Screen:** El desempate es iniciado por el moderador desde `/play/control`. La fase `tiebreaker` se emite via BroadcastChannel al board, que muestra la pregunta extra y el resultado automáticamente.

**Tareas:**

- [ ] Detectar empate al finalizar todas las rondas (en `GameEngine`)
- [ ] Agregar fase `tiebreaker` a `GamePhase` en `types/game.types.ts`
- [ ] Mostrar modal "¡Desempate!" en `/play/control`
- [ ] Seleccionar pregunta extra automáticamente
- [ ] Primera respuesta correcta gana todo (dispatch desde control)
- [ ] El board recibe la fase `tiebreaker` via BC y muestra el estado emocionante
- [ ] Mostrar ganador después de desempate en ambas pantallas
- [ ] Opción de desactivar desempate en setup

**Criterios de Aceptación:**

- Desempate se activa correctamente en empate
- Lógica de "primera respuesta gana" funciona desde control
- Board muestra la ronda de desempate automáticamente (via BC)
- Se puede desactivar desde configuración

**Flow de desempate:**

1. Game termina en empate → `GameEngine` detecta y transiciona a fase `tiebreaker`
2. BC emite el estado `tiebreaker` al board
3. Control muestra modal de acción; board muestra pregunta de desempate
4. Moderador revela respuestas; primer equipo en acertar gana
5. Se actualiza winner y se guarda partida

**Archivos a modificar:**

- `contexts/GameContext.tsx`
- `lib/game/gameEngine.ts`
- `types/game.types.ts` (fase tiebreaker)
- `app/(game)/play/page.tsx` (setup)

**Dependencias:**

- Issue #17 (BC — fase tiebreaker llega al board automáticamente)
- Issue #13 (gameEngine)
- Issue #14 (GameContext)

---

### Issue #59: Implementar pausa/reanudar partida

**Labels:** `feature`, `game-logic`, `P2: Medium`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 2-3 horas

**Descripción:**
Agregar funcionalidad para pausar y reanudar partida en progreso.

> **Contexto Two-Screen:** La pausa es **comandada desde `/play/control`**. Al pausar, el estado cambia a fase `paused` → BC emite al board → board muestra overlay de pausa automáticamente. El moderador puede reanudar desde su panel.

**Tareas:**

- [ ] Agregar fase `paused` a `GamePhase` en `types/game.types.ts`
- [ ] Botón "Pausar/Reanudar" en `GameControls` (solo en `/play/control`)
- [ ] `dispatch({ type: 'PAUSE_GAME' })` → BC emite fase `paused` al board
- [ ] Board: cuando `state.phase === 'paused'`, mostrar overlay sobre tablero
- [ ] Control: modal/banner indicando "Juego pausado — Presiona Reanudar"
- [ ] Pausar timer si está activo (detener ticks)
- [ ] Guardar estado al pausar en localStorage

**Criterios de Aceptación:**

- Pausa desde control bloquea el board (overlay) automáticamente via BC
- Reanudar desde control quita el overlay del board
- Timer se pausa/reanuda correctamente
- UX clara en ambas pantallas

**Comportamiento two-screen:**

- Control pausa → `phase: 'paused'` → BC → board muestra overlay
- Control reanuda → `phase: 'playing'` → BC → board quita overlay

**Archivos a modificar:**

- `types/game.types.ts` (fase paused)
- `lib/game/gameEngine.ts` (acción PAUSE_GAME, RESUME_GAME)
- `contexts/GameContext.tsx`
- `components/game/GameControls.tsx`
- `app/(game)/play/board/page.tsx` (overlay de pausa)
- Crear `components/game/PauseModal.tsx`

**Dependencias:**

- Issue #17 (BC — fase paused/playing se propaga al board)
- Issue #24 (GameControls)

---

### Issue #60: Agregar configuraciones avanzadas del juego

**Labels:** `feature`, `enhancement`, `P2: Medium`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 3-4 horas

**Descripción:**
Expandir página de setup con opciones avanzadas configurables.

**Tareas:**

- [ ] Agregar opción: Número de rondas (3, 5, 7, todas las preguntas)
- [ ] Agregar opción: Permitir desempate (sí/no)
- [ ] Agregar opción: Modo estricto (3 strikes = pérdida inmediata)
- [ ] Agregar opción: Mostrar puntos antes de revelar (sí/no)
- [ ] Agregar sección "Avanzado" colapsable
- [ ] Guardar preferencias en localStorage (defaults)

**Criterios de Aceptación:**

- Todas las opciones funcionan correctamente
- Configuración afecta comportamiento del juego
- Preferencias persisten entre sesiones
- UI no abruma con opciones (colapsable)

**Opciones avanzadas:**

- Número de rondas: 3 / 5 / 7 / Todas
- Timer: Activar/desactivar, duración (segundos)
- Multiplicadores: Auto / Manual / Desactivado
- Desempate: Activar/desactivar
- Modo estricto: Sí/no
- Revelar puntos: Antes / Después

**Archivos a modificar:**

- `app/(game)/setup/page.tsx`
- `types/game.types.ts` (GameConfig interface)

**Dependencias:**

- Issue #10 (setup page)

---

### Issue #61: Crear sistema de hotkeys (teclado para revelar respuestas)

**Labels:** `feature`, `enhancement`, `P1: High`
**Milestone:** Phase 9: Advanced Features
**Estimación:** 2-3 horas

**Descripción:**
Implementar atajos de teclado para que el moderador revele respuestas y controle el juego rápidamente.

> **Contexto Two-Screen:** Los hotkeys son **exclusivos de `/play/control`**. El tablero público (`/play/board`) no tiene event listeners de teclado — es una pantalla de proyector, no de interacción. Los resultados de los hotkeys se propagan via BroadcastChannel normalmente.

**Tareas:**

- [ ] Agregar event listener de teclado en `GameControlPanel` (solo en `/play/control`)
- [ ] Mapear teclas 1-8 a revelar respuestas (dispatch → BC → board)
- [ ] Tecla 'X' o 'S' para agregar strike
- [ ] Tecla 'N' o '→' para siguiente pregunta
- [ ] Tecla 'P' para pausar/reanudar
- [ ] Mostrar ayuda de hotkeys (modal con '?' o 'H')
- [ ] Prevenir hotkeys cuando hay modals abiertos en el control

**Criterios de Aceptación:**

- Hotkeys funcionan en `/play/control`
- No existe listener de teclado en `/play/board`
- No interfieren con inputs de texto en el control
- Ayuda de hotkeys accesible y clara
- Mejora velocidad del moderador significativamente

**Hotkeys principales (en /play/control):**

- `1-8`: Revelar respuesta correspondiente
- `Space` o `X`: Agregar strike
- `Enter` o `N`: Siguiente pregunta
- `P`: Pausar/Reanudar
- `?` o `H`: Mostrar ayuda de hotkeys
- `Esc`: Cerrar modals

**Archivos a modificar:**

- `components/game/GameControlPanel.tsx`
- Crear `components/game/HotkeysHelp.tsx`

**Dependencias:**

- Issue #16 (ruta /play/control donde viven los hotkeys)
- Issue #18 (GameControlPanel)

---

## FASE 10: Polish & Testing

### Issue #62: Testing exhaustivo de todos los flujos

**Labels:** `testing`, `P0: Critical`
**Milestone:** Phase 10: Production Ready
**Estimación:** 6-8 horas

**Descripción:**
Testing completo de toda la aplicación, todos los flujos y casos de uso, incluyendo sincronización two-screen.

> **Contexto Two-Screen:** Agregar checklist de sincronización multi-tab: control + board en tabs separadas. Probar también el caso de BroadcastChannel desconectado.

**Tareas:**

- [ ] Crear checklist completo de testing
- [ ] Probar flujo sin login: setup (`/play`) → control+board (dos tabs) → finalizar
- [ ] Probar flujo con login (Supabase)
- [ ] Probar CRUD de preguntas completo
- [ ] Probar juego completo con todas las features en modo two-screen
- [ ] Probar sync: acciones en control visibles en board < 100ms
- [ ] Probar historial y estadísticas
- [ ] Probar hotkeys (solo en control, no en board)
- [ ] Probar en múltiples navegadores
- [ ] Documentar todos los bugs encontrados
- [ ] Crear issues para bugs críticos

**Criterios de Aceptación:**

- Todos los flujos principales probados en modo two-screen
- Sync BC verificada en tiempo real
- Board sin listeners de teclado/click en respuestas
- Documentación de bugs completa

**Flujos a probar:**

1. Landing → Setup → Control+Board (dos tabs) → Finalizar (sin login)
2. Register → Dashboard → Crear preguntas → Jugar two-screen
3. Login → Ver historial → Ver detalle partida
4. Importar/Exportar sets de preguntas
5. Todas las configuraciones del juego
6. Hotkeys en control → board refleja cambios
7. **BC sync:** abrir control, abrir board, verificar estado inicial en board
8. **BC desconectado:** cerrar control → board debe mostrar "Esperando..." si se recarga
9. Responsive: control en laptop, board en pantalla grande (1080p)
10. Performance (loading times, BC latency)

**Archivos a crear:**

- `TESTING_FINAL.md` (checklist y resultados)
- `BUGS.md` (lista de bugs encontrados)

**Dependencias:**

- Issue #16 (rutas two-screen)
- Issue #17 (BroadcastChannel)
- Todos los issues anteriores completos

---

### Issue #63: Corregir bugs identificados

**Labels:** `bug`, `P0: Critical`
**Milestone:** Phase 10: Production Ready
**Estimación:** Variable según bugs

**Descripción:**
Corregir todos los bugs críticos y de alta prioridad identificados en Issue #62.

**Tareas:**

- [ ] Revisar lista de bugs de BUGS.md
- [ ] Priorizar bugs (P0 > P1 > P2 > P3)
- [ ] Crear issues separados para bugs complejos
- [ ] Corregir bugs críticos primero
- [ ] Re-testear cada bug corregido
- [ ] Actualizar BUGS.md con status

**Criterios de Aceptación:**

- Todos los bugs P0 corregidos
- Mayoría de bugs P1 corregidos
- Bugs P2/P3 documentados para futuro
- Re-testing confirma correcciones

**Dependencias:**

- Issue #62 (testing)

---

### Issue #64: Optimizar performance (loading, queries)

**Labels:** `enhancement`, `performance`, `P1: High`
**Milestone:** Phase 10: Production Ready
**Estimación:** 4-5 horas

**Descripción:**
Optimizar performance de la aplicación para mejorar tiempos de carga y experiencia de usuario.

**Tareas:**

- [ ] Analizar performance con Lighthouse
- [ ] Optimizar queries de Supabase (indexes, select only needed)
- [ ] Implementar lazy loading de componentes pesados
- [ ] Optimizar imágenes (Next.js Image)
- [ ] Implementar caching donde aplique
- [ ] Minimizar re-renders (memoization)
- [ ] Code splitting de rutas
- [ ] Medir mejoras con Lighthouse

**Criterios de Aceptación:**

- Lighthouse score > 90 en Performance
- Tiempo de carga inicial < 2 segundos
- Queries DB optimizadas
- No re-renders innecesarios

**Optimizaciones:**

1. Lazy load game components (solo cargar al jugar)
2. Memoizar cálculos pesados (scores, stats)
3. Implementar virtual scrolling en listas largas (historial)
4. Optimizar bundle size (code splitting)
5. Cachear question sets en memoria

**Herramientas:**

- Lighthouse (Chrome DevTools)
- React DevTools Profiler
- Next.js Bundle Analyzer

**Dependencias:**

- Ninguna (optimización post-features)

---

### Issue #65: Implementar manejo de errores robusto

**Labels:** `feature`, `error-handling`, `P1: High`
**Milestone:** Phase 10: Production Ready
**Estimación:** 3-4 horas

**Descripción:**
Mejorar manejo de errores en toda la aplicación con mensajes claros y recovery strategies.

> **Contexto Two-Screen:** Agregar manejo específico para pérdida de BroadcastChannel. Si el board pierde conexión (el control se cierra o recarga), debe mostrar "Conexión perdida con el panel de control" en lugar de congelarse.

**Tareas:**

- [ ] Crear componente ErrorBoundary
- [ ] Implementar error handling en todas las queries
- [ ] Mostrar errores de red claramente
- [ ] Agregar retry logic en queries fallidas
- [ ] Implementar fallbacks para errores
- [ ] Logging de errores (console.error con contexto)
- [ ] **BC error handling:** en `useGameBoard`, detectar si han pasado N segundos sin mensajes → mostrar banner "Sin señal del panel de control"
- [ ] Mensajes de error user-friendly

**Criterios de Aceptación:**

- App no crashea con errores no manejados
- Errores se muestran claramente al usuario
- Board muestra "Sin señal del panel de control" si BC se interrumpe
- Retry logic funciona donde aplique
- Logs ayudan a debugging

**Tipos de errores a manejar:**

1. Network errors (offline, timeout)
2. Supabase errors (auth, permissions, queries)
3. Validation errors (formularios)
4. 404 (recursos no encontrados)
5. **BC timeout** — board sin mensajes por >5 segundos → "Conexión perdida"
6. Unexpected errors (catch-all)

**Archivos a crear/modificar:**

- `components/ErrorBoundary.tsx`
- `lib/utils/errorHandling.ts`
- `hooks/useGameBoard.ts` (timeout detection)

**Dependencias:**

- Issue #17 (BroadcastChannel)

**Dependencias:**

- Ninguna (mejora general)

---

### Issue #66: Agregar loading states y skeletons

**Labels:** `feature`, `ui`, `P1: High`
**Milestone:** Phase 10: Production Ready
**Estimación:** 3-4 horas

**Descripción:**
Implementar loading states y skeleton screens para mejorar UX durante cargas.

> **Contexto Two-Screen:** El board (`/play/board`) muestra "Esperando panel de control..." cuando `useGameBoard()` retorna `null` (estado inicial antes del primer mensaje BC). Este estado es el loading state principal del board.

**Tareas:**

- [ ] Crear componentes Skeleton para cada tipo de contenido
- [ ] Implementar loading states en todas las queries
- [ ] Spinner/loader para acciones (submit, delete)
- [ ] Skeleton para lista de sets de preguntas
- [ ] Skeleton para historial
- [ ] Skeleton para dashboard stats
- [ ] Shimmer effect para skeletons
- [ ] **Board loading:** mejorar la pantalla "Esperando panel de control..." con un skeleton del tablero y animación de espera
- [ ] **Control loading:** spinner mientras se carga el set de preguntas desde localStorage/Supabase

**Criterios de Aceptación:**

- Todas las cargas muestran feedback visual
- Board muestra loading atractivo mientras espera el primer mensaje BC
- Skeletons match el layout real
- UX se siente más fluida
- No hay pantallas blancas durante carga

**Componentes skeleton:**

- QuestionSetSkeleton (cards de sets)
- GameHistorySkeleton (tabla/cards de historial)
- StatsSkeleton (cards de stats)
- GameBoardSkeleton (tablero de juego — usado en `/play/board` estado null)

**Archivos a crear:**

- `components/ui/Skeleton.tsx`
- `components/skeletons/*.tsx`

**Dependencias:**

- Issue #17 (BroadcastChannel — el null state del board es el trigger)

---

### Issue #67: Crear página 404 y error boundaries

**Labels:** `feature`, `ui`, `P2: Medium`
**Milestone:** Phase 10: Production Ready
**Estimación:** 2 horas

**Descripción:**
Crear páginas de error personalizadas (404, 500) y error boundaries.

**Tareas:**

- [ ] Crear `app/not-found.tsx` (404 page)
- [ ] Crear `app/error.tsx` (error boundary page)
- [ ] Diseñar páginas de error amigables
- [ ] Agregar botones: Volver al inicio, Reportar error
- [ ] Personalizar mensajes de error
- [ ] Agregar ilustración o imagen

**Criterios de Aceptación:**

- Páginas 404 y error funcionan
- Diseño consistente con la app
- Navegación de vuelta funciona
- Experiencia no frustrante

**Contenido de 404:**

- "Página no encontrada"
- Mensaje amigable
- Botón "Volver al inicio"
- Link a páginas principales

**Archivos a crear:**

- `app/not-found.tsx`
- `app/error.tsx`

**Dependencias:**

- Issue #65 (error handling)

---

### Issue #68: Revisar accesibilidad (a11y basics)

**Labels:** `enhancement`, `a11y`, `P2: Medium`
**Milestone:** Phase 10: Production Ready
**Estimación:** 3-4 horas

**Descripción:**
Revisar y mejorar accesibilidad básica de la aplicación.

**Tareas:**

- [ ] Auditar con Lighthouse a11y score
- [ ] Agregar aria-labels donde falten
- [ ] Verificar contrast ratios (WCAG AA)
- [ ] Asegurar keyboard navigation funciona en todo
- [ ] Agregar focus visible en elementos interactivos
- [ ] Asegurar headings jerárquicos (h1, h2, h3)
- [ ] Probar con screen reader (NVDA/VoiceOver)
- [ ] Corregir issues encontrados

**Criterios de Aceptación:**

- Lighthouse a11y score > 90
- Keyboard navigation funciona completa
- Screen reader puede navegar la app
- Contrast ratios WCAG AA compliant

**Checklist a11y:**

- [ ] Todas las imágenes tienen alt text
- [ ] Botones tienen aria-labels descriptivos
- [ ] Forms tienen labels asociados
- [ ] Headings jerárquicos
- [ ] Focus visible en elementos interactivos
- [ ] Color no es único indicador de info

**Dependencias:**

- Ninguna (mejora general)

---

### Issue #69: Configurar variables de entorno para producción

**Labels:** `setup`, `deployment`, `P0: Critical`
**Milestone:** Phase 10: Production Ready
**Estimación:** 1-2 horas

**Descripción:**
Configurar variables de entorno correctas para producción en Vercel.

**Tareas:**

- [ ] Revisar todas las variables usadas
- [ ] Configurar variables en Vercel dashboard
- [ ] Asegurar NEXT_PUBLIC_SUPABASE_URL correcto
- [ ] Asegurar NEXT_PUBLIC_SUPABASE_ANON_KEY correcto
- [ ] Configurar otras variables si aplica
- [ ] Probar en preview deployment
- [ ] Documentar variables en README

**Criterios de Aceptación:**

- Todas las variables configuradas en Vercel
- App funciona en preview deployment
- No hay errores de variables faltantes
- Documentación completa

**Variables necesarias:**

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

**Archivos a modificar:**

- `README.md` (documentar setup)

**Dependencias:**

- Ninguna (pre-deployment)

---

### Issue #70: Deploy inicial a Vercel

**Labels:** `deployment`, `P0: Critical`
**Milestone:** Phase 10: Production Ready
**Estimación:** 2-3 horas

**Descripción:**
Hacer el primer deploy de la aplicación a Vercel y verificar que todo funciona en producción.

**Tareas:**

- [ ] Conectar repositorio con Vercel
- [ ] Configurar settings de build (Next.js)
- [ ] Configurar variables de entorno
- [ ] Hacer primer deploy
- [ ] Verificar que app carga correctamente
- [ ] Probar funcionalidades principales en prod
- [ ] Configurar dominio custom (opcional)
- [ ] Configurar analytics (Vercel Analytics)

**Criterios de Aceptación:**

- App deployada y accesible públicamente
- Todas las funcionalidades funcionan en prod
- Supabase conecta correctamente
- No hay errores en consola de producción

**Checklist post-deploy:**

- [ ] Landing page carga
- [ ] Login/Register funcionan
- [ ] Juego funciona (con y sin login)
- [ ] CRUD de preguntas funciona
- [ ] Historial carga correctamente
- [ ] No hay CORS errors
- [ ] Performance aceptable

**Dependencias:**

- Issue #69 (env vars)
- Todos los features completados

---

## FASE 11: Post-Launch Enhancements

### Issue #71: Agregar efectos de sonido (buzzers, celebraciones)

**Labels:** `enhancement`, `audio`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 4-5 horas

**Descripción:**
Implementar sonidos para hacer el juego más inmersivo y divertido.

**Tareas:**

- [ ] Buscar/crear sound effects (buzzer, correct, applause, etc.)
- [ ] Agregar sounds a `/public/sounds/`
- [ ] Crear hook `useSound()` para reproducir sonidos
- [ ] Sonido al revelar respuesta correcta
- [ ] Buzzer al agregar strike
- [ ] Celebración al ganar ronda
- [ ] Sonido de timer expirado
- [ ] Configuración para activar/desactivar sonidos
- [ ] Control de volumen

**Criterios de Aceptación:**

- Sonidos mejoran experiencia sin ser molestos
- Se pueden desactivar fácilmente
- No hay lag al reproducir sonidos
- Volumen controlable

**Sonidos necesarios:**

- Reveal answer (ding)
- Strike (buzzer)
- Round win (applause)
- Timer expire (alarm)
- Game win (celebration)

**Archivos a crear:**

- `hooks/useSound.ts`
- `public/sounds/*.mp3`

**Dependencias:**

- Ninguna (enhancement post-MVP)

---

### Issue #72: Implementar animaciones avanzadas (Framer Motion)

**Labels:** `enhancement`, `ui`, `animation`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 6-8 horas

**Descripción:**
Agregar animaciones fluidas y profesionales usando Framer Motion.

**Tareas:**

- [ ] Instalar framer-motion
- [ ] Animar reveal de respuestas (flip, slide)
- [ ] Animar cambio de turnos
- [ ] Animar actualización de scores (count up)
- [ ] Animar transiciones entre páginas
- [ ] Animar modals (fade + scale)
- [ ] Animar strikes (shake, pulse)
- [ ] Configuración para reducir animaciones (prefers-reduced-motion)

**Criterios de Aceptación:**

- Animaciones mejoran UX sin ralentizar
- Consistentes en toda la app
- Respetan prefers-reduced-motion
- No causan bugs de UI

**Animaciones principales:**

1. Answer cards: flip reveal
2. Scores: count up animation
3. Strikes: shake + appear
4. Page transitions: fade
5. Modals: scale + fade
6. Team switch: slide

**Dependencias:**

- Librería: `framer-motion`

---

### Issue #73: Crear modo oscuro (dark mode)

**Labels:** `enhancement`, `ui`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 4-5 horas

**Descripción:**
Implementar tema oscuro alternativo con toggle en UI.

**Tareas:**

- [ ] Configurar Tailwind para dark mode
- [ ] Agregar dark variants en todos los componentes
- [ ] Crear toggle de tema (light/dark/system)
- [ ] Persistir preferencia en localStorage
- [ ] Probar legibilidad en dark mode
- [ ] Ajustar colores para buen contraste en dark
- [ ] Icono de sol/luna para toggle

**Criterios de Aceptación:**

- Dark mode funciona en toda la app
- Toggle funciona correctamente
- Preferencia persiste
- Contraste adecuado (a11y)

**Implementación:**

```typescript
// tailwind.config.ts
darkMode: 'class'

// Componentes
<div className="bg-white dark:bg-gray-900">
```

**Archivos a modificar:**

- `tailwind.config.ts`
- Todos los componentes (agregar dark: variants)
- `components/layout/Header.tsx` (theme toggle)

**Dependencias:**

- Ninguna (enhancement)

---

### Issue #74: Implementar compartir sets de preguntas (públicos)

**Labels:** `feature`, `enhancement`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 5-6 horas

**Descripción:**
Permitir que usuarios hagan sus sets públicos y otros usuarios puedan usarlos.

**Tareas:**

- [ ] Agregar toggle "Público" en QuestionSetEditor
- [ ] Crear página "Explorar Sets Públicos"
- [ ] Listar sets públicos de todos los usuarios
- [ ] Filtrar/buscar sets públicos
- [ ] "Copiar a mi biblioteca" (duplicar set público)
- [ ] Mostrar autor del set
- [ ] Implementar sistema de likes/favoritos (opcional)

**Criterios de Aceptación:**

- Usuarios pueden marcar sets como públicos
- Sets públicos visibles para todos
- Otros usuarios pueden copiar sets públicos
- Attribution del autor visible

**Página "Explorar":**

- Lista de sets públicos (cards)
- Búsqueda por nombre/descripción
- Filtro por número de preguntas
- "Copiar a mi biblioteca" button
- Preview del set

**Archivos a crear:**

- `app/(auth)/explore/page.tsx`

**Dependencias:**

- Issue #38 (RLS policies públicos)
- Issue #44 (QuestionSetEditor)

---

### Issue #75: Agregar roles de usuario (admin, player, host)

**Labels:** `feature`, `enhancement`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 6-8 horas

**Descripción:**
Implementar sistema de roles para diferentes tipos de usuarios.

**Tareas:**

- [ ] Agregar columna `role` en profiles table
- [ ] Definir roles: admin, host, player
- [ ] Admin: puede moderar contenido público
- [ ] Host: puede crear y gestionar partidas
- [ ] Player: solo puede jugar (vista limitada)
- [ ] Proteger rutas según roles
- [ ] UI adaptada según rol

**Criterios de Aceptación:**

- Sistema de roles funciona correctamente
- Permisos respetados en cliente y servidor
- UI se adapta según rol
- Admin tiene panel de moderación

**Roles:**

- **Admin:** Acceso total, moderar sets públicos
- **Host:** Crear sets, gestionar partidas, ver stats completas
- **Player:** Jugar partidas, ver historial propio

**Archivos a crear:**

- `lib/auth/roles.ts`
- `app/(admin)/moderate/page.tsx` (admin panel)

**Dependencias:**

- Issue #38 (RLS policies - modificar)

---

### Issue #76: Crear modo multi-pantalla (host + jugadores)

**Labels:** `feature`, `enhancement`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 10-12 horas (complejo)

**Descripción:**
Implementar modo donde el host controla el juego en una pantalla y jugadores ven otra vista en sus dispositivos.

**Tareas:**

- [ ] Diseñar arquitectura (WebSockets, real-time)
- [ ] Crear room system (códigos de partida)
- [ ] Vista de host (control total)
- [ ] Vista de jugador (solo ver, no interactuar)
- [ ] Sincronización real-time con Supabase Realtime
- [ ] Probar con múltiples dispositivos
- [ ] Manejar desconexiones

**Criterios de Aceptación:**

- Host controla juego desde su dispositivo
- Jugadores ven actualizaciones en tiempo real
- Sincronización funciona sin lag significativo
- Sistema de rooms funciona correctamente

**Nota:** Esta feature es compleja y requiere Supabase Realtime. Considerar si vale la pena para el scope del proyecto.

**Dependencias:**

- Supabase Realtime configurado

---

### Issue #77: Implementar PWA (Progressive Web App)

**Labels:** `enhancement`, `pwa`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 3-4 horas

**Descripción:**
Convertir la app en PWA para permitir instalación en dispositivos y funcionalidad offline.

**Tareas:**

- [ ] Configurar next-pwa
- [ ] Crear manifest.json
- [ ] Agregar service worker
- [ ] Configurar caching strategies
- [ ] Probar instalación en mobile
- [ ] Agregar prompt de instalación
- [ ] Iconos en diferentes tamaños

**Criterios de Aceptación:**

- App puede instalarse en mobile/desktop
- Funcionalidad básica offline (localStorage mode)
- Lighthouse PWA score > 90
- Iconos y splash screens correctos

**Archivos a crear:**

- `public/manifest.json`
- `public/icons/*.png`
- Configuración en `next.config.js`

**Dependencias:**

- Librería: `next-pwa`

---

### Issue #78: Agregar internacionalización (i18n)

**Labels:** `enhancement`, `i18n`, `P3: Low`
**Milestone:** Phase 11: V1.1
**Estimación:** 6-8 horas

**Descripción:**
Agregar soporte para múltiples idiomas (Español, Inglés).

**Tareas:**

- [ ] Instalar next-intl o react-i18next
- [ ] Extraer todos los strings a archivos de traducción
- [ ] Traducir a inglés
- [ ] Implementar language switcher
- [ ] Persistir idioma seleccionado
- [ ] Traducir contenido demo
- [ ] Probar en ambos idiomas

**Criterios de Aceptación:**

- Toda la UI traducible
- Switch entre idiomas funciona
- Preferencia persiste
- Traducciones completas y correctas

**Idiomas:**

- Español (default)
- Inglés

**Archivos a crear:**

- `locales/es.json`
- `locales/en.json`
- `lib/i18n.ts`

**Dependencias:**

- Librería: `next-intl` o `react-i18next`

---

**FIN DE ISSUES**

---

## Resumen

**Total de issues:** 78
**Fases:** 11
**Estimación total:** ~200-250 horas de desarrollo

**Fases críticas (MVP):**

- Fase 0-6: Setup, UI, Game Logic, Storage
- Fase 7-8: CRUD y Historial
- Fase 9: Features avanzados

**Fases opcionales (Post-MVP):**

- Fase 10: Polish (recomendado antes de launch)
- Fase 11: Enhancements (nice-to-have)

---

**Última actualización:** 2026-02-10
