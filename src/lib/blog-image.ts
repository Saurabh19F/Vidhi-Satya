type BlogImageInput = {
  title: string;
  slug?: string;
  featuredImage?: string;
};

const TITLE_IMAGE_OVERRIDES: Array<{ match: string; image: string }> = [
  {
    match: "designing public programs with implementation confidence",
    image: "/uploads/blog-designing-public-programs.jpeg"
  },
  {
    match: "five governance signals leadership teams should not ignore",
    image: "/uploads/blog-five-governance-signals.jpeg"
  }
];

function isValidImagePath(value: string) {
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");
}

export function resolveBlogImage({ title, featuredImage }: BlogImageInput) {
  const normalizedTitle = title.trim().toLowerCase();
  const override = TITLE_IMAGE_OVERRIDES.find((item) => normalizedTitle.includes(item.match));
  if (override) {
    return override.image;
  }

  if (featuredImage && isValidImagePath(featuredImage)) {
    return featuredImage;
  }

  return "/uploads/blog-designing-public-programs.jpeg";
}
