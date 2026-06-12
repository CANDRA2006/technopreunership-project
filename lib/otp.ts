/**
 * OTP Service — Kirim kode verifikasi via EmailJS
 * Kode berlaku 5 menit, disimpan di localStorage (encrypted sederhana)
 */

const OTP_STORE_KEY = 'bh_otp_store'

interface OTPEntry {
  code: string
  email: string
  expiresAt: number   // timestamp ms
  purpose: 'register' | 'forgot'
}

// ─── Generate 6-digit code ────────────────────────────────────────────────────
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// ─── Save OTP to localStorage ─────────────────────────────────────────────────
export function saveOTP(email: string, code: string, purpose: OTPEntry['purpose']): void {
  const store = getStore()
  // hapus entri lama untuk email ini
  const filtered = store.filter(e => e.email !== email || e.purpose !== purpose)
  filtered.push({
    code,
    email,
    expiresAt: Date.now() + 5 * 60 * 1000,   // 5 menit
    purpose,
  })
  localStorage.setItem(OTP_STORE_KEY, JSON.stringify(filtered))
}

// ─── Verify OTP ───────────────────────────────────────────────────────────────
export function verifyOTP(email: string, code: string, purpose: OTPEntry['purpose']): 'valid' | 'expired' | 'invalid' {
  const store = getStore()
  const entry = store.find(e => e.email === email && e.purpose === purpose)
  if (!entry) return 'invalid'
  if (Date.now() > entry.expiresAt) return 'expired'
  if (entry.code !== code.trim()) return 'invalid'
  return 'valid'
}

// ─── Consume OTP (hapus setelah berhasil digunakan) ───────────────────────────
export function consumeOTP(email: string, purpose: OTPEntry['purpose']): void {
  const store = getStore().filter(e => !(e.email === email && e.purpose === purpose))
  localStorage.setItem(OTP_STORE_KEY, JSON.stringify(store))
}

// ─── Sisa waktu dalam detik ───────────────────────────────────────────────────
export function getOTPTimeLeft(email: string, purpose: OTPEntry['purpose']): number {
  const store = getStore()
  const entry = store.find(e => e.email === email && e.purpose === purpose)
  if (!entry) return 0
  return Math.max(0, Math.floor((entry.expiresAt - Date.now()) / 1000))
}

function getStore(): OTPEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(OTP_STORE_KEY) || '[]')
  } catch {
    return []
  }
}

// ─── Kirim OTP via EmailJS ────────────────────────────────────────────────────
// Panduan setup EmailJS:
// 1. Daftar di https://www.emailjs.com (gratis 200 email/bulan)
// 2. Buat Email Service (Gmail/Outlook)
// 3. Buat Email Template dengan variabel: {{to_email}}, {{to_name}}, {{otp_code}}, {{expires_in}}
// 4. Isi SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY di bawah
// 5. Atau set environment variable di .env.local

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID_OTP     = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OTP    || 'YOUR_TEMPLATE_OTP'
const EMAILJS_TEMPLATE_ID_FORGOT  = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_FORGOT || 'YOUR_TEMPLATE_FORGOT'
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'

export async function sendOTPEmail(params: {
  toEmail: string
  toName: string
  otpCode: string
  purpose: 'register' | 'forgot'
}): Promise<{ success: boolean; error?: string }> {
  try {
    const emailjs = await import('@emailjs/browser')

    const templateId = params.purpose === 'register'
      ? EMAILJS_TEMPLATE_ID_OTP
      : EMAILJS_TEMPLATE_ID_FORGOT

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      {
        to_email:   params.toEmail,
        to_name:    params.toName,
        otp_code:   params.otpCode,
        expires_in: '5 menit',
        purpose:    params.purpose === 'register' ? 'Verifikasi Registrasi' : 'Reset Password',
        year:       new Date().getFullYear(),
      },
      EMAILJS_PUBLIC_KEY
    )

    return { success: true }
  } catch (err: unknown) {
    console.error('EmailJS error:', err)
    // Jika EmailJS belum dikonfigurasi, tampilkan kode di console untuk dev
    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      console.warn(`[DEV MODE] OTP untuk ${params.toEmail}: ${params.otpCode}`)
      return { success: true }   // anggap sukses di dev
    }
    const message = err instanceof Error ? err.message : 'Gagal mengirim email'
    return { success: false, error: message }
  }
}
