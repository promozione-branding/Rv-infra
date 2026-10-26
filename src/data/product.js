import { fleetGroups, featuredProducts } from "@/data/site";

export const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const boomExtras = {
  features: ["Truck mounted for quick site-to-site mobility", "XCMG build with stable outreach", "Safe elevated access at height"],
  applications: ["Facade and structural work", "Plant and industrial maintenance", "Bridge and metro inspection"],
};

const unitsByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.units]));
const highlightByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.highlight]));

export const products = fleetGroups.map((g) => ({
  ...g,
  slug: slugify(g.name),
  image: `/fleets/${g.image_file}`,
  units: unitsByName[g.name] || null,
  highlight: highlightByName[g.name] || g.description,
  models: [],
  features: boomExtras.features,
  applications: boomExtras.applications,
}));

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const relatedProducts = (p, n = 3) => products.filter((x) => x.slug !== p.slug).slice(0, n);
export const productHref = (p) => `/products/${p.slug}`;