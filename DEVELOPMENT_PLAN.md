# Plan de Desarrollo: La Respuesta más Popular

## Visión del Proyecto

**La Respuesta más Popular** es una aplicación web interactiva tipo "100 mexicanos dijeron" / Family Feud que permite a dos equipos competir respondiendo encuestas. El juego funciona tanto sin autenticación (usando localStorage) como con usuarios registrados (guardando datos en Supabase).

### Objetivos del Proyecto
- ✅ Crear experiencia de juego completa y fluida para 2 equipos
- ✅ Permitir juego inmediato sin registro (modo localStorage)
- ✅ Ofrecer persistencia y funcionalidades avanzadas con registro
- ✅ Sistema CRUD completo para preguntas personalizadas
- ✅ Historial y estadísticas detalladas de partidas

### Stack Tecnológico
- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos & Auth:** Supabase
- **Deploy:** Vercel
- **Estado:** React Context API / Zustand (a definir por complejidad)

### Métricas de Éxito
- Juego completamente funcional sin bugs críticos
- Tiempo de carga < 2 segundos
- UI responsive y clara en desktop/tablet
- Sistema de puntuación preciso y confiable
- Persistencia de datos sin pérdida de información

---

## Arquitectura del Proyecto

### Estructura de Carpetas

```
la-respuesta-mas-popular/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rutas con autenticación
│   │   ├── dashboard/
│   │   ├── my-questions/
│   │   ├── history/
│   │   └── layout.tsx
│   ├── (game)/                   # Rutas de juego
│   │   ├── play/
│   │   ├── setup/
│   │   └── layout.tsx
│   ├── api/                      # API Routes
│   │   ├── questions/
│   │   └── games/
│   ├── login/
│   ├── register/
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/                   # Componentes React
│   ├── game/                     # Componentes del juego
│   │   ├── GameBoard.tsx
│   │   ├── QuestionDisplay.tsx
│   │   ├── AnswerCard.tsx
│   │   ├── TeamScore.tsx
│   │   ├── StrikeIndicator.tsx
│   │   └── Timer.tsx
│   ├── questions/                # CRUD de preguntas
│   │   ├── QuestionForm.tsx
│   │   ├── QuestionList.tsx
│   │   └── QuestionSetEditor.tsx
│   ├── ui/                       # Componentes UI base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       └── Navigation.tsx
├── lib/                          # Lógica de negocio
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── queries.ts
│   ├── game/
│   │   ├── gameEngine.ts         # Lógica del juego
│   │   ├── scoring.ts
│   │   └── validation.ts
│   ├── storage/
│   │   ├── localStorage.ts       # Adaptador localStorage
│   │   └── supabaseStorage.ts   # Adaptador Supabase
│   └── utils/
│       └── helpers.ts
├── hooks/                        # Custom React Hooks
│   ├── useGameState.ts
│   ├── useAuth.ts
│   ├── useQuestions.ts
│   └── useLocalStorage.ts
├── types/                        # TypeScript types
│   ├── game.types.ts
│   ├── question.types.ts
│   └── database.types.ts
├── contexts/                     # React Contexts
│   ├── GameContext.tsx
│   └── AuthContext.tsx
├── data/                         # Data estática
│   └── demoQuestions.ts          # Set de preguntas demo
├── supabase/                     # Configuración Supabase
│   ├── migrations/
│   └── seed.sql
└── public/
    └── assets/
```

---

## Modelo de Datos (Supabase)

### Esquema de Tablas

