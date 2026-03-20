export const WEBSITE_TYPE_OPTIONS = [
  { id: 'lead-funnel', label: 'Lead Funnel' },
  { id: 'business-website', label: 'Business Website' },
  { id: 'event-page', label: 'Event Page' },
  { id: 'food-truck-menu', label: 'Food Truck Menu Site' },
  { id: 'booking-site', label: 'Booking Site' },
] as const;

export const WEBSITE_PACKAGES = [
  {
    id: 'lead-funnel',
    name: 'Lead Funnel / Landing Page',
    setupPrice: 300,
    monthlyPrice: 100,
    monthlyLabel: 'Monthly hosting + automation',
    includes: [
      'Landing page design',
      'Lead capture form',
      'SMS/email automation',
      'Mobile optimization',
      'Contact database',
    ],
  },
  {
    id: 'business-website',
    name: 'Business Website',
    setupPrice: 600,
    setupPriceNote: '+',
    monthlyPrice: 100,
    monthlyLabel: 'Monthly maintenance',
    includes: [
      'Multi-page website',
      'Contact forms',
      'Mobile design',
      'Basic SEO setup',
      'Site maintenance',
    ],
  },
] as const;

export const WEBSITE_PRODUCT = {
  id: 'website-lead-funnel',
  name: 'Website & Lead Funnel Setup',
  slug: 'website-lead-funnel',
  description: 'A simple website designed to convert visitors into leads or customers.',
  icon: '🌐',
} as const;
