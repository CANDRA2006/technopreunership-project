"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ChevronDown, Wrench, Phone } from "lucide-react"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617153088612-9e4c5a2a4cdc?w=1920&q=85"
          alt="Bengkel profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(20,0,0,0.85) 50%, rgba(0,0,0,0.90) 100%)"
        }} />
      </motion.div>

      {/* Red accent lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-red-500/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent z-10" />

      {/* Animated grid */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(rgba(227,30,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium tracking-widest uppercase">Bengkel Profesional Pekalongan</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              BENGKEL MOBIL
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #E31E24 0%, #ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              PROFESIONAL
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/60"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              dan Terpercaya
            </motion.h2>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/55 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Melayani servis, perawatan, sparepart, dan modifikasi mobil dengan teknisi berpengalaman. Kualitas premium, harga bersahabat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://wa.me/6282329661815?text=Halo%20Bengkel%20Harun%2C%20saya%20ingin%20booking%20service."
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
            >
              <Phone size={16} />
              <span>Booking Service</span>
            </a>
            <Link href="/katalog"
              className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5">
              <Wrench size={16} />
              <span>Lihat Katalog</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
