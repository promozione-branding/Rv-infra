import { notFound } from "next/navigation";
import { getBlog } from "@/lib/blogs";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlog({ params }) {
  const { slug } = await params;
  const blog = await getBlog(decodeURIComponent(slug));
  if (!blog) notFound();

  const initial = {
    title: blog.title,
    permalink: blog.permalink,
    date: new Date(blog.date).toISOString().slice(0, 10),
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    content: blog.content || "",
    image: blog.image,
    imageFileId: blog.imageFileId,
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-extrabold text-navy">Edit blog</h1>
      <BlogForm initial={initial} originalSlug={blog.permalink} />
    </>
  );
}
