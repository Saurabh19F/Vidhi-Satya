import { buildPageMetadata } from "@/lib/seo";
import { getPublicContactData, getPublicServicesData } from "@/lib/public-cache";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { sanitizeCompanyName } from "@/lib/brand-text";
import type { ServiceItem } from "@/types";

export async function generateMetadata() {
  return buildPageMetadata("contact");
}

export default async function ContactPage() {
  const info = await getPublicContactData();
  const services = (await getPublicServicesData()) as ServiceItem[];
  const serviceOptions = services.map((service) => service.title);
  const companyName = sanitizeCompanyName(info?.companyName);
  const fallbackAddress = "B 28, Ashoka Niketan, Near Yamuna Sports Complex, Delhi-110092, India";
  const mapSource =
    info?.googleMapLink?.trim() ||
    `https://maps.google.com/maps?q=${encodeURIComponent(info?.address?.trim() || fallbackAddress)}&z=15&output=embed`;

  return (
    <>
      <section className="section-padding">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <SectionTitle
              title="Contact Us"
              description="Reach us for consultation, association, and service enquiries across individual, corporate, and government categories."
              className="max-w-3xl"
            />
          </div>
          <Card>
              <CardContent className="p-5 sm:p-6">
                <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold sm:text-4xl">Consultation Request Form</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Work timing: 9:30 AM to 6:00 PM IST. Communications received after work hours are recorded and attended on the next business
                  day.
                </p>
                <div className="mt-6">
                  <ConsultationForm serviceOptions={serviceOptions.length ? serviceOptions : ["General Advisory"]} />
                </div>
              </CardContent>
            </Card>
          <div className="space-y-5">
            <Card>
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Contact Information</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>{companyName}</p>
                  <p>{info?.address}</p>
                  <p>{info?.phone}</p>
                  <p>{info?.email}</p>
                  <p>Secondary Email: avikanarang@vidhisatya.com</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 sm:p-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold sm:text-3xl">Location</h3>
                <iframe
                  src={mapSource}
                  title="Google Map"
                  className="mt-4 h-56 w-full rounded-[0.75rem] bg-surface-low ring-1 ring-outline-variant/15"
                  loading="lazy"
                />
              </CardContent>
            </Card>
            <p className="rounded-[0.75rem] bg-surface-low p-4 text-sm text-muted-foreground ring-1 ring-outline-variant/15">
              Trust statement: All consultations are private and confidential, subject only to lawful disclosure requirements by a court of
              law.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
