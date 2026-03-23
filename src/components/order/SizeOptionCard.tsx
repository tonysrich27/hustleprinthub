import type { ReactNode } from 'react';

interface SizeOptionCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  price: string | number;
  badge?: 'mostPopular' | 'bestSeller';
  helper?: ReactNode;
  sizeRefImage?: string;
}

const BADGE_STYLES = {
  mostPopular: 'bg-gold text-charcoal',
  bestSeller: 'border border-gold/50 text-gold',
};

export function SizeOptionCard({
  selected,
  onClick,
  label,
  price,
  badge,
  helper,
  sizeRefImage,
}: SizeOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full flex-col overflow-hidden rounded-xl border-2 p-5 text-left transition-all ${
        selected
          ? 'border-gold bg-gold/10 shadow-lg'
          : 'border-charcoal-50/30 hover:border-gold/50 hover:bg-charcoal-50/20'
      }`}
    >
      {sizeRefImage && (
        <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg bg-charcoal-200/50">
          <img
            src={sizeRefImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-heading text-lg font-bold text-white">{label}</span>
          {badge && (
            <span
              className={`ml-2 inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                BADGE_STYLES[badge]
              }`}
            >
              {badge === 'mostPopular' ? 'Most Popular' : 'Best Seller'}
            </span>
          )}
        </div>
        <span className="text-lg font-bold text-gold">
          {typeof price === 'number' ? `$${price}` : price}
        </span>
      </div>
      {helper && <div className="mt-2 text-sm text-gray-400">{helper}</div>}
    </button>
  );
}
