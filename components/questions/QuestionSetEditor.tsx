'use client'

import { useState, useCallback } from 'react'

import type { Answer, Question, QuestionSet } from '@/types/question.types'

// ─── Tipos internos ───────────────────────────────────────────────────────────

export interface QuestionSetEditorProps {
  /** Datos iniciales del set (undefined = crear nuevo) */
  initialSet?: QuestionSet
  /** Callback al guardar — recibe el set construido en el editor */
  onSave: (set: QuestionSet) => Promise<void>
  /** Callback al cancelar */
  onCancel: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function newAnswer(orderIndex: number): Answer {
  return { id: crypto.randomUUID(), text: '', points: 0, orderIndex }
}

function newQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    text: '',
    multiplier: 1,
    answers: [newAnswer(0), newAnswer(1)],
  }
}

// ─── AnswerRow ────────────────────────────────────────────────────────────────

interface AnswerRowProps {
  answer: Answer
  index: number
  total: number
  onChange: (updated: Answer) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  answerError?: string
}

function AnswerRow({
  answer,
  index,
  total,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  answerError,
}: AnswerRowProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* Posición */}
        <span className="w-5 shrink-0 text-center text-[10px] font-black text-gray-600">
          {index + 1}
        </span>

        {/* Texto de la respuesta */}
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
          onChange={e => onChange({ ...answer, points: Math.max(0, parseInt(e.target.value, 10) || 0) })}
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
            aria-label="Mover arriba"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_drop_up</span>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-0.5 rounded text-gray-600 hover:text-gray-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            aria-label="Mover abajo"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_drop_down</span>
          </button>
        </div>

        {/* Eliminar */}
        <button
          type="button"
          onClick={onDelete}
          disabled={total <= 2}
          className="p-1.5 rounded-lg border border-transparent text-gray-600 hover:border-danger-strike/40 hover:text-danger-strike disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0"
          aria-label={`Eliminar respuesta ${index + 1}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">close</span>
        </button>
      </div>

      {answerError && (
        <p className="ml-7 text-[10px] text-danger-strike">{answerError}</p>
      )}
    </div>
  )
}

// ─── QuestionCard ─────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  onChange: (updated: Question) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  questionErrors: Record<string, string>
}

function QuestionCard({
  question,
  index,
  total,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  questionErrors,
}: QuestionCardProps): React.ReactElement {
  const updateAnswer = useCallback(
    (ai: number, updated: Answer) => {
      const answers = question.answers.map((a, i) => (i === ai ? updated : a))
      onChange({ ...question, answers })
    },
    [question, onChange]
  )

  const deleteAnswer = useCallback(
    (ai: number) => {
      const answers = question.answers.filter((_, i) => i !== ai).map((a, i) => ({ ...a, orderIndex: i }))
      onChange({ ...question, answers })
    },
    [question, onChange]
  )

  const moveAnswer = useCallback(
    (ai: number, dir: -1 | 1) => {
      const arr = [...question.answers]
      const bi = ai + dir
      if (bi < 0 || bi >= arr.length) return
      ;[arr[ai], arr[bi]] = [arr[bi], arr[ai]]
      onChange({ ...question, answers: arr.map((a, i) => ({ ...a, orderIndex: i })) })
    },
    [question, onChange]
  )

  const addAnswer = useCallback(() => {
    const answers = [...question.answers, newAnswer(question.answers.length)]
    onChange({ ...question, answers })
  }, [question, onChange])

  return (
    <div className="bg-game-card border border-warm-border rounded-2xl overflow-hidden">
      {/* ── Header de la pregunta ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-warm-border bg-game-panel">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 shrink-0">
          Pregunta {index + 1}
        </span>
        <div className="flex-1" />

        {/* Multiplicador */}
        <select
          value={question.multiplier ?? 1}
          onChange={e => onChange({ ...question, multiplier: parseInt(e.target.value, 10) })}
          className="rounded-lg border border-warm-border bg-game-board px-2 py-1 text-[11px] font-bold text-gray-300 focus:border-primary/60 focus:outline-none"
          aria-label="Multiplicador de puntos"
        >
          <option value={1}>×1</option>
          <option value={2}>×2</option>
          <option value={3}>×3</option>
        </select>

        {/* Reordenar pregunta */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 rounded-lg border border-warm-border text-gray-600 hover:text-gray-300 hover:border-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            aria-label="Mover pregunta arriba"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_upward</span>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1.5 rounded-lg border border-warm-border text-gray-600 hover:text-gray-300 hover:border-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            aria-label="Mover pregunta abajo"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_downward</span>
          </button>
        </div>

        {/* Eliminar pregunta */}
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg border border-transparent text-gray-600 hover:border-danger-strike/40 hover:text-danger-strike transition-colors"
          aria-label={`Eliminar pregunta ${index + 1}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">delete</span>
        </button>
      </div>

      {/* ── Cuerpo ──────────────────────────────────────────────────────── */}
      <div className="px-4 py-4 space-y-4">
        {/* Texto de la pregunta */}
        <div>
          <textarea
            value={question.text}
            onChange={e => onChange({ ...question, text: e.target.value })}
            placeholder="Escribe la pregunta aquí…"
            rows={2}
            className="w-full rounded-xl border border-warm-border bg-game-panel px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
            aria-label={`Texto de pregunta ${index + 1}`}
          />
          {questionErrors.text && (
            <p className="mt-1 text-[10px] text-danger-strike">{questionErrors.text}</p>
          )}
        </div>

        {/* Respuestas */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            Respuestas <span className="text-gray-600">(de mayor a menor popularidad)</span>
          </p>

          <div className="space-y-2">
            {question.answers.map((answer, ai) => (
              <AnswerRow
                key={answer.id}
                answer={answer}
                index={ai}
                total={question.answers.length}
                onChange={updated => updateAnswer(ai, updated)}
                onDelete={() => deleteAnswer(ai)}
                onMoveUp={() => moveAnswer(ai, -1)}
                onMoveDown={() => moveAnswer(ai, 1)}
                answerError={questionErrors[`answer_${ai}`]}
              />
            ))}
          </div>

          {questionErrors.answers && (
            <p className="mt-1 text-[10px] text-danger-strike">{questionErrors.answers}</p>
          )}

          <button
            type="button"
            onClick={addAnswer}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">add</span>
            Agregar respuesta
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── QuestionSetEditor ────────────────────────────────────────────────────────

export function QuestionSetEditor({
  initialSet,
  onSave,
  onCancel,
}: QuestionSetEditorProps): React.ReactElement {
  const isNew = !initialSet

  // ── Estado del formulario ────────────────────────────────────────────────
  const [title, setTitle] = useState(initialSet?.title ?? '')
  const [description, setDescription] = useState(initialSet?.description ?? '')
  const [isPublic, setIsPublic] = useState(initialSet?.isPublic ?? false)
  const [questions, setQuestions] = useState<Question[]>(
    initialSet?.questions.length ? initialSet.questions : [newQuestion()]
  )

  type FormErrors = {
    title?: string
    questions?: string
    questionErrors?: Record<string, Record<string, string>>
  }
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // ── Gestión de preguntas ─────────────────────────────────────────────────

  const updateQuestion = useCallback((qi: number, updated: Question) => {
    setQuestions(prev => prev.map((q, i) => (i === qi ? updated : q)))
  }, [])

  const deleteQuestion = useCallback((qi: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== qi))
  }, [])

  const moveQuestion = useCallback((qi: number, dir: -1 | 1) => {
    setQuestions(prev => {
      const arr = [...prev]
      const bi = qi + dir
      if (bi < 0 || bi >= arr.length) return prev
      ;[arr[qi], arr[bi]] = [arr[bi], arr[qi]]
      return arr
    })
  }, [])

  const addQuestion = useCallback(() => {
    setQuestions(prev => [...prev, newQuestion()])
  }, [])

  // ── Validación ───────────────────────────────────────────────────────────

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!title.trim()) {
      newErrors.title = 'El nombre del set es obligatorio'
    }

    if (questions.length === 0) {
      newErrors.questions = 'El set debe tener al menos una pregunta'
    }

    const questionErrors: Record<string, Record<string, string>> = {}

    questions.forEach((q, qi) => {
      const qErrors: Record<string, string> = {}

      if (!q.text.trim()) {
        qErrors.text = 'La pregunta no puede estar vacía'
      }

      if (q.answers.length < 2) {
        qErrors.answers = 'Cada pregunta debe tener al menos 2 respuestas'
      }

      q.answers.forEach((a, ai) => {
        if (!a.text.trim()) {
          qErrors[`answer_${ai}`] = 'El texto de la respuesta es obligatorio'
        } else if (a.points <= 0) {
          qErrors[`answer_${ai}`] = 'Los puntos deben ser mayores a 0'
        }
      })

      if (Object.keys(qErrors).length > 0) {
        questionErrors[qi] = qErrors
      }
    })

    if (Object.keys(questionErrors).length > 0) {
      newErrors.questionErrors = questionErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Guardar ──────────────────────────────────────────────────────────────

  const handleSave = async (): Promise<void> => {
    if (!validate()) return

    setIsSaving(true)
    setSaveError(null)

    const set: QuestionSet = {
      id: initialSet?.id ?? crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      isPublic,
      userId: initialSet?.userId ?? null,
      createdAt: initialSet?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: questions.map((q, qi) => ({
        ...q,
        text: q.text.trim(),
        answers: q.answers.map((a, ai) => ({ ...a, text: a.text.trim(), orderIndex: ai })),
        orderIndex: qi,
      })),
    }

    try {
      await onSave(set)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Error al guardar el set')
      setIsSaving(false)
    }
  }

  const questionErrors = errors.questionErrors ?? {}

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* ── Error de guardado ─────────────────────────────────────────────── */}
      {saveError && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-danger-strike/40 bg-danger-strike/10 text-sm text-red-400">
          <span className="material-symbols-outlined text-base shrink-0">error</span>
          {saveError}
        </div>
      )}

      {/* ── Información del set ───────────────────────────────────────────── */}
      <div className="bg-game-card border border-warm-border rounded-2xl p-5 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Información del set
        </p>

        {/* Nombre */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Nombre <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ej: Cultura General — Temporada 1"
            className="w-full rounded-xl border border-warm-border bg-game-panel px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          {errors.title && (
            <p className="mt-1 text-[10px] text-danger-strike">{errors.title}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Descripción <span className="text-gray-600 normal-case font-normal">(opcional)</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Breve descripción del set de preguntas…"
            rows={2}
            className="w-full rounded-xl border border-warm-border bg-game-panel px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        {/* Visibilidad */}
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Visibilidad pública
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">
              Los sets públicos son visibles para todos los usuarios
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isPublic}
            onClick={() => setIsPublic(p => !p)}
            className={`relative w-11 h-6 rounded-full border transition-colors shrink-0 ${
              isPublic
                ? 'bg-primary border-primary'
                : 'bg-game-panel border-warm-border'
            }`}
            aria-label="Toggle visibilidad pública"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                isPublic ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Preguntas ────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Preguntas ({questions.length})
          </p>
          {errors.questions && (
            <p className="text-[10px] text-danger-strike">{errors.questions}</p>
          )}
        </div>

        <div className="space-y-3">
          {questions.map((q, qi) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={qi}
              total={questions.length}
              onChange={updated => updateQuestion(qi, updated)}
              onDelete={() => deleteQuestion(qi)}
              onMoveUp={() => moveQuestion(qi, -1)}
              onMoveDown={() => moveQuestion(qi, 1)}
              questionErrors={questionErrors[qi] ?? {}}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-warm-border text-xs font-bold uppercase tracking-widest text-gray-500 hover:border-primary/40 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm leading-none">add</span>
          Agregar pregunta
        </button>
      </div>

      {/* ── Acciones ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pt-2 pb-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl border border-warm-border text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-gray-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-game-board text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(219,166,31,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              Guardando…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm leading-none">save</span>
              {isNew ? 'Crear set' : 'Guardar cambios'}
            </>
          )}
        </button>
      </div>

    </div>
  )
}
