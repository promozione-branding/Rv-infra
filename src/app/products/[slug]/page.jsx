import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductDetail from "@/components/products/ProductDetail";
import { products, getProduct, relatedProducts } from "@/data/product";
import { productSeo, buildMetadata } from "@/data/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return {};
  const seo = productSeo[p.slug];
  if (!seo) {
    // Fallback for any product not listed in the SEO document.
    return {
      title: `${p.name} on Rent | R.V. Infrastructural Pvt. Ltd.`,
      description: `${p.description} Make: ${p.make}. Capacity: ${p.capacity}.`,
      openGraph: { images: [p.image] },
    };
  }
  return buildMetadata(seo, { openGraph: { images: [p.image] } });
}

export default function ProductPage({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  return (
    <>
      <PageHeader
        eyebrow={p.category}
        crumb={p.name}
        parents={[{ label: "Products", href: "/products" }]}
        title={p.name}
        highlight={p.name.split(" ")[0]}
        text={p.highlight}
        lottieSrc="/Building_Construction.json"
        backgroundImage={p.image}
      />
      <ProductDetail product={p} related={relatedProducts(p, 6)} />
    </>
  );
}