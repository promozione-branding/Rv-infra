import Hero from "@/components/Hero";
import { Fleet, Services, Industries, WhyChoose, ProjectsPreview, Safety, Clients, QuoteSection } from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <Fleet />
      <Services />
      <Industries />
      <WhyChoose />
      <ProjectsPreview />
      <Safety />
      <Clients />
      <QuoteSection />
    </>
  );
}
