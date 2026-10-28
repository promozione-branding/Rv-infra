import Map from "@/components/Map"
import BlogPage from "@/components/BlogPage"
import BgHeader from "@/components/BgHeader"

export const metadata = { title: "Blogs | R.V. Infrastructural Pvt. Ltd." };

export const revalidate = 60

export default function Blogs() {
  return (
    <>
     <BgHeader
          title="Built on the shop floor"
          text="Sisco started as a two-person welding bay. Today we make racking for warehouses, workshops and shops across the country."
          backgroundImage="/suppliers.png"
        />
      <BlogPage/>
      <Map/>
    </>
  )
}