import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Protected Dashboard Layout
 *
 * Provides two layers of auth protection:
 *  1. Middleware (lib/supabase/middleware.ts) — catches unauthenticated
 *     requests before they reach the page
 *  2. This layout (defense-in-depth) — server-side verification that the
 *     user session is still valid at render time
 *
 * Shows a minimal loading skeleton while the page streams in.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  )
}
