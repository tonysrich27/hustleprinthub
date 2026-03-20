import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { carMagnetPricing, type CarMagnetKey } from '../../data/carMagnetPricing';

const STEPS = ['Choose Option', 'Add-ons', 'Upload Artwork', 'Review'];

export function CarMagnetOrderBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [option, setOption] = useState<CarMagnetKey | null>(null);
  const [designHelp, setDesignHelp] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const basePrice = option ? carMagnetPricing.options[option] : 0;
  const total =
    basePrice +
    (designHelp ? carMagnetPricing.addons.design : 0) +
    (rush ? carMagnetPricing.addons.rush : 0);

  const optionLabels: Record<CarMagnetKey, string> = {
    '12x18': '12×18 in (pair)',
    '18x24': '18×24 in (pair)',
    business: 'Business Package',
  };

  const canProceed = () => {
    if (step === 1) return !!option;
    if (step === 3) return uploadedFile || needsDesignHelp || designHelp;
    return true;
  };

  const handleSubmit = () => {
    console.log('Car magnet order', { option, designHelp, rush, total });
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={step} totalSteps={STEPS.length} steps={STEPS} />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Choose Your Option</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(Object.entries(carMagnetPricing.options) as [CarMagnetKey, number][]).map(
                  ([key, price]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setOption(key)}
                      className={`rounded-xl border-2 p-5 text-left transition-all ${
                        option === key
                          ? 'border-gold bg-gold/10'
                          : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-heading text-lg font-bold text-white">
                        {optionLabels[key]}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-gold">${price}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add-ons</h2>
              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Design help</span>
                  <span className="text-gold font-semibold">+$25</span>
                  <input
                    type="checkbox"
                    checked={designHelp}
                    onChange={(e) => setDesignHelp(e.target.checked)}
                    className="h-5 w-5 rounded text-gold"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Rush</span>
                  <span className="text-gold font-semibold">+$30</span>
                  <input
                    type="checkbox"
                    checked={rush}
                    onChange={(e) => setRush(e.target.checked)}
                    className="h-5 w-5 rounded text-gold"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Upload Artwork</h2>
              <p className="mt-2 text-gray-400">Upload your design or let us create it for you.</p>
              <div className="mt-6 space-y-4">
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-charcoal-50/50 py-12">
                  <input
                    type="file"
                    id="magnet-upload"
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
                  />
                  <label htmlFor="magnet-upload" className="cursor-pointer text-center">
                    <p className="text-gray-400">Drag & drop or click to upload</p>
                    <span className="mt-4 inline-block rounded-md bg-gold px-6 py-2 text-sm font-semibold text-charcoal">
                      Choose Files
                    </span>
                  </label>
                  {uploadedFile && <p className="mt-4 text-sm text-gold">✓ {uploadedFile.name}</p>}
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-charcoal-50/30 p-4">
                  <input
                    type="checkbox"
                    checked={needsDesignHelp}
                    onChange={(e) => setNeedsDesignHelp(e.target.checked)}
                    className="h-5 w-5 rounded text-gold"
                  />
                  <span className="font-medium text-white">I need design help</span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review Your Order</h2>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                <p className="text-gray-400">
                  <span className="text-white">{option && optionLabels[option]}</span> — ${total}
                </p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>
                  Order Now
                </CTAButton>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                className="rounded-md px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="rounded-md bg-gold px-6 py-2 font-semibold text-charcoal hover:bg-gold-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
            <h3 className="font-heading text-lg font-bold text-gold">Order Summary</h3>
            <p className="mt-2 text-sm text-gray-500">
              {option ? optionLabels[option] : '—'} — {option ? `$${total}` : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
