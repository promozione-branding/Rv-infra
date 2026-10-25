import { fleetGroups, featuredProducts, fleetTable } from "@/data/site";

export const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const categoryInfo = {
  "Lifts & Access": "Boom lifts and access platforms for safe work at height on construction, maintenance and industrial sites.",
  Cranes: "Mobile and crawler cranes for lifting, erection and heavy material handling.",
  Foundation: "Piling rigs and hydraulic grabs for deep foundations and diaphragm walls.",
  Concrete: "Pumps, transit mixers and self loading mixers for on-time concrete placement.",
  Earthwork: "Compactors and graders for roads, embankments and site preparation.",
};

export const categories = Array.from(new Set(fleetGroups.map((p) => p.category))).map((name) => ({
  name,
  slug: slugify(name),
  description: categoryInfo[name] || "",
  image_file: fleetGroups.find((p) => p.category === name).image_file,
}));

const tableMatch = {
  "boom-lifts": (n) => /^(Boom Lift|Truck Mounted Boom Lift|Scissor Lift)/i.test(n),
  "truck-mount-cranes": (n) => /^(Hydraulic Tyre Mounted Crane|ACE NX-360 Crane)/i.test(n),
  "crawler-cranes": (n) => /^Crawler Crane/i.test(n),
  "hydraulic-grabs": (n) => /^Hydraulic Grab/i.test(n),
  "piling-rigs": (n) => /^Rig$/i.test(n),
  "concrete-pumps": (n) => /^Concrete Pumps?/i.test(n),
  "transit-mixers": (n) => /^Transit Mixers?/i.test(n),
  "soil-compactors": (n) => /^(Soil Compactors?|Light Tandem Roller|Pneumatic Tandem Roller)/i.test(n),
  "motor-graders": (n) => /^Motor Graders?/i.test(n),
  "self-loading-mixers": (n) => /^Self Loading Concrete Mixer/i.test(n),
};

const extras = {
  "boom-lifts": {
    features: ["Articulated and truck mounted options", "Electric and diesel variants", "Safe elevated access with stable outreach"],
    applications: ["Facade and structural work", "Plant and industrial maintenance", "Bridge and metro inspection"],
  },
  "truck-mount-cranes": {
    features: ["High road mobility", "Quick deployment and set-up", "Suited to varied lifting jobs"],
    applications: ["Plant erection", "Material handling", "Equipment shifting"],
  },
  "crawler-cranes": {
    features: ["Stable on soft and uneven ground", "45 to 150 Ton range", "Supplied with skilled operators"],
    applications: ["Bridge girder erection", "Refinery and plant erection", "Metro and highway projects"],
  },
  "hydraulic-grabs": {
    features: ["Purpose built for diaphragm walls", "Deep excavation capability", "SANY SH 235 and SH 500 models"],
    applications: ["Diaphragm walls", "Deep foundation works", "Basement construction"],
  },
  "piling-rigs": {
    features: ["12 to 23 KNM torque range", "Pile diameters 550 to 1200 mm", "SANY rigs with experienced crews"],
    applications: ["Bridge and flyover foundations", "Industrial foundations", "High-rise piling"],
  },
  "concrete-pumps": {
    features: ["35 to 90 cum capacity", "Schwing Stetter units", "Continuous placement for large pours"],
    applications: ["High-rise buildings", "Large volume pours", "Infrastructure projects"],
  },
  "transit-mixers": {
    features: ["6 to 7 cum drums", "TATA and Ashok Leyland chassis", "Backed by in-house readymix supply"],
    applications: ["Readymix concrete delivery", "Building sites", "Road and bridge projects"],
  },
  "soil-compactors": {
    features: ["10 to 12 ton class", "Tandem rollers also available", "Multiple makes in the fleet"],
    applications: ["Road works", "Embankments", "Site preparation"],
  },
  "motor-graders": {
    features: ["12 feet blade", "Liugong, CASE and SEM units", "Precise levelling and grading"],
    applications: ["Highways", "Airports", "Large earthwork packages"],
  },
  "self-loading-mixers": {
    features: ["2 to 4 cum capacity", "Self-contained loading, mixing and discharge", "Ajax Fiori, Schwing Stetter and Apollo"],
    applications: ["Remote sites", "Small-volume pours", "Rural and urban roadworks"],
  },
};

const unitsByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.units]));
const highlightByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.highlight]));

export const products = fleetGroups.map((g) => {
  const slug = slugify(g.name);
  const match = tableMatch[slug];
  const models = match
    ? fleetTable.filter((r) => match(r[0])).map(([type, make, capacity, qty]) => ({ type, make, capacity, qty }))
    : [];
  const totalUnits = models.reduce((a, m) => a + m.qty, 0);
  return {
    ...g,
    slug,
    categorySlug: slugify(g.category),
    image: `/fleets/${g.image_file}`,
    units: unitsByName[g.name] || (totalUnits ? String(totalUnits) : null),
    highlight: highlightByName[g.name] || g.description,
    models,
    features: extras[slug]?.features || [],
    applications: extras[slug]?.applications || [],
  };
});

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const productsInCategory = (catSlug) => products.filter((p) => p.categorySlug === catSlug);
export const relatedProducts = (p, n = 3) => products.filter((x) => x.categorySlug === p.categorySlug && x.slug !== p.slug).concat(products.filter((x) => x.categorySlug !== p.categorySlug)).slice(0, n);
export const productHref = (p) => `/products/${p.slug}`;
export const categoryHref = (c) => `/products/category/${c.slug}`;