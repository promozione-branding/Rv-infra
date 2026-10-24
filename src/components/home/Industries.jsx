"use client";
import Reveal from  "@/components/SectionHeading";
import Icon from "@/components/Icon";
import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import { industries } from "@/data/site";

export function Industries() {
  return (
    <section className="py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Powering Multiple Industries"
          text="Our equipment supports a wide range of sectors, helping industries build, operate and grow."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {industries.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="group relative h-40 cursor-pointer overflow-hidden rounded-lg">
                <ImageSlot
                  src={s.image}
                  alt={s.title}
                  icon={s.icon}
                  className="h-full"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-semibold text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-navy">
                    <Icon name={s.icon} size={13} />
                  </span>
                  {s.title}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
