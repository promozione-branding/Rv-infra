"use client";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Factory,
  Gauge,
  HardHat,
  Layers,
  MessageCircle,
  Phone,
  Play,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import LottieIcon from "@/components/LottieIcon";
import QuoteModal from "./QuoteModal";
import { contact } from "@/data/site";
import { productHref, categoryHref, getCategory } from "@/data/product";

const LOTTIE = {
  gear: "/product_detail/Excavator.json",
  drum: "/product_detail/soilcompactor.json",
  truck: "/product_detail/truck_mounted_boom_lift_lottie.json",
  hook: "/product_detail/",
  pulse: "/product_detail/",
  site: "/product_detail/soilcompactor.json", 
};

const HERO_BY_CATEGORY = {
  concrete: "drum",
  cranes: "hook",
  "lifts-and-access": "hook",
  foundation: "gear",
  earthwork: "gear",
};

const trust = [
  { icon: ShieldCheck, label: "Reliable Performance" },
  { icon: Wrench, label: "Well Maintained Fleet" },
  { icon: HardHat, label: "Trained Operators" },
];

function Anim({ name, className = "" }) {
  return <LottieIcon src={LOTTIE[name]} className={className} />;
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand-dark">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-xl font-extrabold text-navy sm:text-2xl">{children}</h3>
    </div>
  );
}

