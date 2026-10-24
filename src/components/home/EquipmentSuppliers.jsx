"use client";
import { eqsupplier } from "@/data/site";
import { useEffect, useRef, useState } from "react";

const initials = (name) =>
  name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// split into 3 rows, keeping the original index for the number badge
const rows = [0, 1, 2].map((r) =>
  eqsupplier.map((name, i) => ({ name, i })).filter((x) => x.i % 3 === r)
);

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function CountUp({ to }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now(),
      dur = 1400;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}</span>;
}

function SupplierCard({ name, index }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className="eq-card relative mr-3 flex h-16 w-60 shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-brand/60"
    >
      <span className="eq-spot absolute inset-0" />
      <span className="eq-line absolute bottom-0 left-0 h-0.5 w-full bg-brand" />

      <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand/50 text-xs font-bold text-white shadow-lg shadow-brand/20">
        {initials(name)}
      </div>
      <div className="relative min-w-0">
        <p className="text-[9px] font-semibold tracking-[0.2em] text-white/40">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="line-clamp-1 text-[13px] font-semibold leading-snug text-white">
          {name}
        </p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 60 }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="eq-row overflow-hidden py-1"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className={`eq-track flex w-max ${reverse ? "rev" : ""}`}
        style={{ "--d": `${duration}s` }}
      >
        {doubled.map((it, k) => (
          <SupplierCard key={k} name={it.name} index={it.i} />
        ))}
      </div>
    </div>
  );
}

export function EquipmentSuppliers() {
  const [ref, seen] = useInView();

  return (
    <section className="relative isolate overflow-hidden bg-[#071626] py-12 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/suppliers.png')",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,18,33,0.94) 0%, rgba(5,20,36,0.78) 48%, rgba(5,17,29,0.50) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div
          ref={ref}
          className={`flex flex-col items-start justify-between gap-5 transition-all duration-700 md:flex-row md:items-center ${
            seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="ml-5 max-w-xl md:ml-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Our Equipment Partners
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Equipment sourced from{" "}
              <span className="bg-gradient-to-r from-brand via-amber-300 to-white bg-clip-text text-transparent">
                trusted suppliers
              </span>
            </h2>
          </div>

          <div className="mr-5 rounded-2xl border border-white/15 bg-white/[0.08] px-6 py-3 backdrop-blur-lg md:mr-8">
            <p className="text-3xl font-extrabold leading-none text-white md:text-4xl">
              <CountUp to={eqsupplier.length} />
              <span className="text-brand">+</span>
            </p>

            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
              Supplier partners
            </p>
          </div>
        </div>

        <div className="relative mt-8 space-y-3 md:mt-10">
          <MarqueeRow items={rows[0]} duration={70} />
          <MarqueeRow items={rows[1]} duration={85} reverse />
        </div>
      </div>
    </section>
  );
}