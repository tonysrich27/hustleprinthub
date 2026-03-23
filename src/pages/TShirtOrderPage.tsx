import { useTranslation } from 'react-i18next';
import { TShirtOrderBuilder } from '../features/t-shirts/TShirtOrderBuilder';

export function TShirtOrderPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 rounded-lg bg-gold/20 px-3 py-1.5 text-center text-sm font-bold text-gold">
            {t('order.tShirtsLive')}
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('order.tShirtsTitle')}
          </h1>
          <p className="mt-2 text-gray-400">
            {t('order.tShirtsSub')}
          </p>
        </div>
      </div>
      <TShirtOrderBuilder />
    </div>
  );
}
