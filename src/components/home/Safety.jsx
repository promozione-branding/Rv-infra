"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import Reveal from  "@/components/Reveal";

const SAFETY_GOLD = "#F5A524";
const GOLD_TEXT = "#B7740B"; // darker gold for readable text on light bg

const SAFETY_CARDS = [
  {
    title: "Regular\nEquipment Inspection",
    text: "Routine inspection and maintenance to ensure maximum safety and reliability.",
    icon: ClipboardCheck,
    image: "/industries/ind_1.png",
    href: "/safety#inspection",
  },
  {
    title: "Skilled Operators",
    text: "Certified and experienced operators for efficient and safe operations.",
    icon: HardHat,
    image: "/images/safety.jpg",
    href: "/safety#operators",
  },
  {
    title: "Site Risk Assessment",
    text: "Detailed site evaluation to identify and minimize potential risks.",
    icon: ShieldCheck,
    image: "/images/rv_hero.png",
    href: "/safety#risk",
  },
  {
    title: "Compliance with\nIndustry Standards",
    text: "We adhere to all safety regulations and industry best practices.",
    icon: BadgeCheck,
    image: "/industries/ind_3.png",
    href: "/safety#compliance",
  },
];

export function Safety() {
  return (
    <section
      id="safety"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#f4f6fa] mt-5"
    >
      <img
        src="/images/construction_card.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-left opacity-15"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/20" />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[66%] lg:block"
        style={{
          background: `linear-gradient(135deg, #FFD27A, ${SAFETY_GOLD})`,
          clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%, 0 78%, 8% 62%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-[65.5%] lg:block"
        style={{
          clipPath:
            "polygon(25% 0, 100% 0, 100% 100%, 1.5% 100%, 1.5% 77%, 9% 61%)",
        }}
      >
        <img
          src="/safety_.png"
          alt="RV safety officer supervising a crane lift"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#f4f6fa]/60 to-transparent" />
      </div>

      <div className="relative h-56 lg:hidden">
        <img
          src="/images/safety/hero.jpg"
          alt="RV safety officer supervising a crane lift"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#f4f6fa]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-[92%] max-w-[1500px] pb-6 pt-6 lg:pb-6 lg:pt-8">
        <Reveal>
          <div className="max-w-[640px]">
            <div
              className="flex items-center gap-3 border-l-[3px] pl-4"
              style={{ borderColor: SAFETY_GOLD }}
            >
              <span
                className="text-sm font-medium uppercase tracking-[0.25em]"
                style={{ color: GOLD_TEXT }}
              >
                Safety First
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-[#0f1a2e] sm:text-4xl lg:text-[2.5rem]">
              Our Commitment
              <br />
              to a Safer <span style={{ color: GOLD_TEXT }}>Tomorrow</span>
            </h2>

            <p className="mt-3 max-w-[440px] text-sm leading-relaxed text-slate-600">
              We follow stringent safety protocols, regular equipment
              inspections and skilled operations to ensure a safe working
              environment on every project.
            </p>

            <Link
              href="/safety"
              className="group/btn mt-4 inline-flex items-center gap-3 rounded-full border-2 bg-transparent px-5 py-2 text-sm font-semibold transition hover:bg-[#F5A524]/10"
              style={{ borderColor: SAFETY_GOLD, color: GOLD_TEXT }}
            >
              Our Safety Practices
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="h-4 lg:h-10" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative h-[215px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,26,46,0.12)]"
              >
                <img
                  src={c.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-4 h-[38%] w-[4px] rounded-r"
                  style={{ background: SAFETY_GOLD }}
                />

                <div className="relative flex h-full flex-col p-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[#101D2A] shadow-lg"
                    style={{ background: SAFETY_GOLD }}
                  >
                    <c.icon size={22} strokeWidth={1.7} />
                  </span>

                  <h3 className="mt-3 whitespace-pre-line text-[15px] font-bold leading-tight text-[#0f1a2e]">
                    {c.title}
                  </h3>
                  <p className="mt-1 max-w-[210px] text-xs leading-snug text-slate-600">
                    {c.text}
                  </p>

                  <Link
                    href={c.href}
                    aria-label={`Learn more: ${c.title.replace("\n", " ")}`}
                    className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-[#F5A524] hover:text-[#101D2A]"
                    style={{ borderColor: SAFETY_GOLD, color: GOLD_TEXT }}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}