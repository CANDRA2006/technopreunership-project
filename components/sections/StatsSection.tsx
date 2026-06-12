"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Car, Clock, Star, Users } from "lucide-react"

const stats = [
  { icon: Car, value: 500, suffix: "+", label: "Mobil Ditangani", desc: "Kendaraan berhasil diservice" },
  { icon: Clock, value: 2, suffix: "+", label: "Tahun Pengalaman", desc: "Melayani dengan dedikasi" },
  { icon: Star, value: 98, suffix: "%", label: "Kepuasan Pelanggan", desc: "Rating tertinggi di Pekalongan" },
  { icon: Users, value: 300, suffix: "+", label: "Pelanggan Setia", desc: "Mempercayai layanan kami" },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #0a0000 50%, #000 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all duration-500 group overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-red-500" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-white/40 text-xs">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
