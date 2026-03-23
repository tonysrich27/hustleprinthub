import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../../components/ui/CTAButton';
import { decalsStorefrontData } from '../../data/storefront/decalsData';

const PACKAGE_LABEL_KEYS: Record<string, string> = {
  basic: 'order.decalsBuilder.packagesBasic',
  workTruck: 'order.decalsBuilder.packagesWorkTruck',
  foodTruck: 'order.decalsBuilder.packagesFoodTruck',
};

export function DecalsOrderBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log('Decals quote request', { package: selectedPackage });
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-white">{t('order.decalsTitle')}</h1>
        <p className="mt-2 text-gray-400">{t('order.decalsSub')}</p>
        <p className="mt-1 text-gold font-medium">{t('home.fastTurnaround')}</p>
      </div>

      <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
        <h2 className="font-heading text-xl font-bold text-white">{t('order.decalsBuilder.packages')}</h2>
        <p className="mt-1 text-gray-400">{t('order.decalsBuilder.packagesSub')}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {decalsStorefrontData.packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              className={`rounded-xl border-2 p-5 text-left transition-all ${
                selectedPackage === pkg.id
                  ? 'border-gold bg-gold/10'
                  : 'border-charcoal-50/30 hover:border-gold/50'
              }`}
            >
              <span className="font-heading text-lg font-bold text-white">{t(PACKAGE_LABEL_KEYS[pkg.id] ?? pkg.label)}</span>
              <span className="mt-1 block text-lg font-semibold text-gold">${pkg.price}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-heading text-lg font-bold text-gold">{t('order.decalsBuilder.pricing')}</h3>
          <p className="mt-2 text-sm text-gray-400">
            {t('order.decalsBuilder.pricingNote')}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          {t('order.decalsBuilder.designNote')}
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButton variant="primary" onClick={handleSubmit}>
            {t('common.requestQuote')}
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
