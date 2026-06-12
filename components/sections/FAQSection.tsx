"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { faqs } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={ref} className="section-padding" style={{ background: "linear-gradient(180deg, #000 0%, #050505 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <span className="text-red-500 text-xs font-medium tracking-widest uppercase mb-4 block">Pertanyaan Umum</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>FAQ</h2>
          <p className="text-white/50 text-base">Temukan jawaban dari pertanyaan yang sering diajukan.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span className="text-white font-medium text-sm pr-4 group-hover:text-red-400 transition-colors">{faq.question}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                  <ChevronDown size={16} className={`transition-colors ${open === i ? "text-red-500" : "text-white/40"}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-white/5">
                      <p className="text-white/55 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
