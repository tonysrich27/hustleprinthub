import type { MediaEntry } from '../../data/mediaMap';
import { LazyMedia } from './LazyMedia';

interface MediaScrollRowProps {
  items: MediaEntry[];
  /** Use preload="none" for large consultation clips */
  heavyVideo?: boolean;
}

export function MediaScrollRow({ items, heavyVideo }: MediaScrollRowProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory md:gap-5">
      {items.map((entry, i) => (
        <div
          key={`${entry.kind}-${entry.src}-${i}`}
          className="group w-[min(85vw,320px)] flex-shrink-0 snap-center md:w-[280px]"
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-charcoal-50/30 shadow-md transition hover:border-gold/40">
            <LazyMedia entry={entry} heavyVideo={heavyVideo} />
          </div>
        </div>
      ))}
    </div>
  );
}