```sql
-- Tabla: users (extendida de Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: question_sets
CREATE TABLE question_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  set_id UUID REFERENCES question_sets(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  order_index INTEGER,
  multiplier INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: answers
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  points INTEGER NOT NULL,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: games (historial de partidas)
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  set_id UUID REFERENCES question_sets(id) ON DELETE SET NULL,
  team1_name TEXT NOT NULL,
  team2_name TEXT NOT NULL,
  team1_score INTEGER DEFAULT 0,
  team2_score INTEGER DEFAULT 0,
  winner TEXT, -- 'team1', 'team2', 'tie'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: game_rounds (detalle por ronda)
CREATE TABLE game_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  round_number INTEGER NOT NULL,
  team_turn TEXT, -- 'team1' or 'team2'
  strikes INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  winner TEXT, -- 'team1', 'team2', 'stolen'
  answers_revealed INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_question_sets_user ON question_sets(user_id);
CREATE INDEX idx_questions_set ON questions(set_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_games_user ON games(user_id);
CREATE INDEX idx_game_rounds_game ON game_rounds(game_id);
```

### Row Level Security (RLS) Policies

```sql
-- Profiles: usuarios solo pueden ver/editar su propio perfil
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Question Sets: usuarios pueden ver sets públicos y sus propios sets
ALTER TABLE question_sets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public sets are viewable by all" ON question_sets FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view own sets" ON question_sets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create sets" ON question_sets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sets" ON question_sets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sets" ON question_sets FOR DELETE USING (auth.uid() = user_id);

-- Questions & Answers: heredan permisos del set
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions viewable if set is accessible" ON questions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM question_sets
    WHERE id = questions.set_id
    AND (is_public = true OR user_id = auth.uid())
  ));
CREATE POLICY "Users can manage questions in own sets" ON questions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM question_sets
    WHERE id = questions.set_id AND user_id = auth.uid()
  ));

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Answers viewable if question is accessible" ON answers FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM questions q
    JOIN question_sets qs ON q.set_id = qs.id
    WHERE q.id = answers.question_id
    AND (qs.is_public = true OR qs.user_id = auth.uid())
  ));
CREATE POLICY "Users can manage answers in own questions" ON answers FOR ALL
  USING (EXISTS (
    SELECT 1 FROM questions q
    JOIN question_sets qs ON q.set_id = qs.id
    WHERE q.id = answers.question_id AND qs.user_id = auth.uid()
  ));

-- Games & Rounds: usuarios solo pueden ver/crear sus propias partidas
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own games" ON games FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create games" ON games FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE game_rounds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view rounds of own games" ON game_rounds FOR SELECT
  USING (EXISTS (SELECT 1 FROM games WHERE id = game_rounds.game_id AND user_id = auth.uid()));
CREATE POLICY "Users can create rounds in own games" ON game_rounds FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM games WHERE id = game_rounds.game_id AND user_id = auth.uid()));
```

---

## Tipos de Datos TypeScript

### Core Types

```typescript
// types/game.types.ts
export type Team = 'team1' | 'team2';
export type GamePhase = 'setup' | 'playing' | 'stealing' | 'finished';

export interface TeamData {
  name: string;
  score: number;
}

export interface GameState {
  id: string;
  phase: GamePhase;
  currentQuestionIndex: number;
  currentRound: number;
  team1: TeamData;
  team2: TeamData;
  activeTeam: Team;
  strikes: number;
  revealedAnswers: number[];
  roundPoints: number;
  multiplier: number;
}

export interface Answer {
  id: string;
  text: string;
  points: number;
  orderIndex: number;
  isRevealed: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  answers: Answer[];
  multiplier: number;
  orderIndex: number;
}

export interface QuestionSet {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  isPublic: boolean;
  userId?: string;
  createdAt: string;
}

export interface GameHistory {
  id: string;
  setId: string;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  winner: Team | 'tie';
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  rounds: GameRound[];
}

export interface GameRound {
  id: string;
  roundNumber: number;
  questionId: string;
  teamTurn: Team;
  strikes: number;
  pointsEarned: number;
  winner: Team | 'stolen';
  answersRevealed: number[];
}
```

---

## Fases de Desarrollo

### 📋 **FASE 0: Setup Inicial** (Milestone: Project Setup)
**Objetivo:** Configurar el entorno de desarrollo y estructura base del proyecto

**Status:** 🔴 No iniciado | **Estimación:** 1-2 días

