'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { auth } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage(): React.ReactElement {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)

    // Validaciones client-side
    if (!email.includes('@')) {
      setError('Ingresa un email válido.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setIsLoading(true)
    const result = await auth.signIn(email, password)
    setIsLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen bg-game-config flex items-center justify-center p-4">

      {/* Spotlight sutil */}
      <div className="fixed inset-0 spotlight pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-md">

        {/* Marca */}
        <div className="text-center mb-8">
          <span className="material-symbols-outlined text-5xl text-primary mb-3 block">trophy</span>
          <h1 className="text-2xl font-black uppercase italic tracking-widest text-white">
            La Respuesta <span className="text-primary">más Popular</span>
          </h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Card del formulario */}
        <div className="bg-game-card border border-warm-border rounded-2xl p-8 shadow-2xl">

          <h2 className="text-lg font-black uppercase tracking-widest text-white mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Email */}
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="tu@email.com"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {/* Password — label personalizado con link "olvidaste" */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500"
                >
                  Contraseña
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[10px] font-bold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={isLoading}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 bg-danger-strike/10 border border-danger-strike/40 rounded-xl px-4 py-3"
              >
                <span className="material-symbols-outlined text-danger-strike text-base mt-0.5 shrink-0">
                  error
                </span>
                <p className="text-xs text-danger-strike font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              fullSized
              disabled={isLoading}
              className="mt-2 h-12"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">
                    progress_activity
                  </span>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">login</span>
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-warm-border" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">o</span>
            <div className="flex-1 h-px bg-warm-border" />
          </div>

          {/* Link a register */}
          <p className="text-center text-xs text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link
              href="/register"
              className="font-bold text-primary hover:text-primary-light transition-colors"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>

        {/* Jugar sin cuenta */}
        <p className="text-center mt-4 text-[10px] text-gray-600">
          ¿Solo quieres jugar?{' '}
          <Link
            href="/play"
            className="text-gray-400 font-bold hover:text-white transition-colors"
          >
            Jugar sin cuenta →
          </Link>
        </p>
      </div>
    </div>
  )
}
