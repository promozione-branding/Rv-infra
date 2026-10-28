"use client"

import { motion } from "framer-motion"

export default function BgHeader({ title, text , backgroundImage}) {
  return (
    <section
      className="relative flex h-[40svh] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-20 text-center text-white before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.6)_100%)] before:content-[''] min-[768px]:min-h-[520px] min-[768px]:px-8 min-[768px]:py-[120px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative z-[2] mx-auto w-full max-w-[900px] mt-8">
        <motion.h1
          className="mb-4 text-[length:clamp(3rem,7vw,5.4rem)] leading-[1.1] tracking-[-0.02em] text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <p className="mx-auto max-w-[640px] text-[length:clamp(1.05rem,2.2vw,1.35rem)] leading-[1.6] text-white/90">{text}</p>
      </div>
    </section>
  )
}