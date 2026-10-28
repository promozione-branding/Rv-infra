import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import { uploadImage } from "@/lib/r2"

export const runtime = "nodejs"

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const form = await req.formData()
  const file = form.get("file")

  if (!file || typeof file === "string") return NextResponse.json({ message: "No file" }, { status: 400 })
  if (!file.type.startsWith("image/")) return NextResponse.json({ message: "Only images allowed" }, { status: 400 })
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ message: "Max size is 4 MB" }, { status: 400 })

  try {
    const { url, key } = await uploadImage(Buffer.from(await file.arrayBuffer()), {
      folder: "blogs",
      contentType: file.type,
      fileName: file.name,
    })
    return NextResponse.json({ url, fileId: key })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: "Upload failed" }, { status: 500 })
  }
}