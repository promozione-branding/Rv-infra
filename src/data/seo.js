// Meta titles & descriptions — source of truth: "RV Infra Meta Title And Description.docx".
// Keep wording identical to the document. Edit here only when the document changes.

export const pageSeo = {
  home: {
    title: "Truck Mounted Boom Lift in India | RV Infrastructural",
    description:
      "Looking for truck mounted boom lifts in India? RV Infrastructural offers reliable boom lifts and heavy equipment rental solutions for construction and industrial projects.",
  },
  about: {
    title: "About Us | Truck Mounted Boom Lift Experts in India",
    description:
      "Learn about RV Infrastructural, established in 1999. Discover our truck mounted boom lifts, heavy equipment rental services, and commitment to safety and quality.",
  },
  products: {
    title: "Truck Mounted Boom Lifts & Equipment for Rental in India",
    description:
      "Explore truck mounted boom lifts and heavy equipment from RV Infrastructural for construction, industrial maintenance, and infrastructure projects across India.",
  },
  contact: {
    title: "Contact Us for Truck Mounted Boom Lift Rental in India",
    description:
      "Contact RV Infrastructural for truck mounted boom lift rentals and heavy equipment solutions. Get in touch with our team to discuss your project requirements.",
  },
  blogs: {
    title: "Boom Lift & Construction Equipment Blogs | RV Infrastructural",
    description:
      "Explore expert insights on truck mounted boom lifts, aerial access equipment, construction machinery, equipment safety, and infrastructure projects in India.",
  },
};

// Keyed by product slug (see slugify() in src/data/product.js).
export const productSeo = {
  "24-mtrs-truck-mounted-articulated-boom-lift": {
    title: "24 Mtrs Truck Mounted Articulated Boom Lift | RV Infrastructural",
    description:
      "Explore the 24 mtrs truck mounted articulated boom lift with 23.2 m working height and 10.7 m outreach for industrial maintenance and infrastructure projects.",
  },
  "30-mtrs-truck-mounted-telescopic-boom-lift": {
    title: "30 Mtrs Truck Mounted Telescopic Boom Lift | RV Infrastructural",
    description:
      "Discover the 30 mtrs truck mounted telescopic boom lift with a maximum lifting height of 30 m and a 16 m working range for demanding aerial access applications.",
  },
  "35-mtrs-truck-mounted-telescopic-boom-lift": {
    title: "35 Mtrs Truck Mounted Telescopic Boom Lift | RV Infrastructural",
    description:
      "Explore the 35 mtrs truck mounted telescopic boom lift with a maximum lifting height of 33 m and an 18 m working range for industrial and infrastructure projects.",
  },
  "truck-mounted-rental-boom-lift": {
    title: "Truck Mounted Boom Lift Rental in India | RV Infrastructural",
    description:
      "Rent a truck mounted boom lift for elevated maintenance, construction, and industrial work. Contact RV Infrastructural for equipment rental solutions across India.",
  },
  "truck-mounted-sky-lift": {
    title: "Truck Mounted Sky Lift Rental & Equipment in India | RV Infrastructural",
    description:
      "Find truck mounted sky lift solutions for maintenance and industrial applications. Contact RV Infrastructural for equipment specifications and rental enquiries.",
  },
  "13m-truck-mounted-boom-lift": {
    title: "13m Truck Mounted Boom Lift | RV Infrastructural",
    description:
      "Explore the 13m truck mounted boom lift for elevated maintenance and infrastructure work. Contact RV Infrastructural for specifications and availability.",
  },
  "truck-boom-lift-rental": {
    title: "Truck Boom Lift Rental Services in India | RV Infrastructural",
    description:
      "Looking for truck boom lift rental services? RV Infrastructural offers aerial access equipment for construction, industrial maintenance, and infrastructure projects.",
  },
  "mild-steel-hydraulic-truck-mounted-man-lift": {
    title: "Hydraulic Truck Mounted Man Lift | RV Infrastructural",
    description:
      "Explore the mild steel hydraulic truck mounted man lift for elevated access applications. Contact RV Infrastructural to confirm specifications and suitability.",
  },
  "24mtr-truck-mounted-boom-lift": {
    title: "24m Truck Mounted Boom Lift Rental in India | RV Infrastructural",
    description:
      "Discover the 24m truck mounted boom lift for elevated work and maintenance applications. Contact RV Infrastructural for equipment details and rental enquiries.",
  },
  "truck-mounted-cherry-picker-lift": {
    title: "Truck Mounted Cherry Picker Lift Rental in India | RV Infrastructural",
    description:
      "Explore truck mounted cherry picker lifts for industrial maintenance, streetlight servicing, facade work, and other elevated access applications.",
  },
};

// Builds a Next.js metadata object (title, description, Open Graph, Twitter) from an entry.
export const buildMetadata = ({ title, description }, extra = {}) => ({
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "RV Infrastructural", ...extra.openGraph },
  twitter: { card: "summary_large_image", title, description },
});
