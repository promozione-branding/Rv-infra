import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ProjectCards, Clients } from "@/components/HomeSections";
import { fleetTable } from "@/data/site";

export const metadata = { title: "Projects & Fleet | R.V. Infrastructural Pvt. Ltd." };

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Our Projects" title="Lifting Success Across India" text="Equipment and manpower supplied to leading infrastructure, industrial and construction companies." />
      <section className="container-x py-16"><ProjectCards /></section>
      <section id="fleet-table" className="container-x scroll-mt-24 pb-16">
        <Reveal><div className="eyebrow">Complete Fleet</div><h2 className="mb-6 text-3xl font-bold text-navy">Equipment Details</h2></Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-navy text-white"><tr>{["#", "Equipment", "Make", "Capacity", "Units"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {fleetTable.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100 transition hover:bg-brand-light">
                    <td className="px-4 py-3">{i + 1}</td><td className="px-4 py-3 font-medium text-navy">{r[0]}</td><td className="px-4 py-3">{r[1]}</td><td className="px-4 py-3">{r[2]}</td><td className="px-4 py-3 font-semibold">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
      
    </>
  );
}
