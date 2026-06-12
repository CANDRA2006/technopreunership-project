"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wrench, Settings, Droplets, Cog, Home, ArrowRight, Clock, MessageCircle } from "lucide-react"
import { services } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  wrench: Wrench, settings: Settings, droplets: Droplets, cog: Cog, home: Home
}

export function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block">Apa yang kami tawarkan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            LAYANAN KAMI
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Dari servis rutin hingga perbaikan besar, kami siap memberikan solusi terbaik untuk kendaraan Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Wrench
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  service.highlight
                    ? "border-red-500/40 shadow-lg shadow-red-500/10"
                    : "border-white/5 hover:border-red-500/20"
                }`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {service.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                )}
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Clock size={11} className="text-red-400" />
                      <span className="text-white/80 text-xs">{service.duration}</span>
                    </div>
                  </div>
                  {service.highlight && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                      Populer
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Icon size={18} className="text-red-500" />
                    </div>
                    <span className="text-red-400 text-xs font-medium">{service.price}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{service.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                  <a
                    href={`https://wa.me/6282329661815?text=${encodeURIComponent(`Halo Bengkel Harun, saya ingin booking layanan ${service.name}.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group/btn"
                  >
                    <MessageCircle size={15} />
                    <span>Booking via WhatsApp</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
