import type { Metadata } from 'next'
import { Lexend, Poppins } from 'next/font/google'
import { ThemeModeScript } from 'flowbite-react'

import { Providers } from './providers'
import './globals.css'

// Lexend: fuente principal (Stitch design guide)
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

// Poppins: fallback display (compatibilidad)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'La Respuesta más Popular',
  description: 'Juego familiar basado en el clásico show de TV',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        {/* Material Symbols Outlined — carga via <link> porque @import url() en CSS es ignorado por Next.js/Tailwind v4 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className={`${lexend.variable} ${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
