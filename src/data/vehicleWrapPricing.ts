/**
 * Vehicle Wrap pricing
 * Labor = $7/sq ft
 * Material = $530 per 75ft roll (~$7.07/ft, use ~$7 for simplicity)
 * Total base ≈ $14/sq ft (labor + material)
 */
export const vehicleWrapPricing = {
  vehicles: {
    sedan: { sqFt: 225, label: 'Sedan' },
    suv: { sqFt: 275, label: 'SUV' },
    truck: { sqFt: 275, label: 'Truck' },
    cargoVan: { sqFt: 325, label: 'Cargo Van' },
    foodTruck: { sqFt: 400, label: 'Food Truck' },
    trailer7x14: { sqFt: 350, label: 'Trailer 7×14' },
    trailer8x16: { sqFt: 450, label: 'Trailer 8×16' },
    trailer8x20: { sqFt: 500, label: 'Trailer 8×20' },
  },
  wrapTypes: {
    full: { multiplier: 1, label: 'Full wrap' },
    partial: { multiplier: 0.6, label: 'Partial wrap' },
    colorChange: { multiplier: 1.2, label: 'Color change' },
  },
  laborPerSqFt: 7,
  materialPerSqFt: 7,
  addons: {
    fullColorUpgrade: 600,
    removal: 300,
    ceramicCoating: 200,
    rush: 300,
  },
  decalKits: {
    none: { price: 0, label: 'No branding' },
    basic: { price: 350, label: 'Basic Decal Kit', items: ['Logo both sides', 'Phone number', 'Rear branding'] },
    full: { price: 650, label: 'Full Business Kit', items: ['Logo both sides', 'Phone number', 'Website', 'Service list', 'QR code'] },
    custom: { price: 0, label: 'Custom', items: ['Quote required'] },
  },
} as const;

export type VehicleKey = keyof typeof vehicleWrapPricing.vehicles;
export type WrapTypeKey = keyof typeof vehicleWrapPricing.wrapTypes;
export type DecalKitKey = keyof typeof vehicleWrapPricing.decalKits;
