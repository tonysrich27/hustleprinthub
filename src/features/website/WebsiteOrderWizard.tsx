import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CTAButton } from '../../components/ui/CTAButton';
import {
  WEBSITE_TYPE_OPTIONS,
  WEBSITE_PACKAGES,
} from '../../data/websiteProducts';

const WEBSITE_STEPS = [
  'Website Type',
  'Business Type',
  'Main Goal',
  'Brand Assets',
  'Describe Offer',
] as const;

const inputClass =
  'mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

export function WebsiteOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteType, setWebsiteType] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [offerDescription, setOfferDescription] = useState('');

  const navigate = useNavigate();
  const totalSteps = WEBSITE_STEPS.length;

  const selectedPackage = WEBSITE_PACKAGES.find((p) => p.id === websiteType);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    console.log('Website order submitted (placeholder)', {
      websiteType,
      businessType,
      mainGoal,
      offerDescription,
    });
    navigate('/thank-you?type=website');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        steps={[...WEBSITE_STEPS]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  What type of website do you need?
                </h2>
                <p className="mt-2 text-gray-400">
                  Select the option that best fits your goals.
                </p>
                <div className="mt-6 space-y-3">
                  {WEBSITE_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setWebsiteType(opt.id)}
                      className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                        websiteType === opt.id
                          ? 'border-gold bg-gold/10'
                          : 'border-charcoal-50/30 hover:border-gold/50'
                      }`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-current">
                        {websiteType === opt.id && (
                          <span className="h-2 w-2 rounded-full bg-gold" />
                        )}
                      </span>
                      <span className="font-medium text-white">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Business Type
                </h2>
                <p className="mt-2 text-gray-400">
                  What type of business or venture is this for?
                </p>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="e.g. Food truck, Event planning, Consulting, Real estate"
                    className={inputClass}
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Main Goal of the Site
                </h2>
                <p className="mt-2 text-gray-400">
                  What's the primary purpose? Capture leads, book appointments, promote events?
                </p>
                <div className="mt-6">
                  <textarea
                    placeholder="Describe your main goal..."
                    rows={4}
                    className={inputClass}
                    value={mainGoal}
                    onChange={(e) => setMainGoal(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Upload Brand Assets
                </h2>
                <p className="mt-2 text-gray-400">
                  Logo, colors, fonts — anything that represents your brand.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Logo
                    </label>
                    <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-10">
                      <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                      <button
                        type="button"
                        className="mt-3 rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Brand colors / reference images (optional)
                    </label>
                    <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-8">
                      <p className="text-sm text-gray-500">PNG, JPG — max 10MB</p>
                      <button
                        type="button"
                        className="mt-2 rounded-md border border-charcoal-50/50 px-4 py-2 text-sm text-gray-400"
                      >
                        Choose Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Describe the Offer
                </h2>
                <p className="mt-2 text-gray-400">
                  What should the site promote? Event, service, menu, booking?
                </p>
                <div className="mt-6">
                  <textarea
                    placeholder="Describe the offer, promotion, or main call-to-action the site should highlight..."
                    rows={5}
                    className={inputClass}
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep < 5 ? (
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="rounded-md px-4 py-2 text-gray-400 transition hover:text-white disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 1 && !websiteType}
                  className="rounded-md bg-gold px-6 py-2 font-semibold text-charcoal transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton variant="secondary" onClick={handleSubmit} className="flex-1">
                  Request Quote
                </CTAButton>
                <CTAButton variant="primary" onClick={handleSubmit} className="flex-1">
                  Submit Order
                </CTAButton>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Pricing + Automation */}
        <div className="space-y-6">
          {/* Pricing card */}
          {(websiteType === 'lead-funnel' || websiteType === 'business-website') && (
            <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
              <h3 className="font-heading text-lg font-bold text-gold">
                {selectedPackage?.name}
              </h3>
              <div className="mt-4 space-y-2">
                <p className="flex justify-between text-sm">
                  <span className="text-gray-400">Setup</span>
                  <span className="font-semibold text-white">
                    ${selectedPackage?.setupPrice}
                    {selectedPackage?.setupPriceNote ?? ''}
                  </span>
                </p>
                <p className="flex justify-between text-sm">
                  <span className="text-gray-400">{selectedPackage?.monthlyLabel}</span>
                  <span className="font-semibold text-gold">
                    ${selectedPackage?.monthlyPrice}/mo
                  </span>
                </p>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Site rental: ${selectedPackage?.monthlyPrice}/month
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {selectedPackage?.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-gold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Automation section */}
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/50 p-6">
            <h3 className="font-heading text-lg font-bold text-gold">
              Automation Features
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Turn visitors into leads and customers.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span><strong className="text-white">Lead capture</strong> — Forms that collect contact info</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span><strong className="text-white">SMS notifications</strong> — Instant alerts when someone submits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span><strong className="text-white">Email follow-ups</strong> — Automated sequences to nurture leads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold">•</span>
                <span><strong className="text-white">Appointment booking</strong> — Let visitors book directly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
