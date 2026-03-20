export const yardSignStorefrontData = {
  id: 'yard-signs',
  name: 'Yard Signs',
  slug: 'yard-signs',
  size: '24×18',
  description: 'Perfect for real estate, events, promotions, and business marketing.',
  tagline: 'Professional Yard Signs Starting at $8.50 Each',
  subcopy: 'Fast Turnaround Available',
  quantityTiers: [
    { min: 1, max: 1, price: 20, doubleAdd: 5 },
    { min: 2, max: 9, price: 15, doubleAdd: 5 },
    { min: 10, max: 30, price: 12, doubleAdd: 4 },
    { min: 50, max: Infinity, price: 8.5, doubleAdd: 3 },
  ],
  addons: [
    { id: 'stakes', label: 'Stakes', price: 2, perUnit: true },
    { id: 'gloss', label: 'Gloss finish', price: 4, perUnit: true },
    { id: 'rush', label: 'Rush', price: 25, perUnit: false },
    { id: 'design', label: 'Design help', price: 25, perUnit: false },
  ],
};
