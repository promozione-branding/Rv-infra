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
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";
const SKEW = "-6deg";
const ROT = "-2deg";
const UNTILT = "rotate(2deg) skewX(6deg)";
const PER_PAGE = 3;
const DURATION = 0.7;

const badges = [
  { icon: Settings, label: "Latest\nMachinery" },
  { icon: Users, label: "Skilled\nOperators" },
  { icon: ShieldCheck, label: "Safety\nFirst" },
];

export function Fleet() {
  const pages = Math.max(1, Math.ceil(fleetGroups.length / PER_PAGE));

  const chunks = useMemo(
    () =>
      Array.from({ length: pages }, (_, p) =>
        fleetGroups.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE)
      ),
    [pages]
  );

  const slides = pages > 1 ? [...chunks, chunks[0]] : chunks;

  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const pending = useRef(null);

  const page = index % pages;

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

        <div className="relative z-10 mx-auto w-[90%] max-w-[1400px] pb-12 pt-4 lg:w-[80%] lg:pb-14 lg:pt-4">
          <Reveal>
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-10" style={{ background: GOLD }} />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                  Our Categories
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-3xl">
                Project Ready
                <br />
                <span style={{ color: GOLD }}>Equipment</span>
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                A modern and well-maintained fleet of cranes, lifts and concrete
                equipment, operated by skilled and dedicated technicians.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-y-2">
                {badges.map((b, i) => (
                  <div
                    key={b.label}
                    className={`flex items-center gap-3 pr-5 ${
                      i !== 0 ? "border-l border-slate-200 pl-5" : ""
                    }`}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#FDF3DC", color: GOLD }}
                    >
                      <b.icon size={16} />
                    </span>
                    <span className="whitespace-pre-line text-sm font-medium leading-tight text-slate-700">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/projects#fleet-table"
                className="mt-4 inline-flex items-center gap-3 rounded-full border-2 bg-navy px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ borderColor: GOLD }}
              >
                View Full Fleet <ArrowRight size={16} style={{ color: GOLD }} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative flow-root pb-3">
        <div className="absolute inset-0 bg-navy" />

        <div
          className="relative z-20 mx-auto -mt-10 w-[90%] max-w-[1800px] lg:-mt-14 lg:w-[90%]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
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
                  className="grid w-full shrink-0 content-start gap-8 px-12 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {group.map((f) => (
                    <div key={f.name} className="group relative h-[320px]">
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
                          className="absolute bottom-[28%] left-6 right-6 text-white"
                          style={{ transform: UNTILT }}
                        >
                          <span
                            className="mb-1.5 block h-[3px] w-9"
                            style={{ background: GOLD }}
                          />
                          <h3 className="text-lg font-extrabold leading-tight tracking-tight drop-shadow-sm">
                            {f.name}
                          </h3>
                        </div>

                        <div className="absolute inset-x-5 bottom-3 grid h-[21%] grid-cols-2 divide-x divide-slate-200 rounded-[20px] bg-white">
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

          <div className="mt-6 flex items-center justify-center gap-3">
            {Array.from({ length: pages }).map((_, p) => (
              <button
                key={p}
                aria-label={`Go to page ${p + 1}`}
                onClick={() => goTo(p)}
                className="h-1 w-16 rounded-full transition-colors"
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