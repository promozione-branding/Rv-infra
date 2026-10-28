"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Login failed");
      router.replace("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-[0_18px_50px_rgba(15,40,90,0.12)]">
      <span className="block h-1 w-12 rounded-full bg-brand" />
      <h1 className="mt-3 text-2xl font-extrabold text-navy">Admin login</h1>
      <p className="mt-1 text-sm text-slate-500">R.V. Infrastructural – blog management</p>

      <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-slate-500">Username</label>
      <input className="input mt-1" autoComplete="username" required value={form.username} onChange={set("username")} />

      <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
      <input className="input mt-1" type="password" autoComplete="current-password" required value={form.password} onChange={set("password")} />

      {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
