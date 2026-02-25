/**
 * Funciones de autenticación con Supabase (email / password).
 *
 * Todas las operaciones son del lado del cliente — usan `createClient()`
 * del browser client. Los errores de Supabase se propagan al llamador
 * para que la UI los muestre apropiadamente.
 */

import { createClient } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

// ─── Tipos de retorno ────────────────────────────────────────────────────────

export interface AuthResult {
  user: User | null
  session: Session | null
  error: string | null
}

// ─── Funciones de auth ────────────────────────────────────────────────────────

export const auth = {
  /**
   * Registra un nuevo usuario con email y contraseña.
   * Supabase envía un email de confirmación si está configurado.
   */
  async signUp(email: string, password: string): Promise<AuthResult> {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })
    return {
      user: data.user,
      session: data.session,
      error: error?.message ?? null,
    }
  },

  /**
   * Inicia sesión con email y contraseña.
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return {
      user: data.user,
      session: data.session,
      error: error?.message ?? null,
    }
  },

  /**
   * Cierra la sesión del usuario actual.
   * Retorna `null` si fue exitoso, o el mensaje de error.
   */
  async signOut(): Promise<string | null> {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return error?.message ?? null
  },

  /**
   * Envía un email de recuperación de contraseña.
   * `redirectTo` debe apuntar a la página donde el usuario ingresa la nueva contraseña.
   */
  async resetPassword(email: string, redirectTo?: string): Promise<string | null> {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo ?? `${window.location.origin}/auth/reset-password`,
    })
    return error?.message ?? null
  },

  /**
   * Devuelve la sesión activa, o `null` si no hay sesión.
   */
  async getSession(): Promise<Session | null> {
    const supabase = createClient()
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  /**
   * Devuelve el usuario autenticado actual, o `null` si no hay sesión.
   */
  async getUser(): Promise<User | null> {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    return data.user
  },
}
