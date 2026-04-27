import "dotenv/config";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "../src/lib/db";
import AdminUser from "../src/models/AdminUser";
import Hero from "../src/models/Hero";
import About from "../src/models/About";
import Service from "../src/models/Service";
import Blog from "../src/models/Blog";
import FAQ from "../src/models/FAQ";
import ContactInfo from "../src/models/ContactInfo";
import SiteSetting from "../src/models/SiteSetting";
import SEO from "../src/models/SEO";

async function seed() {
  await connectToDatabase();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@vidhisatya.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  const adminExists = await AdminUser.findOne({ email: adminEmail });
  if (!adminExists) {
    await AdminUser.create({
      name: "Vidhi Satya Admin",
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 10),
      role: "admin",
      isActive: true
    });
  }

  await Hero.deleteMany({});
  await Hero.insertMany([
    {
      title: "Vidhi Satya Welcomes You",
      subtitle: "Individuals • Corporates • Government",
      description:
        "Purpose-driven strategic consultation for individuals, corporates, and government entities facing critical targets and challenges.",
      buttonText: "Book Consultation",
      buttonLink: "/book-consultation",
      imageUrl: "https://placehold.co/1200x800/0F172A/F8FAFC?text=Strategic+Advisory",
      order: 1,
      isPublished: true
    },
    {
      title: "One-Time Consultation & Ongoing Advisory",
      subtitle: "Fix Appointment • UPI / vidhisatya.com",
      description:
        "Engage for one-time consultation or continuous support through structured appointment-based advisory engagement.",
      buttonText: "Explore Services",
      buttonLink: "/services",
      imageUrl: "https://placehold.co/1200x800/1D4ED8/F8FAFC?text=Corporate+Advisory",
      order: 2,
      isPublished: true
    }
  ]);

  await About.deleteMany({});
  await About.create({
    heading: "Purpose-Driven Advisory.",
    subheading:
      "Outcome-focused delivery for individuals, corporates, and government entities.",
    description:
      "vidhisatya.com is established to offer helping hand to its clients being individuals, corporates and governments facing targets and challenges in their working in any manner. The consultation is subject to solicitation and bearing all fee and expenses by the individual, corporate and government entity, soliciting consultation & advise. Our Founder's experience of more than 35 years in this regard is valuable asset on offer, on fair price. Time is short or limited ever , lets make best of it.",
    vision: "To help clients execute work in a duly compliant manner while remaining truthful in every aspect.",
    mission:
      "To deliver practical consultation and advisory support for individuals, corporates, and governments with clear action pathways.",
    philosophy:
      "Vidhi Satya combines two Hindi words: 'Vidhi' (Vidhivat, complied in all aspects) and 'Satya' (truthful).",
    imageUrl: "https://placehold.co/1000x800/0F172A/F8FAFC?text=About+Vidhi+Satya"
  });

  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: "Individual Strategic Advisory",
      slug: "individual-strategic-guidance",
      shortDescription: "Personalized advisory for key life, career, compliance, and financial decisions.",
      fullDescription:
        "Our individual advisory service is designed for professionals, founders, and high-responsibility individuals who need trustworthy strategic direction. We assess your context, identify constraints, and map actionable choices to help you move with confidence.",
      category: "Individual Guidance",
      icon: "user-round",
      imageUrl: "https://placehold.co/900x600/1D4ED8/F8FAFC?text=Individual+Guidance",

      isFeatured: true,
      isPublished: true,
      seoTitle: "Individual Strategic Advisory | Vidhi Satya",
      seoDescription: "Confidential advisory for personal and professional decision-making."
    },
    {
      title: "Corporate Governance Advisory",
      slug: "corporate-governance-advisory",
      shortDescription: "Governance, compliance, and strategic advisory for leadership and board teams.",
      fullDescription:
        "We work with executive and governance stakeholders to align strategic ambitions with risk-aware delivery. Our approach helps organizations strengthen governance systems, operational discipline, and leadership decision frameworks.",
      category: "Corporate Advisory",
      icon: "building-2",
      imageUrl: "https://placehold.co/900x600/0F172A/F8FAFC?text=Corporate+Advisory",
      isFeatured: true,
      isPublished: true,
      seoTitle: "Corporate Governance Advisory | Vidhi Satya",
      seoDescription: "Premium corporate advisory for governance, risk, and strategic execution."
    },
    {
      title: "Government Project Advisory",
      slug: "government-policy-advisory",
      shortDescription: "Policy-sensitive advisory support for public institutions and programs.",
      fullDescription:
        "Our government advisory services support ministries, departments, and public institutions in planning and implementing strategic initiatives. We focus on policy alignment, institutional coordination, and measurable governance outcomes.",
      category: "Government Advisory",
      icon: "landmark",
      imageUrl: "https://placehold.co/900x600/14B8A6/0F172A?text=Government+Advisory",
      isFeatured: false,
      isPublished: true,
      seoTitle: "Government Project Advisory | Vidhi Satya",
      seoDescription: "Strategic advisory for institutions and public-sector programs."
    }
  ]);

  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: "Five Governance Signals Leadership Teams Should Not Ignore",
      slug: "five-governance-signals-leadership-teams-should-not-ignore",
      excerpt:
        "A practical lens for leadership teams to detect governance drift before it evolves into strategic and reputational risk.",
      content:
        "Governance risks are rarely sudden. They appear as weak early signals: unclear decision rights, inconsistent policy enforcement, and delayed escalation culture. In this article, we outline five practical indicators and what leadership teams can do immediately to regain clarity and accountability.\n\n1. Ambiguous ownership in strategic programs\n2. Policy drift across departments\n3. Board reporting without decision intelligence\n4. Compliance treated as a checklist activity\n5. Post-incident actions without systemic correction\n\nA strong governance posture is not about bureaucracy. It is about high-quality decision systems that protect execution momentum.",
      featuredImage: "https://placehold.co/1200x700/0F172A/F8FAFC?text=Governance+Signals",
      author: "Aarav Mehta",
      tags: ["Governance", "Leadership", "Risk"],
      isPublished: true,
      publishedAt: new Date("2026-03-21"),
      seoTitle: "Governance Signals Leadership Teams Should Track",
      seoDescription: "Early governance indicators and practical interventions for leadership teams."
    },
    {
      title: "Designing Public Programs with Implementation Confidence",
      slug: "designing-public-programs-with-implementation-confidence",
      excerpt:
        "How institutions can improve policy execution by aligning stakeholders, timelines, and accountability design from day one.",
      content:
        "Public program success depends less on policy intent and more on implementation architecture. Institutional clarity, stakeholder sequencing, measurable milestones, and adaptive review cycles are central to delivery confidence.\n\nThis article explains a practical four-layer planning framework:\n1. Context and constraints\n2. Multi-agency execution mapping\n3. Monitoring and feedback loops\n4. Outcome validation and correction\n\nInstitutions that design implementation into policy planning create stronger public trust and better long-term outcomes.",
      featuredImage: "https://placehold.co/1200x700/1D4ED8/F8FAFC?text=Public+Programs",
      author: "Ishita Rao",
      tags: ["Government", "Policy", "Execution"],
      isPublished: true,
      publishedAt: new Date("2026-04-04"),
      seoTitle: "Designing Public Programs for Better Execution",
      seoDescription: "A strategic framework for implementation-ready public program design."
    }
  ]);

  await FAQ.deleteMany({});
  await FAQ.insertMany([
    {
      question: "Who can work with vidhisatya.com?",
      answer:
        "Any individual, corporate, or government entity through a competent representative may approach us for one-time or continuous consultation for genuine purposes. Eligible entities can also associate as partners or assignees on revenue-sharing or fee-paid terms.",
      category: "General",
      order: 1,
      isPublished: true
    },
    {
      question: "Do you provide one-time consultations?",
      answer: "Yes.",
      category: "Services",
      order: 2,
      isPublished: true
    },
    {
      question: "Trust?",
      answer:
        "All consultation and advise are privy and confidential and rendered in accord with information provided by the concerned person/ organization/ govt. representative, however without prejudice to any information or working sought by any Court of Law. Further vidhisatya.com is not averse to Second Opinion that may be availed or followed at discretion by person soliciting consultation or advise, in their wisdom",
      category: "Trust",
      order: 3,
      isPublished: true
    },
    {
      question: "How is confidentiality handled?",
      answer:
        "All consultation and advisory work remains private and confidential in line with information provided by the concerned person, organization, or government representative. Disclosure is allowed only where required by a court of law.",
      category: "Trust",
      order: 4,
      isPublished: true
    },
    {
      question: "Can clients seek a second opinion?",
      answer: "Yes.",
      category: "Trust",
      order: 5,
      isPublished: true
    },
    {
      question: "What are the payment and communication terms?",
      answer:
        "Payments are taken in advance to vidhisatya.com/ Rajesh Narang's accounts only, with no credit. Communication and change decisions are expected through designated SPOC channels and formal email workflow.",
      category: "Services",
      order: 6,
      isPublished: true
    },
  ]);

  await ContactInfo.deleteMany({});
  await ContactInfo.create({
    companyName: "vidhisatya.com",
    address: "B 28, Ashoka Niketan, Near Yamuna Sports Complex, Delhi-110092, India",
    phone: "+91 98911 47979",
    email: "rajeshnarang@vidhisatya.com" ,
    email2: "avikanarang@vidhisatya.com",
    whatsapp: "919891147979",
    googleMapLink:
      "https://maps.google.com/maps?q=B%2028%2C%20Ashoka%20Niketan%2C%20Near%20Yamuna%20Sports%20Complex%2C%20Delhi-110092%2C%20India&z=15&output=embed",
    linkedin: "https://www.linkedin.com/company/east-delhi-law-office/",
    Facebook: "https://www.facebook.com/rnarang.del",
  });

  await SiteSetting.deleteMany({});
  await SiteSetting.create({
    siteName: "Vidhi Satya",
    logoUrl: "https://placehold.co/260x80/0F172A/F8FAFC?text=Vidhi+Satya",
    faviconUrl: "https://placehold.co/64x64/1D4ED8/F8FAFC?text=VS",
    primaryColor: "#0F172A",
    secondaryColor: "#1D4ED8",
    footerText: "Trusted legal and strategic advisory with practical execution.",
    ctaText: "Book Consultation or Associate with Us"
  });

  await SEO.deleteMany({});
  await SEO.insertMany([
    {
      page: "home",
      metaTitle: "Vidhi Satya | Premium Business Advisory",
      metaDescription: "Strategic advisory for individuals, corporates, and government institutions.",
      keywords: ["business advisory", "governance", "strategy"],
      ogImage: "https://placehold.co/1200x630/0F172A/F8FAFC?text=Vidhi+Satya",
      canonicalUrl: "https://vidhisatya.com"
    },
    {
      page: "about",
      metaTitle: "About Vidhi Satya",
      metaDescription: "Learn about Vidhi Satya’s vision, mission, and advisory philosophy.",
      keywords: ["about vidhi satya", "advisory firm"],
      canonicalUrl: "https://vidhisatya.com/about"
    },
    {
      page: "services",
      metaTitle: "Services | Vidhi Satya",
      metaDescription: "Explore advisory services for individuals, corporates, and government bodies.",
      keywords: ["advisory services", "corporate advisory"],
      canonicalUrl: "https://vidhisatya.com/services"
    },
    {
      page: "blog",
      metaTitle: "Insights | Vidhi Satya",
      metaDescription: "Articles and insights on governance, strategy, and execution.",
      keywords: ["business insights", "policy advisory"],
      canonicalUrl: "https://vidhisatya.com/blog"
    },
    {
      page: "faq",
      metaTitle: "FAQ | Vidhi Satya",
      metaDescription: "Frequently asked questions about working with Vidhi Satya.",
      keywords: ["faq", "consultation"],
      canonicalUrl: "https://vidhisatya.com/faq"
    },
    {
      page: "contact",
      metaTitle: "Contact Us | Vidhi Satya",
      metaDescription: "Connect with Vidhi Satya advisory team.",
      keywords: ["contact vidhi satya"],
      canonicalUrl: "https://vidhisatya.com/contact"
    },
    {
      page: "book-consultation",
      metaTitle: "Book Consultation | Vidhi Satya",
      metaDescription: "Book a strategic advisory consultation with Vidhi Satya.",
      keywords: ["book consultation", "advisory session"],
      canonicalUrl: "https://vidhisatya.com/book-consultation"
    }
  ]);

  console.log("Seed completed successfully.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
