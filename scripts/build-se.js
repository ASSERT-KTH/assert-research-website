#!/usr/bin/env node
/* =========================================================================
   build-se.js — Generate /se/index.html from the root index.html.

   The root index.html is the single structural source of truth. The Swedish
   page shares the exact same markup; only language-specific attributes and
   the no-JS SEO defaults (title / description / canonical) are swapped so the
   /se/ URL is correct and indexable on its own. All visible copy is still
   filled at runtime by i18n.js, so there is only one place to edit text.

   Run:  npm run build   (or)   node scripts/build-se.js
   ========================================================================= */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcPath = path.join(root, "index.html");
const outDir = path.join(root, "se");
const outPath = path.join(outDir, "index.html");

const SV_TITLE = "ASSERT Research — Främjar programvaruforskning";
const SV_DESC =
  "ASSERT Research är en ideell förening med säte i Stockholm som bedriver och främjar vetenskaplig forskning inom programvaruteknik.";

let html = fs.readFileSync(srcPath, "utf8");

html = html
  // Language attributes
  .replace(
    '<html lang="en" data-page-lang="en">',
    '<html lang="sv" data-page-lang="sv">'
  )
  // Canonical + Open Graph URL
  .replace(
    'href="https://assert-research.org/"',
    'href="https://assert-research.org/se/"'
  )
  .replace(
    'content="https://assert-research.org/"',
    'content="https://assert-research.org/se/"'
  )
  // No-JS SEO defaults
  .replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>" + SV_TITLE + "</title>"
  )
  .replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
    "$1" + SV_DESC + "$2"
  )
  // Default pressed state on the language switch (JS re-confirms on load)
  .replace(
    'data-lang-btn="en"\n              aria-pressed="true"',
    'data-lang-btn="en"\n              aria-pressed="false"'
  )
  .replace(
    'data-lang-btn="sv"\n              aria-pressed="false"',
    'data-lang-btn="sv"\n              aria-pressed="true"'
  )
  // Banner so it is obvious this file is generated
  .replace(
    "<!doctype html>",
    "<!doctype html>\n<!-- GENERATED FILE — do not edit. Source: /index.html via scripts/build-se.js -->"
  );

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html, "utf8");

console.log("Generated " + path.relative(root, outPath));
