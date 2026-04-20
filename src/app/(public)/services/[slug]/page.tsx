import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import { sortServicesByPriority } from "@/lib/service-order";
import { resolveServiceImage } from "@/lib/service-image";
import Service from "@/models/Service";
import { CTASection } from "@/components/common/cta-section";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceItem } from "@/types";

type Props = { params: Promise<{ slug: string }> };

type CategoryKey = "individual" | "corporate" | "government";

type PricingLine = {
  label: string;
  value: string;
  note?: string;
  highlightValue?: boolean;
};

type ServicePlaybook = {
  categoryTitle: string;
  focusAreas: string[];
  moneyBand: string;
  pricingLines: PricingLine[];
  operatingTerms: string[];
  contractTerms: string[];
};

const BASE_OPERATING_TERMS = [
  "SPOC appointment at both ends.",
  "Meetings to settle the course of action.",
  "Action timeline targeted within 30 days.",
  "Course amendments or decisions finalized up to 30 days.",
  "Work begins within 30 days of confirmation."
];

const BASE_CONTRACT_TERMS = [
  "All payments in advance. No credit model.",
  "Bank transfer only (no cash), online preferred.",
  "Any change/decision through SPOC channel only.",
  "All communication via email by SPOC.",
  "Disclosure only with High Court order (strict).",
  "Both parties can exit with 30 days notice.",
  "Work execution strictly as per signed contract."
];

const SERVICE_PLAYBOOK: Record<CategoryKey, ServicePlaybook> = {
  individual: {
    categoryTitle: "Individual Advisory",
    focusAreas: ["Personal", "Social", "Political", "Corporate", "Government"],
    moneyBand: "INR 2L per month onwards",
    pricingLines: [
      {
        label: "Baseline Fee",
        value: "INR 2L per month onwards",
        note: "Value add-ons as needed + logistics/protocols.",
        highlightValue: true
      },
      {
        label: "Structured Package",
        value: "INR 2L per month onwards",
        note: "Includes logistics/protocols.",
        highlightValue: true
      },
      {
        label: "Payment Mode",
        value: "UPI / bank transfer",
        note: "Appointments are fixed in advance."
      }
    ],
    operatingTerms: BASE_OPERATING_TERMS,
    contractTerms: [
      ...BASE_CONTRACT_TERMS,
      "Confidentiality is strict for personal and organizational information."
    ]
  },
  corporate: {
    categoryTitle: "Corporate Advisory",
    focusAreas: ["Social CSR Promotion", "Political", "Competition", "Government", "Managing Personal (Self)"],
    moneyBand: "INR 5L per month onwards",
    pricingLines: [
      {
        label: "Baseline Fee",
        value: "INR 5L per month onwards",
        note: "Plus logistics/protocols.",
        highlightValue: true
      },
      {
        label: "Extended SPOC Model",
        value: "INR 5L per month onwards",
        note: "Plus logistics/protocols + 2 SPOC support.",
        highlightValue: true
      },
      {
        label: "Commercial Note",
        value: "No discounts permissible",
        note: "Except special agreed cases."
      }
    ],
    operatingTerms: BASE_OPERATING_TERMS,
    contractTerms: [
      ...BASE_CONTRACT_TERMS,
      "Amicable handover target within 30 days."
    ]
  },
  government: {
    categoryTitle: "Government Advisory",
    focusAreas: ["Individual", "Community", "Projects", "Government", "Determination"],
    moneyBand: "INR 1 Cr per quarter onwards",
    pricingLines: [
      {
        label: "Baseline Fee",
        value: "INR 1 Cr per quarter onwards",
        note: "Plus logistics + admin support at each level.",
        highlightValue: true
      },
      {
        label: "Operational Level Support",
        value: "IAS, IPS, IRS + other officials",
        note: "Support provided by government organization."
      },
      {
        label: "Commercial Note",
        value: "No discounts permissible",
        note: "Except special agreed cases."
      }
    ],
    operatingTerms: BASE_OPERATING_TERMS,
    contractTerms: [
      ...BASE_CONTRACT_TERMS,
      "Confidentiality and disclosure controls apply at institutional level."
    ]
  }
};

function resolveServiceCategory(category: string | undefined, title: string | undefined): CategoryKey {
  const haystack = `${category ?? ""} ${title ?? ""}`.toLowerCase();

  if (/\bcorporate\b|\bcorp\b/.test(haystack)) return "corporate";
  if (/\bindividual\b|\bpersonal\b/.test(haystack)) return "individual";
  if (/\bgovernment\b|\bgov\b|\bpublic\b|\bpolicy\b/.test(haystack)) return "government";

  return "corporate";
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const service = (await Service.findOne({ slug, isPublished: true }).lean()) as unknown as ServiceItem | null;
  if (!service) return buildPageMetadata("services");
  return buildPageMetadata("services", {
    title: service.seoTitle,
    description: service.seoDescription
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const service = (await Service.findOne({ slug, isPublished: true }).lean()) as unknown as ServiceItem | null;
  if (!service) return notFound();
  const serviceCategory = resolveServiceCategory(service.category, service.title);
  const playbook = SERVICE_PLAYBOOK[serviceCategory];

  const relatedServices = sortServicesByPriority(
    (await Service.find({ _id: { $ne: service._id }, isPublished: true }).lean()) as unknown as ServiceItem[]
  ).slice(0, 3);

  return (
    <>
      <section className="section-padding">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <SectionTitle title={service.title} description={service.fullDescription} />
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Benefits</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                  {service.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Process</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
                  {service.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[240px] sm:h-[300px]">
                  <Image
                    src={resolveServiceImage(service.imageUrl, service.category, service.title)}
                    alt={service.title}
                    fill
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
        <div className="container space-y-8">
          <SectionTitle
            eyebrow="Engagement & Pricing"
            title={`${playbook.categoryTitle} Commercial Structure`}
            description="Category-specific scope, pricing, and engagement controls for this mandate."
          />

          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Highlighted Pricing Band</p>
                  <p className="mt-2 inline-flex rounded-full bg-tertiary px-4 py-2 text-sm font-semibold text-white shadow-ambient">
                    {playbook.moneyBand}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground">
                    Scope lanes for this service page are listed below and aligned with your provided commercial framework.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {playbook.focusAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {playbook.pricingLines.map((line) => (
                    <div key={line.label} className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{line.label}</p>
                      <p
                        className={
                          line.highlightValue
                            ? "mt-1 inline-flex rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-accent"
                            : "mt-1 font-semibold text-foreground"
                        }
                      >
                        {line.value}
                      </p>
                      {line.note ? <p className="mt-1 text-sm text-muted-foreground">{line.note}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Operating Model</h3>
                <div className="mt-4 space-y-3">
                  {playbook.operatingTerms.map((term) => (
                    <div key={term} className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                      <p className="text-sm text-foreground/90">{term}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">
                  Contract & Confidentiality Terms
                </h3>
                <div className="mt-4 space-y-3">
                  {playbook.contractTerms.map((term) => (
                    <div key={term} className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                      <p className="text-sm text-foreground/90">{term}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
