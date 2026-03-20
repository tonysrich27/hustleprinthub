/**
 * Banner pricing configuration — reusable for future products (yard signs, decals, etc.)
 */
export const bannerPricing = {
  sizes: {
    '3x6': { base: 90, double: 70 },
    '4x8': { base: 120, double: 100 },
    '6x10': { base: 220, double: 150 },
  },
  addons: {
    windSlits: 15,
    polePockets: 20,
    rope: 15,
    rush: 50,
    design: 25,
  },
} as const;

export type BannerSizeKey = keyof typeof bannerPricing.sizes;
