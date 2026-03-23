/**
 * Category page data — derived from central products.ts
 * No hardcoded image paths; all from product data
 */
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

function productToCategoryPage(p: Product): CategoryPageData {
  const [heroImage, ...galleryImages] = p.images;
  return {
    id: p.id,
    slug: p.slug,
    titleKey: p.titleKey,
    descriptionKey: p.descriptionKey,
    heroImage: heroImage ?? p.thumbnail,
    galleryImages,
    orderRoute: p.orderRoute,
    ctaKey: p.ctaKey,
  };
}

export const CATEGORY_PAGES: CategoryPageData[] = PRODUCTS_WITH_IMAGES.map(productToCategoryPage);

export function getCategoryBySlug(slug: string): CategoryPageData | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug);
}
