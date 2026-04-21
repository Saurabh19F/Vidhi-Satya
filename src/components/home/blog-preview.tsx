import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveBlogImage } from "@/lib/blog-image";

type BlogPreviewProps = {
  blogs: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    tags: string[];
    publishedAt: string | Date;
  }>;
};

export function BlogPreview({ blogs }: BlogPreviewProps) {
  const orderedBlogs = [...blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const featured = orderedBlogs[0];
  const remaining = orderedBlogs.slice(1, 6);
  const uniqueTags = Array.from(new Set(orderedBlogs.flatMap((blog) => blog.tags))).slice(0, 5);

  if (!orderedBlogs.length) {
    return (
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="Insights"
            title="Latest Advisory Perspectives"
            description="Fresh analysis and implementation guidance will appear here as new articles are published."
          />
          <div className="mt-8">
            <Button asChild variant="default">
              <Link href="/blog">Open Insights Hub</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container">
        <SectionTitle
          eyebrow="Insights"
          title="Latest Advisory Perspectives"
          description="Research-backed briefs that translate regulatory, strategic, and execution complexity into clear direction."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Published Notes</p>
              <p className="mt-2 font-[family-name:var(--font-newsreader)] text-4xl font-semibold">{orderedBlogs.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">Current curated insights from the advisory desk.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Most Recent</p>
              <p className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">
                {format(new Date(orderedBlogs[0].publishedAt), "MMM d")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Latest publication date in the current feed.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Focus Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {uniqueTags.length ? (
                  uniqueTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Tags will appear as posts are added.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {featured ? (
          <MotionReveal delay={0.04}>
            <Card className="mt-10 overflow-hidden">
              <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[240px] sm:min-h-[300px]">
                  <Image
                    src={resolveBlogImage(featured)}
                    alt={`${featured.title} featured insight article`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 sm:p-8">
                  <Badge>Featured Insight</Badge>
                  <h3 className="mt-4 font-[family-name:var(--font-newsreader)] text-3xl font-semibold sm:text-4xl">{featured.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{format(new Date(featured.publishedAt), "PPP")}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${featured.slug}`} className="mt-5 inline-block text-sm font-semibold text-accent">
                    Read Featured Insight
                  </Link>
                </CardContent>
              </div>
            </Card>
          </MotionReveal>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((blog, idx) => (
            <MotionReveal key={blog._id} delay={idx * 0.05 + 0.08}>
              <Card className="overflow-hidden">
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
                  <div className="mt-3 flex gap-2">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${blog.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
                    Read Article
                  </Link>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="default">
            <Link href="/blog">View All Insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
