"use client"
import { motion } from "framer-motion"
import { AlertTriangle, Phone, Zap, Car, Key, Wrench } from "lucide-react"

const emergencyTypes = [
  { icon: Car, label: "Mobil Mogok", emoji: "🚗" },
  { icon: Key, label: "Tidak Bisa Dinyalakan", emoji: "🔑" },
  { icon: Wrench, label: "Ban Pecah", emoji: "🔩" },
  { icon: AlertTriangle, label: "Kendala Mesin", emoji: "⚙️" },
]

export default function DaruratPage() {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden flex flex-col items-center justify-center py-16"
      style={{ background: "linear-gradient(135deg, #0a0000 0%, #1a0000 50%, #0a0000 100%)" }}>
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #E31E24 0, #E31E24 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.8 }}
          className="w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <AlertTriangle size={40} className="text-red-500" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl sm:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          LAYANAN DARURAT
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-white/60 mb-10 text-base">
          Tim kami siap membantu Anda 24 jam. Jangan panik, hubungi kami segera!
        </motion.p>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {emergencyTypes.map((type, i) => (
            <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center space-x-3 p-4 rounded-2xl bg-white/5 border border-red-500/20">
              <span className="text-2xl">{type.emoji}</span>
              <span className="text-white/80 text-sm font-medium">{type.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="space-y-4">
          <a href="https://wa.me/6282329661815?text=Darurat%21%20Saya%20membutuhkan%20bantuan%20kendaraan."
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-base transition-all hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-1">
            <Zap size={22} /><span>Hubungi Bantuan Darurat</span><Phone size={18} />
          </a>
          <p className="text-white/30 text-sm">+62 823 2966 1815 · Tersedia 24 Jam</p>

          <div className="mt-8 p-5 rounded-2xl bg-white/3 border border-white/5 text-left">
            <h3 className="text-white font-bold text-sm mb-3">Tips Saat Darurat:</h3>
            <ul className="space-y-2">
              {[
                "Pinggirkan kendaraan ke tempat yang aman",
                "Nyalakan lampu hazard kendaraan Anda",
                "Hubungi Bengkel Harun segera via WhatsApp",
                "Tunggu di tempat aman sambil menunggu bantuan",
              ].map((tip, i) => (
                <li key={i} className="flex items-start space-x-2 text-white/50 text-xs">
                  <span className="text-red-500 font-bold mt-0.5">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
