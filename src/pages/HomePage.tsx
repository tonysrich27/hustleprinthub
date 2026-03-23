import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { SectionDivider } from '../components/ui/SectionDivider';
import { ProductCard } from '../components/ui/ProductCard';
import { WebsiteProductCard } from '../components/ui/WebsiteProductCard';
import { CTAButton } from '../components/ui/CTAButton';
import { ProductOptionCard } from '../components/storefront/ProductOptionCard';
import { PRODUCTS, PRODUCTS_WITH_IMAGES } from '../data/products';
import { PRODUCT_ORDER_ROUTES } from '../data/productRoutes';
import { bannerStorefrontData } from '../data/storefront/bannerData';
import { flyerStorefrontData } from '../data/storefront/flyerData';
import { carMagnetStorefrontData } from '../data/storefront/carMagnetData';
import { popularOffers } from '../data/storefront/popularOffers';
import { yardSignStorefrontData } from '../data/storefront/yardSignData';
import { tShirtStorefrontData } from '../data/storefront/tShirtData';
import { decalsStorefrontData } from '../data/storefront/decalsData';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Deployment verification - quick links to updated pages */}
      <div className="bg-gold/10 border-b border-gold/30 px-4 py-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 text-sm">
          <span className="font-semibold text-gold">{t('home.updatedPages')}</span>
          <Link to="/order/vehicle-wraps" className="text-white underline hover:text-gold">
            {t('home.vehicleWraps')}
          </Link>
          <Link to="/order/decals" className="text-white underline hover:text-gold">
            {t('home.decals')}
          </Link>
          <Link to="/order/t-shirts" className="text-white underline hover:text-gold">
            {t('home.apparel')}
          </Link>
        </div>
      </div>

      {/* Hero - banner image background */}
      <section className="relative min-h-[85vh] overflow-hidden px-4 py-24 md:py-32 texture-overlay">
        <div className="absolute inset-0 bg-charcoal" />
        <img
          src={PRODUCTS_WITH_IMAGES.find((p) => p.slug === 'banners')?.thumbnail ?? '/images/banners/banner-outdoor.jpg'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-radial-gold-strong" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-400/30 to-charcoal" />
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />

        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="font-heading text-5xl font-bold tracking-[0.12em] text-white opacity-0 animate-fade-in-up md:text-6xl lg:text-7xl xl:text-8xl">
            {t('home.hero1')}
          </h1>
          <h1 className="font-heading mt-2 text-5xl font-bold tracking-[0.12em] text-gold opacity-0 animate-fade-in-delay-1 md:text-6xl lg:text-7xl xl:text-8xl">
            {t('home.hero2')}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 opacity-0 animate-fade-in-delay-2 md:text-xl">
            {t('home.heroSub')}
          </p>
          <p className="mt-3 text-gold font-semibold opacity-0 animate-fade-in-delay-3">{t('home.fastTurnaround')}</p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3 sm:flex-row">
            <CTAButton to="/order" variant="primary">
              {t('home.startYourOrder')}
            </CTAButton>
            <CTAButton to="/sponsor" variant="secondary">
              {t('common.becomeSponsor')}
            </CTAButton>
          </div>
        </div>
      </section>

      <SectionDivider thick />

      {/* Category grid - ProductCard with thumbnails, links to category pages */}
      <Section title={t('home.browseProducts')} subtitle={t('home.browseProductsSub')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS_WITH_IMAGES.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              to={`/category/${product.slug}`}
              ctaKey="common.viewDetails"
            />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Popular Offers */}
      <Section title={t('home.popularOffers')} subtitle={t('home.popularOffersSub')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {popularOffers.map((offer) => (
            <Link
              key={offer.labelKey}
              to={offer.to}
              className="card-hover-gold group flex flex-col rounded-xl border border-charcoal-50/40 bg-charcoal-100/60 p-5 backdrop-blur-sm"
            >
              <span className="font-heading text-lg font-bold tracking-wide text-white">{t(`popularOffers.${offer.labelKey}`)}</span>
              <span className="mt-1 text-xl font-bold text-gold">
                {typeof offer.price === 'number' ? `$${offer.price}` : offer.price}
              </span>
              <span className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold text-gold transition-all group-hover:gap-2 group-hover:text-gold-300">
                {t('common.orderNow')} <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Banners */}
      <Section title={t('home.banners')} subtitle={t('home.bannersSub')}>
        <div className="mb-8">
          <h3 className="mb-4 font-heading text-lg font-bold tracking-wide text-gold">{t('home.chooseSize')}</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bannerStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={t(`storefront.banner.options.${opt.id}.label`)}
                price={opt.price}
                badge={opt.badgeKey ? t(`storefront.banner.badges.${opt.badgeKey}`) : null}
                badgeStyleKey={opt.badgeKey ?? undefined}
                bestFor={t(`storefront.banner.options.${opt.id}.bestFor`)}
                to="/order/banners"
                icon="🪧"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold tracking-wide text-gold">{t('home.popularOptions')}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {bannerStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/40 bg-charcoal-100/40 px-3 py-1.5">
                {t(`storefront.banner.addons.${a.id}`)} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Yard Signs */}
      <Section title={t('home.yardSigns')} subtitle={t('home.yardSignsBestFor')}>
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">{t('home.bestUseCase')}</h3>
          <p className="text-gray-400">{t('home.yardSignsBestFor')}</p>
        </div>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xl font-bold tracking-wide text-white">{t('home.startingAt')}</p>
              <p className="mt-1 text-sm text-gray-400">{t('home.volumeDiscounts')}</p>
            </div>
            <CTAButton to="/order/yard-signs" variant="primary">
              {t('common.startOrderBtn')}
            </CTAButton>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">{t('home.popularOptions')}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {yardSignStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {t(`storefront.yardSign.addons.${a.id}`)} <span className="font-semibold text-gold">+${a.price}{a.perUnit ? t('common.perSign') : ''}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Flyers */}
      <Section title={t('home.flyers')} subtitle={t('home.flyersSub')}>
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">{t('home.chooseSize')}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flyerStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={t('home.flyersLabel', { count: opt.label })}
                price={opt.price}
                badge={opt.badgeKey ? t(`storefront.flyer.badges.${opt.badgeKey}`) : null}
                badgeStyleKey={opt.badgeKey ?? undefined}
                bestFor={t(`storefront.flyer.options.${opt.id}.bestFor`)}
                to="/order/flyers"
                icon="📄"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">{t('home.popularOptions')}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {flyerStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {t(`storefront.flyer.addons.${a.id}`)} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* T-Shirts */}
      <Section title={t('home.tShirts')} subtitle={t('home.tShirtsDescription')}>
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">{t('home.startingAt15')}</h3>
          <p className="text-gray-400">{t('home.tShirtsPricing')}</p>
        </div>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xl font-bold tracking-wide text-white">{t('home.min15Shirts')}</p>
              <p className="mt-1 text-sm text-gray-400">{t('home.tShirtsAddons')}</p>
            </div>
            <CTAButton to="/order/t-shirts" variant="primary">
              {t('common.startOrderBtn')}
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Car Magnets */}
      <Section title={t('home.carMagnets')} subtitle={t('home.carMagnetsSub')}>
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">{t('home.chooseOption')}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {carMagnetStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={t(`storefront.carMagnet.options.${opt.id}.label`)}
                price={opt.price}
                badge={opt.badgeKey ? t(`storefront.carMagnet.badges.${opt.badgeKey}`) : null}
                badgeStyleKey={opt.badgeKey ?? undefined}
                bestFor={t(`storefront.carMagnet.options.${opt.id}.bestFor`)}
                to="/order/car-magnets"
                icon="🧲"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">{t('home.popularOptions')}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {carMagnetStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {t(`storefront.carMagnet.addons.${a.id}`)} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Decals */}
      <Section title={t('home.decals')} subtitle={t('home.decalsSub')}>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <p className="font-heading text-xl font-bold tracking-wide text-white">{t('home.decalsPricing')}</p>
          <p className="mt-1 text-gray-400">{t('home.decalsPackages')}</p>
          <div className="mt-4">
            <CTAButton to="/order/decals" variant="primary">
              {t('common.requestQuote')}
            </CTAButton>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Vehicle Wraps */}
      <Section title={t('home.vehicleWrapsTitle')} subtitle={t('home.vehicleWrapsSub')}>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <p className="font-heading text-xl font-bold tracking-wide text-white">{t('home.instantCalculator')}</p>
          <p className="mt-1 text-gray-400">{t('home.vehicleWrapsPricing')}</p>
          <p className="mt-2 text-sm text-gold">{t('home.vehicleWrapsAddons')}</p>
          <div className="mt-4">
            <CTAButton to="/order/vehicle-wraps" variant="primary">
              {t('common.getQuote')}
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* What We Print */}
      <Section title={t('home.whatWePrint')} subtitle={t('home.whatWePrintSub')}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => PRODUCT_ORDER_ROUTES[p.orderSlug]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* Websites */}
      <Section title={t('home.websites')} subtitle={t('home.websitesSub')}>
        <div className="grid gap-4 lg:grid-cols-2">
          <WebsiteProductCard />
        </div>
      </Section>

      {/* How It Works */}
      <Section title={t('home.howItWorks')} subtitle={t('home.howItWorksSub')}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">1</span>
            <h3 className="font-heading text-xl font-bold text-white">{t('home.step1Title')}</h3>
            <p className="mt-2 text-gray-400">{t('home.step1Desc')}</p>
          </div>
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">2</span>
            <h3 className="font-heading text-xl font-bold text-white">{t('home.step2Title')}</h3>
            <p className="mt-2 text-gray-400">{t('home.step2Desc')}</p>
          </div>
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">3</span>
            <h3 className="font-heading text-xl font-bold text-white">{t('home.step3Title')}</h3>
            <p className="mt-2 text-gray-400">{t('home.step3Desc')}</p>
          </div>
        </div>
      </Section>

      {/* Sponsor */}
      <Section title={t('home.sponsorTitle')} subtitle={t('home.sponsorSub')}>
        <div className="rounded-xl border-2 border-gold/40 bg-gold/10 p-8 text-center shadow-gold md:p-12">
          <p className="text-lg text-gray-300 md:text-xl">
            {t('home.sponsorBody')}
          </p>
          <div className="mt-6">
            <CTAButton to="/sponsor" variant="primary">
              {t('common.becomeSponsor')}
            </CTAButton>
          </div>
        </div>
      </Section>

      <SectionDivider thick />

      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal-400 px-4 py-20 texture-overlay">
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-[0.08em] text-white md:text-4xl lg:text-5xl">{t('home.ctaTitle')}</h2>
          <p className="mt-4 text-gray-400">{t('home.ctaSub')}</p>
          <p className="mt-2 text-sm text-gold">{t('home.ctaDesign')}</p>
          <div className="mt-8">
            <CTAButton to="/order" variant="primary">
              {t('home.startYourOrder')}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
