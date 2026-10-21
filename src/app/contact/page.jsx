import { MapPin, Phone, Mail, Wrench } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { company } from "@/data/site";

export const metadata = { title: "Contact Us | R.V. Infrastructural Pvt. Ltd." };

export default function Contact() {
  const cards = [
    [MapPin, "Registered Office", company.regOffice],
    [Wrench, "Workshop", company.workshop],
    [Phone, "Phone", `${company.phones.join(", ")}\nMobile: ${company.mobile}`],
    [Mail, "Email", company.email],
  ];
  return (
    <>
      <PageHeader eyebrow="Contact Us" title="Let's Lift Your Next Project" text="Share your requirements and our team will get back to you." />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {cards.map(([I, t, v], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="flex gap-4 rounded-xl border border-slate-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-navy"><I size={20} /></span>
                <div><div className="text-sm font-semibold text-navy">{t}</div><div className="whitespace-pre-line text-sm text-slate-500">{v}</div></div>
              </div>
            </Reveal>
          ))}
          <p className="px-1 text-xs text-slate-400">CIN {company.cin} · GSTIN {company.gstin} · PAN {company.pan}</p>
        </div>
        <Reveal x={40} y={0}><div className="rounded-2xl border border-slate-100 p-6 shadow-xl"><QuoteForm /></div></Reveal>
      </section>
    </>
  );
}
