/**
 * importExport — Utilidades para exportar e importar sets de preguntas como JSON.
 *
 * Formato de exportación:
 * {
 *   "name": "Nombre del Set",
 *   "description": "Descripción",
 *   "questions": [
 *     {
 *       "questionText": "Pregunta?",
 *       "answers": [{ "text": "Respuesta", "points": 50 }],
 *       "multiplier": 1
 *     }
 *   ]
 * }
 */

import type { Answer, Question, QuestionSet } from '@/types/question.types'

// ─── Tipos del formato JSON ───────────────────────────────────────────────────

interface ExportedAnswer {
  text: string
  points: number
}

interface ExportedQuestion {
  questionText: string
  answers: ExportedAnswer[]
  multiplier: number
}

interface ExportedQuestionSet {
  name: string
  description?: string
  questions: ExportedQuestion[]
}

// ─── Exportar ─────────────────────────────────────────────────────────────────

/**
 * Convierte un QuestionSet al formato de exportación JSON y lo descarga
 * como archivo `.json` en el navegador.
 */
export function exportSetToJSON(set: QuestionSet): void {
  const exported: ExportedQuestionSet = {
    name: set.title,
    ...(set.description ? { description: set.description } : {}),
    questions: set.questions.map(q => ({
      questionText: q.text,
      answers: q.answers.map(a => ({ text: a.text, points: a.points })),
      multiplier: q.multiplier ?? 1,
    })),
  }

  const json = JSON.stringify(exported, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${set.title.replace(/\s+/g, '_')}.json`
  anchor.click()

  URL.revokeObjectURL(url)
}

// ─── Importar ─────────────────────────────────────────────────────────────────

/**
 * Parsea y valida un string JSON con el formato de exportación.
 * Retorna un nuevo QuestionSet con IDs generados.
 *
 * @throws Error con mensaje descriptivo si el JSON es inválido o falta estructura
 */
export function parseImportedSet(jsonString: string): QuestionSet {
  let parsed: unknown

  try {
    parsed = JSON.parse(jsonString)
  } catch {
    throw new Error('El archivo no es un JSON válido')
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('El archivo no tiene el formato correcto')
  }

  const data = parsed as Record<string, unknown>

  // Validar nombre del set
  if (typeof data.name !== 'string' || !data.name.trim()) {
    throw new Error('El set debe tener un nombre (campo "name")')
  }

  // Validar array de preguntas
  if (!Array.isArray(data.questions)) {
    throw new Error('El set debe tener un campo "questions" con un array')
  }

  if (data.questions.length === 0) {
    throw new Error('El set debe tener al menos una pregunta')
  }

  // Parsear preguntas
  const questions: Question[] = data.questions.map((rawQuestion: unknown, qi: number) => {
    const label = `Pregunta ${qi + 1}`

    if (typeof rawQuestion !== 'object' || rawQuestion === null) {
      throw new Error(`${label}: formato inválido`)
    }

    const q = rawQuestion as Record<string, unknown>

    if (typeof q.questionText !== 'string' || !q.questionText.trim()) {
      throw new Error(`${label}: falta el texto de la pregunta (campo "questionText")`)
    }

    if (!Array.isArray(q.answers)) {
      throw new Error(`${label}: falta el campo "answers"`)
    }

    if (q.answers.length < 2) {
      throw new Error(`${label}: debe tener al menos 2 respuestas`)
    }

    if (q.answers.length > 8) {
      throw new Error(`${label}: no puede tener más de 8 respuestas`)
    }

    // Validar duplicados
    const answerTexts = (q.answers as unknown[])
      .map((a: unknown) => {
        if (typeof a === 'object' && a !== null && 'text' in a) {
          return String((a as Record<string, unknown>).text).trim().toLowerCase()
        }
        return ''
      })
      .filter(t => t.length > 0)

    if (answerTexts.length !== new Set(answerTexts).size) {
      throw new Error(`${label}: hay respuestas con texto duplicado`)
    }

    // Parsear respuestas
    const answers: Answer[] = (q.answers as unknown[]).map((rawAnswer: unknown, ai: number) => {
      const answerLabel = `${label}, respuesta ${ai + 1}`

      if (typeof rawAnswer !== 'object' || rawAnswer === null) {
        throw new Error(`${answerLabel}: formato inválido`)
      }

      const a = rawAnswer as Record<string, unknown>

      if (typeof a.text !== 'string' || !a.text.trim()) {
        throw new Error(`${answerLabel}: falta el texto (campo "text")`)
      }

      if (typeof a.points !== 'number' || !Number.isFinite(a.points) || a.points <= 0) {
        throw new Error(`${answerLabel}: los puntos deben ser un número mayor a 0`)
      }

      return {
        id: crypto.randomUUID(),
        text: a.text.trim(),
        points: a.points,
        orderIndex: ai,
      }
    })

    const multiplier = typeof q.multiplier === 'number' && [1, 2, 3].includes(q.multiplier)
      ? (q.multiplier as 1 | 2 | 3)
      : 1

    return {
      id: crypto.randomUUID(),
      text: q.questionText.trim(),
      answers,
      multiplier,
    }
  })

  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: data.name.trim(),
    description:
      typeof data.description === 'string' && data.description.trim()
        ? data.description.trim()
        : undefined,
    isPublic: false,
    userId: null,
    questions,
    createdAt: now,
    updatedAt: now,
  }
}
