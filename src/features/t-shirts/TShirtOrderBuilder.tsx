import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { tShirtPricing, getTShirtPrice } from '../../data/tShirtPricing';

const STEPS = ['Quantity', 'Print Type', 'Add-ons', 'Upload', 'Review'];
const QUICK_QTY = [15, 25, 50, 100];

export function TShirtOrderBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(15);
  const [doubleSided, setDoubleSided] = useState(false);
  const [extraColor, setExtraColor] = useState(false);
  const [setup, setSetup] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [sleevePrint, setSleevePrint] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const basePerShirt = getTShirtPrice(quantity, doubleSided);
  const subtotal = basePerShirt * quantity;
  let total = subtotal;
  if (extraColor) total += tShirtPricing.addons.extraColor * quantity;
  if (setup) total += tShirtPricing.addons.setup;
  if (designHelp) total += tShirtPricing.addons.design;
  if (sleevePrint) total += tShirtPricing.addons.sleevePrint * quantity;
  if (rush) total += subtotal * tShirtPricing.addons.rushPercent;

  const canProceed = () => {
    if (step === 1) return quantity >= 15;
    if (step === 4) return uploadedFile || needsDesignHelp || designHelp;
    return true;
  };

  const handleSubmit = () => {
    console.log('T-shirt order', { quantity, total });
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={step} totalSteps={STEPS.length} steps={STEPS} />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Quantity (min 15)</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {QUICK_QTY.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`rounded-xl border-2 px-6 py-3 font-semibold ${
                      quantity === q ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-50/30 text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={15}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(15, parseInt(e.target.value, 10) || 15))}
                className="mt-4 w-32 rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Print Type</h2>
              <div className="mt-6 space-y-4">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${
                    !doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30'
                  }`}
                >
                  <span className="font-medium text-white">1 side</span>
                  <span className="text-gold">${getTShirtPrice(quantity, false)}/shirt</span>
                  <input
                    type="radio"
                    name="sides"
                    checked={!doubleSided}
                    onChange={() => setDoubleSided(false)}
                    className="h-5 w-5 text-gold"
                  />
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${
                    doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30'
                  }`}
                >
                  <span className="font-medium text-white">2 sides</span>
                  <span className="text-gold">${getTShirtPrice(quantity, true)}/shirt</span>
                  <input
                    type="radio"
                    name="sides"
                    checked={doubleSided}
                    onChange={() => setDoubleSided(true)}
                    className="h-5 w-5 text-gold"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add-ons</h2>
              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4">
                  <span className="font-medium text-white">Extra color</span>
                  <span className="text-gold">+$2/shirt</span>
                  <input type="checkbox" checked={extraColor} onChange={(e) => setExtraColor(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4">
                  <span className="font-medium text-white">Setup</span>
                  <span className="text-gold">+$30</span>
                  <input type="checkbox" checked={setup} onChange={(e) => setSetup(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4">
                  <span className="font-medium text-white">Design</span>
                  <span className="text-gold">+$50</span>
                  <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4">
                  <span className="font-medium text-white">Sleeve print</span>
                  <span className="text-gold">+$3/shirt</span>
                  <input type="checkbox" checked={sleevePrint} onChange={(e) => setSleevePrint(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4">
                  <span className="font-medium text-white">Rush (+30%)</span>
                  <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Upload Artwork</h2>
              <p className="mt-2 text-gray-400">Upload your design or let us create it for you.</p>
              <div className="mt-6 space-y-4">
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-charcoal-50/50 py-12">
                  <input
                    type="file"
                    id="tshirt-upload"
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
                  />
                  <label htmlFor="tshirt-upload" className="cursor-pointer text-center">
                    <p className="text-gray-400">Drag & drop or click to upload</p>
                    <span className="mt-4 inline-block rounded-md bg-gold px-6 py-2 text-sm font-semibold text-charcoal">Choose Files</span>
                  </label>
                  {uploadedFile && <p className="mt-4 text-sm text-gold">✓ {uploadedFile.name}</p>}
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-charcoal-50/30 p-4">
                  <input type="checkbox" checked={needsDesignHelp} onChange={(e) => setNeedsDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  <span className="font-medium text-white">I need design help</span>
                </label>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review Your Order</h2>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                <p className="text-gray-400">
                  <span className="text-white">{quantity} shirts</span> — ${total.toFixed(2)}
                </p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>Order Now</CTAButton>
              </div>
            </div>
          )}

          {step < 5 && (
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 1} className="rounded-md px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50">
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
            <p className="mt-2 text-sm text-gray-500">{quantity} shirts — ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
