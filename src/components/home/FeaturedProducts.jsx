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
import { featuredProducts } from "@/data/site";

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

const WHEELS_NEAR = [52, 88, 200, 236];
const WHEELS_FAR = [58, 94, 206, 242];
const WHEEL_Y = 133;

function Wheel({ x, spin }) {
  const ref = useRef(null);

  const apply = (v) => ref.current?.setAttribute("transform", `rotate(${v})`);
  useMotionValueEvent(spin, "change", apply);
  useEffect(() => apply(spin.get()), [spin]); // eslint-disable-line

  return (
    <g transform={`translate(${x} ${WHEEL_Y})`}>
      <circle r="17" fill="url(#cr-tire)" />
      <g ref={ref}>
        <circle
          r="15.2"
          fill="none"
          stroke="#05070d"
          strokeWidth="3.4"
          strokeDasharray="4.2 4.6"
          opacity="0.85"
        />
        <circle r="11.5" fill="#2b3340" />
        <circle r="8.2" fill="url(#cr-rim)" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            cx={5 * Math.cos((a * Math.PI) / 180)}
            cy={5 * Math.sin((a * Math.PI) / 180)}
            r="1.25"
            fill="#1f2937"
          />
        ))}
      </g>
      <circle r="2.4" fill="#111827" />
      <path
        d="M -13 -8 A 15 15 0 0 1 -3 -15"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function CraneSvg({ spin, cx }) {
  const hookRef = useRef(null);
  const swing = useRef({ angle: 0, vel: 0, lastCx: null });

  // Hook + cable swing: a damped pendulum that is pushed by the crane's
  useAnimationFrame((t, delta) => {
    const el = hookRef.current;
    if (!el) return;
    const s = swing.current;
    const dt = Math.min(delta, 50) / 1000 || 0.016;
    const now = cx.get();
    if (s.lastCx === null) s.lastCx = now;
    const speed = (now - s.lastCx) / dt; 
    s.lastCx = now;

    const push = -speed * 140; 
    const k = 26;
    const c = 2.6;
    s.vel += (-k * s.angle - c * s.vel + push) * dt;
    s.angle += s.vel * dt;
    s.angle = Math.max(-28, Math.min(28, s.angle));

    const idle = 6 * Math.sin(t / 520);
    el.setAttribute("transform", `rotate(${s.angle + idle} 251 10)`);
  });

  return (
    <svg
      viewBox="0 0 300 150"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="cr-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD970" />
          <stop offset="0.45" stopColor="#F5B323" />
          <stop offset="1" stopColor="#AE720A" />
        </linearGradient>
        <linearGradient id="cr-yellow-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C98A0E" />
          <stop offset="0.5" stopColor="#F5B323" />
          <stop offset="1" stopColor="#FFCB45" />
        </linearGradient>
        <linearGradient id="cr-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E5E7EB" />
          <stop offset="0.5" stopColor="#9CA3AF" />
          <stop offset="1" stopColor="#4B5563" />
        </linearGradient>
        <linearGradient id="cr-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4B5563" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="cr-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D6EEFF" />
          <stop offset="1" stopColor="#3C7FB1" />
        </linearGradient>
        <radialGradient id="cr-tire" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#3B4452" />
          <stop offset="1" stopColor="#06080E" />
        </radialGradient>
        <radialGradient id="cr-rim" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#F9FAFB" />
          <stop offset="1" stopColor="#6B7280" />
        </radialGradient>
        <radialGradient id="cr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF6B8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF6B8" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="cr-haz"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill="#F5B323" />
          <rect width="4" height="8" fill="#111827" />
        </pattern>
      </defs>

      {[0, 0.7, 1.4].map((delay) => (
        <circle key={delay} cx="42" cy="34" r="3" fill="#9CA3AF" opacity="0">
          <animate attributeName="cy" values="34;14" dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="cx" values="42;24" dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="2;7" dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.45;0" dur="2.1s" begin={`${delay}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {WHEELS_FAR.map((x) => (
        <g key={`far-${x}`} transform="translate(0 -5)">
          <circle cx={x} cy={WHEEL_Y} r="17" fill="#0A0D14" />
          <circle cx={x} cy={WHEEL_Y} r="8" fill="#2A313D" />
        </g>
      ))}

      <rect x="14" y="100" width="260" height="19" rx="3" fill="url(#cr-dark)" />
      {/* carrier body: top face + side face for a 3D look */}
      <path d="M14 84 L26 76 H204 L204 84 Z" fill="#FFE08A" />
      <rect x="14" y="84" width="190" height="20" rx="2" fill="url(#cr-yellow)" />
      <rect x="14" y="84" width="190" height="2" fill="#fff" opacity="0.4" />
      <rect x="14" y="100" width="190" height="4" fill="#000" opacity="0.25" />
      <line x1="112" y1="86" x2="112" y2="102" stroke="#7A4F05" strokeOpacity="0.55" />
      <line x1="150" y1="86" x2="150" y2="102" stroke="#7A4F05" strokeOpacity="0.55" />
      <rect x="116" y="93" width="30" height="5" rx="1" fill="url(#cr-haz)" />
      <rect x="20" y="88" width="20" height="3" rx="1.5" fill="#7A4F05" opacity="0.5" />

      <rect x="22" y="104" width="7" height="20" rx="1.5" fill="url(#cr-steel)" />
      <rect x="14" y="123" width="23" height="5" rx="1.5" fill="url(#cr-dark)" />

      <rect x="36" y="72" width="82" height="6" rx="2" fill="url(#cr-dark)" />
      <path d="M12 56 L20 50 H36 V76 H12 Z" fill="url(#cr-dark)" />
      <rect x="12" y="56" width="24" height="3" fill="#fff" opacity="0.12" />
      <path d="M32 54 L42 46 H112 V74 H32 Z" fill="#FFE08A" />
      <rect x="32" y="54" width="80" height="20" rx="2" fill="url(#cr-yellow)" />
      <rect x="32" y="54" width="80" height="2" fill="#fff" opacity="0.4" />
      <rect x="40" y="60" width="26" height="9" rx="1.5" fill="#7A4F05" opacity="0.35" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={44 + i * 6} y1="61" x2={44 + i * 6} y2="68" stroke="#FFD970" strokeOpacity="0.6" />
      ))}
      <rect x="39" y="34" width="6" height="14" rx="1" fill="url(#cr-steel)" />
      <rect x="38" y="33" width="8" height="3" rx="1" fill="#111827" />
      <circle cx="100" cy="62" r="9" fill="url(#cr-steel)" />
      <circle cx="100" cy="62" r="4" fill="#1F2937" />

      <g transform="translate(100 62) rotate(-19)">
        <rect x="-12" y="7" width="168" height="4" rx="2" fill="#000" opacity="0.12" />
        <rect x="108" y="-4.5" width="54" height="9" rx="2" fill="url(#cr-yellow)" />
        <rect x="58" y="-6.5" width="64" height="13" rx="2.5" fill="url(#cr-yellow)" />
        <rect x="-14" y="-9" width="86" height="18" rx="3" fill="url(#cr-yellow)" />
        <line x1="-12" y1="-7.2" x2="70" y2="-7.2" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="60" y1="-5" x2="120" y2="-5" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="110" y1="-3" x2="160" y2="-3" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />
        <rect x="68" y="-9.5" width="6" height="19" rx="1.5" fill="url(#cr-dark)" />
        <rect x="118" y="-7" width="5" height="14" rx="1.5" fill="url(#cr-dark)" />
        <rect x="6" y="-4" width="22" height="8" rx="1" fill="url(#cr-haz)" />
        <rect x="34" y="-3.5" width="26" height="7" rx="1.5" fill="#111827" opacity="0.8" />
        <rect x="38" y="-1" width="18" height="2" rx="1" fill={GOLD} />
        <circle cx="160" cy="0" r="6" fill="url(#cr-steel)" />
        <circle cx="160" cy="0" r="2.2" fill="#1F2937" />
      </g>

      <line x1="90" y1="74" x2="120" y2="64" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      <line x1="90" y1="74" x2="120" y2="64" stroke="url(#cr-steel)" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="118" y1="65" x2="141" y2="57" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="141" cy="57" r="2.6" fill="#1F2937" />

      <path
        d="M204 104 V74 L214 69 H250 L262 80 L272 92 V104 Z"
        fill="url(#cr-yellow-side)"
      />
      <path d="M204 74 L214 69 H250 L262 80 H204 Z" fill="#FFE08A" opacity="0.9" />
      <path d="M220 74 H247 L258 87 H220 Z" fill="url(#cr-glass)" />
      <path d="M226 74 L237 74 L227 87 L220 87 L220 80 Z" fill="#fff" opacity="0.28" />
      <path d="M220 74 H247 L258 87 H220 Z" stroke="#0F172A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M232 89 V103" stroke="#7A4F05" strokeOpacity="0.6" />
      <rect x="236" y="94" width="7" height="2.4" rx="1" fill="#7A4F05" opacity="0.7" />
      <rect x="256" y="78" width="5" height="8" rx="1.5" fill="#111827" />
      <rect x="208" y="105" width="22" height="4" rx="1" fill="url(#cr-dark)" />
      <rect x="264" y="101" width="12" height="7" rx="2" fill="url(#cr-dark)" />
      <circle cx="270" cy="93" r="9" fill="url(#cr-glow)" />
      <rect x="266" y="90" width="6" height="6" rx="1.5" fill="#FFF3B0" />
      <rect x="232" y="65" width="8" height="4" rx="1" fill="#111827" />
      <circle cx="236" cy="63" r="3.2" fill="#FF7A00">
        <animate attributeName="opacity" values="1;0.15;1" dur="1.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="236" cy="63" r="8" fill="#FF7A00" opacity="0">
        <animate attributeName="opacity" values="0.35;0;0.35" dur="1.1s" repeatCount="indefinite" />
      </circle>

      {WHEELS_NEAR.map((x) => (
        <g key={`near-${x}`}>
          <Wheel x={x} spin={spin} />
          <path
            d={`M ${x - 24} ${WHEEL_Y} A 24 24 0 0 1 ${x + 24} ${WHEEL_Y} L ${x + 21} ${WHEEL_Y} A 21 21 0 0 0 ${x - 21} ${WHEEL_Y} Z`}
            fill="url(#cr-dark)"
          />
        </g>
      ))}

      <g ref={hookRef}>
        <line x1="249.5" y1="12" x2="249.5" y2="40" stroke="#1F2937" strokeWidth="1.2" />
        <line x1="252.5" y1="12" x2="252.5" y2="40" stroke="#1F2937" strokeWidth="1.2" />
        <rect x="244" y="40" width="14" height="12" rx="2.5" fill="url(#cr-haz)" stroke="#111827" strokeWidth="1.2" />
        <rect x="244" y="40" width="14" height="3" rx="1.5" fill="#fff" opacity="0.3" />
        <path
          d="M251 52 v4 a5 5 0 1 1 -5 5"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M251 52 v4 a5 5 0 1 1 -5 5"
          stroke="#9CA3AF"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

