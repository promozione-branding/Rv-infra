import db from "./db"
import Blog from "@/models/Blogs"

export const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const plain = (x) => JSON.parse(JSON.stringify(x))

export const thumb = (url = "", w = 700) =>
  url.includes("ik.imagekit.io") ? `${url}${url.includes("?") ? "&" : "?"}tr=w-${w},f-auto` : url

export function pickBlog(body = {}) {
  const out = {}
  for (const k of ["title", "metaTitle", "metaDescription", "content", "image", "imageFileId"]) {
    if (typeof body[k] === "string") out[k] = body[k].trim()
  }
  if (typeof body.permalink === "string") out.permalink = slugify(body.permalink)
  if (body.date) {
    const d = new Date(body.date)
    if (!isNaN(d)) out.date = d
  }
  return out
}

export async function getBlogs() {
  await db()
  return plain(
    await Blog.find().select("title permalink date image metaDescription").sort({ date: -1 }).lean()
  )
}

export async function getBlog(permalink) {
  await db()
  return plain(await Blog.findOne({ permalink }).lean())
}