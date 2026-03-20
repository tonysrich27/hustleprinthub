export const decalsStorefrontData = {
  id: 'decals',
  name: 'Decals',
  slug: 'decals',
  description: 'Custom decals for vehicles, branding, and promotions.',
  tagline: 'Vinyl Decals — $8.50/sq ft',
  subcopy: 'Fast Turnaround Available',
  basePrice: 8.5,
  packages: [
    { id: 'basic', label: 'Basic Kit', price: 150 },
    { id: 'workTruck', label: 'Work Truck', price: 300 },
    { id: 'foodTruck', label: 'Food Truck', price: 600 },
  ],
  addons: [
    { id: 'laminate', label: 'Laminate', price: 1.5, perSqFt: true },
    { id: 'contourCut', label: 'Contour cut', price: 0.15, percent: true },
    { id: 'rush', label: 'Rush', price: 0.5, percent: true },
  ],
};
