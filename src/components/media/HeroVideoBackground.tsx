import { useCallback, useState } from 'react';
import { homeHeroVideo } from '../../lib/media';

interface HeroVideoBackgroundProps {
  className?: string;
}

export function HeroVideoBackground({ className = '' }: HeroVideoBackgroundProps) {
  const { video, poster, fallbackImage } = homeHeroVideo();
  const [useFallback, setUseFallback] = useState(false);

  const onVideoError = useCallback(() => setUseFallback(true), []);

  if (useFallback) {
    return (
      <img
        src={fallbackImage}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <video
      src={video}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="metadata"
      onError={onVideoError}
      aria-hidden
    />
  );
}
