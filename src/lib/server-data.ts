import { unstable_cache } from "next/cache";

import { connectToDatabase } from "@/lib/db";
import About from "@/models/About";
import Blog from "@/models/Blog";
import ContactInfo from "@/models/ContactInfo";
import FAQ from "@/models/FAQ";
import Hero from "@/models/Hero";
import Service from "@/models/Service";
import SiteSetting from "@/models/SiteSetting";
import Testimonial from "@/models/Testimonial";
import type { AboutItem } from "@/types";

const getCachedPublishedHomeData = unstable_cache(
  async () => {
    await connectToDatabase();
    const [heroSlides, about, services, blogs, faqs, testimonials, contactInfo, settings] = await Promise.all([
      Hero.find({ isPublished: true }).sort({ order: 1 }).lean(),
      About.findOne().lean(),
      Service.find({ isPublished: true }).sort({ createdAt: -1 }).limit(6).lean(),
      Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).limit(6).lean(),
      FAQ.find({ isPublished: true }).sort({ order: 1 }).limit(5).lean(),
      Testimonial.find({ isPublished: true }).sort({ createdAt: -1 }).limit(8).lean(),
      ContactInfo.findOne().lean(),
      SiteSetting.findOne().lean()
    ]);

    return JSON.parse(
      JSON.stringify({ heroSlides, about, services, blogs, faqs, testimonials, contactInfo, settings })
    ) as {
      heroSlides: unknown[];
      about: AboutItem | null;
      services: unknown[];
      blogs: unknown[];
      faqs: unknown[];
      testimonials: unknown[];
      contactInfo: unknown | null;
      settings: unknown | null;
    };
  },
  ["published-home-data"],
  { revalidate: 30, tags: ["public-home"] }
);

export async function getPublishedHomeData() {
  return getCachedPublishedHomeData();
}
