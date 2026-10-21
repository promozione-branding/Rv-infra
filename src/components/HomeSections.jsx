"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, Globe2 } from "lucide-react";
import Reveal from "./Reveal";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import SectionHeading from "./SectionHeading";
import QuoteForm from "./QuoteForm";
import { fleetGroups, services, industries, whyChoose, projects, safety, clients, company } from "@/data/site";

export function Fleet() {
  return (
    <section id="fleet" className="scroll-mt-20 py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Our Equipment Fleet" title="Modern Equipment for Every Project" text="A well-maintained fleet of cranes, lifts and concrete equipment, operated by skilled and dedicated technicians.">
          <Link href="/projects#fleet-table" className="btn-outline w-fit">View Full Fleet <ArrowRight size={14} /></Link>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleetGroups.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-2xl">
                <ImageSlot src={f.image} alt={f.title} icon="Construction" className="h-44" />
                <div className="p-5">
                  <h3 className="font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
                  <span className="mt-3 inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">{f.count}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-navy py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.4fr_0.6fr]">
        <Reveal>
          <div className="eyebrow">Our Services</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Complete Lifting Solutions</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">End-to-end equipment hiring with safety, efficiency and precision, tailored to your project requirements.</p>
          <Link href="/contact" className="btn-primary mt-6 w-fit">Enquire Now <ArrowRight size={14} /></Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6, borderColor: "#F6B21B" }} className="flex h-full flex-col items-center gap-3 rounded-lg border border-white/10 bg-navy-800 p-5 text-center">
                <Icon name={s.icon} className="text-brand" size={32} strokeWidth={1.5} />
                <span className="text-xs font-medium text-white">{s.title}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal x={40} className="hidden lg:block"><div className="group"><ImageSlot icon="Anchor" className="h-80 rounded-xl" /></div></Reveal>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Industries We Serve" title="Powering Multiple Industries" text="Our equipment supports a wide range of sectors, helping industries build, operate and grow." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group relative h-40 cursor-pointer overflow-hidden rounded-lg">
                <ImageSlot icon={s.icon} className="h-full" />
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
      <div className="group hidden lg:block"><ImageSlot icon="Construction" className="h-full min-h-[380px]" /></div>
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
            <ImageSlot icon={p.icon} className="h-40" />
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
          <Link href="/projects" className="btn-outline w-fit">View All Projects <ArrowRight size={14} /></Link>
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
        <Reveal><div className="group"><ImageSlot icon="HardHat" className="h-64 rounded-xl" /></div></Reveal>
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
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
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
      </div>
    </section>
  );
}
