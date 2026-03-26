import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/** Routes that require authentication */
const PROTECTED_ROUTES = ['/dashboard']

/** Auth pages that logged-in users should be redirected away from */
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

/**
 * Refreshes the Supabase session and enforces route protection.
 *
 * Called by the root middleware on every matched request.
 *
 * Responsibilities:
 *  1. Refresh the auth session (keeps cookies alive)
 *  2. Redirect unauthenticated users away from protected routes
 *  3. Redirect authenticated users away from auth pages
 *
 * @param request - The incoming Next.js request
 * @returns The response with updated session cookies
 */
export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Graceful fallback: if env vars are missing, let the request through.
  // This prevents the middleware from crashing ALL routes.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Supabase Middleware] Missing NEXT_PUBLIC_SUPABASE_URL or ' +
        'NEXT_PUBLIC_SUPABASE_ANON_KEY. Auth protection is disabled.'
      )
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // CRITICAL: Do NOT add code between createServerClient and getUser().
  // A simple mistake here can cause users to be randomly logged out.
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  // Unauthenticated user trying to access a protected route → redirect to login
  if (!user && isProtected) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    // Save original destination for post-login redirect
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated user trying to access an auth page → send to dashboard
  if (user && isAuthRoute) {
    const dashUrl = request.nextUrl.clone()
    dashUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashUrl)
  }

  return supabaseResponse
}
