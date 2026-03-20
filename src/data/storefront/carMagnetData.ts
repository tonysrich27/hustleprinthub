export const carMagnetStorefrontData = {
  id: 'car-magnets',
  name: 'Car Magnets',
  slug: 'car-magnets',
  description: 'Magnetic signs for vehicles',
  tagline: 'Car Magnets — Starting at $85',
  subcopy: 'Fast Turnaround Available',
  options: [
    {
      id: '12x18',
      label: '12×18 in (pair)',
      price: 85,
      badge: null as string | null,
      bestFor: 'Great for smaller vehicles and simple branding.',
    },
    {
      id: '18x24',
      label: '18×24 in (pair)',
      price: 110,
      badge: 'Most Popular' as const,
      bestFor: 'Best for trucks, vans, and maximum visibility.',
    },
    {
      id: 'business',
      label: 'Business Package',
      price: 135,
      badge: 'Best Value' as const,
      bestFor: 'Includes design and faster turnaround.',
    },
  ],
  addons: [
    { id: 'design', label: 'Design help', price: 25 },
    { id: 'rush', label: 'Rush', price: 30 },
  ],
};
