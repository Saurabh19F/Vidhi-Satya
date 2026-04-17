import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

export const heroSchema = z.object({
  title: z.string().min(3, "Title is required."),
  subtitle: z.string().optional().default(""),
  description: z.string().min(10, "Description is required."),
  buttonText: z.string().min(2, "Button text is required."),
  buttonLink: z.string().min(1, "Button link is required."),
  imageUrl: z.string().min(1, "Image is required."),
  order: z.coerce.number().min(1, "Order must be at least 1."),
  isPublished: z.boolean().default(true)
});

export const aboutSchema = z.object({
  heading: z.string().min(3),
  subheading: z.string().min(3),
  description: z.string().min(30),
  vision: z.string().min(10),
  mission: z.string().min(10),
  philosophy: z.string().min(10),
  imageUrl: z.string().min(1)
});

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(40),
  category: z.string().min(2),
  icon: z.string().optional().default("briefcase"),
  imageUrl: z.string().min(1),
  benefits: z.array(z.string().min(2)).min(1),
  process: z.array(z.string().min(2)).min(1),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().min(5),
  seoDescription: z.string().min(10)
});

export const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  featuredImage: z.string().min(1),
  author: z.string().min(2),
  tags: z.array(z.string().min(2)).default([]),
  isPublished: z.boolean().default(true),
  publishedAt: z.coerce.date().optional(),
  seoTitle: z.string().min(5),
  seoDescription: z.string().min(10)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  designation: z.string().min(2),
  company: z.string().min(2),
  message: z.string().min(20),
  rating: z.coerce.number().min(1).max(5),
  imageUrl: z.string().optional().default(""),
  isPublished: z.boolean().default(true)
});

export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
  category: z.string().min(2),
  order: z.coerce.number().min(1),
  isPublished: z.boolean().default(true)
});

export const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  subject: z.string().min(3),
  message: z.string().min(10),
  serviceInterested: z.string().optional().default("General Advisory")
});

export const contactInfoSchema = z.object({
  companyName: z.string().min(2),
  address: z.string().min(5),
  phone: z.string().min(7),
  email: z.string().email(),
  whatsapp: z.string().optional().default(""),
  googleMapLink: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  twitter: z.string().optional().default("")
});

export const seoSchema = z.object({
  page: z.string().min(2),
  metaTitle: z.string().min(3),
  metaDescription: z.string().min(10),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().optional().default(""),
  canonicalUrl: z.string().optional().default("")
});

export const siteSettingSchema = z.object({
  siteName: z.string().min(2),
  logoUrl: z.string().optional().default(""),
  faviconUrl: z.string().optional().default(""),
  primaryColor: z.string().default("#0F172A"),
  secondaryColor: z.string().default("#1D4ED8"),
  footerText: z.string().min(5),
  ctaText: z.string().min(3)
});
