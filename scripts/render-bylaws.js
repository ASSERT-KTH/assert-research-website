#!/usr/bin/env node
/* =========================================================================
   render-bylaws.js — Render the bylaws Markdown into styled HTML pages that
   share the site's header and footer.

   Source of truth:
     - Text:   bylaws-en.md / bylaws-sv.md  (authored Markdown)
     - Chrome: index.html  (header + footer extracted between @partial markers,
               so there is ONE source for the shared chrome)

   Output:  bylaws-en.html, bylaws-sv.html

   Run:  npm run build   (or)   node scripts/render-bylaws.js

   The Markdown subset handled here matches what the bylaws files actually use:
   ATX headings, unordered/ordered lists, bold/italic, horizontal rules,
   stand-alone italic notes, and the trailing raw-HTML signature block.
   ========================================================================= */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

/* ---- Extract a partial from index.html between HTML comment markers ----- */
function extractPartial(html, name) {
  const start = "@partial:" + name + ":start";
  const end = "@partial:" + name + ":end";
  const s = html.indexOf(start);
  const e = html.indexOf(end);
  if (s === -1 || e === -1) {
    throw new Error("Could not find partial markers for: " + name);
  }
  // Move past the end of the start marker comment ("-->") and back to the
  // start of the end marker comment ("<!--").
  const from = html.indexOf("-->", s) + 3;
  const to = html.lastIndexOf("<!--", e);
  return html.slice(from, to).trim();
}

/* Flip the language-switch pressed state for a given language. */
function setPressed(headerHtml, lang) {
  return headerHtml
    .replace(/(data-lang-btn="en"\s+aria-pressed=")(?:true|false)(")/, "$1" + (lang === "en" ? "true" : "false") + "$2")
    .replace(/(data-lang-btn="sv"\s+aria-pressed=")(?:true|false)(")/, "$1" + (lang === "sv" ? "true" : "false") + "$2");
}

/* ---- Minimal Markdown → HTML ------------------------------------------- */
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function renderSignatureBlock(rawLines) {
  let raw = rawLines.join("\n");
  // Drop the leading <br> spacers.
  raw = raw.replace(/^\s*(?:<br\s*\/?>\s*)+/i, "");
  // Replace the print-oriented inline styles with semantic classes.
  raw = raw.replace(/<div\s+style="display:flex[^"]*">/i, '<div class="legal__signatures">');
  raw = raw.replace(/<div\s+style="width:250px;?">/gi, '<div class="legal__signature">');
  raw = raw.replace(
    /<span\s+style="display:inline-block;width:250px;border-top:1px solid black;"><\/span>/gi,
    '<span class="legal__sigline"></span>'
  );
  return raw;
}

function markdownToHtml(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out = [];

  let para = [];
  let listType = null;
  let listItems = [];
  let rawLines = null; // once set, the rest of the document is raw HTML

  function flushPara() {
    if (!para.length) return;
    const text = para.join(" ").trim();
    const underscores = (text.match(/_/g) || []).length;
    if (underscores === 2 && text.startsWith("_") && text.endsWith("_")) {
      out.push('<aside class="legal__note">' + inline(text.slice(1, -1)) + "</aside>");
    } else {
      out.push("<p>" + inline(text) + "</p>");
    }
    para = [];
  }

  function flushList() {
    if (!listItems.length) return;
    out.push("<" + listType + ">");
    listItems.forEach(function (it) {
      out.push("<li>" + it + "</li>");
    });
    out.push("</" + listType + ">");
    listItems = [];
    listType = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();

    if (rawLines) {
      rawLines.push(line);
      continue;
    }

    if (t === "") {
      flushPara();
      flushList();
      continue;
    }

    // Raw HTML block (the signature block) — passthrough to end of document.
    if (t.startsWith("<")) {
      flushPara();
      flushList();
      rawLines = [line];
      continue;
    }

    // Headings
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const lvl = h[1].length;
      out.push("<h" + lvl + ">" + inline(h[2]) + "</h" + lvl + ">");
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(t)) {
      flushPara();
      flushList();
      out.push('<hr class="legal__rule" />');
      continue;
    }

    // Unordered list item
    if (/^[-*]\s+/.test(t)) {
      flushPara();
      listType = "ul";
      listItems.push(inline(t.replace(/^[-*]\s+/, "")));
      continue;
    }

    // Ordered list item
    if (/^\d+\.\s+/.test(t)) {
      flushPara();
      listType = "ol";
      listItems.push(inline(t.replace(/^\d+\.\s+/, "")));
      continue;
    }

    // Paragraph text — a non-list line closes any open list.
    flushList();
    para.push(t);
  }

  flushPara();
  flushList();
  if (rawLines) out.push(renderSignatureBlock(rawLines));

  return out.join("\n");
}

