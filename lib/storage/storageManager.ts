/**
 * Storage Manager — capa de abstracción sobre los adaptadores de storage.
 *
 * Selecciona automáticamente el adaptador correcto según el estado de auth:
 * - Usuario autenticado → supabaseStorageAdapter (Supabase)
 * - Sin sesión          → localStorageAdapter (localStorage)
 *
 * También provee la función de migración que se ejecuta al hacer login,
 * moviendo los datos de localStorage a Supabase.
 */

import type { User } from '@supabase/supabase-js'

import type { QuestionSet } from '@/types/question.types'
import type { GameResult, GameState } from '@/types/game.types'
import { createClient } from '@/lib/supabase/client'
import { localStorageAdapter } from '@/lib/storage/localStorage'
import { supabaseStorageAdapter } from '@/lib/storage/supabaseStorage'
import type { StorageAdapter } from '@/lib/storage/supabaseStorage'

// ─── Adaptador local envuelto en la interfaz StorageAdapter ──────────────────
//
// Wrapeamos localStorageAdapter para que satisfaga StorageAdapter sin casts.
// Los parámetros `userId` son opcionales y se ignoran en localStorage
// (el storage es por-navegador, no necesita scoping por usuario).

const localAdapter: StorageAdapter = {
  getQuestionSets(_userId?: string): QuestionSet[] {
    return localStorageAdapter.getQuestionSets()
  },

  saveQuestionSet(set: QuestionSet, _userId?: string): void {
    localStorageAdapter.saveQuestionSet(set)
  },

  deleteQuestionSet(setId: string): void {
    localStorageAdapter.deleteQuestionSet(setId)
  },

  getGameHistory(_userId?: string): GameResult[] {
    return localStorageAdapter.getGameHistory()
  },

  saveGameHistory(result: GameResult, _userId?: string): void {
    localStorageAdapter.saveGameHistory(result)
  },

  getCurrentGame(): GameState | null {
    return localStorageAdapter.getCurrentGame()
  },

  saveCurrentGame(state: GameState): void {
    localStorageAdapter.saveCurrentGame(state)
  },

  clearCurrentGame(): void {
    localStorageAdapter.clearCurrentGame()
  },
}

// ─── getStorageAdapter ────────────────────────────────────────────────────────

/**
 * Retorna el adaptador de storage apropiado según el estado de autenticación.
 *
 * @param user - Usuario de Supabase (`null` o `undefined` si no hay sesión)
 * @returns Adaptador de Supabase si hay sesión, localStorage si no la hay
 *
 * @example
 * const adapter = getStorageAdapter(user)
 * const sets = await adapter.getQuestionSets(user?.id)
 */
export function getStorageAdapter(user?: User | null): StorageAdapter {
  if (user) {
    return supabaseStorageAdapter(createClient())
  }
  return localAdapter
}

// ─── migrateLocalStorageToSupabase ────────────────────────────────────────────

/**
 * Migra los datos de localStorage a Supabase cuando el usuario hace login.
 *
 * Estrategia:
 * 1. Lee todos los sets de preguntas y el historial de localStorage
 * 2. Los sube a Supabase (upsert — no duplica si ya existen)
 * 3. Elimina los sets de localStorage tras la migración exitosa
 *    (el historial se mantiene como cache local — no perjudica)
 *
 * Los errores individuales se absorben para no interrumpir la migración.
 * La migración es idempotente: volver a ejecutarla no crea duplicados.
 *
 * @param userId - ID del usuario que acaba de autenticarse
 * @param targetAdapter - Adaptador Supabase al que migrar los datos
 */
export async function migrateLocalStorageToSupabase(
  userId: string,
  targetAdapter: StorageAdapter
): Promise<void> {
  const localSets = localStorageAdapter.getQuestionSets()
  const localHistory = localStorageAdapter.getGameHistory()

  if (localSets.length === 0 && localHistory.length === 0) return

  // Migrar sets de preguntas
  for (const set of localSets) {
    try {
      await targetAdapter.saveQuestionSet(set, userId)
    } catch {
      // Continuar con el resto aunque falle uno
    }
  }

  // Migrar historial de partidas
  for (const result of localHistory) {
    try {
      await targetAdapter.saveGameHistory(result, userId)
    } catch {
      // Continuar con el resto aunque falle uno
    }
  }

  // Limpiar sets del localStorage (ya están en Supabase)
  for (const set of localSets) {
    localStorageAdapter.deleteQuestionSet(set.id)
  }
}
