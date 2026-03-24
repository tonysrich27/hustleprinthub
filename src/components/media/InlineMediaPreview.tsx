import type { MediaMapCategory } from '../../data/mediaMap';
import { resolveMediaEntries } from '../../lib/media';
import { LazyMedia } from './LazyMedia';

interface InlineMediaPreviewProps {
  category: MediaMapCategory;
  count?: number;
  className?: string;
}

export function InlineMediaPreview({ category, count = 4, className = '' }: InlineMediaPreviewProps) {
  const items = resolveMediaEntries(category).slice(0, count);
  if (items.length === 0) return null;

  return (
    <div className={`flex gap-3 overflow-x-auto pb-2 ${className}`}>
      {items.map((entry, i) => (
        <div key={`${entry.src}-${i}`} className="w-36 flex-shrink-0 sm:w-44 md:w-52">
          <div className="aspect-[16/10] overflow-hidden rounded-lg border border-charcoal-50/30 shadow-md">
            <LazyMedia entry={entry} />
          </div>
        </div>
      ))}
    </div>
  );
}
