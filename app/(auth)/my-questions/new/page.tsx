'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'
import { useStorage } from '@/hooks/useStorage'
import { QuestionSetEditor } from '@/components/questions/QuestionSetEditor'
import type { QuestionSet } from '@/types/question.types'

export default function NewQuestionSetPage(): React.ReactElement {
  const router = useRouter()
  const { user } = useAuth()
  const storage = useStorage()

  const handleSave = async (set: QuestionSet): Promise<void> => {
    const setWithUser: QuestionSet = { ...set, userId: user?.id ?? null }
    await storage.saveQuestionSet(setWithUser, user?.id)
    router.push('/my-questions')
  }

  return (
    <div className="min-h-screen bg-game-config">
      <div className="fixed inset-0 spotlight pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <Link
            href="/my-questions"
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_back</span>
            Mis Preguntas
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
            Nuevo set
          </p>
          <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
            Crear <span className="text-primary not-italic">Set</span>
          </h1>
        </div>

        <QuestionSetEditor
          onSave={handleSave}
          onCancel={() => router.push('/my-questions')}
        />
      </div>
    </div>
  )
}
