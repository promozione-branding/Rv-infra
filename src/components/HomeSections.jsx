"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Globe2, Factory, Gauge  } from "lucide-react";
import Reveal from "./Reveal";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import SectionHeading from "./SectionHeading";
import QuoteForm from "./QuoteForm";
import { fleetGroups, services, industries, whyChoose, projects, safety, clients, company } from "@/data/site";
const IMAGE_BASE = "/fleets";

export function Fleet() {
  return (
    <section id="fleet" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Equipment Fleet"
          title="Modern Equipment for Every Project"
          text="A well-maintained fleet of cranes, lifts and concrete equipment, operated by skilled and dedicated technicians."
        >
          <Link href="/projects#fleet-table" className="btn-outline w-48">
            View Full Fleet <ArrowRight size={14} />
          </Link>
        </SectionHeading>
 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {fleetGroups.map((f, i) => (
            <Reveal key={f.name} delay={(i % 5) * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageSlot
                    src={`${IMAGE_BASE}/${f.image_file}`}
                    alt={f.name}
                    icon="Construction"
                    className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-navy backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold leading-tight text-white drop-shadow">
                    {f.name}
                  </h3>
                </div>
 
                {/* Details */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <Factory size={15} className="mt-0.5 shrink-0 text-brand" />
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Make</p>
                      <p className="font-medium text-slate-700">{f.make}</p>
                    </div>
                  </div>
 
                  <div className="mt-auto flex items-center justify-between rounded-lg bg-brand-light px-3 py-2">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-brand-dark/70">
                      <Gauge size={14} /> Capacity
                    </span>
                    <span className="text-sm font-bold text-brand-dark">{f.capacity}</span>
                  </div>
                </div>
 
                {/* Accent bar */}
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


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
  if (value.includes("lifting") || value.includes("erection") && value.includes("heavy")) return "heavy-lifting";
  if (value.includes("plant")) return "plant-erection";
  if (value.includes("construction") || value.includes("equipment")) return "construction-equipment";
  if (value.includes("concrete") || value.includes("readymix") || value.includes("ready mix")) return "readymix-concrete";
  if (value.includes("operator") || value.includes("support")) return "skilled-operators";

  return serviceIconIds[index] ?? serviceIconIds[0];
}

function ServiceSvgIcon({ id }) {
  return (
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

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
            Complete Lifting{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#FFF0A6] via-[#FFC02E] to-[#F59E0B] bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            End-to-end equipment hiring with safety, efficiency and precision,
            tailored to your project requirements.
          </p>

          <Link
            href="/contact"
            className="group/cta mt-7 inline-flex items-center gap-3 rounded-lg border border-amber-200/40 bg-gradient-to-r from-[#FFD45A] to-[#F5AA12] px-6 py-4 font-bold text-[#101D2A] shadow-[0_8px_28px_rgba(246,178,27,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(246,178,27,0.3)]"
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
                    <ServiceSvgIcon id={iconId} />
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

export function Industries() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Industries We Serve" title="Powering Multiple Industries" text="Our equipment supports a wide range of sectors, helping industries build, operate and grow." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {industries.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group relative h-40 cursor-pointer overflow-hidden rounded-lg">
                <ImageSlot src={s.image} alt={s.title} icon={s.icon} className="h-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-semibold text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-navy"><Icon name={s.icon} size={13} /></span>{s.title}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="grid bg-brand-light/60 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="group hidden lg:block"><ImageSlot src="/images/why.jpg" alt="RV crane at sunset" icon="Construction" className="h-full min-h-[380px]" /></div>
      <div className="container-x grid gap-8 py-16 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <div className="eyebrow">Why Choose</div>
          <h2 className="text-3xl font-bold text-navy">RV INFRASTRUCTURAL PRIVATE LIMITED</h2>
          <p className="mt-4 text-sm text-slate-600">Your trusted partner for equipment hire across India since 1999. Safe lifting. Stronger projects. A better tomorrow.</p>
          <Link href="/about" className="btn-primary mt-6 w-fit">Learn More <ArrowRight size={14} /></Link>
        </Reveal>
        <div className="space-y-4">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} x={30} y={0}>
              <motion.div whileHover={{ x: 6 }} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-navy"><Icon name={w.icon} size={20} /></span>
                <div><div className="text-sm font-semibold text-navy">{w.title}</div><div className="text-xs text-slate-500">{w.text}</div></div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCards({ list = projects, limit }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.slice(0, limit).map((p, i) => (
        <Reveal key={p.title} delay={i * 0.1}>
          <motion.div whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl">
            <ImageSlot src={p.image} alt={p.title} icon={p.icon} className="h-40" />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-brand-dark"><Icon name="MapPin" size={12} />{p.place}</p>
              <p className="mt-2 text-xs text-slate-500">{p.text}</p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectsPreview() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Our Projects" title="Lifting Success Across India">
          <Link href="/projects" className="btn-outline w-48">View All Projects <ArrowRight size={14} /></Link>
        </SectionHeading>
        <ProjectCards limit={4} />
      </div>
    </section>
  );
}

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-20 bg-navy py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_0.8fr_1fr]">
        <Reveal>
          <div className="eyebrow">Safety First</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Commitment to a Safer Tomorrow</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">We follow stringent safety protocols, regular equipment inspections and skilled operations to ensure a safe working environment on every project.</p>
        </Reveal>
        <Reveal><div className="group"><ImageSlot src="/images/safety.jpg" alt="RV site safety officer" icon="HardHat" className="h-72 rounded-xl" /></div></Reveal>
        <div className="grid grid-cols-2 gap-4">
          {safety.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.05 }} className="flex h-full flex-col gap-3 rounded-lg border border-white/10 bg-navy-800 p-5">
                <Icon name={s.icon} className="text-brand" size={28} strokeWidth={1.5} />
                <span className="text-xs font-medium text-white">{s.title}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Clients() {
  const row = [...clients, ...clients];
  return (
    <section className="overflow-hidden py-20">
      <div className="container-x"><SectionHeading eyebrow="Our Clients" title="Trusted by India's Leading Companies" /></div>
      <div className="group relative">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <div key={i} className="whitespace-nowrap rounded-xl border border-slate-100 bg-white px-6 py-4 text-sm font-semibold text-navy shadow-sm transition hover:border-brand hover:shadow-md">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="bg-navy py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.7fr_1.2fr_0.6fr]">
        <Reveal>
          <div className="eyebrow">Request a Quote</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Let&apos;s Lift Your Next Project</h2>
          <p className="mt-4 text-sm text-slate-300">Share your requirements and our team will get back to you with the best solution.</p>
          <ul className="mt-6 space-y-4 text-sm text-white">
            <li className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-navy"><Phone size={16} /></span>{company.mobile}<br />{company.phones[0]}</li>
            <li className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-navy"><Mail size={16} /></span>{company.email}</li>
            <li className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-navy"><Globe2 size={16} /></span>Serving clients across India</li>
          </ul>
        </Reveal>
        <Reveal x={40} y={0}><div className="rounded-xl bg-white p-6 shadow-2xl"><QuoteForm /></div></Reveal>
        <Reveal x={40} y={0} className="hidden lg:block"><div className="group"><ImageSlot src="/images/quote.jpg" alt="Crane lifting a load" icon="Construction" className="h-[420px] rounded-xl" /></div></Reveal>
      </div>
    </section>
  );
}
