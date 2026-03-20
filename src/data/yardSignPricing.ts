/**
 * Yard Sign (24x18) pricing configuration
 * Quantity tiers for single/double-sided, per-sign and flat add-ons
 */
export const yardSignPricing = {
  singleSided: [
    { min: 1, max: 1, pricePerSign: 20 },
    { min: 2, max: 9, pricePerSign: 15 },
    { min: 10, max: 30, pricePerSign: 12 },
    { min: 50, max: Infinity, pricePerSign: 8.5 },
  ],
  doubleSided: [
    { min: 1, max: 9, addPerSign: 5 },
    { min: 10, max: 30, addPerSign: 4 },
    { min: 50, max: Infinity, addPerSign: 3 },
  ],
  addons: {
    stakes: 2, // per sign
    gloss: 4, // per sign
    rush: 25, // flat
    design: 25, // flat
  },
} as const;

export function getSinglePricePerSign(quantity: number): number {
  const tier = yardSignPricing.singleSided.find(
    (t) => quantity >= t.min && quantity <= t.max
  );
  // 31-49 gap: use 10-30 tier ($12)
  if (!tier && quantity >= 31 && quantity <= 49) return 12;
  return tier?.pricePerSign ?? 0;
}

export function getDoubleAddPerSign(quantity: number): number {
  const tier = yardSignPricing.doubleSided.find(
    (t) => quantity >= t.min && quantity <= t.max
  );
  // 31-49 gap: use 10-30 tier (+$4)
  if (!tier && quantity >= 31 && quantity <= 49) return 4;
  return tier?.addPerSign ?? 0;
}
