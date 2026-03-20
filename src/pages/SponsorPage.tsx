import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { CTAButton } from '../components/ui/CTAButton';

export function SponsorPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl">
            Official Print Sponsor for HustleFanz
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Hustle Print Hub powers print for the HustleFanz community. Premium print. Partner pricing.
          </p>
        </div>
      </section>

      <Section title="Print Sponsor Program" subtitle="The dedicated print lane for HustleFanz">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 md:p-12">
          <p className="text-center text-lg text-gray-300">
            As the official HustleFanz print sponsor, we provide banners, signs, decals, apparel, and promo materials for hustlers, creators, vendors, and businesses. Fast turnaround. Premium quality.
          </p>
        </div>
      </Section>

      <Section title="Discount Benefits" subtitle="Why partner with Hustle Print Hub">
        <ul className="space-y-4">
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">Dedicated discount codes</strong>
              <p className="text-sm text-gray-400">Share codes with your audience for partner pricing</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">Source attribution</strong>
              <p className="text-sm text-gray-400">Orders tagged to your code for tracking and reporting</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">Priority support</strong>
              <p className="text-sm text-gray-400">Faster turnaround for sponsor and vendor orders</p>
            </div>
          </li>
        </ul>
      </Section>

      <Section title="Who It Helps" subtitle="Built for the HustleFanz ecosystem">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6">
            <h3 className="font-heading text-xl font-bold text-gold">Sponsors & Vendors</h3>
            <p className="mt-2 text-gray-400">
              Get exclusive discount codes. Offer print as part of your vendor package. Track referrals.
            </p>
          </div>
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6">
            <h3 className="font-heading text-xl font-bold text-gold">Creators & Hustlers</h3>
            <p className="mt-2 text-gray-400">
              Order banners, merch, flyers, and event graphics. Use your sponsor code for partner pricing.
            </p>
          </div>
        </div>
      </Section>

      <section className="border-t border-charcoal-50/20 bg-charcoal-400 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Apply / Partner
          </h2>
          <p className="mt-4 text-gray-400">
            Get your sponsor or vendor discount code. Join the Hustle Print Hub partner network.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton to="/order" variant="primary">
              Order with Sponsor Code
            </CTAButton>
            <Link to="/" className="rounded-md border border-charcoal-50/50 px-6 py-3 text-gray-400 transition hover:text-white">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
