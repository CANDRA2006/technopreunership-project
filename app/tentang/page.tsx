"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Award, Users, Wrench, MapPin, Phone, Clock } from "lucide-react"

const values = [
  { icon: Shield, title: "Kepercayaan", desc: "Kami mengutamakan kepercayaan pelanggan dalam setiap pelayanan." },
  { icon: Award, title: "Kualitas Premium", desc: "Menggunakan alat dan bahan terbaik untuk hasil yang sempurna." },
  { icon: Users, title: "Tim Profesional", desc: "Teknisi berpengalaman dan bersertifikat siap melayani Anda." },
  { icon: Wrench, title: "Solusi Lengkap", desc: "Dari service ringan hingga perbaikan besar, kami siap membantu." },
]

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase block mb-3">Kenali Kami</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TENTANG KAMI</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1617153088612-9e4c5a2a4cdc?w=800&q=80" alt="Bengkel" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="w-10 h-0.5 bg-red-500 block mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>BENGKEL HARUN</h2>
            <p className="text-white/60 leading-relaxed mb-4 text-sm">
              Bengkel Harun adalah bengkel mobil profesional yang berlokasi di Pekalongan, Jawa Tengah. Dengan pengalaman lebih dari 2 tahun, kami telah melayani ratusan pelanggan dengan dedikasi penuh dan standar kualitas tertinggi.
            </p>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              Diperkuat dengan teknisi berpengalaman dan peralatan modern, Bengkel Harun siap memberikan solusi terbaik untuk setiap kebutuhan kendaraan Anda — mulai dari perawatan rutin hingga perbaikan kompleks.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, text: "Kec. Bojong, Pekalongan" },
                { icon: Phone, text: "+62 823 2966 1815" },
                { icon: Clock, text: "Senin – Sabtu, 08.00–17.00" },
                { icon: Shield, text: "Garansi Kepuasan Pelanggan" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/3 border border-white/5">
                  <Icon size={14} className="text-red-500 flex-shrink-0" />
                  <span className="text-white/60 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, i) => (
            <motion.div key={val.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-300 text-center group"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/20 transition-colors">
                <val.icon size={20} className="text-red-500" />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{val.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
