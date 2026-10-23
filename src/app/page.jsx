import Hero from "@/components/Hero";
import { Fleet, Services, Industries, WhyChoose, ProjectsPreview, Safety, Clients, QuoteSection, EquipmentSuppliers } from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <Fleet />
      <Clients />
      <Services />
      <Industries />
      <EquipmentSuppliers/>
      <WhyChoose />
      <ProjectsPreview />
      <Safety />
      
      <QuoteSection />
    </>
  );
}
