'use client'

import { NavbarCollapse, NavbarLink } from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  authRequired?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Jugar', href: '/setup' },
  { label: 'Mis Preguntas', href: '/preguntas', authRequired: true },
  { label: 'Historial', href: '/historial', authRequired: true },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <NavbarCollapse>
      {NAV_ITEMS.map(({ label, href, authRequired }) => {
        const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

        return (
          <NavbarLink key={href} as={Link} href={href} active={isActive}>
            {authRequired && (
              <span className="material-symbols-outlined mr-1 text-[13px] opacity-40">lock</span>
            )}
            {label}
          </NavbarLink>
        )
      })}
    </NavbarCollapse>
  )
}
