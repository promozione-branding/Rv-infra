"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Globe2, Factory, Gauge, Users, ShieldCheck , Settings , Star ,HardHat  , ArrowLeft , Construction, ClipboardCheck, ShieldCheckIcon, BadgeCheck, MapPin, MailCheck, MailIcon, User, Building2, Anchor, ChevronDown, FileText} from "lucide-react";
import Reveal from  "@/components/SectionHeading";
import Icon from "@/components/Icon";
import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "./QuoteForm";
import { fleetGroups, services, industries, whyChoose, projects, safety, clients, company, eqsupplier , featuredProducts } from "@/data/site";
import { useEffect, useRef, useState } from "react";
const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";
const NOTCH = "polygon(0 0, 93% 0, 75% 43%, 100% 100%, 0 100%)";

const badges = [
  { icon: Settings, label: "Latest\nMachinery" },
  { icon: Users, label: "Skilled\nOperators" },
  { icon: ShieldCheck, label: "Safety\nFirst" },
];
const whyStats = [
  { icon: Construction, value: "25+", label: "Years of\nExperience" },
  { icon: HardHat, value: "500+", label: "Projects\nCompleted" },
  { icon: Users, value: "100+", label: "Skilled\nProfessionals" },
]; 
const fallbackDescription = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("boom")) return "Ideal for elevated work at construction, maintenance and industrial sites.";
  if (n.includes("truck")) return "High mobility and quick deployment for diverse lifting requirements.";
  if (n.includes("crawler")) return "Powerful and stable lifting solution for heavy and large-scale projects.";
  return "";
};
 
const SKEW = "-6deg";
const ROT = "-2deg";
const UNTILT = "rotate(2deg) skewX(6deg)"; 
const PER_PAGE = 3;
 
