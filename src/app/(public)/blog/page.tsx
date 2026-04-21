import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { buildPageMetadata } from "@/lib/seo";
import { getPublicBlogsData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveBlogImage } from "@/lib/blog-image";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { BlogItem } from "@/types";

type Props = {
  searchParams?: Promise<{ search?: string; tag?: string }>;
};

export async function generateMetadata() {
  return buildPageMetadata("blog", {
    pathname: "/blog",
    ogImage: "/uploads/blog-designing-public-programs.jpeg"
  });
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = (await searchParams) || {};
  const { search, tag } = resolvedSearchParams;
  const blogs = (await getPublicBlogsData(search, tag)) as BlogItem[];
  const featured = blogs[0];
  const topTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags))).slice(0, 8);
  const blogCollectionSchema = buildWebPageJsonLd({
    pathname: "/blog",
    type: "CollectionPage",
    title: "Insights & Articles",
    description: "Practical perspectives on governance, strategy, and execution.",
    imageUrl: featured ? resolveBlogImage(featured) : "/uploads/blog-designing-public-programs.jpeg"
  });
  const blogListSchema = buildItemListJsonLd({
    pathname: "/blog",
    name: "Blog Articles",
    itemPaths: blogs.map((blog) => `/blog/${blog.slug}`)
  });

  return (
    <>
      <StructuredData data={[blogCollectionSchema, blogListSchema]} />
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            title="Insights & Articles"
            description="Practical perspectives on governance, strategy, and execution."
            className="max-w-3xl"
          />
          <div className="mt-10 mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Insight Desk</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">What You Get</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Focused analysis with practical implications, sequencing guidance, and execution checkpoints.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Coverage</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Topics</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topTags.length ? (
                    topTags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">New topic tags will appear here.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">How To Use</p>
                <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Read Fast</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start with featured notes for current context, then move to topic-specific posts for deeper decision support.
                </p>
              </CardContent>
            </Card>
          </div>

          {featured ? (
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 sm:h-72 md:h-full">
                  <Image
                    src={resolveBlogImage(featured)}
                    alt={`${featured.title} featured advisory insight`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <Badge>Featured</Badge>
                  <h2 className="mt-4 font-[family-name:var(--font-newsreader)] text-3xl font-semibold sm:text-4xl lg:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">{format(new Date(featured.publishedAt), "PPP")}</p>
                  <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                  <Link href={`/blog/${featured.slug}`} className="mt-6 inline-block font-semibold text-accent">
                    Read Full Article
                  </Link>
                </CardContent>
              </div>
            </Card>
          ) : null}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(1).map((blog) => (
              <Card key={String(blog._id)} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={resolveBlogImage(blog)}
                    alt={`${blog.title} article cover image`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{format(new Date(blog.publishedAt), "PPP")}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${blog.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
                    Continue Reading
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-10 max-w-xl">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Team Member</p>
              <div className="mt-3 relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-outline-variant/20">
                <Image
                  src="/uploads/rajesh-narang.jpg"
                  alt="Rajesh Narang, founder and mentor at Vidhi Satya"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Rajesh Narang</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Founder and mentor with 35+ years of advisory experience across individual, corporate, and government matters.
              </p>
              <a
                href="https://www.linkedin.com/company/east-delhi-law-office/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
              >
                View LinkedIn Profile
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
      <CTASection title="Need Context for a Critical Decision?" description="Speak with our advisors for a focused strategy conversation." />
    </>
  );
}
