import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import { getOrderUrl } from '../../data/productRoutes';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const name = t(`products.${product.slug}.name`, product.name);
  const description = t(`products.${product.slug}.description`, product.description);

  return (
    <div className="card-hover-gold group flex flex-col rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 md:p-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-charcoal-50/30 text-4xl ring-1 ring-charcoal-50/20 transition group-hover:bg-gold/10 group-hover:ring-gold/30">
        {product.icon}
      </div>
      <h3 className="font-heading text-2xl font-bold tracking-wide text-white">
        {name}
      </h3>
      <p className="mt-2 text-gray-400">{description}</p>
      <Link
        to={getOrderUrl(product.slug)}
        className="cta-premium mt-6 inline-flex w-fit rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-charcoal hover:bg-gold-300"
      >
        {t('common.startOrderBtn')}
      </Link>
    </div>
  );
}
