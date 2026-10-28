import { fleetGroups, featuredProducts } from "@/data/site";

export const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
    "product_1_video.mp4",
  ],
  "30-mtrs-truck-mounted-telescopic-boom-lift": [
    "/product_2_2.png",
    "product_2_1.png",
    "/product_3_1.png",
    "product_2_video.mp4",
  ],
  "35-mtrs-truck-mounted-telescopic-boom-lift": [
    "/product_3_1.png",
    "/product_3_2.png",
    "/product_3_3.png",
    "/product_3_1.png",
  ],
};

// Exact content from RV Infra Product Content.docx — do not alter
const productContentBySlug = {
  "24-mtrs-truck-mounted-articulated-boom-lift": {
    description:
      "RV Infrastructural Private Limited offers a 24 metres Truck Mounted Boom Lift designed for efficient aerial access in construction, industrial maintenance, and infrastructure projects. With a maximum working height of 23.2 metres and a horizontal outreach of 10.7 metres, this truck mounted aerial boom lift provides access to elevated and hard-to-reach work areas. The articulated boom lift design enables flexible positioning around obstacles, making it suitable for installation, inspection, and maintenance operations. This truck mounted hydraulic boom lift is designed to facilitate movement between compatible job sites, supporting a wide range of professional applications. Featuring a 230 kg basket load capacity and a spacious work basket, this 24m truck mounted boom lift is suitable for various elevated work requirements.",
    highlight:
      "With a maximum working height of 23.2 metres and a horizontal outreach of 10.7 metres, this truck mounted aerial boom lift provides access to elevated and hard-to-reach work areas.",
    features: [
      {
        title: "23.2 Metres Working Height",
        desc: "The Truck Mounted Boom Lift provides excellent vertical reach for building maintenance, electrical work, and infrastructure installations.",
      },
      {
        title: "10.7 Metres Horizontal Outreach",
        desc: "Its extended outreach helps operators access difficult working positions with greater flexibility.",
      },
      {
        title: "Articulated Boom Design",
        desc: "The articulated boom lift mechanism, with a main boom angle range of -25° to +80°, supports versatile positioning.",
      },
      {
        title: "Advanced Rotation Capability",
        desc: "The truck mounted aerial work platform features 370° turntable rotation and 2 × 90° basket rotation for flexible access.",
      },
      {
        title: "230 kg Basket Capacity",
        desc: "The aerial boom lift includes a 1.4 × 0.85 × 1.1 metre basket designed to accommodate personnel and tools within the rated load limit.",
      },
    ],
    applications: [
      {
        title: "Construction and Building Maintenance",
        desc: "The Truck Mounted Boom Lift is suitable for exterior painting, façade maintenance, repair work, and elevated building installations.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "This truck mounted aerial lift supports streetlight servicing, electrical installations, and utility maintenance, subject to applicable safety requirements.",
      },
      {
        title: "Telecommunication Infrastructure",
        desc: "The articulated boom lift can be used for installing and maintaining communication equipment, antennas, and related elevated infrastructure.",
      },
      {
        title: "Road and Highway Maintenance",
        desc: "The truck mounted boom platform is suitable for maintaining road signage, highway lighting, and other elevated roadside structures.",
      },
      {
        title: "Industrial and Commercial Applications",
        desc: "This hydraulic boom lift is useful for factory maintenance, equipment inspection, warehouse facility work, and commercial signage installation.",
      },
    ],
  },
  "30-mtrs-truck-mounted-telescopic-boom-lift": {
    description:
      "RV Infrastructural Private Limited offers the 30 Mtrs Truck Mounted Telescopic Boom Lift, Model CR30, designed for elevated access in construction, industrial maintenance, and infrastructure projects. This 30m truck mounted boom lift features a maximum lifting height of 30 metres and a maximum working range of 16 metres for accessing elevated and hard-to-reach work areas. Equipped with an 8-section telescopic boom, the CR30 boom lift supports flexible positioning for various aerial work applications. The truck mounted aerial lift features a lateral leg span of 6,400 mm and a longitudinal leg span of 6,000 mm to support stability when properly deployed on suitable ground. Featuring a CAN bus control system and a 200 kg basket capacity, this telescopic boom lift provides a practical solution for professional elevated work requirements.",
    highlight:
      "This 30m truck mounted boom lift features a maximum lifting height of 30 metres and a maximum working range of 16 metres for accessing elevated and hard-to-reach work areas.",
    features: [
      {
        title: "30 Metres Maximum Lifting Height",
        desc: "The Truck Mounted Telescopic Boom Lift provides vertical access for building maintenance, elevated installations, and infrastructure projects.",
      },
      {
        title: "16 Metres Maximum Working Range",
        desc: "The extended working range enables operators to reach suitable elevated work areas with greater positioning flexibility.",
      },
      {
        title: "8-Section Telescopic Boom",
        desc: "The CR30 telescopic boom lift features an 8-section boom configuration designed to support extended reach and versatile operation.",
      },
      {
        title: "360° Slewing Capability",
        desc: "The truck mounted aerial boom lift offers 360-degree slewing for flexible working orientation within the manufacturer's specified operating limits.",
      },
      {
        title: "CAN Bus Control System",
        desc: "The integrated control system, aluminium basket, and 200 kg basket capacity support practical operation for suitable aerial access tasks.",
      },
    ],
    applications: [
      {
        title: "Construction and Building Maintenance",
        desc: "The 30m Truck Mounted Boom Lift is suitable for exterior painting, façade maintenance, building repairs, and elevated installation work.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "This truck mounted aerial work platform supports streetlight servicing, utility infrastructure maintenance, and overhead installation tasks, subject to applicable safety requirements.",
      },
      {
        title: "Telecommunication Infrastructure",
        desc: "The telescopic boom lift can be used for installing, inspecting, and maintaining elevated communication equipment and antennas.",
      },
      {
        title: "Road and Highway Maintenance",
        desc: "The CR30 boom lift is suitable for maintenance of highway lighting, road signs, and elevated roadside structures.",
      },
      {
        title: "Industrial and Commercial Applications",
        desc: "This truck mounted telescopic lift can support factory maintenance, equipment inspections, facility repairs, and commercial signage installation.",
      },
    ],
  },
  "35-mtrs-truck-mounted-telescopic-boom-lift": {
    description:
      "RV Infrastructural Private Limited offers the CR35 model, designed to provide elevated access for construction, industrial maintenance, infrastructure development, and utility operations. This truck mounted telescopic boom lift features a maximum lifting height of 33 metres and a maximum working range of 18 metres, making it suitable for demanding aerial access applications. Equipped with a 9-section boom, the CR35 telescopic boom lift supports flexible positioning and access to elevated work areas. With a lateral leg span of 6,400 mm and a longitudinal leg span of 6,000 mm, this truck mounted boom lift is designed to provide a stable operating setup when correctly deployed. The CAN bus control system supports machine control functions, while the 200 kg basket capacity accommodates personnel and tools within the specified operating limits.",
    highlight:
      "This truck mounted telescopic boom lift features a maximum lifting height of 33 metres and a maximum working range of 18 metres, making it suitable for demanding aerial access applications.",
    features: [
      {
        title: "33 Metres Maximum Lifting Height",
        desc: "The 35m truck mounted boom lift provides vertical reach for elevated maintenance, installation, and infrastructure projects.",
      },
      {
        title: "18 Metres Maximum Working Range",
        desc: "Its extended working range supports access to elevated areas that may be difficult to reach with conventional equipment.",
      },
      {
        title: "9-Section Telescopic Boom",
        desc: "The telescopic boom configuration enables extended reach and flexible positioning for a variety of aerial work requirements.",
      },
      {
        title: "360° Slewing Capability",
        desc: "The truck mounted telescopic aerial lift features 360-degree slewing for flexible working orientation, subject to the manufacturer's operating limits.",
      },
      {
        title: "CAN Bus Control System",
        desc: "The integrated control system supports machine operation, while the aluminium basket and 200 kg load capacity provide a practical elevated working platform.",
      },
    ],
    applications: [
      {
        title: "Construction and Building Maintenance",
        desc: "The truck mounted telescopic boom lift is suitable for exterior building maintenance, façade work, elevated installation, and structural inspection.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "This truck mounted aerial work platform can support streetlight servicing, utility installations, and overhead infrastructure maintenance, subject to applicable safety requirements.",
      },
      {
        title: "Telecommunication Infrastructure",
        desc: "The 35m telescopic boom lift is suitable for accessing elevated communication equipment, antennas, and related infrastructure.",
      },
      {
        title: "Road and Highway Projects",
        desc: "The equipment can assist with maintaining highway lighting, road signs, elevated structures, and other roadside installations.",
      },
      {
        title: "Industrial and Commercial Operations",
        desc: "This telescopic boom lift supports factory maintenance, equipment inspection, facility repairs, and commercial signage installation.",
      },
    ],
  },
  "truck-mounted-rental-boom-lift": {
    description:
      "RV Infrastructural Private Limited provides truck mounted boom lift rental solutions for construction, maintenance, and other elevated access requirements. Our truck mounted boom lift rental service is suitable for projects requiring access to elevated work areas at heights ranging from 6 to 10 metres. The rental boom lift supports a maximum platform load capacity of up to 150 kg, subject to the equipment's rated specifications. Installation support is provided to help prepare the equipment for the intended application and operating conditions. The truck mounted boom lift is designed for mobility between suitable work locations, making it a practical choice for construction and maintenance projects.",
    highlight:
      "Our truck mounted boom lift rental service is suitable for projects requiring access to elevated work areas at heights ranging from 6 to 10 metres.",
    features: [
      {
        title: "Flexible Rental Solutions",
        desc: "Truck mounted boom lift rental services offer a practical option for short-term and project-based elevated access requirements.",
      },
      {
        title: "6–10 Metre Working Height",
        desc: "Provides access to elevated work areas for suitable construction, installation, and maintenance activities.",
      },
      {
        title: "Up to 150 kg Load Capacity",
        desc: "Supports personnel and essential tools within the specified platform load limit.",
      },
      {
        title: "Truck Mounted Design",
        desc: "Facilitates transportation between compatible job sites and supports flexible equipment deployment.",
      },
      {
        title: "Installation Assistance",
        desc: "Installation support helps prepare the equipment for the required application, subject to site conditions and rental terms.",
      },
    ],
    applications: [
      {
        title: "Construction Projects",
        desc: "Suitable for elevated installation, painting, repair, and general construction maintenance work.",
      },
      {
        title: "Building Maintenance",
        desc: "Helps with exterior cleaning, signage installation, and maintenance of low-rise commercial and residential buildings.",
      },
      {
        title: "Electrical and Lighting Work",
        desc: "Supports suitable streetlight maintenance and electrical installation tasks when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Industrial Maintenance",
        desc: "Useful for facility repairs, equipment inspections, and other elevated maintenance activities.",
      },
      {
        title: "Signage and Advertising",
        desc: "Suitable for installing, inspecting, and maintaining commercial signs, banners, and displays at appropriate heights.",
      },
    ],
  },
  "truck-mounted-sky-lift": {
    description:
      "RV Infrastructural Private Limited offers Truck Mounted Sky Lift solutions designed for elevated access in maintenance, construction, and infrastructure projects. With a stated platform height range of 10–28 metres, the truck mounted sky lift range is suitable for various elevated work requirements, subject to the selected model specifications. The specified load capacity ranges from 200 kg to 600 kg, depending on the equipment configuration and manufacturer's rated limits. The combined boom design supports flexible positioning and access to suitable elevated work areas. The truck power take-off (PTO) system provides power for the lift's operating functions according to the equipment design.",
    highlight:
      "With a stated platform height range of 10–28 metres, the truck mounted sky lift range is suitable for various elevated work requirements, subject to the selected model specifications.",
    features: [
      {
        title: "Multiple Platform Height Options",
        desc: "The Truck Mounted Sky Lift range offers stated platform heights from 10 to 28 metres for different aerial access requirements.",
      },
      {
        title: "200–600 kg Load Capacity",
        desc: "Available load capacities vary by model, allowing customers to select equipment suited to their approved working requirements.",
      },
      {
        title: "Articulated and Telescopic Boom Design",
        desc: "The combined boom configuration supports flexible positioning around suitable obstacles and structures.",
      },
      {
        title: "Truck PTO Operation",
        desc: "The power take-off system uses the truck's power source to operate the lifting mechanism as designed.",
      },
      {
        title: "180-Degree Rotation",
        desc: "The specified rotation range supports directional positioning of the platform within the equipment's operating limits.",
      },
    ],
    applications: [
      {
        title: "Building Maintenance",
        desc: "The Truck Mounted Sky Lift is suitable for exterior repairs, façade maintenance, and other elevated building servicing tasks.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "Supports suitable streetlight servicing and utility work when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Industrial Maintenance",
        desc: "Useful for equipment inspection, facility repairs, and elevated maintenance in suitable industrial environments.",
      },
      {
        title: "Infrastructure Projects",
        desc: "Can assist with maintenance of elevated structures, public facilities, and selected roadside installations.",
      },
      {
        title: "Signage and Installation Work",
        desc: "Suitable for installing, inspecting, and maintaining signs and displays at appropriate working heights.",
      },
    ],
  },
  "13m-truck-mounted-boom-lift": {
    description:
      "RV Infrastructural Private Limited offers the 13m Truck Mounted Boom Lift, Model CGESL-13MCM, designed for elevated access in construction, infrastructure, and industrial maintenance applications. This truck mounted aerial lift provides a maximum working height of 13 metres for suitable installation, inspection, and maintenance tasks. The articulated boom lift design supports flexible positioning to access elevated work areas and suitable locations around obstacles. The hydraulic-powered boom lift is designed to support lifting and positioning operations in accordance with the manufacturer's specifications. This Indian-origin truck mounted boom lift offers a practical aerial access solution for businesses and contractors seeking equipment for professional applications.",
    highlight:
      "This truck mounted aerial lift provides a maximum working height of 13 metres for suitable installation, inspection, and maintenance tasks.",
    features: [
      {
        title: "13m Maximum Working Height",
        desc: "The Truck Mounted Boom Lift provides access to elevated work areas up to the specified working height of 13 metres.",
      },
      {
        title: "Articulated Boom Design",
        desc: "The articulated boom configuration supports flexible platform positioning for various elevated tasks.",
      },
      {
        title: "150 kg Platform Capacity",
        desc: "The aerial work platform supports a maximum stated load of 150 kg, including personnel and tools, subject to the manufacturer's rated limits.",
      },
      {
        title: "360-Degree Rotation",
        desc: "The rotation feature supports flexible positioning around the machine, subject to the approved operating configuration.",
      },
      {
        title: "Dual-Entry Platform",
        desc: "The platform features dual-entry access to facilitate entry and exit according to the equipment's design and operating instructions.",
      },
    ],
    applications: [
      {
        title: "Construction and Building Maintenance",
        desc: "Suitable for elevated repairs, painting, installation work, and maintenance of building exteriors.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "Can support suitable streetlight servicing and electrical infrastructure work when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Signage and Advertising Installation",
        desc: "Useful for installing, inspecting, and maintaining outdoor signage and advertising displays.",
      },
      {
        title: "Industrial Maintenance",
        desc: "Supports elevated inspections, facility repairs, and maintenance tasks in suitable industrial environments.",
      },
      {
        title: "Infrastructure and Utility Projects",
        desc: "Suitable for selected road infrastructure, public utility, and commercial maintenance activities requiring aerial access.",
      },
    ],
  },
  "truck-boom-lift-rental": {
    description:
      "RV Infrastructural Private Limited offers truck boom lift rental solutions for construction, infrastructure, and elevated maintenance projects requiring temporary aerial access equipment. The truck mounted boom lift rental service is suitable for projects requiring access to elevated work areas within the specified 6–10 metre working height range. The rental equipment has a stated maximum load capacity of 150 kg for personnel and tools, subject to the manufacturer's rated platform limits. Installation support is provided according to the rental arrangement and site requirements to help prepare the equipment for operation. The truck mounted boom lift offers mobility between compatible job sites, making it suitable for construction and maintenance applications.",
    highlight:
      "The truck mounted boom lift rental service is suitable for projects requiring access to elevated work areas within the specified 6–10 metre working height range.",
    features: [
      {
        title: "Flexible Rental Options",
        desc: "Truck boom lift rental provides a practical alternative to purchasing equipment for temporary and project-based aerial access requirements.",
      },
      {
        title: "6–10 Metre Working Height",
        desc: "Suitable for construction activities and maintenance tasks that require access to elevated work areas.",
      },
      {
        title: "150 kg Load Capacity",
        desc: "The stated platform capacity accommodates personnel and tools within the approved equipment limits.",
      },
      {
        title: "Truck Mounted Assembly",
        desc: "The vehicle-mounted design supports transportation between suitable project locations.",
      },
      {
        title: "Installation Assistance",
        desc: "Installation support helps coordinate equipment setup according to the rental agreement and site conditions.",
      },
    ],
    applications: [
      {
        title: "Construction Projects",
        desc: "Truck boom lift rental is suitable for elevated installation, painting, repair, and general construction maintenance.",
      },
      {
        title: "Building Maintenance",
        desc: "Supports exterior cleaning, signage installation, and maintenance of suitable residential and commercial buildings.",
      },
      {
        title: "Electrical and Streetlight Work",
        desc: "Can support suitable lighting and utility maintenance tasks when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Industrial Maintenance",
        desc: "Useful for elevated facility repairs, equipment inspections, and selected industrial servicing operations.",
      },
      {
        title: "Signage and Advertising",
        desc: "Suitable for installing, inspecting, and maintaining outdoor signs, displays, and advertising boards at appropriate heights.",
      },
    ],
  },
  "mild-steel-hydraulic-truck-mounted-man-lift": {
    description:
      "The Mild Steel Hydraulic Truck Mounted Man Lift is designed to provide elevated access for construction, industrial maintenance, and infrastructure projects. This truck mounted man lift is specified for applications requiring access to elevated work areas within a maximum height range of 0–20 feet. The hydraulic man lift uses a hydraulic power source to support lifting and positioning operations according to the manufacturer's specifications. Manufactured with a mild steel body, this man lift is designed for structural strength and practical use in suitable working environments. The boom length of 9 metres supports elevated access requirements for suitable maintenance, installation, and repair tasks.",
    highlight:
      "This truck mounted man lift is specified for applications requiring access to elevated work areas within a maximum height range of 0–20 feet.",
    features: [
      {
        title: "Hydraulic Lifting Mechanism",
        desc: "The hydraulic truck mounted man lift is designed to support controlled lifting and lowering operations.",
      },
      {
        title: "Mild Steel Body",
        desc: "The mild steel construction provides a durable structural framework for the equipment.",
      },
      {
        title: "9-Metre Boom Length",
        desc: "The boom configuration supports access to elevated work areas for various professional applications.",
      },
      {
        title: "12-Month Warranty",
        desc: "The product is specified with a 12-month warranty, subject to the manufacturer's terms and conditions.",
      },
      {
        title: "Lift and Reach Brand",
        desc: "This man lift is identified under the Lift and Reach brand for customers seeking hydraulic aerial access equipment.",
      },
    ],
    applications: [
      {
        title: "Construction Projects",
        desc: "Suitable for elevated installation, repair, and maintenance activities at construction sites.",
      },
      {
        title: "Building Maintenance",
        desc: "Can support suitable exterior repairs, painting, and maintenance of elevated building components.",
      },
      {
        title: "Industrial Maintenance",
        desc: "Useful for selected equipment inspections, facility repairs, and elevated servicing tasks.",
      },
      {
        title: "Electrical and Lighting Work",
        desc: "Can support suitable lighting maintenance and installation work when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Signage and Infrastructure",
        desc: "Suitable for installing and maintaining signs, displays, and other elevated infrastructure components.",
      },
    ],
  },
  "24mtr-truck-mounted-boom-lift": {
    description:
      "RV Infrastructural Private Limited offers a 24mtr Truck Mounted Boom Lift designed for elevated access requirements in construction, infrastructure, industrial maintenance, and commercial projects. This 24 metre truck mounted boom lift is suitable for reaching elevated work areas for installation, inspection, repair, and maintenance activities. The diesel-powered boom lift is designed for suitable outdoor applications where reliable equipment operation is required. Our Truck Mounted Boom Lift services are available across India, helping customers access aerial work solutions in different project locations. Service arrangements are handled offline, allowing customers to coordinate equipment requirements, availability, and project details directly with the company.",
    highlight:
      "This 24 metre truck mounted boom lift is suitable for reaching elevated work areas for installation, inspection, repair, and maintenance activities.",
    features: [
      {
        title: "24 Metre Working Height Category",
        desc: "The 24m Truck Mounted Boom Lift is designed for elevated access applications across various industries.",
      },
      {
        title: "Truck Mounted Configuration",
        desc: "Its vehicle-mounted design supports transportation between compatible job sites.",
      },
      {
        title: "Diesel Power Source",
        desc: "The diesel-powered system is suitable for appropriate outdoor working environments and project requirements.",
      },
      {
        title: "Versatile Applications",
        desc: "This truck mounted aerial lift can support construction, building maintenance, infrastructure work, and industrial servicing.",
      },
      {
        title: "Pan India Service Coverage",
        desc: "Customers across India can contact RV Infrastructural Private Limited to discuss equipment availability and service arrangements.",
      },
    ],
    applications: [
      {
        title: "Construction Projects",
        desc: "Suitable for elevated installation, building repairs, painting, and construction-related maintenance.",
      },
      {
        title: "Building and Facility Maintenance",
        desc: "Helps with exterior maintenance, façade work, and servicing of elevated building components.",
      },
      {
        title: "Electrical and Streetlight Maintenance",
        desc: "Can support streetlight servicing and suitable utility work when operated under applicable safety requirements.",
      },
      {
        title: "Infrastructure Development",
        desc: "Useful for road infrastructure, elevated signage, and maintenance of suitable public and commercial structures.",
      },
      {
        title: "Industrial Applications",
        desc: "Supports elevated equipment inspections, facility repairs, and maintenance operations at suitable industrial sites.",
      },
    ],
  },
  "truck-mounted-cherry-picker-lift": {
    description:
      "The Truck Mounted Cherry Picker Lift is designed to provide elevated access for industrial, commercial, and infrastructure projects requiring efficient working-at-height solutions. With a maximum working height of 30 metres and a stated platform height of 80 feet, this cherry picker boom lift is suitable for a wide range of elevated maintenance and installation activities. The combined articulated and telescopic boom configuration supports flexible positioning and access to elevated work areas around suitable obstacles. With a specified load capacity of 400 kg and a platform size of 1.2 × 0.8 metres, the lift is designed to accommodate personnel and tools within the manufacturer's approved operating limits. The diesel-powered, truck-mounted configuration supports mobility between suitable job sites and is suited to industrial maintenance, streetlight servicing, façade work, and other aerial access applications.",
    highlight:
      "With a maximum working height of 30 metres and a stated platform height of 80 feet, this cherry picker boom lift is suitable for a wide range of elevated maintenance and installation activities.",
    features: [
      {
        title: "30 Metres Maximum Working Height",
        desc: "The Truck Mounted Cherry Picker Lift provides access to elevated working areas for maintenance, inspection, and installation tasks.",
      },
      {
        title: "80 Feet Platform Height",
        desc: "The stated 80-foot platform height makes this cherry picker lift suitable for high-reach applications, subject to confirmation of the manufacturer's rated specifications.",
      },
      {
        title: "Articulated and Telescopic Boom Design",
        desc: "The combination boom system offers flexible positioning for accessing challenging elevated work areas.",
      },
      {
        title: "360-Degree Rotation",
        desc: "The cherry picker boom lift features 360° rotation to support flexible positioning around the machine, subject to its operating configuration.",
      },
      {
        title: "400 kg Load Capacity",
        desc: "The specified platform load capacity supports personnel, tools, and equipment within the approved load limits.",
      },
    ],
    applications: [
      {
        title: "Industrial Plant Maintenance",
        desc: "The Truck Mounted Cherry Picker Lift is suitable for inspecting, servicing, and maintaining elevated equipment and structures in industrial facilities.",
      },
      {
        title: "Streetlight and Electrical Maintenance",
        desc: "This truck mounted aerial lift can support streetlight servicing and suitable electrical infrastructure work when operated by qualified personnel under applicable safety requirements.",
      },
      {
        title: "Building Façade Work",
        desc: "The articulated telescopic boom lift supports suitable exterior building maintenance, façade inspection, and elevated repair activities.",
      },
      {
        title: "Signage and Advertising Installation",
        desc: "The cherry picker lift can assist with installing, inspecting, and maintaining outdoor signs, hoardings, and elevated displays.",
      },
      {
        title: "Tree Pruning and Landscaping",
        desc: "This truck mounted cherry picker can support suitable tree pruning and maintenance operations when site conditions and safety procedures permit.",
      },
    ],
  },
};

export const products = fleetGroups.map((g) => {
  const slug = slugify(g.name);
  const content = productContentBySlug[slug] || {};
  return {
    ...g,
    slug,
    categorySlug: slugify(g.category),
    image: `/fleets/${g.image_file}`,
    gallery: [
      `/fleets/${g.image_file}`,
      ...(galleryBySlug[slug] || []).map((f) => (f.startsWith("/") ? `/fleets${f}` : `/fleets/${f}`)),
    ],
    units: unitsByName[g.name] || null,
    highlight: content.highlight || highlightByName[g.name] || g.description,
    description: content.description || g.description,
    models: [],
    features: content.features || [],
    applications: content.applications || [],
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