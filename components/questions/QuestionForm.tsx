'use client'

import { useState, useCallback } from 'react'

import type { Answer, Question } from '@/types/question.types'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface QuestionFormProps {
  /** Pregunta inicial para editar (undefined = crear nueva) */
  initialQuestion?: Question
  /** Callback al guardar — recibe la pregunta validada */
  onSave: (question: Question) => void
  /** Callback al cancelar */
  onCancel: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function newAnswer(orderIndex: number): Answer {
  return { id: crypto.randomUUID(), text: '', points: 0, orderIndex }
}

function buildInitialAnswers(initial?: Question): Answer[] {
  if (initial?.answers.length) return initial.answers
  return [newAnswer(0), newAnswer(1)]
}

// ─── AnswerRow ────────────────────────────────────────────────────────────────

interface AnswerRowProps {
  answer: Answer
  index: number
  total: number
  canDelete: boolean
  error?: string
  onChange: (updated: Answer) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function AnswerRow({
  answer,
  index,
  total,
  canDelete,
  error,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}: AnswerRowProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* Número de posición */}
        <span className="w-5 shrink-0 text-center text-[10px] font-black text-gray-600">
          {index + 1}
        </span>

        {/* Texto */}
        <input
          type="text"
          value={answer.text}
          onChange={e => onChange({ ...answer, text: e.target.value })}
          placeholder={`Respuesta ${index + 1}`}
          className="flex-1 min-w-0 rounded-lg border border-warm-border bg-game-panel px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
          aria-label={`Texto de respuesta ${index + 1}`}
        />

        {/* Puntos */}
        <input
          type="number"
          value={answer.points === 0 ? '' : answer.points}
          onChange={e =>
            onChange({ ...answer, points: Math.max(0, parseInt(e.target.value, 10) || 0) })
          }
          placeholder="Pts"
          min={1}
          className="w-16 shrink-0 rounded-lg border border-warm-border bg-game-panel px-2 py-2 text-sm text-white placeholder-gray-600 text-center focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
          aria-label={`Puntos de respuesta ${index + 1}`}
        />

        {/* Reordenar */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-0.5 rounded text-gray-600 hover:text-gray-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            aria-label={`Mover respuesta ${index + 1} arriba`}
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_drop_up</span>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-0.5 rounded text-gray-600 hover:text-gray-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            aria-label={`Mover respuesta ${index + 1} abajo`}
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_drop_down</span>
          </button>
        </div>

        {/* Eliminar */}
        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          className="p-1.5 rounded-lg border border-transparent text-gray-600 hover:border-danger-strike/40 hover:text-danger-strike disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0"
          aria-label={`Eliminar respuesta ${index + 1}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">close</span>
        </button>
      </div>

      {error && <p className="ml-7 text-[10px] text-danger-strike">{error}</p>}
    </div>
  )
}

// ─── QuestionForm ─────────────────────────────────────────────────────────────

/**
 * Formulario standalone para crear o editar una pregunta individual con sus
 * respuestas. Gestiona su propio estado y valida antes de llamar a `onSave`.
 *
 * Uso en modal:
 * ```tsx
 * <QuestionForm
 *   initialQuestion={editingQuestion}
 *   onSave={q => handleSave(q)}
 *   onCancel={() => setEditing(null)}
 * />
 * ```
 */
export function QuestionForm({
  initialQuestion,
  onSave,
  onCancel,
}: QuestionFormProps): React.ReactElement {
  const isNew = !initialQuestion

  // ── Estado ───────────────────────────────────────────────────────────────
  const [text, setText] = useState(initialQuestion?.text ?? '')
  const [multiplier, setMultiplier] = useState<1 | 2 | 3>(
    (initialQuestion?.multiplier as 1 | 2 | 3) ?? 1
  )
  const [answers, setAnswers] = useState<Answer[]>(buildInitialAnswers(initialQuestion))
  const [errors, setErrors] = useState<{ text?: string; answers?: string; answerRows?: Record<number, string> }>({})

  // ── Gestión de respuestas ─────────────────────────────────────────────────

  const updateAnswer = useCallback((i: number, updated: Answer) => {
    setAnswers(prev => prev.map((a, idx) => (idx === i ? updated : a)))
  }, [])

  const deleteAnswer = useCallback((i: number) => {
    setAnswers(prev =>
      prev.filter((_, idx) => idx !== i).map((a, idx) => ({ ...a, orderIndex: idx }))
    )
  }, [])

  const moveAnswer = useCallback((i: number, dir: -1 | 1) => {
    setAnswers(prev => {
      const arr = [...prev]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return arr.map((a, idx) => ({ ...a, orderIndex: idx }))
    })
  }, [])

  const addAnswer = useCallback(() => {
    setAnswers(prev => [...prev, newAnswer(prev.length)])
  }, [])

  // ── Validación ────────────────────────────────────────────────────────────

  function validate(): boolean {
    const newErrors: typeof errors = {}
    const answerRowErrors: Record<number, string> = {}

    if (!text.trim()) {
      newErrors.text = 'La pregunta no puede estar vacía'
    }

    if (answers.length < 2) {
      newErrors.answers = 'Añade al menos 2 respuestas'
    }

    answers.forEach((a, i) => {
      if (!a.text.trim()) {
        answerRowErrors[i] = 'El texto de la respuesta es obligatorio'
      } else if (a.points <= 0) {
        answerRowErrors[i] = 'Los puntos deben ser mayores a 0'
      }
    })

    if (Object.keys(answerRowErrors).length > 0) {
      newErrors.answerRows = answerRowErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Guardar ───────────────────────────────────────────────────────────────

  const handleSave = (): void => {
    if (!validate()) return

    const question: Question = {
      id: initialQuestion?.id ?? crypto.randomUUID(),
      text: text.trim(),
      multiplier,
      answers: answers.map((a, i) => ({ ...a, text: a.text.trim(), orderIndex: i })),
    }

    onSave(question)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">

      {/* ── Texto de la pregunta ─────────────────────────────────────────── */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
          Pregunta <span className="text-primary">*</span>
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe la pregunta aquí…"
          rows={3}
          className="w-full rounded-xl border border-warm-border bg-game-panel px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
          aria-label="Texto de la pregunta"
        />
        {errors.text && (
          <p className="mt-1 text-[10px] text-danger-strike">{errors.text}</p>
        )}
      </div>

      {/* ── Multiplicador ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 shrink-0">
          Multiplicador
        </label>
        <div className="flex gap-2">
          {([1, 2, 3] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMultiplier(m)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase tracking-widest transition-colors ${
                multiplier === m
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-warm-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
              aria-pressed={multiplier === m}
              aria-label={`Multiplicador ×${m}`}
            >
              ×{m}
            </button>
          ))}
        </div>
      </div>

      {/* ── Respuestas ───────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Respuestas{' '}
            <span className="text-gray-600 normal-case font-normal">
              (de mayor a menor popularidad)
            </span>
          </label>
          <span className="text-[10px] text-gray-600">{answers.length} / 8</span>
        </div>

        <div className="space-y-2">
          {answers.map((answer, i) => (
            <AnswerRow
              key={answer.id}
              answer={answer}
              index={i}
              total={answers.length}
              canDelete={answers.length > 2}
              error={errors.answerRows?.[i]}
              onChange={updated => updateAnswer(i, updated)}
              onDelete={() => deleteAnswer(i)}
              onMoveUp={() => moveAnswer(i, -1)}
              onMoveDown={() => moveAnswer(i, 1)}
            />
          ))}
        </div>

        {errors.answers && (
          <p className="mt-1 text-[10px] text-danger-strike">{errors.answers}</p>
        )}

        {answers.length < 8 && (
          <button
            type="button"
            onClick={addAnswer}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">add</span>
            Agregar respuesta
          </button>
        )}
      </div>

      {/* ── Acciones ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-warm-border text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-game-board text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(219,166,31,0.2)]"
        >
          <span className="material-symbols-outlined text-sm leading-none">
            {isNew ? 'add' : 'save'}
          </span>
          {isNew ? 'Añadir pregunta' : 'Guardar cambios'}
        </button>
      </div>

    </div>
  )
}
