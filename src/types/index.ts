export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type HeroSlide = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
};

export type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  icon: string;
  imageUrl: string;
  benefits: string[];
  process: string[];
  isFeatured: boolean;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | Date;
  seoTitle: string;
  seoDescription: string;
};

export type AboutItem = {
  _id?: string;
  heading: string;
  subheading: string;
  description: string;
  vision: string;
  mission: string;
  philosophy: string;
  imageUrl: string;
};

export type ContactInfoItem = {
  _id?: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  googleMapLink: string;
  linkedin: string;
  twitter: string;
};

export type SiteSettingItem = {
  _id?: string;
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  ctaText: string;
};

export type SeoItem = {
  _id?: string;
  page: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
};
