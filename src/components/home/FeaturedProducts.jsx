"use client";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Link from "next/link";
import { featuredProducts } from "@/data/site";
import { slugify } from "@/data/product";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";

// Only show 2 sets of 3 cards (total 6)
const products = featuredProducts.slice(0, 6);

// Desktop/tablet: replays every time the card re-enters the viewport.
// Animation starts only once 30% of the card is visible.
const VIEWPORT_GRID = { once: false, amount: 0.3 };
// Mobile carousel: cards sit off-screen horizontally, so replaying on every
// swipe feels jumpy. Animate once, with a lower threshold.
const VIEWPORT_CAROUSEL = { once: true, amount: 0.2 };

function SectionHeader() {
  return (
    <Reveal>
      <div className="mb-6 mt-2 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:mt-8 sm:flex-row sm:items-end">
        <div>
          <div className="mt-2 flex items-center gap-3 sm:mt-6">
            <span className="h-[2px] w-8 shrink-0 sm:w-10" style={{ background: GOLD }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.3em]">
              Featured Equipments
            </span>
          </div>
          <h2 className="mb-3 mt-3 text-[1.65rem] font-extrabold leading-tight tracking-tight text-navy min-[400px]:text-3xl sm:mb-6 sm:mt-4 sm:text-5xl">
            Our Most Requested <span style={{ color: GOLD }}>Machines</span>
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base">
            Explore our most requested truck-mounted boom lifts, designed for reliable aerial access across infrastructure, industrial, and maintenance projects throughout India.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function CardBody({ p, imgClass = "h-64", compact = false }) {
  return (
    <>
      <div className={`relative shrink-0 overflow-hidden ${imgClass}`}>
        <ImageSlot
          src={`${IMAGE_BASE}/${p.image_file}`}
          alt={p.name}
          icon="Construction"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-navy sm:text-[11px]"
          style={{ background: GOLD }}
        >
          {p.units}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <h3
          className={`font-extrabold text-navy ${
            compact ? "line-clamp-2 text-base leading-snug" : "text-lg"
          }`}
        >
          <Link
            href={`/products/${slugify(p.name)}`}
            className="after:absolute after:inset-0 after:z-10 hover:text-brand-dark"
          >
            {p.name}
          </Link>
        </h3>
        <p
          className={`mt-1 text-slate-500 ${
            compact ? "line-clamp-2 text-xs leading-relaxed" : "text-sm"
          }`}
        >
          {p.highlight}
        </p>
        {/* mt-auto pins the spec row to the bottom so all cards align */}
        <div
          className={`mt-auto flex items-center justify-between gap-3 border-t border-slate-100 text-sm ${
            compact ? "pt-2 text-xs" : "pt-3"
          }`}
        >
          <span className="min-w-0 truncate font-semibold text-slate-700">{p.make}</span>
          <span className="whitespace-nowrap font-bold" style={{ color: GOLD }}>
            {p.capacity}
          </span>
        </div>
      </div>
    </>
  );
}

function SlideCard({ p, index, className = "", carousel = false, ...bodyProps }) {
  const reduceMotion = useReducedMotion();

  // Smaller slide distance on mobile; no movement at all if the user
  // prefers reduced motion.
  const offset = reduceMotion ? 0 : carousel ? 30 : 80;

  return (
    // The wrapper is never transformed, so it is what the viewport observer
    // measures. Observing the animated card itself caused a flicker loop:
    // sliding it down moved it out of view, which reset it, which moved it
    // back into view, and so on.
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={carousel ? VIEWPORT_CAROUSEL : VIEWPORT_GRID}
    >
      <motion.article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100"
        variants={{
          hidden: { opacity: 0, y: offset },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: carousel ? 0.5 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              // stagger within each row of 3 on the grid; short stagger on mobile
              delay: carousel ? Math.min(index, 2) * 0.08 : (index % 3) * 0.12,
            },
          },
        }}
      >
        <CardBody p={p} {...bodyProps} />
      </motion.article>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section id="featured" className="scroll-mt-20 overflow-x-clip bg-slate-50 pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto w-[92%] max-w-[1400px] py-6 sm:py-8 lg:w-[90%]">
        <SectionHeader />

        {/* Tablet / desktop: grid (h-full on wrapper keeps rows equal height) */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((p, i) => (
            <SlideCard key={p.name} p={p} index={i} className="h-full" />
          ))}
        </div>

        {/* Mobile: swipeable row with a peek of the next card */}
        <div className="sm:hidden">
          <div
            className="-mx-[4vw] flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-[4vw] px-[4vw] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Featured machines"
          >
            {products.map((p, i) => (
              <SlideCard
                key={p.name}
                p={p}
                index={i}
                carousel
                compact
                imgClass="h-40 min-[400px]:h-44"
                className="w-[76vw] max-w-[300px] shrink-0 snap-start"
              />
            ))}
          </div>
          <p className="mt-1 text-center text-xs font-medium text-slate-400" aria-hidden="true">
            Swipe to see more →
          </p>
        </div>
      </div>
    </section>
  );
}