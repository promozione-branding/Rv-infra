import Hero from "@/components/Hero";
import { Fleet } from "@/components/home/Fleet";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Services } from "@/components/home/Services";
import { Industries } from "@/components/home/Industries";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Safety } from "@/components/home/Safety";
import { Clients } from "@/components/home/Clients";
import { QuoteSection } from "@/components/home/QuoteSection";
import { EquipmentSuppliers } from "@/components/home/EquipmentSuppliers";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Fleet />
      <Clients />
      <Services />
      <Industries />
      <EquipmentSuppliers />
      <WhyChoose />
      <Safety />
      <ProjectsPreview />
      <QuoteSection />
    </>
  );
}