"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ slug, title }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm(`Delete "${title}"? This also removes its cover image and cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (res.status === 401) return router.replace("/admin/login");
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("Could not delete the blog. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button onClick={remove} disabled={busy} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50">
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
