interface CreativeBriefStepProps {
  form: {
    whatCreating: string;
    productType: string;
    businessName: string;
    textToInclude: string;
    styleVibe: string;
    colors: string;
    dimensions: string;
    deadline: string;
    extraNotes: string;
  };
  onChange: (field: string, value: string) => void;
}

const inputClass =
  'mt-1 w-full rounded-lg border border-charcoal-50/30 bg-charcoal-100 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

export function CreativeBriefStep({ form, onChange }: CreativeBriefStepProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white">Creative Brief</h2>
      <p className="mt-2 text-gray-400">
        Need something created from scratch? Send your idea and references.
      </p>
      <p className="mt-2 text-gray-400">
        We can start with a fast concept direction before moving to final production.
      </p>
      <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm text-gray-300">
        If the concept is still not right after 3 rounds, we'll route it to a real designer.
      </p>

      {/* Process description */}
      <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-6">
        <h3 className="font-heading text-lg font-bold text-gold">How it works</h3>
        <ol className="mt-4 space-y-3 text-sm text-gray-300">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">1</span>
            Send your idea and references
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">2</span>
            Receive a fast draft concept
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">3</span>
            Request revisions
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">4</span>
            If still not approved after 3 rounds, hand off to a real designer
          </li>
        </ol>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">What are you trying to create?</label>
          <textarea
            placeholder="Describe your project..."
            rows={2}
            className={inputClass}
            value={form.whatCreating}
            onChange={(e) => onChange('whatCreating', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Product type</label>
          <input
            type="text"
            placeholder="e.g. banner, flyer, t-shirt"
            className={inputClass}
            value={form.productType}
            onChange={(e) => onChange('productType', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Business or event name</label>
          <input
            type="text"
            placeholder="Your business or event"
            className={inputClass}
            value={form.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Text to include</label>
          <input
            type="text"
            placeholder="Taglines, names, dates..."
            className={inputClass}
            value={form.textToInclude}
            onChange={(e) => onChange('textToInclude', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Style / vibe</label>
          <input
            type="text"
            placeholder="e.g. bold, minimal, street, premium"
            className={inputClass}
            value={form.styleVibe}
            onChange={(e) => onChange('styleVibe', e.target.value)}
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
          <label className="block text-sm font-medium text-gray-400">Upload logo</label>
          <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-6">
            <p className="text-sm text-gray-500">Optional</p>
            <button type="button" className="mt-2 rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold">
              Choose File
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Upload inspiration / references</label>
          <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-charcoal-50/50 bg-charcoal-400/50 py-6">
            <p className="text-sm text-gray-500">Screenshots, examples, mood boards</p>
            <button type="button" className="mt-2 rounded-md border border-gold px-4 py-2 text-sm font-medium text-gold">
              Choose Files
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Dimensions if known</label>
          <input
            type="text"
            placeholder="e.g. 24x36 inches"
            className={inputClass}
            value={form.dimensions}
            onChange={(e) => onChange('dimensions', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Deadline</label>
          <input
            type="text"
            placeholder="e.g. March 25, ASAP"
            className={inputClass}
            value={form.deadline}
            onChange={(e) => onChange('deadline', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Extra notes</label>
          <textarea
            placeholder="Anything else we should know..."
            rows={3}
            className={inputClass}
            value={form.extraNotes}
            onChange={(e) => onChange('extraNotes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
