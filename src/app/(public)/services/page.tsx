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

const serviceTracks = [
  {
    category: "Individual Page",
    price: "Cost 2 Lacs Monthly Onwards",
    focus: ["Personal", "Social", "Political", "Corporate", "Government"]
  },
  {
    category: "Corporate Page",
    price: "Cost 5 L Monthly Onwards",
    focus: ["Social CSR Promotion", "Political", "Competition", "Government", "Managing Personal (Self)"]
  },
  {
    category: "Government Page",
    price: "Cost 1 CR Quarterly Onwards",
    focus: ["Individual", "Community", "Projects", "Government", "Deternation"]
  }
];

const pricingCards = [
  {
    category: "Individual",
    entries: [
      {
        type: "INR",
        details: "2L per month onwards",
        notes: "Value add-ons as needed + logistics/protocols"
      },
      {
        type: "INR",
        details: "2L per month onwards",
        notes: "Includes logistics/protocols"
      }
    ]
  },
  {
    category: "Corporate",
    entries: [
      {
        type: "INR",
        details: "5L per month onwards",
        notes: "Plus logistics/protocols"
      },
      {
        type: "INR",
        details: "5L per month onwards",
        notes: "Plus logistics/protocols + 2 SPOC"
      }
    ]
  },
  {
    category: "Government",
    entries: [
      {
        type: "INR",
        details: "1 Cr per quarter onwards",
        notes: "Plus logistics + admin support at each level"
      },
      {
        type: "Levels",
        details: "IAS, IPS, IRS + other officials",
        notes: "Operational support included by Government Organization"
      }
    ]
  }
];

const generalPricingNote = {
  details: "No discounts permissible",
  notes: "Except special agreed cases"
};

const operatingModel = [
  ["SPOC", "Appointment of SPOC at both ends"],
  ["Mode of Working", "Meetings to settle course of action"],
  ["Timeline", "Action within 30 days"],
  ["Decision Timeline", "Course of action decided up to 30 days/amendment"],
  ["Work Start", "Work begins within 30 days"],
  ["Payment Terms", "All payments in advance - No credit"],
  ["Payment Mode", "Bank transfer only (No cash), online preferred"],
  ["Change Management", "Any alteration/decision by SPOC only"],
  ["Communication", "All communication via email (by SPOC)"]
];

const confidentialityRules = [
  ["Confidentiality", "Due to privacy of contracts, sharing of personal/organizational data is discouraged."],
  ["Disclosure", "Only allowed by High Court order (Strict)."],
  ["Client Rights", "Both parties can exit with 30 days notice."],
  ["Handover", "Amicable handover within 30 days."],
  ["Payment Terms", "All payments to company bank account only."],
  ["Contract Basis", "Work will be executed as per contract only."],
  ["Additional Note", "Details can be added later as required."]
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

      <section className="section-padding bg-surface-low">
        <div className="container">
          <SectionTitle
            eyebrow="Service Menu"
            title="Category Tracks, Scope, and Baseline Commercial Bands"
            description="These structured tracks are offered as baseline engagement pathways. Final scope is confirmed during consultation."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTracks.map((track) => (
              <Card key={track.category}>
                <CardContent className="p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{track.category}</p>
                  <p className="mt-2 font-[family-name:var(--font-newsreader)] text-2xl font-semibold">{track.price}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {track.focus.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
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
            title="Pricing Reference, Process Controls, and Compliance Terms"
            description="All values below are reference bands from your supplied content and can be finalized based on mandate depth."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingCards.map((card) => (
              <Card key={card.category} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold">{card.category}</h3>
                  <div className="mt-5 space-y-4">
                    {card.entries.map((entry, idx) => (
                      <div key={`${card.category}-${idx}`} className="rounded-[0.75rem] bg-surface-low p-4 ring-1 ring-outline-variant/15">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Type</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{entry.type}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">Details</p>
                        <p className="mt-1 text-sm text-foreground/90">{entry.details}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">Price / Notes</p>
                        <p className="mt-1 text-sm text-foreground/90">{entry.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
