"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={logout} className="rounded-md border border-white/20 px-3 py-1.5 text-slate-200 transition hover:bg-white/10">
      Log out
    </button>
  );
}
