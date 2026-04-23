import Link from "next/link";

import { VisitorCounter } from "@/components/common/visitor-counter";
import { sanitizeCompanyName } from "@/lib/brand-text";

type FooterProps = {
  companyName?: string;
  footerText?: string;
  address?: string;
  phone?: string;
};

const LINKEDIN_URL = "https://www.linkedin.com/company/east-delhi-law-office/";
const FACEBOOK_URL = "https://www.facebook.com/rnarang.del";


export function Footer({
  companyName = "Vidhi Satya Advisory LLP",
  footerText = "Trusted advisory with practical execution.",
  address,
  phone
}: FooterProps) {
  const displayCompanyName = sanitizeCompanyName(companyName);

  return (
    <footer className="mt-16 bg-[#253D2C] text-[#CFFFDC]">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="max-w-[16ch] font-[family-name:var(--font-newsreader)] text-3xl font-semibold italic leading-tight text-[#CFFFDC]">
            {displayCompanyName}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#CFFFDC]/86">{footerText}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#68BA7F]">Platform for Wisdom and Jurist Prudence</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#CFFFDC]/84">
            <span className="rounded-full bg-[#2E6F40] px-3 py-1">Strategy</span>
            <span className="rounded-full bg-[#2E6F40] px-3 py-1">Compliance</span>
            <span className="rounded-full bg-[#2E6F40] px-3 py-1">Execution</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68BA7F]">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#CFFFDC]/88">
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/blog" className="hover:text-white">
              Insights
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
          <div className="mt-5">
            <VisitorCounter />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68BA7F]">Contact Desk</p>
          <div className="mt-4 space-y-2 text-sm text-[#CFFFDC]/88">
            <p>rajeshnarang@vidhisatya.com, avikanarang@vidhisatya.com</p>
            <p>{phone || "+1 (800) SATYA-01"}</p>
            <p className="max-w-xs">{address || "Global advisory operations across strategic jurisdictions."}</p>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-[#CFFFDC]/88 hover:text-white">
              LinkedIn
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="text-[#CFFFDC]/88 hover:text-white">
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68BA7F]">Engage</p>
          <p className="mt-4 text-sm text-[#CFFFDC]/88">
            Book a consultation and receive a focused mandate tailored to your case context.
          </p>
          <Link
            href="/book-consultation"
            className="india-tricolor-button mt-5 inline-flex rounded-[0.75rem] px-4 py-2 text-sm font-semibold transition"
          >
            Start Consultation
          </Link>
          <p className="mt-3 text-xs text-[#CFFFDC]/70">Average response window: 1 business day / 24 business hours</p>
        </div>
      </div>

      <div className="container flex flex-col gap-3 py-5 text-xs text-[#CFFFDC]/72 md:flex-row md:items-center md:justify-between">
        <p>
          &copy;2026 - vidhisatya.com proprietory of East Delhi Law Office ( a law firm). All Rights Reserved. Design &amp; Developed By{" "}
          <a
            href="https://kriscel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#CFFFDC] hover:text-white"
          >
            Kriscel Tech Private Limited
          </a>
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/services" className="hover:text-white">
            Mandates
          </Link>
          <Link href="/blog" className="hover:text-white">
            Publications
          </Link>
          <Link href="/contact" className="hover:text-white">
            Policy Enquiries
          </Link>
        </div>
      </div>
    </footer>
  );
}
