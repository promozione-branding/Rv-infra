"use client";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Construction,
  Factory,
  Gauge,
  HardHat,
  Landmark,
  Layers,
  MessageCircle,
  MoveVertical,
  Phone,
  Play,
  Route,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import LottieIcon from "@/components/LottieIcon";
import QuoteModal from "./QuoteModal";
import { contact } from "@/data/site";
import { productHref, categoryHref, getCategory } from "@/data/product";
import CTABanner from "../CTABanner";

const LOTTIE = {
  gear: "/product_detail/Excavator.json",
  drum: "/product_detail/soilcompactor_industrial.json",
  truck: "/product_detail/truck_mounted_boom_lift_lottie.json",
  hook: "/product_detail/truck_mounted_boom_lift_lottie.json",
  site: "/product_detail/",
};

const HERO_BY_CATEGORY = {
  concrete: "drum",
  cranes: "hook",
  "lifts-and-access": "hook",
  foundation: "gear",
  earthwork: "gear",
};

const LIFT_SVG = "/product_detail/boom-lift-v2.svg";
const APPLICATIONS_IMG = "/industries/ind_2.png"; // override per product with product.applicationsImage

const FEATURE_ICONS = [Truck, Zap, ShieldCheck, MoveVertical];
const APPLICATION_ICONS = [Building2, Factory, Landmark, Route, Construction];

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

/* ---------- Key Features / Typical Applications helpers ---------- */
/* items can be plain strings or { title, desc } */
const norm = (it) => (typeof it === "string" ? { title: it } : it);

const dotsYellow =
  "bg-[radial-gradient(circle,rgba(246,178,27,.55)_1.5px,transparent_1.8px)] bg-[length:14px_14px]";
const dotsBlue =
  "bg-[radial-gradient(circle,rgba(47,93,158,.35)_1.5px,transparent_1.8px)] bg-[length:14px_14px]";

