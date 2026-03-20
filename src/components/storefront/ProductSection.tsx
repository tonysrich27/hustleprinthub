import { type ReactNode } from 'react';
import { Section } from '../ui/Section';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  addons?: { label: string; price: number | string }[];
}

export function ProductSection({
  title,
  subtitle,
  children,
  addons,
}: ProductSectionProps) {
  return (
    <Section title={title} subtitle={subtitle}>
      <div className="space-y-8">
        <div>{children}</div>
        {addons && addons.length > 0 && (
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-gold">
              Popular Options
            </h3>
            <ul className="flex flex-wrap gap-2">
              {addons.map((addon) => (
                <li
                  key={addon.label}
                  className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-2 text-sm text-gray-400"
                >
                  {addon.label}{' '}
                  <span className="font-semibold text-gold">
                    +{typeof addon.price === 'number' ? `$${addon.price}` : addon.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
