"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from  "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { services } from "@/data/site";

const serviceIconIds = [
  "crane-rental",
  "heavy-lifting",
  "plant-erection",
  "construction-equipment",
  "readymix-concrete",
  "skilled-operators",
];

function getServiceIconId(title, index) {
  const value = title.toLowerCase();

  if (value.includes("crane")) return "crane-rental";
  if (value.includes("lifting") || (value.includes("erection") && value.includes("heavy")))
    return "heavy-lifting";
  if (value.includes("plant")) return "plant-erection";
  if (value.includes("construction") || value.includes("equipment"))
    return "construction-equipment";
  if (
    value.includes("concrete") ||
    value.includes("readymix") ||
    value.includes("ready mix")
  )
    return "readymix-concrete";
  if (value.includes("operator") || value.includes("support"))
    return "skilled-operators";

  return serviceIconIds[index] ?? serviceIconIds[0];
}

function ServiceSvgIcon({ id, index = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex items-center justify-center"
      style={{ transformOrigin: "50% 0%" }}
      animate={reduceMotion ? undefined : { rotate: [-5, 5, -5] }}
      transition={{
        duration: 3.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.18,
      }}
    >
      <img
        src={`/icons/${id}.svg`}
        alt=""
        aria-hidden="true"
        width="120"
        height="120"
        className="service-icon h-24 w-24 object-contain overflow-visible transition duration-300 group-hover:-translate-y-1 group-hover:scale-105"
        loading="lazy"
        draggable="false"
      />
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#081522] py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[45%] max-w-[520px] opacity-70"
      >
        <img
          src="/images/bg_left_service.png"
          alt=""
          className="h-full w-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#081522]/40 to-[#081522]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081522]/30 via-transparent to-[#081522]/50" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-amber-400/[0.06] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,49,73,0.22),transparent_70%)]" />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.55fr_0.72fr] lg:gap-8">
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-10 w-1 rounded-full bg-[#FFB91F] shadow-[0_0_18px_rgba(255,185,31,0.55)]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#FFB91F]">
              Our Services
            </span>
          </div>

          <h2 className="max-w-lg text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Your Trusted {" "}
            <span className="mt-1 block bg-gradient-to-r from-[#FFF0A6] via-[#FFC02E] to-[#F59E0B] bg-clip-text text-transparent">
           Aerial Access Partner
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            Discover dependable truck mounted boom lifts and expert equipment solutions for demanding industrial and infrastructure projects across India.
          </p>

<Link
  href="/contact"
  className="group/cta mt-7 inline-flex items-center gap-3 rounded-lg border border-[#7f0b18] bg-[#7f0b18] px-6 py-4 font-bold text-white shadow-[0_8px_28px_rgba(127,11,24,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(127,11,24,0.4)]"
>
  Enquire Now
  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover/cta:translate-x-1"
  />
</Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {services.map((s, i) => {
            const iconId = getServiceIconId(s.title, i);

            return (
              <Reveal key={s.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group relative flex min-h-[188px] h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-sky-300/[0.16] bg-gradient-to-br from-[#112438] via-[#0D1D2E] to-[#0A1725] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors duration-300 hover:border-amber-300/60 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:min-h-[205px] sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 h-24 w-24 rounded-full bg-amber-400/0 blur-2xl transition-colors duration-300 group-hover:bg-amber-300/15"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFC02E] to-transparent opacity-70 transition-all duration-300 group-hover:w-20 group-hover:opacity-100"
                  />

                  <div className="relative flex h-24 items-center justify-center">
                    <ServiceSvgIcon id={iconId} index={i} />
                  </div>

                  <span className="relative mt-2 max-w-[170px] text-sm font-semibold leading-snug text-white sm:text-[15px]">
                    {s.title}
                  </span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal x={40} className="hidden lg:block">
          <div className="group relative mx-auto w-full max-w-[340px]">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[22px] border border-amber-300/70 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#122236] shadow-[0_22px_60px_rgba(0,0,0,0.3)]">
              <ImageSlot
                src="/images/bg_left_service_box.png"
                alt="Crane lifting a container"
                icon="Anchor"
                className="h-[420px] transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111D]/25 via-transparent to-white/[0.04]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}