import { Link } from 'react-router-dom';

export interface ProductOptionCardProps {
  id: string;
  label: string;
  price: number | string;
  badge?: 'Most Popular' | 'Best Value' | 'Starter' | 'High Visibility' | string | null;
  bestFor: string;
  to: string;
  aspectRatio?: string;
  icon?: string;
}

const BADGE_STYLES: Record<string, string> = {
  'Most Popular': 'bg-gold text-charcoal',
  'Best Value': 'bg-gold/90 text-charcoal',
  'Starter': 'border border-gold/50 text-gold',
  'High Visibility': 'border border-gold/30 text-gold',
};

export function ProductOptionCard({
  label,
  price,
  badge,
  bestFor,
  to,
  aspectRatio = 'aspect-[4/3]',
  icon = '📋',
}: ProductOptionCardProps) {
  return (
    <Link
      to={to}
      className="card-hover-gold group flex flex-col overflow-hidden rounded-xl border border-charcoal-50/40 bg-charcoal-100/50"
    >
      <div
        className={`${aspectRatio} flex items-center justify-center bg-gradient-to-br from-charcoal-50/20 to-charcoal-400/60 transition group-hover:from-gold/10 group-hover:to-charcoal-400/60`}
      >
        <span className="text-4xl opacity-70 transition duration-300 group-hover:scale-110 group-hover:opacity-100">{icon}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="font-heading text-lg font-bold tracking-wide text-white">{label}</span>
          {badge && (
            <span
              className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                BADGE_STYLES[badge] ?? 'bg-charcoal-50/50 text-gray-300'
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gold">
          {typeof price === 'number' ? `$${price}` : price}
        </p>
        <p className="mt-2 text-sm text-gray-400">{bestFor}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-gold transition-all group-hover:gap-2 group-hover:text-gold-300">
          Start Order
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
