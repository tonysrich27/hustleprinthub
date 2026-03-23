/**
 * Business card pricing — quantity-based, tier pricing
 * Options: finish (matte, gloss, uv), thickness (14pt, 16pt, 18pt)
 */
export const businessCardPricing = {
  /** Base price per 100 cards by quantity tier */
  tiers: [
    { min: 250, max: 499, pricePer100: 18 },
    { min: 500, max: 999, pricePer100: 15 },
    { min: 1000, max: 2499, pricePer100: 12 },
    { min: 2500, max: 4999, pricePer100: 10 },
    { min: 5000, max: 99999, pricePer100: 8 },
  ] as const,
  quantityPresets: [250, 500, 1000, 2500, 5000] as const,
  finish: {
    matte: { label: 'Matte', addPer100: 0 },
    gloss: { label: 'Gloss', addPer100: 1.5 },
    uv: { label: 'UV Coating', addPer100: 3 },
  } as const,
  thickness: {
    '14pt': { label: '14pt (Standard)', addPer100: 0 },
    '16pt': { label: '16pt (Premium)', addPer100: 2 },
    '18pt': { label: '18pt (Luxury)', addPer100: 4 },
  } as const,
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type BusinessCardFinishKey = keyof typeof businessCardPricing.finish;
export type BusinessCardThicknessKey = keyof typeof businessCardPricing.thickness;

export function getBusinessCardPrice(
  quantity: number,
  finish: BusinessCardFinishKey,
  thickness: BusinessCardThicknessKey,
  designHelp: boolean,
  rush: boolean
): number {
  const tier = businessCardPricing.tiers.find((t) => quantity >= t.min && quantity <= t.max);
  const basePer100 = tier?.pricePer100 ?? businessCardPricing.tiers[0].pricePer100;
  const finishAdd = businessCardPricing.finish[finish].addPer100;
  const thicknessAdd = businessCardPricing.thickness[thickness].addPer100;

  const basePrice = (quantity / 100) * basePer100;
  const finishPrice = (quantity / 100) * finishAdd;
  const thicknessPrice = (quantity / 100) * thicknessAdd;

  let total = basePrice + finishPrice + thicknessPrice;
  if (designHelp) total += businessCardPricing.addons.design;
  if (rush) total += businessCardPricing.addons.rush;

  return total;
}
