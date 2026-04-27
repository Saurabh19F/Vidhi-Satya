type ServiceLike = {
  slug?: unknown;
  title?: unknown;
  seoTitle?: unknown;
  [key: string]: unknown;
};

const LEGACY_GOVERNMENT_SERVICE_SLUG = "government-policy-advisory";
const UPDATED_GOVERNMENT_SERVICE_TITLE = "Government Project Advisory";
const UPDATED_GOVERNMENT_SERVICE_SEO_TITLE = "Government Project Advisory | Vidhi Satya";

export function normalizeService<T extends ServiceLike | null | undefined>(service: T): T {
  const slug = service && typeof service.slug === "string" ? service.slug : "";
  if (!service || slug !== LEGACY_GOVERNMENT_SERVICE_SLUG) return service;

  return {
    ...service,
    title: UPDATED_GOVERNMENT_SERVICE_TITLE,
    seoTitle: UPDATED_GOVERNMENT_SERVICE_SEO_TITLE
  } as T;
}

export function normalizeServices<T extends ServiceLike>(services: T[]): T[] {
  return services.map(normalizeService);
}
