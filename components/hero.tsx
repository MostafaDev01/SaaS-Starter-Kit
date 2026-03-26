"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const avatars = [
  "/professional-headshot-1.png",
  "/professional-headshot-2.png",
  "/professional-headshot-3.png",
  "/professional-headshot-4.png",
  "/professional-headshot-5.png",
]

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      
      {/* DARK BASE */}
      <div className="absolute inset-0 bg-[#050B09]" />

      {/* GREEN GLOW (TOP LEFT) */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-[140%] h-[140%] 
        bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.25),_transparent_60%)] blur-3xl"
      />

      {/* GREEN GLOW (BOTTOM RIGHT) */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] 
        bg-[radial-gradient(circle_at_center,_rgba(5,150,105,0.2),_transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white/5 backdrop-blur-md border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-white/70">Now in Public Beta</span>
        </motion.div>

        {/* HEADLINE */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          
          <span className="block overflow-hidden">
            <motion.span
              className="block text-white"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Ship faster.
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              className="block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Scale smarter.
            </motion.span>
          </span>

        </h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The modern platform for teams who ship fast. Built for scale, designed for speed. 
          Everything you need to build, deploy, and grow.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          
          <Button
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium 
            bg-white text-black hover:bg-zinc-200
            shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Start Building
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium 
            border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
          >
            View Demo
          </Button>

        </motion.div>

        {/* SOCIAL PROOF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          
          <div className="flex items-center -space-x-3">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <img
                  src={avatar}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-[#050B09] object-cover"
                />
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-white/50">
            Trusted by <span className="text-white font-medium">2,000+</span> teams worldwide
          </p>

        </motion.div>
      </div>
    </section>
  )
}