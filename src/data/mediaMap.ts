/**
 * Central media registry — paths are served from /public/media/
 * Curated 5–10 strong assets per category; use helpers in @/lib/media for fallbacks.
 */
export type MediaEntry =
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'video'; src: string; poster: string; alt?: string };

export const mediaMap = {
  banners: [
    { kind: 'image', src: '/media/banners/tap-in-printing-banners.jpg', alt: 'Vinyl banners' },
    { kind: 'image', src: '/media/banners/banner-outdoor.jpg', alt: 'Outdoor banner install' },
    { kind: 'image', src: '/media/banners/banner-outdoor-3.jpg', alt: 'Large format banner' },
    { kind: 'image', src: '/media/banners/banner-icons-promo.jpg', alt: 'Promotional banner' },
    { kind: 'video', src: '/media/banners/birthday-banner-install.mov', poster: '/media/banners/banner-outdoor.jpg' },
    { kind: 'video', src: '/media/banners/banner-install-1.mov', poster: '/media/banners/tap-in-printing-banners.jpg' },
  ] as const satisfies readonly MediaEntry[],

  decals: [
    { kind: 'image', src: '/media/decals/decal.jpg', alt: 'Vinyl decal' },
    { kind: 'image', src: '/media/decals/decal-2.jpg', alt: 'Custom decal detail' },
    { kind: 'image', src: '/media/decals/commercial-car-wrap.jpg', alt: 'Commercial vehicle graphics' },
    { kind: 'image', src: '/media/decals/window-perf.jpg', alt: 'Window perf film' },
    { kind: 'video', src: '/media/decals/decal-install.mov', poster: '/media/decals/decal.jpg' },
  ] as const satisfies readonly MediaEntry[],

  foodTrucks: [
    { kind: 'image', src: '/media/food-trucks/food-trailer-wrap-1.jpg', alt: 'Food trailer wrap' },
    { kind: 'image', src: '/media/food-trucks/food-trailer-wrap-2.jpg', alt: 'Food truck branding' },
    { kind: 'image', src: '/media/food-trucks/food-trailer-wrap-3.jpg', alt: 'Mobile kitchen graphics' },
  ] as const satisfies readonly MediaEntry[],

  yardSigns: [
    { kind: 'image', src: '/media/yard-signs/yard-sign-8ft.jpg', alt: 'Yard sign' },
    { kind: 'image', src: '/media/yard-signs/yard-sign-graduation.jpg', alt: 'Graduation yard sign' },
    { kind: 'image', src: '/media/yard-signs/red-yard-signs.jpg', alt: 'Red coroplast signs' },
    { kind: 'image', src: '/media/yard-signs/car-wash-signs.jpg', alt: 'Car wash signs' },
    { kind: 'image', src: '/media/yard-signs/car-wash-signs-close.jpg', alt: 'Sign detail' },
    { kind: 'video', src: '/media/yard-signs/finish-yard-signs.mov', poster: '/media/yard-signs/yard-sign-8ft.jpg' },
  ] as const satisfies readonly MediaEntry[],

  flyers: [
    { kind: 'image', src: '/media/general/business-cards-showcase.jpg', alt: 'Printed marketing materials' },
    { kind: 'video', src: '/media/flyers/finished-blue-flyers.mov', poster: '/media/general/business-cards-showcase.jpg' },
  ] as const satisfies readonly MediaEntry[],

  wraps: [
    { kind: 'image', src: '/media/wraps/sprinter-wrap.jpg', alt: 'Sprinter van wrap' },
    { kind: 'image', src: '/media/decals/commercial-car-wrap.jpg', alt: 'Fleet wrap' },
    { kind: 'image', src: '/media/general/car-magnet-on-truck.jpg', alt: 'Vehicle branding' },
  ] as const satisfies readonly MediaEntry[],

  consulting: [
    { kind: 'video', src: '/media/general/intro-pickup-location.mov', poster: '/media/banners/tap-in-printing-banners.jpg' },
    { kind: 'video', src: '/media/general/promo-trap-outside.mov', poster: '/media/yard-signs/red-yard-signs.jpg' },
    { kind: 'video', src: '/media/consulting/design-consultation.mov', poster: '/media/general/business-cards-showcase.jpg' },
  ] as const satisfies readonly MediaEntry[],

  general: [
    { kind: 'image', src: '/media/general/business-cards.jpg', alt: 'Business cards' },
    { kind: 'image', src: '/media/general/business-cards-showcase.jpg', alt: 'Premium print finish' },
    { kind: 'image', src: '/media/general/car-magnet.jpg', alt: 'Car magnet' },
    { kind: 'image', src: '/media/general/car-magnet-2.jpg', alt: 'Vehicle magnet pair' },
    { kind: 'image', src: '/media/general/car-magnet-on-truck.jpg', alt: 'Magnet on truck' },
    { kind: 'image', src: '/media/general/shirts-apparel.jpg', alt: 'Custom apparel' },
    { kind: 'video', src: '/media/general/intro-pickup-location.mov', poster: '/media/banners/banner-outdoor.jpg' },
    { kind: 'video', src: '/media/general/promo-trap-outside.mov', poster: '/media/decals/decal.jpg' },
  ] as const satisfies readonly MediaEntry[],
} as const;

export type MediaMapCategory = keyof typeof mediaMap;
