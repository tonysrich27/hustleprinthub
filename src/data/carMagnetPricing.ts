export const carMagnetPricing = {
  options: {
    '12x18': 85,
    '18x24': 110,
    business: 135,
  },
  addons: {
    design: 25,
    rush: 30,
  },
} as const;

export type CarMagnetKey = keyof typeof carMagnetPricing.options;
