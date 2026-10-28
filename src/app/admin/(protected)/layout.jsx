import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <>
      <header className="border-b border-slate-200 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/admin/blogs" className="font-extrabold tracking-wide">
            RV <span className="text-brand">Admin</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/blogs" target="_blank" className="text-slate-300 hover:text-white">View site ↗</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </>
  );
}
