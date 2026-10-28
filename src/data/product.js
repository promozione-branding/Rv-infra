import { fleetGroups, featuredProducts } from "@/data/site";

export const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const boomExtras = {
  features: ["Truck mounted for quick site-to-site mobility", "XCMG build with stable outreach", "Safe elevated access at height"],
  applications: ["Facade and structural work", "Plant and industrial maintenance", "Bridge and metro inspection"],
};

const unitsByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.units]));
const highlightByName = Object.fromEntries(featuredProducts.map((p) => [p.name, p.highlight]));

const galleryBySlug = {
  "24-mtrs-truck-mounted-articulated-boom-lift": [
    "/product_1_1.png",
    "product_1_2.png",
    "/product_1_3.png",
    "/product_1_4.png",
    "product_1_5.png",
    "/product_1_6.png",
    "product_1_video.mp4"
  ],
  "30-mtrs-truck-mounted-telescopic-boom-lift": [
    "/product_2_2.png",
    "product_2_1.png",
    "/product_3_1.png",
    "product_2_video.mp4"
  ],
  "35-mtrs-truck-mounted-telescopic-boom-lift": [
    "/product_3_1.png",
    "/product_3_2.png",
       "/product_3_3.png",
        "/product_3_1.png",
  ],
};

export const products = fleetGroups.map((g) => {
  const slug = slugify(g.name);
  return {
    ...g,
    slug,
    categorySlug: slugify(g.category),
    image: `/fleets/${g.image_file}`,
    gallery: [
      `/fleets/${g.image_file}`,
      ...(galleryBySlug[slug] || []).map((f) => `/fleets/${f}`),
    ],
    units: unitsByName[g.name] || null,
    highlight: highlightByName[g.name] || g.description,
    models: [],
    features: boomExtras.features,
    applications: boomExtras.applications,
  };
});

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const relatedProducts = (p, n = 3) => products.filter((x) => x.slug !== p.slug).slice(0, n);
export const productHref = (p) => `/products/${p.slug}`;

export const categories = Array.from(
  new Map(
    products.map((p) => [
      p.categorySlug,
      {
        slug: p.categorySlug,
        name: p.category,
        description: `${p.category} equipment from R.V. Infrastructural Pvt. Ltd.`,
        image_file: p.image_file,
      },
    ])
  ).values()
);

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const productsInCategory = (slug) => products.filter((p) => p.categorySlug === slug);