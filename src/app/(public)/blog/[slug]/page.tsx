import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import SiteSetting from "@/models/SiteSetting";
import { CTASection } from "@/components/common/cta-section";
import { PageBanner } from "@/components/common/page-banner";
import { StructuredData } from "@/components/common/structured-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { resolveBlogImage } from "@/lib/blog-image";
import { buildBlogPostingJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { BlogItem, SiteSettingItem } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = (await Blog.findOne({ slug, isPublished: true }).lean()) as unknown as BlogItem | null;
  if (!blog) return buildPageMetadata("blog");
  const resolvedBlogImage = resolveBlogImage(blog);

  return buildPageMetadata("blog", {
    pathname: `/blog/${slug}`,
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.tags,
    ogImage: resolvedBlogImage,
    openGraph: {
      type: "article",
      publishedTime: new Date(blog.publishedAt).toISOString(),
      authors: [blog.author],
      tags: blog.tags
    }
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const [blog, settings] = await Promise.all([
    Blog.findOne({ slug, isPublished: true }).lean(),
    SiteSetting.findOne().lean()
  ]);
  const blogData = blog as unknown as BlogItem | null;
  const siteSettings = settings as unknown as SiteSettingItem | null;
  if (!blogData) return notFound();
  const resolvedBlogImage = resolveBlogImage(blogData);
  const blogPageSchema = buildWebPageJsonLd({
    pathname: `/blog/${slug}`,
    type: "Article",
    title: blogData.title,
    description: blogData.excerpt,
    imageUrl: resolvedBlogImage
  });
  const blogPostingSchema = buildBlogPostingJsonLd({
    blog: blogData,
    pathname: `/blog/${slug}`,
    imageUrl: resolvedBlogImage,
    siteSettings
  });

  const related = (await Blog.find({ _id: { $ne: blogData._id }, isPublished: true }).limit(3).lean()) as unknown as BlogItem[];

  return (
    <>
      <StructuredData data={[blogPageSchema, blogPostingSchema]} />
      <PageBanner title={blogData.title} description={blogData.excerpt} />
      <article className="section-padding">
        <div className="container max-w-4xl">
          <p className="text-sm text-muted-foreground">
            By {blogData.author} • {format(new Date(blogData.publishedAt), "PPP")}
          </p>
          <div className="relative mt-6 h-80 overflow-hidden rounded-[0.75rem] ring-1 ring-outline-variant/15">
            <Image
              src={resolvedBlogImage}
              alt={`${blogData.title} article cover image`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          <div className="prose prose-headings:font-[family-name:var(--font-newsreader)] prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground mt-8 max-w-none whitespace-pre-wrap text-foreground/90">
            {blogData.content}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {blogData.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
      <section className="section-padding bg-surface-low">
        <div className="container">
          <h3 className="font-[family-name:var(--font-newsreader)] text-4xl font-semibold">Related Posts</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((post) => (
              <Card key={String(post._id)}>
                <CardContent className="p-5">
                  <h4 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold">{post.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
                    Read Post
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
