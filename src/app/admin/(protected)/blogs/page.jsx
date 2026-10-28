import Link from "next/link";
import { getBlogs, thumb } from "@/lib/blogs";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogs() {
  let blogs = [];
  let error = "";
  try {
    blogs = await getBlogs();
  } catch (e) {
    console.error(e);
    error = "Could not load blogs. Check the database connection.";
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[1.7rem] font-extrabold tracking-tight text-[#0b1623]">
          All blogs <span className="text-base font-semibold text-slate-500">({blogs.length})</span>
        </h1>
        <Link href="/admin/blogs/new" className="rounded-xl bg-[#0b1623] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#16293f]">
          + Add blog
        </Link>
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(15,40,90,0.07)]">
        {blogs.length === 0 && !error && (
          <p className="px-4 py-14 text-center text-slate-500">No blogs yet. Click “Add blog” to create your first one.</p>
        )}

        {blogs.map((b) => (
          <div key={b._id} className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl px-3 py-4 sm:px-4">
            <img src={thumb(b.image, 200)} alt="" className="h-[67px] w-24 shrink-0 rounded-lg bg-slate-100 object-cover" />

            <div className="min-w-0 flex-1 basis-56">
              <p className="truncate text-[1.08rem] font-semibold text-[#0b1623]">{b.title}</p>
              <p className="mt-0.5 truncate text-sm text-slate-500">
                {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                {" · "}/{b.permalink}
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-sm font-semibold">
              <Link href={`/blogs/${b.permalink}`} target="_blank" className="px-3 py-2 text-slate-500 transition hover:text-[#0b1623]">
                View
              </Link>
              <Link href={`/admin/blogs/${b.permalink}/edit`} className="rounded-lg bg-slate-100 px-4 py-2 text-[#0b1623] transition hover:bg-slate-200">
                Edit
              </Link>
              <DeleteButton slug={b.permalink} title={b.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
