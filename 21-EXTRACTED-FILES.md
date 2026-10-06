# tantitan2010.netlify.app — extracted files

Pulled 2026-08-26 from https://tantitan2010.netlify.app/  
Every file below is the exact byte stream the server returned (sizes match live `Content-Length`).

The site is almost entirely self-contained HTML. CSS, JS, SVG, fonts (in Perfect Circle), and the PWA manifest are **embedded inside the HTML**, not separate hosted files. There is no `styles.css`, `app.js`, `sw.js`, `robots.txt`, or `sitemap.xml` on the origin.

## Pages

| File | Title | Size | Notes |
|---|---|---:|---|
| `index.html` | TanTitan2010 — Command Center | 1,330,093 | Homepage. Tools, games, terminal, Deep Find. |
| `tantitan2010-lite.html` | (same app, lite skin) | 1,331,413 | Same command center with `class="lite"` and heavy effects stripped. |
| `carrom.html` | Carrom Arena — 2/3/4 Player Carrom | 67,622 | Standalone canvas game. Also iframed from the homepage. |
| `macos.html` | macOS | 138,854 | Fullscreen desktop OS. Boot from the site terminal (`macos`). |
| `Win 11.html` | Windows 11 Pro | 429,743 | Fullscreen desktop OS. Boot from the site terminal (`windows` / `win11`). Live URL is `/win%2011`. |
| `tantitan2010-perfect-circle.html` | TanTitan2010 — Perfect Circle | 2,803,602 | Standalone Nuxt dump; CSS/JS/fonts/audio inlined. |
| `TanTitan2010-perfect-circle.html` | (symlink) | — | Homepage iframe uses this exact name. Live site 301s `TanTitan2010-perfect-circle.html` → `/tantitan2010-perfect-circle`. |

Pretty URLs on Netlify (same bytes as the `.html` file):

- `/` and `/index.html`
- `/tantitan2010-lite`
- `/carrom`
- `/macos`
- `/win%2011`
- `/tantitan2010-perfect-circle`

## Images

| File | Type | Size |
|---|---|---:|
| `TanTitan2010-logo.webp` | 768×768 WebP | 101,002 |
| `wallpapers/sequoia-day-2k.webp` | 2560×1440 | 99,728 |
| `wallpapers/sequoia-day-preview.webp` | 640×360 | 10,892 |
| `wallpapers/sequoia-night-2k.webp` | 2560×1440 | 78,336 |
| `wallpapers/sequoia-night-preview.webp` | 640×360 | 6,486 |
| `wallpapers/bloom-2k.webp` | 2560×1440 | 84,840 |
| `wallpapers/bloom-preview.webp` | 640×360 | 9,638 |
| `wallpapers/city-dusk-2k.webp` | 2560×1440 | 317,416 |
| `wallpapers/city-dusk-preview.webp` | 640×360 | 29,540 |
| `wallpapers/mountain-lake-2k.webp` | 2560×1440 | 415,980 |
| `wallpapers/mountain-lake-preview.webp` | 640×360 | 38,132 |

Sequoia wallpapers are used by `macos.html`. Bloom / city-dusk / mountain-lake are used by `Win 11.html`.

## Not hosted (mentioned in JS only)

These strings appear in the HTML but return **404** on the origin — they are virtual desktop filenames, download names, or leftover comments:

`TanTitan2010-QR.png`, `TanTitan2010-data.js`, `TanTitan2010-data.json`, `TanTitan2010-text.txt`, `tantitan2010-command-center-backup.js`, `tantitan2010-command-center-backup.json`, `tantitan2010-5.html`, `website.html`, `script.js`, `styles.css`, `notes.txt`, `untitled.txt`, `pdfjs/pdf.min.js`, `pdfjs/pdf.worker.min.js`, `stockfish-18-lite-single.js`, `stockfish-18-lite-single.wasm`, `Ambient Dreams.mp3`, `Night Drive.mp3`, `Vacation 2026.mp4`, `Screenshot.png`, `ideas.txt`, `logo.svg`, `mixtape.mp3`, `macOS-wallpaper.jpg`, `beach.jpg`, `city.jpg`, `Bloom Wallpaper.png`, …

404s are Netlify’s default “Page not found” page (3,985 bytes), not a custom site 404.

## External dependencies (not copied)

Left as original URLs so the HTML stays accurate:

- Google Fonts (Space Grotesk, Inter, JetBrains Mono) — `index.html` / lite
- jsDelivr: Inter fontsource, jszip, mammoth, xlsx — `macos.html`, `Win 11.html`
- CheerpJ JVM loader — `Win 11.html`
- App icons on `image.qwenlm.ai` — `macos.html`
- Live APIs used by Deep Find / search (Open Library, TMDB-adjacent sources, AniList, Archive.org, etc.)

## SHA-256

```
1a421cbc032eef97096c249ec1f758869ceae34b59c439381a6fb5d66e77bae4  index.html
f2c43bad59f7818ca2d2a4ba3948ef23619742f21d89b85033781dcde2452dd8  tantitan2010-lite.html
3f2658cc6d91f045036421ec256beba9993eba30d6ca2b15a09d5dc437d56404  carrom.html
ba48d5740ad2b4fb0a7cbd3e907d403f29aec32e1b129d8bd3f636a682af6075  macos.html
d1d8ab539e9738962fbc20b7ef6ac61e324646a9655059f30f7976de429dd942  Win 11.html
1881eee13a9a9f7a8fde49e8e20fa9dd38c0ba89fed348b87cbb7d47ab81e1ab  tantitan2010-perfect-circle.html
ede4497fda6e3d765c21b0491020521c5628e34f45973e4f2362ea8e24adb4d5  TanTitan2010-logo.webp
```

## 2026-09-14 enhancement layer

Added:
- `tt-motion.css` — touch-first spring/smooth-motion CSS, snap scrolling, reveal transitions, reduced-motion support.
- `tt-motion.js` — framework-free interaction layer for press feedback, dynamic reveal, scroll progress and safe background parallax.
- `tt-java-runtime.js` — genuine CheerpJ/OpenJDK 8 + ECJ bridge with automatic MiniJava fallback for the Command Center Java runner.