function FeatureRow({ icon: Icon, title, desc, tone }) {
  const circle = tone === "blue" ? "bg-[#e8eefb] text-[#2f5d9e]" : "bg-[#fdf1da] text-brand-dark";
  return (
    <li className="flex items-center gap-4 border-b border-slate-200/70 py-2.5 last:border-b-0">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${circle}`}>
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="font-extrabold leading-snug text-navy">{title}</p>
        {desc && <p className="mt-0.5 text-sm text-slate-500">{desc}</p>}
      </div>
    </li>
  );
}

function CardHeading({ eyebrow, first, second, tone }) {
  return (
    <div>
      <p className={`text-[13px] font-semibold uppercase tracking-[0.3em] ${tone === "blue" ? "text-[#2f5d9e]" : "text-brand"}`}>
        {eyebrow}
      </p>
      <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-navy sm:text-[2.1rem]">
        {first} <span className="text-brand">{second}</span>
      </h3>
      <span className="mt-2 block h-[3px] w-14 rounded bg-brand" />
    </div>
  );
}

function FeaturesCard({ items }) {
  return (
    <div className="relative h-full min-h-[340px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/70">
      {/* warm decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-[#fff6e3]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[62%] bg-gradient-to-bl from-[#fdeccb]/80 to-transparent [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[-4%] hidden aspect-square w-[58%] rounded-full bg-gradient-to-t from-[#fde4b0]/90 via-[#fdeccb]/60 to-transparent sm:block" />
      {/* faint scaffold grid */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 right-[26%] hidden h-[45%] w-[26%] opacity-30 [background-image:linear-gradient(#94a3b8_1px,transparent_1px),linear-gradient(90deg,#94a3b8_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(circle_at_50%_60%,#000_30%,transparent_72%)] sm:block" />
      <div aria-hidden="true" className={`pointer-events-none absolute right-10 top-[26%] hidden h-20 w-32 sm:block ${dotsYellow}`} />

      {/* content */}
      <div className="relative z-10 p-6 sm:p-7 sm:pb-4">
        <CardHeading eyebrow="Key Highlights" first="Key" second="Features" />
        <ul className="mt-3 sm:w-[60%]">
          {items.map((raw, n) => {
            const it = norm(raw);
            return <FeatureRow key={it.title} icon={FEATURE_ICONS[n % FEATURE_ICONS.length]} title={it.title} desc={it.desc} />;
          })}
        </ul>
      </div>

      {/* animated boom lift */}
      <div className="relative z-10 mx-auto -mt-2 h-56 w-full max-w-xs px-6 pb-3 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:h-[92%] sm:w-[48%] sm:max-w-none sm:px-0 sm:pb-3 sm:pr-3">
        <img
          src={LIFT_SVG}
          alt="Animated boom lift"
          className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_18px_rgba(15,23,42,0.18)]"
        />
      </div>
    </div>
  );
}

function ApplicationsCard({ items, image }) {
  return (
    <div className="relative h-full min-h-[340px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/70">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[60%] bg-gradient-to-bl from-[#dbe6f7]/70 to-transparent [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute right-8 top-3 z-20 select-none text-[5rem] font-extrabold leading-none text-[#2f5d9e]/10">02</span>

      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] sm:block">
        <div className="absolute inset-0 bg-brand [clip-path:polygon(1.5%_0,5.5%_0,29%_55%,25%_55%)]" />
        <div className="absolute inset-0 bg-[#2f5d9e] [clip-path:polygon(25%_55%,29%_55%,55.5%_100%,51.5%_100%)]" />
        <div className="absolute inset-0 [clip-path:polygon(8%_0,100%_0,100%_100%,58%_100%)]">
          <img src={image} alt="" className="h-full w-full object-fill" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/10 to-transparent" />
        </div>
      </div>
      <div aria-hidden="true" className={`pointer-events-none absolute right-[36%] top-[62%] hidden h-16 w-16 sm:block ${dotsBlue}`} />

      <div className="relative z-10 p-6 sm:p-7 sm:pb-4">
        <CardHeading eyebrow="Built for more" first="Typical" second="Applications" tone="blue" />
        <ul className="mt-3 sm:w-[66%]">
          {items.map((raw, n) => {
            const it = norm(raw);
            return <FeatureRow key={it.title} icon={APPLICATION_ICONS[n % APPLICATION_ICONS.length]} title={it.title} desc={it.desc} tone="blue" />;
          })}
        </ul>
      </div>

      {/* mobile: photo as a banner under the list */}
      <div className="relative h-36 sm:hidden">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
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
      {/* offset frame accents behind the image */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-3 hidden h-[72%] w-[56%] rounded-2xl border-2 border-brand sm:block" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-3 -top-3 hidden h-28 w-28 rounded-tl-3xl bg-navy sm:block" />

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

        {/* bottom fade + spec chip */}
        {cur.type !== "video" && (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-lg backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {[p.make, p.capacity].filter(Boolean).join(" · ")}
            </div>
          </>
        )}

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

      <div className="pointer-events-none absolute -right-4 -top-4 z-10 hidden h-20 w-30 rounded-full bg-white border border-yellow-600 p-3 shadow-lg ring-4 ring-white sm:block">
        <Anim name={badge} className="h-full w-full" />
      </div>
    </div>
  );
}

export default function ProductDetail({ product: p, related }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const reduce = useReducedMotion();
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

  const specs = [
    { icon: Factory, label: "Make", value: p.make },
    { icon: Gauge, label: "Capacity", value: p.capacity },
    p.units && { icon: Layers, label: "In Fleet", value: `${p.units} units` },
  ].filter(Boolean);

  const renderActions = (className = "") => (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary !px-7 !py-3.5">
        Request a Quote <ArrowUpRight className="h-4 w-4" />
      </button>
      <a href={`tel:${contact.phoneHref}`} className="btn-outline !rounded-md !px-6 !py-3.5 !border-brand bg-white">
        <Phone className="h-4 w-4" /> {contact.phone}
      </a>

      {/* WhatsApp: same height as the other buttons, own pulse rings */}
      <span className="relative inline-flex">
        {!reduce &&
          [0, 1].map((n) => (
            <motion.span
              key={n}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-md bg-[#25D366]/40"
              animate={{ scale: [1, 1.18], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: n, ease: "easeOut" }}
            />
          ))}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative z-10 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1fb455]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </span>
    </div>
  );

  return (
    <>
      <section className="relative z-10 bg-white py-14 lg:py-16">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Gallery product={p} badge="gear" />
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={categoryHref(cat)}
                className="inline-flex rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-brand"
              >
                {p.category}
              </Link>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl xl:text-[2.75rem]">{p.name}</h2>
            <span className="mt-3 block h-1 w-14 rounded bg-brand" />

            <p className="mt-5 text-[17px] leading-relaxed text-slate-600">{p.description}</p>
            {p.highlight && p.highlight !== p.description && (
              <p className="mt-4 rounded-r-lg border-l-4 border-brand bg-brand-light/40 py-2.5 pl-4 pr-3 text-sm font-medium leading-relaxed text-navy/80">
                {p.highlight}
              </p>
            )}

            <dl className="mt-7 flex flex-col divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex-row sm:divide-x sm:divide-y-0">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5 p-4 transition hover:bg-brand-light/50 sm:flex-1">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                    <dd className="mt-0.5 font-bold text-navy">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {renderActions("mt-7")}

            {/* trust badges: navy tiles */}
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 rounded-xl bg-navy px-3.5 py-3 text-xs font-semibold text-white">
                  <Icon className="h-5 w-5 shrink-0 text-brand" /> {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== features + applications ===== */}
      {(p.features.length > 0 || p.applications.length > 0) && (
        <section className="bg-slate-50 py-10">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            {p.features.length > 0 && (
              <Reveal>
                <FeaturesCard items={p.features} />
              </Reveal>
            )}
            {p.applications.length > 0 && (
              <Reveal delay={0.1}>
                <ApplicationsCard items={p.applications} image={p.applicationsImage || APPLICATIONS_IMG} />
              </Reveal>
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

     <CTABanner name={p.name} onQuote={() => setOpen(true)} waHref={waHref} />

      <QuoteModal open={open} onClose={close} product={p.name} />
    </>
  );
}