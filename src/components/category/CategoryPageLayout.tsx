import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { CategoryPageData } from '../../data/categoryPages';
import { isVideoPath, posterForVideo } from '../../lib/media';

interface CategoryPageLayoutProps {
  category: CategoryPageData;
}

function GalleryItem({ src, alt }: { src: string; alt: string }) {
  const video = isVideoPath(src);
  if (video) {
    return (
      <video
        src={src}
        poster={posterForVideo(src)}
        controls
        playsInline
        preload="metadata"
        className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.03]"
    />
  );
}

export function CategoryPageLayout({ category }: CategoryPageLayoutProps) {
  const { t } = useTranslation();
  const title = t(category.titleKey);
  const description = t(category.descriptionKey);
  const ctaLabel = t(category.ctaKey);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="aspect-[16/9] w-full md:aspect-[21/9]">
          <img
            src={category.heroImage}
            alt={title}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h1 className="font-heading text-4xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-300">{description}</p>
            <Link
              to={category.orderRoute}
              className="cta-premium mt-6 inline-flex rounded-lg bg-gold px-6 py-3 font-bold text-charcoal hover:bg-gold-300"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {category.galleryImages.length > 0 && (
        <section className="border-t border-charcoal-50/30 bg-charcoal-400/30 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-heading mb-8 text-2xl font-bold tracking-wide text-white md:text-3xl">
              {t('category.gallery')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.galleryImages.map((src, i) => (
                <div
                  key={src}
                  className="group overflow-hidden rounded-xl border border-charcoal-50/30 shadow-md transition hover:border-gold/50"
                >
                  <GalleryItem src={src} alt={t('category.galleryImageAlt', { product: title, num: i + 2 })} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-charcoal-50/30 bg-charcoal-400 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('category.readyToOrder')}
          </h2>
          <p className="mt-3 text-gray-400">{t('category.readyDesc', { product: title.toLowerCase() })}</p>
          <Link
            to={category.orderRoute}
            className="cta-premium mt-6 inline-flex rounded-lg bg-gold px-6 py-3 font-bold text-charcoal hover:bg-gold-300"
          >
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
