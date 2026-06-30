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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setYear);
  } else {
    setYear();
  }
})();
