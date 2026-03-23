/**
 * Central product data — single source for images, i18n keys, and routes.
 * All image paths come from /public/images/{category}/
 */
export interface Product {
  id: string;
  slug: string; // category slug for /category/{slug}
  orderSlug: string; // for /order/{orderSlug}
  titleKey: string;
  descriptionKey: string;
  thumbnail: string;
  images: string[];
  orderRoute: string;
  ctaKey: string;
  icon?: string; // fallback when no image
}

/** Products with images — used for hero, category grid, gallery pages */
export const PRODUCTS_WITH_IMAGES: Product[] = [
  {
    id: 'signs',
    slug: 'signs',
    orderSlug: 'yard-signs',
    titleKey: 'category.signs.title',
    descriptionKey: 'category.signs.description',
    thumbnail: '/images/signs/yard-sign-8ft.jpg',
    images: ['/images/signs/yard-sign-8ft.jpg', '/images/signs/yard-sign-graduation.jpg'],
    orderRoute: '/order/yard-signs',
    ctaKey: 'category.signs.cta',
    icon: '🏠',
  },
  {
    id: 'banners',
    slug: 'banners',
    orderSlug: 'banners',
    titleKey: 'category.banners.title',
    descriptionKey: 'category.banners.description',
    thumbnail: '/images/banners/banner-outdoor.jpg',
    images: ['/images/banners/banner-outdoor.jpg', '/images/banners/banner-outdoor-3.jpg'],
    orderRoute: '/order/banners',
    ctaKey: 'category.banners.cta',
    icon: '🪧',
  },
  {
    id: 'decals',
    slug: 'decals',
    orderSlug: 'decals',
    titleKey: 'category.decals.title',
    descriptionKey: 'category.decals.description',
    thumbnail: '/images/decals/decal.jpg',
    images: [
      '/images/decals/decal.jpg',
      '/images/decals/decal-2.jpg',
      '/images/decals/commercial-car-wrap.jpg',
      '/images/decals/window-perf.jpg',
    ],
    orderRoute: '/order/decals',
    ctaKey: 'category.decals.cta',
    icon: '✨',
  },
  {
    id: 'magnets',
    slug: 'magnets',
    orderSlug: 'car-magnets',
    titleKey: 'category.magnets.title',
    descriptionKey: 'category.magnets.description',
    thumbnail: '/images/magnets/car-magnet.jpg',
    images: ['/images/magnets/car-magnet.jpg', '/images/magnets/car-magnet-2.jpg'],
    orderRoute: '/order/car-magnets',
    ctaKey: 'category.magnets.cta',
    icon: '🧲',
  },
  {
    id: 'cards',
    slug: 'cards',
    orderSlug: 'cards',
    titleKey: 'category.cards.title',
    descriptionKey: 'category.cards.description',
    thumbnail: '/images/cards/business-cards.jpg',
    images: ['/images/cards/business-cards.jpg'],
    orderRoute: '/order/cards',
    ctaKey: 'category.cards.cta',
    icon: '💳',
  },
  {
    id: 'shirts',
    slug: 'shirts',
    orderSlug: 't-shirts',
    titleKey: 'category.shirts.title',
    descriptionKey: 'category.shirts.description',
    thumbnail: '/images/shirts/shirts.jpg',
    images: ['/images/shirts/shirts.jpg'],
    orderRoute: '/order/t-shirts',
    ctaKey: 'category.shirts.cta',
    icon: '👕',
  },
];

/** Legacy product list for "What We Print" — includes items without dedicated images */
export const PRODUCTS: Product[] = [
  ...PRODUCTS_WITH_IMAGES,
  {
    id: 'flyers',
    slug: 'flyers',
    orderSlug: 'flyers',
    titleKey: 'products.flyers.name',
    descriptionKey: 'products.flyers.description',
    thumbnail: '',
    images: [],
    orderRoute: '/order/flyers',
    ctaKey: 'common.startOrderBtn',
    icon: '📄',
  },
  {
    id: 'vehicle-wraps',
    slug: 'vehicle-wraps',
    orderSlug: 'vehicle-wraps',
    titleKey: 'products.vehicle-wraps.name',
    descriptionKey: 'products.vehicle-wraps.description',
    thumbnail: '',
    images: [],
    orderRoute: '/order/vehicle-wraps',
    ctaKey: 'common.getQuote',
    icon: '🚗',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductWithImagesBySlug(slug: string): Product | undefined {
  return PRODUCTS_WITH_IMAGES.find((p) => p.slug === slug);
}
