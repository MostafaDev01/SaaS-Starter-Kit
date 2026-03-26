"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, CheckCircle2, Mail } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction, resendConfirmationAction } from "@/app/actions/auth"

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registered, setRegistered] = useState(false)
  const [resending, setResending] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) return

    setLoading(true)

    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("password", password)

    const result = await registerAction(formData)

    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    } else {
      // registerAction redirects to /login on success.
      // If redirect somehow doesn't fire (edge case), show success UI.
      setRegistered(true)
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      toast.error("Enter your email address first")
      return
    }
    setResending(true)
    const fd = new FormData()
    fd.append("email", email)
    const result = await resendConfirmationAction(fd)
    if (result?.error) toast.error(result.error)
    if (result?.success) toast.success(result.success)
    setResending(false)
  }

  // ── Success state (fallback if redirect doesn't fire) ──
  if (registered) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12">
        <div className="p-8 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Check your email</h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            We sent a confirmation link to<br />
            <span className="text-white font-medium">{email}</span>
          </p>

          <Link href="/login">
            <Button className="w-full bg-white text-black hover:bg-zinc-200 h-11 text-base font-medium rounded-md mb-3">
              Go to Login
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors disabled:opacity-50"
          >
            {resending ? "Sending..." : "Didn\u0027t receive it? Resend email"}
          </button>
        </div>
      </div>
    )
  }

  // ── Registration Form ──
  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">Sign Up Account</h2>
        <p className="text-sm text-zinc-400">Enter your personal data to create your account.</p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs text-zinc-400 font-medium">First Name</Label>
            <Input
              id="firstName"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs text-zinc-400 font-medium">Last Name</Label>
            <Input
              id="lastName"
              placeholder="e.g. Francisco"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-zinc-400 font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. johnfrans@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs text-zinc-400 font-medium">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 pr-10 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-2">Min 8 characters, at least one number.</p>
        </div>

        <Button
          type="submit"
          disabled={!firstName || !lastName || !email || !password || loading}
          className="w-full bg-white text-black hover:bg-zinc-200 h-11 text-base font-medium rounded-md mt-4 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  )
}