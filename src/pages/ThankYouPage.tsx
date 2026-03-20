import { Link, useSearchParams } from 'react-router-dom';
import { CTAButton } from '../components/ui/CTAButton';

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'print';

  const isWebsite = type === 'website';

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 text-center md:p-12">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Order Received
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          {isWebsite
            ? 'Our team will review your website request and reach out shortly.'
            : 'Our print team will review your order shortly.'}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <CTAButton to={isWebsite ? '/order/website' : '/order'} variant="primary">
            Start Another Order
          </CTAButton>
          <CTAButton to="/" variant="secondary">
            Return Home
          </CTAButton>
          <Link
            to="/sponsor"
            className="rounded-md px-4 py-2 text-sm text-gray-400 transition hover:text-gold"
          >
            Visit Sponsor Page
          </Link>
        </div>
      </div>
    </div>
  );
}
