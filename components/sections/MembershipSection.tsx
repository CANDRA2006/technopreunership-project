"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Crown, MessageCircle } from "lucide-react"

const plans = [
  {
    name: "User Umum",
    icon: "🔧",
    badge: "Gratis",
    features: ["Lihat katalog produk", "Chat customer service", "Booking service reguler", "Akses informasi layanan"],
    color: "border-white/10",
    buttonStyle: "bg-white/5 hover:bg-white/10 border border-white/10 text-white",
  },
  {
    name: "Member Premium",
    icon: "⭐",
    badge: "Premium",
    features: ["Prioritas antrean servis", "Layanan Home Service", "Emergency Service 24 Jam", "Diskon khusus member", "Konsultasi kendaraan gratis", "Notifikasi jadwal servis"],
    color: "border-red-500/40",
    buttonStyle: "bg-red-600 hover:bg-red-700 text-white",
    highlight: true,
  },
]

export function MembershipSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="section-padding bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <Crown size={28} className="text-yellow-500 mx-auto mb-4" />
          <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-3 block">Bergabunglah bersama kami</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>MEMBERSHIP</h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">Nikmati berbagai keuntungan eksklusif dengan bergabung sebagai member Bengkel Harun.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl border p-7 transition-all duration-500 ${plan.color} ${plan.highlight ? "shadow-xl shadow-red-500/10" : ""}`}
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-4 py-1 rounded-full font-medium tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="text-3xl mb-3">{plan.icon}</div>
              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full mb-5 inline-block ${plan.highlight ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/50"}`}>
                {plan.badge}
              </span>
              <ul className="space-y-3 mb-7">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-red-500/20" : "bg-white/10"}`}>
                      <Check size={10} className={plan.highlight ? "text-red-400" : "text-white/50"} />
                    </div>
                    <span className="text-white/70 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/6282329661815?text=${encodeURIComponent("Halo Bengkel Harun, saya ingin mendaftar Membership.")}`}
                target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${plan.buttonStyle}`}
              >
                <MessageCircle size={15} />
                <span>Daftar Membership</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
