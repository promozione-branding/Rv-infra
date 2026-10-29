import BgHeader from "@/components/BgHeader";
import LocationMap from "@/components/Map";
import Reveal from "@/components/Reveal";
import { company } from "@/data/site";

export const metadata = { title: "About Us | R.V. Infrastructural Pvt. Ltd." };

const facts = [
  ["Incorporated", company.incorporated],
  ["Certification", company.iso],
  ["FY 2025-26 Turnover", company.turnover],
  ["FY 2026-27 Target", company.target],
];

const stats = [
  { value: "1999", label: "Established in New Delhi" },
  { value: "100+", label: "Equipment types in fleet" },
  { value: "25+", label: "Years of experience" },
  { value: "24/7", label: "Pan-India support" },
];

const equipment = [
  "Truck Mounted Boom Lifts",
  "Crawler Cranes",
  "Truck Cranes",
  "Piling Rigs",
  "Hydraulic Grabs",
  "Transit Mixers",
  "Motor Graders",
  "Rollers",
  "Soil Compactors",
];

const projectExperience = [
  {
    client: "Larsen & Toubro (L&T)",
    work: "Supported pipeline works, the Bullet Train Project, and Delhi Airport runway works.",
  },
  {
    client: "Tata Projects",
    work: "Contributed to manufacturing plant construction at the Micron site in Sanand.",
  },
  {
    client: "Reliance Infrastructure",
    work: "Supported critical refinery projects.",
  },
  {
    client: "KEC International",
    work: "Collaborated on steel and IOCL plant facilities.",
  },
  {
    client: "Keller Ground Engineering & NCC",
    work: "Provided specialized equipment support for piling work at Mundra.",
  },
  {
    client: "Dinesh Chandra R. Aggarwal",
    work: "Contributed to the Ahmedabad Metro project.",
  },
];

const whyChooseItems = [
  {
    title: "24/7 Pan-India Support",
    text: "Responsive project support backed by trained supervisors and experienced operators.",
    icon: "support",
    bg: "/images/safety.jpg", 
  },
  {
    title: "Modern Equipment",
    text: "Well-maintained truck mounted boom lifts and advanced construction machinery for demanding projects.",
    icon: "equipment",
    bg: "/images/rv_hero.png", // boom lift silhouette
  },
  {
    title: "Tailored Rental Solutions",
    text: "Flexible equipment rental services designed around your project requirements and site conditions.",
    icon: "tailored",
    bg: "/suppliers.png", // tower crane
  },
  {
    title: "Experienced Leadership",
    text: "Over 25 years of industry experience focused on quality, safety, and successful project execution.",
    icon: "leadership",
    bg: "/safety_.png",
  },
];

function Icon({ name }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "support":
      return (
        <svg {...common}>
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="2.5" y="14" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="14" width="4" height="6" rx="1.5" />
          <path d="M19.5 20c0 1-1.5 2-4 2h-2" />
        </svg>
      );
    case "equipment":
      return (
        <svg {...common}>
          <path d="M3 18h12" />
          <circle cx="6" cy="18" r="1.8" />
          <circle cx="13" cy="18" r="1.8" />
          <path d="M4 16v-4h6l4-7 6 3" />
          <path d="M20 8v5" />
        </svg>
      );
    case "tailored":
      return (
        <svg {...common}>
          <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "leadership":
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function EyeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4.6" />
      <circle cx="11" cy="13" r="1.4" fill="currentColor" />
      <path d="M11 13L20 4" />
      <path d="M16.5 3.5l.5 3.5 3.5.5 2-2-2.5-.5-.5-2.5-3 1z" />
    </svg>
  );
}

function initials(name) {
  return name
    .replace(/[^A-Za-z& ]/g, "")
    .split(" ")
    .filter((w) => w && w !== "&")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}


const hazard = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, transparent 0 10px, currentColor 10px 20px)",
};

function SectionHeading({ eyebrow, title, align = "left", tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span
        className={`inline-flex items-center gap-3 text-sm font-semibold ${
          dark ? "text-slate-600" : "text-brand"
        }`}
      >
        <span className="h-3 w-3 bg-brand" aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={`mt-3 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl ${
          align === "center" ? "mx-auto" : ""
        } ${dark ? "text-navy" : "text-white"}`}
      >
        {title}
      </h2>
    </div>
  );
}


