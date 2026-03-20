export const PRODUCT_ORDER_ROUTES: Record<string, string> = {
  banners: '/order/banners',
  'yard-signs': '/order/yard-signs',
  flyers: '/order/flyers',
  't-shirts': '/order/t-shirts',
  'car-magnets': '/order/car-magnets',
  decals: '/order/decals',
};

export function getOrderUrl(productSlug: string): string {
  return PRODUCT_ORDER_ROUTES[productSlug] ?? `/order?product=${productSlug}`;
}
