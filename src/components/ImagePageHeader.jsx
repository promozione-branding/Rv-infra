"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Home, PhoneCall } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const wordIn = {
  hidden: { y: "105%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE },
  }),
};

export default function ImagePageHeader({
  eyebrow,
  title,
  text,
  highlight = "",
  image,
  imageAlt = "",
  badge, // small white chip on the photo, e.g. "Trusted Since 1999"
  crumb,
  parents = [],
  showCta = true,
  ctaLabel = "Request a Quote",
  ctaHref = "/contact",
  phone = "+91 9870173713",
}) {
  const reduce = useReducedMotion();

  const words = String(title).split(" ");
  const hi = highlight.toLowerCase().split(/\s+/).filter(Boolean);
  const clean = (w) => w.toLowerCase().replace(/[^\w]/g, "");
  const isGold = (w, i) => (hi.length ? hi.includes(clean(w)) : i === words.length - 1);

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(800px 360px at 18% 30%, #fffdf8 0%, #f8f1e3 70%, #f3e9d6 100%)",
      }}
    >
      {/* Top-left corner: gold edge + navy triangle */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-0 hidden h-[10.5rem] w-[8.5rem] bg-[#f2b01c] [clip-path:polygon(0_0,100%_0,0_100%)] lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-0 hidden h-40 w-32 bg-[#0f1f3d] [clip-path:polygon(0_0,100%_0,0_100%)] lg:block"
      />

      <div className="container-x relative z-10 grid items-center gap-10 py-8 lg:min-h-[480px] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-14">
        {/* ---------- Text ---------- */}
        <div className="min-w-0">
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ol className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#0f1f3d]/15 bg-white/50 px-3.5 py-1 text-[13px] text-[#0f1f3d]">
              <li>
                <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-[#d99a0c]">
                  <Home className="h-3.5 w-3.5" />
                  Home
                </Link>
              </li>
              {parents.map((p) => (
                <li key={p.href} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <Link href={p.href} className="transition-colors hover:text-[#d99a0c]">
                    {p.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                <span aria-current="page" className="font-semibold text-[#d99a0c]">
                  {crumb || eyebrow}
                </span>
              </li>
            </ol>
          </motion.nav>

          <h1
            aria-label={title}
            className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#0f1f3d] sm:text-[2.6rem] lg:text-[2.8rem] xl:text-[3.2rem]"
          >
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                aria-hidden="true"
                className="mr-[0.22em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
              >
                <motion.span
                  className={`inline-block ${isGold(word, i) ? "text-[#f2b01c]" : ""}`}
                  variants={wordIn}
                  custom={i}
                  initial={reduce ? "show" : "hidden"}
                  animate="show"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {text && (
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 max-w-[32rem] text-sm leading-6 text-slate-500 sm:text-[15px]"
            >
              {text}
            </motion.p>
          )}

          {(showCta || phone) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {showCta && (
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-[#f2b01c] px-5 py-2.5 text-sm font-bold text-[#0f1f3d] transition-colors hover:bg-[#e0a010]"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 rounded-md border border-[#f2b01c] bg-white/40 px-4 py-2.5 text-sm font-bold text-[#0f1f3d] transition-colors hover:bg-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  {phone}
                </a>
              )}
            </div>
          )}
        </div>

        {/* ---------- Photo ---------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none"
        >
          {/* navy block behind, bottom-right */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-[72%] w-[72%] translate-x-2 translate-y-2 rounded-br-[64px] bg-[#0f1f3d] sm:translate-x-4 sm:translate-y-4 lg:rounded-br-[96px]"
          />
          {/* gold outline offset, top-left */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -translate-x-2 -translate-y-2 rounded-bl-xl rounded-br-[64px] rounded-tl-[64px] rounded-tr-xl border-2 border-[#f2b01c] sm:-translate-x-4 sm:-translate-y-4 lg:rounded-br-[96px] lg:rounded-tl-[96px]"
          />

          {/* photo */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-bl-xl rounded-br-[64px] rounded-tl-[64px] rounded-tr-xl bg-[#0f1f3d] shadow-[0_24px_50px_-24px_rgba(15,31,61,0.55)] lg:aspect-[5/4] lg:rounded-br-[96px] lg:rounded-tl-[96px]">
            <motion.img
              src={image}
              alt={imageAlt || title}
              fetchPriority="high"
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/55 via-transparent to-transparent"
            />
            {badge && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#0f1f3d] shadow-lg backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#f2b01c]" />
                {badge}
              </div>
            )}
          </div>

          {/* gold dot accent */}
          <span
            aria-hidden="true"
            className="absolute -right-2 top-[10%] hidden h-6 w-6 rounded-full bg-[#f2b01c] ring-4 ring-[#f8f1e3] sm:block"
          />
        </motion.div>
      </div>

      {/* base strip */}
      <div aria-hidden="true" className="h-2.5 border-t-2 border-[#f2b01c] bg-[#0f1f3d]" />
    </section>
  );
}