/* ---- Page assembly ----------------------------------------------------- */
const globe =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

function page(cfg, headerPartial, footerPartial) {
  const header = setPressed(headerPartial, cfg.lang);
  const body = markdownToHtml(fs.readFileSync(path.join(root, cfg.md), "utf8"));

  return `<!doctype html>
<!-- GENERATED FILE — do not edit. Source: ${cfg.md} + index.html via scripts/render-bylaws.js -->
<html
  lang="${cfg.lang}"
  data-page-lang="${cfg.lang}"
  data-i18n-static
  data-url-en="/bylaws-en.html"
  data-url-sv="/bylaws-sv.html"
  data-title-key="bylaws.meta.title"
  data-desc-key="bylaws.meta.desc"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${cfg.title}</title>
    <meta name="description" content="${cfg.desc}" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${cfg.title}" />
    <meta property="og:description" content="${cfg.desc}" />
    <meta property="og:url" content="https://assert-research.org/${cfg.file}" />
    <meta property="og:image" content="https://assert-research.org/assets/img/logo.png" />

    <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="https://assert-research.org/${cfg.file}" />
    <link rel="alternate" hreflang="en" href="https://assert-research.org/bylaws-en.html" />
    <link rel="alternate" hreflang="sv" href="https://assert-research.org/bylaws-sv.html" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="stylesheet" href="/assets/css/bylaws.css" />
  </head>
  <body>
    ${header}

    <main id="main">
      <section class="legal-hero">
        <div class="container container--narrow legal-hero__inner">
          <nav class="legal-breadcrumb" aria-label="Breadcrumb">
            <a href="/">${cfg.home}</a>
            <span class="legal-breadcrumb__sep" aria-hidden="true">/</span>
            <span aria-current="page">${cfg.crumb}</span>
          </nav>
          <a
            class="legal-altlang"
            href="${cfg.altUrl}"
            aria-label="${cfg.altAria}"
            hreflang="${cfg.other}"
          >
            ${globe}<span>${cfg.altText}</span>
          </a>
        </div>
      </section>

      <article class="container container--narrow legal">
        ${body}
      </article>
    </main>

    ${footerPartial}

    <script src="/assets/js/i18n.js"></script>
    <script src="/assets/js/main.js"></script>
  </body>
</html>
`;
}

/* ---- Per-language configuration --------------------------------------- */
const PAGES = [
  {
    lang: "en",
    other: "sv",
    md: "bylaws-en.md",
    file: "bylaws-en.html",
    title: "Bylaws — ASSERT Research",
    desc:
      "The bylaws (stadgar) of ASSERT Research, a non-profit association based in Stockholm, Sweden.",
    home: "Home",
    crumb: "Bylaws",
    altUrl: "/bylaws-sv.html",
    altText: "Svenska",
    altAria: "Läs stadgarna på svenska"
  },
  {
    lang: "sv",
    other: "en",
    md: "bylaws-sv.md",
    file: "bylaws-sv.html",
    title: "Stadgar — ASSERT Research",
    desc:
      "Stadgar för ASSERT Research, en ideell förening med säte i Stockholm, Sverige.",
    home: "Hem",
    crumb: "Stadgar",
    altUrl: "/bylaws-en.html",
    altText: "English",
    altAria: "Read the bylaws in English"
  }
];

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const headerPartial = extractPartial(indexHtml, "header");
const footerPartial = extractPartial(indexHtml, "footer");

PAGES.forEach(function (cfg) {
  const html = page(cfg, headerPartial, footerPartial);
  fs.writeFileSync(path.join(root, cfg.file), html, "utf8");
  console.log("Generated " + cfg.file);
});
