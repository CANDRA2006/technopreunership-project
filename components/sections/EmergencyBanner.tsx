"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, Phone, Zap } from "lucide-react"

const emergencies = [
  { icon: "🚗", label: "Mobil Mogok" },
  { icon: "🔑", label: "Tidak Bisa Dinyalakan" },
  { icon: "🔩", label: "Ban Pecah" },
  { icon: "⚙️", label: "Kendala Mesin" },
]

export function EmergencyBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #1a0000 0%, #2d0000 50%, #1a0000 100%)"
      }} />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #E31E24 0, #E31E24 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle size={22} className="text-red-500" />
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase">Layanan Darurat</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            BUTUH BANTUAN DARURAT?
          </h2>
          <p className="text-white/60 mb-8 text-base">Tim kami siap membantu 24 jam. Hubungi segera!</p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {emergencies.map((e) => (
              <div key={e.label} className="flex items-center space-x-2 bg-white/5 border border-red-500/20 rounded-full px-4 py-2">
                <span>{e.icon}</span>
                <span className="text-white/80 text-sm">{e.label}</span>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/6282329661815?text=Darurat%21%20Saya%20membutuhkan%20bantuan%20kendaraan."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1"
          >
            <Zap size={20} />
            <span>Hubungi Bantuan Darurat</span>
            <Phone size={18} />
          </a>
          <p className="text-white/30 text-xs mt-4">+62 823 2966 1815 · Tersedia 24 Jam</p>
        </motion.div>
      </div>
    </section>
  )
}
