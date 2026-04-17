import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { CTASection } from "@/components/common/cta-section";
import { PageBanner } from "@/components/common/page-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { resolveBlogImage } from "@/lib/blog-image";
import type { BlogItem } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = (await Blog.findOne({ slug, isPublished: true }).lean()) as unknown as BlogItem | null;
  if (!blog) return buildPageMetadata("blog");
  return buildPageMetadata("blog", {
    title: blog.seoTitle,
    description: blog.seoDescription
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = (await Blog.findOne({ slug, isPublished: true }).lean()) as unknown as BlogItem | null;
  if (!blog) return notFound();

  const related = (await Blog.find({ _id: { $ne: blog._id }, isPublished: true }).limit(3).lean()) as unknown as BlogItem[];

  return (
    <>
      <PageBanner title={blog.title} description={blog.excerpt} />
      <article className="section-padding">
        <div className="container max-w-4xl">
          <p className="text-sm text-muted-foreground">
            By {blog.author} • {format(new Date(blog.publishedAt), "PPP")}
          </p>
          <div className="relative mt-6 h-80 overflow-hidden rounded-[0.75rem] ring-1 ring-outline-variant/15">
            <Image src={resolveBlogImage(blog)} alt={blog.title} fill className="object-cover" />
          </div>
          <div className="prose prose-headings:font-[family-name:var(--font-newsreader)] prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground mt-8 max-w-none whitespace-pre-wrap text-foreground/90">
            {blog.content}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
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
