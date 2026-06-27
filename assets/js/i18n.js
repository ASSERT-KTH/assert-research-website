/* =========================================================================
   i18n.js — Internationalisation dictionary and rendering engine.

   Single source of truth for ALL copy on the site. To edit text, change it
   here; the HTML only carries `data-i18n` keys, never prose.

   Supported languages: "en" (default) and "sv".
   ========================================================================= */

(function (global) {
  "use strict";

  /* ---- Language-independent data --------------------------------------- */
  // Board members: names are constant, role labels are translated by key.
  const BOARD = [
    {
      name: "Martin Monperrus",
      roleKey: "board.chair",
      initials: "MM",
      photo: "/assets/img/board/martin.jpg",
    },
    {
      name: "Deepika Tiwari",
      roleKey: "board.treasurer",
      initials: "DT",
      photo: "/assets/img/board/deepika.jpg",
    },
    {
      name: "Long Zhang",
      roleKey: "board.secretary",
      initials: "LZ",
      photo: "/assets/img/board/long.jpg",
    },
  ];

  const FOUNDERS = [
    "Aman Sharma",
    "Benoit Baudry",
    "Deepika Tiwari",
    "Frank Reyes García",
    "He Ye",
    "Javier Ron Arteaga",
    "Jian Gu",
    "Khashayar Etemadi",
    "Long Zhang",
    "Martin Monperrus",
    "Sen Fang",
    "Sofia Bobadilla Ponce",
    "Yannik Sander",
    "Yi Liu",
    "Zheyuan He",
  ];

  /* ---- Translation strings --------------------------------------------- */
  const STRINGS = {
    en: {
      "meta.title":
        "ASSERT Research — Advancing software research for the public benefit",
      "meta.description":
        "ASSERT Research is a non-profit association based in Stockholm, Sweden, that conducts and promotes scientific research in software technology.",

      "nav.about": "About",
      "nav.activities": "Activities",
      "nav.board": "Board",
      "nav.founders": "Founders",
      "nav.contact": "Contact",
      "nav.skip": "Skip to main content",

      "lang.label": "Language",
      "lang.en": "EN",
      "lang.sv": "SV",

      "hero.badge": "Non-profit association · Stockholm, Sweden",
      "hero.title": "Advancing software research for the public benefit",
      "hero.lead":
        "ASSERT Research conducts and promotes scientific research and development in software technology — openly, impartially, and independently.",
      "hero.cta.primary": "Get in touch",
      "hero.cta.secondary": "Read the bylaws",

      "about.eyebrow": "Who we are",
      "about.title": "A non-profit dedicated to software research",
      "about.lead":
        "ASSERT Research (ideell förening) is a public-benefit association. We pursue our mission in a transparent, impartial, and scientifically independent manner.",
      "about.purpose.title": "Our purpose",
      "about.purpose.1":
        "Conduct and promote scientific research and development in software technology and adjacent fields.",
      "about.purpose.2":
        "Apply for, manage, and administer research grants to fund research and educational initiatives.",
      "about.purpose.3":
        "Disseminate and make research results accessible to the public, industry, and the scientific community.",
      "about.purpose.4":
        "Collaborate with universities, public bodies, industry, and other organizations to strengthen software research and innovation.",

      "about.meta.seat.label": "Registered seat",
      "about.meta.seat.value": "Stockholm, Sweden",
      "about.meta.type.label": "Legal form",
      "about.meta.type.value": "Ideell förening (non-profit)",
      "about.meta.year.label": "Financial year",
      "about.meta.year.value": "1 Jan – 31 Dec",

      "activities.eyebrow": "What we do",
      "activities.title": "Activities",
      "activities.lead":
        "To fulfil its purpose, the association carries out a range of research and outreach activities.",
      "activities.1.title": "Research projects",
      "activities.1.body":
        "Executing our own research and development projects in software technology.",
      "activities.2.title": "Grants & funding",
      "activities.2.body":
        "Applying for and managing grants from public and private funders.",
      "activities.3.title": "Open publishing",
      "activities.3.body":
        "Publishing reports, articles, and open-source software for everyone.",
      "activities.4.title": "Events",
      "activities.4.body":
        "Organizing seminars, workshops, and conferences for the community.",
      "activities.5.title": "Collaboration",
      "activities.5.body":
        "Working with external researchers and institutions worldwide.",
      "activities.6.title": "Public benefit",
      "activities.6.body":
        "Any surplus is reinvested in line with our purpose — never distributed for private gain.",

      "board.eyebrow": "Governance",
      "board.title": "Board members",
      "board.lead":
        "The board is responsible for the ongoing operations of the association.",
      "board.chair": "Chairperson",
      "board.treasurer": "Treasurer",
      "board.secretary": "Secretary",

      "founders.eyebrow": "Our community",
      "founders.title": "Founding members",
      "founders.lead":
        "ASSERT Research was established by the following founding members.",

      "contact.eyebrow": "Get in touch",
      "contact.title": "Contact us",
      "contact.body":
        "For membership, collaboration, or general enquiries, we would love to hear from you.",
      "contact.cta": "Email us",

      "footer.tagline":
        "Advancing scientific research and development in software technology, for the public benefit.",
      "footer.explore": "Explore",
      "footer.org": "Organization",
      "footer.bylaws.en": "Bylaws (English)",
      "footer.bylaws.sv": "Bylaws (Swedish)",
      "footer.contact": "Contact",
      "footer.rights": "ASSERT Research. All rights reserved.",
      "footer.note":
        "A non-profit association (ideell förening) registered in Stockholm, Sweden.",

      "bylaws.meta.title": "Bylaws — ASSERT Research",
      "bylaws.meta.desc":
        "The bylaws (stadgar) of ASSERT Research, a non-profit association based in Stockholm, Sweden.",
    },

    sv: {
      "meta.title": "ASSERT Research — Främjar programvaruforskning",
      "meta.description":
        "ASSERT Research är en ideell förening med säte i Stockholm som bedriver och främjar vetenskaplig forskning inom programvaruteknik.",

      "nav.about": "Om oss",
      "nav.activities": "Verksamhet",
      "nav.board": "Styrelse",
      "nav.founders": "Grundare",
      "nav.contact": "Kontakt",
      "nav.skip": "Hoppa till huvudinnehåll",

      "lang.label": "Språk",
      "lang.en": "EN",
      "lang.sv": "SV",

      "hero.badge": "Ideell förening · Stockholm, Sverige",
      "hero.title": "Främjar programvaruforskning till allmän nytta",
      "hero.lead":
        "ASSERT Research bedriver och främjar vetenskaplig forskning och utveckling inom programvaruteknik — öppet, opartiskt och oberoende.",
      "hero.cta.primary": "Kontakta oss",
      "hero.cta.secondary": "Läs stadgarna",

      "about.eyebrow": "Vilka vi är",
      "about.title": "En ideell förening för programvaruforskning",
      "about.lead":
        "ASSERT Research är en ideell förening med allmännyttigt syfte. Vi bedriver vår verksamhet på ett transparent, opartiskt och vetenskapligt oberoende sätt.",
      "about.purpose.title": "Vårt ändamål",
      "about.purpose.1":
        "Bedriva och främja vetenskaplig forskning och utveckling inom programvaruteknik och angränsande områden.",
      "about.purpose.2":
        "Söka, förvalta och administrera forskningsanslag för att finansiera forsknings- och utbildningsinitiativ.",
      "about.purpose.3":
        "Sprida och tillgängliggöra forskningsresultat för allmänheten, industrin och det vetenskapliga samfundet.",
      "about.purpose.4":
        "Samarbeta med universitet, offentliga organ, näringsliv och andra organisationer för att stärka forskning och innovation inom programvaruteknik.",

      "about.meta.seat.label": "Säte",
      "about.meta.seat.value": "Stockholm, Sverige",
      "about.meta.type.label": "Juridisk form",
      "about.meta.type.value": "Ideell förening",
      "about.meta.year.label": "Verksamhetsår",
      "about.meta.year.value": "1 jan – 31 dec",

      "activities.eyebrow": "Vad vi gör",
      "activities.title": "Verksamhet",
      "activities.lead":
        "För att uppnå sitt ändamål bedriver föreningen en rad forsknings- och samverkansaktiviteter.",
      "activities.1.title": "Forskningsprojekt",
      "activities.1.body":
        "Genomförande av egna forsknings- och utvecklingsprojekt inom programvaruteknik.",
      "activities.2.title": "Anslag & finansiering",
      "activities.2.body":
        "Ansökan om och förvaltning av bidrag från offentliga och privata finansiärer.",
      "activities.3.title": "Öppen publicering",
      "activities.3.body":
        "Publicering av rapporter, artiklar och öppen källkod för alla.",
      "activities.4.title": "Evenemang",
      "activities.4.body":
        "Anordnande av seminarier, workshops och konferenser för gemenskapen.",
      "activities.5.title": "Samarbete",
      "activities.5.body":
        "Samarbete med externa forskare och institutioner världen över.",
      "activities.6.title": "Allmän nytta",
      "activities.6.body":
        "Eventuellt överskott återinvesteras enligt vårt ändamål — aldrig för privat vinning.",

      "board.eyebrow": "Styrning",
      "board.title": "Styrelseledamöter",
      "board.lead": "Styrelsen ansvarar för föreningens löpande verksamhet.",
      "board.chair": "Ordförande",
      "board.treasurer": "Kassör",
      "board.secretary": "Sekreterare",

      "founders.eyebrow": "Vår gemenskap",
      "founders.title": "Grundande medlemmar",
      "founders.lead":
        "ASSERT Research grundades av följande grundande medlemmar.",

      "contact.eyebrow": "Hör av dig",
      "contact.title": "Kontakta oss",
      "contact.body":
        "För medlemskap, samarbete eller allmänna frågor hör vi gärna från dig.",
      "contact.cta": "Mejla oss",

      "footer.tagline":
        "Främjar vetenskaplig forskning och utveckling inom programvaruteknik, till allmän nytta.",
      "footer.explore": "Utforska",
      "footer.org": "Organisation",
      "footer.bylaws.en": "Stadgar (engelska)",
      "footer.bylaws.sv": "Stadgar (svenska)",
      "footer.contact": "Kontakt",
      "footer.rights": "ASSERT Research. Alla rättigheter förbehållna.",
      "footer.note": "En ideell förening registrerad i Stockholm, Sverige.",

      "bylaws.meta.title": "Stadgar — ASSERT Research",
      "bylaws.meta.desc":
        "Stadgar för ASSERT Research, en ideell förening med säte i Stockholm, Sverige.",
    },
  };

  const SUPPORTED = ["en", "sv"];
  const DEFAULT_LANG = "en";

  function t(lang, key) {
    const dict = STRINGS[lang] || STRINGS[DEFAULT_LANG];
    return dict[key] != null ? dict[key] : STRINGS[DEFAULT_LANG][key] || key;
  }

  /* ---- Dynamic list rendering ------------------------------------------ */
  function renderBoard(lang) {
    const host = document.querySelector("[data-board-list]");
    if (!host) return;
    host.innerHTML = BOARD.map(function (m) {
      const avatar = m.photo
        ? '<img class="member__avatar member__avatar--photo" src="' +
          m.photo +
          '" alt="' +
          m.name +
          '" width="96" height="96" loading="lazy" decoding="async" />'
        : '<div class="member__avatar" aria-hidden="true">' +
          m.initials +
          "</div>";
      return (
        '<li class="member">' +
        avatar +
        '<span class="member__role">' +
        t(lang, m.roleKey) +
        "</span>" +
        '<div class="member__name">' +
        m.name +
        "</div>" +
        "</li>"
      );
    }).join("");
  }

  function renderFounders() {
    const host = document.querySelector("[data-founders-list]");
    if (!host) return;
    function cell(name) {
      return (
        '<td class="member-table__cell">' +
        '<span class="member-table__name">' +
        name +
        "</span>" +
        "</td>"
      );
    }

    // Lay the names out across three columns, ordered by first name.
    const ordered = FOUNDERS.slice().sort(function (a, b) {
      return a.localeCompare(b);
    });
    const cols = 3;
    const rows = Math.ceil(ordered.length / cols);
    let html = "";
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) {
        const name = ordered[r * cols + c];
        html += name ? cell(name) : '<td class="member-table__cell"></td>';
      }
      html += "</tr>";
    }
    host.innerHTML = html;
  }

  /* ---- Apply translations to the DOM ----------------------------------- */
  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    document.documentElement.setAttribute("lang", lang);

    // Text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(lang, el.getAttribute("data-i18n"));
    });

    // Attribute translations: data-i18n-attr="aria-label:nav.skip;title:..."
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          const parts = pair.split(":");
          if (parts.length === 2) {
            el.setAttribute(parts[0].trim(), t(lang, parts[1].trim()));
          }
        });
    });

    // Document title + meta description.
    // A page may override the keys via data-title-key / data-desc-key on <html>
    // (e.g. the bylaws pages) so the shared header/footer don't force the
    // home-page title.
    const root = document.documentElement;
    document.title = t(
      lang,
      root.getAttribute("data-title-key") || "meta.title",
    );
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        t(lang, root.getAttribute("data-desc-key") || "meta.description"),
      );
    }

    // Dynamic lists
    renderBoard(lang);
    renderFounders();

    // Reflect state on language switch buttons
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-lang-btn") === lang ? "true" : "false",
      );
    });
  }

  global.I18N = {
    SUPPORTED: SUPPORTED,
    DEFAULT_LANG: DEFAULT_LANG,
    apply: apply,
    t: t,
  };
})(window);
