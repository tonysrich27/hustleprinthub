/**
 * Apparel - Gildan garments with print pricing, colors, print styles
 * Print styles: 1 Side (Front OR Back), Front+Back (Most Popular), Left Chest+Back (premium)
 */
export const ADULT_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'] as const;
export const TODDLER_SIZES = ['2T', '3T', '4T', '5T', '6T'] as const;

export const COMMON_COLORS = [
  { id: 'black', label: 'Black', hex: '#1a1a1a' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { id: 'red', label: 'Red', hex: '#c41e3a' },
  { id: 'gray', label: 'Heather Gray', hex: '#9e9e9e' },
  { id: 'charcoal', label: 'Charcoal', hex: '#36454f' },
  { id: 'royal', label: 'Royal Blue', hex: '#4169e1' },
  { id: 'forest', label: 'Forest Green', hex: '#228b22' },
  { id: 'maroon', label: 'Maroon', hex: '#800020' },
] as const;

export const apparelPricing = {
  garments: {
    gildan5000: {
      base: 6,
      label: 'Gildan 5000',
      type: 'T-Shirt',
      sizes: ADULT_SIZES,
      colors: COMMON_COLORS,
      image: '👕',
      imagePath: '/media/general/shirts-apparel.jpg',
    },
    gildan18500: {
      base: 18,
      label: 'Gildan 18500',
      type: 'Hoodie',
      sizes: ADULT_SIZES,
      colors: COMMON_COLORS,
      image: '🧥',
      imagePath: '/media/general/shirts-apparel.jpg',
    },
    gildan5400: {
      base: 8,
      label: 'Gildan 5400',
      type: 'Long Sleeve',
      sizes: ADULT_SIZES,
      colors: COMMON_COLORS,
      image: '👔',
      imagePath: '/media/general/shirts-apparel.jpg',
    },
    youth5000: {
      base: 5,
      label: 'Youth 5000',
      type: 'Toddler',
      sizes: TODDLER_SIZES,
      colors: COMMON_COLORS,
      image: '👕',
      imagePath: '/media/general/shirts-apparel.jpg',
    },
  },
  /** Print style pricing: oneSide (front or back), frontBack (most popular), leftChestBack (premium) */
  printStyles: {
    oneSide: { label: '1 Side (Front OR Back)', price: 4 },
    frontBack: { label: 'Front + Back', price: 7, mostPopular: true },
    leftChestBack: { label: 'Left Chest + Back', price: 9 },
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
    '2T': 0,
    '3T': 0,
    '4T': 0,
    '5T': 0,
    '6T': 0,
  },
  addons: {
    rush: 0.3,
    design: 50,
    extraColor: 2,
    sleevePrint: 3,
    setup: 30,
  },
} as const;

export type GarmentKey = keyof typeof apparelPricing.garments;
export type SizeKey = keyof typeof apparelPricing.sizeUpcharge;
export type ColorId = (typeof COMMON_COLORS)[number]['id'];
