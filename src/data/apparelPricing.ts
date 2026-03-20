/**
 * Apparel - Gildan garments with print pricing
 */
export const apparelPricing = {
  garments: {
    gildan5000: { base: 6, label: 'Gildan 5000', type: 'T-Shirt', image: '👕' },
    gildan18500: { base: 18, label: 'Gildan 18500', type: 'Hoodie', image: '🧥' },
    gildan5400: { base: 8, label: 'Gildan 5400', type: 'Long Sleeve', image: '👔' },
    youth5000: { base: 5, label: 'Youth 5000', type: 'Youth T-Shirt', image: '👕' },
  },
  printPerSide: {
    front: 4,
    back: 4,
    both: 7,
  },
  sizeUpcharge: {
    S: 0,
    M: 0,
    L: 0,
    XL: 1,
    '2XL': 2,
    '3XL': 3,
    '4XL': 4,
    '5XL': 5,
  },
  addons: {
    rush: 0.3,
    design: 50,
  },
} as const;

export type GarmentKey = keyof typeof apparelPricing.garments;
export type PrintSideKey = keyof typeof apparelPricing.printPerSide;
export type SizeKey = keyof typeof apparelPricing.sizeUpcharge;
