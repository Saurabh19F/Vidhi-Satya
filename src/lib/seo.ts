import type { Metadata } from "next";

import { connectToDatabase } from "@/lib/db";
import SEO from "@/models/SEO";
import SiteSetting from "@/models/SiteSetting";
import type { SeoItem, SiteSettingItem } from "@/types";

const fallbackMeta = {
  title: "Vidhi Satya | Business Advisory",
  description: "Strategic advisory for individuals, corporates, and government institutions."
};

const DEFAULT_SITE_URL = "https://vidhisatya.com";

type BuildPageMetadataOptions = Partial<Metadata> & {
  pathname?: string;
  ogImage?: string;
};

function getSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function toAbsoluteUrl(value: string, siteUrl: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return siteUrl;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return new URL(normalizedPath, siteUrl).toString();
  }
}

function titleToString(title: Metadata["title"], fallback: string) {
  if (typeof title === "string") return title;
  if (!title || typeof title !== "object") return fallback;
  if ("absolute" in title && typeof title.absolute === "string") return title.absolute;
  if ("default" in title && typeof title.default === "string") return title.default;
  return fallback;
}

export async function getSeoByPage(page: string) {
  await connectToDatabase();
  return (await SEO.findOne({ page }).lean()) as unknown as SeoItem | null;
}

export async function getSiteSettings() {
  await connectToDatabase();
  return (await SiteSetting.findOne().lean()) as unknown as SiteSettingItem | null;
}

export async function buildPageMetadata(page: string, overrides?: BuildPageMetadataOptions): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getSeoByPage(page), getSiteSettings()]);
  const siteUrl = getSiteUrl();
  const defaultPathname = page === "home" ? "/" : `/${page}`;
  const title = overrides?.title || seo?.metaTitle || fallbackMeta.title;
  const description = overrides?.description || seo?.metaDescription || fallbackMeta.description;
  const ogImageSource = overrides?.ogImage || seo?.ogImage || settings?.logoUrl || "";
  const ogImage = ogImageSource ? toAbsoluteUrl(ogImageSource, siteUrl) : "";
  const canonicalSource = overrides?.pathname || seo?.canonicalUrl || defaultPathname;
  const canonical = toAbsoluteUrl(canonicalSource, siteUrl);
  const metadataTitle = titleToString(title, fallbackMeta.title);
  const siteName = settings?.siteName || "Vidhi Satya";

  const baseMetadata: Metadata = {
    title,
    description,
    keywords: overrides?.keywords || seo?.keywords || [],
    alternates: {
      canonical
    },
    openGraph: {
      title: metadataTitle,
      description,
      siteName,
      type: "website",
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : []
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: metadataTitle,
      description,
      images: ogImage ? [ogImage] : []
    }
  };

  const { alternates, openGraph, twitter } = overrides || {};
  const rest: Partial<Metadata> = { ...(overrides || {}) };
  delete (rest as BuildPageMetadataOptions).pathname;
  delete (rest as BuildPageMetadataOptions).ogImage;
  delete rest.alternates;
  delete rest.openGraph;
  delete rest.twitter;

  return {
    ...baseMetadata,
    ...rest,
    alternates: {
      ...baseMetadata.alternates,
      ...alternates,
      canonical: alternates?.canonical ?? baseMetadata.alternates?.canonical
    },
    openGraph: {
      ...baseMetadata.openGraph,
      ...openGraph,
      images: openGraph?.images ?? baseMetadata.openGraph?.images
    },
    twitter: {
      ...baseMetadata.twitter,
      ...twitter,
      images: twitter?.images ?? baseMetadata.twitter?.images
    }
  };
}
