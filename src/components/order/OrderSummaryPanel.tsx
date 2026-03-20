import type { OrderSummaryPanelProps } from '../../types/order';

export function OrderSummaryPanel({
  title = 'Order Summary',
  lines,
  total,
  totalLabel = 'Total',
  footer,
  sticky = true,
}: OrderSummaryPanelProps) {
  return (
    <div className={sticky ? 'lg:sticky lg:top-24' : ''}>
      <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
        <h3 className="font-heading text-lg font-bold tracking-wide text-gold">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">Updates in real time</p>
        <dl className="mt-4 space-y-2 text-sm">
          {lines.map((line) => (
            <div key={line.label} className="flex justify-between gap-2">
              <dt className="text-gray-500">{line.label}</dt>
              <dd className="font-medium text-white text-right">{line.value}</dd>
            </div>
          ))}
        </dl>
        {(total != null && total !== '' && total !== '—') && (
          <div className="mt-4 border-t border-charcoal-50/30 pt-4">
            <div className="flex justify-between">
              <dt className="text-gray-500 font-medium">{totalLabel}</dt>
              <dd className="text-xl font-bold text-gold">
                {typeof total === 'number' ? `$${total.toFixed(2)}` : total}
              </dd>
            </div>
          </div>
        )}
        {footer && <p className="mt-2 text-xs text-gray-500">{footer}</p>}
      </div>
    </div>
  );
}
