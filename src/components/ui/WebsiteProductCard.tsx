import { Link } from 'react-router-dom';
import { WEBSITE_PRODUCT, WEBSITE_PACKAGES } from '../../data/websiteProducts';

export function WebsiteProductCard() {
  return (
    <div className="card-hover-gold flex flex-col rounded-xl border border-charcoal-50/40 bg-charcoal-100/50 p-6 md:p-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-charcoal-50/30 text-4xl ring-1 ring-charcoal-50/20">
        {WEBSITE_PRODUCT.icon}
      </div>
      <h3 className="font-heading text-2xl font-bold tracking-wide text-white">
        {WEBSITE_PRODUCT.name}
      </h3>
      <p className="mt-2 text-gray-400">{WEBSITE_PRODUCT.description}</p>

      <div className="mt-6 space-y-4">
        {WEBSITE_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-lg border border-charcoal-50/40 bg-charcoal-400/30 p-4"
          >
            <p className="font-semibold text-white">{pkg.name}</p>
            <p className="mt-1 text-sm text-gray-400">
              ${pkg.setupPrice}{pkg.setupPriceNote ?? ''} setup · ${pkg.monthlyPrice}/mo
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/order/website"
        className="cta-premium mt-6 inline-flex w-fit rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-charcoal hover:bg-gold-300"
      >
        Start Order
      </Link>
    </div>
  );
}
