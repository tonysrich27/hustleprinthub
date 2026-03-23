/**
 * Flyer pricing - sizes 4x6, 5x7 (Most Popular), 8.5x11
 * Single/double sided, gloss/matte finish
 */
export const flyerPricing = {
  sizes: {
    '4x6': { basePer100: 35, label: '4×6 in', badge: null as const },
    '5x7': { basePer100: 45, label: '5×7 in', badge: 'mostPopular' as const },
    '8.5x11': { basePer100: 65, label: '8.5×11 in', badge: null as const },
    custom: { basePer100: 0, label: 'Custom', badge: 'Quote' as const },
  },
  doubleSidedMultiplier: 1.4,
  paper: {
    gloss: { addPerSheet: 0.02, label: 'Gloss' },
    matte: { addPerSheet: 0, label: 'Matte' },
  },
  quantityPresets: [100, 250, 500, 1000, 2500, 5000],
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type FlyerSizeKey = keyof typeof flyerPricing.sizes;
export type FlyerPaperKey = keyof typeof flyerPricing.paper;
