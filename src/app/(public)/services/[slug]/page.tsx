import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import { normalizeService, normalizeServices } from "@/lib/service-normalization";
import { sortServicesByPriority } from "@/lib/service-order";
import { resolveServiceImage } from "@/lib/service-image";
import Service from "@/models/Service";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { ServiceItem } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const service = normalizeService((await Service.findOne({ slug, isPublished: true }).lean()) as unknown as ServiceItem | null);
  if (!service) return buildPageMetadata("services");
  const resolvedServiceImage = resolveServiceImage(service.imageUrl, service.category, service.title);

  return buildPageMetadata("services", {
    pathname: `/services/${slug}`,
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
    keywords: [service.category, ...service.benefits.slice(0, 6)],
    ogImage: resolvedServiceImage
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const service = normalizeService((await Service.findOne({ slug, isPublished: true }).lean()) as unknown as ServiceItem | null);
  if (!service) return notFound();
  const resolvedServiceImage = resolveServiceImage(service.imageUrl, service.category, service.title);
  const servicePageSchema = buildWebPageJsonLd({
    pathname: `/services/${slug}`,
    type: "WebPage",
    title: service.title,
    description: service.seoDescription || service.shortDescription,
    imageUrl: resolvedServiceImage
  });
  const serviceSchema = buildServiceJsonLd({
    service,
    pathname: `/services/${slug}`,
    imageUrl: resolvedServiceImage
  });

  const relatedServices = sortServicesByPriority(
    normalizeServices((await Service.find({ _id: { $ne: service._id }, isPublished: true }).lean()) as unknown as ServiceItem[])
  ).slice(0, 3);

  return (
    <>
      <StructuredData data={[servicePageSchema, serviceSchema]} />
      <section className="section-padding">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <SectionTitle title={service.title} description={service.fullDescription} />
          </div>
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[240px] sm:h-[300px]">
                  <Image
                    src={resolvedServiceImage}
                    alt={`${service.title} advisory service illustration`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Badge>{service.category}</Badge>
          </div>
        </div>
      </section>
      <section className="section-padding bg-surface-low">
        <div className="container">
          <SectionTitle title="Related Services" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((related) => (
              <Card key={String(related._id)}>
                <CardContent className="p-5">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold">{related.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{related.shortDescription}</p>
                  <Link href={`/services/${related.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
                    View Service
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
