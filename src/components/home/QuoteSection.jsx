"use client";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Building2,
  Anchor,
  ChevronDown,
  FileText,
  ArrowRight,
} from "lucide-react";
import Reveal from  "@/components/Reveal";
import { fleetGroups, company } from "@/data/site";

const Q_GOLD = "#F5B100";

function QField({ label, icon: IconCmp, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-[#0F1B2B]">
        {label}
      </span>
      <span className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 transition focus-within:border-[#F5B100] focus-within:ring-2 focus-within:ring-[#F5B100]/20">
        <IconCmp size={17} strokeWidth={1.5} className="shrink-0 text-slate-600" />
        {children}
      </span>
    </label>
  );
}

const qInput =
  "w-full min-w-0 bg-transparent text-[12.5px] text-slate-800 outline-none placeholder:text-slate-400";

export function QuoteSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    setSent(true);
  };

  const contacts = [
    {
      icon: Phone,
      title: "Call Us",
      text: `${company.mobile}  |  ${company.phones[0]}`,
    },
    { icon: Mail, title: "Email Us", text: company.email },
    {
      icon: MapPin,
      title: "Serving Across India",
      text: "Reliable Lifting Solutions Nationwide",
      small: true,
    },
  ];

  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden bg-[#0F1B2B] py-10 lg:py-[2.7vw]"
    >
      {/* ===== RIGHT ART (lg+): muted gold slab + angled crane photo + gold corner ===== */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[30%] lg:block">
        {/* gold slab behind the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #C9A23F 0%, #B58E2C 100%)",
            clipPath:
              "polygon(31.7% 0, 57.7% 0, 46% 15%, 38% 30%, 20% 55%, 9% 39%)",
          }}
        />
        {/* photo */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              "polygon(38% 11.5%, 100% 11.5%, 100% 100%, 88.6% 100%, 0% 90.4%)",
          }}
        >
          <img
            src="/fleets/crawler_crane_.png"
            alt="Crane lifting a concrete block"
            className="h-full w-full object-cover object-[40%_center]"
          />
        </div>
        {/* bright gold corner, bottom right */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: Q_GOLD,
            clipPath: "polygon(100% 77%, 100% 100%, 88.6% 100%)",
          }}
        />
      </div>

      <div className="relative grid gap-10 px-[4.8%] lg:grid-cols-[39.6%_minmax(0,1fr)] lg:items-center lg:gap-[3.9%] lg:pr-0">
        <Reveal>
          <div className="rounded-2xl bg-[#FBFBFC] px-8 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-8 lg:px-[4.3%] lg:py-[1.8%]">
            <span
              className="block h-[4px] w-[52px] rounded-full"
              style={{ background: Q_GOLD }}
            />
            <h2 className="mt-2.5 text-[28px] font-extrabold leading-tight tracking-tight text-[#0F1B2B] sm:text-[32px]">
              Request a <span style={{ color: Q_GOLD }}>Quote</span>
            </h2>
            <p className="mt-0.5 text-[13.5px] text-slate-500">
              Fill in your details and our team will get back to you shortly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 grid gap-x-[5%] gap-y-3 sm:grid-cols-2"
            >
              <QField label="Full Name *" icon={User}>
                <input
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className={qInput}
                />
              </QField>
              <QField label="Company Name" icon={Building2}>
                <input
                  name="company"
                  placeholder="Enter company name"
                  className={qInput}
                />
              </QField>
              <QField label="Email Address *" icon={Mail}>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className={qInput}
                />
              </QField>
              <QField label="Phone Number *" icon={Phone}>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className={qInput}
                />
              </QField>
              <QField label="Project Location" icon={MapPin}>
                <input
                  name="location"
                  placeholder="Enter project location"
                  className={qInput}
                />
              </QField>
              <QField label="Equipment Required" icon={Anchor}>
                <select
                  name="equipment"
                  defaultValue=""
                  className={`${qInput} cursor-pointer appearance-none text-slate-600`}
                >
                  <option value="" disabled>
                    Select equipment
                  </option>
                  {fleetGroups.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={2.2}
                  className="shrink-0 text-slate-900"
                />
              </QField>

              <label className="block sm:col-span-2">
                <span className="mb-1 block text-[13px] font-semibold text-[#0F1B2B]">
                  Project Details
                </span>
                <span className="flex gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 transition focus-within:border-[#F5B100] focus-within:ring-2 focus-within:ring-[#F5B100]/20">
                  <FileText
                    size={17}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-slate-600"
                  />
                  <textarea
                    name="details"
                    rows={2}
                    placeholder="Tell us about your project..."
                    className={`${qInput} resize-y`}
                  />
                </span>
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="group/btn inline-flex items-center gap-3 rounded-lg px-8 py-3 text-[15px] font-bold text-[#0F1B2B] transition hover:-translate-y-0.5 hover:brightness-105"
                  style={{ background: Q_GOLD }}
                >
                  Submit Request
                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </button>
                {sent && (
                  <span className="ml-4 text-sm font-medium text-emerald-600">
                    Thanks! We&apos;ll contact you shortly.
                  </span>
                )}
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal x={30} y={0}>
          <div className="lg:max-w-[460px]">
            <div
              className="flex items-center border-l-[3px] pl-4"
              style={{ borderColor: Q_GOLD }}
            >
              <span
                className="py-1 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: Q_GOLD }}
              >
                Get in Touch
              </span>
            </div>

            <h2 className="mt-5 text-[clamp(2.2rem,3.9vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              Let&apos;s Lift Your
              <br />
              Next <span style={{ color: Q_GOLD }}>Project</span>
            </h2>

            <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-slate-300">
              Share your requirements and our team will get back to you with the
              best solution.
            </p>

            <ul className="mt-6 space-y-3.5">
              {contacts.map((c) => (
                <li key={c.title} className="flex items-center gap-4">
                  <span
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#1A2738]"
                    style={{ color: Q_GOLD }}
                  >
                    <c.icon size={25} strokeWidth={1.6} />
                  </span>
                  <span
                    className="h-11 w-[2px]"
                    style={{ background: Q_GOLD, opacity: 0.75 }}
                  />
                  <div className="min-w-0">
                    <p className="text-[15.5px] font-semibold leading-tight text-white">
                      {c.title}
                    </p>
                    <p
                      className={`mt-0.5 leading-snug text-slate-200 ${
                        c.small ? "text-[13px]" : "text-[15.5px]"
                      }`}
                    >
                      {c.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mx-[4.8%] mt-10 overflow-hidden rounded-2xl lg:hidden">
        <img
          src="/fleets/crawler_crane_.png"
          alt="Crane lifting a concrete block"
          className="h-56 w-full object-cover"
        />
      </div>
    </section>
  );
}
