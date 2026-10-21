"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Calendar, Boxes, Users, IndianRupee } from "lucide-react";
import Counter from "./Counter";
import { stats } from "@/data/site";

const statIcons = [Calendar, Boxes, Users, IndianRupee];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

function CraneArt() {
  return (
    <svg viewBox="0 0 520 440" className="h-full w-full drop-shadow-2xl">
      <defs>
        <linearGradient id="sun" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F6B21B" stopOpacity=".9" /><stop offset="1" stopColor="#F6B21B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="400" cy="330" r="130" fill="url(#sun)" />
      {/* bridge */}
      <rect x="0" y="300" width="520" height="22" fill="#1f3350" />
      {[60, 220, 380].map((x) => <rect key={x} x={x} y="322" width="26" height="118" fill="#16293F" />)}
      {/* crane body */}
      <rect x="70" y="372" width="240" height="38" rx="19" fill="#222" />
      <rect x="80" y="352" width="220" height="28" rx="6" fill="#F6B21B" />
      <rect x="120" y="300" width="80" height="56" rx="6" fill="#F6B21B" />
      <rect x="170" y="312" width="24" height="22" fill="#9CC8E8" />
      <rect x="210" y="318" width="60" height="38" fill="#D99A0B" />
      {/* boom */}
      <motion.g style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }} animate={{ rotate: [0, -2.5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M150 310 L400 60 L412 72 L170 322 Z" fill="#F6B21B" />
        {[0.2, 0.4, 0.6, 0.8].map((t) => <line key={t} x1={150 + 250 * t} y1={310 - 250 * t} x2={162 + 250 * t} y2={322 - 250 * t} stroke="#16293F" strokeWidth="2" />)}
        {/* cable + hook */}
        <motion.g style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }} animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <line x1="406" y1="66" x2="406" y2="210" stroke="#ddd" strokeWidth="3" />
          <rect x="392" y="210" width="28" height="18" rx="3" fill="#E53935" />
          <path d="M406 228 v14 a10 10 0 1 1 -10 10" stroke="#ddd" strokeWidth="4" fill="none" />
        </motion.g>
      </motion.g>
      <text x="170" y="400" fontSize="22" fontWeight="800" fontStyle="italic" fill="#16293F">RV</text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-800 to-[#3a2a0c] pt-28">
      <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_80%_40%,rgba(246,178,27,.25),transparent_55%)]" />
      <div className="container-x relative grid items-center gap-8 pb-16 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Lifting solutions for a stronger tomorrow</motion.p>
          <motion.h1 variants={item} className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            RELIABLE <span className="block text-brand">CRANE &amp; EQUIPMENT</span> RENTAL
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-sm leading-relaxed text-slate-300">
            R.V. Infrastructural Pvt. Ltd. provides modern, well-maintained cranes and construction equipment for infrastructure, industrial and plant erection projects across India.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="btn-primary">Get a Quote <ArrowRight size={14} /></Link>
            <Link href="/projects" className="group flex items-center gap-3 text-sm font-medium text-white">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand">
                <span className="absolute inset-0 animate-pulseRing rounded-full border border-brand" />
                <Play size={14} fill="currentColor" />
              </span>
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mx-auto h-[300px] w-full max-w-xl sm:h-[420px]">
          <div className="h-full animate-float"><CraneArt /></div>
        </motion.div>
      </div>
      <div className="relative border-t border-white/10 bg-navy/60 backdrop-blur">
        <div className="container-x grid grid-cols-2 gap-6 py-7 lg:grid-cols-4">
          {stats.map((s, i) => {
            const I = statIcons[i];
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 lg:border-r lg:border-white/10 last:border-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand/50 text-brand"><I size={22} /></span>
                <div>
                  <div className="text-2xl font-bold text-white"><Counter {...s} /></div>
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
