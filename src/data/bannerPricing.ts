/**
 * Banner pricing configuration
 */
export const bannerPricing = {
  sizes: {
    '3x6': { base: 90, doubleTotal: 160 },
    '3x8': { base: 120, doubleTotal: 175 },
    '6x10': { base: 220, doubleTotal: 320 },
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
