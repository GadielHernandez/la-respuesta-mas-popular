import type { QuestionSet } from '@/types/question.types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface QuestionSetPreviewProps {
  set: QuestionSet
}

// ─── QuestionSetPreview ───────────────────────────────────────────────────────

/**
 * Muestra la información completa de un set de preguntas sin revelar las
 * respuestas (para no arruinar la sorpresa antes del juego).
 *
 * Diseñado para usarse dentro de un Modal.
 */
export function QuestionSetPreview({ set }: QuestionSetPreviewProps): React.ReactElement {
  const totalAnswers = set.questions.reduce((acc, q) => acc + q.answers.length, 0)

  return (
    <div className="space-y-5">

      {/* ── Cabecera del set ─────────────────────────────────────────────── */}
      <div className="bg-game-panel border border-warm-border rounded-xl p-4 space-y-3">

        {/* Badges de metadata */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-game-card border border-warm-border text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-xs leading-none">quiz</span>
            {set.questions.length} {set.questions.length === 1 ? 'pregunta' : 'preguntas'}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-game-card border border-warm-border text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-xs leading-none">help</span>
            {totalAnswers} {totalAnswers === 1 ? 'respuesta' : 'respuestas'}
          </span>

          {set.isPublic ? (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
              <span className="material-symbols-outlined text-xs leading-none">public</span>
              Público
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-game-card border border-warm-border text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="material-symbols-outlined text-xs leading-none">lock</span>
              Privado
            </span>
          )}
        </div>

        {/* Descripción */}
        {set.description && (
          <p className="text-sm text-gray-400 leading-relaxed">{set.description}</p>
        )}

        {/* Fecha */}
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <span className="material-symbols-outlined text-xs leading-none">calendar_today</span>
          Creado el {formatDate(set.createdAt)}
        </p>
      </div>

      {/* ── Lista de preguntas ────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
          Preguntas
        </p>

        {set.questions.length === 0 ? (
          <div className="bg-game-panel border border-warm-border rounded-xl px-4 py-8 text-center">
            <span className="material-symbols-outlined text-3xl text-gray-700 block mb-2">quiz</span>
            <p className="text-xs text-gray-600">Este set no tiene preguntas todavía</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {set.questions.map((question, index) => (
              <div
                key={question.id}
                className="flex items-start gap-3 bg-game-panel border border-warm-border rounded-xl px-4 py-3"
              >
                {/* Número */}
                <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-game-card border border-warm-border text-[10px] font-black text-gray-500 mt-0.5">
                  {index + 1}
                </span>

                {/* Texto de la pregunta */}
                <p className="flex-1 text-sm text-gray-300 leading-snug">{question.text}</p>

                {/* Multiplicador (solo si > 1) */}
                {(question.multiplier ?? 1) > 1 && (
                  <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black text-primary leading-none mt-0.5">
                    ×{question.multiplier}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
