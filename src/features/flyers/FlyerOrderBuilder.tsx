import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { OrderSummaryPanel } from '../../components/order/OrderSummaryPanel';
import { ArtworkUploadStep } from '../../components/order/ArtworkUploadStep';
import { CustomerDetailsStep, type CustomerDetails } from '../../components/order/CustomerDetailsStep';
import { ProductHeroSection } from '../../components/order/ProductHeroSection';
import { DeliveryBadges } from '../../components/order/DeliveryBadges';
import { DeliverySection } from '../../components/order/DeliverySection';
import { SizeOptionCard } from '../../components/order/SizeOptionCard';
import { flyerPricing, type FlyerSizeKey, type FlyerPaperKey } from '../../data/flyerPricing';

const STEPS_KEYS = [
  'orderFlow.chooseProductSize',
  'orderFlow.quantityOrBuild',
  'orderFlow.productOptions',
  'orderFlow.extras',
  'orderFlow.uploadArtwork',
  'order.contactInfo',
  'orderFlow.orderSummary',
];

export function FlyerOrderBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<FlyerSizeKey | null>(null);
  const [doubleSided, setDoubleSided] = useState(true);
  const [paper, setPaper] = useState<FlyerPaperKey>('matte');
  const [quantity, setQuantity] = useState(500);
  const [designHelp, setDesignHelp] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const isCustom = size === 'custom';
  const sizeData = size && size in flyerPricing.sizes ? flyerPricing.sizes[size] : null;
  const basePer100 = sizeData?.basePer100 ?? 0;
  const multiplier = doubleSided ? flyerPricing.doubleSidedMultiplier : 1;
  const paperAdd = paper in flyerPricing.paper ? flyerPricing.paper[paper as FlyerPaperKey].addPerSheet : 0;

  const sheetsCost = (quantity / 100) * basePer100 * multiplier;
  const paperCost = paperAdd > 0 ? quantity * paperAdd : 0;
  let total = isCustom ? 0 : sheetsCost + paperCost;
  if (designHelp) total += flyerPricing.addons.design;
  if (rush) total += flyerPricing.addons.rush;

  const summaryLines: { label: string; value: string }[] = [
    { label: 'Size', value: sizeData?.label ?? '—' },
    { label: 'Print', value: doubleSided ? 'Double-sided' : 'Single-sided' },
    { label: 'Paper', value: paper in flyerPricing.paper ? flyerPricing.paper[paper].label : '—' },
    { label: 'Quantity', value: isCustom ? '—' : `${quantity}` },
  ];
  if (designHelp) summaryLines.push({ label: 'Design help', value: '+$25' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+$30' });

  const canProceed = () => {
    if (step === 1) return !!size;
    if (step === 5) return uploadedFile || needsDesignHelp || designHelp;
    if (step === 6) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    console.log('Flyer order', { size, quantity, doubleSided, paper, total, customer });
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <ProductHeroSection
            productName={t('order.flyersTitle')}
            badge="startingAt"
            badgeValue="35"
          />
          <DeliveryBadges badges={['sameDay', 'fastTurnaround']} className="mt-4" />
        </div>
      </div>

      <DeliverySection className="mx-auto max-w-6xl px-4 py-4" />

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <StepIndicator currentStep={step} totalSteps={STEPS_KEYS.length} steps={STEPS_KEYS.map((s) => t(s))} />

          <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
            {step === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.chooseProductSize')}</h2>
                <p className="mt-2 text-gray-400">Select your flyer size (see size guide below). Flow starts with size — artwork comes last.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(Object.entries(flyerPricing.sizes) as [FlyerSizeKey, { basePer100: number; label: string; badge: string | null }][]).map(
                    ([key, sizeOpt]) => (
                      <SizeOptionCard
                        key={key}
                        selected={size === key}
                        onClick={() => setSize(key)}
                        label={sizeOpt.label}
                        price={key === 'custom' ? 'Quote' : `$${sizeOpt.basePer100}/100`}
                        badge={sizeOpt.badge === 'mostPopular' ? 'mostPopular' : undefined}
                      />
                    )
                  )}
                </div>
              </div>
            )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Print Type</h2>
              <p className="mt-2 text-gray-400">Double-sided recommended for most uses.</p>
              <div className="mt-6 space-y-4">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30'}`}>
                  <span className="font-medium text-white">Double-sided (recommended)</span>
                  <input type="radio" name="print" checked={doubleSided} onChange={() => setDoubleSided(true)} className="h-5 w-5 text-gold" />
                </label>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${!doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30'}`}>
                  <span className="font-medium text-white">Single-sided</span>
                  <input type="radio" name="print" checked={!doubleSided} onChange={() => setDoubleSided(false)} className="h-5 w-5 text-gold" />
                </label>
              </div>
              <h3 className="mt-8 font-heading text-lg font-bold text-gold">Paper Type</h3>
              <div className="mt-3 space-y-2">
                {(Object.entries(flyerPricing.paper) as [FlyerPaperKey, { label: string }][]).map(([key, { label }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPaper(key)}
                    className={`w-full rounded-lg border-2 p-3 text-left transition ${paper === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30'}`}
                  >
                    <span className="font-medium text-white">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Quantity</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {flyerPricing.quantityPresets.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`rounded-xl border-2 px-5 py-3 font-semibold transition ${quantity === q ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-50/30 text-white'}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={100}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(100, parseInt(e.target.value, 10) || 100))}
                className="mt-4 w-32 rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white"
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Add-ons</h2>
              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Design help</span>
                  <span className="text-gold font-semibold">+$25</span>
                  <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                  <span className="font-medium text-white">Rush</span>
                  <span className="text-gold font-semibold">+$30</span>
                  <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
              </div>
            </div>
          )}

          {step === 5 && (
            <ArtworkUploadStep
              uploadedFile={uploadedFile}
              onFileChange={setUploadedFile}
              needsDesignHelp={needsDesignHelp}
              onDesignHelpChange={setNeedsDesignHelp}
            />
          )}

          {step === 6 && (
            <CustomerDetailsStep customer={customer} onChange={setCustomer} />
          )}

          {step === 7 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">Review & Submit</h2>
              {isCustom ? (
                <p className="mt-2 text-gray-400">We'll contact you with a custom quote.</p>
              ) : (
                <p className="mt-2 text-gray-400">{quantity} flyers — ${total.toFixed(2)}</p>
              )}
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>
                  {isCustom ? 'Request Quote' : 'Submit Order'}
                </CTAButton>
              </div>
            </div>
          )}

          {step < 7 && (
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 1} className="rounded-lg px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50">
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
          <OrderSummaryPanel lines={summaryLines} total={isCustom ? null : total} footer={isCustom ? 'Custom quote' : undefined} />
        </div>
      </div>
    </div>
  );
}
