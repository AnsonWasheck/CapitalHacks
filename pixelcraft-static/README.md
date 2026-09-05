# PixelCraft static rebuild

This version contains no Next.js, React, Tailwind, Vercel configuration, package manager, or build step.

## Files
- `index.html` — all page markup and content
- `styles.css` — all styling and responsive behavior
- `script.js` — navbar, typewriter effects, showcase carousel, and FAQ accordion

## Run locally
Open `index.html` directly in a browser, or serve this folder with any static server.

Examples:
- VS Code Live Server
- `python -m http.server 8000`
- GitHub Pages / Netlify / Cloudflare Pages / any normal web host

The only external runtime request is Google Fonts. If you want a fully offline package, replace the font import with local font files or system fonts.
