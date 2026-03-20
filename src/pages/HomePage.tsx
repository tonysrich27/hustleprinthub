import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { SectionDivider } from '../components/ui/SectionDivider';
import { ProductCard } from '../components/ui/ProductCard';
import { WebsiteProductCard } from '../components/ui/WebsiteProductCard';
import { CTAButton } from '../components/ui/CTAButton';
import { ProductOptionCard } from '../components/storefront/ProductOptionCard';
import { PRODUCTS } from '../data/products';
import { PRODUCT_ORDER_ROUTES } from '../data/productRoutes';
import { bannerStorefrontData } from '../data/storefront/bannerData';
import { flyerStorefrontData } from '../data/storefront/flyerData';
import { carMagnetStorefrontData } from '../data/storefront/carMagnetData';
import { popularOffers } from '../data/storefront/popularOffers';
import { yardSignStorefrontData } from '../data/storefront/yardSignData';
import { tShirtStorefrontData } from '../data/storefront/tShirtData';
import { decalsStorefrontData } from '../data/storefront/decalsData';

export function HomePage() {
  return (
    <>
      {/* Deployment verification - quick links to updated pages */}
      <div className="bg-gold/10 border-b border-gold/30 px-4 py-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 text-sm">
          <span className="font-semibold text-gold">Updated pages:</span>
          <Link to="/order/vehicle-wraps" className="text-white underline hover:text-gold">
            Vehicle Wraps
          </Link>
          <Link to="/order/decals" className="text-white underline hover:text-gold">
            Decals
          </Link>
          <Link to="/order/t-shirts" className="text-white underline hover:text-gold">
            Apparel
          </Link>
        </div>
      </div>

      {/* Hero - Dramatic, cinematic */}
      <section className="relative min-h-[85vh] overflow-hidden px-4 py-24 md:py-32 texture-overlay">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-gradient-radial-gold-strong" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-400/30 to-charcoal" />
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />

        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="font-heading text-5xl font-bold tracking-[0.12em] text-white opacity-0 animate-fade-in-up md:text-6xl lg:text-7xl xl:text-8xl">
            PRINT FAST.
          </h1>
          <h1 className="font-heading mt-2 text-5xl font-bold tracking-[0.12em] text-gold opacity-0 animate-fade-in-delay-1 md:text-6xl lg:text-7xl xl:text-8xl">
            PROMOTE SMARTER.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 opacity-0 animate-fade-in-delay-2 md:text-xl">
            Banners, signs, decals, apparel and promo materials for hustlers, creators and businesses.
          </p>
          <p className="mt-3 text-gold font-semibold opacity-0 animate-fade-in-delay-3">Fast Turnaround Available</p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3 sm:flex-row">
            <CTAButton to="/order" variant="primary">
              Start Your Order
            </CTAButton>
            <CTAButton to="/sponsor" variant="secondary">
              Become a Sponsor
            </CTAButton>
          </div>
        </div>
      </section>

      <SectionDivider thick />

      {/* Popular Offers */}
      <Section title="Popular Offers" subtitle="Quick options for common needs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {popularOffers.map((offer) => (
            <Link
              key={offer.label}
              to={offer.to}
              className="card-hover-gold group flex flex-col rounded-xl border border-charcoal-50/40 bg-charcoal-100/60 p-5 backdrop-blur-sm"
            >
              <span className="font-heading text-lg font-bold tracking-wide text-white">{offer.label}</span>
              <span className="mt-1 text-xl font-bold text-gold">
                {typeof offer.price === 'number' ? `$${offer.price}` : offer.price}
              </span>
              <span className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold text-gold transition-all group-hover:gap-2 group-hover:text-gold-300">
                Order Now <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Banners */}
      <Section
        title="Banners"
        subtitle="Choose your size — high-quality outdoor banners. Upload your design or let us create it for you."
      >
        <div className="mb-8">
          <h3 className="mb-4 font-heading text-lg font-bold tracking-wide text-gold">Choose Your Size</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bannerStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={opt.label}
                price={opt.price}
                badge={opt.badge}
                bestFor={opt.bestFor}
                to={`/order/banners`}
                icon="🪧"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold tracking-wide text-gold">Popular Options</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {bannerStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/40 bg-charcoal-100/40 px-3 py-1.5">
                {a.label} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Yard Signs */}
      <Section
        title="Yard Signs (24×18)"
        subtitle={yardSignStorefrontData.description}
      >
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">Best Use Case</h3>
          <p className="text-gray-400">Perfect for real estate, events, promotions, and business marketing.</p>
        </div>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xl font-bold tracking-wide text-white">Starting at $8.50 each</p>
              <p className="mt-1 text-sm text-gray-400">Volume discounts: 1 = $20, 10 = $12 each, 50+ = $8.50 each</p>
            </div>
            <CTAButton to="/order/yard-signs" variant="primary">
              Start Order
            </CTAButton>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">Popular Options</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {yardSignStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {a.label} <span className="font-semibold text-gold">+${a.price}{a.perUnit ? '/sign' : ''}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Flyers */}
      <Section
        title="Flyers"
        subtitle="Quality flyers for promotions. Upload your design or let us create it for you."
      >
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">Choose Your Size</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flyerStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={`${opt.label} flyers`}
                price={opt.price}
                badge={opt.badge}
                bestFor={opt.bestFor}
                to="/order/flyers"
                icon="📄"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">Popular Options</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {flyerStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {a.label} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* T-Shirts */}
      <Section
        title="T-Shirts"
        subtitle={tShirtStorefrontData.description}
      >
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">Starting at 15 shirts</h3>
          <p className="text-gray-400">1 side: $16–$13/shirt. 2 sides: $22–$17/shirt. Volume pricing applies.</p>
        </div>
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-xl font-bold tracking-wide text-white">Minimum 15 — $500+ for 25 shirts</p>
              <p className="mt-1 text-sm text-gray-400">Add-ons: extra color +$2, sleeve print +$3, design +$50</p>
            </div>
            <CTAButton to="/order/t-shirts" variant="primary">
              Start Order
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Car Magnets */}
      <Section
        title="Car Magnets"
        subtitle="Magnetic signs for vehicles. Upload your design or let us create it for you."
      >
        <div className="mb-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">Choose Your Option</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {carMagnetStorefrontData.options.map((opt) => (
              <ProductOptionCard
                key={opt.id}
                id={opt.id}
                label={opt.label}
                price={opt.price}
                badge={opt.badge}
                bestFor={opt.bestFor}
                to="/order/car-magnets"
                icon="🧲"
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-heading text-lg font-bold text-gold">Popular Options</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {carMagnetStorefrontData.addons.map((a) => (
              <span key={a.id} className="rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 px-3 py-1.5">
                {a.label} <span className="font-semibold text-gold">+${a.price}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Decals */}
      <Section
        title="Decals"
        subtitle={decalsStorefrontData.description}
      >
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <p className="font-heading text-xl font-bold tracking-wide text-white">$8.50/sq ft base</p>
          <p className="mt-1 text-gray-400">Packages: Basic $150, Work Truck $300, Food Truck $600+</p>
          <div className="mt-4">
            <CTAButton to="/order/decals" variant="primary">
              Request Quote
            </CTAButton>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Vehicle Wraps */}
      <Section
        title="Vehicle Wraps"
        subtitle="Full and partial wraps. Labor $7/sq ft + material. Get an instant estimate."
      >
        <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 backdrop-blur-sm">
          <p className="font-heading text-xl font-bold tracking-wide text-white">Instant Price Calculator</p>
          <p className="mt-1 text-gray-400">Sedan from ~$3,150 · Cargo van ~$4,550 · Food truck ~$5,600+</p>
          <p className="mt-2 text-sm text-gold">Add-ons: Full color +$600, Decal kits available</p>
          <div className="mt-4">
            <CTAButton to="/order/vehicle-wraps" variant="primary">
              Get Quote
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* What We Print - Quick grid */}
      <Section title="What We Print" subtitle="Choose your product and get started">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => PRODUCT_ORDER_ROUTES[p.slug]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* Websites */}
      <Section title="Websites & Lead Funnels" subtitle="Convert visitors into leads or customers">
        <div className="grid gap-4 lg:grid-cols-2">
          <WebsiteProductCard />
        </div>
      </Section>

      {/* How It Works */}
      <Section title="How It Works" subtitle="Three simple steps">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">1</span>
            <h3 className="font-heading text-xl font-bold text-white">Choose your product</h3>
            <p className="mt-2 text-gray-400">Pick from banners, signs, decals, merch, and more.</p>
          </div>
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">2</span>
            <h3 className="font-heading text-xl font-bold text-white">Upload artwork or inspiration</h3>
            <p className="mt-2 text-gray-400">Upload your design or let us create it for you.</p>
          </div>
          <div className="card-hover-gold rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold ring-2 ring-gold/30">3</span>
            <h3 className="font-heading text-xl font-bold text-white">Submit your order</h3>
            <p className="mt-2 text-gray-400">Fast turnaround. Perfect for businesses, events, and promotions.</p>
          </div>
        </div>
      </Section>

      {/* Sponsor */}
      <Section title="Official Print Partner of HustleFanz" subtitle="Premium print for the hustle community">
        <div className="rounded-xl border-2 border-gold/40 bg-gold/10 p-8 text-center shadow-gold md:p-12">
          <p className="text-lg text-gray-300 md:text-xl">
            Hustle Print Hub is the official print sponsor for HustleFanz. Sponsors and vendors get dedicated discount codes and priority support.
          </p>
          <div className="mt-6">
            <CTAButton to="/sponsor" variant="primary">
              Become a Sponsor
            </CTAButton>
          </div>
        </div>
      </Section>

      <SectionDivider thick />

      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal-400 px-4 py-20 texture-overlay">
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-[0.08em] text-white md:text-4xl lg:text-5xl">READY TO PRINT?</h2>
          <p className="mt-4 text-gray-400">Start your order now. Fast turnaround. Premium quality.</p>
          <p className="mt-2 text-sm text-gold">Upload your design or let us create it for you</p>
          <div className="mt-8">
            <CTAButton to="/order" variant="primary">
              Start Your Order
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
