"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, MessageCircle, Share2, Tv, Radio } from "lucide-react"

const footerLinks = {
  layanan: [
    { label: "Service Berkala", href: "/layanan" },
    { label: "Tune Up", href: "/layanan" },
    { label: "Ganti Oli", href: "/layanan" },
    { label: "Perbaikan Mesin", href: "/layanan" },
    { label: "Home Service", href: "/layanan" },
  ],
  menu: [
    { label: "Beranda", href: "/" },
    { label: "Katalog", href: "/katalog" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-14 h-14">
                <Image src="/images/logo.png" alt="Bengkel Harun" fill className="object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  BENGKEL <span className="text-red-500">HARUN</span>
                </div>
                <div className="text-white/40 text-xs">Solusi Terpercaya</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Bengkel mobil profesional di Pekalongan. Melayani servis, perawatan, dan modifikasi kendaraan dengan teknisi berpengalaman.
            </p>
            <div className="flex items-center space-x-3">
              {[
                { icon: Share2, href: "#", label: "Instagram" },
                { icon: Radio, href: "#", label: "Facebook" },
                { icon: Tv, href: "#", label: "YouTube" },
                { icon: MessageCircle, href: "https://wa.me/6282329661815", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 flex items-center justify-center text-white/50 hover:text-red-400 transition-all duration-300"
                  title={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center">
              <span className="w-6 h-px bg-red-500 mr-3 inline-block" />
              Layanan
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-300 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center">
              <span className="w-6 h-px bg-red-500 mr-3 inline-block" />
              Menu
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-300 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center">
              <span className="w-6 h-px bg-red-500 mr-3 inline-block" />
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">Duwet Barat, Duwet, Kec. Bojong, Kab. Pekalongan, Jawa Tengah 51156</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={15} className="text-red-500 flex-shrink-0" />
                <a href="https://wa.me/6282329661815" className="text-white/50 hover:text-white text-sm transition-colors">+62 823 2966 1815</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={15} className="text-red-500 flex-shrink-0" />
                <a href="mailto:info@bengkelharun.com" className="text-white/50 hover:text-white text-sm transition-colors">info@bengkelharun.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-white/50 text-sm">
                  <p>Senin – Sabtu: 08.00 – 17.00 WIB</p>
                  <p className="text-red-400">Darurat: 24 Jam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Bengkel Harun. Semua Hak Dilindungi.
          </p>
          <div className="flex items-center space-x-6">
            {[
              { label: "Beranda", href: "/" },
              { label: "Pesanan", href: "/katalog" },
              { label: "Akun", href: "/auth" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-white/30 hover:text-white/70 text-xs transition-colors">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
