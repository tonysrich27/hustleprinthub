import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DeliverySection } from '../order/DeliverySection';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-charcoal-50/30 bg-charcoal-400">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <DeliverySection />
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <p className="mb-4 mt-8 text-center text-sm text-gray-400">
          <span className="font-heading font-bold tracking-widest text-gold">{t('common.brand')}</span>
          <span className="mx-2">—</span>
          <span>{t('common.footerTagline')}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link to="/" className="font-medium transition hover:text-gold">{t('common.home')}</Link>
          <Link to="/order" className="font-medium transition hover:text-gold">{t('common.order')}</Link>
          <Link to="/sponsor" className="font-medium transition hover:text-gold">{t('common.sponsor')}</Link>
        </div>
        <p className="mt-8 text-center text-xs text-gray-600">
          {t('common.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
