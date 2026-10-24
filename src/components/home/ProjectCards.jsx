"use client";
import { motion } from "framer-motion";
import Reveal from  "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { projects } from "@/data/site";

export function ProjectCards({ list = projects, limit }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.slice(0, limit).map((p, i) => (
        <Reveal key={p.title} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -8 }}
            className="group h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl"
          >
            <ImageSlot
              src={p.image}
              alt={p.title}
              icon={p.icon}
              className="h-60"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 text-xs text-slate-500">{p.text}</p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}
