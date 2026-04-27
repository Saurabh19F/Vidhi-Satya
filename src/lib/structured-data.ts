import type { BlogItem, ContactInfoItem, ServiceItem, SiteSettingItem } from "@/types";

type JsonLdObject = Record<string, unknown>;

type WebPageJsonLdOptions = {
  pathname: string;
  title: string;
  description: string;
  imageUrl?: string;
  type?: string;
};

type ItemListJsonLdOptions = {
  pathname: string;
  name: string;
  itemPaths: string[];
};

type BlogPostingJsonLdOptions = {
  blog: BlogItem;
  pathname: string;
  imageUrl: string;
  siteSettings: SiteSettingItem | null;
};

type ServiceJsonLdOptions = {
  service: ServiceItem;
  pathname: string;
  imageUrl: string;
};

type FaqEntry = {
  question: string;
  answer: string;
};

type FaqPageJsonLdOptions = {
  pathname: string;
  title: string;
  description: string;
  faqs: FaqEntry[];
};

const DEFAULT_SITE_URL = "https://vidhisatya.com";

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  try {
    return new URL(configured).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function absoluteUrl(pathOrUrl: string) {
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return siteUrl();

  try {
    return new URL(trimmed).toString();
  } catch {
    const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return new URL(normalizedPath, siteUrl()).toString();
  }
}

function normalizedDate(value: string | Date | undefined) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function siteName(settings: SiteSettingItem | null) {
  return settings?.siteName || "Vidhi Satya";
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export function buildOrganizationJsonLd(settings: SiteSettingItem | null, contact: ContactInfoItem | null): JsonLdObject {
  const name = contact?.companyName?.trim() || siteName(settings);
  const phone = contact?.phone?.trim() || contact?.whatsapp?.trim() || "";
  const email = contact?.email?.trim() || "";
  const socialUrls = [contact?.linkedin?.trim(), contact?.twitter?.trim()].filter(
    (value): value is string => Boolean(value)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}#organization`,
    name,
    url: absoluteUrl("/"),
    logo: settings?.logoUrl ? absoluteUrl(settings.logoUrl) : absoluteUrl("/brand/vidhi-satya-logo.png"),
    description: settings?.footerText || "Strategic advisory for individuals, corporates, and government institutions.",
    email: email || undefined,
    telephone: phone || undefined,
    sameAs: socialUrls.length ? socialUrls.map((url) => absoluteUrl(url)) : undefined,
    founder: {
      "@type": "Person",
      name: "Rajesh Narang"
    },
    address: contact?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: contact.address,
          addressCountry: "IN"
        }
      : undefined,
    contactPoint: phone || email
      ? [
          {
            "@type": "ContactPoint",
            telephone: phone || undefined,
            email: email || undefined,
            contactType: "customer support",
            availableLanguage: ["en", "hi"]
          }
        ]
      : undefined
  };
}

export function buildWebsiteJsonLd(settings: SiteSettingItem | null): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}#website`,
    name: siteName(settings),
    url: absoluteUrl("/"),
    publisher: {
      "@id": `${siteUrl()}#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/blog")}?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildWebPageJsonLd(options: WebPageJsonLdOptions): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": options.type || "WebPage",
    "@id": `${absoluteUrl(options.pathname)}#webpage`,
    url: absoluteUrl(options.pathname),
    name: options.title,
    description: options.description,
    image: options.imageUrl ? [absoluteUrl(options.imageUrl)] : undefined,
    isPartOf: {
      "@id": `${siteUrl()}#website`
    },
    about: {
      "@id": `${siteUrl()}#organization`
    }
  };
}

export function buildItemListJsonLd(options: ItemListJsonLdOptions): JsonLdObject | null {
  const itemPaths = options.itemPaths.filter((item) => item.trim().length > 0);
  if (!itemPaths.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(options.pathname)}#itemlist`,
    name: options.name,
    itemListElement: itemPaths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(path)
    }))
  };
}

export function buildBlogPostingJsonLd(options: BlogPostingJsonLdOptions): JsonLdObject {
  const publishedAt = normalizedDate(options.blog.publishedAt);
  const updatedAt = normalizedDate(options.blog.updatedAt) || publishedAt;
  const authorName = options.blog.author?.trim() || "Vidhi Satya Editorial Team";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(options.pathname)}#blogposting`,
    mainEntityOfPage: absoluteUrl(options.pathname),
    headline: options.blog.title,
    description: options.blog.seoDescription || options.blog.excerpt,
    image: [absoluteUrl(options.imageUrl)],
    datePublished: publishedAt,
    dateModified: updatedAt,
    articleSection: options.blog.tags,
    keywords: options.blog.tags.join(", "),
    author: {
      "@type": "Person",
      name: authorName
    },
    publisher: {
      "@id": `${siteUrl()}#organization`,
      name: siteName(options.siteSettings),
      logo: {
        "@type": "ImageObject",
        url: options.siteSettings?.logoUrl ? absoluteUrl(options.siteSettings.logoUrl) : absoluteUrl("/brand/vidhi-satya-logo.png")
      }
    }
  };
}

export function buildServiceJsonLd(options: ServiceJsonLdOptions): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(options.pathname)}#service`,
    serviceType: options.service.category,
    name: options.service.title,
    description: options.service.seoDescription || options.service.shortDescription,
    url: absoluteUrl(options.pathname),
    image: [absoluteUrl(options.imageUrl)],
    provider: {
      "@id": `${siteUrl()}#organization`
    },
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    termsOfService: absoluteUrl("/contact")
  };
}

export function buildFaqPageJsonLd(options: FaqPageJsonLdOptions): JsonLdObject | null {
  const cleanFaqs = options.faqs.filter((faq) => faq.question.trim().length > 0 && faq.answer.trim().length > 0);
  if (!cleanFaqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(options.pathname)}#faq`,
    name: options.title,
    description: options.description,
    mainEntity: cleanFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
