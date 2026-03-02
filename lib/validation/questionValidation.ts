import type { Answer, Question, QuestionSet } from '@/types/question.types'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const MIN_ANSWERS = 2
const MAX_ANSWERS = 8

// ─── Validaciones ─────────────────────────────────────────────────────────────

export const questionValidation = {
  /**
   * Valida una respuesta individual.
   * Reglas:
   * - Texto no vacío
   * - Puntos mayores a 0
   */
  validateAnswer(answer: Answer): ValidationResult {
    const errors: string[] = []

    if (!answer.text.trim()) {
      errors.push('El texto de la respuesta es obligatorio')
    }

    if (answer.points <= 0) {
      errors.push('Los puntos deben ser mayores a 0')
    }

    return { isValid: errors.length === 0, errors }
  },

  /**
   * Valida una pregunta completa con sus respuestas.
   * Reglas:
   * - Texto no vacío
   * - Entre 2 y 8 respuestas
   * - Sin respuestas con texto duplicado
   * - Cada respuesta debe ser válida
   */
  validateQuestion(question: Question): ValidationResult {
    const errors: string[] = []

    // Validar texto de la pregunta
    if (!question.text.trim()) {
      errors.push('La pregunta no puede estar vacía')
    }

    // Validar número de respuestas
    if (question.answers.length < MIN_ANSWERS) {
      errors.push(`La pregunta debe tener al menos ${MIN_ANSWERS} respuestas`)
    } else if (question.answers.length > MAX_ANSWERS) {
      errors.push(`La pregunta no puede tener más de ${MAX_ANSWERS} respuestas`)
    } else {
      // Validar duplicados (solo si el conteo es válido)
      const texts = question.answers
        .map(a => a.text.trim().toLowerCase())
        .filter(t => t.length > 0)
      if (texts.length !== new Set(texts).size) {
        errors.push('Hay respuestas con texto duplicado')
      }
    }

    // Validar cada respuesta individualmente
    question.answers.forEach((answer, i) => {
      const result = questionValidation.validateAnswer(answer)
      result.errors.forEach(err => {
        errors.push(`Respuesta ${i + 1}: ${err}`)
      })
    })

    return { isValid: errors.length === 0, errors }
  },

  /**
   * Valida un set de preguntas completo.
   * Reglas:
   * - Título no vacío
   * - Al menos 1 pregunta
   * - Cada pregunta debe ser válida
   */
  validateQuestionSet(set: QuestionSet): ValidationResult {
    const errors: string[] = []

    if (!set.title.trim()) {
      errors.push('El nombre del set es obligatorio')
    }

    if (set.questions.length === 0) {
      errors.push('El set debe tener al menos una pregunta')
    }

    set.questions.forEach((question, i) => {
      const result = questionValidation.validateQuestion(question)
      if (!result.isValid) {
        errors.push(`Pregunta ${i + 1}: ${result.errors[0]}`)
      }
    })

    return { isValid: errors.length === 0, errors }
  },
}
