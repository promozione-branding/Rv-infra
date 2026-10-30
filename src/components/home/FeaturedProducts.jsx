"use client";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Link from "next/link";
import { featuredProducts } from "@/data/site";
import { slugify } from "@/data/product";

const IMAGE_BASE = "/fleets";
const GOLD = "#E8A317";

// Only show 2 sets of 3 cards (total 6)
const products = featuredProducts.slice(0, 6);

// Replays every time the element re-enters the viewport
// Animation starts only once 30% of the card is visible
const VIEWPORT = { once: false, amount: 0.3 };

function SectionHeader() {
  return (
    <Reveal>
      <div className="mb-10 mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-[2px] w-10" style={{ background: GOLD }} />
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Featured Equipments
            </span>
          </div>
          <h2 className="mb-6 mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Our Most Requested <span style={{ color: GOLD }}>Machines</span>
          </h2>
          <p className="mt-4 max-w-lg text-slate-500">
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
      <div className={`relative overflow-hidden ${imgClass}`}>
        <ImageSlot
          src={`${IMAGE_BASE}/${p.image_file}`}
          alt={p.name}
          icon="Construction"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy"
          style={{ background: GOLD }}
        >
          {p.units}
        </span>
      </div>
      <div className={`shrink-0 ${compact ? "p-4" : "p-5"}`}>
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
        <p className={`mt-1 text-slate-500 ${compact ? "line-clamp-2 text-xs" : "text-sm"}`}>
          {p.highlight}
        </p>
        <div
          className={`flex items-center justify-between gap-3 border-t border-slate-100 text-sm ${
            compact ? "mt-3 pt-2 text-xs" : "mt-4 pt-3"
          }`}
        >
          <span className="font-semibold text-slate-700">{p.make}</span>
          <span className="whitespace-nowrap font-bold" style={{ color: GOLD }}>
            {p.capacity}
          </span>
        </div>
      </div>
    </>
  );
}

function SlideCard({ p, index, className = "", ...bodyProps }) {
  return (
    // The wrapper is never transformed, so it is what the viewport observer
    // measures. Observing the animated card itself caused a flicker loop:
    // sliding it down moved it out of view, which reset it, which moved it
    // back into view, and so on.
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100"
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: (index % 3) * 0.12, // stagger within each row of 3
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
    <section id="featured" className="scroll-mt-20 bg-slate-50 pb-8 lg:pb-12">
      <div className="mx-auto w-[92%] max-w-[1400px] py-8 lg:w-[90%]">
        <SectionHeader />

        {/* Desktop / tablet: grid */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <SlideCard key={p.name} p={p} index={i} />
          ))}
        </div>

        {/* Mobile: swipeable row */}
        <div className="-mx-[4vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[4vw] pb-4 sm:hidden">
          {products.map((p, i) => (
            <SlideCard
              key={p.name}
              p={p}
              index={i}
              compact
              imgClass="h-44"
              className="w-[74vw] max-w-[320px] shrink-0 snap-start"
            />
          ))}
        </div>
      </div>
    </section>
  );
}