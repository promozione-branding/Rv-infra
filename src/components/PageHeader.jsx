
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
      className="relative isolate overflow-hidden bg-[#0b1725] pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24"
    >
      {/* =====================================================
          LEFT SIDE: CONSTRUCTION BACKGROUND IMAGE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[63%]"
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

      {/* Stronger left-to-right fade into the plain right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,20,33,0.60) 0%, rgba(7,20,33,0.78) 38%, #0b1725 68%, #0b1725 100%)",
        }}
      />

      {/* =====================================================
          RIGHT SIDE: CLEAN NAVY OVERLAY
          No radial glow or glowing background
      ====================================================== */}

      {hasVisual && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[53%]"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,23,37,0.15), #0b1725 38%, #0b1725 100%)",
          }}
        />
      )}

      {/* Subtle structural grid */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-30"
      />

      {/* =====================================================
          ANGLED YELLOW RECTANGLES — LEFT EDGE
      ====================================================== */}

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
              <p className="mt-5 max-w-[650px] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-[17px]">
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
            className="relative mx-auto aspect-[4/3] w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px]"
          >
            {/* Dashed oval outline — no glow */}
            <div className="absolute inset-2 rounded-[48%] border border-dashed border-[#f6b21b]/70 sm:inset-3" />

            {/* Static decorative orbit dot — no shadow */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f6b21b]"
            />

            {/* Subtle solid inner panel */}
            <div className="absolute inset-7 rounded-[2rem] bg-[#0b1725]/25 sm:inset-9" />

            {/* Preserve the Lottie animation */}
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <LottieIcon
                src={lottieSrc}
                className="h-full w-full scale-110"
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
