# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static prototype for **MR Auto Canada** — a one-page car-dealer landing site targeting Dakar, Sénégal. The project has two layers:

1. **Wireframe explorer** (`index.html`) — Figma-like canvas showing four design directions (A–D) plus the retained mix (E).
2. **Hi-fi prototype** (`Site Voitures Dakar.html`) — the production-ready single-page app built from the chosen direction.

## Running the site

No build step. Open either HTML file directly in a browser (or serve from any static file server):

```bash
python3 -m http.server 8000
# then open http://localhost:8000/ for the wireframe explorer
# or   http://localhost:8000/Site%20Voitures%20Dakar.html for hi-fi
```

The files load React 18 + Babel standalone from CDN (`unpkg.com`) and transpile JSX in-browser. No `npm install` needed.

## Architecture

### Wireframe layer (`index.html`)

| File | Role |
|---|---|
| `design-canvas.jsx` | Pan/zoom canvas (Figma-style). Exposes `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt` as globals. State persists to `.design-canvas.state.json` via `window.omelette.writeFile`. |
| `wireframe-kit.jsx` | Low-fi primitives: `WfImg`, `WfBox`, `WfBtn`, `WfBtnSq`, `WfH`, `WfText`, `WfNote`, `WfCircle`, `WfSection`, `WfTag`, `WfCarCard`, `WfNav`, `WfFooter`. All registered on `window`. |
| `wf-a.jsx` … `wf-e.jsx` | One component per direction (`WfA`–`WfE`). `wf-e.jsx` is the retained mix. |

All components are registered on `window` (not ES module exports) so Babel standalone can share them across `<script>` tags.

### Hi-fi layer (`Site Voitures Dakar.html`)

| File | Role |
|---|---|
| `hifi-components.jsx` | Design-system components: `MStripe`, `ImgPlaceholder`, `HifiBadge`, `SpecChip`, and others. Uses CSS custom properties (`var(--accent)`, `var(--font-body)`, etc.). |
| `tweaks-panel.jsx` | Live-edit panel for design tokens. Communicates with the host via `window.parent.postMessage`. Tweak defaults are marked with `/*EDITMODE-BEGIN*/` … `/*EDITMODE-END*/` so tooling can patch them. |

### Design tokens (CSS custom properties in `Site Voitures Dakar.html`)

```
--accent: #1a3a6e        (navy blue — primary brand color)
--accent-on-dark: #5BC8F5
--bg: #f5f7fb
--font-display: 'Barlow Condensed'
--font-body: 'Barlow'
--radius: 0px            (sharp corners throughout)
```

Breakpoints: `1024px` (tablet) and `640px` (mobile). Section IDs for anchor nav: `#voitures`, `#demarche`, `#vendues`, `#contact`.

## Key placeholders to replace

- **WhatsApp number**: `+221XXXXXXXXX` — search for this string in `Site Voitures Dakar.html`
- **Images**: all placeholders use CSS gradients + `ImgPlaceholder`; swap for real `<img>` tags or background-image URLs
- **Car listings**: hardcoded in the JSX; extract to a data array when real inventory is ready

## Adding a new wireframe direction

1. Create `wf-f.jsx` exporting a `WfF` component (register it on `window`)
2. Add `<script type="text/babel" src="wf-f.jsx"></script>` to `index.html`
3. Add a `<DCArtboard id="f" label="F · New Direction" …><WfF /></DCArtboard>` inside the relevant `<DCSection>` in `index.html`
