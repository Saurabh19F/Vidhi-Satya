type ServiceLike = {
  title?: string;
};

const ORDERED_SERVICE_TITLES = [
  "Government Policy Advisory",
  "Corporate Governance Advisory",
  "Individual Strategic Advisory"
] as const;

const titlePriority = new Map<string, number>(ORDERED_SERVICE_TITLES.map((title, index) => [title.toLowerCase(), index]));

// Backward-compatible aliases so older titles still sort correctly.
titlePriority.set("corporate governance and advisory", 1);
titlePriority.set("corporate governance & advisory", 1);
titlePriority.set("individual strategic guidance", 2);

function getPriority(title: string | undefined) {
  if (!title) return Number.MAX_SAFE_INTEGER;
  return titlePriority.get(title.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
}

export function sortServicesByPriority<T extends ServiceLike>(services: T[]) {
  return services
    .map((service, index) => ({ service, index }))
    .sort((left, right) => {
      const priorityDiff = getPriority(left.service.title) - getPriority(right.service.title);
      if (priorityDiff !== 0) return priorityDiff;
      return left.index - right.index;
    })
    .map((entry) => entry.service);
}
