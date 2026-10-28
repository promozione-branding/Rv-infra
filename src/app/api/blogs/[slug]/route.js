import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"
import db from "@/lib/db"
import Blog from "@/models/Blogs"
import { getBlog, pickBlog } from "@/lib/blogs"
import { deleteImage } from "@/lib/r2"

const unauthorized = () => NextResponse.json({ message: "Unauthorized" }, { status: 401 })

// Public: one blog
export async function GET(_req, { params }) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 })
  const { imageFileId, ...publicBlog } = blog // don't expose the storage id
  return NextResponse.json(publicBlog)
}

// Admin: edit
export async function PUT(req, { params }) {
  if (!(await isAdmin())) return unauthorized()
  const { slug } = await params
  const data = pickBlog(await req.json().catch(() => ({})))

  await db()
  const blog = await Blog.findOne({ permalink: slug })
  if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 })

  if (data.permalink && data.permalink !== slug && (await Blog.exists({ permalink: data.permalink }))) {
    return NextResponse.json({ message: "This permalink already exists" }, { status: 409 })
  }

  const oldFileId = blog.imageFileId
  blog.set(data)
  try {
    await blog.save()
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 })
  }

  // cover image was replaced: remove the old file from ImageKit
  if (data.imageFileId && data.imageFileId !== oldFileId) await deleteImage(oldFileId)

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${slug}`)
  revalidatePath(`/blogs/${blog.permalink}`)
  return NextResponse.json(blog)
}

// Admin: delete
export async function DELETE(_req, { params }) {
  if (!(await isAdmin())) return unauthorized()
  const { slug } = await params

  await db()
  const blog = await Blog.findOneAndDelete({ permalink: slug })
  if (blog) await deleteImage(blog.imageFileId)

  revalidatePath("/blogs")
  return NextResponse.json({ ok: true })
}