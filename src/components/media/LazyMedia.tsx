import type { MediaEntry } from '../../data/mediaMap';
import { useInViewOnce } from './useInViewOnce';

const mediaBase =
  'h-full w-full rounded-xl object-cover shadow-lg transition duration-300 ease-out group-hover:scale-[1.04]';

interface LazyMediaProps {
  entry: MediaEntry;
  className?: string;
  wrapperClassName?: string;
  heavyVideo?: boolean;
}

export function LazyMedia({ entry, className = '', wrapperClassName = '', heavyVideo }: LazyMediaProps) {
  if (entry.kind === 'image') {
    return (
      <div className={`relative h-full w-full overflow-hidden rounded-xl bg-charcoal-200/40 ${wrapperClassName}`}>
        <img
          src={entry.src}
          alt={entry.alt ?? ''}
          loading="lazy"
          decoding="async"
          className={`${mediaBase} ${className}`}
        />
      </div>
    );
  }

  return <LazyVideoMedia entry={entry} className={className} wrapperClassName={wrapperClassName} heavyVideo={heavyVideo} />;
}

function LazyVideoMedia({
  entry,
  className,
  wrapperClassName,
  heavyVideo,
}: {
  entry: Extract<MediaEntry, { kind: 'video' }>;
  className: string;
  wrapperClassName: string;
  heavyVideo?: boolean;
}) {
  const { ref, visible } = useInViewOnce();

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden rounded-xl bg-charcoal-900 ${wrapperClassName}`}>
      {visible ? (
        <>
          <video
            src={entry.src}
            poster={entry.poster}
            className={`${mediaBase} ${className}`}
            autoPlay
            muted
            loop
            playsInline
            preload={heavyVideo ? 'none' : 'metadata'}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        </>
      ) : (
        <img
          src={entry.poster}
          alt={entry.alt ?? ''}
          loading="lazy"
          decoding="async"
          className={`${mediaBase} ${className}`}
        />
      )}
    </div>
  );
}
