'use client'

import { ThemeProvider } from 'flowbite-react'

import { stitchTheme } from '@/lib/flowbite-theme'
import { AuthProvider } from '@/contexts/AuthContext'
import { useStorage } from '@/hooks/useStorage'

/**
 * Monta useStorage en el árbol global para que la migración
 * localStorage → Supabase se dispare en cualquier página.
 * No renderiza nada — solo efecto de side-effect.
 */
function StorageMigrationEffect(): null {
  useStorage()
  return null
}

/**
 * Proveedores globales del lado cliente.
 * - AuthProvider: estado de sesión de Supabase disponible en toda la app
 * - ThemeProvider: aplica el tema Stitch a todos los componentes Flowbite
 * - StorageMigrationEffect: dispara migración localStorage → Supabase al login
 */
export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <AuthProvider>
      <ThemeProvider theme={stitchTheme}>
        <StorageMigrationEffect />
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}
