import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"
import db from "@/lib/db"
import Blog from "@/models/Blogs"
import { getBlogs, pickBlog, slugify } from "@/lib/blogs"

export const dynamic = "force-dynamic"

// Public: list
export async function GET() {
  return NextResponse.json(await getBlogs())
}

// Admin: 
export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const data = pickBlog(await req.json().catch(() => ({})))
  if (!data.permalink && data.title) data.permalink = slugify(data.title)

  if (!data.title || !data.permalink || !data.date || !data.image || !data.imageFileId) {
    return NextResponse.json({ message: "Title, permalink, date and cover image are required" }, { status: 400 })
  }

  await db()
  if (await Blog.exists({ permalink: data.permalink })) {
    return NextResponse.json({ message: "This permalink already exists" }, { status: 409 })
  }

  const blog = await Blog.create(data)
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${blog.permalink}`)
  return NextResponse.json(blog, { status: 201 })
}