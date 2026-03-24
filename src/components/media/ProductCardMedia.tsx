import { useState } from 'react';
import { useInViewOnce } from './useInViewOnce';
import { cardVideoForSlug } from '../../lib/media';
import type { Product } from '../../data/products';

interface ProductCardMediaProps {
  product: Product;
  title: string;
}

export function ProductCardMedia({ product, title }: ProductCardMediaProps) {
  const { ref, visible } = useInViewOnce('80px');
  const cardVid = cardVideoForSlug(product.slug);
  const [videoFailed, setVideoFailed] = useState(false);

  const playVideo = Boolean(cardVid && visible && !videoFailed);

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-200/50">
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.05] ${playVideo ? 'opacity-0' : 'opacity-100'}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-5xl opacity-70 transition group-hover:scale-110 group-hover:opacity-100">
            {product.icon ?? '📋'}
          </span>
        </div>
      )}

      {playVideo && cardVid ? (
        <>
          <video
            src={cardVid.video}
            poster={cardVid.poster}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            aria-label={title}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent" />
        </>
      ) : null}
    </div>
  );
}