- [ ] #1 Inicializar proyecto Next.js con TypeScript y configuraciones
- [ ] #2 Configurar Tailwind CSS y sistema de diseño base
- [ ] #3 Configurar Supabase (proyecto, conexión, tipos)
- [ ] #4 Crear estructura de carpetas y archivos base
- [ ] #5 Configurar TypeScript paths y aliases
- [ ] #6 Crear CLAUDE.md con convenciones del proyecto

---

### 🎨 **FASE 1: UI Foundation & Design System** (Milestone: UI Components)
**Objetivo:** Crear componentes UI reutilizables y layout base

**Status:** 🔴 No iniciado | **Estimación:** 2-3 días

- [ ] #7 Crear componentes UI base (Button, Card, Input, Modal)
- [ ] #8 Implementar layout principal y navegación
- [ ] #9 Diseñar y crear landing page
- [ ] #10 Crear página de setup del juego (configuración inicial)
- [ ] #11 Implementar diseño responsive para tablet/desktop

---

### 🎮 **FASE 2: Game Engine Core** (Milestone: Game Logic)
**Objetivo:** Implementar lógica central del juego sin persistencia

**Status:** 🔴 No iniciado | **Estimación:** 4-5 días

- [ ] #12 Crear tipos TypeScript para el juego
- [ ] #13 Implementar GameEngine (lógica de turnos, strikes, puntuación)
- [ ] #14 Crear Context/State management para el juego
- [ ] #15 Implementar sistema de scoring y multiplicadores
- [ ] #16 Crear hook useGameState con todas las acciones del juego
- [ ] #17 Implementar validaciones y reglas del juego

---

### 🖥️ **FASE 3: Game UI Components** (Milestone: Game Interface)
**Objetivo:** Crear interfaz visual del juego

**Status:** 🔴 No iniciado | **Estimación:** 3-4 días

- [ ] #18 Crear componente GameBoard (tablero principal)
- [ ] #19 Implementar QuestionDisplay (mostrar pregunta)
- [ ] #20 Crear AnswerCard (tarjetas de respuestas con reveal)
- [ ] #21 Implementar TeamScore (marcador de equipos)
- [ ] #22 Crear StrikeIndicator (indicador de strikes)
- [ ] #23 Implementar Timer componente (countdown opcional)
- [ ] #24 Crear controles del juego (botones de acción, navegación)

---

### 💾 **FASE 4: LocalStorage Mode** (Milestone: Offline Game)
**Objetivo:** Juego completamente funcional sin autenticación

**Status:** 🔴 No iniciado | **Estimación:** 2-3 días

- [ ] #25 Crear set de preguntas demo (data/demoQuestions.ts)
- [ ] #26 Implementar adaptador de localStorage
- [ ] #27 Crear hook useLocalStorage para persistencia
- [ ] #28 Implementar guardar/cargar estado del juego en localStorage
- [ ] #29 Conectar UI con localStorage (modo sin login)
- [ ] #30 Testing completo del flujo sin autenticación

---

### 🔐 **FASE 5: Authentication** (Milestone: User Auth)
**Objetivo:** Sistema de autenticación con Supabase

**Status:** 🔴 No iniciado | **Estimación:** 2-3 días

- [ ] #31 Configurar Supabase Auth (email/password)
- [ ] #32 Crear páginas de Login y Register
- [ ] #33 Implementar AuthContext y useAuth hook
- [ ] #34 Crear middleware de autenticación para rutas protegidas
- [ ] #35 Implementar página de Dashboard (usuario autenticado)
- [ ] #36 Crear manejo de sesiones y logout

---

### 🗄️ **FASE 6: Database Integration** (Milestone: Data Persistence)
**Objetivo:** Migrar a Supabase para usuarios autenticados

**Status:** 🔴 No iniciado | **Estimación:** 3-4 días

- [ ] #37 Ejecutar migraciones de Supabase (schema completo)
- [ ] #38 Configurar Row Level Security policies
- [ ] #39 Crear queries y funciones de Supabase (lib/supabase/queries.ts)
- [ ] #40 Implementar adaptador de Supabase storage
- [ ] #41 Crear sistema de abstracción (localStorage vs Supabase)
- [ ] #42 Testing de persistencia con Supabase

