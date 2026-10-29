"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Link from "next/link";
import { featuredProducts } from "@/data/site";
import { slugify } from "@/data/product";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";

const VISIBLE = 3;
const GAP = 24;
const CRANE_FROM = -0.15;
const CRANE_TO = 3.15;
const REVEAL_AT = 0.5;
const REVEAL_SPAN = 0.5;
const VH_PER_CARD = 120;

// Only show 2 sets of 3 cards (total 6)
const products = featuredProducts.slice(0, 6);

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function craneAt(c, N) {
  const cc = clamp(c, 0, N - 0.0001);
  const phase1 = Math.min(N, VISIBLE);
  if (cc < phase1) {
    const cx = CRANE_FROM + (cc / phase1) * (CRANE_TO - CRANE_FROM);
    return { cx, opacity: clamp((CRANE_TO - cx) / 0.25), k: -1, f: 0 };
  }
  const k = Math.floor(cc);
  const f = cc - k;
  const cx = CRANE_FROM + (CRANE_TO - CRANE_FROM) * clamp(f / 0.9);
  const fadeIn = clamp((cx - CRANE_FROM) / 0.2);
  const fadeOut = clamp((CRANE_TO - cx) / 0.25);
  return { cx, opacity: Math.min(fadeIn, fadeOut), k, f };
}

function shiftAt(c, N) {
  const cc = clamp(c, 0, N - 0.0001);
  let w = 0;
  for (let j = VISIBLE; j < N; j++) {
    w += ease(clamp((cc - j) / 0.25));
  }
  return w;
}

function revealAt(k, c, N) {
  const cc = clamp(c, 0, N - 0.0001);
  const phase1 = Math.min(N, VISIBLE);
  if (k < VISIBLE) {
    if (cc >= phase1) return 1;
    const { cx } = craneAt(cc, N);
    return ease(clamp((cx - (k + REVEAL_AT)) / REVEAL_SPAN));
  }
  if (cc < k) return 0;
  if (cc >= k + 1) return 1;
  const { cx } = craneAt(cc, N);
  return ease(clamp((cx - (VISIBLE - 1 + REVEAL_AT)) / REVEAL_SPAN));
}


function SectionHeader({ controls, compact = false }) {
  return (
    <Reveal>
      <div className={`${compact ? "mb-6" : "mb-10"} flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mt-8`}>
        <div>
          <div className="flex items-center gap-3 mt-6">
            <span className="h-[2px] w-10" style={{ background: GOLD }} />
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Featured Equipments
            </span>
          </div>
          <h2 className="mt-4 mb-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Our Most Requested <span style={{ color: GOLD }}>Machines</span>
          </h2>
          <p className="mt-4 max-w-lg text-slate-500">
            Explore our most requested truck-mounted boom lifts, designed for reliable aerial access across infrastructure, industrial, and maintenance projects throughout India.
          </p>
        </div>
        {controls}
      </div>
    </Reveal>
  );
}

function CardBody({ p, imgClass = "h-64" }) {
  return (
    <>
      <div className={`relative overflow-hidden ${imgClass}`}>
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
          {p.units}
        </span>
      </div>
      <div className="shrink-0 p-5">
        <h3 className="text-lg font-extrabold text-navy">
          <Link href={`/products/${slugify(p.name)}`} className="after:absolute after:inset-0 after:z-10 hover:text-brand-dark">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-slate-500">{p.highlight}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm">
          <span className="font-semibold text-slate-700">{p.make}</span>
          <span className="whitespace-nowrap font-bold" style={{ color: GOLD }}>
            {p.capacity}
          </span>
        </div>
      </div>
    </>
  );
}

function ScrollCard({ p, k, progress, N }) {
  const slot = useTransform(progress, (v) => k - shiftAt(v * N, N));
  const reveal = useTransform(progress, (v) => revealAt(k, v * N, N));

  const x = useTransform(slot, (s) => `calc(${s * 100}% + ${s * GAP}px)`);
  const opacity = useTransform([slot, reveal], ([s, r]) =>
    r * (s < 0 ? clamp(1 + s) : 1)
  );
  const y = useTransform(reveal, (r) => (1 - r) * 90);
  const scale = useTransform(reveal, (r) => 0.82 + 0.18 * r);

  return (
    <motion.article
      className="group absolute bottom-0 left-0 top-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100"
      style={{
        width: `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
        x,
        y,
        scale,
        opacity,
        transformOrigin: "bottom center",
      }}
    >
      <CardBody p={p} imgClass="min-h-0 flex-1" />
    </motion.article>
  );
}

function ScrollScene() {
  const N = products.length;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.8,
  });

  const craneLeft = useTransform(
    progress,
    (v) => `${(craneAt(v * N, N).cx * 100) / VISIBLE}%`
  );
  const craneOpacity = useTransform(progress, (v) => craneAt(v * N, N).opacity);
  const barWidth = useTransform(progress, (v) => `${v * 100}%`);
  // wheels turn in proportion to how far the crane has driven
  const wheelSpin = useTransform(progress, (v) => craneAt(v * N, N).cx * 1260);
  const craneCx = useTransform(progress, (v) => craneAt(v * N, N).cx);

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-slate-50 lg:block"
      style={{ height: `${(N + 1) * VH_PER_CARD}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16 pb-16">
        <div className="mx-auto w-[90%] max-w-[1400px] mb-12">
          <SectionHeader compact />

         <div
  className="relative"
  style={{ height: "clamp(440px, calc(100vh - 240px), 720px)" }}
>
            {products.map((p, k) => (
              <ScrollCard key={p.name} p={p} k={k} progress={progress} N={N} />
            ))}
          </div>

          <div className="relative mt-2 h-[3px] w-full rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full"
              style={{ background: GOLD, width: barWidth }}
            />
            <motion.div
              className="pointer-events-none absolute z-20"
              style={{
                left: craneLeft,
                bottom: 2, // wheels rest on the line
                x: "-50%",
                opacity: craneOpacity,
                width: 270,
                height: 135,
              }}
            >
             
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCarousel() {
  const scroller = useRef(null);
  const go = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="relative bg-slate-50 py-16 lg:hidden">
      <div className="mx-auto w-[92%] max-w-[1400px]">
        <SectionHeader
          controls={
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
          }
        />
        <div
          ref={scroller}
          className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 sm:w-[46%]"
            >
              <CardBody p={p} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <div id="featured" className="scroll-mt-20 pb-8 lg:pb-12">
      <ScrollScene />
      <MobileCarousel />
    </div>
  );
}