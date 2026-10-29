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
  },
  {
    title: "Modern Equipment",
    text: "Well-maintained truck mounted boom lifts and advanced construction machinery for demanding projects.",
    icon: "equipment",
  },
  {
    title: "Tailored Rental Solutions",
    text: "Flexible equipment rental services designed around your project requirements and site conditions.",
    icon: "tailored",
  },
  {
    title: "Experienced Leadership",
    text: "Over 25 years of industry experience focused on quality, safety, and successful project execution.",
    icon: "leadership",
  },
];

function Icon({ name }) {
  const common = {
    width: 28,
    height: 28,
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

/*
  Safety-marking stripe. It uses currentColor, so put it on an element with
  `bg-brand text-navy` and it picks up your exact theme colours.
*/
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

      {/* Vision & Mission: two flush panels */}
      <section className="border-y border-slate-300 bg-slate-100">
        <div className="container-x py-20">
          <SectionHeading eyebrow="Where we're headed" title="Our Vision & Mission" />

          <div className="mt-12 grid lg:grid-cols-2">
            <article className="border border-slate-300 bg-white p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-navy">Our Vision</h3>
              <p className="mt-4 max-w-[60ch] leading-7 text-slate-700">
                Our vision is to become one of India&apos;s most trusted providers of{" "}
                <strong className="text-navy">
                  truck mounted boom lifts and aerial access equipment
                </strong>
                , delivering innovative, safe, and cost-effective solutions for construction,
                infrastructure, and industrial projects. Under the leadership of our Managing
                Director, <strong className="text-navy">Mr. Suchit Aggarwal</strong>, RV
                Infrastructural Private Limited is committed to advancing equipment quality,
                operational efficiency, and customer satisfaction while supporting India&apos;s
                infrastructure growth.
              </p>
              <p className="mt-6 border-t border-slate-200 pt-5 font-semibold text-navy">
                Choose RV Infrastructural for reliable equipment solutions, professional service,
                and a commitment to reaching greater heights together.
              </p>
            </article>

            <article className="bg-navy p-8 text-white sm:p-10">
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="mt-4 max-w-[60ch] leading-7 text-slate-300">
                At RV Infrastructural Private Limited, our mission is to deliver{" "}
                <strong className="text-brand">
                  reliable truck mounted boom lifts and affordable equipment rental solutions
                  across India
                </strong>
                . We empower construction, infrastructure, and industrial projects with quality
                machinery, safety-focused operations, and dependable customer support. By
                combining industry expertise, modern equipment, and tailored rental services, we
                help businesses improve productivity, reduce downtime, and complete projects with
                confidence.
              </p>
            </article>
          </div>
        </div>
      </section>

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

      <section className="bg-navy py-20 text-white lg:py-24">
        <div className="container-x">
          <SectionHeading
            tone="light"
            eyebrow="Why choose us"
            title="Your Trusted Partner for Truck Mounted Boom Lifts in India"
          />
          <p className="mt-8 max-w-[60ch] leading-7 text-slate-300">
            RV Infrastructural Private Limited delivers reliable truck mounted boom lifts and
            heavy equipment rental solutions for construction, industrial, and infrastructure
            projects across India.
          </p>

          <div className="mt-14 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseItems.map((item) => (
              <div
                key={item.title}
                className="border-b border-white/20 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="text-brand">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: full-width band attached to the section above, no gap, no overlap */}
      <section className="bg-brand text-navy">
        <div className="h-3" style={hazard} aria-hidden />
        <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to reach greater heights together?
            </h2>
            <p className="mt-2 max-w-[50ch] font-medium text-navy/80">
              Tell us about your site and we&apos;ll recommend the right equipment.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 self-start bg-navy px-7 py-3 font-semibold text-white transition-colors hover:bg-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-brand md:self-auto"
          >
            Get a Quote
          </a>
        </div>
      </section>

      <LocationMap />
    </>
  );
}