import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { bannerPricing, type BannerSizeKey } from '../../data/bannerPricing';

const BANNER_STEPS = [
  'Choose Size',
  'Print Sides',
  'Finishing',
  'Extras',
  'Upload Artwork',
  'Order Summary',
];

export function BannerOrderBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [size, setSize] = useState<BannerSizeKey | 'custom' | null>(null);
  const [doubleSided, setDoubleSided] = useState(false);
  const [windSlits, setWindSlits] = useState(false);
  const [polePockets, setPolePockets] = useState(false);
  const [rope, setRope] = useState(false);
  const [rush, setRush] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const isCustomSize = size === 'custom';
  const totalSteps = BANNER_STEPS.length;

  const calculateTotal = useCallback(() => {
    if (isCustomSize) return null;
    if (!size || !(size in bannerPricing.sizes)) return 0;

    const sizeData = bannerPricing.sizes[size as BannerSizeKey];
    let total = sizeData.base;
    if (doubleSided) total += sizeData.double;

    if (windSlits) total += bannerPricing.addons.windSlits;
    if (polePockets) total += bannerPricing.addons.polePockets;
    if (rope) total += bannerPricing.addons.rope;
    if (rush) total += bannerPricing.addons.rush;
    if (designHelp) total += bannerPricing.addons.design;

    return total;
  }, [size, doubleSided, windSlits, polePockets, rope, rush, designHelp, isCustomSize]);

  const total = calculateTotal();

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (isCustomSize) {
      console.log('Quote request submitted', { size, doubleSided, windSlits, polePockets, rope, rush, designHelp });
      navigate('/thank-you');
    } else {
      console.log('Order submitted', { size, doubleSided, windSlits, polePockets, rope, rush, designHelp, total });
      navigate('/thank-you');
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!size;
    if (currentStep === 5) return uploadedFile || needsDesignHelp || designHelp;
    return true;
  };

  const orderSummaryContent = (
    <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
      <h3 className="font-heading text-lg font-bold tracking-wide text-gold">Order Summary</h3>
      <p className="mt-1 text-xs text-gray-500">Live updating</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Size</dt>
          <dd className="font-medium text-white">{size === 'custom' ? 'Custom (Quote)' : size ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Print sides</dt>
          <dd className="font-medium text-white">{doubleSided ? 'Double-sided' : 'Single-sided'}</dd>
        </div>
        {(windSlits || polePockets || rope) && (
          <div>
            <dt className="text-gray-500">Finishing</dt>
            <dd className="font-medium text-white">
              {[windSlits && 'Wind slits', polePockets && 'Pole pockets', rope && 'Rope'].filter(Boolean).join(', ')}
            </dd>
          </div>
        )}
        {(rush || designHelp) && (
          <div>
            <dt className="text-gray-500">Extras</dt>
            <dd className="font-medium text-white">
              {[rush && 'Rush', designHelp && 'Design help'].filter(Boolean).join(', ')}
            </dd>
          </div>
        )}
      </dl>
      <p className="mt-4 border-t border-charcoal-50/30 pt-4 text-right">
        <span className="text-2xl font-bold text-gold">
          {isCustomSize ? '—' : total != null ? `$${total}` : '—'}
        </span>
      </p>
      <p className="mt-2 text-xs text-gray-500">Built for durability and outdoor visibility</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <div className="mb-6 text-center md:text-left">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            High-Quality Outdoor Banners — Starting at $90
          </h1>
          <p className="mt-2 text-gold font-medium">Fast Turnaround Available</p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={BANNER_STEPS}
        />

        <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 transition-shadow hover:shadow-lg md:p-8">
          {/* STEP 1 — Choose Size */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Choose Size</h2>
              <p className="mt-2 text-gray-400">Select your banner dimensions.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(Object.entries(bannerPricing.sizes) as [BannerSizeKey, { base: number }][]).map(([key, { base }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSize(key)}
                    className={`flex flex-col rounded-xl border-2 p-5 text-left transition-all ${
                      size === key
                        ? 'border-gold bg-gold/10 shadow-lg'
                        : 'border-charcoal-50/30 hover:border-gold/50 hover:bg-charcoal-50/20'
                    }`}
                  >
                    <span className="font-heading text-xl font-bold text-white">{key} ft</span>
                    <span className="mt-1 text-lg font-semibold text-gold">${base}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSize('custom')}
                  className={`flex flex-col rounded-xl border-2 p-5 text-left transition-all ${
                    size === 'custom'
                      ? 'border-gold bg-gold/10 shadow-lg'
                      : 'border-charcoal-50/30 hover:border-gold/50 hover:bg-charcoal-50/20'
                  }`}
                >
                  <span className="font-heading text-xl font-bold text-white">Custom Size</span>
                  <span className="mt-1 text-gold">Request Quote</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Print Sides */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Print Sides</h2>
              <p className="mt-2 text-gray-400">Single or double-sided printing.</p>
              <div className="mt-6 space-y-4">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-5 transition-all ${
                    !doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="sides"
                    checked={!doubleSided}
                    onChange={() => setDoubleSided(false)}
                    className="mt-1 h-5 w-5 border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-white">Single-sided</span>
                    <p className="mt-1 text-sm text-gray-400">Included in base price</p>
                  </div>
                </label>
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-5 transition-all ${
                    doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="sides"
                    checked={doubleSided}
                    onChange={() => setDoubleSided(true)}
                    className="mt-1 h-5 w-5 border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-white">Double-sided</span>
                    <p className="mt-1 text-sm text-gray-400">Best for visibility from both directions</p>
                    {size && size !== 'custom' && (
                      <p className="mt-1 text-gold font-medium">
                        +${bannerPricing.sizes[size as BannerSizeKey].double}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3 — Finishing Options */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add Finishing Options</h2>
              <p className="mt-2 text-gray-400">Optional upgrades for your banner.</p>
              <div className="mt-6 space-y-3">
                {[
                  { key: 'windSlits', label: 'Wind slits', price: 15, checked: windSlits, set: setWindSlits },
                  { key: 'polePockets', label: 'Pole pockets', price: 20, checked: polePockets, set: setPolePockets },
                  { key: 'rope', label: 'Rope', price: 15, checked: rope, set: setRope },
                ].map(({ label, price, checked, set }) => (
                  <label
                    key={label}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                      checked ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => set(e.target.checked)}
                        className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                      />
                      <span className="font-medium text-white">{label}</span>
                    </div>
                    <span className="text-gold font-semibold">+${price}</span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">Built for durability and outdoor visibility</p>
            </div>
          )}

          {/* STEP 4 — Extras */}
          {currentStep === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Extras</h2>
              <p className="mt-2 text-gray-400">Rush production and design support.</p>
              <div className="mt-6 space-y-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    rush ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={rush}
                      onChange={(e) => setRush(e.target.checked)}
                      className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                    />
                    <span className="font-medium text-white">Rush production</span>
                  </div>
                  <span className="text-gold font-semibold">+$50</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    designHelp ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={designHelp}
                      onChange={(e) => setDesignHelp(e.target.checked)}
                      className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                    />
                    <span className="font-medium text-white">Design help</span>
                  </div>
                  <span className="text-gold font-semibold">+$25</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5 — Upload Artwork */}
          {currentStep === 5 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Upload Artwork</h2>
              <p className="mt-2 text-gray-400">Upload your design or let us create it for you</p>
              <div className="mt-6 space-y-4">
                <div
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
                    uploadedFile ? 'border-gold bg-gold/5' : 'border-charcoal-50/50 bg-charcoal-400/50 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="file"
                    id="artwork-upload"
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
                  />
                  <label htmlFor="artwork-upload" className="cursor-pointer text-center">
                    <p className="text-gray-400">Drag & drop or click to upload</p>
                    <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF, AI, EPS — max 10MB</p>
                    <span className="mt-4 inline-block rounded-md bg-gold px-6 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-300">
                      Choose Files
                    </span>
                  </label>
                  {uploadedFile && (
                    <p className="mt-4 text-sm text-gold">✓ {uploadedFile.name}</p>
                  )}
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <input
                    type="checkbox"
                    checked={needsDesignHelp}
                    onChange={(e) => setNeedsDesignHelp(e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                  />
                  <span className="font-medium text-white">I need design help</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6 — Order Summary */}
          {currentStep === 6 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review Your Order</h2>
              <p className="mt-2 text-gray-400">Confirm your selections before checkout.</p>
              <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-400/30 p-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Size</dt>
                    <dd className="font-medium text-white">{size === 'custom' ? 'Custom' : size}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Print sides</dt>
                    <dd className="font-medium text-white">{doubleSided ? 'Double-sided' : 'Single-sided'}</dd>
                  </div>
                  {(windSlits || polePockets || rope) && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Finishing</dt>
                      <dd className="font-medium text-white">
                        {[windSlits && 'Wind slits', polePockets && 'Pole pockets', rope && 'Rope'].filter(Boolean).join(', ')}
                      </dd>
                    </div>
                  )}
                  {(rush || designHelp) && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Extras</dt>
                      <dd className="font-medium text-white">
                        {[rush && 'Rush', designHelp && 'Design help'].filter(Boolean).join(', ')}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-charcoal-50/30 pt-4">
                    <dt className="font-semibold text-white">Total</dt>
                    <dd className="text-xl font-bold text-gold">
                      {isCustomSize ? 'Quote' : total != null ? `$${total}` : '—'}
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-center text-sm text-gray-400">
                Upload your design or let us create it for you
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                {isCustomSize ? (
                  <CTAButton variant="primary" onClick={handleSubmit} className="w-full sm:w-auto">
                    Request Custom Quote
                  </CTAButton>
                ) : (
                  <CTAButton variant="primary" onClick={handleSubmit} className="w-full sm:w-auto">
                    Continue to Checkout
                  </CTAButton>
                )}
              </div>
            </div>
          )}

          {currentStep < 6 && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="rounded-md px-4 py-2 text-gray-400 transition hover:text-white disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="rounded-md bg-gold px-6 py-2 font-semibold text-charcoal transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Order Summary — Desktop */}
      <div className="mt-8 lg:mt-0 lg:block">
        <div className="lg:sticky lg:top-24">{orderSummaryContent}</div>
      </div>
    </div>
  );
}
