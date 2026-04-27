import { buildPageMetadata } from "@/lib/seo";
import { getPublicAboutData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { SafeImage } from "@/components/common/safe-image";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildWebPageJsonLd } from "@/lib/structured-data";
import { resolveImageUrl } from "@/lib/image-url";

export async function generateMetadata() {
  return buildPageMetadata("about", {
    pathname: "/about",
    ogImage: "/uploads/about-main.jpeg"
  });
}

export default async function AboutPage() {
  const about = await getPublicAboutData();
  const aboutImageUrl = resolveImageUrl(about?.imageUrl, "/uploads/about-main.jpeg");
  const requestedAboutDescription =
    "vidhisatya.com is established to offer helping hand to its clients being individuals, corporates and governments facing targets and challenges in their working in any manner. The consultation is subject to solicitation and bearing all fee and expenses by the individual, corporate and government entity, soliciting consultation & advise. Our Founder's experience of more than 35 years in this regard is valuable asset on offer, on fair price. Time is short or limited ever , lets make best of it.";
  const rawAboutDescription = about?.description?.toLowerCase().includes("vidhisatya.com is established to offer a helping hand")
    ? requestedAboutDescription
    : about?.description?.trim() || requestedAboutDescription;
  const aboutDescription = rawAboutDescription.replace(/vidhi\s*satya\.com/gi, "vidhisatya.com");
  const aboutPageSchema = buildWebPageJsonLd({
    pathname: "/about",
    type: "AboutPage",
    title: about?.heading || "About Vidhi Satya",
    description: aboutDescription,
    imageUrl: aboutImageUrl
  });

  return (
    <>
      <StructuredData data={aboutPageSchema} />
      <section className="section-padding">
        <div className="container grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          <div>
            <SectionTitle title={about?.heading || "About Us"} description={aboutDescription} />
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                <span className="font-semibold text-foreground">Meaning of Vidhi Satya:</span> Vidhi Satya combines two Hindi words:
                &quot;Vidhi&quot; (from Vidhivat, complied in all aspects) and &quot;Satya&quot; (from Satyapan, The truthful one).
              </p>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[280px] sm:h-[340px] md:h-[380px]">
                <SafeImage
                  src={aboutImageUrl}
                  fallbackSrc="/uploads/about-main.jpeg"
                  alt="Vidhi Satya team discussion for strategic advisory planning"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
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
                    <li>I am competent and am voluntarily seeking consultation from vidhisatya.com.</li>
                    <li>I am responsible for providing updated and complete information to vidhisatya.com.</li>
                    <li>I agree that the information provided by me shall remain with vidhisatya.com for use and record.</li>
                    <li>I/my organization agree to pay all fees and expenses of vidhisatya.com and their recommended partners and assignees.</li>
                    <li>I undertake to keep vidhisatya.com indemnified against any loss that may occur due to any non-adherence to their advice.</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Purpose: Use submitted information for advisory workflow and case setup.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">One-Time Consultation</Badge>
                  <Badge variant="outline">Fix Appointment</Badge>
                  <Badge variant="outline">UPI / vidhisatya.com</Badge>
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

      <CTASection />
    </>
  );
}
