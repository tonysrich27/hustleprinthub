export const flyerStorefrontData = {
  id: 'flyers',
  name: 'Flyers',
  slug: 'flyers',
  description: 'Flyers and handbills for promotions',
  tagline: 'Quality Flyers — Starting at $65',
  subcopy: 'Fast Turnaround Available',
  options: [
    {
      id: '250',
      label: '250',
      price: 65,
      badge: null as string | null,
      bestFor: 'Great for small runs and testing your message.',
    },
    {
      id: '500',
      label: '500',
      price: 85,
      badge: 'Most Popular' as const,
      bestFor: 'Best value for local marketing.',
    },
    {
      id: '1000',
      label: '1,000',
      price: 130,
      badge: null as string | null,
      bestFor: 'Perfect for events and promotions.',
    },
    {
      id: '5000',
      label: '5,000',
      price: 225,
      badge: 'Best Value' as const,
      bestFor: 'Maximum exposure at lowest cost.',
    },
  ],
  addons: [
    { id: 'design', label: 'Design help', price: 25 },
    { id: 'rush', label: 'Rush', price: 30 },
  ],
};
