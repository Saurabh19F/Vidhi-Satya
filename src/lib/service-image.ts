const SERVICE_IMAGE_MAP = {
  government: "/uploads/service-gov.jpeg",
  corporate: "/uploads/service-cor.jpeg",
  individual: "/uploads/service-ind.jpeg"
} as const;

export function resolveServiceImage(imageUrl: string | undefined, category: string | undefined, title: string | undefined) {
  const haystack = `${category ?? ""} ${title ?? ""}`.toLowerCase();

  // Check corporate first so titles like "Corporate Governance" don't get
  // misclassified as government due to the "gov" prefix in "governance".
  if (/\bcorporate\b|\bcorp\b/.test(haystack)) return SERVICE_IMAGE_MAP.corporate;
  if (/\bindividual\b|\bpersonal\b/.test(haystack)) return SERVICE_IMAGE_MAP.individual;
  if (/\bgovernment\b|\bgov\b|\bpublic\b|\bpolicy\b/.test(haystack)) return SERVICE_IMAGE_MAP.government;

  return imageUrl || SERVICE_IMAGE_MAP.corporate;
}
