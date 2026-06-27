/* =========================================================================
   main.js — Site bootstrap: language resolution, switching and small UI.
   Depends on i18n.js (window.I18N).
   ========================================================================= */

(function () {
  "use strict";

  const I18N = window.I18N;
  const STORAGE_KEY = "assert-lang";

  /* Resolve the active language.
     Priority:
       1. Path-based — pages served under "/se" are Swedish (shareable URL).
       2. The lang declared on <html data-page-lang> (set per file).
       3. A previously stored user preference.
       4. The default language (English). */
  function resolveLang() {
    const path = window.location.pathname.toLowerCase();
    if (/(^|\/)se(\/|$)/.test(path)) return "sv";

    const pageLang = document.documentElement.getAttribute("data-page-lang");
    if (pageLang && I18N.SUPPORTED.indexOf(pageLang) !== -1) return pageLang;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && I18N.SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {
      /* localStorage may be unavailable (private mode) */
    }
    return I18N.DEFAULT_LANG;
  }

  function store(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  /* Map a language to its canonical URL so links and history stay shareable.
     A page may declare explicit per-language URLs on <html> (data-url-en /
     data-url-sv) — used by the bylaws pages, which are separate documents per
     language. Otherwise fall back to the home-page convention ("/" ↔ "/se/"),
     which works whether the site is at the domain root or a sub-path. */
  function urlForLang(lang) {
    const explicit = document.documentElement.getAttribute(
      lang === "sv" ? "data-url-sv" : "data-url-en"
    );
    if (explicit) return explicit;

    const path = window.location.pathname;
    const base = path.replace(/\/se\/?$/i, "/").replace(/\/index\.html$/i, "/");
    const root = base.endsWith("/") ? base : base + "/";
    return lang === "sv" ? root + "se/" : root;
  }

  function setLang(lang, options) {
    options = options || {};
    I18N.apply(lang);
    store(lang);

    // Keep the bylaws links pointing at the matching document.
    document.querySelectorAll("[data-bylaws]").forEach(function (el) {
      const which = el.getAttribute("data-bylaws"); // "active" | "en" | "sv"
      const target = which === "active" ? lang : which;
      el.setAttribute("href", "/bylaws-" + target + ".html");
    });

    if (options.updateUrl) {
      try {
        window.history.replaceState({ lang: lang }, "", urlForLang(lang));
      } catch (e) {
        /* history API unavailable */
      }
    }
  }

  function wireLanguageSwitch() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang-btn");

        // Pages flagged as language-static (e.g. the bylaws documents) carry
        // localized content that JS can't re-render in place, so switching
        // language means navigating to the sibling document.
        if (document.documentElement.hasAttribute("data-i18n-static")) {
          store(lang);
          const target = urlForLang(lang);
          if (target) window.location.assign(target);
          return;
        }

        setLang(lang, { updateUrl: true });
      });
    });
  }

  function setYear() {
    const el = document.querySelector("[data-year]");
    // Date.now is fine in the browser; year is purely cosmetic in the footer.
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    wireLanguageSwitch();
    setYear();
    setLang(resolveLang());
    document.documentElement.classList.add("i18n-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
