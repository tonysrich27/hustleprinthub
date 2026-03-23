import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OrderWizard } from '../features/order/OrderWizard';
import { PRODUCT_ORDER_ROUTES } from '../data/productRoutes';

export function OrderPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product');

  useEffect(() => {
    const redirect = product ? PRODUCT_ORDER_ROUTES[product] : null;
    if (redirect) navigate(redirect, { replace: true });
  }, [product, navigate]);

  if (product && PRODUCT_ORDER_ROUTES[product]) return null;

  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('order.title')}
          </h1>
          <p className="mt-2 text-gray-400">
            {t('order.intro')}
          </p>
        </div>
      </div>
      <OrderWizard />
    </div>
  );
}
