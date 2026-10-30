"use client";
import { eqsupplier } from "@/data/site";
import { useEffect, useRef, useState } from "react";
import { Users, ExternalLink } from "lucide-react";

const GOLD = "#E8A317";
const GOLD_LIGHT = "#FFC72C";

const PAGE_DESKTOP = 12; // 4 rows x 3 columns
const PAGE_MOBILE = 6; 
const AUTO_MS = 2500; // time each set stays on screen

const allSuppliers = eqsupplier.map((name, i) => ({ name, i }));

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const initials = (name) =>
  name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

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
  return (
    <div className="group flex h-[72px] items-center gap-3 rounded-xl border border-white/15 bg-[#0b1b2e]/70 px-3 shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:border-[#E8A317]/60 hover:bg-[#0b1b2e]/90 sm:px-4">
      <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-[#071626] shadow-md"
        style={{
          background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
        }}
      >
        {initials(name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="truncate text-[13px] font-bold leading-snug text-white sm:text-sm">
          {name}
        </p>
      </div>

      <ExternalLink
        className="h-4 w-4 shrink-0 text-white/50 transition group-hover:text-[#FFC72C]"
        aria-hidden="true"
      />
    </div>
  );
}

function SupplierSlider({ seen }) {
  const [pageSize, setPageSize] = useState(PAGE_DESKTOP);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // fewer cards per slide on phones
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      setPageSize(mq.matches ? PAGE_MOBILE : PAGE_DESKTOP);
      setPage(0);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = chunk(allSuppliers, pageSize);
  const total = pages.length;

  // auto-advance, looping back to the first set after the last one
  useEffect(() => {
    if (!seen || paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPage((p) => (p + 1) % total), AUTO_MS);
    return () => clearInterval(id);
  }, [seen, paused, total]);

  return (
    <div
      className={`mt-8 transition-all duration-700 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, pi) => (
            <div
              key={pi}
              className="grid w-full shrink-0 grid-cols-1 content-start gap-3 sm:grid-cols-2 lg:grid-cols-3"
              aria-hidden={pi !== page}
            >
              {group.map((s) => (
                <SupplierCard key={s.i} name={s.name} index={s.i} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* pagination dots */}
      {total > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {pages.map((_, pi) => (
            <button
              key={pi}
              type="button"
              onClick={() => setPage(pi)}
              aria-label={`Show suppliers set ${pi + 1}`}
              aria-current={pi === page}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: pi === page ? 28 : 8,
                background: pi === page ? GOLD : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EquipmentSuppliers() {
  const [ref, seen] = useInView();

  return (
    <section className="relative isolate overflow-hidden bg-[#071626] py-12 sm:py-14 md:py-16">
      {/* background photo */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url('/suppliers.png')" }}
        aria-hidden="true"
      />

      {/* mobile overlay: even, so text stays readable across the full width */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,18,33,0.94) 0%, rgba(5,20,36,0.86) 100%)",
        }}
        aria-hidden="true"
      />
      {/* desktop overlay: solid navy on the left, photo shows through on the right */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,16,30,1) 0%, rgba(4,18,33,0.96) 32%, rgba(5,20,36,0.6) 55%, rgba(5,17,29,0) 80%)",
        }}
        aria-hidden="true"
      />

      {/* warm glow, bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: GOLD }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-[90%] max-w-[1400px]">
        <div ref={ref} className="w-full lg:w-[62%]">
          {/* header row */}
          <div
            className={`flex flex-col items-start justify-between gap-6 transition-all duration-700 xl:flex-row xl:items-start ${
              seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md sm:text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: GOLD }}
                />
                Our Equipment Partners
              </span>

              <h2 className="mt-5 text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                Equipment sourced
                <br />
                from{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD})`,
                  }}
                >
                  trusted suppliers
                </span>
              </h2>
            </div>

            {/* counter card */}
            <div
              className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] py-4 pl-5 pr-7 backdrop-blur-lg"
              style={{ borderLeft: `4px solid ${GOLD}` }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/10">
                <Users className="h-6 w-6 text-white/80" aria-hidden="true" />
              </div>
              <div>
                <p className="text-4xl font-extrabold leading-none text-white">
                  <CountUp to={eqsupplier.length} />
                  <span style={{ color: GOLD_LIGHT }}>+</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Supplier partners
                </p>
              </div>
            </div>
          </div>

          <p
            className={`mt-6 max-w-xl text-sm leading-relaxed text-white/65 transition-all delay-100 duration-700 sm:text-[15px] xl:mt-6 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            We partner with leading industry suppliers to bring you reliable,
            high-performance equipment for every project.
          </p>

          <SupplierSlider seen={seen} />
        </div>
      </div>
    </section>
  );
}