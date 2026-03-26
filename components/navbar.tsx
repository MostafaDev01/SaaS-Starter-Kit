"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
    >
      <nav className="relative flex items-center justify-between px-5 py-3 rounded-full 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <span className="text-black font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-white hidden sm:block tracking-tight">
            BuyCode
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="sm"
              className="rounded-full px-5 bg-white text-black hover:bg-zinc-200
              shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-3 p-4 rounded-2xl 
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
                >
                  {item.label}
                </a>
              ))}

              <div className="border-t border-white/10 my-2" />

              <Link href="/login">
                <Button
                  variant="ghost"
                  className="justify-start text-white/60 hover:text-white w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  className="rounded-full bg-white text-black hover:bg-zinc-200 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}