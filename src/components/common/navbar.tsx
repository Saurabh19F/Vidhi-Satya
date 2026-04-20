"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

type ServiceNavLink = {
  title: string;
  slug: string;
};

type NavbarProps = {
  siteName?: string;
  serviceLinks?: ServiceNavLink[];
};

function normalizeServiceTitle(title: string) {
  if (title.trim().toLowerCase() === "individual strategic guidance") {
    return "Individual Strategic Advisory";
  }
  return title;
}

export function Navbar({ siteName = "Vidhi Satya", serviceLinks = [] }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header className="sticky top-0 z-40 bg-surface-bright/55 shadow-soft backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-3 sm:h-20">
        <Link href="/" aria-label={siteName} className="flex items-center">
          <span className="relative h-9 w-[108px] sm:h-10 sm:w-[132px]">
            <Image src="/brand/vidhi-satya-logo-tight.png" alt={siteName} fill priority className="object-contain object-left" />
          </span>
          <span className="sr-only">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-10 md:flex">
          <Link
            href="/about"
            className={cn("text-sm font-semibold text-muted-foreground transition hover:text-accent", pathname === "/about" && "text-accent")}
          >
            About
          </Link>

          <div className="group relative">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition hover:text-accent",
                servicesActive && "text-accent"
              )}
            >
              Services
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>

            {serviceLinks.length ? (
              <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-[0.75rem] bg-surface-bright p-2 opacity-0 shadow-soft ring-1 ring-outline-variant/15 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={cn(
                      "block rounded-[0.6rem] px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-surface-high hover:text-accent",
                      pathname === `/services/${service.slug}` && "bg-surface-high text-accent"
                    )}
                  >
                    {normalizeServiceTitle(service.title)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold text-muted-foreground transition hover:text-accent",
                pathname === link.href && "text-accent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" variant="default" className="india-tricolor-button">
            <Link href="/book-consultation">Book Consultation</Link>
          </Button>
        </div>

        <button
          className="shrink-0 rounded-[0.75rem] bg-surface-high p-2 text-foreground ring-1 ring-outline-variant/15 md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="bg-surface-bright/80 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {[links[0]].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[0.75rem] px-3 py-2 text-sm font-medium text-muted-foreground",
                  pathname === link.href && "bg-surface-high text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            <details className="rounded-[0.75rem] bg-surface-high/60 px-3 py-2">
              <summary
                className={cn(
                  "flex list-none cursor-pointer items-center justify-between text-sm font-medium text-muted-foreground [&::-webkit-details-marker]:hidden",
                  servicesActive && "text-foreground"
                )}
              >
                Services
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-2 flex flex-col gap-1 pl-2">
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[0.6rem] px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-high hover:text-foreground",
                    pathname === "/services" && "bg-surface-high text-foreground"
                  )}
                >
                  All Services
                </Link>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-[0.6rem] px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-high hover:text-foreground",
                      pathname === `/services/${service.slug}` && "bg-surface-high text-foreground"
                    )}
                  >
                    {normalizeServiceTitle(service.title)}
                  </Link>
                ))}
              </div>
            </details>

            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[0.75rem] px-3 py-2 text-sm font-medium text-muted-foreground",
                  pathname === link.href && "bg-surface-high text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="india-tricolor-button mt-2 w-full" variant="default">
              <Link href="/book-consultation">Book Consultation</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
