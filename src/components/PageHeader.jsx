"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Cog,
  Home,
  PhoneCall,
  ShieldCheck,
  Zap,
} from "lucide-react";

import LottieIcon from "@/components/LottieIcon";
import CraneFallback from "@/components/CraneFallback";

const EASE = [0.22, 1, 0.36, 1];

const DEFAULT_FEATURES = [
  { icon: Cog, label: "High Mobility" },
  { icon: Zap, label: "Quick Deployment" },
  { icon: ShieldCheck, label: "Reliable Performance" },
];

const wordIn = {
  hidden: { y: "105%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE },
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
  features = DEFAULT_FEATURES,
  ctaLabel = "Request a Quote",
  ctaHref = "/contact",
  phone = "+91 9870173713",
}) {
  const reduce = useReducedMotion();

  // Mouse parallax on the illustration
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const lx = useTransform(sx, [-1, 1], [-10, 10]);
  const ly = useTransform(sy, [-1, 1], [-5, 5]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const words = String(title).split(" ");
  const hi = highlight.toLowerCase().split(/\s+/).filter(Boolean);
  const clean = (w) => w.toLowerCase().replace(/[^\w]/g, "");
  const isGold = (w, i) =>
    hi.length ? hi.includes(clean(w)) : i === words.length - 1;
  const hasVisual = Boolean(lottieSrc);

  const draw = (delay) => ({
    initial: reduce ? false : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1, delay, ease: EASE },
  });

  const rise = (delay) => ({
    initial: reduce ? false : { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      onMouseMove={onMove}
      className="relative isolate overflow-hidden lg:min-h-[500px]"
      style={{
        background:
          "radial-gradient(800px 360px at 18% 30%, #fffdf8 0%, #f8f1e3 70%, #f3e9d6 100%)",
      }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
        viewBox="0 0 2048 768"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 120,0 0,160" fill="#0f1f3d" />
        <polygon points="1800,0 2048,0 2048,768 760,768 1022,712 1800,712" fill="#0f1f3d" />
        <motion.line x1="120" y1="0" x2="0" y2="160" stroke="#f2b01c" strokeWidth="2.5" vectorEffect="non-scaling-stroke" {...draw(0.2)} />
        <motion.line x1="760" y1="768" x2="1022" y2="712" stroke="#f2b01c" strokeWidth="3" vectorEffect="non-scaling-stroke" {...draw(0.4)} />
        <motion.line x1="2048" y1="300" x2="1900" y2="590" stroke="#f2b01c" strokeWidth="2" vectorEffect="non-scaling-stroke" {...draw(0.6)} />
      </svg>

      {/* Text column */}
      <div className="container-x relative z-10 pb-7 pt-6 lg:flex lg:min-h-[572px] lg:items-center lg:py-6">
        <div className="min-w-0 lg:w-[50%]">
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ol className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#0f1f3d]/15 bg-white/50 px-3.5 py-1 text-[13px] text-[#0f1f3d]">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#d99a0c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2b01c]"
                >
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
            className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#0f1f3d] sm:text-[2.6rem] lg:text-[2.8rem] xl:text-[3.2rem]"
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
              className="mt-2 max-w-[32rem] text-sm leading-6 text-slate-500 sm:text-[15px]"
            >
              {text}
            </motion.p>
          )}

          {/* Features: plain inline row */}
          {features?.length > 0 && (
            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] font-semibold text-[#0f1f3d]">
              {features.map(({ icon: Icon, label }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-2 ${
                    i > 0 ? "border-l border-slate-300 pl-4" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 text-[#f2b01c]" />
                  {label}
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md bg-[#f2b01c] px-5 py-2.5 text-sm font-bold text-[#0f1f3d] transition-colors hover:bg-[#e0a010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f1f3d]"
            >
              <span className="relative z-10">{ctaLabel}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/45"
                  animate={{ x: ["0%", "450%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
                />
              )}
            </Link>

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-md border border-[#f2b01c] bg-white/40 px-4 py-2.5 text-sm font-bold text-[#0f1f3d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f1f3d]"
              >
                <PhoneCall className="h-4 w-4" />
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>

      {hasVisual && (
        <div className="container-x relative z-10 pb-7 lg:contents">
          <div className="relative mx-auto mt-2 h-[260px] w-full max-w-[380px] sm:h-[300px] lg:absolute lg:bottom-[-3%] lg:right-[12%] lg:top-[9%] lg:z-10 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[45%] lg:max-w-none">
            <motion.div
              aria-hidden="true"
              {...rise(0.5)}
              className="absolute -left-[10%] bottom-0 -z-10 hidden h-[58%] w-[24%] rounded-t-full border-2 border-b-0 border-[#f2b01c] bg-[#0f1f3d] lg:block"
            />
            <motion.div
              aria-hidden="true"
              {...rise(0.65)}
              className="absolute -right-[8%] bottom-0 -z-10 hidden h-[62%] w-[26%] rounded-t-full border-2 border-b-0 border-[#f2b01c] bg-[#f8f1e3] lg:block"
            />

            {/* Panel */}
            <motion.div
              {...rise(0.2)}
              className="absolute inset-0 overflow-hidden rounded-tl-[90px] bg-[#fdf9f1] shadow-[0_18px_40px_-20px_rgba(15,31,61,0.35)] lg:rounded-tl-[120px]"
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[48%] aspect-square h-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8ead2]"
              />

              {/* Orbit: dashes flow around the ellipse */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.ellipse
                  cx="50"
                  cy="48"
                  rx="47"
                  ry="43"
                  fill="none"
                  stroke="#f2b01c"
                  strokeOpacity="0.65"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  vectorEffect="non-scaling-stroke"
                  animate={reduce ? undefined : { strokeDashoffset: [0, -36] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              <span
                aria-hidden="true"
                className="absolute right-[14%] top-[6%] h-6 w-6 rounded-full bg-[#f2b01c]"
              />

              <motion.div
                style={reduce ? undefined : { x: lx, y: ly }}
                className="absolute inset-x-[4%] bottom-[7%] top-[10%] flex items-end justify-center"
              >
                <LottieIcon
                  src={lottieSrc}
                  className="h-full w-full scale-125 origin-bottom"
                  fallback={<CraneFallback className="h-full w-full" />}
                />
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[6%] h-px bg-gradient-to-r from-transparent via-[#f2b01c]/80 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Right edge: navy zigzag with gold outline (desktop) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-[3%] lg:block"
        viewBox="0 0 40 768"
        preserveAspectRatio="none"
      >
        <polygon
          points="40,0 14,0 0,48 14,96 0,144 14,192 0,240 14,288 0,336 14,384 0,432 14,480 0,528 14,576 0,624 14,672 0,720 14,768 40,768"
          fill="#0f1f3d"
        />
        <motion.polyline
          points="14,0 0,48 14,96 0,144 14,192 0,240 14,288 0,336 14,384 0,432 14,480 0,528 14,576 0,624 14,672 0,720 14,768"
          fill="none"
          stroke="#f2b01c"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        />
      </svg>

      {/* Mobile: navy base with gold line */}
      <div aria-hidden="true" className="h-2.5 border-t-2 border-[#f2b01c] bg-[#0f1f3d] lg:hidden" />
    </section>
  );
}