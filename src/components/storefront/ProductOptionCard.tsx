import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface ProductOptionCardProps {
  id: string;
  label: string;
  price: number | string;
  badge?: string | null;
  badgeStyleKey?: 'mostPopular' | 'bestValue' | 'starter' | 'highVisibility';
  bestFor: string;
  to: string;
  aspectRatio?: string;
  icon?: string;
}

const BADGE_STYLES: Record<string, string> = {
  mostPopular: 'bg-gold text-charcoal',
  bestValue: 'bg-gold/90 text-charcoal',
  starter: 'border border-gold/50 text-gold',
  highVisibility: 'border border-gold/30 text-gold',
  mostpopular: 'bg-gold text-charcoal',
  bestvalue: 'bg-gold/90 text-charcoal',
  highvisibility: 'border border-gold/30 text-gold',
};

export function ProductOptionCard({
  label,
  price,
  badge,
  badgeStyleKey,
  bestFor,
  to,
  aspectRatio = 'aspect-[4/3]',
  icon = '📋',
}: ProductOptionCardProps) {
  const { t } = useTranslation();
  const styleKey = badgeStyleKey ?? (badge ? (badge.toLowerCase().replace(/\s+/g, '') as keyof typeof BADGE_STYLES) : null);

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
                (styleKey && BADGE_STYLES[styleKey]) ?? 'bg-charcoal-50/50 text-gray-300'
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
          {t('common.startOrderBtn')}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
