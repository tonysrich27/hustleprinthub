import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import {
  yardSignPricing,
  getSinglePricePerSign,
  getDoubleAddPerSign,
} from '../../data/yardSignPricing';

const YARD_SIGN_STEPS = [
  'Quantity',
  'Print Type',
  'Add-ons',
  'Upload Artwork',
  'Pricing',
  'Order',
];

const QUICK_QUANTITIES = [1, 5, 10, 25, 50, 100];

export function YardSignBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityInput, setQuantityInput] = useState('1');
  const [doubleSided, setDoubleSided] = useState(false);
  const [stakes, setStakes] = useState(false);
  const [gloss, setGloss] = useState(false);
  const [rush, setRush] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const totalSteps = YARD_SIGN_STEPS.length;

  const effectiveQuantity = Math.max(1, quantity);

  const calculatePricing = useCallback(() => {
    const basePerSign = getSinglePricePerSign(effectiveQuantity);
    const doubleAdd = doubleSided ? getDoubleAddPerSign(effectiveQuantity) : 0;
    const pricePerSign = basePerSign + doubleAdd;

    let subtotal = pricePerSign * effectiveQuantity;

    if (stakes) subtotal += yardSignPricing.addons.stakes * effectiveQuantity;
    if (gloss) subtotal += yardSignPricing.addons.gloss * effectiveQuantity;
    if (rush) subtotal += yardSignPricing.addons.rush;
    if (designHelp) subtotal += yardSignPricing.addons.design;

    return {
      pricePerSign,
      subtotal,
      total: subtotal,
    };
  }, [effectiveQuantity, doubleSided, stakes, gloss, rush, designHelp]);

  const pricing = calculatePricing();

  const handleQuantitySelect = (q: number) => {
    setQuantity(q);
    setQuantityInput(String(q));
  };

  const handleQuantityInputChange = (value: string) => {
    setQuantityInput(value);
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setQuantity(parsed);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    console.log('Yard sign order submitted', {
      quantity: effectiveQuantity,
      doubleSided,
      stakes,
      gloss,
      rush,
      designHelp,
      total: pricing.total,
    });
    navigate('/thank-you');
  };

  const canProceed = () => {
    if (currentStep === 1) return effectiveQuantity >= 1;
    if (currentStep === 4) return uploadedFile || needsDesignHelp || designHelp;
    return true;
  };

  const orderSummaryContent = (
    <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
      <h3 className="font-heading text-lg font-bold tracking-wide text-gold">
        Order Summary
      </h3>
      <p className="mt-1 text-xs text-gray-500">Live updating</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Quantity</dt>
          <dd className="font-medium text-white">{effectiveQuantity} signs</dd>
        </div>
        <div>
          <dt className="text-gray-500">Print</dt>
          <dd className="font-medium text-white">
            {doubleSided ? 'Double-sided' : 'Single-sided'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Price per sign</dt>
          <dd className="font-medium text-gold">${pricing.pricePerSign.toFixed(2)}</dd>
        </div>
        {(stakes || gloss) && (
          <div>
            <dt className="text-gray-500">Add-ons</dt>
            <dd className="font-medium text-white">
              {[stakes && 'Stakes', gloss && 'Gloss'].filter(Boolean).join(', ')}
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
          ${pricing.total.toFixed(2)}
        </span>
      </p>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <div className="mb-6 text-center md:text-left">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            Professional Yard Signs Starting at $8.50 Each
          </h1>
          <p className="mt-2 text-gray-400">
            Perfect for real estate, events, promotions, and business marketing
          </p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={YARD_SIGN_STEPS}
        />

        <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 transition-shadow hover:shadow-lg md:p-8">
          {/* STEP 1 — Quantity */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                How many signs?
              </h2>
              <p className="mt-2 text-gray-400">
                Choose quantity — price per sign drops with volume.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {QUICK_QUANTITIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuantitySelect(q)}
                    className={`rounded-xl border-2 px-6 py-3 font-semibold transition-all ${
                      quantity === q
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-charcoal-50/30 text-white hover:border-gold/50'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400">
                  Or enter custom quantity
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantityInput}
                  onChange={(e) => handleQuantityInputChange(e.target.value)}
                  className="mt-2 w-full max-w-[200px] rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>
          )}

          {/* STEP 2 — Print Type */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Print Type
              </h2>
              <p className="mt-2 text-gray-400">
                Single or double-sided printing.
              </p>
              <div className="mt-6 space-y-4">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-5 transition-all ${
                    !doubleSided
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="printType"
                    checked={!doubleSided}
                    onChange={() => setDoubleSided(false)}
                    className="mt-1 h-5 w-5 border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-white">
                      Single-sided
                    </span>
                    <p className="mt-1 text-sm text-gray-400">
                      Default — included in base price
                    </p>
                    <p className="mt-1 text-gold font-medium">
                      ${getSinglePricePerSign(effectiveQuantity).toFixed(2)}/sign
                    </p>
                  </div>
                </label>
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-5 transition-all ${
                    doubleSided
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="printType"
                    checked={doubleSided}
                    onChange={() => setDoubleSided(true)}
                    className="mt-1 h-5 w-5 border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-white">
                      Double-sided
                    </span>
                    <p className="mt-1 text-sm text-gray-400">
                      Best for visibility from both sides
                    </p>
                    <p className="mt-1 text-gold font-medium">
                      +${getDoubleAddPerSign(effectiveQuantity).toFixed(2)}/sign
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3 — Add-ons */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Add-ons
              </h2>
              <p className="mt-2 text-gray-400">
                Optional upgrades for your yard signs.
              </p>
              <div className="mt-6 space-y-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    stakes
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={stakes}
                      onChange={(e) => setStakes(e.target.checked)}
                      className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                    />
                    <span className="font-medium text-white">Stakes</span>
                  </div>
                  <span className="text-gold font-semibold">
                    +${yardSignPricing.addons.stakes}/sign
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    gloss
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={gloss}
                      onChange={(e) => setGloss(e.target.checked)}
                      className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                    />
                    <span className="font-medium text-white">Gloss finish</span>
                  </div>
                  <span className="text-gold font-semibold">
                    +${yardSignPricing.addons.gloss}/sign
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    rush
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
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
                  <span className="text-gold font-semibold">
                    +${yardSignPricing.addons.rush} flat
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    designHelp
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal-50/30 hover:border-gold/50'
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
                  <span className="text-gold font-semibold">
                    +${yardSignPricing.addons.design} flat
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4 — Upload Artwork */}
          {currentStep === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Upload Artwork
              </h2>
              <p className="mt-2 text-gray-400">
                Upload your design or let us create it for you.
              </p>
              <div className="mt-6 space-y-4">
                <div
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
                    uploadedFile
                      ? 'border-gold bg-gold/5'
                      : 'border-charcoal-50/50 bg-charcoal-400/50 hover:border-gold/50'
                  }`}
                >
                  <input
                    type="file"
                    id="yard-sign-upload"
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
                    className="hidden"
                    onChange={(e) =>
                      setUploadedFile(e.target.files?.[0] ?? null)
                    }
                  />
                  <label
                    htmlFor="yard-sign-upload"
                    className="cursor-pointer text-center"
                  >
                    <p className="text-gray-400">
                      Drag & drop or click to upload
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      PNG, JPG, PDF, AI, EPS — max 10MB
                    </p>
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
                  <span className="font-medium text-white">
                    I need design help
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5 — Live Pricing Box */}
          {currentStep === 5 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Your Price
              </h2>
              <p className="mt-2 text-gray-400">
                Review the breakdown before ordering.
              </p>
              <div className="mt-6 rounded-xl border-2 border-gold/30 bg-charcoal-400/50 p-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Price per sign</dt>
                    <dd className="font-medium text-white">
                      ${pricing.pricePerSign.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Quantity</dt>
                    <dd className="font-medium text-white">
                      {effectiveQuantity} signs
                    </dd>
                  </div>
                  {(stakes || gloss) && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Add-ons</dt>
                      <dd className="font-medium text-white">
                        {[
                          stakes &&
                            `Stakes (+$${(yardSignPricing.addons.stakes * effectiveQuantity).toFixed(2)})`,
                          gloss &&
                            `Gloss (+$${(yardSignPricing.addons.gloss * effectiveQuantity).toFixed(2)})`,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </dd>
                    </div>
                  )}
                  {(rush || designHelp) && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Extras</dt>
                      <dd className="font-medium text-white">
                        {[
                          rush && `Rush (+$${yardSignPricing.addons.rush})`,
                          designHelp &&
                            `Design help (+$${yardSignPricing.addons.design})`,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-charcoal-50/30 pt-4">
                    <dt className="font-semibold text-white">TOTAL PRICE</dt>
                    <dd className="text-xl font-bold text-gold">
                      ${pricing.total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* STEP 6 — CTA */}
          {currentStep === 6 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Ready to Order
              </h2>
              <p className="mt-2 text-gray-400">
                {effectiveQuantity} yard sign{effectiveQuantity > 1 ? 's' : ''}{' '}
                — ${pricing.total.toFixed(2)}
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <CTAButton
                  variant="primary"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto"
                >
                  Order Now
                </CTAButton>
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
