/**
 * Game Engine — motor puro del juego "La Respuesta más Popular".
 *
 * Todas las funciones son puras: reciben un estado y devuelven un nuevo estado
 * sin mutar el original. Esto hace que cada transición sea predecible y
 * fácilmente testeable.
 *
 * Flujo de una ronda:
 *  1. [playing]  El equipo activo revela respuestas con `revealAnswer`.
 *  2. [playing]  Si responde mal, el moderador llama `addStrike`.
 *  3. [stealing] Al llegar a 3 strikes, la fase pasa a `stealing`.
 *  4. [stealing] El equipo contrario tiene un intento con `attemptSteal`.
 *  5. [playing]  Sea cual sea el resultado, se llama `nextQuestion` para
 *                avanzar (ya integrado dentro de `attemptSteal`).
 *  6. [finished] Cuando no quedan preguntas, la fase pasa a `finished`.
 */

import type { GameState, GameConfig, Team } from '@/types/game.types'
import type { Answer } from '@/types/question.types'

// ─── Helpers internos ────────────────────────────────────────────────────────

/** Devuelve el equipo contrario al indicado */
function opponent(team: Team): Team {
  return team === 'team1' ? 'team2' : 'team1'
}

/** Suma los puntos de las respuestas en los índices revelados */
function sumRevealedPoints(answers: Answer[], revealedIndices: number[]): number {
  return revealedIndices.reduce((sum, idx) => sum + (answers[idx]?.points ?? 0), 0)
}

/**
 * Agrega puntos al equipo indicado sin modificar el resto del estado.
 * Los puntos se multiplican por `state.multiplier`.
 */
function awardPoints(state: GameState, team: Team): GameState {
  const points = state.roundPoints * state.multiplier
  return {
    ...state,
    [team]: { ...state[team], score: state[team].score + points },
  }
}

/**
 * Avanza al estado de la siguiente pregunta (o termina el juego).
 * Alterna el equipo que empieza la siguiente ronda.
 * NO premia puntos — eso debe hacerse antes de llamar esta función.
 */
function advanceQuestion(state: GameState): GameState {
  const nextIndex = state.currentQuestionIndex + 1
  const isGameOver = nextIndex >= state.questions.length

  return {
    ...state,
    phase: isGameOver ? 'finished' : 'playing',
    currentQuestionIndex: isGameOver ? state.currentQuestionIndex : nextIndex,
    currentRound: isGameOver ? state.currentRound : state.currentRound + 1,
    activeTeam: opponent(state.activeTeam),
    strikes: 0,
    revealedAnswers: [],
    roundPoints: 0,
  }
}

// ─── Game Engine ─────────────────────────────────────────────────────────────

