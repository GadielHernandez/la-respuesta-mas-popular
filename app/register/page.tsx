'use client'

import { useState } from 'react'
import Link from 'next/link'

import { auth } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function RegisterPage(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
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
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setIsLoading(true)
    const result = await auth.signUp(email, password)
    setIsLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setSuccess(true)
  }

  // Pantalla de éxito — confirmar email
  if (success) {
    return (
      <div className="min-h-screen bg-game-config flex items-center justify-center p-4">
        <div className="fixed inset-0 spotlight pointer-events-none opacity-40" />

        <div className="relative z-10 w-full max-w-md text-center">
          <span className="material-symbols-outlined text-6xl text-primary mb-4 block">
            mark_email_read
          </span>
          <h1 className="text-2xl font-black uppercase italic tracking-widest text-white mb-2">
            ¡Revisa tu email!
          </h1>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Enviamos un enlace de confirmación a{' '}
            <span className="text-primary font-bold">{email}</span>.
            <br />
            Haz clic en el enlace para activar tu cuenta.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-game-card border border-warm-border text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white hover:border-primary/50 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Volver al Login
          </Link>
        </div>
      </div>
    )
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
            Crea tu cuenta gratuita
          </p>
        </div>

        {/* Card del formulario */}
        <div className="bg-game-card border border-warm-border rounded-2xl p-8 shadow-2xl">

          <h2 className="text-lg font-black uppercase tracking-widest text-white mb-6">
            Crear Cuenta
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

            {/* Password */}
            <Input
              id="password"
              type="password"
              label="Contraseña"
              helperText="mín. 8 caracteres"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {/* Confirmar password */}
            <Input
              id="passwordConfirm"
              type="password"
              label="Confirmar Contraseña"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />

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
                  Creando cuenta...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">person_add</span>
                  Crear Cuenta
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

          {/* Link a login */}
          <p className="text-center text-xs text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-light transition-colors"
            >
              Inicia sesión
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
