import { ARTWORK_STATUS_OPTIONS } from './DESIGN_HELP';

interface ArtworkStatusStepProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function ArtworkStatusStep({ selected, onSelect }: ArtworkStatusStepProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white">Artwork Status</h2>
      <p className="mt-2 text-gray-400">
        Tell us about your artwork. We'll route you to the right support.
      </p>
      <div className="mt-4 space-y-3 rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm text-gray-300">
        <p><strong className="text-gold">Need your logo cleaned up or rebuilt?</strong> We can help.</p>
        <p><strong className="text-gold">Only have a screenshot or blurry file?</strong> Upload it anyway.</p>
        <p><strong className="text-gold">Need something created from scratch?</strong> Send your idea and references.</p>
        <p>We can start with a fast concept direction before moving to final production. If the concept is still not right after 3 rounds, we'll route it to a real designer.</p>
      </div>
      <div className="mt-6 space-y-3">
        {ARTWORK_STATUS_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
              selected === option.id
                ? 'border-gold bg-gold/10'
                : 'border-charcoal-50/30 hover:border-gold/50'
            }`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-current">
              {selected === option.id && <span className="h-2 w-2 rounded-full bg-gold" />}
            </span>
            <span className="font-medium text-white">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
