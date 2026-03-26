'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { AuthResult } from '@/types/auth'
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  resendConfirmationSchema,
} from '@/types/auth'

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

/** Extracts the first Zod error message from a validation result */
function getFirstZodError(result: { error: { errors: { message: string }[] } }): string {
  return result.error.errors[0]?.message ?? 'Validation failed'
}

/** Site URL for email redirect links */
function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

// ─────────────────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────────────────

/**
 * Authenticates a user with email and password.
 * On success, redirects to /dashboard (or the saved redirectTo path).
 */
export async function loginAction(formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) return { error: getFirstZodError(parsed) }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    if (error.message === 'Invalid login credentials') {
      return { error: 'Invalid email or password. Please try again.' }
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Please confirm your email address before logging in.' }
    }
    // Rate limit (Supabase returns 429)
    if (error.status === 429) {
      return { error: 'Too many attempts. Please wait a moment and try again.' }
    }
    return { error: error.message }
  }

  // Read optional redirectTo from the form (set by the login page)
  const redirectTo = (formData.get('redirectTo') as string) || '/dashboard'

  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

// ─────────────────────────────────────────────────────────
// Register
// ─────────────────────────────────────────────────────────

/**
 * Creates a new user account.
 * If email confirmation is enabled, returns a success message.
 * Otherwise, redirects to /dashboard.
 */
export async function registerAction(formData: FormData): Promise<AuthResult> {
  const raw = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) return { error: getFirstZodError(parsed) }

  const { firstName, lastName, email, password } = parsed.data
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
    },
  })

  if (error) {
    if (error.status === 429) {
      return { error: 'Too many attempts. Please wait a moment and try again.' }
    }
    return { error: error.message }
  }

  // Duplicate signup: Supabase returns identities=[] for existing accounts
  if (data.user?.identities?.length === 0) {
    return { error: 'An account with this email already exists.' }
  }

  // Email confirmation required: user exists but no session yet
  if (data.user && !data.session) {
    redirect('/login?message=check-email')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ─────────────────────────────────────────────────────────
// Sign Out
// ─────────────────────────────────────────────────────────

/** Signs the user out and redirects to /login. */
export async function signOutAction(): Promise<never> {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

// ─────────────────────────────────────────────────────────
// Forgot Password
// ─────────────────────────────────────────────────────────

/**
 * Sends a password reset email.
 * Always returns success to avoid revealing whether the email exists.
 */
export async function forgotPasswordAction(formData: FormData): Promise<AuthResult> {
  const raw = { email: formData.get('email') as string }

  const parsed = forgotPasswordSchema.safeParse(raw)
  if (!parsed.success) return { error: getFirstZodError(parsed) }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
  })

  // Log server-side but never reveal to user whether account exists
  if (error) {
    if (error.status === 429) {
      return { error: 'Too many attempts. Please wait a moment and try again.' }
    }
    console.error('[forgotPasswordAction]', error.message)
  }

  // Always return success (security best practice)
  return { success: 'If an account with that email exists, you will receive a reset link.' }
}

// ─────────────────────────────────────────────────────────
// Update Password
// ─────────────────────────────────────────────────────────

/** Updates the user's password (called after clicking the reset link). */
export async function updatePasswordAction(formData: FormData): Promise<AuthResult> {
  const raw = {
    password: formData.get('password') as string,
    confirmPassword: (formData.get('confirmPassword') as string) || undefined,
  }

  const parsed = updatePasswordSchema.safeParse(raw)
  if (!parsed.success) return { error: getFirstZodError(parsed) }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ─────────────────────────────────────────────────────────
// Resend Confirmation Email
// ─────────────────────────────────────────────────────────

/** Resends the signup confirmation email. */
export async function resendConfirmationAction(formData: FormData): Promise<AuthResult> {
  const raw = { email: formData.get('email') as string }

  const parsed = resendConfirmationSchema.safeParse(raw)
  if (!parsed.success) return { error: getFirstZodError(parsed) }

  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
    },
  })

  if (error) {
    if (error.status === 429) {
      return { error: 'Too many requests. Please wait before trying again.' }
    }
    return { error: error.message }
  }

  return { success: 'Confirmation email sent. Check your inbox.' }
}

// ─────────────────────────────────────────────────────────
// Social Login — Uncomment to enable
// ─────────────────────────────────────────────────────────
//
// Prerequisites:
//   1. Enable the provider in Supabase Dashboard → Auth → Providers
//   2. Add OAuth credentials (client ID + secret)
//   3. Add your site URL to Supabase redirect allow list
//   4. Uncomment the function below + add a button in your login page
//
// export async function signInWithGoogleAction(): Promise<AuthResult> {
//   const supabase = await createClient()
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
//       queryParams: { access_type: 'offline', prompt: 'consent' },
//     },
//   })
//   if (error) return { error: error.message }
//   if (data.url) redirect(data.url)
//   return { error: 'Failed to initiate Google sign-in' }
// }
//
// export async function signInWithGitHubAction(): Promise<AuthResult> {
//   const supabase = await createClient()
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//     options: {
//       redirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
//     },
//   })
//   if (error) return { error: error.message }
//   if (data.url) redirect(data.url)
//   return { error: 'Failed to initiate GitHub sign-in' }
// }
