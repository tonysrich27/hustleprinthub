import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../../components/ui/CTAButton';
import { decalsStorefrontData } from '../../data/storefront/decalsData';

export function DecalsOrderBuilder() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log('Decals quote request', { package: selectedPackage });
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-white">Vinyl Decals</h1>
        <p className="mt-2 text-gray-400">{decalsStorefrontData.description}</p>
        <p className="mt-1 text-gold font-medium">Fast Turnaround Available</p>
      </div>

      <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
        <h2 className="font-heading text-xl font-bold text-white">Packages</h2>
        <p className="mt-1 text-gray-400">Choose a package or request a custom quote.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {decalsStorefrontData.packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              className={`rounded-xl border-2 p-5 text-left transition-all ${
                selectedPackage === pkg.id
                  ? 'border-gold bg-gold/10'
                  : 'border-charcoal-50/30 hover:border-gold/50'
              }`}
            >
              <span className="font-heading text-lg font-bold text-white">{pkg.label}</span>
              <span className="mt-1 block text-lg font-semibold text-gold">${pkg.price}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-heading text-lg font-bold text-gold">Pricing</h3>
          <p className="mt-2 text-sm text-gray-400">
            Base: ${decalsStorefrontData.basePrice}/sq ft. Laminate +$1.50/sq ft. Contour cut +15%. Rush +50%.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Upload your design or let us create it for you
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButton variant="primary" onClick={handleSubmit}>
            Request Quote
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
