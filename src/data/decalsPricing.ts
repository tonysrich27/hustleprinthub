/**
 * Decal packages by vehicle/use type
 */
export const decalsPricing = {
  packages: {
    logoBothSides: { price: 150, label: 'Logo Both Sides' },
    phoneNumber: { price: 25, label: 'Phone Number' },
    rearBranding: { price: 100, label: 'Rear Branding' },
    serviceList: { price: 125, label: 'Service List' },
    menu: { price: 200, label: 'Menu (Food Truck)' },
    qrCode: { price: 50, label: 'QR Code' },
  },
  vehicleTypes: {
    workVan: { label: 'Work Van', packages: ['logoBothSides', 'phoneNumber', 'rearBranding', 'serviceList'] },
    foodTruck: { label: 'Food Truck', packages: ['logoBothSides', 'phoneNumber', 'rearBranding', 'menu', 'qrCode'] },
    trailer: { label: 'Trailer', packages: ['logoBothSides', 'phoneNumber', 'rearBranding'] },
  },
  addons: {
    foodItemGraphics: 75,
    largerDecals: 50,
  },
} as const;
