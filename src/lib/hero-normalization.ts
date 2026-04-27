type HeroLike = {
  title?: unknown;
  [key: string]: unknown;
};

const REMOVED_HERO_TITLE_PATTERN = /vision\s*&\s*mission\s*aligned\s*execution/i;

export function shouldIncludeHeroSlide<T extends HeroLike>(slide: T): boolean {
  const title = typeof slide.title === "string" ? slide.title : "";
  return !REMOVED_HERO_TITLE_PATTERN.test(title);
}

export function filterHeroSlides<T extends HeroLike>(slides: T[]): T[] {
  return slides.filter(shouldIncludeHeroSlide);
}
