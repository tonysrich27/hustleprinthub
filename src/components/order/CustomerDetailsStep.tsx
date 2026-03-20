import { type ChangeEvent } from 'react';

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface CustomerDetailsStepProps {
  customer: CustomerDetails;
  onChange: (customer: CustomerDetails) => void;
}

export function CustomerDetailsStep({ customer, onChange }: CustomerDetailsStepProps) {
  const handleChange = (field: keyof CustomerDetails) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...customer, [field]: e.target.value });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white">Your Details</h2>
      <p className="mt-2 text-gray-400">We'll reach out to confirm your order.</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Name *</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={customer.name}
            onChange={handleChange('name')}
            className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Email *</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={customer.email}
            onChange={handleChange('email')}
            className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Phone</label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={customer.phone}
            onChange={handleChange('phone')}
            className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Notes</label>
          <textarea
            rows={3}
            placeholder="Any special requests or details..."
            value={customer.notes}
            onChange={handleChange('notes')}
            className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>
    </div>
  );
}
