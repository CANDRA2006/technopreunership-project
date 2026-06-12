"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Navigation, Copy, ExternalLink, Clock } from "lucide-react"

export function MapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const address = "Duwet Barat, Duwet, Kec. Bojong, Kabupaten Pekalongan, Jawa Tengah 51156"
  const lat = -6.976155507303177
  const lng = 109.6043646358384

  const copyAddress = () => {
    navigator.clipboard.writeText(address).catch(() => {})
  }

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`

  return (
    <section ref={ref} className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block">Temukan Kami</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>LOKASI KAMI</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
            className="space-y-4">
            <div className="p-5 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-start space-x-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Alamat Bengkel</p>
                  <p className="text-white/50 text-xs leading-relaxed">{address}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-medium transition-colors">
                  <ExternalLink size={13} /><span>Buka Google Maps</span>
                </a>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl text-xs font-medium transition-colors">
                  <Navigation size={13} /><span>Dapatkan Rute</span>
                </a>
                <button onClick={copyAddress}
                  className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl text-xs font-medium transition-colors">
                  <Copy size={13} /><span>Salin Alamat</span>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center space-x-2 mb-3">
                <Clock size={14} className="text-red-500" />
                <p className="text-white font-semibold text-sm">Jam Operasional</p>
              </div>
              {[
                { day: "Senin – Jumat", time: "08.00 – 17.00 WIB", active: true },
                { day: "Sabtu", time: "08.00 – 15.00 WIB", active: true },
                { day: "Minggu", time: "Tutup", active: false },
                { day: "Darurat 24 Jam", time: "via WhatsApp", emergency: true },
              ].map(({ day, time, active, emergency }) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/50 text-xs">{day}</span>
                  <span className={`text-xs font-medium ${emergency ? "text-red-400" : active ? "text-white/80" : "text-white/30"}`}>{time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/5" style={{ minHeight: 380 }}>
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Bengkel Harun"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