function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 pb-16 pt-10 sm:pb-20">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-[4%] select-none text-[18rem] font-black leading-none text-slate-900/[0.03]"
      >
        RV
      </span>

      {/* Heading */}
      <div className="container-x relative text-center">
        <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-slate-600">
          <span className="h-4 w-4 rounded-[4px] bg-brand" aria-hidden />
          Where we&apos;re headed
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Our <span className="text-brand">Vision &amp;</span> Mission
        </h2>
        <span className="mx-auto mt-5 block h-1 w-24 rounded-full bg-brand" aria-hidden />
      </div>

      {/* Card */}
      <div className="relative mt-10 lg:mr-8 lg:h-[580px]">

        <img
          src="/images/heavy_eng.png"
          alt="Truck mounted boom lift working at a building site"
          className="absolute inset-y-0 left-0 hidden h-full w-[26%] object-cover object-left lg:block"
        />

        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden overflow-hidden rounded-r-[2rem] bg-[#0a1633] shadow-2xl lg:left-[46%] lg:block lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]"
        >
          <div
            className="absolute inset-0 bg-cover bg-right"
            style={{ backgroundImage: "url('/mission_bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1633] via-[#0a1633]/90 to-[#0a1633]/30" />

          {/* Yellow diagonal stripes, bottom right */}
          <span className="absolute bottom-0 right-[2%] h-[38%] w-[9%] bg-brand [clip-path:polygon(60%_0,100%_0,40%_100%,0_100%)]" />
          <span className="absolute bottom-0 right-[9%] h-[26%] w-[1%] bg-brand [clip-path:polygon(60%_0,100%_0,40%_100%,0_100%)]" />
        </div>

        {/* Yellow slanted band between the panels */}
        <span
          aria-hidden
          className="absolute bottom-0 left-[45.5%] top-[14%] hidden w-[9%] bg-brand lg:block lg:[clip-path:polygon(75%_0,100%_0,25%_100%,0_100%)]"
        />

        <div
          aria-hidden
          className="absolute inset-y-0 left-[16%] hidden w-[39%] bg-white shadow-xl lg:block lg:[clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)]"
        />

        <div className="relative grid lg:h-full lg:grid-cols-[20%_32%_45%]">
          <img
            src="/vision_truck.png"
            alt=""
            className="h-64 w-full object-cover object-left lg:hidden"
          />

          {/* Vision */}
          <article className="bg-white px-6 py-10 lg:col-start-2 lg:flex lg:flex-col lg:justify-center lg:bg-transparent lg:px-0 lg:py-0 lg:pl-6 lg:pr-8">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-navy">
                <EyeIcon />
              </span>
              <div>
                <h3 className="text-3xl font-extrabold leading-[1.05] text-navy">
                  Our
                  Vision
                </h3>
                <span className="mt-2 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-[1.7] text-slate-700">
              Our vision is to become one of India&apos;s most trusted providers of{" "}
              <strong className="font-bold text-navy">
                truck mounted boom lifts and aerial access equipment
              </strong>
              , delivering innovative, safe, and cost-effective solutions for construction,
              infrastructure, and industrial projects. Under the leadership of our Managing
              Director, <strong className="font-bold text-navy">Mr. Suchit Aggarwal</strong>, RV
              Infrastructural Private Limited is committed to advancing equipment quality,
              operational efficiency, and customer satisfaction while supporting India&apos;s
              infrastructure growth.
            </p>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="border-l-4 border-brand pl-4 text-[15px] font-bold leading-snug text-navy">
                Choose RV Infrastructural for reliable equipment solutions, professional service,
                and a commitment to reaching greater heights together.
              </p>
            </div>
          </article>

          {/* Mission */}
          <article className="relative overflow-hidden bg-[#0a1633] px-6 py-10 text-white lg:col-start-3 lg:flex lg:flex-col lg:justify-center lg:overflow-visible lg:bg-transparent lg:px-0 lg:py-0 lg:pl-14 lg:pr-16">
            {/* Mobile background photo */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-right opacity-40 lg:hidden"
              style={{ backgroundImage: "url('/mission_bg.jpg')" }}
            />

            <div className="relative">
              <div className="flex items-center gap-5">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand ring-1 ring-white/10">
                  <TargetIcon />
                </span>
                <div>
                  <h3 className="text-3xl font-extrabold leading-[1.05] text-white">
                    Our
                   Mission
                  </h3>
                  <span className="mt-2 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
                </div>
              </div>

              <p className="mt-7 text-[17px] leading-[1.95] text-slate-100 lg:text-center">
                At RV Infrastructural Private Limited, our mission is to deliver{" "}
                <strong className="font-bold text-brand">
                  reliable truck mounted boom lifts and affordable equipment rental solutions
                  across India.
                </strong>{" "}
                We empower construction, infrastructure, and industrial projects with quality
                machinery, safety-focused operations, and dependable customer support. By
                combining industry expertise, modern equipment, and tailored rental services, we
                help businesses improve productivity, reduce downtime, and complete projects with
                confidence.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <BgHeader
        title="About RV Infrastructural Private Limited"
        eyebrow="Get to know us"
        accent="#f9c32f"
        text="Your Trusted Partner for Truck Mounted Boom Lifts in India"
        backgroundImage="/about_hero.png"
      />

      {/* Key figures: one ruled sheet overlapping the hero */}
      <section className="container-x relative z-10 -mt-10">
        <dl className="grid grid-cols-2 gap-px border border-slate-300 bg-slate-300 shadow-lg lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-5 py-6 sm:px-7">
              <dd className="text-3xl font-extrabold tabular-nums text-navy sm:text-4xl">
                {s.value}
              </dd>
              <dt className="mt-1 text-sm leading-snug text-slate-600">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Intro + spec plate */}
      <section className="w-[80%] grid items-start gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-20 lg:py-24 mx-auto">
        <div className="text-slate-700">
          <SectionHeading
            eyebrow="Who we are"
            title="Heavy equipment rental, built on trust since 1999"
          />

          <div className="mt-8 max-w-[65ch] space-y-5 leading-7">
            <p className="text-lg leading-8">
              <strong className="text-navy">R.V. Infrastructural Private Limited</strong>{" "}
              ({company.iso} certified) — Established in 1999 in New Delhi, RV Infrastructural
              Private Limited provides reliable heavy equipment rental solutions for construction,
              infrastructure, and industrial projects across India. We specialize in{" "}
              <strong className="text-navy">truck mounted boom lifts</strong> and offer a diverse
              fleet of over 100 types of equipment to meet varied project requirements.
            </p>
            <p>
              Our equipment portfolio includes truck mounted boom lifts, crawler cranes, truck
              cranes, piling rigs, hydraulic grabs, transit mixers, motor graders, rollers, and soil
              compactors. With a focus on equipment reliability, skilled professionals, and
              safety-conscious operations, we help clients access dependable machinery for demanding
              projects.
            </p>
          </div>

          <ul className="mt-6 grid max-w-3xl gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((e) => (
              <li
                key={e}
                className="flex items-center gap-3 border-t border-slate-300 py-3 text-sm font-medium text-navy"
              >
                <span className="h-2 w-2 shrink-0 bg-brand" aria-hidden />
                {e}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[65ch] leading-7">
            Backed by decades of industry experience, RV Infrastructural is committed to
            delivering efficient equipment rental services, responsive support, and practical
            solutions for projects of different scales.
          </p>

          <blockquote className="mt-10 max-w-[65ch] border-y border-slate-300 py-6 text-xl font-semibold leading-snug text-navy">
            Our mission is to provide dependable truck mounted boom lifts and heavy equipment
            solutions that help build India&apos;s infrastructure safely and efficiently.
          </blockquote>
        </div>

        {/* Spec plate: the one distinctive element on the page */}
        <Reveal x={40} y={0}>
          <aside
            aria-label="Company at a glance"
            className="h-fit border-2 border-navy bg-white lg:sticky lg:top-24"
          >
            <div className="h-3 bg-brand text-navy" style={hazard} aria-hidden />
            <h3 className="bg-navy px-6 py-3 text-lg font-bold text-white">
              Company at a glance
            </h3>
            <dl className="px-6 pt-2">
              {facts.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-slate-200 py-3 text-sm"
                >
                  <dt className="text-slate-600">{k}</dt>
                  <dd className="text-right font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="px-6 pb-6 pt-4">
              <p className="text-sm text-slate-600">Directors</p>
              <ul className="mt-3 space-y-2">
                {company.directors.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm font-medium text-navy">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand text-xs font-bold text-navy">
                      {initials(d)}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Projects: a client ledger instead of a card grid */}
      <section className="container-x py-20 lg:py-24">
        <SectionHeading
          eyebrow="Track record"
          title="Building India's Infrastructure with Trusted Equipment Solutions"
        />
        <p className="mt-8 max-w-[65ch] leading-7 text-slate-700">
          RV Infrastructural Private Limited is proud to contribute to India&apos;s leading
          infrastructure, construction, and industrial projects. Since 1999, we have supported
          major developments by providing reliable heavy equipment rental solutions, including
          truck mounted boom lifts, cranes, and specialized construction machinery.
        </p>

        <h3 className="mb-4 mt-14 text-xl font-semibold text-navy">Our Project Experience</h3>
        <ul className="border-b border-slate-300">
          {projectExperience.map((item) => (
            <li
              key={item.client}
              className="grid gap-1 border-t border-slate-300 py-5 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
            >
              <h4 className="font-semibold leading-snug text-navy">{item.client}</h4>
              <p className="max-w-[60ch] leading-7 text-slate-700">{item.work}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[40ch] text-xl font-semibold leading-snug text-navy">
          Reliable Equipment. Trusted Partnerships. Infrastructure That Moves India Forward.
        </p>
      </section>

      <section className="relative isolate overflow-hidden bg-[#06142b] py-10 text-white lg:py-12 mb-6">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-left opacity-10"
          style={{ backgroundImage: "url('/metro_rv.png')" }}
        />
      

        <div
          aria-hidden
          className="absolute right-0 top-0 -z-10 hidden h-[55%] w-[58%] bg-cover bg-center lg:block"
          style={{
            backgroundImage: "url('/images/construction_card.png')",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
          }}
        />

        <span
          aria-hidden
          className="absolute right-[30%] top-0 -z-10 hidden h-[55%] w-[10%] bg-white/[0.06] lg:block [clip-path:polygon(45%_0,100%_0,55%_100%,0_100%)]"
        />

        <span
          aria-hidden
          className="absolute left-0 top-[35%] -z-10 hidden h-[30%] w-[7%] bg-[#0b2447]/70 lg:block [clip-path:polygon(0_0,100%_100%,0_100%)]"
        />

        <span
          aria-hidden
          className="absolute bottom-0 right-0 -z-10 h-24 w-28 bg-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:h-32 sm:w-36"
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-[7rem] -z-10 hidden h-32 w-[2px] origin-bottom rotate-[38deg] bg-brand/70 sm:block"
        />

        <div className="container-x relative">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-3 text-sm font-semibold text-brand">
            <span className="h-3.5 w-3.5 bg-brand" aria-hidden />
            Why choose us
          </span>

          {/* Heading */}
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
            Your Trusted Partner for
            <br />
            <span className="text-brand">Truck Mounted Boom Lifts</span> in India
          </h2>
          <span className="mt-4 block h-[3px] w-14 bg-brand" aria-hidden />

          <p className="mt-5 max-w-[34rem] text-base leading-7 text-slate-200">
            RV Infrastructural Private Limited delivers reliable truck mounted boom lifts and
            heavy equipment rental solutions for construction, industrial, and infrastructure
            projects across India.
          </p>

          {/* Cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {whyChooseItems.map((item, i) => (
              <div
                key={item.title}
                className={`group relative flex min-h-[240px] flex-col overflow-hidden rounded-md border bg-[#0a1a36]/85 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 ${
                  i === 0
                    ? "border-brand/60 shadow-[0_0_24px_rgba(249,195,47,0.25)]"
                    : "border-white/20"
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-cover bg-center opacity-35"
                  style={{ backgroundImage: `url('${item.bg}')` }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-[#0a1a36]/30 via-[#0a1a36]/70 to-[#0a1a36]/95"
                />

                <div className="relative flex flex-1 flex-col">
                  {/* Circular gold icon */}
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand/80 bg-[#0b1d3d] text-brand shadow-[0_0_18px_rgba(249,195,47,0.35)]">
                    <Icon name={item.icon} />
                  </span>

                  <h3 className="mt-5 text-xl font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-6 text-slate-200">{item.text}</p>

                  {/* Yellow underline pinned to the bottom */}
                  <span className="mt-5 block h-[3px] w-11 bg-brand" aria-hidden />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


<LocationMap />
    </>
  );
}