/**
 * Central product data — single source for images, i18n keys, and routes.
 * Visual assets live under /public/media/ (see mediaMap.ts).
 */
export interface Product {
  id: string;
  slug: string;
  orderSlug: string;
  titleKey: string;
  descriptionKey: string;
  thumbnail: string;
  images: string[];
  orderRoute: string;
  ctaKey: string;
  icon?: string;
}

/** Products with images — used for hero, category grid, gallery pages */
export const PRODUCTS_WITH_IMAGES: Product[] = [
  {
    id: 'signs',
    slug: 'signs',
    orderSlug: 'yard-signs',
    titleKey: 'category.signs.title',
    descriptionKey: 'category.signs.description',
    thumbnail: '/media/yard-signs/yard-sign-8ft.jpg',
    images: [
      '/media/yard-signs/yard-sign-8ft.jpg',
      '/media/yard-signs/yard-sign-graduation.jpg',
      '/media/yard-signs/red-yard-signs.jpg',
      '/media/yard-signs/car-wash-signs.jpg',
      '/media/yard-signs/finish-yard-signs.mov',
    ],
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
    thumbnail: '/media/banners/tap-in-printing-banners.jpg',
    images: [
      '/media/banners/tap-in-printing-banners.jpg',
      '/media/banners/banner-outdoor.jpg',
      '/media/banners/banner-outdoor-3.jpg',
      '/media/banners/banner-icons-promo.jpg',
      '/media/banners/birthday-banner-install.mov',
    ],
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
    thumbnail: '/media/decals/decal.jpg',
    images: [
      '/media/decals/decal.jpg',
      '/media/decals/decal-2.jpg',
      '/media/decals/commercial-car-wrap.jpg',
      '/media/decals/window-perf.jpg',
      '/media/decals/decal-install.mov',
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
    thumbnail: '/media/general/car-magnet.jpg',
    images: [
      '/media/general/car-magnet.jpg',
      '/media/general/car-magnet-2.jpg',
      '/media/general/car-magnet-on-truck.jpg',
    ],
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
    thumbnail: '/media/general/business-cards.jpg',
    images: ['/media/general/business-cards.jpg', '/media/general/business-cards-showcase.jpg'],
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
    thumbnail: '/media/general/shirts-apparel.jpg',
    images: ['/media/general/shirts-apparel.jpg'],
    orderRoute: '/order/t-shirts',
    ctaKey: 'category.shirts.cta',
    icon: '👕',
  },
];

export const PRODUCTS: Product[] = [
  ...PRODUCTS_WITH_IMAGES,
  {
    id: 'flyers',
    slug: 'flyers',
    orderSlug: 'flyers',
    titleKey: 'products.flyers.name',
    descriptionKey: 'products.flyers.description',
    thumbnail: '/media/general/business-cards-showcase.jpg',
    images: ['/media/general/business-cards-showcase.jpg', '/media/flyers/finished-blue-flyers.mov'],
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
    thumbnail: '/media/wraps/sprinter-wrap.jpg',
    images: [
      '/media/wraps/sprinter-wrap.jpg',
      '/media/decals/commercial-car-wrap.jpg',
      '/media/food-trucks/food-trailer-wrap-2.jpg',
      '/media/general/car-magnet-on-truck.jpg',
    ],
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
