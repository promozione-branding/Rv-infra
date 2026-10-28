"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, ExternalLink, LogOut, Menu, X } from "lucide-react";

const NAV = [
  {
    href: "/admin/blogs",
    label: "Dashboard",
    icon: LayoutDashboard,
    // list + edit screens
    match: (p) => p === "/admin/blogs" || (p.startsWith("/admin/blogs/") && !p.startsWith("/admin/blogs/new")),
  },
  {
    href: "/admin/blogs/new",
    label: "Add blog",
    icon: PlusCircle,
    match: (p) => p.startsWith("/admin/blogs/new"),
  },
];

const base = "flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-[0.95rem] font-semibold transition";
const idle = "text-slate-200 hover:bg-white/10 hover:text-white";

function Content({ pathname, onNavigate }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <Link href="/admin/blogs" onClick={onNavigate} className="mx-2 block w-fit rounded-xl bg-white px-4 py-2.5 shadow-sm">
        <img src="/logo.png" alt="R.V. Infrastructural" className="h-9 w-auto" />
      </Link>
      <p className="mx-2 mt-5 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#f5a623]">Blog admin</p>

      <nav className="mt-8 space-y-2">
        {NAV.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`${base} ${active ? "bg-[#f5a623] text-[#0b1623] shadow-[0_10px_24px_rgba(245,166,35,0.35)]" : idle}`}
            >
              <Icon size={20} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
        <a href="/blogs" target="_blank" rel="noreferrer" className={`${base} ${idle}`}>
          <ExternalLink size={20} strokeWidth={2} />
          View site
        </a>
        <button type="button" onClick={logout} className={`${base} ${idle}`}>
          <LogOut size={20} strokeWidth={2} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  // close the mobile drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* desktop */}
      <aside className="sticky top-0 hidden h-screen w-[290px] shrink-0 bg-[#253970] text-white lg:block">
        <Content pathname={pathname} />
      </aside>

      {/* mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-[#253970] px-4 py-3 text-white lg:hidden">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5a623]">Blog admin</span>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-white/10">
          <Menu size={22} />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-[290px] max-w-[85vw] bg-[#253970] text-white shadow-2xl">
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-3 top-3 rounded-lg p-2 hover:bg-white/10">
              <X size={20} />
            </button>
            <Content pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
