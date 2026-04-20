const PROPRIETARY_SUFFIX_PATTERN = /\s*\(?\s*proprietary\s+of\s+east\s+delhi\s+law\s+office\s*\)?\s*/i;

export function sanitizeCompanyName(companyName: string | undefined, fallback = "Vidhi Satya") {
  if (!companyName) return fallback;

  const cleaned = companyName.replace(PROPRIETARY_SUFFIX_PATTERN, " ").replace(/\s{2,}/g, " ").trim();
  return cleaned || fallback;
}
