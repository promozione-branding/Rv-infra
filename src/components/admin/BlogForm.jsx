"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

const slugify = (s = "") => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const today = () => new Date().toISOString().slice(0, 10);

const empty = {
  title: "", permalink: "", date: today(), metaTitle: "", metaDescription: "",
  content: "", image: "", imageFileId: "",
};

function Label({ children, hint }) {
  return (
    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {children} {hint && <span className="font-normal normal-case tracking-normal text-slate-400">{hint}</span>}
    </label>
  );
}

// `originalSlug` is set when editing an existing blog
export default function BlogForm({ initial, originalSlug }) {
  const router = useRouter();
  const editing = Boolean(originalSlug);
  const [form, setForm] = useState(initial || empty);
  const [slugTouched, setSlugTouched] = useState(editing);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function onTitle(e) {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, permalink: slugTouched ? f.permalink : slugify(title) }));
  }

  async function onCover(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return router.replace("/admin/login");
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setForm((f) => ({ ...f, image: data.url, imageFileId: data.fileId }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Title is required");
    if (!form.date) return setError("Date is required");
    if (!form.image || !form.imageFileId) return setError("Please upload a cover image");
    if (!form.content.trim()) return setError("Content cannot be empty");

    setSaving(true);
    try {
      const res = await fetch(editing ? `/api/blogs/${encodeURIComponent(originalSlug)}` : "/api/blogs", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, permalink: form.permalink || slugify(form.title) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return router.replace("/admin/login");
      if (!res.ok) throw new Error(data.message || "Could not save");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* main column */}
      <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div>
          <Label>Title *</Label>
          <input className="input" value={form.title} onChange={onTitle} maxLength={200} required />
        </div>
        <div>
          <Label hint="(URL: /blogs/your-permalink)">Permalink *</Label>
          <input
            className="input"
            value={form.permalink}
            onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, permalink: slugify(e.target.value) })); }}
            required
          />
        </div>
        <div>
          <Label>Content *</Label>
          <RichTextEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
        </div>
      </div>

      {/* side column */}
      <aside className="space-y-5">
        <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div>
            <Label>Cover image *</Label>
            {form.image ? (
              <img src={form.image} alt="" className="mb-3 aspect-[16/10] w-full rounded-lg bg-slate-100 object-cover" />
            ) : (
              <div className="mb-3 flex aspect-[16/10] w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-sm text-slate-400">
                No image yet
              </div>
            )}
            <label className="btn-outline cursor-pointer">
              {uploading ? "Uploading…" : form.image ? "Replace image" : "Upload image"}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={onCover} disabled={uploading} />
            </label>
            <p className="mt-2 text-xs text-slate-400">JPG, PNG, WebP, GIF or AVIF · max 4 MB</p>
          </div>
          <div>
            <Label>Date *</Label>
            <input type="date" className="input" value={form.date} onChange={set("date")} required />
          </div>
        </div>

        <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div>
            <Label hint="(SEO)">Meta title</Label>
            <input className="input" value={form.metaTitle} onChange={set("metaTitle")} maxLength={70} />
          </div>
          <div>
            <Label hint="(SEO, shown on blog cards)">Meta description</Label>
            <textarea className="input min-h-[96px]" value={form.metaDescription} onChange={set("metaDescription")} maxLength={200} />
            <p className="mt-1 text-right text-xs text-slate-400">{form.metaDescription.length}/200</p>
          </div>
        </div>

        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
            {saving ? "Saving…" : editing ? "Save changes" : "Publish blog"}
          </button>
          <Link href="/admin/blogs" className="text-sm font-semibold text-slate-500 hover:underline">Cancel</Link>
        </div>
      </aside>
    </form>
  );
}
