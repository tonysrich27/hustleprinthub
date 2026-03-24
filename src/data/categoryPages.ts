/**
 * Category page data — derived from central products.ts
 * Hero is always a still image; gallery may include video clips.
 */
import { isVideoPath } from '../lib/media';
import type { Product } from './products';
import { PRODUCTS_WITH_IMAGES } from './products';

export interface CategoryPageData {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  heroImage: string;
  galleryImages: string[];
  orderRoute: string;
  ctaKey: string;
}

function pickHeroStill(p: Product): string {
  const still = p.images.find((src) => !isVideoPath(src));
  return still ?? p.thumbnail;
}

function productToCategoryPage(p: Product): CategoryPageData {
  const heroImage = pickHeroStill(p);
  const galleryImages = p.images.filter((src) => src !== heroImage);
  return {
    id: p.id,
    slug: p.slug,
    titleKey: p.titleKey,
    descriptionKey: p.descriptionKey,
    heroImage,
    galleryImages,
    orderRoute: p.orderRoute,
    ctaKey: p.ctaKey,
  };
}

export const CATEGORY_PAGES: CategoryPageData[] = PRODUCTS_WITH_IMAGES.map(productToCategoryPage);

export function getCategoryBySlug(slug: string): CategoryPageData | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug);
}
