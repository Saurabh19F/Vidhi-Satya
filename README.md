# Vidhi Satya

Vidhi Satya is a full-stack Next.js 15 advisory website with:
- a public-facing marketing site
- an authenticated admin CMS
- dynamic content stored in MongoDB
- built-in SEO metadata, sitemap, robots, and JSON-LD structured data

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Environment Variables](#environment-variables)
6. [Local Setup](#local-setup)
7. [Available Scripts](#available-scripts)
8. [Admin CMS](#admin-cms)
9. [SEO and Structured Data](#seo-and-structured-data)
10. [File Uploads](#file-uploads)
11. [Deployment Notes](#deployment-notes)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

## Overview

This project powers the Vidhi Satya advisory platform for:
- Individuals
- Corporate clients
- Government-focused consulting engagements

The public website includes service pages, blogs, FAQs, contact workflows, and consultation booking.  
The admin interface allows non-technical content management of hero slides, services, blogs, FAQs, SEO entries, and site settings.

## Features

### Public Experience
- Home, About, Services, Blog, FAQ, Contact, and Book Consultation pages
- Dynamic blog and service detail routes
- Consultation form submission flow
- Responsive UI with motion and modern card-based design
- Visitor counter endpoint integration

### Admin Experience
- JWT + cookie-based admin authentication
- Dashboard and module pages for managing:
  - Hero slides
  - Services
  - Blogs
  - FAQs
  - Contact details
  - About section
  - Site settings
  - Page SEO records
- Image upload fields for media-backed content sections

### SEO
- Per-page metadata via reusable SEO builder
- Canonical URLs for static and dynamic routes
- Open Graph + Twitter card metadata
- `robots.txt` and `sitemap.xml`
- Image URLs included in sitemap entries
- JSON-LD structured data for organization and page entities

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: Radix UI
- Motion: Framer Motion
- Forms: React Hook Form + Zod
- Database: MongoDB + Mongoose
- Auth: JWT (`jsonwebtoken`) + `httpOnly` cookie
- Notifications: Sonner

## Project Structure

```text
.
|- src/
|  |- app/
|  |  |- (public)/                # Public routes
|  |  |- admin/                   # Admin UI routes
|  |  |- api/                     # REST-like API endpoints
|  |  |- robots.ts                # robots.txt generation
|  |  \- sitemap.ts               # sitemap.xml generation
|  |- components/
|  |  |- admin/                   # Admin UI components
|  |  |- common/                  # Shared UI and structured data renderer
|  |  |- forms/                   # Reusable form components
|  |  \- home/                    # Homepage sections
|  |- lib/                        # DB, auth, SEO, structured-data, helpers
|  |- models/                     # Mongoose models
|  \- types/                      # Shared TypeScript types
|- scripts/
|  \- seed.ts                     # DB seed script
|- public/
|  |- brand/
|  |- uploads/
|  \- videos/
|- .env.example
\- README.md
```

## Environment Variables

Copy `.env.example` to `.env` and fill values.

```bash
cp .env.example .env
```

Required and optional variables:

```env
# MongoDB
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=vidhi_satya

# Auth
JWT_SECRET=your-long-random-secret

# App
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Seed admin (used by npm run seed)
ADMIN_EMAIL=admin@vidhisatya.com
ADMIN_PASSWORD=change-me

# Optional Cloudinary (currently local fallback is used)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Local Setup

### Prerequisites
- Node.js 20+ recommended
- npm 10+ recommended
- MongoDB database (local or cloud)

### Install

```bash
npm install
```

### Seed initial data

```bash
npm run seed
```

The seed script creates:
- default admin user
- starter hero, about, services, blogs, FAQs
- contact info, settings, and base SEO entries

### Run in development

```bash
npm run dev
```

Open:
- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Available Scripts

```bash
npm run dev     # Start local development server
npm run build   # Production build
npm run start   # Start production server after build
npm run lint    # Lint codebase
npm run seed    # Seed DB with starter content
```

## Admin CMS

Use the admin panel to manage content without code changes:
- `/admin/dashboard`
- `/admin/hero`
- `/admin/services`
- `/admin/blogs`
- `/admin/faqs`
- `/admin/contact-info`
- `/admin/about`
- `/admin/settings`
- `/admin/seo`

Security note:
- Admin pages are configured `noindex, nofollow`.
- In production, always set a strong `JWT_SECRET` and strong admin password.

## SEO and Structured Data

The project includes centralized SEO and schema support:

- Metadata builder: `src/lib/seo.ts`
- Structured data builders: `src/lib/structured-data.ts`
- JSON-LD renderer component: `src/components/common/structured-data.tsx`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`

Implemented schema types include:
- `Organization`
- `WebSite`
- `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage`
- `ItemList`
- `BlogPosting`
- `Service`
- `FAQPage`

After deployment:
1. Verify `https://your-domain.com/sitemap.xml`
2. Submit sitemap in Google Search Console
3. Validate key pages with Rich Results Test

## File Uploads

Uploads are currently stored under local filesystem:
- `public/uploads/*`

`src/lib/upload.ts` contains a Cloudinary hook point, but current implementation uses local upload fallback so the app works without external media setup.

If deploying to ephemeral/serverless environments, move uploads to persistent object storage (for example Cloudinary, S3, or equivalent).

## Deployment Notes

Before going live:
1. Set all production env vars (`MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, etc.)
2. Run `npm run build` and ensure success
3. Seed production database if needed (`npm run seed`) using secure admin credentials
4. Confirm `robots.txt` and `sitemap.xml` resolve on production domain
5. Validate admin login and content CRUD flows

## Troubleshooting

- `JWT_SECRET is missing`:
  - Add `JWT_SECRET` in your `.env`.

- Login not working:
  - Ensure seed has created admin user (`npm run seed`).
  - Confirm cookie is being set and domain settings are correct.

- No content on public pages:
  - Seed database or create records through admin CMS.

- Uploaded images disappear after deployment:
  - You are likely on ephemeral storage. Switch to persistent external media storage.

## License

This repository is licensed under the terms in [LICENSE](./LICENSE).
