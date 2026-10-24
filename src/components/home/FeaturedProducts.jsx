"use client";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { featuredProducts } from "@/data/site";
import { useEffect, useState } from "react";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";

export function FeaturedProducts() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = featuredProducts.length;
  const visible = 3;

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
                    <span className="font-bold" style={{ color: GOLD }}>
                      {p.capacity}
                    </span>
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