function SectionHeader({ controls, compact = false }) {
  return (
    <Reveal>
      <div className={`${compact ? "mb-6" : "mb-10"} flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end`}>
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10" style={{ background: GOLD }} />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Featured Equipments
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Our Most Requested <span style={{ color: GOLD }}>Machines</span>
          </h2>
          <p className="mt-2 max-w-lg text-slate-500">
            A quick look at the equipment most frequently deployed on major
            infrastructure and industrial projects across India.
          </p>
        </div>
        {controls}
      </div>
    </Reveal>
  );
}

function CardBody({ p, imgClass = "h-48" }) {
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
          {p.units} Units
        </span>
      </div>
      <div className="shrink-0 p-5">
        <h3 className="text-lg font-extrabold text-navy">{p.name}</h3>
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
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16">
        <div className="mx-auto w-[90%] max-w-[1400px]">
          <SectionHeader compact />

          {/* card row — the crane drives along the SAME row */}
          <div
            className="relative"
            style={{ height: "clamp(300px, calc(100vh - 340px), 400px)" }}
          >
            {products.map((p, k) => (
              <ScrollCard key={p.name} p={p} k={k} progress={progress} N={N} />
            ))}
          </div>

          {/* progress line — the crane's wheels sit directly on it */}
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
              <CraneSvg spin={wheelSpin} cx={craneCx} />
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
              className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 sm:w-[46%]"
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
    <div id="featured" className="scroll-mt-20">
      <ScrollScene />
      <MobileCarousel />
    </div>
  );
}
