import type { MetadataRoute } from "next";

import { connectToDatabase } from "@/lib/db";
import { resolveBlogImage } from "@/lib/blog-image";
import { resolveServiceImage } from "@/lib/service-image";
import About from "@/models/About";
import Blog from "@/models/Blog";
import Hero from "@/models/Hero";
import Service from "@/models/Service";
import SiteSetting from "@/models/SiteSetting";
import type { BlogItem, ServiceItem, SiteSettingItem } from "@/types";

type MinimalAbout = {
  imageUrl?: string;
  updatedAt?: Date;
};

type MinimalHero = {
  imageUrl?: string;
  updatedAt?: Date;
};

const HERO_FALLBACK_IMAGES = ["/uploads/hero-1.jpeg", "/uploads/hero-2.jpeg", "/uploads/hero-3.jpeg"];
const DEFAULT_SITE_URL = "https://vidhisatya.com";

function getSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function toAbsoluteUrl(siteUrl: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    return new URL(trimmed).toString();
  } catch {
    const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return new URL(normalizedPath, siteUrl).toString();
  }
}

function uniqueAbsoluteUrls(siteUrl: string, values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)).map((value) => toAbsoluteUrl(siteUrl, value)))];
}

function latestDate(dates: Array<Date | undefined>) {
  const validDates = dates.filter((date): date is Date => date instanceof Date && !Number.isNaN(date.getTime()));
  if (!validDates.length) return new Date();
  return new Date(Math.max(...validDates.map((date) => date.getTime())));
}

function toDate(value: string | Date | undefined) {
  if (!value) return undefined;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  await connectToDatabase();
  const [services, blogs, about, heroSlides, settings] = await Promise.all([
    Service.find({ isPublished: true }).select("slug updatedAt imageUrl category title").lean(),
    Blog.find({ isPublished: true }).select("slug updatedAt title featuredImage").lean(),
    About.findOne().select("imageUrl updatedAt").lean(),
    Hero.find({ isPublished: true }).select("imageUrl updatedAt").sort({ order: 1 }).lean(),
    SiteSetting.findOne().select("logoUrl updatedAt").lean()
  ]);

  const publishedServices = services as unknown as ServiceItem[];
  const publishedBlogs = blogs as unknown as BlogItem[];
  const aboutData = about as unknown as MinimalAbout | null;
  const publishedHeroSlides = heroSlides as unknown as MinimalHero[];
  const siteSettings = settings as unknown as SiteSettingItem | null;

  const homeImages = uniqueAbsoluteUrls(siteUrl, [
    ...HERO_FALLBACK_IMAGES,
    ...publishedHeroSlides.map((slide) => slide.imageUrl || ""),
    siteSettings?.logoUrl
  ]);
  const aboutImages = uniqueAbsoluteUrls(siteUrl, [aboutData?.imageUrl || "/uploads/about-main.jpeg"]);
  const servicesImages = uniqueAbsoluteUrls(
    siteUrl,
    publishedServices.map((service) => resolveServiceImage(service.imageUrl, service.category, service.title))
  );
  const blogsImages = uniqueAbsoluteUrls(siteUrl, publishedBlogs.slice(0, 24).map((blog) => resolveBlogImage(blog)));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: latestDate([
        ...publishedHeroSlides.map((slide) => slide.updatedAt),
        toDate(siteSettings?.updatedAt)
      ]),
      images: homeImages
    },
    {
      url: `${siteUrl}/about`,
      lastModified: aboutData?.updatedAt || new Date(),
      images: aboutImages
    },
    {
      url: `${siteUrl}/services`,
      lastModified: latestDate(publishedServices.map((service) => toDate(service.updatedAt))),
      images: servicesImages
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latestDate(publishedBlogs.map((blog) => toDate(blog.updatedAt))),
      images: blogsImages
    },
    { url: `${siteUrl}/faq`, lastModified: new Date() },
    {
      url: `${siteUrl}/contact`,
      lastModified: toDate(siteSettings?.updatedAt) || new Date(),
      images: uniqueAbsoluteUrls(siteUrl, [siteSettings?.logoUrl])
    },
    {
      url: `${siteUrl}/book-consultation`,
      lastModified: toDate(siteSettings?.updatedAt) || new Date(),
      images: uniqueAbsoluteUrls(siteUrl, [siteSettings?.logoUrl])
    }
  ];

  const servicePages: MetadataRoute.Sitemap = publishedServices
    .filter((service) => service.slug)
    .map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: toDate(service.updatedAt) || new Date(),
      images: uniqueAbsoluteUrls(siteUrl, [resolveServiceImage(service.imageUrl, service.category, service.title)])
    }));

  const blogPages: MetadataRoute.Sitemap = publishedBlogs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: toDate(blog.updatedAt) || new Date(),
      images: uniqueAbsoluteUrls(siteUrl, [resolveBlogImage(blog)])
    }));

  return [...staticPages, ...servicePages, ...blogPages];
}
