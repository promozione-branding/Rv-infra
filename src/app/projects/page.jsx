import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ProjectCards, Clients } from "@/components/ProjectCards";
import { fleetTable } from "@/data/site";

export const metadata = { title: "Projects & Fleet | R.V. Infrastructural Pvt. Ltd." };

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Our Projects" title="Lifting Success Across India" text="Equipment and manpower supplied to leading infrastructure, industrial and construction companies." />
      <section className="container-x py-16"><ProjectCards /></section>
      
    </>
  );
}