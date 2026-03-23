/**
 * Central data for category/product pages
 * Single source of truth for title, description, images, and order link
 */
export interface CategoryPageData {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  orderRoute: string;
  ctaLabel: string;
}

export const CATEGORY_PAGES: CategoryPageData[] = [
  {
    id: 'signs',
    slug: 'signs',
    title: 'Yard Signs',
    description: 'Professional yard signs for real estate, graduations, events, and business marketing. 24×18 coroplast. Single or double-sided. Stakes and gloss options available.',
    heroImage: '/images/signs/yard-sign-8ft.jpg',
    galleryImages: ['/images/signs/yard-sign-graduation.jpg'],
    orderRoute: '/order/yard-signs',
    ctaLabel: 'Start Order',
  },
  {
    id: 'banners',
    slug: 'banners',
    title: 'Outdoor Banners',
    description: 'High-quality vinyl banners for fences, storefronts, events, and promotions. Wind slits, pole pockets, and rope available. Fast turnaround.',
    heroImage: '/images/banners/banner-outdoor.jpg',
    galleryImages: ['/images/banners/banner-outdoor-3.jpg'],
    orderRoute: '/order/banners',
    ctaLabel: 'Start Order',
  },
  {
    id: 'decals',
    slug: 'decals',
    title: 'Vinyl Decals',
    description: 'Custom decals for vehicles, windows, and branding. Work vans, food trucks, trailers. Logos, phone numbers, menus, QR codes.',
    heroImage: '/images/decals/decal.jpg',
    galleryImages: [
      '/images/decals/decal-2.jpg',
      '/images/decals/commercial-car-wrap.jpg',
      '/images/decals/window-perf.jpg',
    ],
    orderRoute: '/order/decals',
    ctaLabel: 'Request Quote',
  },
  {
    id: 'magnets',
    slug: 'magnets',
    title: 'Car Magnets',
    description: 'Magnetic signs for vehicles. 12×18 and 18×24 pairs. Easy to install and remove. Perfect for realtors, contractors, and small businesses.',
    heroImage: '/images/magnets/car-magnet.jpg',
    galleryImages: ['/images/magnets/car-magnet-2.jpg'],
    orderRoute: '/order/car-magnets',
    ctaLabel: 'Start Order',
  },
  {
    id: 'cards',
    slug: 'cards',
    title: 'Business Cards',
    description: 'Professional business cards. Standard and premium stocks. Fast turnaround. Design help available.',
    heroImage: '/images/cards/business-cards.jpg',
    galleryImages: [],
    orderRoute: '/order/cards',
    ctaLabel: 'Request Quote',
  },
  {
    id: 'shirts',
    slug: 'shirts',
    title: 'Apparel & T-Shirts',
    description: 'Custom printed tees, hoodies, and long sleeves. Gildan quality. Min 15 pieces. Mix garments and sizes. Perfect for brands, events, and businesses.',
    heroImage: '/images/shirts/shirts.jpg',
    galleryImages: [],
    orderRoute: '/order/t-shirts',
    ctaLabel: 'Start Order',
  },
];

export function getCategoryBySlug(slug: string): CategoryPageData | undefined {
  return CATEGORY_PAGES.find((c) => c.slug === slug);
}
