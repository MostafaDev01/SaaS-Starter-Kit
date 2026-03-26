import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in Client Components.
 *
 * This uses `createBrowserClient` from @supabase/ssr which automatically
 * handles cookie-based session management in the browser.
 *
 * Safe to call multiple times — @supabase/ssr deduplicates internally.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
      'are set in your .env.local file.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
