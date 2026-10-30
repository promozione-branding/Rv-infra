"use client";

import { useEffect, useState } from "react";
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
import RVVideoReveal from "@/components/home/RVVideoReveal";

export default function Home() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/RV_Infrastructural_Animation_wider.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

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

      {animationData && (
        <RVVideoReveal
          animationData={animationData}
          videoSrc="/Cranes_lifting_bridge_girder_.mp4"
        />
      )}

      <Safety />
      <ProjectsPreview />
      <QuoteSection />
    </>
  );
}