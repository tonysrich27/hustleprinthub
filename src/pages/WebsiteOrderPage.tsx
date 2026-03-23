import { useTranslation } from 'react-i18next';
import { WebsiteOrderWizard } from '../features/website/WebsiteOrderWizard';

export function WebsiteOrderPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('order.websiteTitle')}
          </h1>
          <p className="mt-2 text-gray-400">
            {t('order.websiteSub')}
          </p>
        </div>
      </div>
      <WebsiteOrderWizard />
    </div>
  );
}
