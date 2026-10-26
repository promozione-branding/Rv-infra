import PageHeader from "@/components/PageHeader";
import ProductsExplorer from "@/components/products/ProductsExplorer";

export const metadata = { title: "Products & Equipment | R.V. Infrastructural Pvt. Ltd." };

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        crumb="Products"
        title="Best Products all over India"
        highlight="Products"
        text="Truck mounted boom lifts from 24 to 35 mtrs, supplied with skilled operators to leading infrastructure and industrial companies."
        lottieSrc="/Building_Construction.json"
      />
      <ProductsExplorer />
    </>
  );
}