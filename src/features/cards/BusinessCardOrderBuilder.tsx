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
import {
  businessCardPricing,
  getBusinessCardPrice,
  type BusinessCardFinishKey,
  type BusinessCardThicknessKey,
} from '../../data/businessCardPricing';

const STEPS_KEYS = [
  'orderFlow.quantityOrBuild',
  'orderFlow.productOptions',
  'orderFlow.extras',
  'orderFlow.uploadArtwork',
  'order.contactInfo',
  'orderFlow.orderSummary',
];

const PRODUCT_IMAGE = '/media/general/business-cards.jpg';

export function BusinessCardOrderBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(500);
  const [finish, setFinish] = useState<BusinessCardFinishKey>('matte');
  const [thickness, setThickness] = useState<BusinessCardThicknessKey>('14pt');
  const [designHelp, setDesignHelp] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const total = getBusinessCardPrice(quantity, finish, thickness, designHelp, rush);

  const summaryLines: { label: string; value: string }[] = [
    { label: 'Product', value: t('order.cardsTitle') },
    { label: 'Quantity', value: `${quantity}` },
    { label: 'Finish', value: businessCardPricing.finish[finish].label },
    { label: 'Thickness', value: businessCardPricing.thickness[thickness].label },
  ];
  if (designHelp) summaryLines.push({ label: 'Design help', value: '+$25' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+$30' });

  const canProceed = () => {
    if (step === 4) return uploadedFile || needsDesignHelp || designHelp;
    if (step === 5) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    console.log('Business card order', { quantity, finish, thickness, total, customer });
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <ProductHeroSection
            productName={t('order.cardsTitle')}
            heroImage={PRODUCT_IMAGE}
            badge="startingAt"
            badgeValue="25"
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
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.quantityOrBuild')}</h2>
                <p className="mt-2 text-gray-400">Choose your quantity. Tier-based pricing — more cards, lower per-card cost.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {businessCardPricing.quantityPresets.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`rounded-xl border-2 px-5 py-3 font-semibold transition ${
                        quantity === q ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-50/30 text-white hover:border-gold/50'
                      }`}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-400">Custom quantity</label>
                  <input
                    type="number"
                    min={250}
                    step={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(250, parseInt(e.target.value, 10) || 250))}
                    className="mt-1 w-32 rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.productOptions')}</h2>
                <p className="mt-2 text-gray-400">Finish and thickness options for your business cards.</p>

                <h3 className="mt-6 font-heading text-lg font-bold text-gold">Finish</h3>
                <div className="mt-3 space-y-2">
                  {(Object.entries(businessCardPricing.finish) as [BusinessCardFinishKey, { label: string; addPer100: number }][]).map(([key, { label, addPer100 }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFinish(key)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                        finish === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-medium text-white">{label}</span>
                      {addPer100 > 0 && <span className="text-sm text-gold">+${addPer100}/100</span>}
                    </button>
                  ))}
                </div>

                <h3 className="mt-8 font-heading text-lg font-bold text-gold">Thickness</h3>
                <div className="mt-3 space-y-2">
                  {(Object.entries(businessCardPricing.thickness) as [BusinessCardThicknessKey, { label: string; addPer100: number }][]).map(([key, { label, addPer100 }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setThickness(key)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                        thickness === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-medium text-white">{label}</span>
                      {addPer100 > 0 && <span className="text-sm text-gold">+${addPer100}/100</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.extras')}</h2>
                <p className="mt-2 text-gray-400">Optional add-ons.</p>
                <div className="mt-6 space-y-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Design help</span>
                    <span className="font-semibold text-gold">+$25</span>
                    <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Rush</span>
                    <span className="font-semibold text-gold">+$30</span>
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

            {step === 5 && <CustomerDetailsStep customer={customer} onChange={setCustomer} />}

            {step === 6 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.orderSummary')}</h2>
                <p className="mt-2 text-gray-400">{quantity} business cards — ${total.toFixed(2)}</p>
                <div className="mt-6">
                  <CTAButton variant="primary" onClick={handleSubmit}>
                    Submit Order
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
          <OrderSummaryPanel lines={summaryLines} total={total} />
        </div>
      </div>
    </div>
  );
}
