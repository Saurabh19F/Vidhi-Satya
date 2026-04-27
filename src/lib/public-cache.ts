import { unstable_cache } from "next/cache";

import { connectToDatabase } from "@/lib/db";
import About from "@/models/About";
import Blog from "@/models/Blog";
import ContactInfo from "@/models/ContactInfo";
import FAQ from "@/models/FAQ";
import Service from "@/models/Service";
import SiteSetting from "@/models/SiteSetting";
import { normalizeServices } from "@/lib/service-normalization";
import { sortServicesByPriority } from "@/lib/service-order";
import type { AboutItem, BlogItem, ContactInfoItem, ServiceItem, SiteSettingItem } from "@/types";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

type ServiceLinkCandidate = {
  title?: string;
  slug?: string;
};

function isServiceLinkCandidateValid(service: ServiceLinkCandidate): service is { title: string; slug: string } {
  return typeof service.title === "string" && service.title.length > 0 && typeof service.slug === "string" && service.slug.length > 0;
}

const REVALIDATE_SECONDS = 30;

const getCachedPublicLayoutData = unstable_cache(
  async () => {
    await connectToDatabase();
    const [contact, settings, navServices] = await Promise.all([
      ContactInfo.findOne().lean(),
      SiteSetting.findOne().lean(),
      Service.find({ isPublished: true }).select("title slug").lean<ServiceLinkCandidate[]>()
    ]);
    const contactInfo = contact as unknown as ContactInfoItem | null;
    const siteSettings = settings as unknown as SiteSettingItem | null;

    return serialize<{
      contact: ContactInfoItem | null;
      settings: SiteSettingItem | null;
      serviceLinks: Array<{ title: string; slug: string }>;
    }>({
      contact: contactInfo,
      settings: siteSettings,
      serviceLinks: sortServicesByPriority(normalizeServices(navServices))
        .filter(isServiceLinkCandidateValid)
        .slice(0, 3)
        .map((service) => ({ title: service.title, slug: service.slug }))
    });
  },
  ["public-layout-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-layout"] }
);

export async function getPublicLayoutData() {
  return getCachedPublicLayoutData();
}

const getCachedAboutData = unstable_cache(
  async () => {
    await connectToDatabase();
    const about = (await About.findOne().lean()) as unknown as AboutItem | null;
    return serialize<AboutItem | null>(about);
  },
  ["public-about-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-about"] }
);

export async function getPublicAboutData() {
  return getCachedAboutData();
}

const getCachedServicesData = unstable_cache(
  async () => {
    await connectToDatabase();
    const services = (await Service.find({ isPublished: true }).lean()) as unknown as ServiceItem[];
    return serialize<ServiceItem[]>(sortServicesByPriority(normalizeServices(services)));
  },
  ["public-services-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-services"] }
);

export async function getPublicServicesData() {
  return getCachedServicesData();
}

const getCachedFaqData = unstable_cache(
  async () => {
    await connectToDatabase();
    return serialize(await FAQ.find({ isPublished: true }).sort({ category: 1, order: 1 }).lean());
  },
  ["public-faq-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-faq"] }
);

export async function getPublicFaqData() {
  return getCachedFaqData();
}

const getCachedContactData = unstable_cache(
  async () => {
    await connectToDatabase();
    const contactInfo = (await ContactInfo.findOne().lean()) as unknown as ContactInfoItem | null;
    return serialize<ContactInfoItem | null>(contactInfo);
  },
  ["public-contact-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-contact"] }
);

export async function getPublicContactData() {
  return getCachedContactData();
}

const getCachedBlogsData = unstable_cache(
  async (search?: string, tag?: string) => {
    await connectToDatabase();
    const query: Record<string, unknown> = { isPublished: true };
    if (search) query.title = { $regex: search, $options: "i" };
    if (tag) query.tags = tag;
    const blogs = (await Blog.find(query).sort({ publishedAt: -1 }).lean()) as unknown as BlogItem[];
    return serialize<BlogItem[]>(blogs);
  },
  ["public-blogs-data"],
  { revalidate: REVALIDATE_SECONDS, tags: ["public-blogs"] }
);

export async function getPublicBlogsData(search?: string, tag?: string) {
  return getCachedBlogsData(search, tag);
}
