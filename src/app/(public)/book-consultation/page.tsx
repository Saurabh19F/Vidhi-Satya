import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import { normalizeServices } from "@/lib/service-normalization";
import { sortServicesByPriority } from "@/lib/service-order";
import Service from "@/models/Service";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { PageBanner } from "@/components/common/page-banner";
import { StructuredData } from "@/components/common/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { ServiceItem } from "@/types";

export async function generateMetadata() {
  return buildPageMetadata("book-consultation", {
    pathname: "/book-consultation",
    ogImage: "/brand/vidhi-satya-logo.png"
  });
}

export default async function BookConsultationPage() {
  await connectToDatabase();
  const services = sortServicesByPriority(
    normalizeServices((await Service.find({ isPublished: true }).lean()) as unknown as ServiceItem[])
  );
  const options = services.map((s) => s.title);
  const consultationPageSchema = buildWebPageJsonLd({
    pathname: "/book-consultation",
    type: "WebPage",
    title: "Book Consultation",
    description: "Schedule a strategic consultation with the appropriate advisory lead.",
    imageUrl: "/brand/vidhi-satya-logo.png"
  });
  const consultationOptionsSchema = buildItemListJsonLd({
    pathname: "/book-consultation",
    name: "Consultation Categories",
    itemPaths: services.map((service) => `/services/${service.slug}`)
  });

  return (
    <>
      <StructuredData data={[consultationPageSchema, consultationOptionsSchema]} />
      <PageBanner
        title="Book Consultation"
        description="Share your context and we will schedule a strategic consultation with the appropriate advisory lead."
      />
      <section className="section-padding">
        <div className="container max-w-3xl">
          <Card>
            <CardContent className="p-5 sm:p-8">
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold sm:text-4xl">Consultation Request Form</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your information is kept confidential. We focus on practical recommendations with clear implementation paths.
              </p>
              <div className="mt-6">
                <ConsultationForm serviceOptions={options.length ? options : ["General Advisory"]} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
