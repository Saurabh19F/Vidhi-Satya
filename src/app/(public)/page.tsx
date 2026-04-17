import { buildPageMetadata } from "@/lib/seo";
import { getPublishedHomeData } from "@/lib/server-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ProcessSection } from "@/components/home/process-section";
import { WhoWeHelp } from "@/components/home/who-we-help";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { FAQPreview } from "@/components/home/faq-preview";
import { CTASection } from "@/components/common/cta-section";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

type HomeAbout = {
  heading: string;
  subheading: string;
  description: string;
  vision: string;
  mission: string;
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

type HomeTestimonial = {
  _id: string;
  name: string;
  designation: string;
  company: string;
  message: string;
  rating: number;
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
  const testimonials = data.testimonials as HomeTestimonial[];
  const settings = data.settings as { ctaText?: string } | null;

  return (
    <>
      <HeroSection slides={heroSlides} />
      <AboutPreview about={about} />
      {about ? (
        <section className="section-padding bg-surface-low">
          <div className="container">
            <SectionTitle eyebrow="Vision & Mission" title="Principles That Shape Every Advisory Mandate" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Vision</h3>
                  <p className="mt-2 text-muted-foreground">{about.vision}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">Mission</h3>
                  <p className="mt-2 text-muted-foreground">{about.mission}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ) : null}
      <ServicesPreview services={services} />
      <WhyChooseUs />
      <ProcessSection />
      <WhoWeHelp />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview blogs={blogs} />
      <FAQPreview faqs={faqs} />
      <CTASection ctaText={settings?.ctaText || "Book Consultation"} />
    </>
  );
}
