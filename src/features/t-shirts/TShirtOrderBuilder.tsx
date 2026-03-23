import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { OrderSummaryPanel } from '../../components/order/OrderSummaryPanel';
import { ArtworkUploadStep } from '../../components/order/ArtworkUploadStep';
import { CustomerDetailsStep, type CustomerDetails } from '../../components/order/CustomerDetailsStep';
import { tShirtPricing } from '../../data/tShirtPricing';
import { apparelPricing, type GarmentKey, type SizeKey } from '../../data/apparelPricing';

const STEPS = ['Build Order', 'Print', 'Add-ons', 'Upload', 'Details', 'Submit'];
const SIZES: SizeKey[] = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export interface GarmentLine {
  garment: GarmentKey;
  sizeQtys: Record<SizeKey, number>;
}

function getLineTotal(sizeQtys: Record<SizeKey, number>): number {
  return SIZES.reduce((sum, s) => sum + (sizeQtys[s] ?? 0), 0);
}

function getLineSubtotal(line: GarmentLine, printCost: number): number {
  const total = getLineTotal(line.sizeQtys);
  const garmentBase = apparelPricing.garments[line.garment].base;
  let sum = 0;
  SIZES.forEach((size) => {
    const qty = line.sizeQtys[size] ?? 0;
    if (qty > 0) {
      const sizeAdd = apparelPricing.sizeUpcharge[size];
      sum += (garmentBase + printCost + sizeAdd) * qty;
    }
  });
  return sum;
}

const emptySizeQtys = (): Record<SizeKey, number> =>
  SIZES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {} as Record<SizeKey, number>);

