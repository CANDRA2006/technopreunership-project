"use client"
import { PortfolioSection } from "@/components/sections/PortfolioSection"
import { motion } from "framer-motion"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase block mb-3">Hasil Kerja Kami</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>PORTOFOLIO</h1>
            <p className="text-white/50 max-w-xl mx-auto text-sm">Galeri hasil pekerjaan terbaik Bengkel Harun.</p>
          </motion.div>
        </div>
      </div>
      <PortfolioSection />
    </div>
  )
}
