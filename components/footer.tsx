"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "API"],
  Resources: ["Documentation", "Guides", "Blog", "Community", "Templates"],
  Company: ["About", "Careers", "Press", "Partners", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Cookies", "Licenses"],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/10">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#050B09]" />

      {/* GLOW */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-emerald-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-10"
        >
          
          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <span className="text-black font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-white tracking-tight">
                Apex
              </span>
            </a>

            <p className="text-sm text-white/50 mb-5 leading-relaxed">
              The modern platform for teams who ship fast.
            </p>

            {/* STATUS */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-white/60">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Apex, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition">
              GitHub
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition">
              Discord
            </a>
          </div>

        </motion.div>
      </div>
    </footer>
  )
}