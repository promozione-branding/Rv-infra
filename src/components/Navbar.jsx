"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/data/site";

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-yellow-50/90 py-2 shadow-md backdrop-blur-md border-b border-yellow-100"
          : "bg-yellow-50 py-4 border-b border-yellow-100"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === path;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`group relative text-sm font-medium transition font-semibold ${
                  active
                    ? "text-brand"
                    : "text-gray-800 hover:text-brand"
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

        <Link
          href="/contact"
          className="btn-primary hidden !py-2.5 lg:inline-flex"
        >
          Get a Quote <ArrowRight size={14} />
        </Link>

        <button
          className="text-gray-800 lg:hidden"
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
            className="overflow-hidden bg-yellow-50 border-b border-yellow-100 lg:hidden"
          >
            <div className="container-x flex flex-col gap-4 py-5">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-gray-800 hover:text-brand"
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