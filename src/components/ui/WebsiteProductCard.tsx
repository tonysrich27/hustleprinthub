import { Link } from 'react-router-dom';
import { WEBSITE_PRODUCT, WEBSITE_PACKAGES } from '../../data/websiteProducts';

export function WebsiteProductCard() {
  return (
    <div className="group flex flex-col rounded-xl border-2 border-charcoal-50/30 bg-charcoal-100/50 p-6 transition hover:border-gold/50 hover:bg-charcoal-50/30 md:p-8">
      <span className="mb-4 text-4xl">{WEBSITE_PRODUCT.icon}</span>
      <h3 className="font-heading text-2xl font-bold tracking-wide text-white">
        {WEBSITE_PRODUCT.name}
      </h3>
      <p className="mt-2 text-gray-400">{WEBSITE_PRODUCT.description}</p>

      <div className="mt-6 space-y-4">
        {WEBSITE_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-lg border border-charcoal-50/30 bg-charcoal-400/30 p-4"
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
        className="mt-6 inline-flex w-fit rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-300"
      >
        Start Order
      </Link>
    </div>
  );
}
