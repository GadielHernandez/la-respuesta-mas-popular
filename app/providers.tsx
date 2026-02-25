'use client'

import { ThemeProvider } from 'flowbite-react'

import { stitchTheme } from '@/lib/flowbite-theme'
import { AuthProvider } from '@/contexts/AuthContext'

/**
 * Proveedores globales del lado cliente.
 * - AuthProvider: estado de sesión de Supabase disponible en toda la app
 * - ThemeProvider: aplica el tema Stitch a todos los componentes Flowbite
 */
export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <AuthProvider>
      <ThemeProvider theme={stitchTheme}>{children}</ThemeProvider>
    </AuthProvider>
  )
}
