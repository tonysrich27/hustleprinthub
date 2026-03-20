export const tShirtPricing = {
  singleSided: [
    { min: 15, max: 24, price: 16 },
    { min: 25, max: 49, price: 15 },
    { min: 50, max: 99, price: 14 },
    { min: 100, max: Infinity, price: 13 },
  ],
  doubleSided: [
    { min: 15, max: 24, price: 22 },
    { min: 25, max: 49, price: 20 },
    { min: 50, max: 99, price: 18 },
    { min: 100, max: Infinity, price: 17 },
  ],
  addons: {
    extraColor: 2,
    setup: 30,
    design: 50,
    sleevePrint: 3,
    rushPercent: 0.3,
  },
} as const;

export function getTShirtPrice(quantity: number, doubleSided: boolean): number {
  const tiers = doubleSided ? tShirtPricing.doubleSided : tShirtPricing.singleSided;
  const tier = tiers.find((t) => quantity >= t.min && quantity <= t.max);
  return tier?.price ?? 0;
}
