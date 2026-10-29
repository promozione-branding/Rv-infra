import BgHeader from "@/components/BgHeader";
import LocationMap from "@/components/Map";
import Reveal from "@/components/Reveal";
import { company } from "@/data/site";
import { pageSeo, buildMetadata } from "@/data/seo";

export const metadata = buildMetadata(pageSeo.about);

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

const TRACK_IMG = "/images/construction_card.png"; // boom lift photo for Track record

const projectExperience = [
  {
    client: "Larsen & Toubro (L&T)",
    logo: "lt",
    work: "Supported pipeline works, the Bullet Train Project, and Delhi Airport runway works.",
  },
  {
    client: "Tata Projects",
    logo: "tata",
    work: "Contributed to manufacturing plant construction at the Micron site in Sanand.",
  },
  {
    client: "Reliance Infrastructure",
    logo: "reliance",
    work: "Supported critical refinery projects.",
  },
  {
    client: "KEC International",
    logo: "kec",
    work: "Collaborated on steel and IOCL plant facilities.",
  },
  {
    client: "Keller Ground Engineering & NCC",
    logo: "keller",
    work: "Provided specialized equipment support for piling work at Mundra.",
  },
  {
    client: "Dinesh Chandra R. Aggarwal",
    logo: "dcra",
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

const trackStrip = [
  {
    label: ["Stronger", "Projects"],
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
      </>
    ),
  },
  {
    label: ["Greater", "Productivity"],
    icon: <path d="M4 20V14M10 20V9M16 20V12M22 20V4M3 20h19" />,
  },
  {
    label: ["Safer", "Worksites"],
    icon: <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 6v4M9 10h6" />,
  },
  {
    label: ["A Stronger", "India"],
    icon: (
      <>
        <circle cx="12" cy="8" r="2.5" />
        <circle cx="5.5" cy="10" r="2" />
        <circle cx="18.5" cy="10" r="2" />
        <path d="M7.5 19a4.5 4.5 0 0 1 9 0M2 18a3.5 3.5 0 0 1 4-3M22 18a3.5 3.5 0 0 0-4-3" />
      </>
    ),
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

/* ------------------------------------------------------------------ */
/* Track record                                                        */
/* ------------------------------------------------------------------ */

/* Simple brand marks. Swap for <img src="/images/clients/xx.png" /> when you have real logos. */
function ClientLogo({ name }) {
  switch (name) {
    case "lt":
      return (
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="#1b3f94" strokeWidth="2.4" aria-hidden>
          <circle cx="20" cy="20" r="17" />
          <path d="M11 27l9-15 4 6-5 0 6 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tata":
      return (
        <span className="flex flex-col items-center leading-none">
          <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden>
            <path
              d="M13 0C6 0 1 3 0 8c3-2 7-3 13-3s10 1 13 3C25 3 20 0 13 0zM13 7c-2 0-3 1-3 3v8h6v-8c0-2-1-3-3-3z"
              fill="#1b5fb0"
            />
          </svg>
          <span className="mt-0.5 text-[11px] font-extrabold tracking-wide text-[#1b5fb0]">TATA</span>
        </span>
      );
    case "reliance":
      return (
        <span className="flex flex-col items-center leading-none">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e2231a] text-xs font-black text-white">
            R
          </span>
          <span className="mt-1 text-[10px] font-semibold text-slate-800">Reliance</span>
        </span>
      );
    case "kec":
      return <span className="text-xl font-black tracking-tight text-[#1b3f94]">KEC</span>;
    case "keller":
      return (
        <span className="flex items-center gap-1 text-[13px] font-black text-slate-900">
          <span className="h-4 w-1.5 bg-brand" aria-hidden />
          KELLER
        </span>
      );
    case "dcra":
      return <span className="text-xl font-black tracking-tight text-[#1b3f94]">DCRA</span>;
    default:
      return null;
  }
}

function ArrowBtn() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function TrackRecord() {
  return (
    <section className="mb-4 relative overflow-hidden bg-gradient-to-br from-white via-white to-slate-50">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-[36%] lg:block"
          style={{ clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${TRACK_IMG}')` }}
          />
        </div>

        {/* Yellow diagonal stripe along the photo edge */}
        <span
          aria-hidden
          className="absolute inset-y-0 right-[34.5%] hidden w-[3%] bg-brand/90 lg:block"
          style={{ clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)" }}
        />
      
        <span
          aria-hidden
          className="pointer-events-none absolute right-[40%] top-6 hidden h-24 w-48 opacity-40 lg:block"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="w-full relative py-10 lg:py-12 lg:px-12">
          <div className="lg:max-w-[58%]">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">
              <span className="h-3 w-3 bg-brand" aria-hidden />
              Our Projects
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
              Building India&apos;s Infrastructure
              <br />
              with <span className="text-brand">Trusted Equipment Solutions</span>
            </h2>
            <span className="mt-3 block h-[3px] w-14 rounded-full bg-brand" aria-hidden />

            <p className="mt-4 max-w-[60ch] text-sm leading-6 text-slate-600">
              RV Infrastructural Private Limited is proud to contribute to India&apos;s leading
              infrastructure, construction, and industrial projects. Since 1999, we have supported
              major developments by providing reliable heavy equipment rental solutions, including
              truck mounted boom lifts, cranes, and specialized construction machinery.
            </p>

            <h3 className="mt-6 text-base font-bold text-navy">Our Project Experience</h3>
            <span className="mt-1 block h-[3px] w-8 rounded-full bg-brand" aria-hidden />

            <ul className="mt-3 space-y-1.5">
              {projectExperience.map((item) => (
                <li
                  key={item.client}
                  className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-[0_2px_10px_rgba(15,23,42,0.07)] md:grid-cols-[3.5rem_13rem_1fr_auto] md:gap-4"
                >
                  <span className="flex h-11 w-14 items-center justify-center rounded-md bg-white shadow-[0_1px_6px_rgba(15,23,42,0.1)]">
                    <ClientLogo name={item.logo} />
                  </span>

                  <h4 className="text-[13.5px] font-bold leading-tight text-navy md:border-r md:border-slate-300 md:pr-4">
                    {item.client}
                  </h4>

                  <p className="col-span-2 col-start-2 text-[13px] leading-snug text-slate-700 md:col-span-1 md:col-start-auto md:max-w-[34ch]">
                    {item.work}
                  </p>

                  <span className="hidden md:block">
                    <ArrowBtn />
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-[60ch] text-sm leading-6 text-slate-600">
              Our project partnerships reflect our commitment to dependable equipment, quality
              service, and efficient support for complex infrastructure developments across India.
            </p>
          </div>
        </div>

        {/* Mobile photo */}
        <div
          aria-hidden
          className="h-56 w-full bg-cover bg-center lg:hidden"
          style={{ backgroundImage: `url('${TRACK_IMG}')` }}
        />
      </div>

      {/* Bottom navy bar */}
      <div className="relative overflow-hidden bg-[#0a1f3d] text-white">
        <span
          aria-hidden
          className="absolute bottom-0 right-0 h-full w-24 bg-brand/90"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 30% 100%)" }}
        />
        <div className="container-x relative flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="h-14 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
            <p className="text-xl font-extrabold leading-tight sm:text-2xl">
              Reliable Equipment. Trusted Partnerships.
              <br />
              <span className="text-brand">Infrastructure That Moves India Forward.</span>
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:mr-24 lg:flex-nowrap">
            {trackStrip.map((s, i) => (
              <li
                key={s.label.join(" ")}
                className={`flex items-center gap-3 ${
                  i > 0 ? "lg:border-l lg:border-white/20 lg:pl-6" : ""
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-brand ring-1 ring-white/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {s.icon}
                  </svg>
                </span>
                <span className="text-xs leading-snug text-slate-200">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
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
      <div className="relative mt-10 lg:h-[580px]">
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
              Director, Mr. Suchit Aggarwal, RV Infrastructural Private Limited is committed to
              advancing equipment quality, operational efficiency, and customer satisfaction while
              supporting India&apos;s infrastructure growth.
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
                  across India
                </strong>
                . We empower construction, infrastructure, and industrial projects with quality
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <>
      <BgHeader
        title="About RV Infrastructural Private Limited"
        eyebrow="Get to know us"
        accent="#f9c32f"
        text="Your Trusted Partner for Truck Mounted Boom Lifts in India"
        backgroundImage="/about_hero_org.png"
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
      <section className="mx-auto grid w-[80%] items-start gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-20 lg:py-24">
        <div className="text-slate-700">
          <SectionHeading
            eyebrow="Who we are"
            title="Heavy equipment rental, built on trust since 1999"
          />

          <div className="mt-8 max-w-[65ch] space-y-5 leading-7">
            <p className="text-lg leading-8">
              Established in 1999 in New Delhi, RV Infrastructural Private Limited provides
              reliable heavy equipment rental solutions for construction, infrastructure, and
              industrial projects across India. We specialize in{" "}
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

        {/* Spec plate: wrapper stretches the full row so the sticky child has room to travel */}
        <div className="lg:self-stretch">
          <div className="lg:sticky lg:top-24">
            <Reveal x={40} y={0}>
              <aside
                aria-label="Company at a glance"
                className="h-fit border-2 border-navy bg-white"
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
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Track record */}
      <TrackRecord />

      {/* Why choose us */}
      <section className="relative isolate mb-6 overflow-hidden bg-[#06142b] py-10 text-white lg:py-12">
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
            Why Choose Us
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