function Gallery({ product: p, badge }) {
  const items = [
    ...(p.gallery?.length ? p.gallery : [p.image]).map((src) => ({ type: "image", src })),
    ...(p.video ? [{ type: "video", src: p.video }] : []),
  ];
  const [i, setI] = useState(0);
  const go = (d) => setI((v) => (v + d + items.length) % items.length);
  const cur = items[i];
  const multi = items.length > 1;

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl bg-navy shadow-xl ring-1 ring-slate-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="aspect-[3/2] w-full"
          >
            {cur.type === "video" ? (
              <video src={cur.src} controls className="h-full w-full object-cover" />
            ) : (
              <img src={cur.src} alt={p.name} className="h-full w-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        {multi && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur transition hover:bg-brand hover:text-navy">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur transition hover:bg-brand hover:text-navy">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {multi && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {items.map((it, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show ${it.type} ${n + 1}`}
              className={`relative aspect-[3/2] overflow-hidden rounded-lg bg-navy ring-2 transition ${n === i ? "ring-brand" : "ring-transparent hover:ring-brand/50"}`}
            >
              {it.type === "video" ? (
                <span className="flex h-full w-full items-center justify-center text-white"><Play className="h-6 w-6" /></span>
              ) : (
                <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* rotating drum / swinging hook badge */}
      <div className="pointer-events-none absolute -left-3 top-[52%] hidden h-24 w-24 rounded-full bg-brand-light p-2 shadow-lg ring-4 ring-white sm:block">
        <Anim name={badge} className="h-full w-full" />
      </div>
    </div>
  );
}

/* ---------------- main ---------------- */
export default function ProductDetail({ product: p, related }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const cat = getCategory(p.categorySlug);
  const hero = HERO_BY_CATEGORY[p.categorySlug] || "gear";
  const scroller = useRef(null);
  const slide = (d) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hello, I would like a quote for ${p.name} from R.V. Infrastructural.`
  )}`;

  const renderActions = (className = "") => (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary !px-7 !py-3.5">
        Request a Quote <ArrowUpRight className="h-4 w-4" />
      </button>
      <a href={`tel:${contact.phoneHref}`} className="btn-outline !rounded-md !px-6 !py-3.5 !border-brand bg-white">
        <Phone className="h-4 w-4" /> {contact.phone}
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-12 w-12 items-center justify-center rounded-md border border-brand bg-white text-[#25D366] transition hover:bg-brand-light"
      >
        <Anim name="pulse" className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2" />
        <MessageCircle className="relative h-5 w-5" />
      </a>
    </div>
  );

  return (
    <>
      {/* ===== overview ===== */}
      <section className="relative z-10 bg-white py-14">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Gallery product={p} badge={hero} />
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <Link
              href={categoryHref(cat)}
              className="inline-flex rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-brand"
            >
              {p.category}
            </Link>
            <div className="xl:pr-28">
              <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{p.name}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{p.description}</p>
              {p.highlight && p.highlight !== p.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.highlight}</p>
              )}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {[
                { icon: Factory, label: "Make", value: p.make },
                { icon: Gauge, label: "Capacity", value: p.capacity },
                p.units && { icon: Layers, label: "In Fleet", value: `${p.units} units` },
              ]
                .filter(Boolean)
                .map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100 transition hover:bg-brand-light">
                    <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-brand-dark"><Icon className="h-4 w-4" /></span>
                      {label}
                    </dt>
                    <dd className="mt-2 font-bold text-navy">{value}</dd>
                  </div>
                ))}
            </dl>

            {renderActions("mt-7")}

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Icon className="h-5 w-5 text-navy" /> {label}
                </li>
              ))}
            </ul>

            {/* highlight animation */}
            <div className="pointer-events-none absolute -top-2 right-0 hidden h-28 w-28 rounded-full bg-brand-light/80 p-2.5 xl:block">
              <Anim name={hero} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== features + applications ===== */}
      {(p.features.length > 0 || p.applications.length > 0) && (
        <section className="bg-slate-50 py-14">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {[
              { title: "Key Features", icon: Box, items: p.features, anim: "gear" },
              { title: "Typical Applications", icon: Settings, items: p.applications, anim: "hook" },
            ].map(
              ({ title, icon, items, anim }, k) =>
                items.length > 0 && (
                  <Reveal key={title} delay={k * 0.1}>
                    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
                      <SectionTitle icon={icon}>{title}</SectionTitle>
                      <span className="mt-2 block h-1 w-10 rounded bg-brand" />
                      <ul className="relative z-10 mt-5 space-y-3 sm:pr-28">
                        {items.map((it) => (
                          <li key={it} className="flex gap-3 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" />
                            {it}
                          </li>
                        ))}
                      </ul>
                      <div className="pointer-events-none absolute right-3 bottom-2 hidden h-44 w-44 opacity-90 sm:block">
                        <Anim name={anim} className="h-full w-full" />
                      </div>
                    </div>
                  </Reveal>
                )
            )}
          </div>
        </section>
      )}

      {/* ===== models table ===== */}
      {p.models.length > 0 && (
        <section className="bg-white py-14">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
                <SectionTitle icon={Layers}>Available Models</SectionTitle>
                <p className="mt-2 text-sm text-slate-500">Current units in the R.V. Infrastructural fleet.</p>
                <div className="pointer-events-none absolute right-4 top-2 hidden h-24 w-64 sm:block">
                  <Anim name="truck" className="h-full w-full" />
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl ring-1 ring-slate-200">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Type</th>
                        <th className="px-4 py-3 font-semibold">Make</th>
                        <th className="px-4 py-3 font-semibold">Capacity</th>
                        <th className="px-4 py-3 text-right font-semibold">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.models.map((m, n) => (
                        <tr key={n} className="border-t border-slate-100 transition hover:bg-brand-light/60 odd:bg-slate-50/60">
                          <td className="px-4 py-3 font-medium text-navy">{m.type}</td>
                          <td className="px-4 py-3">{m.make}</td>
                          <td className="px-4 py-3">{m.capacity}</td>
                          <td className="px-4 py-3 text-right font-bold text-navy">{m.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== related ===== */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="container-x">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle icon={HardHat}>Related Equipment</SectionTitle>
              <div className="flex items-center gap-4">
                <Link href={categoryHref(cat)} className="hidden items-center gap-1 text-sm font-semibold text-brand-dark hover:underline sm:inline-flex">
                  More in {p.category} <ArrowRight className="h-4 w-4" />
                </Link>
                {related.length > 1 && (
                  <div className="flex gap-2">
                    <button type="button" aria-label="Previous" onClick={() => slide(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-brand hover:bg-brand">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Next" onClick={() => slide(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-brand hover:bg-brand">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div ref={scroller} className="-mx-1 mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={productHref(r)}
                  className="group w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:ring-brand/60 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-navy">
                    <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{r.category}</p>
                      <h4 className="mt-1 font-bold text-navy">{r.name}</h4>
                      <p className="mt-1 truncate text-sm text-slate-500">{r.make} · {r.capacity}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-navy transition group-hover:border-brand group-hover:bg-brand">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-navy py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(246,178,27,.18),transparent_55%)]" />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
              <h3 className="text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                Need the right equipment <br className="hidden sm:block" />
                for your project?
              </h3>
              <p className="mt-3 max-w-md text-slate-500">
                Get expert advice and best pricing for {p.name.toLowerCase()} and other construction equipment.
              </p>
              {renderActions("mt-6")}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto hidden aspect-square w-full max-w-sm rounded-full border-2 border-dashed border-brand/60 p-6 lg:block">
              <Anim name="site" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      <QuoteModal open={open} onClose={close} product={p.name} />
    </>
  );
}