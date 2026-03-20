export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const PRODUCTS: Product[] = [
  { id: 'banners', name: 'Banners', slug: 'banners', description: 'Vinyl banners for events, promotions, and signage', icon: '🪧' },
  { id: 'yard-signs', name: 'Yard Signs', slug: 'yard-signs', description: '24×18 yard signs for real estate, events', icon: '🏠' },
  { id: 'flyers', name: 'Flyers', slug: 'flyers', description: 'Flyers and handbills for promotions', icon: '📄' },
  { id: 't-shirts', name: 'T-Shirts', slug: 't-shirts', description: 'Custom printed tees — minimum 15', icon: '👕' },
  { id: 'car-magnets', name: 'Car Magnets', slug: 'car-magnets', description: 'Magnetic signs for vehicles', icon: '🧲' },
  { id: 'decals', name: 'Decals', slug: 'decals', description: 'Vinyl decals for vehicles and branding', icon: '✨' },
  { id: 'vehicle-wraps', name: 'Vehicle Wraps', slug: 'vehicle-wraps', description: 'Full and partial vehicle wraps', icon: '🚗' },
  { id: 'promo-materials', name: 'Promo Materials', slug: 'promo-materials', description: 'Pens, stickers, and branded giveaways', icon: '🎁' },
  { id: 'food-truck-graphics', name: 'Food Truck Graphics', slug: 'food-truck-graphics', description: 'Full wrap and partial graphics for food trucks', icon: '🚚' },
  { id: 'event-graphics', name: 'Event Graphics', slug: 'event-graphics', description: 'Backdrops, step-and-repeat, event signage', icon: '🎪' },
];
