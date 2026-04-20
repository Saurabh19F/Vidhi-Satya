import { buildPageMetadata } from "@/lib/seo";
import { getPublishedHomeData } from "@/lib/server-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ProcessSection } from "@/components/home/process-section";
import { WhoWeHelp } from "@/components/home/who-we-help";
import { BlogPreview } from "@/components/home/blog-preview";
import { FAQPreview } from "@/components/home/faq-preview";
import { CTASection } from "@/components/common/cta-section";

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
  return buildPageMetadata("home");
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
  const settings = data.settings as { ctaText?: string } | null;

  return (
    <>
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
