type HeroLike = {
  title?: string;
};

const REMOVED_HERO_TITLE_PATTERN = /vision\s*&\s*mission\s*aligned\s*execution/i;

export function shouldIncludeHeroSlide<T extends HeroLike>(slide: T): boolean {
  return !REMOVED_HERO_TITLE_PATTERN.test(slide.title ?? "");
}

export function filterHeroSlides<T extends HeroLike>(slides: T[]): T[] {
  return slides.filter(shouldIncludeHeroSlide);
}
