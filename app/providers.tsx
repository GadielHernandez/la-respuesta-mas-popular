'use client'

import { ThemeProvider } from 'flowbite-react'

import { stitchTheme } from '@/lib/flowbite-theme'

/**
 * Proveedores globales del lado cliente.
 * ThemeProvider aplica el tema Stitch a todos los componentes Flowbite.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={stitchTheme}>{children}</ThemeProvider>
}
