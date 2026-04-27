const INVALID_IMAGE_MARKERS = new Set(["undefined", "null", "nan"]);

export function resolveImageUrl(imageUrl: string | undefined | null, fallback: string) {
  if (!imageUrl) return fallback;

  const trimmed = imageUrl.trim();
  if (!trimmed) return fallback;

  if (INVALID_IMAGE_MARKERS.has(trimmed.toLowerCase())) return fallback;

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  if (/^[a-zA-Z]:\\/.test(trimmed) || trimmed.startsWith("\\\\")) {
    return fallback;
  }

  if (trimmed.startsWith("/")) return trimmed;

  const normalized = trimmed.replace(/^\.?\//, "");
  return normalized ? `/${normalized}` : fallback;
}
