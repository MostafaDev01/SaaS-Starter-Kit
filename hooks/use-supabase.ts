'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

/**
 * Hook to access the current Supabase session in Client Components.
 *
 * Returns the current user, session, loading state, and a memoized
 * Supabase client instance. Automatically subscribes to auth state
 * changes (login, logout, token refresh).
 *
 * Usage:
 * ```tsx
 * const { user, session, loading, supabase } = useSupabaseSession()
 * ```
 */
export function useSupabaseSession() {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  /** Sign out helper — clears session on client side */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [supabase])

  return { user, session, loading, supabase, signOut }
}
