"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/app/actions/auth"

/**
 * Login Page — Suspense wrapper for useSearchParams()
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12 animate-pulse">
      <div className="mb-10">
        <div className="h-8 w-48 bg-zinc-800 rounded mb-3" />
        <div className="h-4 w-64 bg-zinc-800/50 rounded" />
      </div>
      <div className="space-y-5">
        <div className="h-11 bg-zinc-900/80 rounded-md" />
        <div className="h-11 bg-zinc-900/80 rounded-md" />
        <div className="h-11 bg-zinc-800 rounded-md mt-4" />
      </div>
    </div>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const callbackError = searchParams.get("error")
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"
  const message = searchParams.get("message")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("redirectTo", redirectTo)

    const result = await loginAction(formData)

    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-zinc-400">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Success message from registration redirect */}
      {message === "check-email" && (
        <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-400 text-sm font-medium">Account created successfully!</p>
            <p className="text-emerald-500/70 text-xs mt-1">Please check your email to confirm your account before logging in.</p>
          </div>
        </div>
      )}

      {/* Auth callback error */}
      {callbackError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm text-center">
          Your authentication link has expired or is invalid. Please try again.
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs text-zinc-400 font-medium">Password</Label>
            <Link href="/forgot-password" className="text-xs text-zinc-400 hover:text-white transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
        </div>

        <Button
          type="submit"
          disabled={!email || !password || loading}
          className="w-full bg-white text-black hover:bg-zinc-200 h-11 text-base font-medium rounded-md mt-4 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Logging in...
            </span>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  )
}