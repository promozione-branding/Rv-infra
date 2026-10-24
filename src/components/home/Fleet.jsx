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
import Reveal from  "@/components/SectionHeading";
import ImageSlot from "@/components/ImageSlot";
import { fleetGroups } from "@/data/site";
import { useEffect, useState } from "react";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";
const SKEW = "-6deg";
const ROT = "-2deg";
const UNTILT = "rotate(2deg) skewX(6deg)";
const PER_PAGE = 3;

const badges = [
  { icon: Settings, label: "Latest\nMachinery" },
  { icon: Users, label: "Skilled\nOperators" },
  { icon: ShieldCheck, label: "Safety\nFirst" },
];

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
          <button
            aria-label="Previous"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="absolute -left-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition hover:bg-white/10 disabled:opacity-40 xl:flex"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            aria-label="Next"
            onClick={() => goTo(page + 1)}
            disabled={page === pages - 1}
            className="absolute -right-14 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-navy shadow-lg transition hover:scale-105 disabled:opacity-40 xl:flex"
            style={{ background: GOLD }}
          >
            <ArrowRight size={18} />
          </button>

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
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                        </div>

                        <span
                          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-navy/90 text-white"
                          style={{ transform: UNTILT }}
                        >
                          <ArrowRight size={18} />
                        </span>

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
