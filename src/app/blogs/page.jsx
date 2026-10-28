import Map from "@/components/Map"
import BlogPage from "@/components/BlogPage"
import BgHeader from "@/components/BgHeader"

export const metadata = { title: "Blogs | R.V. Infrastructural Pvt. Ltd." };

export const revalidate = 60

export default function Blogs() {
  return (
    <>
     <BgHeader
          title="Blogs"
          eyebrow="Latest Blogs"
        accent="#f9c32f"
          text="Insights That Shape Smarter, Better and Efficient Construction"
          backgroundImage="/blogs_hero.png"
        />
      <BlogPage/>
      <Map/>
    </>
  )
}