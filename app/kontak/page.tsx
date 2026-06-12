"use client"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle, Headphones } from "lucide-react"
import { FAQSection } from "@/components/sections/FAQSection"
import { ChatbotWidget } from "@/components/common/ChatbotWidget"

const contactCards = [
  {
    icon: MessageCircle, title: "Layanan", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20",
    items: [
      { label: "WhatsApp", value: "+62 823 2966 1815", href: "https://wa.me/6282329661815" },
      { label: "Booking Service", value: "via WhatsApp", href: "https://wa.me/6282329661815?text=Saya%20ingin%20booking%20service" },
    ]
  },
  {
    icon: AlertTriangle, title: "Darurat", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20",
    items: [
      { label: "Emergency 24 Jam", value: "+62 823 2966 1815", href: "https://wa.me/6282329661815?text=Darurat%21%20Butuh%20bantuan." },
      { label: "Respon Cepat", value: "< 15 Menit", href: "#" },
    ]
  },
  {
    icon: Headphones, title: "Customer Service", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20",
    items: [
      { label: "Email", value: "info@bengkelharun.com", href: "mailto:info@bengkelharun.com" },
      { label: "Chat CS", value: "via WhatsApp", href: "https://wa.me/6282329661815" },
    ]
  },
]

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-black/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase block mb-3">Hubungi Kami</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>KONTAK</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {contactCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${card.bg} transition-all`}>
              <div className={`w-10 h-10 rounded-xl ${card.bg} border flex items-center justify-center mb-4`}>
                <card.icon size={18} className={card.color} />
              </div>
              <h3 className="text-white font-bold text-base mb-4">{card.title}</h3>
              {card.items.map(item => (
                <div key={item.label} className="mb-3">
                  <p className="text-white/40 text-xs mb-0.5">{item.label}</p>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className={`${card.color} hover:opacity-80 text-sm font-medium transition-opacity`}>{item.value}</a>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: MapPin, label: "Alamat", value: "Duwet Barat, Duwet, Kec. Bojong, Kab. Pekalongan 51156" },
            { icon: Phone, label: "Telepon", value: "+62 823 2966 1815" },
            { icon: Mail, label: "Email", value: "info@bengkelharun.com" },
            { icon: Clock, label: "Jam Buka", value: "Sen–Sab: 08.00–17.00 WIB" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4 rounded-xl border border-white/5 flex items-start space-x-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <Icon size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div><p className="text-white/40 text-xs mb-0.5">{label}</p><p className="text-white text-sm">{value}</p></div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <a href="https://wa.me/6282329661815" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5">
            <MessageCircle size={18} /><span>Chat Sekarang di WhatsApp</span>
          </a>
        </div>
      </div>

      <FAQSection />
      <ChatbotWidget />
    </div>
  )
}
