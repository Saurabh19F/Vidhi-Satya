type ServiceLike = {
  title?: string;
  slug?: string;
};

const ORDERED_SERVICE_TITLES = [
  "Government Project Advisory",
  "Corporate Governance Advisory",
  "Individual Strategic Advisory"
] as const;
const GOVERNMENT_SERVICE_SLUG = "government-policy-advisory";

const titlePriority = new Map<string, number>(ORDERED_SERVICE_TITLES.map((title, index) => [title.toLowerCase(), index]));

// Backward-compatible aliases so older titles still sort correctly.
titlePriority.set("corporate governance and advisory", 1);
titlePriority.set("corporate governance & advisory", 1);
titlePriority.set("individual strategic guidance", 2);

function getPriority(service: ServiceLike) {
  if (service.slug === GOVERNMENT_SERVICE_SLUG) return 0;
  if (!service.title) return Number.MAX_SAFE_INTEGER;
  return titlePriority.get(service.title.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
}

export function sortServicesByPriority<T extends ServiceLike>(services: T[]) {
  return services
    .map((service, index) => ({ service, index }))
    .sort((left, right) => {
      const priorityDiff = getPriority(left.service) - getPriority(right.service);
      if (priorityDiff !== 0) return priorityDiff;
      return left.index - right.index;
    })
    .map((entry) => entry.service);
}
