import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { OrderSummaryPanel } from '../../components/order/OrderSummaryPanel';
import { ArtworkUploadStep } from '../../components/order/ArtworkUploadStep';
import { CustomerDetailsStep, type CustomerDetails } from '../../components/order/CustomerDetailsStep';
import { tShirtPricing } from '../../data/tShirtPricing';
import { apparelPricing, type GarmentKey, type SizeKey } from '../../data/apparelPricing';

const STEPS = ['Garment', 'Size', 'Quantity', 'Print', 'Add-ons', 'Upload', 'Details', 'Submit'];
const QUICK_QTY = [15, 25, 50, 100];
const SIZES: SizeKey[] = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export function TShirtOrderBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [garment, setGarment] = useState<GarmentKey | null>(null);
  const [size, setSize] = useState<SizeKey>('M');
  const [quantity, setQuantity] = useState(15);
  const [printSide, setPrintSide] = useState<'front' | 'back' | 'both'>('front');
  const [extraColor, setExtraColor] = useState(false);
  const [setup, setSetup] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [sleevePrint, setSleevePrint] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const doubleSided = printSide === 'both';
  const garmentBase = garment ? apparelPricing.garments[garment].base : 0;
  const printCost = printSide === 'front' ? 4 : printSide === 'back' ? 4 : 7;
  const sizeAdd = apparelPricing.sizeUpcharge[size];
  const basePerShirt = garmentBase + printCost + sizeAdd;
  const subtotal = basePerShirt * quantity;
  let total = subtotal;
  if (extraColor) total += tShirtPricing.addons.extraColor * quantity;
  if (setup) total += tShirtPricing.addons.setup;
  if (designHelp) total += tShirtPricing.addons.design;
  if (sleevePrint) total += tShirtPricing.addons.sleevePrint * quantity;
  if (rush) total += subtotal * tShirtPricing.addons.rushPercent;

  const summaryLines: { label: string; value: string }[] = [
    { label: 'Garment', value: garment ? apparelPricing.garments[garment].label : '—' },
    { label: 'Size', value: size },
    { label: 'Quantity', value: `${quantity}` },
    { label: 'Print', value: printSide === 'front' ? 'Front' : printSide === 'back' ? 'Back' : 'Both sides' },
  ];
  if (extraColor) summaryLines.push({ label: 'Extra color', value: '+$2/shirt' });
  if (designHelp) summaryLines.push({ label: 'Design', value: '+$50' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+30%' });

  const canProceed = () => {
    if (step === 1) return !!garment;
    if (step === 6) return uploadedFile || needsDesignHelp || designHelp;
    if (step === 7) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    console.log('T-shirt order', { garment, size, quantity, total, customer });
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={step} totalSteps={STEPS.length} steps={STEPS} />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Pick Your Garment</h2>
              <p className="mt-2 text-gray-400">Choose your apparel. Minimum 15 pieces.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(Object.entries(apparelPricing.garments) as [GarmentKey, { base: number; label: string; type: string; image: string }][]).map(
                  ([key, { base, label, type, image }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGarment(key)}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${
                        garment === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="text-3xl">{image}</span>
                      <div>
                        <span className="font-heading text-lg font-bold text-white">{label}</span>
                        <span className="block text-sm text-gray-400">{type}</span>
                        <span className="text-gold font-semibold">From ${base}+</span>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Size</h2>
              <p className="mt-2 text-gray-400">Larger sizes have a small upcharge.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-xl border-2 px-4 py-2 font-semibold transition ${
                      size === s ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-50/30 text-white'
                    }`}
                  >
                    {s}
                    {apparelPricing.sizeUpcharge[s] > 0 && (
                      <span className="ml-1 text-xs">+${apparelPricing.sizeUpcharge[s]}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Quantity (min 15)</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {QUICK_QTY.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`rounded-xl border-2 px-6 py-3 font-semibold transition ${
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

          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Print Options</h2>
              <div className="mt-6 space-y-4">
                {[
                  { key: 'front' as const, label: 'Front only', price: 4 },
                  { key: 'back' as const, label: 'Back only', price: 4 },
                  { key: 'both' as const, label: 'Front & back', price: 7 },
                ].map(({ key, label, price }) => (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${
                      printSide === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                    }`}
                  >
                    <span className="font-medium text-white">{label}</span>
                    <span className="text-gold">+${price}/shirt</span>
                    <input
                      type="radio"
                      name="print"
                      checked={printSide === key}
                      onChange={() => setPrintSide(key)}
                      className="h-5 w-5 text-gold"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
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

          {step === 6 && (
            <ArtworkUploadStep
              uploadedFile={uploadedFile}
              onFileChange={setUploadedFile}
              needsDesignHelp={needsDesignHelp}
              onDesignHelpChange={setNeedsDesignHelp}
            />
          )}

          {step === 7 && (
            <CustomerDetailsStep customer={customer} onChange={setCustomer} />
          )}

          {step === 8 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review & Submit</h2>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                <p className="text-gray-400">
                  <span className="text-white">{quantity} {garment ? apparelPricing.garments[garment].label : 'shirts'}</span> — ${total.toFixed(2)}
                </p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>Submit Order</CTAButton>
              </div>
            </div>
          )}

          {step < 8 && (
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
        <OrderSummaryPanel lines={summaryLines} total={garment ? total : null} />
      </div>
    </div>
  );
}
