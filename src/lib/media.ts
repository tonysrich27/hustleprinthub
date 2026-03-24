import { mediaMap, type MediaEntry, type MediaMapCategory } from '../data/mediaMap';

/** Default stills — never empty UI */
const FALLBACK_STILLS = [
  '/media/banners/banner-outdoor.jpg',
  '/media/decals/decal.jpg',
  '/media/yard-signs/yard-sign-8ft.jpg',
] as const;

export function isVideoPath(path: string): boolean {
  return /\.(mov|mp4|webm)(\?.*)?$/i.test(path);
}

const VIDEO_POSTER_MAP: Record<string, string> = {
  '/media/yard-signs/finish-yard-signs.mov': '/media/yard-signs/yard-sign-8ft.jpg',
  '/media/banners/birthday-banner-install.mov': '/media/banners/banner-outdoor.jpg',
  '/media/banners/banner-install-1.mov': '/media/banners/tap-in-printing-banners.jpg',
  '/media/decals/decal-install.mov': '/media/decals/decal.jpg',
  '/media/flyers/finished-blue-flyers.mov': '/media/general/business-cards-showcase.jpg',
  '/media/general/intro-pickup-location.mov': '/media/banners/banner-outdoor.jpg',
  '/media/general/promo-trap-outside.mov': '/media/decals/decal.jpg',
  '/media/consulting/design-consultation.mov': '/media/general/business-cards-showcase.jpg',
};

export function posterForVideo(path: string): string {
  return VIDEO_POSTER_MAP[path] ?? FALLBACK_STILLS[0];
}

export function getMediaList(category: MediaMapCategory): readonly MediaEntry[] {
  const list = mediaMap[category];
  return list?.length ? list : mediaMap.general;
}

/** If category empty, use general → then hardcoded stills */
export function resolveMediaEntries(category: MediaMapCategory): MediaEntry[] {
  let list = [...getMediaList(category)];
  if (list.length === 0) {
    list = [...mediaMap.general];
  }
  if (list.length === 0) {
    return FALLBACK_STILLS.map((src) => ({ kind: 'image' as const, src }));
  }
  return list;
}

/** Flatten to src strings for galleries that only need URLs */
export function resolveMediaSrcs(category: MediaMapCategory): string[] {
  return resolveMediaEntries(category).map((e) => e.src);
}

/** First image src in category (for posters / fallbacks) */
export function firstImageSrc(category: MediaMapCategory): string {
  for (const e of resolveMediaEntries(category)) {
    if (e.kind === 'image') return e.src;
    if (e.poster) return e.poster;
  }
  return FALLBACK_STILLS[0];
}

export function homeHeroVideo(): { video: string; poster: string; fallbackImage: string } {
  return {
    video: '/media/general/intro-pickup-location.mov',
    poster: '/media/banners/tap-in-printing-banners.jpg',
    fallbackImage: '/media/banners/banner-outdoor.jpg',
  };
}

/** Product slug → mediaMap key */
const SLUG_TO_CATEGORY: Record<string, MediaMapCategory> = {
  signs: 'yardSigns',
  banners: 'banners',
  decals: 'decals',
  magnets: 'general',
  cards: 'general',
  shirts: 'general',
  flyers: 'flyers',
  'vehicle-wraps': 'wraps',
};

export function categoryForProductSlug(slug: string): MediaMapCategory {
  return SLUG_TO_CATEGORY[slug] ?? 'general';
}

/** Skip very large sources unsuitable for card autoplay */
const CARD_VIDEO_BLOCKLIST = new Set(['/media/consulting/design-consultation.mov']);

/** Optional looping background video for product cards */
export function cardVideoForSlug(slug: string): { video: string; poster: string } | null {
  const cat = categoryForProductSlug(slug);
  const entries = resolveMediaEntries(cat);
  const vid = entries.find(
    (e): e is Extract<MediaEntry, { kind: 'video' }> =>
      e.kind === 'video' && !CARD_VIDEO_BLOCKLIST.has(e.src)
  );
  if (!vid) return null;
  return { video: vid.src, poster: vid.poster };
}

/** Mixed strip for horizontal sections */
export function recentWorkStrip(): MediaEntry[] {
  const pick = (cat: MediaMapCategory, i: number) => resolveMediaEntries(cat)[i];
  const strip: MediaEntry[] = [];
  const pairs: [MediaMapCategory, number][] = [
    ['banners', 0],
    ['yardSigns', 0],
    ['decals', 0],
    ['wraps', 0],
    ['foodTrucks', 0],
    ['flyers', 0],
    ['general', 2],
    ['banners', 4],
    ['yardSigns', 5],
    ['decals', 4],
  ];
  for (const [cat, i] of pairs) {
    const e = pick(cat, i);
    if (e) strip.push(e);
  }
  return strip.length ? strip : resolveMediaEntries('general').slice(0, 6);
}

export function realInstallsStrip(): MediaEntry[] {
  return [
    resolveMediaEntries('banners')[4],
    resolveMediaEntries('banners')[5],
    resolveMediaEntries('yardSigns')[5],
    resolveMediaEntries('decals')[4],
    resolveMediaEntries('foodTrucks')[1],
    resolveMediaEntries('wraps')[0],
  ].filter(Boolean) as MediaEntry[];
}

export function clientJobsStrip(): MediaEntry[] {
  return [
    resolveMediaEntries('foodTrucks')[2],
    resolveMediaEntries('yardSigns')[3],
    resolveMediaEntries('decals')[2],
    resolveMediaEntries('banners')[1],
    resolveMediaEntries('general')[4],
    resolveMediaEntries('wraps')[1],
  ].filter(Boolean) as MediaEntry[];
}

/** Omit huge consultation master file from autoplay strip (use poster / dedicated player elsewhere). */
export function behindTheHustleClips(): MediaEntry[] {
  return resolveMediaEntries('consulting').filter(
    (e) => e.src !== '/media/consulting/design-consultation.mov'
  );
}
