'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Hook genérico que persiste estado en `localStorage`.
 *
 * API idéntica a `useState<T>` — funciona como reemplazo directo.
 * Sincroniza automáticamente con otras tabs/ventanas mediante el
 * evento nativo `storage`.
 *
 * @param key          - Clave de localStorage (e.g. `'lrmp_question_sets'`)
 * @param initialValue - Valor inicial si la clave no existe en storage
 *
 * @example
 * const [sets, setSets] = useLocalStorage<QuestionSet[]>('lrmp_question_sets', [])
 * setSets(prev => [...prev, newSet])
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // ── Leer valor inicial desde localStorage ──────────────────────────────────
  const readStorage = useCallback((): T => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readStorage)

  // ── Setter — escribe en state + localStorage ───────────────────────────────
  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (valueOrUpdater) => {
      setStoredValue(prev => {
        const next =
          typeof valueOrUpdater === 'function'
            ? (valueOrUpdater as (prev: T) => T)(prev)
            : valueOrUpdater

        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // QuotaExceededError — el state se actualiza igual pero no persiste
        }

        return next
      })
    },
    [key]
  )

  // ── Sincronización cross-tab via evento `storage` ──────────────────────────
  useEffect(() => {
    const handleStorage = (e: StorageEvent): void => {
      if (e.key !== key) return

      if (e.newValue === null) {
        // La clave fue eliminada en otra tab
        setStoredValue(initialValue)
        return
      }

      try {
        setStoredValue(JSON.parse(e.newValue) as T)
      } catch {
        // Valor corrupto — ignorar
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue])

  return [storedValue, setValue]
}
