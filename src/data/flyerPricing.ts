export const flyerPricing = {
  quantities: {
    '250': 65,
    '500': 85,
    '1000': 130,
    '5000': 225,
  },
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type FlyerQtyKey = keyof typeof flyerPricing.quantities;
