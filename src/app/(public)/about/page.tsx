import Image from "next/image";

import { buildPageMetadata } from "@/lib/seo";
import { getPublicAboutData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata() {
  return buildPageMetadata("about");
}

export default async function AboutPage() {
  const about = await getPublicAboutData();
  const requestedAboutDescription =
    "Vidhi Satya.com is established to offer helping hand to its clients being individuals, corporates and governments facing targets and challenges in their working in any manner. The consultation is subject to solicitation and bearing all fee and expenses by the individual, corporate and government entity, soliciting consultation & advise. Our Founder's experience of more than 35 years in this regard is valuable asset on offer, on fair price. Time is short or limited ever , lets make best of it.";
  const aboutDescription = about?.description?.includes("VidhiSatya.com is established to offer a helping hand")
    ? requestedAboutDescription
    : about?.description?.trim() || requestedAboutDescription;

  return (
    <>
      <section className="section-padding">
        <div className="container grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          <div>
            <SectionTitle title={about?.heading || "About Us"} description={aboutDescription} />
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                <span className="font-semibold text-foreground">Meaning of Vidhi Satya:</span> Vidhi Satya combines two Hindi words:
                &quot;Vidhi&quot; (from Vidhivat, complied in all aspects) and &quot;Satya&quot; (truthful).
              </p>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[280px] sm:h-[340px] md:h-[380px]">
                <Image src="/uploads/about-main.jpeg" alt="About Vidhi Satya" fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="section-padding bg-surface-low">
        <div className="container">
          <Card className="mx-auto max-w-6xl">
            <CardContent className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Vision</h3>
                  <p className="mt-2 text-muted-foreground">{about?.vision}</p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Mission</h3>
                  <p className="mt-2 text-muted-foreground">{about?.mission}</p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Philosophy</h3>
                  <p className="mt-2 text-muted-foreground">{about?.philosophy}</p>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  <span className="font-semibold text-foreground">Motto:</span> Helping clients complete work in a duly compliant manner
                  while remaining truthful in all aspects.
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                  Outcome-focused delivery for individuals, corporates, and government entities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionTitle
            eyebrow="Organization"
            title="Organization Details and Contact Mode"
            description="As referenced in your notes, this section clarifies how stakeholders engage with Vidhi Satya."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Organization Details</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Vidhisatya.com is a law practice based in East Delhi, New Delhi, India. It is distinct for niche consulting and advisory
                  support through founder and mentor Shri Rajesh Narang.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Consultations are private and confidential, based on information provided by the concerned person, organization, or
                  government representative. Clients may also seek a second opinion at their discretion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Contact Mode</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Consultation requests are initiated via website enquiry forms and scheduled follow-up interactions through designated SPOC
                  channels.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contact channels include address, email, WhatsApp, Google Business details, and LinkedIn.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
