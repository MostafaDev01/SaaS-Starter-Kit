import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

/**
 * Next.js 16 Root Proxy
 *
 * Replaces the deprecated `middleware.ts` convention.
 * Runs on every matched request. Delegates to the Supabase
 * updateSession function for session refresh and route protection.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/proxy
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Static assets (.svg, .png, .jpg, .jpeg, .gif, .webp, .ico)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
