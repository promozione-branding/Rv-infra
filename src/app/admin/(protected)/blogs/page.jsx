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
        <h1 className="text-2xl font-extrabold text-navy">Blogs <span className="text-base font-semibold text-slate-400">({blogs.length})</span></h1>
        <Link href="/admin/blogs/new" className="btn-primary">+ New blog</Link>
      </div>

      {error && <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Blog</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.length === 0 && !error && (
              <tr><td colSpan={3} className="px-4 py-10 text-center text-slate-500">No blogs yet. Create your first one.</td></tr>
            )}
            {blogs.map((b) => (
              <tr key={b._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={thumb(b.image, 120)} alt="" className="h-12 w-20 shrink-0 rounded-md bg-slate-100 object-cover" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-navy">{b.title}</p>
                      <p className="truncate text-xs text-slate-400">/blogs/{b.permalink}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                  {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-4">
                    <Link href={`/blogs/${b.permalink}`} target="_blank" className="font-semibold text-slate-500 hover:underline">View</Link>
                    <Link href={`/admin/blogs/${b.permalink}/edit`} className="font-semibold text-[#253970] hover:underline">Edit</Link>
                    <DeleteButton slug={b.permalink} title={b.title} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
