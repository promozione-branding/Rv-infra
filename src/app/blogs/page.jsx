import PageHead from "@/components/PageHead"
import ContactForm from "@/components/ContactForm"
import Map from "@/components/Map"
import { pageSeo } from "@/lib/seo"
import BlogPage from "@/components/BlogPage"

export const metadata = { title: pageSeo.blogs.title, description: pageSeo.blogs.description }

// Safety net: even if on-demand revalidation or a cache layer misses, the list refreshes within 60s
export const revalidate = 60

export default function Blogs() {
  return (
    <>
    <PageHead 
  title="Blogs" 
  text="Insights That Shape Smarter, Safer Storage Spaces"
  backgroundImage="/blog_hero.webp"
/>
      <BlogPage/>
      <Map/>
    </>
  )
}