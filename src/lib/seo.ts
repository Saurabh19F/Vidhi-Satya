import type { Metadata } from "next";

import { connectToDatabase } from "@/lib/db";
import SEO from "@/models/SEO";
import SiteSetting from "@/models/SiteSetting";
import type { SeoItem, SiteSettingItem } from "@/types";

const fallbackMeta = {
  title: "Vidhi Satya | Business Advisory",
  description: "Strategic advisory for individuals, corporates, and government institutions."
};

export async function getSeoByPage(page: string) {
  await connectToDatabase();
  return (await SEO.findOne({ page }).lean()) as unknown as SeoItem | null;
}

export async function getSiteSettings() {
  await connectToDatabase();
  return (await SiteSetting.findOne().lean()) as unknown as SiteSettingItem | null;
}

export async function buildPageMetadata(page: string, overrides?: Partial<Metadata>): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getSeoByPage(page), getSiteSettings()]);
  const title = seo?.metaTitle || fallbackMeta.title;
  const description = seo?.metaDescription || fallbackMeta.description;
  const ogImage = seo?.ogImage || settings?.logoUrl || "";
  const siteName = settings?.siteName || "Vidhi Satya";
  const canonical = seo?.canonicalUrl || `https://vidhisatya.com${page === "home" ? "" : `/${page}`}`;

  return {
    title,
    description,
    keywords: seo?.keywords || [],
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      siteName,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : []
    },
    ...overrides
  };
}
