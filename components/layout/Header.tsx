'use client'

import { Navbar, NavbarBrand, NavbarToggle } from 'flowbite-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Navigation } from './Navigation'

export function Header() {
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
          {/* Auth placeholder — se reemplaza en issue #32-#34 */}
          <Button variant="primary" size="sm">
            <span className="material-symbols-outlined text-base leading-none">account_circle</span>
            Iniciar Sesión
          </Button>
          <NavbarToggle />
        </div>

        <Navigation />
      </Navbar>
    </header>
  )
}
