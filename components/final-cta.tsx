"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#050B09]" />

      {/* GLOW */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] 
        bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.25),_transparent_60%)] blur-3xl"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        
        {/* HEADLINE */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="text-white">Ready to ship faster?</span>
        </h2>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of teams already building with Apex. 
          Start free, no credit card required.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Button
            size="lg"
            className="rounded-full px-8 h-14 text-base font-medium 
            bg-white text-black hover:bg-zinc-200
            shadow-[0_0_50px_rgba(255,255,255,0.15)]"
          >
            Get Started for Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-14 text-base font-medium 
            border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
          >
            Talk to Sales
          </Button>

        </div>

        {/* FOOTNOTE */}
        <p className="mt-8 text-sm text-white/40">
          Free forever for individuals. Team plans start at $29/month.
        </p>

      </motion.div>
    </section>
  )
}