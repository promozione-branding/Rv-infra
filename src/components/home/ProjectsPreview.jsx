"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ProjectCards } from "./ProjectCards";

export function ProjectsPreview() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Our Projects" title="Lifting Success Across India">
          <Link href="/products" className="btn-outline w-48 bg-[#7f0b18] text-white">
            View All Fleets <ArrowRight size={14} />
          </Link>
        </SectionHeading>
        <ProjectCards limit={4} />
      </div>
    </section>
  );
}