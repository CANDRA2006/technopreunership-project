"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Loader2 } from "lucide-react"

interface Message { role: "user" | "assistant"; content: string }

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Bengkel Harun, bengkel mobil profesional di Pekalongan, Jawa Tengah. Jawab dengan ramah, singkat, dan informatif dalam Bahasa Indonesia.

Info Bengkel Harun:
- Nama: Bengkel Harun
- Lokasi: Duwet Barat, Duwet, Kec. Bojong, Kab. Pekalongan, Jawa Tengah 51156
- WhatsApp: +6282329661815
- Jam Operasional: Senin-Sabtu 08.00-17.00 WIB
- Layanan Darurat: 24 Jam via WhatsApp
- Layanan: Service Berkala, Tune Up, Ganti Oli, Perbaikan Mesin, Home Service
- Membership: User Umum (booking reguler, katalog, chat CS) dan Premium (prioritas antrean, Home Service, Emergency 24 jam)

Selalu arahkan untuk booking via WhatsApp +6282329661815. Jawab pertanyaan seputar otomotif secara umum dengan pengetahuan teknis yang benar.`

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Halo! Saya asisten virtual Bengkel Harun. Ada yang bisa saya bantu hari ini? 🔧" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: [...messages.slice(-6), { role: "user", content: userMsg }].map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "Maaf, saya tidak bisa menjawab saat ini. Silakan hubungi kami via WhatsApp."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Maaf terjadi gangguan. Hubungi kami via WhatsApp +6282329661815 ya! 😊" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)", width: 320, height: 440 }}
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #E31E24 0%, #b01419 100%)" }}>
              <div className="flex items-center space-x-2">
                <Bot size={18} className="text-white" />
                <div>
                  <p className="text-white font-semibold text-sm">AI Assistant</p>
                  <p className="text-red-200 text-xs">Bengkel Harun</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm">
                    <Loader2 size={16} className="text-white/60 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-red-500"
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-40 flex items-center justify-center text-white transition-colors">
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl relative"
          style={{ background: "linear-gradient(135deg, #E31E24, #b01419)", boxShadow: "0 0 20px rgba(227,30,36,0.4)" }}>
          <Bot size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black text-xs flex items-center justify-center text-white font-bold">AI</span>
        </motion.button>
      )}
    </div>
  )
}
