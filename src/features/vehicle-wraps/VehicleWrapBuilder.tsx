import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { OrderSummaryPanel } from '../../components/order/OrderSummaryPanel';
import { CustomerDetailsStep, type CustomerDetails } from '../../components/order/CustomerDetailsStep';
import {
  vehicleWrapPricing,
  type VehicleKey,
  type WrapTypeKey,
  type DecalKitKey,
} from '../../data/vehicleWrapPricing';

const STEPS = ['Vehicle', 'Wrap Type', 'Add-ons', 'Decal Kit', 'Your Details', 'Submit'];

export function VehicleWrapBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState<VehicleKey | null>(null);
  const [wrapType, setWrapType] = useState<WrapTypeKey>('full');
  const [fullColor, setFullColor] = useState(false);
  const [removal, setRemoval] = useState(false);
  const [ceramic, setCeramic] = useState(false);
  const [rush, setRush] = useState(false);
  const [decalKit, setDecalKit] = useState<DecalKitKey>('none');
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const totalSteps = STEPS.length;

  const sqFt = vehicle ? vehicleWrapPricing.vehicles[vehicle].sqFt : 0;
  const wrapMultiplier = vehicleWrapPricing.wrapTypes[wrapType].multiplier;
  const effectiveSqFt = sqFt * wrapMultiplier;
  const laborCost = effectiveSqFt * vehicleWrapPricing.laborPerSqFt;
  const materialCost = effectiveSqFt * vehicleWrapPricing.materialPerSqFt;
  let total = laborCost + materialCost;
  if (fullColor) total += vehicleWrapPricing.addons.fullColorUpgrade;
  if (removal) total += vehicleWrapPricing.addons.removal;
  if (ceramic) total += vehicleWrapPricing.addons.ceramicCoating;
  if (rush) total += vehicleWrapPricing.addons.rush;
  total += vehicleWrapPricing.decalKits[decalKit].price;

  const minEst = total * 0.9;
  const maxEst = total * 1.1;

  const summaryLines: { label: string; value: string }[] = [
    { label: 'Vehicle', value: vehicle ? vehicleWrapPricing.vehicles[vehicle].label : '—' },
    { label: 'Wrap', value: vehicleWrapPricing.wrapTypes[wrapType].label },
    { label: 'Sq ft', value: vehicle ? effectiveSqFt.toFixed(0) : '—' },
  ];
  if (fullColor) summaryLines.push({ label: 'Full color', value: '+$600' });
  if (removal) summaryLines.push({ label: 'Removal', value: '+$300' });
  if (ceramic) summaryLines.push({ label: 'Ceramic', value: '+$200' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+$300' });
  if (decalKit !== 'none') summaryLines.push({ label: 'Decal kit', value: vehicleWrapPricing.decalKits[decalKit].label });

  const canProceed = () => {
    if (step === 1) return !!vehicle;
    if (step === 5) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    const order = {
      product: 'vehicle-wrap',
      vehicle,
      wrapType,
      sqFt: effectiveSqFt,
      addons: { fullColor, removal, ceramic, rush },
      decalKit,
      customer,
      total,
      estimatedRange: { min: minEst, max: maxEst },
    };
    console.log('Vehicle wrap quote submitted', order);
    navigate('/thank-you');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={step} totalSteps={totalSteps} steps={STEPS} />

        <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Select Vehicle Type</h2>
              <p className="mt-2 text-gray-400">Choose your vehicle for an estimated price.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(Object.entries(vehicleWrapPricing.vehicles) as [VehicleKey, { sqFt: number; label: string }][]).map(
                  ([key, { sqFt: s, label }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setVehicle(key)}
                      className={`rounded-xl border-2 p-4 text-left transition ${
                        vehicle === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-heading text-lg font-bold text-white">{label}</span>
                      <span className="mt-1 block text-sm text-gold">{s} sq ft</span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Wrap Type</h2>
              <div className="mt-6 space-y-4">
                {(Object.entries(vehicleWrapPricing.wrapTypes) as [WrapTypeKey, { multiplier: number; label: string }][]).map(
                  ([key, { label }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setWrapType(key)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                        wrapType === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-semibold text-white">{label}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add-ons</h2>
              <div className="mt-6 space-y-3">
                {[
                  { key: 'fullColor', label: 'Full color upgrade', price: 600, checked: fullColor, set: setFullColor },
                  { key: 'removal', label: 'Removal', price: 300, checked: removal, set: setRemoval },
                  { key: 'ceramic', label: 'Ceramic coating', price: 200, checked: ceramic, set: setCeramic },
                  { key: 'rush', label: 'Rush', price: 300, checked: rush, set: setRush },
                ].map(({ label, price, checked, set }) => (
                  <label
                    key={label}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${
                      checked ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                    }`}
                  >
                    <span className="font-medium text-white">{label}</span>
                    <span className="text-gold font-semibold">+${price}</span>
                    <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add Branding / Decal Kit?</h2>
              <p className="mt-2 text-gray-400">Enhance your wrap with branded decals.</p>
              <div className="mt-6 space-y-3">
                {(Object.entries(vehicleWrapPricing.decalKits) as [DecalKitKey, { price: number; label: string; items?: string[] }][]).map(
                  ([key, { price, label, items }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDecalKit(key)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition ${
                        decalKit === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{label}</span>
                        {price > 0 && <span className="text-gold font-bold">+${price}</span>}
                        {price === 0 && key !== 'none' && <span className="text-gold">Quote</span>}
                      </div>
                      {items && items.length > 0 && (
                        <ul className="mt-2 list-inside list-disc text-sm text-gray-400">
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <CustomerDetailsStep customer={customer} onChange={setCustomer} />
          )}

          {step === 6 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Get Exact Quote</h2>
              <p className="mt-2 text-gray-400">
                Estimated range: ${minEst.toFixed(0)} – ${maxEst.toFixed(0)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Final price depends on vehicle condition and design complexity. We'll contact you within 24 hours.
              </p>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>
                  Submit Quote Request
                </CTAButton>
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
          total={vehicle ? total : null}
          totalLabel="Est. Total"
          footer="Labor $7/sq ft + material. Final quote may vary."
        />
      </div>
    </div>
  );
}
