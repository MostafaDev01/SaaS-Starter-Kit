import { z } from 'zod'

// ─────────────────────────────────────────────────────────
// Auth Action Result
// ─────────────────────────────────────────────────────────

/** Standardized return type for all auth Server Actions */
export type AuthResult = {
  error?: string
  success?: string
}

// ─────────────────────────────────────────────────────────
// Validation Schemas
// ─────────────────────────────────────────────────────────

/** Reusable email field */
const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')

/**
 * Reusable password field.
 * Enforces: min 8 chars, at least one number.
 */
const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/\d/, 'Password must contain at least one number')

/** Login form validation */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
})

/** Registration form validation */
export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: emailField,
  password: passwordField,
})

/** Forgot password validation */
export const forgotPasswordSchema = z.object({
  email: emailField,
})

/** Update password validation */
export const updatePasswordSchema = z.object({
  password: passwordField,
  confirmPassword: z.string().optional(),
}).refine(
  (data) => !data.confirmPassword || data.password === data.confirmPassword,
  { message: 'Passwords do not match', path: ['confirmPassword'] }
)

/** Resend confirmation validation */
export const resendConfirmationSchema = z.object({
  email: emailField,
})
