"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  Boxes,
  Users,
  IndianRupee,
} from "lucide-react";
import Counter from "./Counter";
import { stats } from "@/data/site";

const statIcons = [Calendar, Boxes, Users, IndianRupee];

const slides = [
  {
    image: "/rv_hero1.png",
    alt: "RV crane lifting a bridge girder at sunset",
    eyebrow: "Lifting solutions for a stronger tomorrow",
    titleTop: "RELIABLE",
    titleHighlight: "CRANE & EQUIPMENT",
    titleBottom: "RENTAL",
    description:
      "R.V. Infrastructural Pvt. Ltd. provides modern, well-maintained cranes and construction equipment for infrastructure, industrial and plant erection projects across India.",
    cta: { label: "Get a Quote", href: "/contact" },
    secondary: { label: "", href: "" },
  },
  {
    image: "/suppliers.png",
    alt: "Heavy-duty crane at an industrial plant site",
    eyebrow: "Plant erection & industrial projects",
    titleTop: "HEAVY LIFTING",
    titleHighlight: "DONE SAFELY",
    titleBottom: "ON TIME",
    description:
      "From plant shutdowns to turbine erection, our experienced operators and certified fleet keep your project moving with safety first.",
    cta: { label: "Our Services", href: "/services" },
    secondary: { label: "", href: "" },
  },
  {
    image: "/metro_rv.png",
    alt: "Crane fleet on a highway infrastructure site",
    eyebrow: "Truck Mounted Boom Lift Solutions",
    titleTop: "REACH HIGHER",
    titleHighlight: "WORK SAFER",
    titleBottom: "DELIVER ON TIME",
    description:
      "RV Infrastructural Private Limited provides reliable truck mounted boom lifts and aerial access equipment for construction, industrial maintenance, and infrastructure projects across India.",
    cta: { label: "Get a Quote", href: "/contact" },
    secondary: { label: "Our Fleet", href: "/equipment" },
  },
];

const SLIDE_INTERVAL = 2000;

const PANEL_CLIP = "lg:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-navy pt-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full animate-kenburns object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className={`absolute inset-y-0 left-0 hidden w-[44%] bg-brand ${PANEL_CLIP} lg:block`}
        />
        <div
          aria-hidden
          className={`absolute inset-y-0 left-0 w-full bg-gradient-to-br from-navy/95 via-navy/90 to-navy/80 lg:w-[42%] ${PANEL_CLIP}`}
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[468px] w-[92%] max-w-[1400px] items-center pb-16 pt-6 lg:min-h-[500px] lg:pb-20 lg:w-[90%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-xl"
          >
            <motion.h1
              variants={item}
              className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand"
            >
              {slide.eyebrow}
            </motion.h1>
            <motion.h2
              variants={item}
              className="text-2xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl mt-8 mb-8"
            >
              {slide.titleTop}{" "}
              <span className="block text-brand">{slide.titleHighlight}</span>{" "}
              {slide.titleBottom}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-3 mb-6 max-w-md text-md leading-relaxed text-slate-200 drop-shadow"
            >
              {slide.description}
            </motion.p>
            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap items-center gap-5"
            >
              <Link href={slide.cta.href} className="btn-primary">
                {slide.cta.label} <ArrowRight size={14} />
              </Link>
              <Link
                href={slide.secondary.href}
                className="group flex items-center gap-3 text-sm font-medium text-white"
              >
                {/* <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand">
                  <span className="absolute inset-0 animate-pulseRing rounded-full border border-brand" />
                  <Play size={14} fill="currentColor" />
                </span> */}
                {slide.secondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-20 left-1/2 top-1/2 z-20 flex -translate-x-1/2 items-center gap-4 lg:bottom-[5.5rem]">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-brand" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-navy/60 backdrop-blur">
        <div className="mx-auto grid w-[92%] max-w-[1400px] grid-cols-2 gap-4 py-4 lg:w-[90%] lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = statIcons[i];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 last:border-0 lg:border-r lg:border-white/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand/50 text-brand">
                  <I size={18} />
                </span>
                <div>
                  <div className="text-xl font-bold text-white">
                    <Counter {...s} />
                  </div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}