# ASSERT Research — Website

The official website for **ASSERT Research**, a non-profit association
(_ideell förening_) based in Stockholm, Sweden, advancing scientific research
and development in software technology.

A static site, bilingual (English + Swedish), deployed to **GitHub Pages** on
the custom domain **[assert-research.org](https://assert-research.org)**.

## Project structure

```
.
├── index.html              # English page (default) — single structural source
├── se/index.html           # Swedish page — GENERATED from index.html
├── bylaws-en.html          # English bylaws — GENERATED from bylaws-en.md
├── bylaws-sv.html          # Swedish bylaws — GENERATED from bylaws-sv.md
├── assets/
│   ├── css/
│   │   ├── main.css         # entry point — @imports the modules below
│   │   ├── theme.css        # design tokens: colours, type, spacing (edit here)
│   │   ├── base.css         # reset + base element styles
│   │   ├── layout.css       # header, footer, containers, grids
│   │   └── components.css   # buttons, hero, cards, members, language switch
│   ├── js/
│   │   ├── i18n.js          # ALL copy + board/founder data + render engine
│   │   └── main.js          # language resolution, switching, small UI
│   ├── img/                 # optimised logos, favicon, board avatars
│   └── css/bylaws.css       # styling for the legal document pages
├── scripts/
│   ├── build-se.js          # regenerates se/index.html from index.html
│   └── render-bylaws.js     # renders bylaws-*.md → bylaws-*.html
├── bylaws-en.md / bylaws-sv.md   # authoritative bylaws source (Markdown)
├── CNAME                    # custom domain for GitHub Pages
└── .github/workflows/deploy.yml
```

## Editing content

- **All visible text** lives in [`assets/js/i18n.js`](assets/js/i18n.js) under
  the `STRINGS.en` and `STRINGS.sv` dictionaries. The HTML only carries
  `data-i18n="key"` markers — never prose. Edit a string once and both the
  English and Swedish pages update.
- **Board members** and **founding members** are the `BOARD` and `FOUNDERS`
  arrays at the top of `i18n.js`. Role labels (Chairperson, etc.) are
  translated via the `board.*` keys.
- **Colours / fonts / spacing** are design tokens in
  [`assets/css/theme.css`](assets/css/theme.css). The palette is built around
  the Swedish flag's blue and yellow.

## Languages

- English is the default and is served at `/`.
- Swedish is served at `/se/`.
- A header toggle switches language in place (no reload), updates the URL, and
  remembers the choice. Language is resolved from, in order: the URL path
  (`/se`), the page's declared language, a stored preference, then English.

After editing `index.html`, regenerate the generated pages:

```bash
npm run build        # renders bylaws-*.html and se/index.html
```

> `se/index.html`, `bylaws-en.html`, and `bylaws-sv.html` are generated — do
> not edit them by hand.

## Bylaws pages

The bylaws are authored in Markdown (`bylaws-en.md`, `bylaws-sv.md`) and
rendered into styled, standalone pages (`bylaws-en.html`, `bylaws-sv.html`) by
`scripts/render-bylaws.js`. Each page reuses the site's header and footer,
which are extracted from `index.html` between the `@partial:header` /
`@partial:footer` comment markers — so the shared chrome has a single source.

- Edit the **text** in the `.md` files, then run `npm run build`.
- Edit the **document styling** in `assets/css/bylaws.css`.
- The pages are language-static: the header EN/SV toggle navigates between
  `bylaws-en.html` and `bylaws-sv.html` rather than swapping text in place.

## Local preview

Because pages use absolute paths (`/assets/...`), serve from the project root:

```bash
npm run serve        # builds the SV page + serves at http://localhost:5173
# or any static server, e.g.:  python3 -m http.server 5173
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the build
(regenerating `se/index.html`) and publishes the site to GitHub Pages.

One-time setup:

1. **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. The `CNAME` file pins the custom domain `assert-research.org`.
3. In **Cloudflare DNS**, point the domain at GitHub Pages:
   - `CNAME` (or apex `A`/`AAAA`) records to GitHub Pages.
   - For the apex `assert-research.org`, add A records to GitHub's IPs
     (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) or a CNAME flatten
     to `<user>.github.io`.
   - Set the Cloudflare proxy to **DNS only** (grey cloud) initially so GitHub
     can issue its TLS certificate, then enable **Enforce HTTPS** in GitHub
     Pages settings.

## Logos

Source artwork: `public/assert-research-logo-6600px.png`. Optimised variants in
`assets/img/` (`logo.png`, `logo@2x.png`, white `logo-white.png` for the dark
footer) were generated with ImageMagick. To regenerate:

```bash
magick public/assert-research-logo-6600px.png -resize 1400x assets/img/logo.png
magick public/assert-research-logo-6600px.png -resize 2200x assets/img/logo@2x.png
magick public/assert-research-logo-6600px.png -resize 1100x \
  -channel RGB -evaluate set 100% +channel assets/img/logo-white.png
```
