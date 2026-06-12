"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone,
  CheckCircle2, RefreshCw, ShieldCheck, KeyRound, AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  registerPending, verifyUserEmail, login,
  resetPassword, emailExists,
} from "@/lib/auth"
import {
  generateOTP, saveOTP, verifyOTP, consumeOTP,
  getOTPTimeLeft, sendOTPEmail,
} from "@/lib/otp"

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "login" | "register" | "forgot"
type Step =
  | "form"          // login / register form utama
  | "verify-email"  // masukkan OTP setelah register
  | "forgot-email"  // masukkan email untuk reset
  | "forgot-otp"    // masukkan OTP reset
  | "new-password"  // masukkan password baru

// ─── Sub-component: OTP Input ─────────────────────────────────────────────────
function OTPInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const digits = Array.from({ length: 6 })

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      const el = document.getElementById(`otp-${idx - 1}`) as HTMLInputElement
      el?.focus()
    }
  }

  const handleChange = (v: string, idx: number) => {
    if (!/^\d*$/.test(v)) return
    const arr = value.padEnd(6, " ").split("")
    arr[idx] = v.slice(-1)
    const next = arr.join("").trimEnd()
    onChange(next)
    if (v && idx < 5) {
      const el = document.getElementById(`otp-${idx + 1}`) as HTMLInputElement
      el?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(e.target.value, i)}
          onKeyDown={e => handleKey(e, i)}
          className={`w-11 h-12 text-center text-white text-lg font-bold rounded-xl border outline-none transition-all duration-200
            ${value[i]
              ? "bg-red-600/20 border-red-500 shadow-[0_0_12px_rgba(227,30,36,0.3)]"
              : "bg-white/5 border-white/15 focus:border-red-500 focus:bg-red-500/5"
            }`}
        />
      ))}
    </div>
  )
}

