import type { MetadataRoute } from "next";

import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import Service from "@/models/Service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidhisatya.com";
  await connectToDatabase();
  const [services, blogs] = await Promise.all([
    Service.find({ isPublished: true }).select("slug updatedAt").lean(),
    Blog.find({ isPublished: true }).select("slug updatedAt").lean()
  ]);

  const staticPages = ["", "/about", "/services", "/blog", "/faq", "/contact", "/book-consultation"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt || new Date()
  }));

  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || new Date()
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
