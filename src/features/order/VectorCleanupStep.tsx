import { VECTOR_CHECKBOX_OPTIONS } from './DESIGN_HELP';

interface VectorCleanupStepProps {
  form: {
    finalPrintUse: string;
    targetSize: string;
    colors: string;
    notes: string;
    checkboxes: Record<string, boolean>;
  };
  onChange: (field: string, value: string | Record<string, boolean>) => void;
}

const inputClass =
  'mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

export function VectorCleanupStep({ form, onChange }: VectorCleanupStepProps) {
  const toggleCheckbox = (id: string) => {
    onChange('checkboxes', {
      ...form.checkboxes,
      [id]: !form.checkboxes[id],
    });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white">Vector / Cleanup</h2>
      <p className="mt-2 text-gray-400">
        Need your logo cleaned up or rebuilt? We can help.
      </p>
      <p className="mt-2 text-gray-400">
        Only have a screenshot or blurry file? Upload it anyway.
      </p>
      <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm text-gray-300">
        Convert screenshots, rebuild from references, or resize for large format. We'll get it print-ready.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Upload current file</label>
          <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-8">
            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            <button type="button" className="mt-3 rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold">
              Choose File
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Upload reference image</label>
          <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-6">
            <p className="text-sm text-gray-500">Optional — for rebuild reference</p>
            <button type="button" className="mt-2 rounded-md border border-charcoal-50/50 px-4 py-2 text-sm text-gray-400">
              Choose File
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Final print use</label>
          <input
            type="text"
            placeholder="e.g. banner, t-shirt, vehicle wrap"
            className={inputClass}
            value={form.finalPrintUse}
            onChange={(e) => onChange('finalPrintUse', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Target size</label>
          <input
            type="text"
            placeholder="e.g. 24x36 inches"
            className={inputClass}
            value={form.targetSize}
            onChange={(e) => onChange('targetSize', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Colors</label>
          <input
            type="text"
            placeholder="e.g. black and gold, brand colors"
            className={inputClass}
            value={form.colors}
            onChange={(e) => onChange('colors', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">What do you need?</label>
          <div className="mt-3 space-y-2">
            {VECTOR_CHECKBOX_OPTIONS.map((opt) => (
              <label key={opt.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-charcoal-50/30 p-3">
                <input
                  type="checkbox"
                  checked={form.checkboxes[opt.id] ?? false}
                  onChange={() => toggleCheckbox(opt.id)}
                  className="h-4 w-4 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
                />
                <span className="text-sm text-white">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Notes</label>
          <textarea
            placeholder="Any additional details..."
            rows={3}
            className={inputClass}
            value={form.notes}
            onChange={(e) => onChange('notes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
