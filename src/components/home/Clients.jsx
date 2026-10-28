"use client";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { clients } from "@/data/site";

function ClientLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-32 w-48 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-brand hover:shadow-md">
      {failed ? (
        <span className="text-center text-xs font-semibold text-navy">
          {name}
        </span>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain transition duration-300 hover:grayscale-0"
        />
      )}
    </div>
  );
}

export function Clients() {
  const row = [...clients, ...clients];
  return (
    <section className="overflow-hidden py-20">
      <div className="px-20">
        <SectionHeading
          eyebrow="Our Clients"
          title="Trusted by India's Leading Companies"
        />
      </div>
      <div className="group relative">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <ClientLogo key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
