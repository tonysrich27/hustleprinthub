import { BannerOrderBuilder } from '../features/banner/BannerOrderBuilder';

export function BannerOrderPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            Banner Order Builder
          </h1>
          <p className="mt-2 text-gray-400">
            Configure your outdoor banner — pricing updates as you select options.
          </p>
        </div>
      </div>
      <BannerOrderBuilder />
    </div>
  );
}
