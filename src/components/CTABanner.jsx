"use client";
import {
  ArrowUpRight,
  BarChart3,
  Clock,
  HardHat,
  Headphones,
  HeadphonesIcon,
  MessageCircle,
  Phone,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { contact } from "@/data/site";

const CTA_BG = "/Pd_cta_.png";

const ctaPerks = [
  { icon: HeadphonesIcon, title: "Expert", sub: "Guidance" },
  { icon: Clock, title: "Quick", sub: "Response" },
  { icon: HardHat, title: "Right Equipment", sub: "for Every Project" },
];

const ctaPills = [
  { icon: BarChart3, text: "Higher Productivity", offset: "lg:mr-0" },
  { icon: ShieldCheck, text: "Enhanced Safety", offset: "lg:-mr-6" },
  { icon: Settings, text: "Reliable Performance", offset: "lg:-mr-3" },
];

export default function CTABanner({ name, onQuote, waHref }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent" />

      <div className="container-x relative flex items-center py-8 lg:min-h-[500px] lg:py-10">
        <Reveal className="relative w-full lg:w-[66%]">
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden translate-x-[-6px] translate-y-[-6px] bg-brand lg:block [clip-path:polygon(0_12%,3%_0,80%_0,100%_78%,91%_100%,3%_100%,0_88%)]"
          />
          <div className="relative rounded-2xl bg-white/95 px-6 py-7 shadow-2xl backdrop-blur sm:px-8 lg:rounded-none lg:py-7 lg:pl-10 lg:pr-24 lg:[clip-path:polygon(0_12%,3%_0,80%_0,100%_78%,91%_100%,3%_100%,0_88%)]">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-dark">
              Let&apos;s build together
              <span className="h-px w-24 bg-brand" />
            </p>

            <h3 className="mt-2 text-2xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-3xl lg:text-[2.1rem]">
              Need the right equipment <br className="hidden sm:block" />
              for <span className="text-brand">your project?</span>
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500 sm:text-[15px]">
              Get expert advice and best pricing for {name.toLowerCase()} and other construction equipment.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onQuote}
                className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:bg-brand-dark"
              >
                Request a Quote <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-md border border-brand bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-brand-light"
              >
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1fb455]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:flex-nowrap">
              {ctaPerks.map(({ icon: Icon, title, sub }, n) => (
                <li
                  key={title}
                  className={`flex items-center gap-2.5 ${n > 0 ? "sm:border-l sm:border-slate-200 sm:pl-5" : ""}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-navy">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="text-xs leading-tight text-slate-500">
                    <b className="block text-[13px] text-navy">{title}</b>
                    {sub}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="absolute right-6 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex xl:right-2">
          {ctaPills.map(({ icon: Icon, text, offset }) => (
            <div
              key={text}
              className={`flex items-center gap-3 rounded-full bg-white/90 py-1.5 pl-1.5 pr-6 shadow-xl backdrop-blur ${offset}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <span className="max-w-[110px] text-sm font-medium leading-tight text-navy">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}