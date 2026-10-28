import Link from "next/link"
import { getBlogs, thumb } from "@/lib/blogs"

export default async function BlogPage() {
  let blogs = []
  try {
    blogs = await getBlogs()
  } catch (e) {
    console.error("Failed to load blogs:", e.message) // e.g. DB unreachable at build time; ISR retries in 60s
  }

  return (
    <section className="bg-white py-16 max-[720px]:py-10">
      <div className="mx-auto max-w-[1200px] px-5">
        {blogs.length === 0 && <p className="text-center text-slate-500">No blogs yet. Please check back soon.</p>}

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <Link
              key={b._id}
              href={`/blogs/${b.permalink}`}
              className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,40,90,0.10)] transition hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,40,90,0.18)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={thumb(b.image, 700)}
                  alt={b.title}
                  width={700}
                  height={437}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#f5a623]">
                  {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                </p>
                <h3 className="mt-2 font-body text-[1.15rem] font-extrabold leading-[1.3] tracking-normal text-[#0b2a5b]">{b.title}</h3>
                {b.metaDescription && (
                  <p className="mt-2 line-clamp-3 text-[0.9rem] leading-[1.55] text-slate-500">{b.metaDescription}</p>
                )}
                <span className="mt-auto pt-4 text-sm font-bold text-[#253970]">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}