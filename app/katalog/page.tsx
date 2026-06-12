"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { MessageCircle, Search, SlidersHorizontal } from "lucide-react"

const categories = [
  { key: "all", label: "Semua" },
  { key: "aksesori", label: "Aksesori" },
  { key: "sparepart", label: "Suku Cadang" },
  { key: "modifikasi", label: "Bahan Modifikasi" },
]

export default function KatalogPage() {
  const [cat, setCat] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = products.filter(p =>
    (cat === "all" || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-500 text-xs font-medium tracking-widest uppercase block mb-3">Produk Tersedia</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>KATALOG PRODUK</h1>
            <p className="text-white/50 max-w-xl mx-auto text-sm">Aksesori, suku cadang, dan bahan modifikasi berkualitas untuk kendaraan Anda.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..."
              className="w-full bg-white/5 border border-white/10 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 outline-none transition-colors" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${cat === c.key ? "bg-red-600 text-white" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs mb-6">{filtered.length} produk ditemukan</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="group rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/20 transition-all duration-500 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="relative h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 bg-red-600/90 text-white text-xs px-2 py-0.5 rounded capitalize">{product.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-white/40 text-xs mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-400 font-bold text-sm">{formatPrice(product.price)}</span>
                </div>
                <a href={`https://wa.me/6282329661815?text=${encodeURIComponent(`Halo Bengkel Harun, saya ingin memesan ${product.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 w-full bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 text-white py-2.5 rounded-xl text-xs font-medium transition-all duration-300">
                  <MessageCircle size={13} /><span>Pesan via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-base">Produk tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
