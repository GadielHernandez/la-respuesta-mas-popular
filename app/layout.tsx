import type { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import { ThemeModeScript } from 'flowbite-react'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

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
      </head>
      <body className={`${nunito.variable} ${poppins.variable} antialiased`}>{children}</body>
    </html>
  )
}
