"use client"

import type React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black text-white md:grid md:grid-cols-2">
      
      {/* LEFT SIDE */}
      <div className="relative hidden md:flex flex-col justify-center px-16 py-20 bg-[#07140F] overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.35),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_rgba(5,150,105,0.25),_transparent_70%)] blur-3xl" />

        <div className="relative z-10 max-w-md mx-auto w-full space-y-16">
          
          {/* Heading */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
              Get Started <br /> with Us
            </h1>
            <p className="text-emerald-100/70 text-lg">
              Complete these easy steps to register your account.
            </p>
          </div>

<div className="grid grid-cols-3 gap-4">

  {/* Step 1 */}
  <div className="bg-white text-black rounded-2xl p-5 shadow-2xl flex flex-col justify-between aspect-square">
    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
      1
    </div>
    <p className="font-semibold text-sm leading-tight">
      Sign up your account
    </p>
  </div>

  {/* Step 2 */}
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col justify-between aspect-square transition hover:bg-white/10">
    <div className="w-8 h-8 rounded-full bg-white/10 text-white/70 flex items-center justify-center text-sm font-medium">
      2
    </div>
    <p className="text-white/70 text-sm font-medium leading-tight">
      Set up your workspace
    </p>
  </div>

  {/* Step 3 */}
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col justify-between aspect-square transition hover:bg-white/10">
    <div className="w-8 h-8 rounded-full bg-white/10 text-white/70 flex items-center justify-center text-sm font-medium">
      3
    </div>
    <p className="text-white/70 text-sm font-medium leading-tight">
      Set up your profile
    </p>
  </div>

</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center p-8 bg-black">
        
        {/* subtle overlay glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}