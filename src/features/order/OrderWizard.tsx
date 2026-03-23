import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { OrderSummaryCard } from '../../components/ui/OrderSummaryCard';
import { CTAButton } from '../../components/ui/CTAButton';
import { PRODUCTS } from '../../data/products';
import { PRODUCT_ORDER_ROUTES } from '../../data/productRoutes';
import { ORDER_STEPS, SOURCE_OPTIONS } from './ORDER_STEPS';
import { ARTWORK_STATUS_OPTIONS, DESIGN_STATUS_OPTIONS } from './DESIGN_HELP';
import { ArtworkStatusStep } from './ArtworkStatusStep';
import { VectorCleanupStep } from './VectorCleanupStep';
import { CreativeBriefStep } from './CreativeBriefStep';

const defaultVectorForm = {
  finalPrintUse: '',
  targetSize: '',
  colors: '',
  notes: '',
  checkboxes: {} as Record<string, boolean>,
};

const defaultCreativeForm = {
  whatCreating: '',
  productType: '',
  businessName: '',
  textToInclude: '',
  styleVibe: '',
  colors: '',
  dimensions: '',
  deadline: '',
  extraNotes: '',
};

export function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [artworkStatus, setArtworkStatus] = useState<string | null>(null);
  const [vectorForm, setVectorForm] = useState(defaultVectorForm);
  const [creativeForm, setCreativeForm] = useState(defaultCreativeForm);
  const [designStatus, setDesignStatus] = useState<string>(DESIGN_STATUS_OPTIONS[0]);
  const [rushRequested, setRushRequested] = useState(false);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', company: '' });
  const [source, setSource] = useState('');
  const [sponsorCode, setSponsorCode] = useState('');

  const { t } = useTranslation();
  const navigate = useNavigate();
  const totalSteps = ORDER_STEPS.length;
  const orderableProducts = PRODUCTS.filter((p) => PRODUCT_ORDER_ROUTES[p.orderSlug]);
  const selectedProd = selectedProduct ? orderableProducts.find((p) => p.orderSlug === selectedProduct) : null;
  const productName = selectedProd ? t(selectedProd.titleKey) : '—';
  const specs = { size, quantity };

  const needsVectorCleanup = artworkStatus === 'cleanup';
  const needsCreativeBrief = artworkStatus === 'design-created' || artworkStatus === 'need-help';
  const artworkStatusLabel = artworkStatus
    ? ARTWORK_STATUS_OPTIONS.find((o) => o.id === artworkStatus)?.label ?? '—'
    : '—';

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    console.log('Order submitted (placeholder)', {
      selectedProduct,
      size,
      quantity,
      artworkStatus,
      vectorForm: needsVectorCleanup ? vectorForm : null,
      creativeForm: needsCreativeBrief ? creativeForm : null,
      designStatus,
      rushRequested,
      customer,
      source,
      sponsorCode,
    });
    navigate('/thank-you');
  };

  const handleVectorChange = (field: string, value: string | Record<string, boolean>) => {
    if (field === 'checkboxes') {
      setVectorForm((f) => ({ ...f, checkboxes: value as Record<string, boolean> }));
    } else {
      setVectorForm((f) => ({ ...f, [field]: value as string }));
    }
  };

  const handleCreativeChange = (field: string, value: string) => {
    setCreativeForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={[...ORDER_STEPS]} />

          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Product Type</h2>
                <p className="mt-2 text-gray-400">Select the type of print you need.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {orderableProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product.orderSlug)}
                      className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
                        selectedProduct === product.orderSlug ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      {product.thumbnail ? (
                        <img src={product.thumbnail} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                      ) : (
                        <span className="text-2xl">{product.icon}</span>
                      )}
                      <div>
                        <h3 className="font-semibold text-white">{t(product.titleKey)}</h3>
                        <p className="text-sm text-gray-400">{t(product.descriptionKey)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <ArtworkStatusStep selected={artworkStatus} onSelect={setArtworkStatus} />
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Size</h2>
                <p className="mt-2 text-gray-400">Choose your size. Options vary by product.</p>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400">Size</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Quantity</h2>
                <p className="mt-2 text-gray-400">How many do you need?</p>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                {artworkStatus === 'print-ready' && (
                  <>
                    <h2 className="font-heading text-2xl font-bold text-white">Upload Artwork</h2>
                    <p className="mt-2 text-gray-400">
                      Upload your logo, screenshot or design idea.
                    </p>
                    <div className="mt-6">
                      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-14">
                        <p className="text-gray-400">Drag & drop or click to upload</p>
                        <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF, AI, EPS — max 10MB</p>
                        <button type="button" className="mt-6 rounded-lg border-2 border-gold bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20">
                          Choose Files
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {needsVectorCleanup && (
                  <VectorCleanupStep form={vectorForm} onChange={handleVectorChange} />
                )}

                {needsCreativeBrief && (
                  <CreativeBriefStep form={creativeForm} onChange={handleCreativeChange} />
                )}

                {!artworkStatus && (
                  <p className="text-gray-500">
                    Please go back and select your artwork status first.
                  </p>
                )}
              </div>
            )}

            {currentStep === 6 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Rush Turnaround</h2>
                <p className="mt-2 text-gray-400">Rush orders available. Need it fast?</p>
                <div className="mt-6">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-charcoal-50/30 p-4">
                    <input
                      type="checkbox"
                      checked={rushRequested}
                      onChange={(e) => setRushRequested(e.target.checked)}
                      className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                    />
                    <span className="font-medium text-white">I need rush delivery</span>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Contact Info</h2>
                <p className="mt-2 text-gray-400">How we reach you for quotes and updates.</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Name *</label>
                    <input type="text" placeholder="Your name" className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={customer.name} onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email *</label>
                    <input type="email" placeholder="you@example.com" className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={customer.email} onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                    <input type="tel" placeholder="(555) 123-4567" className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={customer.phone} onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Company (optional)</label>
                    <input type="text" placeholder="Your business" className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={customer.company} onChange={(e) => setCustomer((c) => ({ ...c, company: e.target.value }))} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Source Tracking</h2>
                <p className="mt-2 text-gray-400">Where did you hear about us?</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Source</label>
                    <select className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={source} onChange={(e) => setSource(e.target.value)}>
                      <option value="">Select...</option>
                      {SOURCE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Sponsor / Vendor Code</label>
                    <input type="text" placeholder="e.g. HUSTLEFANZ20" className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" value={sponsorCode} onChange={(e) => setSponsorCode(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 9 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Review & Submit</h2>
                <p className="mt-2 text-gray-400">We'll review your details before production.</p>
                <div className="mt-6 space-y-4 rounded-lg border border-charcoal-50/30 p-4">
                  <p className="text-gray-400"><span className="text-gray-500">Product:</span> <span className="text-white">{productName}</span></p>
                  <p className="text-gray-400"><span className="text-gray-500">Size:</span> <span className="text-white">{size || '—'}</span></p>
                  <p className="text-gray-400"><span className="text-gray-500">Quantity:</span> <span className="text-white">{quantity || '—'}</span></p>
                  <p className="text-gray-400"><span className="text-gray-500">Artwork:</span> <span className="text-white">{artworkStatusLabel}</span></p>
                  {(needsVectorCleanup || needsCreativeBrief) && (
                    <p className="text-gray-400">
                      <span className="text-gray-500">Design status:</span>{' '}
                      <span className="text-gold">{designStatus}</span>
                    </p>
                  )}
                  <p className="text-gray-400"><span className="text-gray-500">Rush:</span> <span className="text-white">{rushRequested ? 'Yes' : 'No'}</span></p>
                  <p className="text-gray-400"><span className="text-gray-500">Contact:</span> <span className="text-white">{customer.name || '—'} ({customer.email || '—'})</span></p>
                  <p className="text-gray-400"><span className="text-gray-500">Source:</span> <span className="text-white">{source || '—'}</span></p>
                  {sponsorCode && <p className="text-gray-400"><span className="text-gray-500">Sponsor Code:</span> <span className="text-gold">{sponsorCode}</span></p>}
                </div>

                {/* Design status selector (mock - for demo) */}
                {(needsVectorCleanup || needsCreativeBrief) && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-400">Design status (mock)</label>
                    <select
                      className="mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      value={designStatus}
                      onChange={(e) => setDesignStatus(e.target.value)}
                    >
                      {DESIGN_STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <CTAButton variant="secondary" onClick={handleSubmit} className="flex-1">Request Quote</CTAButton>
                  <CTAButton variant="primary" onClick={handleSubmit} className="flex-1">Submit Order</CTAButton>
                </div>
              </div>
            )}

            {currentStep < 9 && (
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={handleBack} disabled={currentStep === 1} className="rounded-md px-4 py-2 text-gray-400 transition hover:text-white disabled:opacity-50">Back</button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 2 && !artworkStatus}
                  className="rounded-md bg-gold px-6 py-2 font-semibold text-charcoal transition hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:block">
          <div className="lg:sticky lg:top-24">
            <OrderSummaryCard
              productName={productName}
              specs={specs}
              rushRequested={rushRequested}
              artworkStatus={artworkStatusLabel}
              designStatus={needsVectorCleanup || needsCreativeBrief ? designStatus : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
