"use client"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)

  const options = [
    { label: "Booking Service", msg: "Halo Bengkel Harun, saya ingin booking service." },
    { label: "Tanya Layanan", msg: "Halo Bengkel Harun, saya ingin mengetahui info layanan." },
    { label: "Emergency / Darurat", msg: "Darurat! Saya membutuhkan bantuan kendaraan." },
    { label: "Cek Harga Produk", msg: "Halo Bengkel Harun, saya ingin cek harga produk." },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-2"
            style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)", width: 260 }}
          >
            <div className="bg-green-600 px-4 py-3 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Bengkel Harun</p>
                <p className="text-green-200 text-xs">Online 24 Jam</p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-white/60 text-xs mb-3">Halo! Ada yang bisa kami bantu?</p>
              {options.map((opt) => (
                <a key={opt.label}
                  href={`https://wa.me/6282329661815?text=${encodeURIComponent(opt.msg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2.5 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 text-white/80 hover:text-white text-xs transition-all duration-200">
                  {opt.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/40 flex items-center justify-center text-white transition-colors relative"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-black animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
