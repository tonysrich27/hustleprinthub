import { Section } from '../components/ui/Section';
import { ProductCard } from '../components/ui/ProductCard';
import { WebsiteProductCard } from '../components/ui/WebsiteProductCard';
import { CTAButton } from '../components/ui/CTAButton';
import { PRODUCTS } from '../data/products';

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl">
            Print Fast. Promote Smarter.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Banners, Signs, Decals, Apparel and Promo Materials for hustlers, creators and businesses.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton to="/order" variant="primary">
              Start Your Order
            </CTAButton>
            <CTAButton to="/sponsor" variant="secondary">
              Become a Sponsor
            </CTAButton>
          </div>
        </div>
      </section>

      <Section title="What We Print" subtitle="Choose your product and get started">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section title="Websites & Lead Funnels" subtitle="Convert visitors into leads or customers">
        <div className="grid gap-4 lg:grid-cols-2">
          <WebsiteProductCard />
        </div>
      </Section>

      <Section title="How It Works" subtitle="Three simple steps">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold">1</span>
            <h3 className="font-heading text-xl font-bold text-white">Choose your product</h3>
            <p className="mt-2 text-gray-400">Pick from banners, signs, decals, merch, and more.</p>
          </div>
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold">2</span>
            <h3 className="font-heading text-xl font-bold text-white">Upload artwork or inspiration</h3>
            <p className="mt-2 text-gray-400">Add your logo, screenshot, or design idea. Need artwork help? Our team can assist.</p>
          </div>
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-gold">3</span>
            <h3 className="font-heading text-xl font-bold text-white">Submit your order or quote request</h3>
            <p className="mt-2 text-gray-400">Rush orders available. We'll get back to you fast.</p>
          </div>
        </div>
      </Section>

      <Section title="Official Print Partner of HustleFanz" subtitle="Premium print for the hustle community">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 text-center md:p-12">
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

      <section className="border-t border-charcoal-50/20 bg-charcoal-400 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Ready to Print?</h2>
          <p className="mt-4 text-gray-400">Start your order now. Fast turnaround. Premium quality.</p>
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