export function Fleet() {
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(fleetGroups.length / PER_PAGE));

  const goTo = (p) => setPage(Math.min(Math.max(p, 0), pages - 1));

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || pages < 2) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 10000);
    return () => clearInterval(id);
  }, [paused, pages, page]);

  return (
    <section id="fleet" className="relative scroll-mt-20 overflow-hidden bg-white">
      <div className="relative">
        <div
          className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <ImageSlot
            src="/images/oil_gas.png"
            alt="Crane lifting at a construction site"
            icon="Construction"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute right-0 top-[30%] z-10 hidden items-center gap-3 rounded-l-3xl bg-white/95 py-3 pl-6 pr-10 shadow-xl backdrop-blur lg:flex">
          <HardHat size={32} strokeWidth={1.5} className="text-navy" />
          <div>
            <p className="text-2xl font-extrabold leading-none text-navy">100+</p>
            <p className="mt-1 text-sm text-slate-600">Projects Supported</p>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-[90%] max-w-[1400px] pb-28 pt-8 lg:w-[80%] lg:pb-32 lg:pt-8">
          <Reveal>
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10" style={{ background: GOLD }} />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                  Our Categories
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl">
                Project Ready
                <br />
                <span style={{ color: GOLD }}>Equipment</span>
              </h2>

              <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
                A modern and well-maintained fleet of cranes, lifts and concrete
                equipment, operated by skilled and dedicated technicians.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-y-3">
                {badges.map((b, i) => (
                  <div
                    key={b.label}
                    className={`flex items-center gap-3 pr-5 ${
                      i !== 0 ? "border-l border-slate-200 pl-5" : ""
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#FDF3DC", color: GOLD }}
                    >
                      <b.icon size={18} />
                    </span>
                    <span className="whitespace-pre-line text-sm font-medium leading-tight text-slate-700">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/projects#fleet-table"
                className="mt-6 inline-flex items-center gap-3 rounded-full border-2 bg-navy px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ borderColor: GOLD }}
              >
                View Full Fleet <ArrowRight size={16} style={{ color: GOLD }} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative flow-root pb-10">
        <div className="absolute inset-0 bg-navy" />

        <div
          className="relative z-20 mx-auto -mt-24 w-[90%] max-w-[1800px] lg:-mt-28 lg:w-[90%]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Prev button – outlined, transparent */}
          <button
            aria-label="Previous"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="absolute -left-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:bg-white/10 disabled:opacity-40 xl:flex"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Next button – gold */}
          <button
            aria-label="Next"
            onClick={() => goTo(page + 1)}
            disabled={page === pages - 1}
            className="absolute -right-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-navy shadow-lg transition hover:scale-105 disabled:opacity-40 xl:flex"
            style={{ background: GOLD }}
          >
            <ArrowRight size={18} />
          </button>

          {/* Cards – exactly one page (3 cards) at a time */}
          <div className="overflow-hidden pb-10 pt-8">
            <motion.div
              animate={{ x: `-${page * 100}%` }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              className="flex"
            >
{Array.from({ length: pages }).map((_, p) => (
  <div
    key={p}
    aria-hidden={p !== page}
    className={`grid w-full shrink-0 gap-12 px-12 transition-opacity duration-500 sm:grid-cols-2 lg:grid-cols-3 ${
      p === page ? "opacity-100" : "pointer-events-none opacity-0"
    }`}
  >
                  {fleetGroups.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE).map((f) => (
                    <div key={f.name} className="group relative h-[340px]">
                      {/* gold backing shape */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                          background: GOLD,
                          transform: `translate(-14px, 12px) skewX(${SKEW}) rotate(${ROT})`,
                        }}
                      />

                      {/* main tilted card */}
                      <article
                        className="absolute inset-0 overflow-hidden rounded-[28px] bg-navy shadow-2xl transition-transform duration-300 group-hover:-translate-y-2"
                        style={{ transform: `skewX(${SKEW}) rotate(${ROT})` }}
                      >
                        {/* image */}
                        <div className="absolute inset-x-0 top-0 h-[74%] overflow-hidden">
                          <ImageSlot
                            src={`${IMAGE_BASE}/${f.image_file}`}
                            alt={f.name}
                            icon="Construction"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                        </div>

                        {/* arrow badge */}
                        <span
                          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-navy/90 text-white"
                          style={{ transform: UNTILT }}
                        >
                          <ArrowRight size={18} />
                        </span>

                        {/* title + gold accent line */}
                        <div
                          className="absolute bottom-[31%] left-6 right-6 text-white"
                          style={{ transform: UNTILT }}
                        >
                          <span className="mb-1.5 block h-[3px] w-9" style={{ background: GOLD }} />
                          <h3 className="text-[22px] font-extrabold leading-tight tracking-tight drop-shadow-sm">
                            {f.name}
                          </h3>
                        </div>

<div className="absolute inset-x-5 bottom-3 grid h-[15%] grid-cols-2 divide-x divide-slate-200 rounded-[20px] bg-white">
  <div
    className="flex min-w-0 items-center gap-2.5 pl-3.5 pr-2"
    style={{ transform: UNTILT }}
  >
    <Factory
      size={18}
      strokeWidth={1.6}
      style={{ color: GOLD }}
      className="shrink-0"
    />
        <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        Make
      </p>
      <p className="truncate whitespace-nowrap text-[13px] font-bold leading-tight tracking-tight text-navy">
        {f.make}
      </p>
    </div>
  </div>

  <div
    className="flex min-w-0 items-center gap-2.5 pl-3.5 pr-2"
    style={{ transform: UNTILT }}
  >
    <Gauge
      size={18}
      strokeWidth={1.6}
      style={{ color: GOLD }}
      className="shrink-0"
    />
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        Capacity
      </p>
      <p className="truncate whitespace-nowrap text-[13px] font-bold leading-tight tracking-tight text-navy">
        {f.capacity}
      </p>
    </div>
  </div>
</div>
                      </article>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {Array.from({ length: pages }).map((_, p) => (
              <button
                key={p}
                aria-label={`Go to page ${p + 1}`}
                onClick={() => goTo(p)}
                className="h-1 w-16 rounded-full transition-colors"
                style={{ background: p === page ? GOLD : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


const initials = (name) =>
  name.replace(/[^A-Za-z\s]/g, " ").split(/\s+/).filter(Boolean)
    .slice(0, 2).map((w) => w[0].toUpperCase()).join("");

// split into 3 rows, keeping the original index for the number badge
const rows = [0, 1, 2].map((r) =>
  eqsupplier.map((name, i) => ({ name, i })).filter((x) => x.i % 3 === r)
);

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function CountUp({ to }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now(), dur = 1400;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}</span>;
}

function SupplierCard({ name, index }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className="eq-card relative mr-3 flex h-16 w-60 shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-brand/60"
    >
      <span className="eq-spot absolute inset-0" />
      <span className="eq-line absolute bottom-0 left-0 h-0.5 w-full bg-brand" />

      <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand/50 text-xs font-bold text-white shadow-lg shadow-brand/20">
        {initials(name)}
      </div>
      <div className="relative min-w-0">
        <p className="text-[9px] font-semibold tracking-[0.2em] text-white/40">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="line-clamp-1 text-[13px] font-semibold leading-snug text-white">{name}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 60 }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="eq-row overflow-hidden py-1"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className={`eq-track flex w-max ${reverse ? "rev" : ""}`}
        style={{ "--d": `${duration}s` }}
      >
        {doubled.map((it, k) => (
          <SupplierCard key={k} name={it.name} index={it.i} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = featuredProducts.length;
  const visible = 3; // cards visible on large screens

  useEffect(() => {
    if (paused || total <= visible) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <section id="featured" className="relative scroll-mt-20 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto w-[92%] max-w-[1400px] lg:w-[90%]">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10" style={{ background: GOLD }} />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Featured Equipments
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Our Most Requested{" "}
                <span style={{ color: GOLD }}>Machines</span>
              </h2>
              <p className="mt-2 max-w-lg text-slate-500">
                A quick look at the equipment most frequently deployed on major infrastructure and industrial projects across India.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                aria-label="Previous"
                onClick={() => go(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-navy shadow-sm transition hover:border-navy"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                aria-label="Next"
                onClick={() => go(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-navy shadow-md transition hover:scale-105"
                style={{ background: GOLD }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${index * (100 / visible)}%` }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            {[...featuredProducts, ...featuredProducts].map((p, i) => (
              <article
                key={`${p.name}-${i}`}
                className="group relative w-[calc(33.333%-1rem)] min-w-[280px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl sm:min-w-[300px] lg:min-w-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageSlot
                    src={`${IMAGE_BASE}/${p.image_file}`}
                    alt={p.name}
                    icon="Construction"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy"
                    style={{ background: GOLD }}
                  >
                    {p.units} Units
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-navy">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.highlight}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                    <span className="font-semibold text-slate-700">{p.make}</span>
                    <span className="font-bold" style={{ color: GOLD }}>{p.capacity}</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {featuredProducts.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index % total ? 28 : 10,
                background: i === index % total ? GOLD : "#cbd5e1",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EquipmentSuppliers() {
  const [ref, seen] = useInView();

  return (
    <section className="relative isolate overflow-hidden bg-[#071626] py-12 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/suppliers.png')",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,18,33,0.94) 0%, rgba(5,20,36,0.78) 48%, rgba(5,17,29,0.50) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div
          ref={ref}
          className={`flex flex-col items-start justify-between gap-5 transition-all duration-700 md:flex-row md:items-center ${
            seen
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="ml-5 max-w-xl md:ml-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Our Equipment Partners
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Equipment sourced from{" "}
              <span className="bg-gradient-to-r from-brand via-amber-300 to-white bg-clip-text text-transparent">
                trusted suppliers
              </span>
            </h2>
          </div>

          <div className="mr-5 rounded-2xl border border-white/15 bg-white/[0.08] px-6 py-3 backdrop-blur-lg md:mr-8">
            <p className="text-3xl font-extrabold leading-none text-white md:text-4xl">
              <CountUp to={eqsupplier.length} />
              <span className="text-brand">+</span>
            </p>

            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
              Supplier partners
            </p>
          </div>
        </div>

        <div className="relative mt-8 space-y-3 md:mt-10">
          <MarqueeRow items={rows[0]} duration={70} />
          <MarqueeRow items={rows[1]} duration={85} reverse />
        </div>
      </div>
    </section>
  );
}

const serviceIconIds = [
  "crane-rental",
  "heavy-lifting",
  "plant-erection",
  "construction-equipment",
  "readymix-concrete",
  "skilled-operators",
];

function getServiceIconId(title, index) {
  const value = title.toLowerCase();

  if (value.includes("crane")) return "crane-rental";
  if (value.includes("lifting") || value.includes("erection") && value.includes("heavy")) return "heavy-lifting";
  if (value.includes("plant")) return "plant-erection";
  if (value.includes("construction") || value.includes("equipment")) return "construction-equipment";
  if (value.includes("concrete") || value.includes("readymix") || value.includes("ready mix")) return "readymix-concrete";
  if (value.includes("operator") || value.includes("support")) return "skilled-operators";

  return serviceIconIds[index] ?? serviceIconIds[0];
}

function ServiceSvgIcon({ id }) {
  return (
    <img
      src={`/icons/${id}.svg`}
      alt=""
      aria-hidden="true"
      width="120"
      height="120"
      className="service-icon h-24 w-24 object-contain overflow-visible transition duration-300 group-hover:-translate-y-1 group-hover:scale-105"
      loading="lazy"
      draggable="false"
    />
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#081522] py-20 sm:py-24"
    >
     <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[45%] max-w-[520px] opacity-70"
>
  <img
    src="/images/bg_left_service.png"
    alt=""
    className="h-full w-full object-cover object-left"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#081522]/40 to-[#081522]" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#081522]/30 via-transparent to-[#081522]/50" />
</div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-amber-400/[0.06] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,49,73,0.22),transparent_70%)]" />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.55fr_0.72fr] lg:gap-8">
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-10 w-1 rounded-full bg-[#FFB91F] shadow-[0_0_18px_rgba(255,185,31,0.55)]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#FFB91F]">
              Our Services
            </span>
          </div>

          <h2 className="max-w-lg text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Complete Lifting{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#FFF0A6] via-[#FFC02E] to-[#F59E0B] bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            End-to-end equipment hiring with safety, efficiency and precision,
            tailored to your project requirements.
          </p>

          <Link
            href="/contact"
            className="group/cta mt-7 inline-flex items-center gap-3 rounded-lg border border-amber-200/40 bg-gradient-to-r from-[#FFD45A] to-[#F5AA12] px-6 py-4 font-bold text-[#101D2A] shadow-[0_8px_28px_rgba(246,178,27,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(246,178,27,0.3)]"
          >
            Enquire Now
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {services.map((s, i) => {
            const iconId = getServiceIconId(s.title, i);

            return (
              <Reveal key={s.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group relative flex min-h-[188px] h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-sky-300/[0.16] bg-gradient-to-br from-[#112438] via-[#0D1D2E] to-[#0A1725] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors duration-300 hover:border-amber-300/60 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:min-h-[205px] sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 h-24 w-24 rounded-full bg-amber-400/0 blur-2xl transition-colors duration-300 group-hover:bg-amber-300/15"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFC02E] to-transparent opacity-70 transition-all duration-300 group-hover:w-20 group-hover:opacity-100"
                  />

                  <div className="relative flex h-24 items-center justify-center">
                    <ServiceSvgIcon id={iconId} />
                  </div>

                  <span className="relative mt-2 max-w-[170px] text-sm font-semibold leading-snug text-white sm:text-[15px]">
                    {s.title}
                  </span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal x={40} className="hidden lg:block">
          <div className="group relative mx-auto w-full max-w-[340px]">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[22px] border border-amber-300/70 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#122236] shadow-[0_22px_60px_rgba(0,0,0,0.3)]">
              <ImageSlot
                src="/images/bg_left_service_box.png"
                alt="Crane lifting a container"
                icon="Anchor"
                className="h-[420px] transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111D]/25 via-transparent to-white/[0.04]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Industries We Serve" title="Powering Multiple Industries" text="Our equipment supports a wide range of sectors, helping industries build, operate and grow." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {industries.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group relative h-40 cursor-pointer overflow-hidden rounded-lg">
                <ImageSlot src={s.image} alt={s.title} icon={s.icon} className="h-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-semibold text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-navy"><Icon name={s.icon} size={13} /></span>{s.title}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#fdfaf3]">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-[51.5%] bg-[#fdf0c8] lg:block"
        style={{ clipPath: NOTCH }}
      />
 
      <div className="absolute inset-y-0 left-0 hidden w-[50.8%] lg:block" style={{ clipPath: NOTCH }}>
        <ImageSlot src="/why_choose.png" alt="RV crane at sunset" icon="Construction" className="h-full w-full object-cover" />
        <div className="absolute left-0 top-0 h-[16%] w-[10%] bg-brand" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
        <div className="absolute left-0 top-0 h-[16%] w-[6%] bg-brand/60" style={{ clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)" }} />
      </div>
 
      <div className="h-44 lg:hidden">
        <ImageSlot src="/why_choose.png" alt="RV crane at sunset" icon="Construction" className="h-full w-full object-cover" />
      </div>
 
      <div className="relative grid gap-8 px-5 py-10 lg:min-h-[510px] lg:grid-cols-[47%_29%_24%] lg:gap-0 lg:px-0 lg:py-0">
        <div className="hidden lg:block" />
 
        {/* centre column */}
        <Reveal>
          <div className="flex h-full flex-col justify-center lg:py-10 lg:pr-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 bg-brand" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-600">Why Choose</span>
            </div>
 
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy xl:text-[2.5rem]">
              RV INFRASTRUCTURAL
              <br />
              <span className="text-brand">PRIVATE LIMITED</span>
            </h2>
 
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Your trusted partner for equipment hire across India since 1999.
              <br className="hidden sm:block" /> Safe lifting. Stronger projects. A better tomorrow.
            </p>
 
            {/* stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {whyStats.map((s) => (
                <div key={s.value} className="rounded-xl bg-brand/10 px-3.5 py-3.5">
                  <s.icon size={24} className="text-brand" strokeWidth={1.8} />
                  <div className="mt-0.5 text-xl font-extrabold leading-tight text-navy">{s.value}</div>
                  <div className="whitespace-pre-line text-xs leading-tight text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
 
            {/* buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#f9b934] to-[#f0a50e] px-7 py-3 text-sm font-semibold text-navy shadow-[0_8px_18px_-8px_rgba(240,165,14,0.8)] transition hover:brightness-105"
              >
                Learn More <ArrowRight size={15} />
              </Link>
              <span className="hidden h-8 w-px bg-slate-300 sm:block" />
              <Link href="/fleet" className="inline-flex items-center gap-2 text-sm font-medium text-navy transition hover:text-brand">
                Explore Our Fleet <ArrowRight size={15} className="text-brand" />
              </Link>
            </div>
          </div>
        </Reveal>
 
        {/* right column: feature list */}
        <div className="flex flex-col justify-center lg:py-6 lg:pl-2 lg:pr-8">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06} x={30} y={0}>
              <motion.div
                whileHover={{ x: 6 }}
                className={`flex items-center gap-3.5 py-3.5 ${i !== whyChoose.length - 1 ? "border-b border-slate-200/70" : ""}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fdeeb9] text-navy">
                  <Icon name={w.icon} size={21} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight text-navy">{w.title}</div>
                  <div className="mt-0.5 text-xs leading-snug text-slate-500">{w.text}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



export function ProjectCards({ list = projects, limit }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.slice(0, limit).map((p, i) => (
        <Reveal key={p.title} delay={i * 0.1}>
          <motion.div whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl">
            <ImageSlot src={p.image} alt={p.title} icon={p.icon} className="h-60" />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 text-xs text-slate-500">{p.text}</p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectsPreview() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Our Projects" title="Lifting Success Across India">
          <Link href="/projects" className="btn-outline w-48">View All Projects <ArrowRight size={14} /></Link>
        </SectionHeading>
        <ProjectCards limit={4} />
      </div>
    </section>
  );
}

const SAFETY_GOLD = "#F5A524";
 
const SAFETY_CARDS = [
  {
    title: "Regular\nEquipment Inspection",
    text: "Routine inspection and maintenance to ensure maximum safety and reliability.",
    icon: ClipboardCheck,
    image: "/industries/ind_1.png",
    href: "/safety#inspection",
  },
  {
    title: "Skilled Operators",
    text: "Certified and experienced operators for efficient and safe operations.",
    icon: HardHat,
    image: "/images/safety.jpg",
    href: "/safety#operators",
  },
  {
    title: "Site Risk Assessment",
    text: "Detailed site evaluation to identify and minimize potential risks.",
    icon: ShieldCheck,
    image: "/images/rv_hero.png",
    href: "/safety#risk",
  },
  {
    title: "Compliance with\nIndustry Standards",
    text: "We adhere to all safety regulations and industry best practices.",
    icon: BadgeCheck,
    image: "/industries/ind_3.png",
    href: "/safety#compliance",
  },
];
 
export function Safety() {
  return (
    <section
      id="safety"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#e5e7eb]"
    >
      <img
        src="/images/construction_card.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-left opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#06101C] via-[#06101C]/90 to-[#06101C]/30" />
 
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[66%] lg:block"
        style={{
          background: `linear-gradient(135deg, ${SAFETY_GOLD}, #7a5410)`,
          clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%, 0 78%, 8% 62%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-[65.5%] lg:block"
        style={{
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 1.5% 100%, 1.5% 77%, 9% 61%)",
        }}
      >
        <img
          src="/safety_.png"
          alt="RV safety officer supervising a crane lift"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06101C] to-transparent" />
      </div>
 
      <div className="relative h-56 lg:hidden">
        <img
          src="/images/safety/hero.jpg"
          alt="RV safety officer supervising a crane lift"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101C] to-transparent" />
      </div>
 
      <div className="relative z-10 mx-auto w-[92%] max-w-[1500px] pb-6 pt-6 lg:pb-6 lg:pt-8">
        <Reveal>
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3 border-l-[3px] pl-4" style={{ borderColor: SAFETY_GOLD }}>
              <span
                className="text-sm font-medium uppercase tracking-[0.25em]"
                style={{ color: SAFETY_GOLD }}
              >
                Safety First
              </span>
            </div>
 
            <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
              Our Commitment
              <br />
              to a Safer <span style={{ color: SAFETY_GOLD }}>Tomorrow</span>
            </h2>
 
            <p className="mt-3 max-w-[440px] text-sm leading-relaxed text-slate-300">
              We follow stringent safety protocols, regular equipment
              inspections and skilled operations to ensure a safe working
              environment on every project.
            </p>
 
            <Link
              href="/safety"
              className="group/btn mt-4 inline-flex items-center gap-3 rounded-full border-2 bg-transparent px-5 py-2 text-sm font-semibold transition hover:bg-white/5"
              style={{ borderColor: SAFETY_GOLD, color: SAFETY_GOLD }}
            >
              Our Safety Practices
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
 
        <div className="h-4 lg:h-10" />
 
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative h-[215px] overflow-hidden rounded-2xl border border-white/10 bg-[#0A1624] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08121F] via-[#08121F]/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08121F]/90 via-transparent to-[#08121F]/30" />
 
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-4 h-[38%] w-[4px] rounded-r"
                  style={{ background: SAFETY_GOLD }}
                />
 
                <div className="relative flex h-full flex-col p-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[#101D2A] shadow-lg"
                    style={{ background: SAFETY_GOLD }}
                  >
                    <c.icon size={22} strokeWidth={1.7} />
                  </span>
 
                  <h3 className="mt-3 whitespace-pre-line text-[15px] font-bold leading-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1 max-w-[210px] text-xs leading-snug text-slate-300">
                    {c.text}
                  </p>
 
                  <Link
                    href={c.href}
                    aria-label={`Learn more: ${c.title.replace("\n", " ")}`}
                    className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-[#F5A524] hover:text-[#101D2A]"
                    style={{ borderColor: SAFETY_GOLD, color: SAFETY_GOLD }}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}





function ClientLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-32 w-48 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-brand hover:shadow-md">
      {failed ? (
        <span className="text-center text-xs font-semibold text-navy">{name}</span>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain transition duration-300 hover:grayscale-0"
        />
      )}
    </div>
  );
}

export function Clients() {
  const row = [...clients, ...clients];
  return (
    <section className="overflow-hidden py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Our Clients" title="Trusted by India's Leading Companies" />
      </div>
      <div className="group relative">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
        {row.map((c, i) => (
  <ClientLogo key={i} {...c} />
))}
        </div>
      </div>
    </section>
  );
}

const Q_GOLD = "#F5B100";
 
function QField({ label, icon: IconCmp, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-[#0F1B2B]">{label}</span>
      <span className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 transition focus-within:border-[#F5B100] focus-within:ring-2 focus-within:ring-[#F5B100]/20">
        <IconCmp size={17} strokeWidth={1.5} className="shrink-0 text-slate-600" />
        {children}
      </span>
    </label>
  );
}
 
const qInput =
  "w-full min-w-0 bg-transparent text-[12.5px] text-slate-800 outline-none placeholder:text-slate-400";
 
export function QuoteSection() {
  const [sent, setSent] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    setSent(true);
  };
 
  const contacts = [
    { icon: Phone, title: "Call Us", text: `${company.mobile}  |  ${company.phones[0]}` },
    { icon: Mail, title: "Email Us", text: company.email },
    { icon: MapPin, title: "Serving Across India", text: "Reliable Lifting Solutions Nationwide", small: true },
  ];
 
  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden bg-[#0F1B2B] py-10 lg:py-[2.7vw]"
    >
      {/* ===== RIGHT ART (lg+): muted gold slab + angled crane photo + gold corner ===== */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[30%] lg:block">
        {/* gold slab behind the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #C9A23F 0%, #B58E2C 100%)",
            clipPath: "polygon(31.7% 0, 57.7% 0, 46% 15%, 38% 30%, 20% 55%, 9% 39%)",
          }}
        />
        {/* photo */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(38% 11.5%, 100% 11.5%, 100% 100%, 88.6% 100%, 0% 90.4%)" }}
        >
          <img
            src="/fleets/crawler_crane.png"
            alt="Crane lifting a concrete block"
            className="h-full w-full object-cover object-[40%_center]"
          />
        </div>
        {/* bright gold corner, bottom right */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: Q_GOLD,
            clipPath: "polygon(100% 77%, 100% 100%, 88.6% 100%)",
          }}
        />
      </div>
 
      <div className="relative grid gap-10 px-[4.8%] lg:grid-cols-[39.6%_minmax(0,1fr)] lg:items-center lg:gap-[3.9%] lg:pr-0">
        <Reveal>
          <div className="rounded-2xl bg-[#FBFBFC] px-6 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-8 lg:px-[2.3%] lg:py-[1.8%]">
            <span className="block h-[4px] w-[52px] rounded-full" style={{ background: Q_GOLD }} />
            <h2 className="mt-2.5 text-[28px] font-extrabold leading-tight tracking-tight text-[#0F1B2B] sm:text-[32px]">
              Request a <span style={{ color: Q_GOLD }}>Quote</span>
            </h2>
            <p className="mt-0.5 text-[13.5px] text-slate-500">
              Fill in your details and our team will get back to you shortly.
            </p>
 
            <form onSubmit={handleSubmit} className="mt-4 grid gap-x-[5%] gap-y-3 sm:grid-cols-2">
              <QField label="Full Name *" icon={User}>
                <input name="name" required placeholder="Enter your full name" className={qInput} />
              </QField>
              <QField label="Company Name" icon={Building2}>
                <input name="company" placeholder="Enter company name" className={qInput} />
              </QField>
              <QField label="Email Address *" icon={Mail}>
                <input name="email" type="email" required placeholder="Enter your email address" className={qInput} />
              </QField>
              <QField label="Phone Number *" icon={Phone}>
                <input name="phone" type="tel" required placeholder="Enter your phone number" className={qInput} />
              </QField>
              <QField label="Project Location" icon={MapPin}>
                <input name="location" placeholder="Enter project location" className={qInput} />
              </QField>
              <QField label="Equipment Required" icon={Anchor}>
                <select name="equipment" defaultValue="" className={`${qInput} cursor-pointer appearance-none text-slate-600`}>
                  <option value="" disabled>Select equipment</option>
                  {fleetGroups.map((f) => (
                    <option key={f.name} value={f.name}>{f.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} strokeWidth={2.2} className="shrink-0 text-slate-900" />
              </QField>
 
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-[13px] font-semibold text-[#0F1B2B]">Project Details</span>
                <span className="flex gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 transition focus-within:border-[#F5B100] focus-within:ring-2 focus-within:ring-[#F5B100]/20">
                  <FileText size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-slate-600" />
                  <textarea
                    name="details"
                    rows={2}
                    placeholder="Tell us about your project..."
                    className={`${qInput} resize-y`}
                  />
                </span>
              </label>
 
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="group/btn inline-flex items-center gap-3 rounded-lg px-8 py-3 text-[15px] font-bold text-[#0F1B2B] transition hover:-translate-y-0.5 hover:brightness-105"
                  style={{ background: Q_GOLD }}
                >
                  Submit Request
                  <ArrowRight size={18} strokeWidth={2.2} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
                {sent && (
                  <span className="ml-4 text-sm font-medium text-emerald-600">
                    Thanks! We&apos;ll contact you shortly.
                  </span>
                )}
              </div>
            </form>
          </div>
        </Reveal>
 
        <Reveal x={30} y={0}>
          <div className="lg:max-w-[460px]">
            <div className="flex items-center border-l-[3px] pl-4" style={{ borderColor: Q_GOLD }}>
              <span
                className="py-1 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: Q_GOLD }}
              >
                Get in Touch
              </span>
            </div>
 
            <h2 className="mt-5 text-[clamp(2.2rem,3.9vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              Let&apos;s Lift Your
              <br />
              Next <span style={{ color: Q_GOLD }}>Project</span>
            </h2>
 
            <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-slate-300">
              Share your requirements and our team will get back to you with the best solution.
            </p>
 
            <ul className="mt-6 space-y-3.5">
              {contacts.map((c) => (
                <li key={c.title} className="flex items-center gap-4">
                  <span
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#1A2738]"
                    style={{ color: Q_GOLD }}
                  >
                    <c.icon size={25} strokeWidth={1.6} />
                  </span>
                  <span className="h-11 w-[2px]" style={{ background: Q_GOLD, opacity: 0.75 }} />
                  <div className="min-w-0">
                    <p className="text-[15.5px] font-semibold leading-tight text-white">{c.title}</p>
                    <p className={`mt-0.5 leading-snug text-slate-200 ${c.small ? "text-[13px]" : "text-[15.5px]"}`}>
                      {c.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
 
      <div className="mx-[4.8%] mt-10 overflow-hidden rounded-2xl lg:hidden">
        <img src="/fleets/crawler_crane.png" alt="Crane lifting a concrete block" className="h-56 w-full object-cover" />
      </div>
    </section>
  );
}
 
