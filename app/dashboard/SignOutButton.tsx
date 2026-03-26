'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { signOutAction } from '@/app/actions/auth'

/**
 * Premium sign-out button with loading spinner.
 * Uses the signOutAction server action to clear both
 * server cookies and the Supabase session.
 */
export default function SignOutButton() {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOutAction()
    } catch {
      // signOutAction calls redirect() which throws NEXT_REDIRECT — expected
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      aria-label="Sign out of your account"
      className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                 bg-zinc-900 border border-zinc-800 text-zinc-400
                 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200"
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  )
}