import { useTranslation } from 'react-i18next';
import { CarMagnetOrderBuilder } from '../features/car-magnets/CarMagnetOrderBuilder';

export function CarMagnetOrderPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('order.carMagnetsTitle')}
          </h1>
          <p className="mt-2 text-gray-400">
            {t('order.carMagnetsSub')}
          </p>
        </div>
      </div>
      <CarMagnetOrderBuilder />
    </div>
  );
}
