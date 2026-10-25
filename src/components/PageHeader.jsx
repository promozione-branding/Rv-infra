"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronRight, Home, ShieldCheck } from "lucide-react";

import Reveal from "@/components/Reveal";
import LottieIcon from "@/components/LottieIcon";
import CraneFallback from "@/components/CraneFallback";

const wordIn = {
  hidden: { y: "110%", opacity: 0 },
  show: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.25 + i * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function PageHeader({
  eyebrow,
  title,
  text,
  highlight = "",
  lottieSrc,
  crumb,
  parents = [],
  backgroundImage = "/fleets/boom_lifts.png",
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 80,
    damping: 18,
  });

  const sy = useSpring(my, {
    stiffness: 80,
    damping: 18,
  });

  const vx = useTransform(sx, [-1, 1], [-8, 8]);
  const vy = useTransform(sy, [-1, 1], [-5, 5]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const hi = highlight
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const words = String(title).split(" ");
  const hasVisual = Boolean(lottieSrc);

  return (
    <section
      onMouseMove={onMove}
      className="relative isolate overflow-hidden bg-[#0b1725] pt-10 sm:pb-20 sm:pt-14 lg:pb-14"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[55%]"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay over the background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#071421]/75"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        
      />


      {hasVisual && (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[53%] lg:block"
  >
    {/* Slanted panel: gradient + amber glow */}
    <div
      className="absolute inset-0"
      style={{
        clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
        background:
          "radial-gradient(circle at 55% 55%, rgba(246,178,27,0.22), transparent 55%), radial-gradient(circle at 85% 10%, rgba(59,130,246,0.18), transparent 45%), linear-gradient(135deg, #10253c 0%, #0a1624 55%, #07101b 100%)",
      }}
    >
      {/* Dot grid, fading toward the edges */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at 55% 55%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 55% 55%, black 20%, transparent 70%)",
        }}
      />

      {/* Concentric blueprint rings */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {[18, 28, 38, 48].map((r) => (
          <circle
            key={r}
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke="#f6b21b"
            strokeOpacity={0.25 - r / 400}
            strokeWidth="0.15"
            strokeDasharray="1 1.5"
          />
        ))}
        <line x1="55" y1="0" x2="55" y2="100" stroke="#fff" strokeOpacity="0.06" strokeWidth="0.15" />
        <line x1="0" y1="55" x2="100" y2="55" stroke="#fff" strokeOpacity="0.06" strokeWidth="0.15" />
      </svg>
    </div>

    {/* Amber edge line following the slant */}
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1="10" y1="0" x2="0" y2="100"
        stroke="#f6b21b"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="12" y1="0" x2="2" y2="100"
        stroke="#f6b21b"
        strokeOpacity="0.35"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </div>
)}

      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-30"
      />


      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-[-40px] z-0 h-20 w-[340px] -rotate-45 bg-[#f6b21b]/20 sm:h-24 sm:w-[420px]"
      />

    

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 bottom-8 z-0 h-10 w-[240px] -rotate-45 border border-[#f6b21b]/40 sm:w-[300px]"
      />


      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[-55px] z-0 h-16 w-[300px] -rotate-45 bg-[#f6b21b]/90 sm:h-20 sm:w-[380px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-28 z-0 h-3 w-[260px] -rotate-45 bg-[#f6b21b]/50 sm:w-[330px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-16 z-0 h-12 w-[240px] -rotate-45 border border-[#f6b21b]/40 sm:w-[300px]"
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className={`container-x relative z-10 grid items-center gap-8 lg:gap-10 ${
          hasVisual ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
        }`}
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10 min-w-0">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#142233]/80 px-3.5 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm sm:text-sm"
          >
            <Link
              href="/"
              className="flex items-center gap-2 transition-colors hover:text-[#f6b21b]"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {parents.map((pp) => (
              <span key={pp.href} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-500" />
                <Link href={pp.href} className="transition-colors hover:text-[#f6b21b]">
                  {pp.label}
                </Link>
              </span>
            ))}

            <ChevronRight className="h-4 w-4 text-slate-500" />

            <span
              aria-current="page"
              className="font-semibold text-[#f6b21b]"
            >
              {crumb || eyebrow}
            </span>
          </motion.nav>

          {/* Eyebrow */}
          <Reveal delay={0.05}>
            <div className="eyebrow !text-[#f6b21b]">
              {eyebrow}
            </div>
          </Reveal>

          {/* Heading */}
          <h1
            aria-label={title}
            className="mt-3 max-w-[850px] text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-[64px]"
          >
            {words.map((word, i) => {
              const cleanWord = word
                .toLowerCase()
                .replace(/[^\w]/g, "");

              const isHighlighted = hi.includes(cleanWord);

              return (
                <span
                  key={`${word}-${i}`}
                  className="mr-[0.24em] inline-block overflow-hidden align-bottom"
                  aria-hidden="true"
                >
                  <motion.span
                    className={`inline-block ${
                      isHighlighted
                        ? "text-[#f6b21b]"
                        : "text-white"
                    }`}
                    variants={wordIn}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          {/* Description */}
          {text && (
            <Reveal delay={0.55}>
              <p className="mt-5 max-w-[580px] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-[17px]">
                {text}
              </p>
            </Reveal>
          )}

        
        </div>

        {hasVisual && (
          <motion.div
            style={{ x: vx, y: vy }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto aspect-[4/3] w-full max-w-[540px] sm:max-w-[500px] lg:max-w-[560px]"
          >
            <div className="absolute inset-2 rounded-[48%] border border-dashed border-[#f6b21b]/70 sm:inset-3" />

            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f6b21b]"
            />


            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <LottieIcon
                src={lottieSrc}
                className="h-[550px] w-[600px] scale-100"
                fallback={
                  <CraneFallback className="h-full w-full" />
                }
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom edge */}
      <div
        aria-hidden="true"
        className="hazard-bar absolute inset-x-0 bottom-0 h-1"
      />
    </section>
  );
}