"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Factory, Gauge, Search, SearchX } from "lucide-react";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import QuoteModal from "./QuoteModal";
import { fleetGroups, featuredProducts, stats } from "@/data/site";

const unitsByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.units]));
const categories = ["All", ...Array.from(new Set(fleetGroups.map((p) => p.category)))];

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

  const units = unitsByName[p.name];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
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
          <img
            src={`/fleets/${p.image_file}`}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-navy/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {p.category}
          </span>
         
          {units && (
            <span className="absolute bottom-3 left-3 rounded-md bg-brand px-2.5 py-1 text-xs font-bold text-navy shadow-lg">
              {units} units
            </span>
          )}
          {/* light sweep on hover */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-white/30 opacity-0 group-hover:animate-shine group-hover:opacity-100" />
        </div>

        {/* body */}
        <div className="relative flex flex-1 flex-col p-5">
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spot }} />
          <h3 className="relative text-lg font-bold text-navy">{p.name}</h3>
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-500">{p.description}</p>

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

          <button
            type="button"
            onClick={() => onQuote(p.name)}
            className="relative mt-5 inline-flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy transition group-hover:border-brand group-hover:bg-brand"
          >
            Request a Quote
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* animated bottom accent */}
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
      </motion.div>
    </motion.article>
  );
}

export default function ProductsExplorer() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [quote, setQuote] = useState({ open: false, product: "" });
  const openQuote = (product = "") => setQuote({ open: true, product });
  const closeQuote = useCallback(() => setQuote((s) => ({ ...s, open: false })), []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return fleetGroups.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!s || `${p.name} ${p.make} ${p.category} ${p.description}`.toLowerCase().includes(s))
    );
  }, [cat, q]);

  const makes = useMemo(
    () => Array.from(new Set(fleetGroups.flatMap((p) => p.make.split("/").map((m) => m.trim())))),
    []
  );

  return (
    <>
      <section className="relative z-10 -mt-10">
        <div className="container-x">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-xl ring-1 ring-slate-200 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="group relative bg-white p-5 text-center transition hover:bg-brand-light sm:p-6">
                  <div className="text-2xl font-extrabold text-navy sm:text-3xl">
                    <Counter value={s.value} decimals={s.decimals || 0} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</div>
                  <span className="absolute inset-x-6 bottom-0 h-0.5 origin-center scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* filters + grid */}
      <section className="relative overflow-hidden bg-slate-50 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(11,22,35,.07)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-x relative">
          <Reveal>
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
                {categories.map((c) => {
                  const active = c === cat;
                  return (
                    <button
                      key={c}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCat(c)}
                      className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "text-navy" : "text-slate-600 hover:text-navy"}`}
                    >
                      {active && (
                        <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-brand shadow-md shadow-brand/40" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                      )}
                      {!active && <span className="absolute inset-0 rounded-full bg-white ring-1 ring-slate-200" />}
                      <span className="relative">{c}</span>
                    </button>
                  );
                })}
              </div>

              <label className="relative block w-full lg:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search crane, piling, mixer…"
                  className="input !rounded-full !pl-10"
                  aria-label="Search products"
                />
              </label>
            </div>
          </Reveal>

          <p className="mb-6 text-sm text-slate-500" aria-live="polite">
            Showing <b className="text-navy">{list.length}</b> of {fleetGroups.length} product lines
          </p>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <ProductCard key={p.name} p={p} index={i} onQuote={openQuote} />
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center shadow ring-1 ring-slate-200">
              <SearchX className="mx-auto h-10 w-10 text-brand-dark" />
              <h3 className="mt-3 font-bold text-navy">No matching equipment</h3>
              <p className="mt-1 text-sm text-slate-500">Try a different keyword, or tell us what you need and we will source it.</p>
              <button onClick={() => { setQ(""); setCat("All"); }} className="btn-primary mt-5">Reset filters</button>
            </motion.div>
          )}
        </div>
      </section>



      {/* CTA */}
      <section className="relative overflow-hidden bg-navy py-16">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-x relative flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <Reveal>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Need a specific machine or a <span className="text-shine">custom fleet</span>?
            </h2>
            <p className="mt-2 max-w-xl text-slate-300">Tell us the tonnage, site and duration. Our team will respond with the right equipment and operators.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <button type="button" onClick={() => openQuote("")} className="btn-primary !px-8 !py-4 text-base">
              Get a Quote <ArrowUpRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>
      </section>

      <QuoteModal open={quote.open} onClose={closeQuote} product={quote.product} />
    </>
  );
}