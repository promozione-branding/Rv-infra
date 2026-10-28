import BgHeader from "@/components/BgHeader";
import Reveal from "@/components/Reveal";
import { company } from "@/data/site";

export const metadata = { title: "About Us | R.V. Infrastructural Pvt. Ltd." };

const facts = [
  ["Incorporated", company.incorporated],
  ["Certification", company.iso],
  ["FY 2025-26 Turnover", company.turnover],
  ["FY 2026-27 Target", company.target],
];

export default function About() {
  return (
    <>
         <BgHeader
        title="Built on the shop floor"
        text="Sisco started as a two-person welding bay. Today we make racking for warehouses, workshops and shops across the country."
        backgroundImage="/suppliers.png"
      />
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 leading-relaxed">
          <Reveal><p><strong className="text-navy">R.V. Infrastructural Private Limited</strong> ({company.iso} certified) was incorporated in March 1999 and provides construction equipment hiring to project sites in the private and public sector, along with plant erection by highly experienced staff.</p></Reveal>
          <Reveal><p>Success is all about good machinery in our line of business. Machinery complements a skilled workforce, and efficient deployment of the right kind of machinery delivers maximum benefits. We have at our disposal sophisticated and advanced machinery for timely and qualitative execution of projects.</p></Reveal>
          <Reveal><p>We started with a handful of equipment: 4 dozers and a vibratory compactor. Today our fleet includes crawler cranes, hydraulic cranes, boom lifts, rigs, transit mixers, concrete pumps and a batching plant, all operated and maintained by a skilled and dedicated workforce of operators and technicians.</p></Reveal>
          <Reveal><p>Our registered office is at {company.regOffice}. Our workshop is in Delhi, {company.workshop}.</p></Reveal>
        </div>
        <Reveal x={40} y={0}>
          <div className="space-y-4 rounded-2xl bg-navy p-8 text-white">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/10 pb-3 text-sm"><span className="text-slate-400">{k}</span><span className="font-semibold text-brand">{v}</span></div>
            ))}
            <div className="pt-2 text-sm"><span className="text-slate-400">Directors</span>{company.directors.map((d) => <div key={d} className="mt-1 font-medium">{d}</div>)}</div>
          </div>
        </Reveal>
      </section>
    </>
  );
}