export const gameEngine = {
  /**
   * Crea un estado inicial de partida a partir de una configuración.
   * El equipo 1 siempre empieza la primera ronda.
   */
  createGame(config: GameConfig): GameState {
    return {
      id: crypto.randomUUID(),
      phase: 'playing',
      currentQuestionIndex: 0,
      currentRound: 1,
      totalRounds: config.totalRounds,
      team1: { name: config.team1Name, score: 0 },
      team2: { name: config.team2Name, score: 0 },
      activeTeam: 'team1',
      strikes: 0,
      revealedAnswers: [],
      roundPoints: 0,
      multiplier: 1,
      questions: config.questions,
    }
  },

  /**
   * Revela una respuesta correcta del equipo activo.
   *
   * - Acumula los puntos en `roundPoints`.
   * - Si la respuesta ya fue revelada o el juego no está en fase `playing`,
   *   devuelve el estado sin cambios.
   */
  revealAnswer(state: GameState, answerIndex: number): GameState {
    if (state.phase !== 'playing' && state.phase !== 'scored') return state
    if (state.revealedAnswers.includes(answerIndex)) return state

    const currentQuestion = state.questions[state.currentQuestionIndex]
    if (!currentQuestion) return state

    const answer = currentQuestion.answers[answerIndex]
    if (!answer) return state

    return {
      ...state,
      revealedAnswers: [...state.revealedAnswers, answerIndex],
      // En fase 'scored' los puntos ya fueron asignados — no sumar más al acumulado
      roundPoints: state.phase === 'playing' ? state.roundPoints + answer.points : state.roundPoints,
    }
  },

  /**
   * Registra un fallo (strike) del equipo activo.
   *
   * - Al llegar a 3 strikes, la fase pasa a `stealing` para que el equipo
   *   contrario tenga un intento de robo.
   * - Fuera de la fase `playing` no tiene efecto.
   */
  addStrike(state: GameState): GameState {
    if (state.phase !== 'playing') return state

    const newStrikes = state.strikes + 1

    return {
      ...state,
      strikes: newStrikes,
      phase: newStrikes >= 3 ? 'stealing' : 'playing',
    }
  },

  /**
   * Cambia manualmente el equipo activo y reinicia los strikes.
   * Útil para situaciones especiales o configuración inicial.
   */
  switchTeam(state: GameState): GameState {
    return {
      ...state,
      activeTeam: opponent(state.activeTeam),
      strikes: 0,
    }
  },

  /**
   * El equipo contrario intenta robar los puntos acumulados de la ronda.
   * Solo válido en fase `stealing`.
   *
   * - Si acierta: el equipo contrario gana los puntos y avanza la pregunta.
   * - Si falla: el equipo activo (original) gana los puntos y avanza.
   *
   * En ambos casos la ronda termina — `advanceQuestion` se llama internamente.
   */
  attemptSteal(state: GameState, answerIndex: number): GameState {
    if (state.phase !== 'stealing') return state

    const currentQuestion = state.questions[state.currentQuestionIndex]
    if (!currentQuestion) return state

    // Una respuesta es válida para robar si existe y no ha sido revelada aún
    const isCorrect =
      answerIndex >= 0 &&
      answerIndex < currentQuestion.answers.length &&
      !state.revealedAnswers.includes(answerIndex)

    // Revelar la respuesta si el robo fue correcto
    const stateWithReveal = isCorrect
      ? {
          ...state,
          revealedAnswers: [...state.revealedAnswers, answerIndex],
          roundPoints: state.roundPoints + (currentQuestion.answers[answerIndex]?.points ?? 0),
        }
      : state

    // El ganador: si acertó → equipo contrario; si falló → equipo activo original
    const winner: Team = isCorrect ? opponent(state.activeTeam) : state.activeTeam

    // Asignar puntos y pasar a 'scored': el moderador puede revelar respuestas
    // restantes (sin puntuar más) antes de avanzar con NEXT_QUESTION.
    return {
      ...awardPoints(stateWithReveal, winner),
      phase: 'scored',
    }
  },

  /**
   * Finaliza la ronda actual de forma normal (todas las respuestas reveladas
   * o el moderador decide avanzar).
   *
   * - Premia los `roundPoints * multiplier` al equipo activo.
   * - Reinicia el estado de ronda y avanza a la siguiente pregunta.
   * - Si era la última pregunta, la fase pasa a `finished`.
   */
  nextQuestion(state: GameState): GameState {
    // En 'scored' los puntos ya fueron asignados (vía attemptSteal) — solo avanzar
    if (state.phase === 'scored') return advanceQuestion(state)
    return advanceQuestion(awardPoints(state, state.activeTeam))
  },

  /**
   * Calcula la suma de puntos de las respuestas reveladas.
   * Útil para mostrar el marcador de ronda en la UI.
   */
  calculateRoundScore(answers: Answer[], revealedIndices: number[]): number {
    return sumRevealedPoints(answers, revealedIndices)
  },

  /**
   * Determina el equipo ganador de la partida según la puntuación total.
   * Devuelve `null` en caso de empate.
   */
  calculateRoundWinner(state: GameState): Team | null {
    if (state.team1.score > state.team2.score) return 'team1'
    if (state.team2.score > state.team1.score) return 'team2'
    return null
  },

  /**
   * Indica si el juego ha terminado.
   * Equivalente a `state.phase === 'finished'`.
   */
  checkGameEnd(state: GameState): boolean {
    return state.phase === 'finished'
  },
}