---

### ✏️ **FASE 7: CRUD de Preguntas** (Milestone: Question Management)
**Objetivo:** Sistema completo para crear y gestionar preguntas

**Status:** 🔴 No iniciado | **Estimación:** 4-5 días

- [ ] #43 Crear página "Mis Preguntas" (lista de sets)
- [ ] #44 Implementar QuestionSetEditor (crear/editar set)
- [ ] #45 Crear QuestionForm (añadir/editar pregunta individual)
- [ ] #46 Implementar gestión de respuestas (añadir, editar, eliminar)
- [ ] #47 Crear validaciones de preguntas (mínimo respuestas, puntos)
- [ ] #48 Implementar importar/exportar sets (JSON)
- [ ] #49 Crear previsualización de set antes de jugar

---

### 📊 **FASE 8: Game History & Stats** (Milestone: History)
**Objetivo:** Historial y estadísticas de partidas jugadas

**Status:** 🔴 No iniciado | **Estimación:** 3-4 días

- [ ] #50 Guardar partidas completadas en Supabase
- [ ] #51 Crear página de historial de partidas
- [ ] #52 Implementar detalle de partida (ver rondas jugadas)
- [ ] #53 Crear estadísticas generales (total juegos, win rate, etc.)
- [ ] #54 Implementar filtros y búsqueda en historial
- [ ] #55 Crear gráficos de estadísticas (opcional)

---

### ⚙️ **FASE 9: Game Features Avanzados** (Milestone: Advanced Features)
**Objetivo:** Timer, multiplicadores, y features adicionales

**Status:** 🔴 No iniciado | **Estimación:** 2-3 días

- [ ] #56 Implementar Timer funcional (countdown con alarma)
- [ ] #57 Integrar multiplicadores de puntos por ronda
- [ ] #58 Crear modo de ronda de desempate
- [ ] #59 Implementar pausa/reanudar partida
- [ ] #60 Agregar configuraciones avanzadas del juego
- [ ] #61 Crear sistema de hotkeys (teclado para revelar respuestas)

---

### 🎯 **FASE 10: Polish & Testing** (Milestone: Production Ready)
**Objetivo:** Refinamiento, testing y preparación para producción

**Status:** 🔴 No iniciado | **Estimación:** 3-4 días

- [ ] #62 Testing exhaustivo de todos los flujos
- [ ] #63 Corregir bugs identificados
- [ ] #64 Optimizar performance (loading, queries)
- [ ] #65 Implementar manejo de errores robusto
- [ ] #66 Agregar loading states y skeletons
- [ ] #67 Crear página 404 y error boundaries
- [ ] #68 Revisar accesibilidad (a11y basics)
- [ ] #69 Configurar variables de entorno para producción
- [ ] #70 Deploy inicial a Vercel

---

### 🚀 **FASE 11: Post-Launch Enhancements** (Milestone: V1.1)
**Objetivo:** Features adicionales post-MVP (nice-to-have)

**Status:** 🔴 No iniciado | **Estimación:** Variable

- [ ] #71 Agregar efectos de sonido (buzzers, celebraciones)
- [ ] #72 Implementar animaciones avanzadas (Framer Motion)
- [ ] #73 Crear modo oscuro (dark mode)
- [ ] #74 Implementar compartir sets de preguntas (públicos)
- [ ] #75 Agregar roles de usuario (admin, player, host)
- [ ] #76 Crear modo multi-pantalla (host + jugadores)
- [ ] #77 Implementar PWA (Progressive Web App)
- [ ] #78 Agregar internacionalización (i18n)

---

## Workflow de Desarrollo

### Proceso de Issues

1. **Selección de Issue:**
   - Trabajar en orden de fases/milestones
   - Verificar dependencias antes de empezar
   - Asignar issue a desarrollador (self-assign en GitHub)

