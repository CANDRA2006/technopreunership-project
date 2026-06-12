export interface User {
  id: string
  namaLengkap: string
  email: string
  whatsapp: string
  createdAt: string
  emailVerified: boolean
}

const STORAGE_KEY   = 'bengkel_harun_users'
const SESSION_KEY   = 'bengkel_harun_session'
const PASSWORD_KEY  = 'bengkel_harun_passwords'

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function getPasswords(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(PASSWORD_KEY) || '{}') } catch { return {} }
}

function savePasswords(pw: Record<string, string>): void {
  localStorage.setItem(PASSWORD_KEY, JSON.stringify(pw))
}

// ─── Session ──────────────────────────────────────────────────────────────────
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const data = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY)
    return data ? JSON.parse(data) : null
  } catch { return null }
}

function persistSession(user: User, remember: boolean): void {
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(user))
}

// ─── Register (simpan tanpa emailVerified dulu) ───────────────────────────────
export function registerPending(data: {
  namaLengkap: string
  email: string
  whatsapp: string
  password: string
}): { user: User; alreadyExists: boolean } {
  const users = getUsers()
  const existing = users.find(u => u.email === data.email)
  if (existing) return { user: existing, alreadyExists: true }

  const newUser: User = {
    id: crypto.randomUUID(),
    namaLengkap: data.namaLengkap,
    email: data.email,
    whatsapp: data.whatsapp,
    createdAt: new Date().toISOString(),
    emailVerified: false,
  }
  const pw = getPasswords()
  pw[newUser.id] = data.password
  savePasswords(pw)
  saveUsers([...users, newUser])
  return { user: newUser, alreadyExists: false }
}

// ─── Verifikasi email setelah OTP benar ───────────────────────────────────────
export function verifyUserEmail(email: string): User | null {
  const users = getUsers()
  const idx = users.findIndex(u => u.email === email)
  if (idx === -1) return null
  users[idx].emailVerified = true
  saveUsers(users)
  persistSession(users[idx], false)
  return users[idx]
}

// ─── Login ────────────────────────────────────────────────────────────────────
export function login(
  email: string,
  password: string,
  remember: boolean
): { user: User | null; reason?: 'not_found' | 'wrong_password' | 'not_verified' } {
  const users = getUsers()
  const pw    = getPasswords()
  const user  = users.find(u => u.email === email)
  if (!user)                    return { user: null, reason: 'not_found' }
  if (pw[user.id] !== password) return { user: null, reason: 'wrong_password' }
  if (!user.emailVerified)      return { user: null, reason: 'not_verified' }
  persistSession(user, remember)
  return { user }
}

// ─── Reset password (setelah OTP) ─────────────────────────────────────────────
export function resetPassword(email: string, newPassword: string): boolean {
  const users = getUsers()
  const user  = users.find(u => u.email === email)
  if (!user) return false
  const pw = getPasswords()
  pw[user.id] = newPassword
  savePasswords(pw)
  return true
}

// ─── Email ada di database? ───────────────────────────────────────────────────
export function emailExists(email: string): boolean {
  return getUsers().some(u => u.email === email)
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SESSION_KEY)
}
