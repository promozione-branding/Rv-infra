import Reveal from "@/components/Reveal";
import { ProjectCards, Clients } from "@/components/ProjectCards";
import { fleetTable } from "@/data/site";
import BgHeader from "@/components/BgHeader";

export const metadata = { title: "Projects & Fleet | R.V. Infrastructural Pvt. Ltd." };

export default function Projects() {
  return (
    <>
      <BgHeader
            title="Built on the shop floor"
            text="Sisco started as a two-person welding bay. Today we make racking for warehouses, workshops and shops across the country."
            backgroundImage="/suppliers.png"
          />
      <section className="container-x py-16"><ProjectCards /></section>
      
    </>
  );
}