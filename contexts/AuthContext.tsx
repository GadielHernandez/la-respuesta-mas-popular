'use client'

/**
 * AuthContext — estado global de autenticación vía React Context.
 *
 * Maneja el ciclo de vida de la sesión de Supabase:
 * - Carga inicial: verifica si hay sesión activa (getSession)
 * - Suscripción reactiva: actualiza el estado en cada cambio de auth
 *   (login, logout, refresh de token, cambio de tab)
 * - SSR compatible: la sesión se persiste en cookies via @supabase/ssr
 *
 * Uso básico:
 *   // En un componente:
 *   const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()
 *
 * El provider debe envolver la app desde `app/providers.tsx` para que
 * todos los componentes tengan acceso al estado de auth.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { Session, User } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/client'
import { auth as authLib } from '@/lib/supabase/auth'

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface AuthContextType {
  /** Usuario autenticado actual, `null` si no hay sesión */
  user: User | null
  /** Sesión completa de Supabase (incluye tokens), `null` si no autenticado */
  session: Session | null
  /** `true` mientras se verifica la sesión inicial (evita flashes de UI) */
  isLoading: boolean
  /** `true` cuando hay usuario autenticado */
  isAuthenticated: boolean
  /** Inicia sesión con email y contraseña. Retorna mensaje de error o `null`. */
  signIn: (email: string, password: string) => Promise<string | null>
  /** Registra un nuevo usuario. Retorna mensaje de error o `null`. */
  signUp: (email: string, password: string) => Promise<string | null>
  /** Cierra la sesión del usuario actual. Retorna mensaje de error o `null`. */
  signOut: () => Promise<string | null>
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Provee el estado de autenticación a toda la aplicación.
 *
 * Debe incluirse en `app/providers.tsx` para disponibilidad global:
 * ```tsx
 * export function Providers({ children }) {
 *   return (
 *     <AuthProvider>
 *       <ThemeProvider ...>{children}</ThemeProvider>
 *     </AuthProvider>
 *   )
 * }
 * ```
 */
export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ── Inicialización: cargar sesión activa al montar ─────────────────────────

  useEffect(() => {
    const supabase = createClient()

    // Obtener sesión guardada en cookies (SSR-safe)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    })

    // Suscribirse a cambios de auth state (login, logout, refresh token)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      // Una vez que llega el primer evento, ya no estamos cargando
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ── Acciones de auth ───────────────────────────────────────────────────────

  const signIn = useCallback(async (email: string, password: string): Promise<string | null> => {
    const result = await authLib.signIn(email, password)
    if (result.error) return result.error
    // El estado se actualiza automáticamente via onAuthStateChange
    return null
  }, [])

  const signUp = useCallback(async (email: string, password: string): Promise<string | null> => {
    const result = await authLib.signUp(email, password)
    if (result.error) return result.error
    return null
  }, [])

  const signOut = useCallback(async (): Promise<string | null> => {
    const error = await authLib.signOut()
    // El estado se actualiza automáticamente via onAuthStateChange
    return error
  }, [])

  // ── Valor del contexto ─────────────────────────────────────────────────────

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: user !== null,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook para acceder al estado y acciones de autenticación.
 * Debe usarse dentro de un componente envuelto por `AuthProvider`.
 *
 * @throws Error si se usa fuera de un `AuthProvider`
 *
 * @example
 * const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
