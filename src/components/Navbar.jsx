"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/data/site";

const GREY_TOP = {
  background:
    "linear-gradient(180deg, #f7f8fa 0%, #e3e5e9 38%, #cfd2d8 70%, #bfc3ca 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.08)",
};
const GREY_SCROLLED = {
  background:
    "linear-gradient(180deg, #eceef1 0%, #d6d9de 40%, #c3c7ce 72%, #b3b8bf 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.12), 0 8px 24px -8px rgba(15,27,43,0.35)",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={scrolled ? GREY_SCROLLED : GREY_TOP}
      className={`sticky top-0 z-50 border-b border-slate-400/40 transition-[padding] duration-300 ${
  scrolled ? "py-2 backdrop-blur-md" : "py-4"
}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
        <motion.div
          className="absolute -inset-y-2 w-40 -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ left: "-20%" }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
      </div>

      <div className="container-x relative z-10 flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === path;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`group relative text-sm font-semibold transition ${
                  active ? "text-[#7f0b18]" : "text-slate-800 hover:text-[#7f0d1a]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-brand transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn-primary hidden !py-2.5 lg:inline-flex bg-[#7f0b18] text-white">
          Get a Quote <ArrowRight size={14} />
        </Link>

        <button
          className="text-slate-800 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              background: "linear-gradient(180deg, #dfe1e5 0%, #c9ccd2 100%)",
            }}
            className="relative z-10 overflow-hidden border-t border-white/60 lg:hidden"
          >
            <div className="container-x flex flex-col gap-4 py-5">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-slate-800 hover:text-brand"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary w-fit">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}