interface OrderSummaryCardProps {
  productName?: string;
  specs?: Record<string, string>;
  rushRequested?: boolean;
  artworkStatus?: string;
  designStatus?: string;
  className?: string;
}

export function OrderSummaryCard({
  productName = '—',
  specs = {},
  rushRequested = false,
  artworkStatus,
  designStatus,
  className = '',
}: OrderSummaryCardProps) {
  return (
    <div
      className={`rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6 ${className}`}
    >
      <h3 className="font-heading text-lg font-bold tracking-wide text-gold">
        Order Summary
      </h3>
      <p className="mt-2 text-xs text-gray-500">
        Your order at a glance
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Product</dt>
          <dd className="font-medium text-white">{productName}</dd>
        </div>
        {Object.entries(specs).map(([key, value]) => (
          <div key={key}>
            <dt className="text-gray-500">{key}</dt>
            <dd className="font-medium text-white">{value}</dd>
          </div>
        ))}
        {artworkStatus && (
          <div>
            <dt className="text-gray-500">Artwork</dt>
            <dd className="font-medium text-white">{artworkStatus}</dd>
          </div>
        )}
        {designStatus && (
          <div>
            <dt className="text-gray-500">Design</dt>
            <dd className="font-medium text-gold">{designStatus}</dd>
          </div>
        )}
        {rushRequested && (
          <div>
            <dt className="text-gray-500">Rush</dt>
            <dd className="font-medium text-gold">Yes</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
