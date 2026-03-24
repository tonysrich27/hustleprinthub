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
  apparelPricing,
  ADULT_SIZES,
  TODDLER_SIZES,
  type GarmentKey,
  type SizeKey,
  type ColorId,
} from '../../data/apparelPricing';

export interface ApparelRow {
  size: SizeKey;
  colorId: ColorId;
  qty: number;
}

export type PrintStyleKey = 'oneSide' | 'frontBack' | 'leftChestBack';

const STEPS_KEYS = [
  'orderFlow.quantityOrBuild',
  'orderFlow.productOptions',
  'orderFlow.extras',
  'orderFlow.uploadArtwork',
  'order.contactInfo',
  'orderFlow.orderSummary',
];

const PRODUCT_IMAGE = '/media/general/shirts-apparel.jpg';

function getTotalQty(rows: ApparelRow[]): number {
  return rows.reduce((sum, r) => sum + r.qty, 0);
}

function getSizeUpcharge(size: SizeKey): number {
  return apparelPricing.sizeUpcharge[size] ?? 0;
}

function getPrintPrice(style: PrintStyleKey): number {
  return apparelPricing.printStyles[style].price;
}

function calcApparelTotal(
  garment: GarmentKey,
  rows: ApparelRow[],
  printStyle: PrintStyleKey,
  extraColor: boolean,
  sleevePrint: boolean,
  setup: boolean,
  designHelp: boolean,
  rush: boolean
): number {
  const base = apparelPricing.garments[garment].base;
  const printCost = getPrintPrice(printStyle);
  let subtotal = 0;
  rows.forEach((r) => {
    if (r.qty > 0) {
      const upcharge = getSizeUpcharge(r.size);
      subtotal += (base + printCost + upcharge) * r.qty;
    }
  });
  const totalQty = getTotalQty(rows);
  let total = subtotal;
  if (extraColor) total += apparelPricing.addons.extraColor * totalQty;
  if (sleevePrint) total += apparelPricing.addons.sleevePrint * totalQty;
  if (setup) total += apparelPricing.addons.setup;
  if (designHelp) total += apparelPricing.addons.design;
  if (rush) total += subtotal * apparelPricing.addons.rush;
  return total;
}

const emptyRows = (sizes: readonly SizeKey[]): ApparelRow[] =>
  sizes.map((size) => ({ size, colorId: 'black', qty: 0 }));

