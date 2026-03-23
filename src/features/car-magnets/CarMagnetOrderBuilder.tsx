import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { DeliveryBadges } from '../../components/order/DeliveryBadges';
import { DeliverySection } from '../../components/order/DeliverySection';
import { ProductHeroSection } from '../../components/order/ProductHeroSection';
import { SizeOptionCard } from '../../components/order/SizeOptionCard';
import { carMagnetPricing, type CarMagnetKey } from '../../data/carMagnetPricing';
import { PRODUCTS_WITH_IMAGES } from '../../data/products';

const STEPS_KEYS = [
  'orderFlow.chooseProductSize',
  'orderFlow.productOptions',
  'orderFlow.uploadArtwork',
  'orderFlow.orderSummary',
];

export function CarMagnetOrderBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [option, setOption] = useState<CarMagnetKey | null>(null);
  const [designHelp, setDesignHelp] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const magnetProduct = PRODUCTS_WITH_IMAGES.find((p) => p.slug === 'magnets');
  const optionData = option ? carMagnetPricing.options[option] : null;
  const basePrice = optionData?.price ?? 0;
  const isQuote = optionData && 'isQuote' in optionData;
  const total = isQuote
    ? 0
    : basePrice +
      (designHelp ? carMagnetPricing.addons.design : 0) +
      (rush ? carMagnetPricing.addons.rush : 0);

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
        {magnetProduct && (
          <>
            <ProductHeroSection
              productName={t(magnetProduct.titleKey)}
              heroImage={magnetProduct.thumbnail}
              badge="startingAt"
              badgeValue="85"
            />
            <div className="mt-4">
              <DeliveryBadges badges={['nextDay', 'fastTurnaround']} />
            </div>
            <div className="mt-6">
              <DeliverySection />
            </div>
          </>
        )}

        <StepIndicator
          currentStep={step}
          totalSteps={STEPS_KEYS.length}
          steps={STEPS_KEYS.map((s) => t(s))}
        />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.chooseProductSize')}</h2>
              <p className="mt-2 text-gray-400">Choose your magnet size. See vehicle mockup guide below.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(Object.entries(carMagnetPricing.options) as [CarMagnetKey, typeof carMagnetPricing.options[CarMagnetKey]][]).map(
                  ([key, opt]) => (
                    <SizeOptionCard
                      key={key}
                      selected={option === key}
                      onClick={() => setOption(key)}
                      label={opt.label}
                      price={opt.price === 0 ? 'Request Quote' : opt.price}
                      badge={opt.badge === 'mostPopular' ? 'mostPopular' : undefined}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.productOptions')}</h2>
              <p className="mt-2 text-gray-400">Optional extras.</p>
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
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.uploadArtwork')}</h2>
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
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.orderSummary')}</h2>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                <p className="text-gray-400">
                  <span className="text-white">{option && carMagnetPricing.options[option].label}</span>
                  {isQuote ? ' — Request Quote' : ` — $${total}`}
                </p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>
                  {isQuote ? t('common.requestQuote') : t('common.startOrderBtn')}
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
            <p className="mt-1 text-xs text-gray-500">Updates in real time</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Size</dt>
                <dd className="font-medium text-white">{option ? carMagnetPricing.options[option].label : '—'}</dd>
              </div>
              {(designHelp || rush) && (
                <div>
                  <dt className="text-gray-500">Extras</dt>
                  <dd className="font-medium text-white">
                    {[designHelp && 'Design', rush && 'Rush'].filter(Boolean).join(', ')}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-4 border-t border-charcoal-50/30 pt-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Total</span>
                <span className="text-xl font-bold text-gold">
                  {isQuote ? 'Quote' : total > 0 ? `$${total}` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
