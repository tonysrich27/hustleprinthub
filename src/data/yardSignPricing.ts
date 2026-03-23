/**
 * Yard Sign pricing - sizes 12x18, 18x24 (Most Popular), 24x36
 * Quantity tiers for single/double-sided, per-sign and flat add-ons
 */
export const yardSignPricing = {
  sizes: {
    '12x18': { pricePerSign: 12, badge: null as const },
    '18x24': { pricePerSign: 15, badge: 'mostPopular' as const },
    '24x36': { pricePerSign: 22, badge: null as const },
  },
  singleSided: [
    { min: 1, max: 9, add: 0 },
    { min: 10, max: 49, add: -1 },
    { min: 50, max: Infinity, add: -2 },
  ],
  doubleSidedAddPerSign: 4,
  addons: {
    stakes: 2,
    gloss: 4,
    rush: 25,
    design: 25,
  },
} as const;

export type YardSignSizeKey = keyof typeof yardSignPricing.sizes;

export function getYardSignPricePerSign(
  size: YardSignSizeKey,
  quantity: number,
  doubleSided: boolean
): number {
  const base = yardSignPricing.sizes[size].pricePerSign;
  const tier = yardSignPricing.singleSided.find((t) => quantity >= t.min && quantity <= t.max);
  const adjusted = base + (tier?.add ?? 0);
  return doubleSided ? adjusted + yardSignPricing.doubleSidedAddPerSign : adjusted;
}
