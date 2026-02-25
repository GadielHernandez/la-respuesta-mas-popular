/**
 * Tipos TypeScript para el motor del juego "La Respuesta más Popular".
 * Todos los tipos son inmutables por convención — los reducers siempre
 * devuelven nuevas instancias.
 */

import type { Question } from './question.types'

// ─── Tipos primitivos ───────────────────────────────────────────────────────

/** Identificador de equipo */
export type Team = 'team1' | 'team2'

/**
 * Fases del juego:
 * - `setup`    → configuración antes de iniciar
 * - `playing`  → equipo activo respondiendo
 * - `stealing` → equipo contrario intenta robar puntos
 * - `scored`   → robo resuelto; se pueden revelar respuestas restantes sin puntuar
 * - `finished` → ronda o juego terminado
 */
export type GamePhase = 'setup' | 'playing' | 'stealing' | 'scored' | 'finished'

// ─── Interfaces de datos ────────────────────────────────────────────────────

/** Datos de un equipo en el estado del juego */
export interface TeamData {
  /** Nombre visible del equipo */
  name: string
  /** Puntuación acumulada */
  score: number
}

/**
 * Estado completo del juego en un momento dado.
 * Es la fuente de verdad para toda la lógica del game engine y el contexto.
 */
export interface GameState {
  /** UUID único de la partida */
  id: string
  /** Fase actual del juego */
  phase: GamePhase
  /** Índice (0-based) de la pregunta activa dentro de `questions` */
  currentQuestionIndex: number
  /** Número de ronda actual (1-based) */
  currentRound: number
  /** Número total de rondas configuradas */
  totalRounds: number
  /** Datos del equipo 1 */
  team1: TeamData
  /** Datos del equipo 2 */
  team2: TeamData
  /** Equipo que tiene el turno activo */
  activeTeam: Team
  /** Número de fallos en la ronda actual (máx. 3) */
  strikes: number
  /** Índices (0-based) de las respuestas ya reveladas en la pregunta actual */
  revealedAnswers: number[]
  /** Puntos acumulados en la ronda actual (antes de asignarse a un equipo) */
  roundPoints: number
  /** Multiplicador de puntos aplicado a la ronda actual */
  multiplier: number
  /** Lista de preguntas de la partida */
  questions: Question[]
}

/**
 * Configuración inicial para crear una nueva partida.
 * Se usa antes de construir el primer `GameState`.
 */
export interface GameConfig {
  /** Nombre del equipo 1 */
  team1Name: string
  /** Nombre del equipo 2 */
  team2Name: string
  /** Número total de rondas */
  totalRounds: number
  /** Preguntas que se jugarán */
  questions: Question[]
}

/** Resultado de una partida completada, listo para persistir */
export interface GameResult {
  id: string
  team1: TeamData
  team2: TeamData
  winner: Team | 'draw'
  totalRounds: number
  completedAt: string
  /** ID del set de preguntas usado */
  questionSetId: string
}

// ─── Acciones del reducer ───────────────────────────────────────────────────

/**
 * Union type de todas las acciones posibles del game context.
 * Cada acción corresponde a una transición de estado en el reducer.
 */
export type GameAction =
  | { type: 'REVEAL_ANSWER'; payload: number }
  | { type: 'ADD_STRIKE' }
  | { type: 'SWITCH_TEAM' }
  | { type: 'ATTEMPT_STEAL'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME'; payload?: GameConfig }
  | { type: 'RESTORE_GAME'; payload: GameState }
