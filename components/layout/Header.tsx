'use client'

import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { localStorageAdapter } from '@/lib/storage/localStorage'
import { Navigation } from './Navigation'

export function Header(): React.ReactElement {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, signOut } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true)
    // Limpiar partida en curso — no quedan datos de sesión activa
    localStorageAdapter.clearCurrentGame()
    await signOut()
    router.push('/')
  }

  return (
    <header className="border-b border-warm-border-light">
      <Navbar fluid>
        <NavbarBrand as={Link} href="/">
          <div className="flex items-center gap-3">
            {/* Icono gold — patrón Stitch: bg-primary/10 + border-primary/30 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
              <span className="material-symbols-outlined text-2xl text-primary">stars</span>
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-lg font-black uppercase italic tracking-tight text-white">
                La Respuesta <span className="text-primary">más Popular</span>
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600">
                Family Game Show
              </p>
            </div>
          </div>
        </NavbarBrand>

        <div className="flex items-center gap-2 md:order-2">
          {isLoading ? (
            /* Skeleton mientras se verifica la sesión */
            <div className="h-8 w-24 animate-pulse rounded-lg bg-warm-border" />
          ) : isAuthenticated ? (
            /* Usuario autenticado */
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-warm-border text-[11px] font-bold uppercase tracking-wider text-gray-400
                  hover:border-primary/40 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm leading-none">account_circle</span>
                {user?.email?.split('@')[0]}
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-warm-border text-[11px] font-bold uppercase tracking-wider text-gray-400
                  hover:border-danger-strike/50 hover:text-danger-strike transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Cerrar sesión"
              >
                {isLoggingOut ? (
                  <span className="material-symbols-outlined text-sm leading-none animate-spin">
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-sm leading-none">logout</span>
                )}
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          ) : (
            /* Sin sesión */
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-game-board text-[11px] font-black uppercase tracking-wider
                hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(219,166,31,0.2)]"
            >
              <span className="material-symbols-outlined text-base leading-none">account_circle</span>
              Iniciar Sesión
            </Link>
          )}
          <NavbarToggle />
        </div>

        <Navigation />
      </Navbar>
    </header>
  )
}
