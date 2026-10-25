import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductsExplorer from "@/components/products/ProductsExplorer";
import { categories, getCategory, productsInCategory } from "@/data/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCategory(params.category);
  if (!c) return {};
  return {
    title: `${c.name} Equipment | R.V. Infrastructural Pvt. Ltd.`,
    description: c.description,
  };
}

export default function CategoryPage({ params }) {
  const c = getCategory(params.category);
  if (!c) notFound();
  const count = productsInCategory(c.slug).length;

  return (
    <>
      <PageHeader
        eyebrow="Product Category"
        crumb={c.name}
        parents={[{ label: "Products", href: "/products" }]}
        title={`${c.name} Equipment`}
        highlight={c.name}
        text={`${c.description} ${count} product ${count === 1 ? "line" : "lines"} available.`}
        lottieSrc="/Building_Construction.json"
        backgroundImage={`/fleets/${c.image_file}`}
      />
      <ProductsExplorer category={c} />
    </>
  );
}