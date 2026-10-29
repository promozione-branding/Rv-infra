import PageHeader from "@/components/PageHeader";
import ProductsExplorer from "@/components/products/ProductsExplorer";
import { pageSeo, buildMetadata } from "@/data/seo";

export const metadata = buildMetadata(pageSeo.products);

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        crumb="Products"
        title="Best Products all over India"
        highlight="Products"
        text="Cranes, piling rigs, concrete equipment and earthmovers, supplied with skilled operators to leading infrastructure and industrial companies."
        lottieSrc="/Building_Construction.json"
      />
      <ProductsExplorer />
    </>
  );
}
