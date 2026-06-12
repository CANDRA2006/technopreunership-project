"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { portfolioItems } from "@/lib/data"
import { X, ZoomIn } from "lucide-react"

const categories = [
  { key: "all", label: "Semua" },
  { key: "mesin", label: "Service Mesin" },
  { key: "modifikasi", label: "Modifikasi" },
  { key: "body", label: "Body Repair" },
  { key: "detailing", label: "Detailing" },
]

export function PortfolioSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxItem, setLightboxItem] = useState<typeof portfolioItems[0] | null>(null)

  const filtered = activeCategory === "all" ? portfolioItems : portfolioItems.filter(i => i.category === activeCategory)

  return (
    <section ref={ref} className="section-padding" style={{ background: "linear-gradient(180deg, #000 0%, #050505 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block">Hasil Pekerjaan Kami</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>PORTOFOLIO</h2>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat.key ? "bg-red-600 text-white shadow-lg shadow-red-500/20" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-red-500/30 transition-all duration-300"
                onClick={() => setLightboxItem(item)}
              >
                <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={24} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-xs">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img src={lightboxItem.image} alt={lightboxItem.title} className="w-full" />
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}>
                <h3 className="text-white font-bold text-base">{lightboxItem.title}</h3>
                <p className="text-white/60 text-sm">{lightboxItem.description}</p>
              </div>
              <button onClick={() => setLightboxItem(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
