import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Rutas que requieren sesión activa.
 * Redirigen a /login si el usuario no está autenticado.
 */
const PROTECTED_ROUTES = ['/dashboard', '/my-questions', '/history']

/**
 * Rutas de autenticación.
 * Redirigen a /dashboard si el usuario ya está autenticado.
 */
const AUTH_ROUTES = ['/login', '/register']

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // supabaseResponse debe pasarse a NextResponse para que las cookies
  // de sesión (refresh token) se propaguen correctamente al cliente.
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Primero actualizar las cookies en el request para que los
          // Server Components del mismo ciclo las vean.
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          // Recrear supabaseResponse con el request actualizado y copiar cookies.
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Usar getUser() en lugar de getSession() — getUser valida el JWT
  // contra Supabase en cada request, evitando tokens falsificados.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

  // Sin sesión intentando acceder a ruta protegida → /login
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Con sesión visitando login o register → /dashboard
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/my-questions/:path*',
    '/history/:path*',
    '/login',
    '/register',
  ],
}
