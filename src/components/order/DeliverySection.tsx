import { useTranslation } from 'react-i18next';

interface DeliverySectionProps {
  className?: string;
}

export function DeliverySection({ className = '' }: DeliverySectionProps) {
  const { t } = useTranslation();
  return (
    <div className={`rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-5 md:p-6 ${className}`.trim()}>
      <h3 className="font-heading text-sm font-bold tracking-wide text-gold">
        {t('delivery.title')}
      </h3>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-gray-300">{t('delivery.sameDayLabel')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🚚</span>
          <span className="text-gray-300">{t('delivery.nextDayLabel')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">📍</span>
          <span className="text-gray-300">{t('delivery.localPickup')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">📦</span>
          <span className="text-gray-300">{t('delivery.nationwideShipping')}</span>
        </div>
      </div>
    </div>
  );
}