// ─── Sub-component: Countdown ─────────────────────────────────────────────────
function Countdown({
  email,
  purpose,
  onExpire,
}: {
  email: string
  purpose: "register" | "forgot"
  onExpire: () => void
}) {
  const [secs, setSecs] = useState(() => getOTPTimeLeft(email, purpose))

  useEffect(() => {
    if (secs <= 0) { onExpire(); return }
    const t = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(t); onExpire(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [email, purpose, secs, onExpire])

  const m = Math.floor(secs / 60).toString().padStart(2, "0")
  const s = (secs % 60).toString().padStart(2, "0")

  return (
    <span className={`font-mono font-bold tabular-nums ${secs < 60 ? "text-red-400" : "text-white/70"}`}>
      {m}:{s}
    </span>
  )
}

// ─── Reusable field ───────────────────────────────────────────────────────────
function Field({
  label, icon: Icon, type = "text", value, onChange, placeholder, required, extra,
}: {
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  extra?: React.ReactNode
}) {
  const [show, setShow] = useState(false)
  const isPass = type === "password"

  return (
    <div>
      <label className="text-white/60 text-xs block mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type={isPass ? (show ? "text" : "password") : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-white/5 border border-white/10 focus:border-red-500 rounded-xl pl-9 pr-10 py-2.5 text-white text-sm placeholder:text-white/25 outline-none transition-colors"
        />
        {isPass && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
        {extra && <div className="absolute right-3 top-1/2 -translate-y-1/2">{extra}</div>}
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "error" | "success" | "info" }) {
  const colors = {
    error:   "bg-red-500/10 border-red-500/30 text-red-400",
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    info:    "bg-blue-500/10 border-blue-500/30 text-blue-400",
  }
  const Icon = type === "error" ? AlertCircle : type === "success" ? CheckCircle2 : ShieldCheck
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`flex items-start gap-2 rounded-xl px-3 py-2.5 border text-xs ${colors[type]}`}
    >
      <Icon size={14} className="mt-0.5 flex-shrink-0" />
      <span>{msg}</span>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const router = useRouter()

  // ── mode / step
  const [mode, setMode]   = useState<Mode>("login")
  const [step, setStep]   = useState<Step>("form")

  // ── form fields
  const [nama,    setNama]    = useState("")
  const [email,   setEmail]   = useState("")
  const [wa,      setWa]      = useState("")
  const [pass,    setPass]    = useState("")
  const [confirm, setConfirm] = useState("")
  const [remember,setRemember]= useState(false)

  // ── forgot
  const [forgotEmail, setForgotEmail] = useState("")

  // ── OTP
  const [otp,     setOtp]     = useState("")
  const [expired, setExpired] = useState(false)

  // ── new password
  const [newPass,   setNewPass]   = useState("")
  const [newConfirm,setNewConfirm]= useState("")

  // ── UI state
  const [loading,  setLoading]  = useState(false)
  const [toast,    setToast]    = useState<{ msg: string; type: "error"|"success"|"info" } | null>(null)

  // ── clear toast after 4s
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const notify = (msg: string, type: "error"|"success"|"info" = "error") =>
    setToast({ msg, type })

  // ─── Send OTP helper ────────────────────────────────────────────────────────
  const sendOtp = async (targetEmail: string, toName: string, purpose: "register"|"forgot") => {
    const code = generateOTP()
    saveOTP(targetEmail, code, purpose)
    setExpired(false)
    setOtp("")

    const res = await sendOTPEmail({ toEmail: targetEmail, toName, otpCode: code, purpose })
    if (!res.success) {
      notify(`Gagal kirim email: ${res.error}. Cek konsol untuk kode OTP (dev mode).`, "info")
    }
    return code
  }

  // ─── REGISTER: step 1 — submit form ────────────────────────────────────────
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pass !== confirm) { notify("Password tidak cocok."); return }
    if (pass.length < 6)  { notify("Password minimal 6 karakter."); return }

    setLoading(true)
    const { alreadyExists } = registerPending({
      namaLengkap: nama, email, whatsapp: wa, password: pass,
    })
    if (alreadyExists) {
      notify("Email sudah terdaftar. Silakan login.")
      setLoading(false)
      return
    }
    await sendOtp(email, nama, "register")
    setLoading(false)
    setStep("verify-email")
    notify(`Kode OTP dikirim ke ${email}. Berlaku 5 menit.`, "info")
  }

  // ─── REGISTER: step 2 — verify OTP ─────────────────────────────────────────
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) { notify("Masukkan 6 digit kode OTP."); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 400))

    const result = verifyOTP(email, otp, "register")
    if (result === "expired") {
      notify("Kode OTP sudah kedaluwarsa. Kirim ulang.", "error")
      setLoading(false)
      return
    }
    if (result === "invalid") {
      notify("Kode OTP salah.")
      setLoading(false)
      return
    }

    consumeOTP(email, "register")
    verifyUserEmail(email)
    setLoading(false)
    notify("Email berhasil diverifikasi! Selamat datang.", "success")
    setTimeout(() => router.push("/"), 1200)
  }

  // ─── REGISTER: resend OTP ──────────────────────────────────────────────────
  const handleResendRegister = async () => {
    setLoading(true)
    await sendOtp(email, nama, "register")
    setLoading(false)
    notify(`Kode baru dikirim ke ${email}.`, "info")
  }

  // ─── LOGIN ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    const { user, reason } = login(email, pass, remember)
    if (!user) {
      const msg =
        reason === "not_found"     ? "Email tidak terdaftar." :
        reason === "not_verified"  ? "Email belum diverifikasi. Daftar ulang untuk mendapat OTP." :
        "Password salah."
      notify(msg)
      setLoading(false)
      return
    }
    notify("Login berhasil! Mengalihkan...", "success")
    setTimeout(() => router.push("/"), 800)
    setLoading(false)
  }

  // ─── FORGOT: step 1 — masukkan email ───────────────────────────────────────
  const handleForgotEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailExists(forgotEmail)) {
      notify("Email tidak terdaftar.")
      return
    }
    setLoading(true)
    await sendOtp(forgotEmail, forgotEmail, "forgot")
    setLoading(false)
    setStep("forgot-otp")
    notify(`Kode OTP dikirim ke ${forgotEmail}. Berlaku 5 menit.`, "info")
  }

  // ─── FORGOT: step 2 — verify OTP ───────────────────────────────────────────
  const handleForgotOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) { notify("Masukkan 6 digit kode OTP."); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 400))

    const result = verifyOTP(forgotEmail, otp, "forgot")
    if (result === "expired") { notify("Kode OTP kedaluwarsa. Kirim ulang."); setLoading(false); return }
    if (result === "invalid") { notify("Kode OTP salah."); setLoading(false); return }

    // jangan consume dulu, consume setelah reset berhasil
    setLoading(false)
    setStep("new-password")
  }

  // ─── FORGOT: step 3 — new password ─────────────────────────────────────────
  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPass.length < 6)      { notify("Password minimal 6 karakter."); return }
    if (newPass !== newConfirm)   { notify("Konfirmasi password tidak cocok."); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 500))

    const ok = resetPassword(forgotEmail, newPass)
    if (!ok) { notify("Gagal reset password. Coba lagi."); setLoading(false); return }
    consumeOTP(forgotEmail, "forgot")
    setLoading(false)
    notify("Password berhasil direset! Silakan login.", "success")
    setTimeout(() => {
      setMode("login")
      setStep("form")
      setForgotEmail("")
      setOtp("")
      setNewPass("")
      setNewConfirm("")
    }, 1200)
  }

  // ─── FORGOT: resend ────────────────────────────────────────────────────────
  const handleResendForgot = async () => {
    setLoading(true)
    await sendOtp(forgotEmail, forgotEmail, "forgot")
    setLoading(false)
    notify(`Kode baru dikirim ke ${forgotEmail}.`, "info")
  }

  // ─── Reset all when switching mode ─────────────────────────────────────────
  const switchMode = (m: Mode) => {
    setMode(m)
    setStep("form")
    setToast(null)
    setOtp("")
    setPass("")
    setConfirm("")
    setNewPass("")
    setNewConfirm("")
    setForgotEmail("")
  }

  // ──────────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617153088612-9e4c5a2a4cdc?w=1920&q=80"
          alt="bg" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.96) 0%,rgba(20,0,0,0.92) 100%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center space-x-2 text-white/40 hover:text-white text-xs mb-5 transition-colors">
            <ArrowLeft size={13} /><span>Kembali ke Beranda</span>
          </Link>
          <div className="flex justify-center mb-3">
            <Image src="/images/logo.png" alt="Bengkel Harun" width={64} height={64} className="object-contain" />
          </div>
          <p className="text-white font-bold tracking-wider text-lg" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
            BENGKEL <span className="text-red-500">HARUN</span>
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: "rgba(7,7,7,0.97)", backdropFilter: "blur(24px)" }}
        >
          {/* Tabs — hanya tampil di step form */}
          {step === "form" && mode !== "forgot" && (
            <div className="flex border-b border-white/8">
              {(["login", "register"] as const).map(m => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`flex-1 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                    mode === m ? "text-white border-b-2 border-red-500" : "text-white/35 hover:text-white/60"
                  }`}>
                  {m === "login" ? "Masuk" : "Daftar"}
                </button>
              ))}
            </div>
          )}

          {/* Stepped header */}
          {(step !== "form" || mode === "forgot") && (
            <div className="px-6 pt-5 pb-1 flex items-center gap-3">
              <button
                onClick={() => {
                  if (step === "forgot-otp")   { setStep("forgot-email"); setOtp("") }
                  else if (step === "new-password") setStep("forgot-otp")
                  else if (step === "verify-email") { setStep("form"); setOtp("") }
                  else if (mode === "forgot")  switchMode("login")
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <p className="text-white font-semibold text-sm">
                {step === "verify-email"  && "Verifikasi Email"}
                {step === "forgot-email"  && "Lupa Password"}
                {step === "forgot-otp"    && "Masukkan Kode OTP"}
                {step === "new-password"  && "Buat Password Baru"}
              </p>
            </div>
          )}

          <div className="p-6 pt-4">
            {/* Toast */}
            <AnimatePresence>
              {toast && (
                <div className="mb-4">
                  <Toast msg={toast.msg} type={toast.type} />
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">

              {/* ══════════════════════════════════════════
                  LOGIN FORM
              ══════════════════════════════════════════ */}
              {mode === "login" && step === "form" && (
                <motion.form key="login" initial={{ opacity:0,x:-15 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleLogin} className="space-y-4">
                  <Field label="Email" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="nama@email.com" required />
                  <Field label="Password" icon={Lock} type="password" value={pass} onChange={setPass} placeholder="••••••••" required />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-red-500 w-3.5 h-3.5" />
                      <span className="text-white/50 text-xs">Ingat Saya</span>
                    </label>
                    <button type="button" onClick={() => { setStep("forgot-email"); setMode("forgot") }}
                      className="text-red-500 hover:text-red-400 text-xs transition-colors">
                      Lupa Password?
                    </button>
                  </div>
                  <SubmitBtn loading={loading} label="Masuk" />
                </motion.form>
              )}

              {/* ══════════════════════════════════════════
                  REGISTER FORM
              ══════════════════════════════════════════ */}
              {mode === "register" && step === "form" && (
                <motion.form key="register" initial={{ opacity:0,x:15 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <Field label="Nama Lengkap" icon={User} value={nama} onChange={setNama} placeholder="Nama lengkap" required />
                  <Field label="Email" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="nama@email.com" required />
                  <Field label="Nomor WhatsApp" icon={Phone} value={wa} onChange={setWa} placeholder="08xxxxxxxxxx" required />
                  <Field label="Password" icon={Lock} type="password" value={pass} onChange={setPass} placeholder="Minimal 6 karakter" required />
                  <Field label="Konfirmasi Password" icon={Lock} type="password" value={confirm} onChange={setConfirm} placeholder="Ulangi password" required />
                  <SubmitBtn loading={loading} label="Daftar & Kirim OTP" />
                  <p className="text-white/30 text-center text-xs pt-1">
                    Kode verifikasi akan dikirim ke email Anda
                  </p>
                </motion.form>
              )}

              {/* ══════════════════════════════════════════
                  VERIFY EMAIL (register OTP)
              ══════════════════════════════════════════ */}
              {step === "verify-email" && (
                <motion.form key="verify" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleVerifyOTP} className="space-y-5">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
                      <Mail size={24} className="text-red-500" />
                    </div>
                    <p className="text-white/70 text-sm">Kami mengirim kode ke</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{email}</p>
                  </div>

                  <OTPInput value={otp} onChange={setOtp} />

                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="text-white/40">Berlaku:</span>
                    {expired ? (
                      <span className="text-red-400 font-semibold">Kedaluwarsa</span>
                    ) : (
                      <Countdown email={email} purpose="register" onExpire={() => setExpired(true)} />
                    )}
                  </div>

                  <SubmitBtn loading={loading} label="Verifikasi" disabled={otp.length < 6} />

                  <button type="button" onClick={handleResendRegister} disabled={loading || !expired}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs text-white/50 hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/8 hover:border-white/15">
                    <RefreshCw size={13} /><span>Kirim Ulang Kode</span>
                  </button>
                </motion.form>
              )}

              {/* ══════════════════════════════════════════
                  FORGOT — step 1: masukkan email
              ══════════════════════════════════════════ */}
              {mode === "forgot" && step === "forgot-email" && (
                <motion.form key="forgot-email" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleForgotEmailSubmit} className="space-y-4">
                  <p className="text-white/55 text-sm text-center leading-relaxed">
                    Masukkan email terdaftar. Kami akan kirim kode verifikasi untuk reset password.
                  </p>
                  <Field label="Email Terdaftar" icon={Mail} type="email" value={forgotEmail}
                    onChange={setForgotEmail} placeholder="nama@email.com" required />
                  <SubmitBtn loading={loading} label="Kirim Kode OTP" />
                </motion.form>
              )}

              {/* ══════════════════════════════════════════
                  FORGOT — step 2: OTP
              ══════════════════════════════════════════ */}
              {step === "forgot-otp" && (
                <motion.form key="forgot-otp" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleForgotOTP} className="space-y-5">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck size={24} className="text-orange-400" />
                    </div>
                    <p className="text-white/70 text-sm">Kode dikirim ke</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{forgotEmail}</p>
                  </div>

                  <OTPInput value={otp} onChange={setOtp} />

                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="text-white/40">Berlaku:</span>
                    {expired ? (
                      <span className="text-red-400 font-semibold">Kedaluwarsa</span>
                    ) : (
                      <Countdown email={forgotEmail} purpose="forgot" onExpire={() => setExpired(true)} />
                    )}
                  </div>

                  <SubmitBtn loading={loading} label="Verifikasi Kode" disabled={otp.length < 6} />

                  <button type="button" onClick={handleResendForgot} disabled={loading || !expired}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs text-white/50 hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/8 hover:border-white/15">
                    <RefreshCw size={13} /><span>Kirim Ulang Kode</span>
                  </button>
                </motion.form>
              )}

              {/* ══════════════════════════════════════════
                  FORGOT — step 3: password baru
              ══════════════════════════════════════════ */}
              {step === "new-password" && (
                <motion.form key="new-pass" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  transition={{ duration:0.25 }} onSubmit={handleNewPassword} className="space-y-4">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <KeyRound size={24} className="text-green-400" />
                    </div>
                    <p className="text-white/60 text-sm">Buat password baru untuk akun</p>
                    <p className="text-white font-semibold text-xs mt-0.5 truncate">{forgotEmail}</p>
                  </div>
                  <Field label="Password Baru" icon={Lock} type="password" value={newPass}
                    onChange={setNewPass} placeholder="Minimal 6 karakter" required />
                  <Field label="Konfirmasi Password" icon={Lock} type="password" value={newConfirm}
                    onChange={setNewConfirm} placeholder="Ulangi password baru" required />
                  <SubmitBtn loading={loading} label="Simpan Password Baru" />
                </motion.form>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Step indicator */}
        {(step === "verify-email" || step === "forgot-otp" || step === "new-password") && (
          <div className="flex justify-center gap-2 mt-4">
            {(step === "verify-email"
              ? [true, true, false]
              : step === "forgot-otp"
              ? [true, true, false]
              : [true, true, true]
            ).map((active, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${active ? "w-8 bg-red-500" : "w-4 bg-white/15"}`} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─── Submit button ────────────────────────────────────────────────────────────
function SubmitBtn({ loading, label, disabled }: { loading: boolean; label: string; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 mt-1"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Memproses...
        </span>
      ) : label}
    </button>
  )
}
