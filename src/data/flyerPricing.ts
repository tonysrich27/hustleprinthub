/**
 * Flyer pricing - sizes 4x6, 5x7, 8.5x11, custom
 * Print type: single or double-sided (default rec = double)
 * Paper: standard, gloss, premium
 */
export const flyerPricing = {
  sizes: {
    '4x6': { basePer100: 35, label: '4×6 in' },
    '5x7': { basePer100: 45, label: '5×7 in' },
    '8.5x11': { basePer100: 65, label: '8.5×11 in', badge: 'Most Popular' },
    custom: { basePer100: 0, label: 'Custom', badge: 'Quote' },
  },
  doubleSidedMultiplier: 1.4,
  paper: {
    standard: { addPerSheet: 0, label: 'Standard' },
    gloss: { addPerSheet: 0.03, label: 'Gloss' },
    premium: { addPerSheet: 0.06, label: 'Premium' },
  },
  quantityPresets: [100, 250, 500, 1000, 2500, 5000],
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type FlyerSizeKey = keyof typeof flyerPricing.sizes;
export type FlyerPaperKey = keyof typeof flyerPricing.paper;
