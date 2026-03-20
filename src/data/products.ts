export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const PRODUCTS: Product[] = [
  { id: 'banners', name: 'Banners', slug: 'banners', description: 'Vinyl banners for events, promotions, and signage', icon: '📋' },
  { id: 'yard-signs', name: 'Yard Signs', slug: 'yard-signs', description: 'Coroplast and metal yard signs for real estate, events', icon: '🏠' },
  { id: 'decals', name: 'Decals', slug: 'decals', description: 'Vinyl decals for windows, walls, and vehicles', icon: '✨' },
  { id: 't-shirts', name: 'T-Shirts', slug: 't-shirts', description: 'Custom printed tees for events and merch', icon: '👕' },
  { id: 'flyers', name: 'Flyers', slug: 'flyers', description: 'Flyers and handbills for promotions', icon: '📄' },
  { id: 'promo-materials', name: 'Promo Materials', slug: 'promo-materials', description: 'Pens, stickers, and branded giveaways', icon: '🎁' },
  { id: 'food-truck-graphics', name: 'Food Truck Graphics', slug: 'food-truck-graphics', description: 'Full wrap and partial graphics for food trucks', icon: '🚚' },
  { id: 'event-graphics', name: 'Event Graphics', slug: 'event-graphics', description: 'Backdrops, step-and-repeat, event signage', icon: '🎪' },
];