export function TShirtOrderBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [garment, setGarment] = useState<GarmentKey>('gildan5000');
  const [rows, setRows] = useState<ApparelRow[]>(() => emptyRows(ADULT_SIZES));
  const [applySameColor, setApplySameColor] = useState(false);
  const [printStyle, setPrintStyle] = useState<PrintStyleKey>('frontBack');
  const [extraColor, setExtraColor] = useState(false);
  const [sleevePrint, setSleevePrint] = useState(false);
  const [setup, setSetup] = useState(false);
  const [designHelp, setDesignHelp] = useState(false);
  const [rush, setRush] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needsDesignHelp, setNeedsDesignHelp] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', notes: '' });

  const garmentData = apparelPricing.garments[garment];
  const sizes = garmentData.sizes;
  const colors = garmentData.colors;
  const totalQty = getTotalQty(rows);
  const total = calcApparelTotal(garment, rows, printStyle, extraColor, sleevePrint, setup, designHelp, rush);

  const summaryLines: { label: string; value: string }[] = [
    { label: 'Product', value: garmentData.label },
    { label: 'Total Qty', value: `${totalQty}` },
    {
      label: 'Print',
      value: apparelPricing.printStyles[printStyle].label.replace(' (Most Popular)', ''),
    },
  ];
  const rowSummary = rows
    .filter((r) => r.qty > 0)
    .map((r) => {
      const colorLabel = colors.find((c) => c.id === r.colorId)?.label ?? r.colorId;
      return `${r.qty} ${r.size} ${colorLabel}`;
    });
  if (rowSummary.length > 0) {
    summaryLines.push({ label: 'Breakdown', value: rowSummary.join(', ') });
  }
  if (extraColor) summaryLines.push({ label: 'Extra color', value: '+$2/piece' });
  if (sleevePrint) summaryLines.push({ label: 'Sleeve print', value: '+$3/piece' });
  if (setup) summaryLines.push({ label: 'Setup', value: '+$30' });
  if (designHelp) summaryLines.push({ label: 'Design', value: '+$50' });
  if (rush) summaryLines.push({ label: 'Rush', value: '+30%' });

  const canProceed = () => {
    if (step === 1) return totalQty >= 15;
    if (step === 4) return uploadedFile || needsDesignHelp || designHelp;
    if (step === 5) return !!(customer.name && customer.email);
    return true;
  };

  const handleSubmit = () => {
    console.log('Apparel order', { garment, rows, printStyle, totalQty, total, customer });
    navigate('/thank-you');
  };

  const updateRow = (index: number, updates: Partial<ApparelRow>) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...updates } : r)));
  };

  const applyColorToAll = (colorId: ColorId) => {
    setRows((prev) => prev.map((r) => ({ ...r, colorId })));
  };

  const switchGarment = (newGarment: GarmentKey) => {
    setGarment(newGarment);
    const newSizes = apparelPricing.garments[newGarment].sizes;
    setRows(emptyRows(newSizes));
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <ProductHeroSection
            productName={t('order.tShirtsTitle')}
            heroImage={PRODUCT_IMAGE}
            badge="bestSeller"
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
                <p className="mt-2 text-gray-400">
                  Build your order by size and color. Mix sizes and colors. Min 15 total.
                </p>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-400">Garment type</label>
                  <select
                    value={garment}
                    onChange={(e) => switchGarment(e.target.value as GarmentKey)}
                    className="mt-1 rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white focus:border-gold"
                  >
                    {(Object.entries(apparelPricing.garments) as [GarmentKey, typeof garmentData][]).map(
                      ([key, g]) => (
                        <option key={key} value={key}>
                          {g.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <label className="mt-6 flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={applySameColor}
                    onChange={(e) => setApplySameColor(e.target.checked)}
                    className="h-4 w-4 rounded text-gold"
                  />
                  <span className="text-sm font-medium text-gray-300">Apply same color to all sizes</span>
                </label>

                {applySameColor ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Color (all sizes)</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {colors.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => applyColorToAll(c.id)}
                            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                              rows[0]?.colorId === c.id
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-charcoal-50/30 text-white hover:border-gold/50'
                            }`}
                          >
                            <span className="mr-2 inline-block h-4 w-4 rounded-full border border-gray-600" style={{ backgroundColor: c.hex }} />
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="py-2">Size</th>
                            <th className="py-2">Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <tr key={i} className="border-t border-charcoal-50/20">
                              <td className="py-2 font-medium text-white">{r.size}</td>
                              <td className="py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={r.qty || ''}
                                  onChange={(e) => updateRow(i, { qty: parseInt(e.target.value, 10) || 0 })}
                                  className="w-20 rounded border border-charcoal-50/30 bg-charcoal-100 px-2 py-1 text-white"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="py-2">Size</th>
                          <th className="py-2">Color</th>
                          <th className="py-2">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr key={i} className="border-t border-charcoal-50/20">
                            <td className="py-2 font-medium text-white">{r.size}</td>
                            <td className="py-2">
                              <select
                                value={r.colorId}
                                onChange={(e) => updateRow(i, { colorId: e.target.value as ColorId })}
                                className="rounded border border-charcoal-50/30 bg-charcoal-100 px-2 py-1 text-white"
                              >
                                {colors.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2">
                              <input
                                type="number"
                                min={0}
                                value={r.qty || ''}
                                onChange={(e) => updateRow(i, { qty: parseInt(e.target.value, 10) || 0 })}
                                className="w-20 rounded border border-charcoal-50/30 bg-charcoal-100 px-2 py-1 text-white"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <p className="mt-4 text-sm font-semibold text-gold">
                  Total: {totalQty} pieces {totalQty < 15 && '(min 15 required)'}
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.productOptions')}</h2>
                <p className="mt-2 text-gray-400">Print style applies to all garments. Select one option.</p>
                <div className="mt-6 space-y-4">
                  {(Object.entries(apparelPricing.printStyles) as [PrintStyleKey, { label: string; price: number; mostPopular?: boolean }][]).map(
                    ([key, { label, price, mostPopular }]) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${
                          printStyle === key ? 'border-gold bg-gold/10' : 'border-charcoal-50/30 hover:border-gold/50'
                        }`}
                      >
                        <span className="font-medium text-white">
                          {label}
                          {mostPopular && (
                            <span className="ml-2 rounded bg-gold/20 px-2 py-0.5 text-xs font-bold text-gold">
                              Most Popular
                            </span>
                          )}
                        </span>
                        <span className="text-gold">+${price}/piece</span>
                        <input
                          type="radio"
                          name="printStyle"
                          checked={printStyle === key}
                          onChange={() => setPrintStyle(key)}
                          className="h-5 w-5 text-gold"
                        />
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.extras')}</h2>
                <div className="mt-6 space-y-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Extra color</span>
                    <span className="font-semibold text-gold">+$2/piece</span>
                    <input type="checkbox" checked={extraColor} onChange={(e) => setExtraColor(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Setup</span>
                    <span className="font-semibold text-gold">+$30</span>
                    <input type="checkbox" checked={setup} onChange={(e) => setSetup(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Design</span>
                    <span className="font-semibold text-gold">+$50</span>
                    <input type="checkbox" checked={designHelp} onChange={(e) => setDesignHelp(e.target.checked)} className="h-5 w-5 rounded text-gold" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-charcoal-50/30 p-4 hover:border-gold/50">
                    <span className="font-medium text-white">Sleeve print</span>
                    <span className="font-semibold text-gold">+$3/piece</span>
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

            {step === 5 && <CustomerDetailsStep customer={customer} onChange={setCustomer} />}

            {step === 6 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{t('orderFlow.orderSummary')}</h2>
                <div className="mt-6 rounded-xl border border-gold/30 bg-charcoal-400/30 p-6">
                  {rows
                    .filter((r) => r.qty > 0)
                    .map((r, i) => {
                      const colorLabel = colors.find((c) => c.id === r.colorId)?.label ?? r.colorId;
                      return (
                        <p key={i} className="text-gray-400">
                          <span className="text-white">
                            {r.qty} {r.size} {colorLabel}
                          </span>
                        </p>
                      );
                    })}
                  <p className="mt-4 font-bold text-gold">Total: ${total.toFixed(2)}</p>
                </div>
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
          <OrderSummaryPanel
            lines={summaryLines}
            total={totalQty >= 15 ? total : null}
            footer={totalQty < 15 ? 'Min 15 pieces total' : undefined}
          />
        </div>
      </div>
    </div>
  );
}
