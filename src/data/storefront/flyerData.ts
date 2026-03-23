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
      badgeKey: null as string | null,
      price: 65,
      bestFor: 'Great for small runs and testing your message.',
    },
    {
      id: '500',
      label: '500',
      badgeKey: 'mostPopular' as const,
      price: 85,
      bestFor: 'Best value for local marketing.',
    },
    {
      id: '1000',
      label: '1,000',
      badgeKey: null as string | null,
      price: 130,
      bestFor: 'Perfect for events and promotions.',
    },
    {
      id: '5000',
      label: '5,000',
      badgeKey: 'bestValue' as const,
      price: 225,
      bestFor: 'Maximum exposure at lowest cost.',
    },
  ],
  addons: [
    { id: 'design', label: 'Design help', price: 25 },
    { id: 'rush', label: 'Rush', price: 30 },
  ],
};
