"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePasswordAction } from "@/app/actions/auth"

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [password, setPassword] = useState("")

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password) return
    setLoading(true)
    setErrorMsg("")

    const formData = new FormData()
    formData.append("password", password)

    const result = await updatePasswordAction(formData)

    if (result?.error) {
      setErrorMsg(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col pt-8 pb-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">New Password</h2>
        <p className="text-sm text-zinc-400">Enter your new secure password.</p>
      </div>

      <form className="space-y-5" onSubmit={handleUpdate}>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs text-zinc-400 font-medium">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-zinc-900/80 border-0 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-md"
          />
        </div>

        {errorMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm text-center">{errorMsg}</div>}

        <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 h-11 text-base font-medium rounded-md mt-4">
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}
