"use client"

import { motion } from "framer-motion"

export default function BgHeader({ title = "", text, backgroundImage, eyebrow, highlight, accent }) {
  const words = title.trim().split(" ")
  const accentText = highlight ?? (words.length > 1 ? words.pop() : "")
  const mainText = highlight ? title.replace(highlight, "").trim() : words.join(" ")

  return (
 <section
  className="relative isolate flex min-h-[437px] w-full items-center overflow-hidden bg-background py-10 md:min-h-[470px] md:py-0 md:aspect-auto md:h-[504px]"
  style={accent ? { "--header-accent": accent } : undefined}
>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-0 hidden w-[42%] bg-cover bg-center opacity-25 grayscale [mask-image:linear-gradient(to_right,black_40%,transparent_100%)] md:block"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-cover bg-center md:[clip-path:polygon(65%_0,100%_0,100%_100%,39%_100%)]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div aria-hidden className="absolute inset-0 z-[2] bg-background/85 md:hidden" />

      <div
        aria-hidden
        className="absolute inset-0 z-[3] hidden bg-[var(--header-accent,var(--primary))] md:block [clip-path:polygon(57%_0,62%_0,49%_63%,45.5%_63%)]"
      />

      <div
        aria-hidden
        className="absolute left-[53%] top-[8%] z-[3] hidden h-16 w-16 text-muted-foreground opacity-40 [background-image:radial-gradient(currentColor_1.2px,transparent_1.5px)] [background-size:12px_12px] md:block"
      />
      <div
        aria-hidden
        className="absolute bottom-[10%] left-[10%] z-[3] hidden h-14 w-14 text-muted-foreground opacity-30 [background-image:radial-gradient(currentColor_1px,transparent_1.3px)] [background-size:12px_12px] md:block"
      />

      <div className="relative z-[4] w-full px-6 md:pl-[15%] md:pr-8">
        <div className="max-w-[560px]">
          {eyebrow && (
            <motion.div
              className="mb-2 flex items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-[3px] w-12 bg-[var(--header-accent,var(--primary))]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="mb-3 text-[length:clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {mainText}
            {accentText && <span className="text-[var(--header-accent,var(--primary))]"> {accentText}</span>}
          </motion.h1>

          {text && (
            <motion.p
              className="max-w-[460px] text-[length:clamp(1rem,1.6vw,1.2rem)] leading-[1.4] text-muted-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {text}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}