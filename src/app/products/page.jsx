import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ProjectCards, Clients } from "@/components/HomeSections";
import { fleetTable } from "@/data/site";

export const metadata = { title: "Projects & Fleet | R.V. Infrastructural Pvt. Ltd." };

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Our Products" title="Best Products all over India" text="Equipment and manpower supplied to leading infrastructure, industrial and construction companies." />
      <section className="container-x py-16"><ProjectCards /></section>
      <section id="fleet-table" className="container-x scroll-mt-24 pb-16">
        <Reveal><div className="eyebrow">Complete Fleet</div><h2 className="mb-6 text-3xl font-bold text-navy">Equipment Details</h2></Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-navy text-white"><tr>{["#", "Equipment", "Make", "Capacity", "Units"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
      
    </>
  );
}
