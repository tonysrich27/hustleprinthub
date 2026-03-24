# Media library

All site imagery and video live under `/media/<category>/` with **kebab-case** filenames.

| Folder | Use |
|--------|-----|
| `banners/` | Vinyl banners, outdoor installs |
| `decals/` | Decals, partial wraps, window perf |
| `food-trucks/` | Food trailer / truck wrap photos |
| `yard-signs/` | Coroplast yard signs, stakes |
| `flyers/` | Flyer runs, print-in-action clips |
| `wraps/` | Full / partial vehicle wraps |
| `consulting/` | Consultation, design process (large files — compress for web) |
| `general/` | Magnets, cards, apparel, brand B-roll |

## Registry

The React app reads curated lists from `src/data/mediaMap.ts` (and optional `src/data/mediaMap.js` re-export). Helpers in `src/lib/media.ts` provide fallbacks so UI never shows empty slots.

## Video

- **MOV → MP4:** run locally with `ffmpeg` (not bundled in this repo), e.g.  
  `ffmpeg -i input.mov -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k output.mp4`
- Prefer **under ~15 MB** for hero/background loops; `design-consultation.mov` should be compressed or hosted externally.
- In-app video uses `autoplay`, `muted`, `loop`, `playsInline` where appropriate.

## Legacy path

Older docs referenced `/images/...`. New canonical URLs are `/media/...`.
