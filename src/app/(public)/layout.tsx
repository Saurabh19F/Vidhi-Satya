import type { ReactNode } from "react";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { PageMotionWrapper } from "@/components/common/page-motion-wrapper";
import { StickyCta } from "@/components/common/sticky-cta";
import { WhatsappFloat } from "@/components/common/whatsapp-float";
import { WebsiteIntroGate } from "@/components/common/website-intro-gate";
import { getPublicLayoutData } from "@/lib/public-cache";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const { contact, settings, serviceLinks } = await getPublicLayoutData();

  return (
    <WebsiteIntroGate>
      <div className="flex min-h-screen flex-col pb-24 md:pb-0">
        <Navbar siteName={settings?.siteName || "Vidhi Satya"} serviceLinks={serviceLinks} />
        <main className="flex-1">
          <PageMotionWrapper>{children}</PageMotionWrapper>
        </main>
        <Footer
          companyName={contact?.companyName || settings?.siteName || "Vidhi Satya"}
          footerText={settings?.footerText}
          address={contact?.address}
          phone={contact?.phone}
          email={contact?.email}
          linkedin={contact?.linkedin}
          instagram={contact?.instagram}
          facebook={contact?.facebook}
        />
        <StickyCta text={settings?.ctaText || "Book Consultation"} />
        <WhatsappFloat phone={contact?.whatsapp || contact?.phone} />
      </div>
    </WebsiteIntroGate>
  );
}