export function TShirtOrderBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState<GarmentLine[]>([
    { garment: 'gildan5000', sizeQtys: emptySizeQtys() },
  ]);
  const [printSide, setPrintSide] = useState<'front' | 'back' | 'both'>('front');
  const [extraColor, setExtraColor] = useState(false);
  const [setup, setSetup] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [sleevePrint, setSleevePrint] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const printCost = printSide === 'front' ? 4 : printSide === 'back' ? 4 : 7;
  let subtotal = 0;
  lines.forEach((line) => {
    subtotal += getLineSubtotal(line, printCost);
  });
  const totalQty = lines.reduce((sum, line) => sum + getLineTotal(line.sizeQtys), 0);
  let total = subtotal;
  if (extraColor) total += tShirtPricing.addons.extraColor * totalQty;
  if (setup) total += tShirtPricing.addons.setup;
  if (designHelp) total += tShirtPricing.addons.design;
  if (sleevePrint) total += tShirtPricing.addons.sleevePrint * totalQty;
  if (rush) total += subtotal * tShirtPricing.addons.rushPercent;

  const summaryLines: { label: string; value: string }[] = [];
  lines.forEach((line, i) => {
    const qty = getLineTotal(line.sizeQtys);
    if (qty > 0) {
      const parts = SIZES.filter((s) => (line.sizeQtys[s] ?? 0) > 0).map((s) => `${line.sizeQtys[s]}${s}`);
      summaryLines.push({
        label: apparelPricing.garments[line.garment].label,
        value: `${qty} (${parts.join(', ')})`,
      });
    }
  });
  if (summaryLines.length === 0) summaryLines.push({ label: 'Order', value: '—' });
  summaryLines.push({ label: 'Print', value: printSide === 'front' ? 'Front' : printSide === 'back' ? 'Back' : 'Both' });
  if (extraColor) summaryLines.push({ label: 'Extra color', value: '+$2/shirt' });
  if (designHelp) summaryLines.push({ label: 'Design', value: '+$50' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+30%' });

  const canProceed = () => {
    if (step === 1) return totalQty >= 15;
    if (step === 4) return uploadedFile || needsDesignHelp || designHelp;
    if (step === 5) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    console.log('Apparel order', { lines, totalQty, total, customer });
    navigate('/thank-you');
  };

  const updateLine = (index: number, updates: Partial<GarmentLine>) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...updates } : l)));
  };

  const updateSizeQty = (lineIndex: number, size: SizeKey, qty: number) => {
    setLines((prev) =>
      prev.map((l, i) =>
        i === lineIndex ? { ...l, sizeQtys: { ...l.sizeQtys, [size]: Math.max(0, qty) } } : l
      )
    );
  };

  const addLine = () => {
    setLines((prev) => [...prev, { garment: 'gildan5000', sizeQtys: emptySizeQtys() }]);
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) setLines((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={step} totalSteps={STEPS.length} steps={STEPS} />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Build Your Order</h2>
              <p className="mt-2 text-gray-400">
                Add garments and set quantity per size. Min 15 total. Mix tees, hoodies, and more.
              </p>
              <div className="mt-6 space-y-6">
                {lines.map((line, idx) => {
                  const lineTotal = getLineTotal(line.sizeQtys);
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-charcoal-50/40 bg-charcoal-400/30 p-4"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <select
                          value={line.garment}
                          onChange={(e) => updateLine(idx, { garment: e.target.value as GarmentKey })}
                          className="rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-3 py-2 text-white focus:border-gold"
                        >
                          {(Object.entries(apparelPricing.garments) as [GarmentKey, { label: string }][]).map(
                            ([key, { label }]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            )
                          )}
                        </select>
                        <span className="text-sm font-semibold text-gold">Total: {lineTotal}</span>
                        {lines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLine(idx)}
                            className="text-sm text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                        {SIZES.map((size) => (
                          <div key={size}>
                            <label className="block text-xs text-gray-500">{size}</label>
                            <input
                              type="number"
                              min={0}
                              value={line.sizeQtys[size] || ''}
                              onChange={(e) =>
                                updateSizeQty(idx, size, parseInt(e.target.value, 10) || 0)
                              }
                              className="mt-0.5 w-full rounded border border-charcoal-50/30 bg-charcoal-100 px-2 py-1.5 text-center text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={addLine}
                  className="w-full rounded-xl border-2 border-dashed border-charcoal-50/40 py-4 text-gold transition hover:border-gold/50 hover:bg-gold/5"
                >
                  + Add another garment (e.g. hoodies, long sleeve)
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Order total: {totalQty} pieces {totalQty < 15 && '(min 15 required)'}
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Print Options</h2>
              <p className="mt-2 text-gray-400">Applies to all garments in your order.</p>
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
                    <span className="text-gold">+${price}/piece</span>
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

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add-ons</h2>
              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Extra color</span>
                  <span className="text-gold font-semibold">+$2/piece</span>
                  <input type="checkbox" checked={extraColor} onChange={(e) => setExtraColor(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Setup</span>
                  <span className="text-gold font-semibold">+$30</span>
                  <input type="checkbox" checked={setup} onChange={(e) => setSetup(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Design</span>
                  <span className="text-gold font-semibold">+$50</span>
                  <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Sleeve print</span>
                  <span className="text-gold font-semibold">+$3/piece</span>
                  <input type="checkbox" checked={sleevePrint} onChange={(e) => setSleevePrint(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Rush (+30%)</span>
                  <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <ArtworkUploadStep
              uploadedFile={uploadedFile}
              onFileChange={setUploadedFile}
              needsDesignHelp={needsDesignHelp}
              onDesignHelpChange={setNeedsDesignHelp}
            />
          )}

          {step === 5 && (
            <CustomerDetailsStep customer={customer} onChange={setCustomer} />
          )}

          {step === 6 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review & Submit</h2>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                {lines.map((line, i) => {
                  const qty = getLineTotal(line.sizeQtys);
                  if (qty === 0) return null;
                  const parts = SIZES.filter((s) => (line.sizeQtys[s] ?? 0) > 0).map((s) => `${line.sizeQtys[s]} ${s}`);
                  return (
                    <p key={i} className="text-gray-400">
                      <span className="text-white">{qty} {apparelPricing.garments[line.garment].label}</span>
                      {parts.length > 0 && <span> — {parts.join(', ')}</span>}
                    </p>
                  );
                })}
                <p className="mt-4 font-bold text-gold">Total: ${total.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>Submit Order</CTAButton>
              </div>
            </div>
          )}

          {step < 6 && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 1}
                className="rounded-lg px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="rounded-lg bg-gold px-6 py-2 font-bold text-charcoal hover:bg-gold-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        <OrderSummaryPanel
          lines={summaryLines}
          total={totalQty >= 15 ? total : null}
          footer={totalQty < 15 ? 'Min 15 pieces total' : undefined}
        />
      </div>
    </div>
  );
}
