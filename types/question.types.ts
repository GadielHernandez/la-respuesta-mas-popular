/**
 * Tipos TypeScript para preguntas, respuestas y sets de preguntas.
 * Estos tipos son compartidos entre el game engine y las vistas de gestión.
 */

// ─── Respuesta individual ────────────────────────────────────────────────────

/** Una respuesta dentro de una pregunta */
export interface Answer {
  /** UUID de la respuesta */
  id: string
  /** Texto de la respuesta */
  text: string
  /** Puntos que otorga esta respuesta */
  points: number
  /** Posición en el ranking (1 = la más popular) */
  orderIndex: number
}

// ─── Pregunta ────────────────────────────────────────────────────────────────

/** Una pregunta con sus respuestas encuestas */
export interface Question {
  /** UUID de la pregunta */
  id: string
  /** Texto de la pregunta que se lee en voz alta */
  text: string
  /** Lista de respuestas ordenadas por `orderIndex` */
  answers: Answer[]
  /** Multiplicador de puntos para esta pregunta (default 1) */
  multiplier?: number
}

// ─── Set de preguntas ────────────────────────────────────────────────────────

/** Colección de preguntas agrupadas bajo un tema o episodio */
export interface QuestionSet {
  /** UUID del set */
  id: string
  /** Título descriptivo del set */
  title: string
  /** Descripción opcional */
  description?: string
  /** Si el set es visible para todos los usuarios */
  isPublic: boolean
  /** Preguntas que contiene el set */
  questions: Question[]
  /** ID del usuario propietario (null si es demo/público) */
  userId: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Vista resumida de un set de preguntas, sin cargar todas las respuestas.
 * Útil para listar sets en el selector.
 */
export interface QuestionSetSummary {
  id: string
  title: string
  description?: string
  isPublic: boolean
  questionCount: number
  userId: string | null
  createdAt: string
  updatedAt: string
}
