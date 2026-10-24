"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Construction, HardHat, Users } from "lucide-react";
import Reveal from  "@/components/SectionHeading";
import Icon from "@/components/Icon";
import ImageSlot from "@/components/ImageSlot";
import { whyChoose } from "@/data/site";

const NOTCH = "polygon(0 0, 93% 0, 75% 43%, 100% 100%, 0 100%)";

const whyStats = [
  { icon: Construction, value: "25+", label: "Years of\nExperience" },
  { icon: HardHat, value: "500+", label: "Projects\nCompleted" },
  { icon: Users, value: "100+", label: "Skilled\nProfessionals" },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#fdfaf3]">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-[51.5%] bg-[#fdf0c8] lg:block"
        style={{ clipPath: NOTCH }}
      />

      <div
        className="absolute inset-y-0 left-0 hidden w-[50.8%] lg:block"
        style={{ clipPath: NOTCH }}
      >
        <ImageSlot
          src="/why_choose.png"
          alt="RV crane at sunset"
          icon="Construction"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute left-0 top-0 h-[16%] w-[10%] bg-brand"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div
          className="absolute left-0 top-0 h-[16%] w-[6%] bg-brand/60"
          style={{ clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)" }}
        />
      </div>

      <div className="h-44 lg:hidden">
        <ImageSlot
          src="/why_choose.png"
          alt="RV crane at sunset"
          icon="Construction"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative grid gap-8 px-5 py-10 lg:min-h-[510px] lg:grid-cols-[47%_29%_24%] lg:gap-0 lg:px-0 lg:py-0">
        <div className="hidden lg:block" />

        {/* centre column */}
        <Reveal>
          <div className="flex h-full flex-col justify-center lg:py-10 lg:pr-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 bg-brand" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-600">
                Why Choose
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy xl:text-[2.5rem]">
              RV INFRASTRUCTURAL
              <br />
              <span className="text-brand">PRIVATE LIMITED</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Your trusted partner for equipment hire across India since 1999.
              <br className="hidden sm:block" /> Safe lifting. Stronger
              projects. A better tomorrow.
            </p>

            {/* stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {whyStats.map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl bg-brand/10 px-3.5 py-3.5"
                >
                  <s.icon size={24} className="text-brand" strokeWidth={1.8} />
                  <div className="mt-0.5 text-xl font-extrabold leading-tight text-navy">
                    {s.value}
                  </div>
                  <div className="whitespace-pre-line text-xs leading-tight text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-[#f9b934] to-[#f0a50e] px-7 py-3 text-sm font-semibold text-navy shadow-[0_8px_18px_-8px_rgba(240,165,14,0.8)] transition hover:brightness-105"
              >
                Learn More <ArrowRight size={15} />
              </Link>
              <span className="hidden h-8 w-px bg-slate-300 sm:block" />
              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy transition hover:text-brand"
              >
                Explore Our Fleet{" "}
                <ArrowRight size={15} className="text-brand" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* right column: feature list */}
        <div className="flex flex-col justify-center lg:py-6 lg:pl-2 lg:pr-8">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06} x={30} y={0}>
              <motion.div
                whileHover={{ x: 6 }}
                className={`flex items-center gap-3.5 py-3.5 ${
                  i !== whyChoose.length - 1 ? "border-b border-slate-200/70" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fdeeb9] text-navy">
                  <Icon name={w.icon} size={21} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight text-navy">
                    {w.title}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-slate-500">
                    {w.text}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
