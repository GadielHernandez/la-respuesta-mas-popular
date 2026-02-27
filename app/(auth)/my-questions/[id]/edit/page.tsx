'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'
import { useStorage } from '@/hooks/useStorage'
import { QuestionSetEditor } from '@/components/questions/QuestionSetEditor'
import type { QuestionSet } from '@/types/question.types'

export default function EditQuestionSetPage(): React.ReactElement {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const { user, isLoading: authLoading } = useAuth()
  const storage = useStorage()

  const [set, setSet] = useState<QuestionSet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  // ── Cargar el set al montar ──────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return

    const load = async (): Promise<void> => {
      setIsLoading(true)
      setLoadError(null)
      try {
        const sets = await storage.getQuestionSets(user?.id)
        const found = sets.find(s => s.id === params.id)
        if (!found) {
          setLoadError('Set no encontrado')
        } else {
          setSet(found)
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Error al cargar el set')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [authLoading, storage, user?.id, params.id])

  const handleSave = async (updated: QuestionSet): Promise<void> => {
    await storage.saveQuestionSet(updated, user?.id)
    router.push('/my-questions')
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

  // ── Error de carga ───────────────────────────────────────────────────────
  if (loadError || !set) {
    return (
      <div className="min-h-screen bg-game-config flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-gray-700 mb-4 block">
            error
          </span>
          <p className="text-sm text-gray-400 mb-4">{loadError ?? 'Set no encontrado'}</p>
          <Link
            href="/my-questions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-light transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_back</span>
            Volver a Mis Preguntas
          </Link>
        </div>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-game-config">
      <div className="fixed inset-0 spotlight pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="mb-8">
          <Link
            href="/my-questions"
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_back</span>
            Mis Preguntas
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
            Editar set
          </p>
          <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
            Editar <span className="text-primary not-italic">{set.title}</span>
          </h1>
        </div>

        <QuestionSetEditor
          initialSet={set}
          onSave={handleSave}
          onCancel={() => router.push('/my-questions')}
        />
      </div>
    </div>
  )
}
