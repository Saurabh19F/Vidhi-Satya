import { buildPageMetadata } from "@/lib/seo";
import { connectToDatabase } from "@/lib/db";
import { sortServicesByPriority } from "@/lib/service-order";
import Service from "@/models/Service";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { PageBanner } from "@/components/common/page-banner";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceItem } from "@/types";

export async function generateMetadata() {
  return buildPageMetadata("book-consultation");
}

export default async function BookConsultationPage() {
  await connectToDatabase();
  const services = sortServicesByPriority((await Service.find({ isPublished: true }).lean()) as unknown as ServiceItem[]);
  const options = services.map((s) => s.title);

  return (
    <>
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

      <section className="section-padding bg-surface-low">
        <div className="container">
          <SectionTitle
            eyebrow="Form Governance"
            title="Declaration, Category Intake, and Partner Ecosystem"
            description="Added from your shared notes to keep intake standards and organizational references clear."
          />
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Google Form Scope</h3>
                <p className="mt-3 text-sm text-muted-foreground">Categories: Individual, Corporate, Government.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Basic information capture will be collected as required for mandate evaluation and execution planning.
                </p>
                <div className="mt-4 rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Declaration</p>
                  <ul className="mt-2 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
                    <li>I am competnent and voluntarily cosulataion from vidhisatya.com.</li>
                    <li>I am reponsaable for giving updated &amp; complete information to VidhiSatya.com.</li>
                    <li>I agree that information given by me shall remain with vidhisatya.com for use and record.</li>
                    <li>I/my orgainzation agree to pay all fee and expenses of vidhisatya.com &amp; there recommeded partner and assigns.</li>
                    <li>I undertake to keep vidhisatya.com indemnified from any loss that may occur from any non-adherance to their advise.</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Purpose: Use submitted information for advisory workflow and case setup.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">One-Time Consultation</Badge>
                  <Badge variant="outline">Fix Appointment</Badge>
                  <Badge variant="outline">UPI / Vidhisatya.com</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Ecosystem References</h3>
                <div className="mt-4 space-y-3">
                  <div className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Achievements / Associations</p>
                    <p className="mt-1 text-sm text-foreground/90">Awards, recognition, and appreciation letters (where applicable).</p>
                  </div>
                  <div className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Partners</p>
                    <p className="mt-1 text-sm text-foreground/90">Kriscel, Linkhr, BPragati (as referenced).</p>
                  </div>
                  <div className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Legal Partner</p>
                    <p className="mt-1 text-sm text-foreground/90">EDLO, Arunodaya Legal.</p>
                  </div>
                  <div className="rounded-[0.75rem] bg-surface p-4 ring-1 ring-outline-variant/15">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Support</p>
                    <p className="mt-1 text-sm text-foreground/90">Helping Hands / Capsi. Additional details can be updated later.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
