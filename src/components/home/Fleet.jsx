"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Factory,
  Gauge,
  Users,
  ShieldCheck,
  Settings,
  HardHat,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { fleetGroups } from "@/data/site";
import { slugify } from "@/data/product";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";
const SKEW = "-6deg";
const ROT = "-2deg";
const UNTILT = "rotate(2deg) skewX(6deg)";
const DURATION = 0.7;
const SWIPE_MIN = 50;

const badges = [
  { icon: Settings, label: "Latest\nMachinery" },
  { icon: Users, label: "Skilled\nOperators" },
  { icon: ShieldCheck, label: "Safety\nFirst" },
];

// 1 card on mobile, 2 on tablet, 3 on desktop
function usePerPage() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setN(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return n;
}

export function Fleet() {
  const perPage = usePerPage();
  const pages = Math.max(1, Math.ceil(fleetGroups.length / perPage));

  const chunks = useMemo(
    () =>
      Array.from({ length: pages }, (_, p) =>
        fleetGroups.slice(p * perPage, p * perPage + perPage)
      ),
    [pages, perPage]
  );

  const slides = pages > 1 ? [...chunks, chunks[0]] : chunks;

  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const pending = useRef(null);
  const touch = useRef(null);

  const page = index % pages;

  // reset when the layout changes (rotate phone, resize)
  useEffect(() => {
    busy.current = false;
    pending.current = null;
    setInstant(true);
    setIndex(0);
  }, [perPage]);

  const next = useCallback(() => {
    if (busy.current || pages < 2) return;
    busy.current = true;
    setInstant(false);
    setIndex((i) => i + 1);
  }, [pages]);

  const prev = useCallback(() => {
    if (busy.current || pages < 2) return;
    busy.current = true;
    if (index === 0) {
      pending.current = "back";
      setInstant(true);
      setIndex(pages);
    } else {
      setInstant(false);
      setIndex(index - 1);
    }
  }, [pages, index]);

  const goTo = useCallback(
    (p) => {
      if (busy.current || pages < 2 || p === index % pages) return;
      busy.current = true;
      setInstant(false);
      setIndex(p);
    },
    [pages, index]
  );

  const handleComplete = () => {
    if (pending.current === "back") {
      pending.current = null;
      setInstant(false);
      setIndex(pages - 1);
      return;
    }
    if (index >= pages) {
      setInstant(true);
      setIndex(0);
      return;
    }
    busy.current = false;
  };

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [paused, pages, next]);

  const onTouchStart = (e) => {
    setPaused(true);
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    setPaused(false);
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    // horizontal swipes only, so vertical page scroll is untouched
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? next() : prev();
    }
  };

  return (
    <section id="fleet" className="relative scroll-mt-20 overflow-hidden bg-white">
      <div className="relative">
        {/* desktop image */}
        <div
          className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <ImageSlot
            src="/images/equipment_.png"
            alt="Crane lifting at a construction site"
            icon="Construction"
            className="h-full w-full object-cover"
          />
        </div>

        {/* desktop badge */}
        <div className="absolute right-0 top-[30%] z-10 hidden items-center gap-3 rounded-l-3xl bg-white/95 py-3 pl-6 pr-10 shadow-xl backdrop-blur lg:flex">
          <HardHat size={32} strokeWidth={1.5} className="text-navy" />
          <div>
            <p className="text-2xl font-extrabold leading-none text-navy">100+</p>
            <p className="mt-1 text-sm text-slate-600">Projects Supported</p>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-[90%] max-w-[1400px] pb-10 pt-4 lg:pb-14">
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <span className="h-[2px] w-8 shrink-0 sm:w-10" style={{ background: GOLD }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-sm sm:tracking-[0.3em]">
                  Our Equipment Categories
                </span>
              </div>

              <h2 className="mt-2 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl lg:leading-[1.05]">
                Project-Ready
                <br />
                <span style={{ color: GOLD }}>Construction Equipment</span>
              </h2>

              <p className="mb-4 mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:mt-6">
                RV Infrastructural Private Limited provides cranes, truck-mounted boom lifts, and concrete equipment for construction, infrastructure, and industrial projects across India.
              </p>

              <div className="mb-4 mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-y-2">
                {badges.map((b, i) => (
                  <div
                    key={b.label}
                    className={`flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:pr-5 sm:text-left ${
                      i !== 0 ? "sm:border-l sm:border-slate-200 sm:pl-5" : ""
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#FDF3DC", color: GOLD }}
                    >
                      <b.icon size={18} />
                    </span>
                    <span className="whitespace-pre-line text-xs font-medium leading-tight text-slate-700 sm:text-sm">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

      <Link
  href="/projects#fleet-table"
  className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full border-2 bg-[#7f0b18] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 sm:w-auto sm:justify-start sm:py-2"
  style={{ borderColor: GOLD }}
>
  View Full Fleet <ArrowRight size={16} style={{ color: GOLD }} />
</Link>

              <div className="relative mt-8 overflow-hidden rounded-2xl shadow-lg lg:hidden">
                <ImageSlot
                  src="/images/equipment_.png"
                  alt="Crane lifting at a construction site"
                  icon="Construction"
                  className="h-48 w-full object-cover sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
                  <HardHat size={26} strokeWidth={1.5} className="text-navy" />
                  <div>
                    <p className="text-xl font-extrabold leading-none text-navy">100+</p>
                    <p className="mt-0.5 text-xs text-slate-600">Projects Supported</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative flow-root pb-3">
        <div className="absolute inset-0 mt-1 bg-navy" />

        <div
          className="relative z-20 mx-auto -mt-2 w-[90%] max-w-[1800px] touch-pan-y pt-4 lg:-mt-8 lg:pt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute -left-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:bg-white/10 xl:flex"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            aria-label="Next"
            onClick={next}
            className="absolute -right-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-navy shadow-lg transition hover:scale-105 xl:flex"
            style={{ background: GOLD }}
          >
            <ArrowRight size={18} />
          </button>

          <div className="overflow-hidden pb-4 pt-4">
            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${index * 100}%` }}
              transition={
                instant
                  ? { duration: 0 }
                  : { duration: DURATION, ease: [0.65, 0, 0.35, 1] }
              }
              onAnimationComplete={handleComplete}
            >
              {slides.map((group, s) => (
                <div
                  key={s}
                  className="mt-6 grid w-full shrink-0 content-start gap-8 px-8 sm:px-10 lg:px-12"
                  style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
                >
                  {group.map((f) => (
                    <Link
                      key={f.name}
                      href={`/products/${slugify(f.name)}`}
                      aria-label={`View ${f.name}`}
                      className="group relative block h-[300px] sm:h-[320px]"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                          background: GOLD,
                          transform: `translate(-14px, 12px) skewX(${SKEW}) rotate(${ROT})`,
                        }}
                      />

                      <article
                        className="absolute inset-0 overflow-hidden rounded-[28px] bg-navy shadow-2xl transition-transform duration-300 group-hover:-translate-y-2"
                        style={{ transform: `skewX(${SKEW}) rotate(${ROT})` }}
                      >
                        <div className="absolute inset-x-0 top-0 h-[74%] overflow-hidden">
                          <ImageSlot
                            src={`${IMAGE_BASE}/${f.image_file}`}
                            alt={f.name}
                            icon="Construction"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-navy/20 to-transparent" />
                        </div>

                        <div
                          className="absolute bottom-[28%] left-5 right-5 text-white sm:left-6 sm:right-6"
                          style={{ transform: UNTILT }}
                        >
                          <span
                            className="mb-1.5 block h-[3px] w-9"
                            style={{ background: GOLD }}
                          />
                          <h3 className="text-base font-extrabold leading-tight tracking-tight drop-shadow-sm sm:text-lg">
                            {f.name}
                          </h3>
                        </div>

                        <div className="absolute inset-x-4 bottom-3 grid h-[21%] grid-cols-2 divide-x divide-slate-200 rounded-[20px] bg-white sm:inset-x-5">
                          <div
                            className="flex min-w-0 items-center gap-2 pl-3 pr-2 sm:gap-2.5 sm:pl-3.5"
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
                              <p className="truncate whitespace-nowrap text-xs font-bold leading-tight tracking-tight text-navy sm:text-[13px]">
                                {f.make}
                              </p>
                            </div>
                          </div>

                          <div
                            className="flex min-w-0 items-center gap-2 pl-3 pr-2 sm:gap-2.5 sm:pl-3.5"
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
                              <p className="truncate whitespace-nowrap text-xs font-bold leading-tight tracking-tight text-navy sm:text-[13px]">
                                {f.capacity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* pagination dots */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 pb-2 sm:mt-6 sm:gap-3">
            {Array.from({ length: pages }).map((_, p) => (
              <button
                key={p}
                aria-label={`Go to page ${p + 1}`}
                onClick={() => goTo(p)}
                className="h-1.5 w-5 rounded-full transition-colors sm:h-1 sm:w-10 lg:w-16"
                style={{
                  background: p === page ? GOLD : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}