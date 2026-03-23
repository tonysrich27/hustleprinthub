/**
 * Car Magnet pricing - 12x18, 18x24 (Most Popular), Die-Cut (custom)
 */
export const carMagnetPricing = {
  options: {
    '12x18': { price: 85, label: '12×18 in (pair)', badge: null as const },
    '18x24': { price: 110, label: '18×24 in (pair)', badge: 'mostPopular' as const },
    dieCut: { price: 0, label: 'Die-Cut (custom shape)', badge: null as const, isQuote: true },
  },
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type CarMagnetKey = keyof typeof carMagnetPricing.options;
