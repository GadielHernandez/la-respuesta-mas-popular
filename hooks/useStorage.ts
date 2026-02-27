'use client'

/**
 * useStorage — hook que retorna el adaptador de storage correcto según auth.
 *
 * Selecciona automáticamente entre localStorage (sin sesión) y Supabase
 * (con sesión). Cuando el usuario hace login, ejecuta automáticamente
 * la migración de datos de localStorage a Supabase.
 *
 * Uso:
 *   const storage = useStorage()
 *
 *   // Sin sesión → usa localStorage (síncrono)
 *   const sets = storage.getQuestionSets()
 *
 *   // Con sesión → usa Supabase (async)
 *   const sets = await storage.getQuestionSets(user.id)
 *
 * El componente debe manejar los estados de carga y error externamente.
 */

import { useEffect, useMemo, useRef } from 'react'

import { useAuth } from '@/contexts/AuthContext'
import { getStorageAdapter, migrateLocalStorageToSupabase } from '@/lib/storage/storageManager'
import type { StorageAdapter } from '@/lib/storage/supabaseStorage'

/**
 * Retorna el adaptador de storage apropiado al estado de autenticación actual.
 * Migra automáticamente los datos locales a Supabase cuando el usuario hace login.
 *
 * @returns StorageAdapter — localStorage o Supabase según la sesión activa
 */
export function useStorage(): StorageAdapter {
  const { user } = useAuth()

  // Adaptador memoizado: se recrea solo cuando cambia el usuario
  const adapter = useMemo(() => getStorageAdapter(user), [user])

  // Ref para detectar la transición null→user (login) sin re-renders
  const prevUserIdRef = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    const prevUserId = prevUserIdRef.current
    const currentUserId = user?.id ?? null

    prevUserIdRef.current = currentUserId

    if (prevUserId === undefined) {
      // Primera ejecución: si ya hay sesión activa, migrar datos locales pendientes
      if (currentUserId && user) {
        migrateLocalStorageToSupabase(currentUserId, adapter).catch(() => {})
      }
      return
    }

    // Detectar login: usuario pasa de null a tener id
    if (!prevUserId && currentUserId && user) {
      migrateLocalStorageToSupabase(currentUserId, adapter).catch(() => {
        // Migración best-effort: silenciar errores para no romper el flujo de login
      })
    }
  }, [user, adapter])

  return adapter
}
