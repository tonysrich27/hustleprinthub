import { useTranslation } from 'react-i18next';

interface ProductHeroSectionProps {
  productName: string;
  heroImage?: string;
  badge?: 'bestSeller' | 'nextDayReady' | 'startingAt';
  badgeValue?: string;
}

export function ProductHeroSection({
  productName,
  heroImage,
  badge,
  badgeValue,
}: ProductHeroSectionProps) {
  const { t } = useTranslation();
  const badgeLabel = badge === 'startingAt' && badgeValue
    ? t('productHero.startingAt', { price: badgeValue })
    : badge === 'bestSeller'
    ? t('productHero.bestSeller')
    : badge === 'nextDayReady'
    ? t('productHero.nextDayReady')
    : null;

  return (
    <section className="relative overflow-hidden rounded-xl border border-charcoal-50/30">
      <div className="aspect-[21/9] w-full bg-charcoal-200/50">
        {heroImage && (
          <img
            src={heroImage}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
          {productName}
        </h1>
        {badgeLabel && (
          <span className="mt-2 inline-block rounded-lg border border-gold/50 bg-charcoal/80 px-3 py-1 text-sm font-semibold text-gold backdrop-blur-sm">
            {badgeLabel}
          </span>
        )}
      </div>
    </section>
  );
}
