"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { MessageCircle, ArrowRight } from "lucide-react"

export function CatalogPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const preview = products.slice(0, 4)

  return (
    <section ref={ref} className="section-padding" style={{ background: "linear-gradient(180deg, #000 0%, #080000 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-3 block">Aksesori & Sparepart</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>KATALOG PRODUK</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <Link href="/katalog" className="hidden sm:flex items-center space-x-2 text-red-500 hover:text-red-400 text-sm font-medium transition-colors group">
              <span>Lihat Semua</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/20 transition-all duration-500 hover:-translate-y-2"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600/90 text-white text-xs px-2 py-0.5 rounded capitalize">{product.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2">{product.description}</p>
                <div className="mb-3">
                  <span className="text-red-400 font-bold text-sm">{formatPrice(product.price)}</span>
                </div>
                <a
                  href={`https://wa.me/6282329661815?text=${encodeURIComponent(`Halo Bengkel Harun, saya ingin memesan ${product.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 w-full bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 text-white py-2 rounded-lg text-xs font-medium transition-all duration-300"
                >
                  <MessageCircle size={13} />
                  <span>Pesan via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="text-center mt-10">
          <Link href="/katalog"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5">
            <span>Lihat Semua Produk</span>
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
