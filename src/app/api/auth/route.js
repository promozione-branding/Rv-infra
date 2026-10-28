import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { makeToken, isAdmin, safeEqual } from "@/lib/auth"

export async function POST(req) {
  const { username, password } = await req.json().catch(() => ({}))

  if (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !safeEqual(username, process.env.ADMIN_USERNAME) ||
    !safeEqual(password, process.env.ADMIN_PASSWORD)
  ) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  let token
  try {
    token = makeToken()
  } catch (e) {
    console.error(e.message)
    return NextResponse.json({ message: "Server is not configured (SESSION_SECRET)" }, { status: 500 })
  }

  ;(await cookies()).set("admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  ;(await cookies()).delete("admin")
  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ isAdmin: await isAdmin() })
}