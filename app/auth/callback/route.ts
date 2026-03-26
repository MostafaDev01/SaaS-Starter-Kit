import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth Callback Route Handler
 * GET /auth/callback?code=...&next=/dashboard
 *
 * This route handles the code exchange when a user clicks an email link:
 *  - Email confirmation after signup
 *  - Password reset link
 *  - Magic link login
 *  - OAuth callback (Google, GitHub, etc.)
 *
 * Supabase appends a `code` query param to the redirect URL.
 * We exchange it for a session, then redirect to the intended page.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successful code exchange — redirect to intended destination
      return NextResponse.redirect(`${origin}${next}`)
    }

    // Log the error server-side for debugging
    console.error('[Auth Callback] Code exchange failed:', error.message)
  }

  // If no code or exchange failed, redirect to login with an error indicator
  const loginUrl = new URL('/login', origin)
  loginUrl.searchParams.set('error', 'auth_callback_failed')
  return NextResponse.redirect(loginUrl.toString())
}
