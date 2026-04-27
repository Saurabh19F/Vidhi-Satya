"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  CircleUserRound,
  BriefcaseBusiness,
  Newspaper,
  CircleHelp,
  Inbox,
  Phone,
  SearchCode,
  Settings
} from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/about", label: "About", icon: CircleUserRound },
  { href: "/admin/services", label: "Services", icon: BriefcaseBusiness },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/faqs", label: "FAQs", icon: CircleHelp },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/contact-info", label: "Contact Info", icon: Phone },
  { href: "/admin/seo", label: "SEO", icon: SearchCode },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-72 shrink-0 border-r border-outline-variant/20 bg-primary-container text-[#CFFFDC] lg:block">
      <div className="px-6 py-5">
        <p className="font-[family-name:var(--font-newsreader)] text-2xl font-semibold text-[#CFFFDC]">Vidhi Satya Admin</p>
      </div>
      <nav className="space-y-1 px-3 pb-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#CFFFDC]/80 transition hover:bg-[#68BA7F]/25 hover:text-[#CFFFDC]",
              pathname === item.href && "bg-[#68BA7F]/30 text-[#CFFFDC]"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