2. **Desarrollo:**
   - Crear branch desde `main`: `feature/#<issue-number>-brief-description`
   - Commits descriptivos siguiendo convenciones (ver CLAUDE.md)
   - Testing local antes de push

3. **Pull Request:**
   - Título: `[#<issue-number>] Brief description`
   - Descripción incluye: qué se hizo, cómo probarlo, screenshots si aplica
   - Marcar issue como resuelto: `Closes #<issue-number>`

4. **Review:**
   - Usuario revisa código y funcionalidad
   - Solicitar cambios si es necesario
   - Aprobar cuando esté listo

5. **Merge:**
   - Merge a `main` (squash commits o merge commit según preferencia)
   - Eliminar branch feature
   - Cerrar issue automáticamente

### Branching Strategy

- **main:** Código de producción, siempre estable
- **feature/#X-name:** Features individuales (un issue = un branch)
- **hotfix/name:** Correcciones urgentes de producción

### Comunicación

- **Issues:** Para tracking de features y bugs
- **PR Comments:** Para discusiones de código
- **Commits:** Mensajes claros y descriptivos

---

## Dependencias Entre Issues

### Bloqueos Críticos

- **#7-11** (UI Components) → Bloquean **#18-24** (Game UI)
- **#12-17** (Game Engine) → Bloquean **#18-24** (Game UI)
- **#18-24** (Game UI) → Bloquean **#25-30** (LocalStorage Mode)
- **#31-36** (Auth) → Bloquean **#37-42** (Database)
- **#37-42** (Database) → Bloquean **#43-49** (CRUD Preguntas)
- **#37-42** (Database) → Bloquean **#50-55** (History)

### Trabajo en Paralelo Posible

- Fase 1 (UI) y Fase 2 (Engine) pueden trabajarse en paralelo parcialmente
- Fase 7 (CRUD) y Fase 8 (History) pueden desarrollarse en paralelo una vez Database está listo

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Complejidad del game state | Media | Alto | Usar state management robusto (Context + reducer), testing exhaustivo |
| Sincronización localStorage vs Supabase | Media | Medio | Crear abstracción clara, validaciones en ambos lados |
| Performance en carga de preguntas | Baja | Medio | Paginación, caching, optimización de queries |
| Bugs en sistema de scoring | Media | Alto | Unit tests para scoring, validaciones estrictas |
| UX confusa en modo "stealing" | Media | Medio | Prototipar flujo, testing con usuarios reales |

---

## Métricas de Progreso

### Por Fase
- **Fase 0:** 0/6 issues completados (0%)
- **Fase 1:** 0/5 issues completados (0%)
- **Fase 2:** 0/6 issues completados (0%)
- **Fase 3:** 0/7 issues completados (0%)
- **Fase 4:** 0/6 issues completados (0%)
- **Fase 5:** 0/6 issues completados (0%)
- **Fase 6:** 0/6 issues completados (0%)
- **Fase 7:** 0/7 issues completados (0%)
- **Fase 8:** 0/6 issues completados (0%)
- **Fase 9:** 0/6 issues completados (0%)
- **Fase 10:** 0/9 issues completados (0%)
- **Fase 11:** 0/8 issues completados (0%)

### Overall
**Progreso Total:** 0/78 issues (0%)

---

## Convenciones de Código

Ver archivo `CLAUDE.md` para detalles completos de:
- Estándares de código TypeScript
- Convenciones de naming
- Estructura de componentes
- Commits y PR guidelines
- Testing practices

---

## Próximos Pasos

1. ✅ Revisar y aprobar este plan
2. ⬜ Crear repositorio en GitHub
3. ⬜ Configurar milestones en GitHub
4. ⬜ Crear todos los issues (#1-#78) en GitHub
5. ⬜ Comenzar Fase 0: Setup inicial (#1-#6)

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-02-10 | Plan inicial creado | Product Planning Architect |

---

**Última actualización:** 2026-02-10
**Versión del plan:** 1.0.0
