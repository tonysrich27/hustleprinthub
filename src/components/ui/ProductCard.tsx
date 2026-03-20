import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border-2 border-charcoal-50/30 bg-charcoal-100/50 p-6 transition hover:border-gold/50 hover:bg-charcoal-50/30 md:p-8">
      <span className="mb-4 text-4xl">{product.icon}</span>
      <h3 className="font-heading text-2xl font-bold tracking-wide text-white">
        {product.name}
      </h3>
      <p className="mt-2 text-gray-400">{product.description}</p>
      <Link
        to={
          product.slug === 'banners'
            ? '/order/banners'
            : product.slug === 'yard-signs'
              ? '/order/yard-signs'
              : `/order?product=${product.slug}`
        }
        className="mt-6 inline-flex w-fit rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-300"
      >
        Start Order
      </Link>
    </div>
  );
}
