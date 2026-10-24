import Hero from "@/components/Hero";
import { Fleet, FeaturedProducts, Services, Industries, WhyChoose, ProjectsPreview, Safety, Clients, QuoteSection, EquipmentSuppliers } from "@/components/HomeSections";

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
