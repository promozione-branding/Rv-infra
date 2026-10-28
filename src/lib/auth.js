import crypto from "node:crypto"
import { cookies } from "next/headers"

const MAX_AGE_MS = 8 * 60 * 60 * 1000 // keep in sync with cookie maxAge

function secret() {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 16) throw new Error("AUTH_SECRET must be set (16+ chars)")
  return s
}

const sign = (payload) => crypto.createHmac("sha256", secret()).update(payload).digest("base64url")

export function safeEqual(a = "", b = "") {
  const ha = crypto.createHash("sha256").update(String(a)).digest()
  const hb = crypto.createHash("sha256").update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function makeToken() {
  const payload = String(Date.now() + MAX_AGE_MS)
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token = "") {
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  if (!safeEqual(sig, sign(payload))) return false
  return Number(payload) > Date.now()
}

export async function isAdmin() {
  try {
    const token = (await cookies()).get("admin")?.value
    return verifyToken(token)
  } catch {
    return false
  }
}
