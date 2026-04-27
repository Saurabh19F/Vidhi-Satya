import Link from "next/link";
import Image from "next/image";

import { buildPageMetadata } from "@/lib/seo";
import { getPublicServicesData } from "@/lib/public-cache";
import { resolveServiceImage } from "@/lib/service-image";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { ServiceItem } from "@/types";

const generalPricingNote = {
  details: "No discounts permissible",
  notes: "Except special agreed cases"
};

const operatingModel = [
  ["SPOC", "Appointment of SPOC at both ends"],
  ["Mode of Working", "Meetings to settle course of action"],
  ["Time", "As settled"],
  ["Work Start", "Work begins on receipt of advance payment and signed contract"],
  ["Payment Mode", "Bank transfer only (No cash), online preferred"],
  ["Change Management", "Any alteration/decision by SPOC only"],
  ["Communication", "All communication via email (by SPOC)"]
];

const confidentialityRules = [
  ["Confidentiality", "Due to privacy of contracts, sharing of personal/organizational data is discouraged."],
  ["Client Rights", "30 day notice/ Handover payment"],
  ["Payment Terms", "All payments to company bank account only."],
  ["Contract Basis", "Work will be executed as per contract only."],
  ["Additional Note", "Details can be added later as required."],
  ["Refund", "Only any refund will be 50% of the advance/fee."]
];

export async function generateMetadata() {
  return buildPageMetadata("services", {
    pathname: "/services",
    ogImage: "/uploads/service-cor.jpeg"
  });
}

export default async function ServicesPage() {
  const services = (await getPublicServicesData()) as ServiceItem[];
  const servicesCollectionSchema = buildWebPageJsonLd({
    pathname: "/services",
    type: "CollectionPage",
    title: "Services",
    description: "Strategic advisory offerings for individuals, enterprises, and institutions.",
    imageUrl: services[0] ? resolveServiceImage(services[0].imageUrl, services[0].category, services[0].title) : "/uploads/service-cor.jpeg"
  });
  const serviceListSchema = buildItemListJsonLd({
    pathname: "/services",
    name: "Service Directory",
    itemPaths: services.map((service) => `/services/${service.slug}`)
  });

  return (
    <>
      <StructuredData data={[servicesCollectionSchema, serviceListSchema]} />
      <section className="section-padding">
        <div className="container">
          <SectionTitle
            title="Services"
            description="Strategic advisory offerings for individuals, enterprises, and institutions."
            className="max-w-3xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={String(service._id)} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={resolveServiceImage(service.imageUrl, service.category, service.title)}
                  alt={`${service.title} service offering illustration`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit">
                  {service.category}
                </Badge>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="default">
                  <Link href={`/services/${service.slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container space-y-8">
          <SectionTitle
            eyebrow="Commercial Notes"
            title="Process Controls, and Compliance Terms"
            description="All values below are reference bands from your supplied content and can be finalized based on mandate depth."
          />

          <Card className="border-primary/25 bg-primary/10">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">General Note</p>
              <p className="mt-3 text-base font-semibold text-foreground">
                * {generalPricingNote.details}
              </p>
              <p className="mt-2 text-sm text-accent">{generalPricingNote.notes}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Operating Model (SPOC Framework)</h3>
                <div className="mt-5 space-y-3">
                  {operatingModel.map(([label, detail]) => (
                    <div key={label} className="rounded-[0.75rem] bg-surface-low p-4 ring-1 ring-outline-variant/15">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm text-foreground/90">{detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">
                  Confidentiality & Contract Guardrails
                </h3>
                <div className="mt-5 space-y-3">
                  {confidentialityRules.map(([label, detail]) => (
                    <div key={label} className="rounded-[0.75rem] bg-surface-low p-4 ring-1 ring-outline-variant/15">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm text-foreground/90">{detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
