import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import { DeliveryBadges } from '../../components/order/DeliveryBadges';
import { DeliverySection } from '../../components/order/DeliverySection';
import { ProductHeroSection } from '../../components/order/ProductHeroSection';
import { SizeOptionCard } from '../../components/order/SizeOptionCard';
import {
  yardSignPricing,
  getYardSignPricePerSign,
  type YardSignSizeKey,
} from '../../data/yardSignPricing';
import { PRODUCTS_WITH_IMAGES } from '../../data/products';

const STEPS_KEYS = [
  'orderFlow.chooseProductSize',
  'orderFlow.quantityOrBuild',
  'orderFlow.productOptions',
  'orderFlow.extras',
  'orderFlow.uploadArtwork',
  'orderFlow.orderSummary',
];

const QUICK_QUANTITIES = [1, 5, 10, 25, 50, 100];

export function YardSignBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [size, setSize] = useState<YardSignSizeKey | null>(null);
  const [quantity, setQuantity] = useState(10);
  const [quantityInput, setQuantityInput] = useState('10');
  const [doubleSided, setDoubleSided] = useState(false);
  const [stakes, setStakes] = useState(false);
  const [gloss, setGloss] = useState(false);
  const [rush, setRush] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);

  const signProduct = PRODUCTS_WITH_IMAGES.find((p) => p.slug === 'signs');
  const effectiveQuantity = Math.max(1, quantity);

  const calculatePricing = useCallback(() => {
    if (!size) return { pricePerSign: 0, total: 0 };
    const pricePerSign = getYardSignPricePerSign(size, effectiveQuantity, doubleSided);
    let subtotal = pricePerSign * effectiveQuantity;
    if (stakes) subtotal += yardSignPricing.addons.stakes * effectiveQuantity;
    if (gloss) subtotal += yardSignPricing.addons.gloss * effectiveQuantity;
    if (rush) subtotal += yardSignPricing.addons.rush;
    if (designHelp) subtotal += yardSignPricing.addons.design;
    return { pricePerSign, total: subtotal };
  }, [size, effectiveQuantity, doubleSided, stakes, gloss, rush, designHelp]);

  const pricing = calculatePricing();

  const handleQuantitySelect = (q: number) => {
    setQuantity(q);
    setQuantityInput(String(q));
  };

  const handleQuantityInputChange = (value: string) => {
    setQuantityInput(value);
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) setQuantity(parsed);
  };

  const canProceed = () => {
    if (currentStep === 1) return !!size;
    if (currentStep === 5) return uploadedFile || needsDesignHelp || designHelp;
    return true;
  };

  const handleSubmit = () => {
    console.log('Yard sign order', { size, quantity: effectiveQuantity, doubleSided, stakes, gloss, rush, designHelp, total: pricing.total });
    navigate('/thank-you');
  };

  const orderSummaryContent = (
    <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
      <h3 className="font-heading text-lg font-bold tracking-wide text-gold">Order Summary</h3>
      <p className="mt-1 text-xs text-gray-500">Updates in real time</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-gray-500">Size</dt>
          <dd className="font-medium text-white">{size ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Quantity</dt>
          <dd className="font-medium text-white">{effectiveQuantity} signs</dd>
        </div>
        <div>
          <dt className="text-gray-500">Print</dt>
          <dd className="font-medium text-white">{doubleSided ? 'Double-sided' : 'Single-sided'}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Price per sign</dt>
          <dd className="font-medium text-gold">${pricing.pricePerSign.toFixed(2)}</dd>
        </div>
        {(stakes || gloss) && (
          <div>
            <dt className="text-gray-500">Add-ons</dt>
            <dd className="font-medium text-white">{[stakes && 'Stakes', gloss && 'Gloss'].filter(Boolean).join(', ')}</dd>
          </div>
        )}
        {(rush || designHelp) && (
          <div>
            <dt className="text-gray-500">Extras</dt>
            <dd className="font-medium text-white">{[rush && 'Rush', designHelp && 'Design help'].filter(Boolean).join(', ')}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4 border-t border-charcoal-50/30 pt-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Total</span>
          <span className="text-2xl font-bold text-gold">${pricing.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:grid lg:grid-cols-3 lg:gap-12">
      <div className="lg:col-span-2">
        {signProduct && (
          <>
            <ProductHeroSection
              productName={t(signProduct.titleKey)}
              heroImage={signProduct.thumbnail}
              badge="nextDayReady"
            />
            <div className="mt-4">
              <DeliveryBadges badges={['nextDay', 'fastTurnaround']} />
            </div>
            <div className="mt-6">
              <DeliverySection />
            </div>
          </>
        )}

        <StepIndicator currentStep={currentStep} totalSteps={STEPS_KEYS.length} steps={STEPS_KEYS.map((s) => t(s))} />

        <div className="mt-6 rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.chooseProductSize')}</h2>
              <p className="mt-2 text-gray-400">Choose your yard sign size. Real-world yard image with stakes below.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(Object.entries(yardSignPricing.sizes) as [YardSignSizeKey, { pricePerSign: number; badge: string | null }][]).map(
                  ([key, { pricePerSign, badge }]) => (
                    <SizeOptionCard
                      key={key}
                      selected={size === key}
                      onClick={() => setSize(key)}
                      label={`${key} in`}
                      price={pricePerSign}
                      badge={badge === 'mostPopular' ? 'mostPopular' : undefined}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.quantityOrBuild')}</h2>
              <p className="mt-2 text-gray-400">Choose quantity — price per sign drops with volume.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {QUICK_QUANTITIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuantitySelect(q)}
                    className={`rounded-xl border-2 px-6 py-3 font-semibold transition-all ${
                      quantity === q ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-50/30 text-white hover:border-gold/50'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400">Or enter custom quantity</label>
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

          {currentStep === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.productOptions')}</h2>
              <p className="mt-2 text-gray-400">Single or double-sided, stakes, finish.</p>
              <div className="mt-6 space-y-4">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-5 transition-all ${
                    !doubleSided ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                  }`}
                >
                  <input type="radio" name="printType" checked={!doubleSided} onChange={() => setDoubleSided(false)} className="mt-1 h-5 w-5 text-gold" />
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
                  <input type="radio" name="printType" checked={doubleSided} onChange={() => setDoubleSided(true)} className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <span className="font-semibold text-white">Double-sided</span>
                    <p className="mt-1 text-sm text-gray-400">Best for visibility from both sides</p>
                    {size && <p className="mt-1 text-gold font-medium">+${yardSignPricing.doubleSidedAddPerSign}/sign</p>}
                  </div>
                </label>
              </div>
              <div className="mt-6 space-y-3">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${stakes ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'}`}>
                  <span className="font-medium text-white">Stakes</span>
                  <span className="text-gold font-semibold">+${yardSignPricing.addons.stakes}/sign</span>
                  <input type="checkbox" checked={stakes} onChange={(e) => setStakes(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${gloss ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'}`}>
                  <span className="font-medium text-white">Gloss finish</span>
                  <span className="text-gold font-semibold">+${yardSignPricing.addons.gloss}/sign</span>
                  <input type="checkbox" checked={gloss} onChange={(e) => setGloss(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.extras')}</h2>
              <p className="mt-2 text-gray-400">Rush production and design support.</p>
              <div className="mt-6 space-y-3">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${rush ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'}`}>
                  <span className="font-medium text-white">Rush production</span>
                  <span className="text-gold font-semibold">+${yardSignPricing.addons.rush}</span>
                  <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 ${designHelp ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'}`}>
                  <span className="font-medium text-white">Design help</span>
                  <span className="text-gold font-semibold">+${yardSignPricing.addons.design}</span>
                  <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                </label>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.uploadArtwork')}</h2>
              <p className="mt-2 text-gray-400">Upload your design or let us create it for you.</p>
              <div className="mt-6 space-y-4">
                <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 ${uploadedFile ? 'border-gold bg-gold/5' : 'border-charcoal-50/50 bg-charcoal-400/50 hover:border-gold/50'}`}>
                  <input type="file" id="yard-sign-upload" accept=".png,.jpg,.jpeg,.pdf,.ai,.eps" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)} />
                  <label htmlFor="yard-sign-upload" className="cursor-pointer text-center">
                    <p className="text-gray-400">Drag & drop or click to upload</p>
                    <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF, AI, EPS — max 10MB</p>
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

          {currentStep === 6 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.orderSummary')}</h2>
              <p className="mt-2 text-gray-400">Review and confirm your order.</p>
              <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                <p className="text-gray-400">
                  {effectiveQuantity} yard sign{effectiveQuantity > 1 ? 's' : ''} — ${pricing.total.toFixed(2)}
                </p>
              </div>
              <div className="mt-6">
                <CTAButton variant="primary" onClick={handleSubmit}>Order Now</CTAButton>
              </div>
            </div>
          )}

          {currentStep < 6 && (
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep === 1} className="rounded-md px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50">Back</button>
              <button type="button" onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()} className="rounded-md bg-gold px-6 py-2 font-semibold text-charcoal hover:bg-gold-300 disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        <div className="lg:sticky lg:top-24">{orderSummaryContent}</div>
      </div>
    </div>
  );
}
