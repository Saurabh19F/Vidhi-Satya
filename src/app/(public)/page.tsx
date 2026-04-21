import { buildPageMetadata } from "@/lib/seo";
import { getPublishedHomeData } from "@/lib/server-data";
import { StructuredData } from "@/components/common/structured-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ProcessSection } from "@/components/home/process-section";
import { WhoWeHelp } from "@/components/home/who-we-help";
import { BlogPreview } from "@/components/home/blog-preview";
import { FAQPreview } from "@/components/home/faq-preview";
import { CTASection } from "@/components/common/cta-section";
import { buildFaqPageJsonLd, buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";
import type { SiteSettingItem } from "@/types";

type HomeAbout = {
  heading: string;
  description: string;
  imageUrl: string;
};

type HomeHero = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
};

type HomeService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
};

type HomeBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  publishedAt: string | Date;
};

type HomeFaq = {
  _id: string;
  question: string;
  answer: string;
};

export async function generateMetadata() {
  return buildPageMetadata("home", {
    pathname: "/",
    ogImage: "/uploads/hero-1.jpeg"
  });
}

export default async function HomePage() {
  const data = await getPublishedHomeData();
  const about = data.about as HomeAbout | null;
  const heroFallbackImages = ["/uploads/hero-1.jpeg", "/uploads/hero-2.jpeg", "/uploads/hero-3.jpeg"];
  const heroSlides = (data.heroSlides as HomeHero[]).map((slide, idx) => ({
    ...slide,
    imageUrl: heroFallbackImages[idx] ?? slide.imageUrl
  }));
  const services = data.services as HomeService[];
  const blogs = data.blogs as HomeBlog[];
  const faqs = data.faqs as HomeFaq[];
  const settings = data.settings as SiteSettingItem | null;
  const homePageSchema = buildWebPageJsonLd({
    pathname: "/",
    type: "WebPage",
    title: settings?.siteName || "Vidhi Satya",
    description:
      "Vidhi Satya is a strategic advisory partner for individuals, corporates, and government institutions.",
    imageUrl: heroSlides[0]?.imageUrl || "/uploads/hero-1.jpeg"
  });
  const serviceItemListSchema = buildItemListJsonLd({
    pathname: "/",
    name: "Advisory Service Categories",
    itemPaths: services.slice(0, 8).map((service) => `/services/${service.slug}`)
  });
  const blogItemListSchema = buildItemListJsonLd({
    pathname: "/",
    name: "Latest Advisory Insights",
    itemPaths: blogs.slice(0, 8).map((blog) => `/blog/${blog.slug}`)
  });
  const homeFaqSchema = buildFaqPageJsonLd({
    pathname: "/",
    title: "Frequently Asked Advisory Questions",
    description: "Common questions and answers about Vidhi Satya advisory engagements.",
    faqs: faqs.slice(0, 6).map((faq) => ({ question: faq.question, answer: faq.answer }))
  });

  return (
    <>
      <StructuredData
        data={[
          homePageSchema,
          serviceItemListSchema,
          blogItemListSchema,
          homeFaqSchema
        ]}
      />
      <HeroSection slides={heroSlides} />
      <AboutPreview about={about} />
      <ServicesPreview services={services} />
      <WhyChooseUs />
      <ProcessSection />
      <WhoWeHelp />
      <BlogPreview blogs={blogs} />
      <FAQPreview faqs={faqs} />
      <CTASection ctaText={settings?.ctaText || "Book Consultation"} />
    </>
  );
}
