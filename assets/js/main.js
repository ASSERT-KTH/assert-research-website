/* =========================================================================
   main.js — Small UI helpers.
   ========================================================================= */

(function () {
  "use strict";

  function setYear() {
    const el = document.querySelector("[data-year]");
    // Year is purely cosmetic in the footer.
    if (el) el.textContent = new Date().getFullYear();
  }

  function markCurrentPage() {
    function normalizePath(path) {
      var normalized = path
        .replace(/\/index\.html$/, "/")
        .replace(/\.html$/, "")
        .replace(/\/$/, "");
      return normalized || "/";
    }

    var path = normalizePath(window.location.pathname);
    document.querySelectorAll(".site-nav__links a").forEach(function (link) {
      var linkPath = normalizePath(
        new URL(link.href, window.location.href).pathname
      );
      if (linkPath === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function init() {
    setYear();
    markCurrentPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
