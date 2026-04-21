import Image from "next/image";

import { buildPageMetadata } from "@/lib/seo";
import { getPublicAboutData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { buildWebPageJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  return buildPageMetadata("about", {
    pathname: "/about",
    ogImage: "/uploads/about-main.jpeg"
  });
}

export default async function AboutPage() {
  const about = await getPublicAboutData();
  const requestedAboutDescription =
    "Vidhi Satya.com is established to offer helping hand to its clients being individuals, corporates and governments facing targets and challenges in their working in any manner. The consultation is subject to solicitation and bearing all fee and expenses by the individual, corporate and government entity, soliciting consultation & advise. Our Founder's experience of more than 35 years in this regard is valuable asset on offer, on fair price. Time is short or limited ever , lets make best of it.";
  const aboutDescription = about?.description?.includes("VidhiSatya.com is established to offer a helping hand")
    ? requestedAboutDescription
    : about?.description?.trim() || requestedAboutDescription;
  const aboutPageSchema = buildWebPageJsonLd({
    pathname: "/about",
    type: "AboutPage",
    title: about?.heading || "About Vidhi Satya",
    description: aboutDescription,
    imageUrl: about?.imageUrl || "/uploads/about-main.jpeg"
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
                &quot;Vidhi&quot; (from Vidhivat, complied in all aspects) and &quot;Satya&quot; (truthful).
              </p>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[280px] sm:h-[340px] md:h-[380px]">
                <Image
                  src={about?.imageUrl || "/uploads/about-main.jpeg"}
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

      <section className="pb-12 md:pb-16">
        <div className="container">
          <div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Vision, Mission, Philosophy.
            </h2>
            <p>Helping clients complete work in a duly compliant manner while remaining truthful in all aspects.</p>
          </div>
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
