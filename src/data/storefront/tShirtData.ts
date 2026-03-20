export const tShirtStorefrontData = {
  id: 't-shirts',
  name: 'T-Shirts',
  slug: 't-shirts',
  minQty: 15,
  description: 'Start with just 15 shirts — perfect for brands, events, and businesses.',
  tagline: 'Custom T-Shirts — Minimum 15',
  subcopy: 'Fast Turnaround Available',
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
  addons: [
    { id: 'extraColor', label: 'Extra color', price: 2, perUnit: true },
    { id: 'setup', label: 'Setup', price: 30, perUnit: false },
    { id: 'design', label: 'Design', price: 50, perUnit: false },
    { id: 'sleevePrint', label: 'Sleeve print', price: 3, perUnit: true },
    { id: 'rush', label: 'Rush', price: 0.3, percent: true },
  ],
};
