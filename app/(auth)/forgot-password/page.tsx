"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordAction } from "@/app/actions/auth"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ error?: string; success?: string } | null>(null)
  const [email, setEmail] = useState("")

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append("email", email)

    const result = await forgotPasswordAction(formData)
    
    setMessage(result)
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">Reset Password</h2>
        <p className="text-sm text-zinc-400">Enter your email to receive a reset link.</p>
      </div>

      <form className="space-y-5" onSubmit={handleReset}>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-zinc-400 font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. johnfrans@gmail.com"
            required
            className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
          />
        </div>

        {message?.error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm text-center">{message.error}</div>}
        {message?.success && <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-500 text-sm text-center">{message.success}</div>}

        <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 h-11 text-base font-medium rounded-md mt-4">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm text-white hover:underline font-medium">
          Back to login
        </Link>
      </div>
    </div>
  )
}
