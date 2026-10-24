"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Calendar, Boxes, Users, IndianRupee } from "lucide-react";
import Counter from "./Counter";
import { stats } from "@/data/site";

const statIcons = [Calendar, Boxes, Users, IndianRupee];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-800 to-[#3a2a0c] pt-8">
    <motion.div
  initial={{ opacity: 0, scale: 1.08 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.4, ease: "easeOut" }}
  className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[62%]"
>
  <img
    src="/images/rv_hero.png"
    alt="RV crane lifting a bridge girder at sunset"
    className="h-full w-full animate-kenburns object-cover object-right"
  />
</motion.div>
<div className="relative mx-auto grid w-[92%] max-w-[1400px] items-center gap-8 pb-16 lg:w-[90%] lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand"
          >
            Lifting solutions for a stronger tomorrow
          </motion.p>
          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-4xl"
          >
            RELIABLE{" "}
            <span className="block text-brand">CRANE &amp; EQUIPMENT</span>{" "}
            RENTAL
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-sm leading-relaxed text-slate-300"
          >
            R.V. Infrastructural Pvt. Ltd. provides modern, well-maintained
            cranes and construction equipment for infrastructure, industrial and
            plant erection projects across India.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <Link href="/contact" className="btn-primary">
              Get a Quote <ArrowRight size={14} />
            </Link>
            <Link
              href="/projects"
              className="group flex items-center gap-3 text-sm font-medium text-white"
            >
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand">
                <span className="absolute inset-0 animate-pulseRing rounded-full border border-brand" />
                <Play size={14} fill="currentColor" />
              </span>
              View Our Work
            </Link>
          </motion.div>
        </motion.div>

        <div className="hidden h-[420px] lg:block" />
      </div>

      <div className="relative border-t border-white/10 bg-navy/60 backdrop-blur">
<div className="mx-auto grid w-[92%] max-w-[1400px] grid-cols-2 gap-6 py-7 lg:w-[90%] lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = statIcons[i];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 lg:border-r lg:border-white/10 last:border-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand/50 text-brand">
                  <I size={22} />
                </span>
                <div>
                  <div className="text-2xl font-bold text-white">
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