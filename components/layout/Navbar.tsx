"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, User, LogOut, Settings, BookOpen, Sun, Moon } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import type { User as UserType } from "@/lib/auth"

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setProfileOpen(false)
    window.location.reload()
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image src="/images/logo.png" alt="Bengkel Harun" fill className="object-contain" priority />
              </div>
              <div className="ml-3 hidden sm:block">
                <div className="text-white font-bold text-sm tracking-wider uppercase" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>
                  BENGKEL <span className="text-red-500">HARUN</span>
                </div>
                <div className="text-white/40 text-xs tracking-widest">Pekalongan</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-white/70 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-white/60 hover:text-white transition-colors">
                <Search size={18} />
              </button>

              {user ? (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 px-3 py-2 rounded-lg transition-colors">
                    <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.namaLengkap.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm hidden sm:block truncate max-w-24">{user.namaLengkap.split(" ")[0]}</span>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50"
                        style={{background:"rgba(10,10,10,0.95)",backdropFilter:"blur(20px)"}}>
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white font-medium text-sm">{user.namaLengkap}</p>
                          <p className="text-white/50 text-xs">{user.email}</p>
                        </div>
                        {[
                          { icon: User, label: "Profil Saya", href: "/" },
                          { icon: BookOpen, label: "Riwayat Booking", href: "/" },
                        ].map(({ icon: Icon, label, href }) => (
                          <Link key={label} href={href} onClick={() => setProfileOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm">
                            <Icon size={15} /><span>{label}</span>
                          </Link>
                        ))}
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm">
                          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                          <span>{theme === "dark" ? "Mode Terang" : "Mode Gelap"}</span>
                        </button>
                        <button onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm border-t border-white/10">
                          <LogOut size={15} /><span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth"
                  className="hidden sm:flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30">
                  <User size={15} /><span>Login</span>
                </Link>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/70 hover:text-white transition-colors">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-black/90 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <input type="text" placeholder="Cari layanan, produk, informasi..." autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-red-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-black border-l border-white/10 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Image src="/images/logo.png" alt="Bengkel Harun" width={40} height={40} className="object-contain" />
                  <div className="text-white font-bold text-sm tracking-wider">
                    BENGKEL <span className="text-red-500">HARUN</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
              </div>
              <div className="flex-1 px-6 py-8 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className="block py-3 text-white/70 hover:text-white text-lg font-medium tracking-wider uppercase transition-colors border-b border-white/5">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-white/10">
                {user ? (
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-lg text-sm transition-colors">
                    <LogOut size={15} /><span>Logout</span>
                  </button>
                ) : (
                  <Link href="/auth" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-medium transition-colors">
                    <User size={16} /><span>Login / Register</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {profileOpen && <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />}
    </>
  )
}
