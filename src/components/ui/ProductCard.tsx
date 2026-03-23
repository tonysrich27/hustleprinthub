import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  /** Optional link override — e.g. /category/signs for browse grid */
  to?: string;
}

export function ProductCard({ product, to }: ProductCardProps) {
  const { t } = useTranslation();
  const title = t(product.titleKey);
  const description = t(product.descriptionKey);
  const ctaLabel = product.ctaKey.startsWith('category.') ? t(product.ctaKey) : t(product.ctaKey);
  const linkTo = to ?? product.orderRoute;

  return (
    <Link
      to={linkTo}
      className="card-hover-gold group flex flex-col overflow-hidden rounded-xl border border-charcoal-50/40 bg-charcoal-100/50"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-charcoal-200/50">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl opacity-70 transition group-hover:scale-110 group-hover:opacity-100">
              {product.icon ?? '📋'}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-heading text-xl font-bold tracking-wide text-white md:text-2xl">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-gray-400">{description}</p>
        <span className="cta-premium mt-4 inline-flex w-fit items-center gap-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-charcoal hover:bg-gold-300">
          {ctaLabel}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
