import { NextResponse } from "next/server"
import db from "@/lib/db"
import Quote from "@/models/Quote"

export const dynamic = "force-dynamic"

const FIELDS = ["name", "company", "phone", "email", "product", "location", "message"]

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const data = {}
  for (const k of FIELDS) if (typeof body[k] === "string") data[k] = body[k]

  if (!data.name?.trim()) return NextResponse.json({ message: "Name is required" }, { status: 400 })
  if (!data.phone?.trim() && !data.email?.trim())
    return NextResponse.json({ message: "Phone or email is required" }, { status: 400 })
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    return NextResponse.json({ message: "Invalid email" }, { status: 400 })

  try {
    await db()
    await Quote.create(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: "Could not save request" }, { status: 500 })
  }
  return NextResponse.json({ ok: true }, { status: 201 })
}
