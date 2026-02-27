'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'
import { useStorage } from '@/hooks/useStorage'
import { Modal } from '@/components/ui/Modal'
import type { QuestionSet } from '@/types/question.types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function EmptyState(): React.ReactElement {
  return (
    <div className="bg-game-card border border-warm-border rounded-2xl px-6 py-16 text-center">
      <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">quiz</span>
      <p className="text-sm font-bold text-white mb-1">Todavía no tienes sets de preguntas</p>
      <p className="text-xs text-gray-500 mb-6">
        Crea tu primer set para empezar a jugar con tus propias preguntas.
      </p>
      <Link
        href="/my-questions/new"
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        Crear primer set
      </Link>
    </div>
  )
}

interface SetCardProps {
  set: QuestionSet
  onDelete: () => void
}

function SetCard({ set, onDelete }: SetCardProps): React.ReactElement {
  return (
    <div className="bg-game-card border border-warm-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-warm-border-subtle transition-colors">

      {/* ── Info ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-bold text-white truncate">{set.title}</h2>
          {set.isPublic && (
            <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-bold uppercase tracking-widest text-primary">
              público
            </span>
          )}
        </div>

        {set.description && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{set.description}</p>
        )}

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <span className="material-symbols-outlined text-xs leading-none">quiz</span>
            {set.questions.length} {set.questions.length === 1 ? 'pregunta' : 'preguntas'}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <span className="material-symbols-outlined text-xs leading-none">calendar_today</span>
            {formatDate(set.createdAt)}
          </span>
        </div>
      </div>

      {/* ── Acciones ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Jugar con este set */}
        <Link
          href="/play"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-warm-border text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:border-primary/40 hover:text-primary transition-colors"
          aria-label={`Jugar con ${set.title}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">play_circle</span>
          <span className="hidden sm:inline">Jugar</span>
        </Link>

        {/* Editar */}
        <Link
          href={`/my-questions/${set.id}/edit`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-warm-border text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:border-primary/40 hover:text-primary transition-colors"
          aria-label={`Editar ${set.title}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">edit</span>
          <span className="hidden sm:inline">Editar</span>
        </Link>

        {/* Eliminar */}
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-warm-border text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:border-danger-strike/50 hover:text-danger-strike transition-colors"
          aria-label={`Eliminar ${set.title}`}
        >
          <span className="material-symbols-outlined text-sm leading-none">delete</span>
          <span className="hidden sm:inline">Eliminar</span>
        </button>
      </div>
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function MyQuestionsPage(): React.ReactElement {
  const { user, isLoading: authLoading } = useAuth()
  const storage = useStorage()

  const [sets, setSets] = useState<QuestionSet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<QuestionSet | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // ── Cargar sets ──────────────────────────────────────────────────────────

  const loadSets = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await storage.getQuestionSets(user?.id)
      setSets(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los sets')
    } finally {
      setIsLoading(false)
    }
  }, [storage, user?.id])

  useEffect(() => {
    if (!authLoading) {
      loadSets()
    }
  }, [authLoading, loadSets])

  // ── Eliminar set ─────────────────────────────────────────────────────────

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await storage.deleteQuestionSet(deleteTarget.id)
      setSets(prev => prev.filter(s => s.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el set')
    } finally {
      setIsDeleting(false)
    }
  }

  // ── Loading ──────────────────────────────────────────────────────────────

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-game-config flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-game-config">
      <div className="fixed inset-0 spotlight pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
              Gestión de contenido
            </p>
            <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
              Mis <span className="text-primary not-italic">Preguntas</span>
            </h1>
          </div>

          <Link
            href="/my-questions/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(219,166,31,0.15)] transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-sm leading-none">add</span>
            <span className="hidden sm:inline">Nuevo Set</span>
            <span className="sm:hidden">Nuevo</span>
          </Link>
        </div>

        {/* ── Stats rápidas ─────────────────────────────────────────────────── */}
        {sets.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-game-card border border-warm-border rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-white">{sets.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                Sets creados
              </p>
            </div>
            <div className="bg-game-card border border-warm-border rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-white">
                {sets.reduce((acc, s) => acc + s.questions.length, 0)}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                Preguntas totales
              </p>
            </div>
            <div className="hidden sm:block bg-game-card border border-warm-border rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-primary">
                {sets.filter(s => s.isPublic).length}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                Sets públicos
              </p>
            </div>
          </div>
        )}

        {/* ── Error ────────────────────────────────────────────────────────── */}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-danger-strike/40 bg-danger-strike/10 text-sm text-red-400">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            {error}
          </div>
        )}

        {/* ── Lista de sets ─────────────────────────────────────────────────── */}
        {sets.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {sets.map(set => (
              <SetCard
                key={set.id}
                set={set}
                onDelete={() => setDeleteTarget(set)}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── Modal de confirmación de eliminación ─────────────────────────────── */}
      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => { if (!isDeleting) setDeleteTarget(null) }}
        title="Eliminar Set"
        size="sm"
        dismissible={!isDeleting}
        footer={
          <div className="flex justify-end gap-3 w-full">
            <button
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl border border-warm-border text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-gray-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-danger-strike/50 bg-danger-strike/10 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-danger-strike/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-sm">delete</span>
              )}
              Eliminar
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-400">
          ¿Estás seguro de que deseas eliminar{' '}
          <span className="text-white font-bold">&ldquo;{deleteTarget?.title}&rdquo;</span>?
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Esta acción es irreversible. Se eliminarán todas las preguntas y respuestas asociadas.
        </p>
      </Modal>
    </div>
  )
}
