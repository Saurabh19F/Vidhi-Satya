import Link from "next/link";

import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  const additionalFocusTags = ["Project management", "Audit", "Compliances", "Growth", "Sustainability", "wellfare"];
  const orderedBlogs = [...blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const uniqueTags = Array.from(new Set([...orderedBlogs.flatMap((blog) => blog.tags), ...additionalFocusTags]));

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
              <p className="mt-2 text-sm text-muted-foreground text-4xl font-semibold">LinkedIn & Facebook</p>
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

        <div className="mt-8">
          <Button asChild variant="default">
            <Link href="/blog">View All Insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
