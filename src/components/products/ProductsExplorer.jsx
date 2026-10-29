"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Factory, Gauge } from "lucide-react";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import QuoteModal from "./QuoteModal";
import { stats } from "@/data/site";
import { products, productHref } from "@/data/product";
import CTABanner from "../CTABanner";
import LocationMap from "../Map";

function ProductCard({ p, index, onQuote }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 22 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const spot = useMotionTemplate`radial-gradient(260px circle at ${px}px ${py}px, rgba(246,178,27,.20), transparent 70%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  const units = p.units;

  // View more / View less
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const descRef = useRef(null);

  // Only show the toggle if the text is actually cut off
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => {
      if (!expanded) setClamped(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [expanded, p.description]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand/20 hover:ring-brand/60"
      >
        {/* image */}
        <div className="relative aspect-[3/2] overflow-hidden bg-navy">
          <Link href={productHref(p)} aria-label={`View ${p.name}`} className="absolute inset-0 z-[1]">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
          </Link>
          <span className="absolute left-3 top-3 z-[2] rounded-full border border-white/25 bg-navy/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {p.category}
          </span>

          {units && (
            <span className="pointer-events-none absolute bottom-3 left-3 z-[2] rounded-md bg-brand px-2.5 py-1 text-xs font-bold text-navy shadow-lg">
              {units}
            </span>
          )}
          {/* light sweep on hover */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/30 opacity-0 group-hover:animate-shine group-hover:opacity-100" />
        </div>

        {/* body */}
        <div className="relative flex flex-1 flex-col p-5">
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spot }} />
          <h3 className="relative text-lg font-bold text-navy"><Link href={productHref(p)} className="transition hover:text-brand-dark">{p.name}</Link></h3>

          {/* description with clamp + toggle */}
          <div className="relative mt-2 flex-1">
            <p
              ref={descRef}
              className={`text-sm leading-relaxed text-slate-500 ${expanded ? "" : "line-clamp-3"}`}
            >
              {p.description}
            </p>
            {(clamped || expanded) && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-1.5 text-sm font-semibold text-brand-dark transition hover:text-navy"
              >
                {expanded ? "View less" : "View more"}
              </button>
            )}
          </div>

          <dl className="relative mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-50 p-3 transition group-hover:bg-brand-light">
              <dt className="flex items-center gap-1.5 font-semibold uppercase tracking-wide text-slate-400"><Factory className="h-3.5 w-3.5 text-brand-dark" />Make</dt>
              <dd className="mt-1 font-semibold text-navy">{p.make}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 transition group-hover:bg-brand-light">
              <dt className="flex items-center gap-1.5 font-semibold uppercase tracking-wide text-slate-400"><Gauge className="h-3.5 w-3.5 text-brand-dark" />Capacity</dt>
              <dd className="mt-1 font-semibold text-navy">{p.capacity}</dd>
            </div>
          </dl>

          <div className="relative mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Link
              href={productHref(p)}
              className="inline-flex items-center justify-between rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand hover:text-navy"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => onQuote(p.name)}
              aria-label={`Request a quote for ${p.name}`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:bg-brand"
            >
              Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* animated bottom accent */}
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
      </motion.div>
    </motion.article>
  );
}

export default function ProductsExplorer() {
  const [quote, setQuote] = useState({ open: false, product: "" });
  const openQuote = (product = "") => setQuote({ open: true, product });
  const closeQuote = useCallback(() => setQuote((s) => ({ ...s, open: false })), []);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-50 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(11,22,35,.07)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-x relative">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.name} p={p} index={i} onQuote={openQuote} />
            ))}
          </div>
        </div>
      </section>

      <LocationMap />

      <QuoteModal open={quote.open} onClose={closeQuote} product={quote.product} />
    </>
  );
}