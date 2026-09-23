#!/usr/bin/env node
/* Generate the standalone information pages from shared site chrome. */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

function extractPartial(html, name) {
  const start = html.indexOf("@partial:" + name + ":start");
  const end = html.indexOf("@partial:" + name + ":end");
  if (start === -1 || end === -1) {
    throw new Error("Could not find partial markers for: " + name);
  }
  const from = html.indexOf("-->", start) + 3;
  const to = html.lastIndexOf("<!--", end);
  return html.slice(from, to).trim();
}

const header = extractPartial(indexHtml, "header");
const footer = extractPartial(indexHtml, "footer");

const organizationJsonLd = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "ASSERT Research",
        "legalName": "ASSERT Research",
        "url": "https://assert-research.org/",
        "email": "long@assert-research.org",
        "taxID": "802557-3893",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Vasavägen 1",
          "postalCode": "139 33",
          "addressLocality": "Värmdö",
          "addressCountry": "SE"
        }
      }
    </script>`;

const pages = [
  {
    file: "about.html",
    title: "About — ASSERT Research",
    description:
      "Learn about ASSERT Research, its public-benefit mission, legal identity, and organizational details.",
    eyebrow: "About us",
    heading: "Independent software research for the public benefit",
    lead:
      "ASSERT Research is a Swedish non-profit association that conducts and promotes scientific research and development in software technology.",
    body: `
      <section class="section">
        <div class="container content-grid">
          <div class="prose">
            <span class="section__eyebrow">Who we are</span>
            <h2>ASSERT Research</h2>
            <p>ASSERT Research (<em>ideell förening</em>) is a public-benefit association. We pursue our mission openly, impartially, and with scientific independence.</p>
            <p>This website and the <strong>assert-research.org</strong> domain are owned and operated by ASSERT Research.</p>
          </div>
          <dl class="detail-card">
            <div><dt>Legal name</dt><dd>ASSERT Research</dd></div>
            <div><dt>Organization number</dt><dd>802557-3893</dd></div>
            <div><dt>Legal form</dt><dd>Ideell förening (non-profit association)</dd></div>
            <div><dt>Founded</dt><dd>22 May 2026</dd></div>
            <div><dt>Registered seat</dt><dd>Stockholm, Sweden</dd></div>
            <div><dt>Physical address</dt><dd>Vasavägen 1, 139 33 Värmdö, Sweden</dd></div>
          </dl>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container container--narrow">
          <div class="section__head">
            <span class="section__eyebrow">Our purpose</span>
            <h2>Research that remains accessible</h2>
          </div>
          <ul class="checklist">
            <li>Conduct and promote scientific research and development in software technology and adjacent fields.</li>
            <li>Apply for, manage, and administer grants for research and educational initiatives.</li>
            <li>Make research results accessible to the public, industry, and the scientific community.</li>
            <li>Collaborate with universities, public bodies, industry, and other organizations.</li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div class="container container--narrow prose">
          <span class="section__eyebrow">Legal foundation</span>
          <h2>Our bylaws</h2>
          <p>The bylaws define the association's purpose, membership, governance, financial year, and decision-making procedures.</p>
          <div class="button-row">
            <a class="btn btn--primary" href="/bylaws-en.html">Bylaws in English</a>
            <a class="btn btn--outline" href="/bylaws-sv.html">Stadgar på svenska</a>
          </div>
        </div>
      </section>`
  },
  {
    file: "activities.html",
    title: "Activities — ASSERT Research",
    description:
      "How ASSERT Research advances software research through projects, open publishing, grants, events, and collaboration.",
    eyebrow: "What we do",
    heading: "Research, knowledge sharing, and collaboration",
    lead:
      "Our activities are directed toward strengthening software research and making its results useful and accessible.",
    body: `
      <section class="section">
        <div class="container">
          <div class="section__head">
            <span class="section__eyebrow">Our activities</span>
            <h2>How we fulfil our purpose</h2>
            <p class="section__lead">The association carries out and supports work that is consistent with its public-benefit mission.</p>
          </div>
          <div class="grid grid--cards">
            <article class="card"><h3>Research projects</h3><p>Conducting research and development projects in software technology and adjacent fields.</p></article>
            <article class="card"><h3>Grants and funding</h3><p>Applying for and administering public and private research funding.</p></article>
            <article class="card"><h3>Open publishing</h3><p>Publishing reports, articles, research results, and open-source software.</p></article>
            <article class="card"><h3>Events and education</h3><p>Organizing seminars, workshops, conferences, and other educational activities.</p></article>
            <article class="card"><h3>Collaboration</h3><p>Working with researchers, universities, public bodies, industry, and other organizations.</p></article>
            <article class="card"><h3>Public benefit</h3><p>Reinvesting any surplus in the association's purpose rather than distributing it for private gain.</p></article>
          </div>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container container--narrow prose">
          <span class="section__eyebrow">Our approach</span>
          <h2>Open, impartial, and independent</h2>
          <p>ASSERT Research selects and conducts its work in line with its bylaws. Research quality and scientific independence guide the association's activities, while dissemination helps ensure that results can benefit the wider community.</p>
          <p>Organizations and researchers interested in future collaboration are welcome to contact the board.</p>
          <a class="btn btn--primary" href="/contact.html">Discuss a collaboration</a>
        </div>
      </section>`
  },
  {
    file: "governance.html",
    title: "Governance — ASSERT Research",
    description:
      "Board, founding members, and governance information for ASSERT Research.",
    eyebrow: "Governance",
    heading: "Responsible and transparent stewardship",
    lead:
      "The board manages the association's ongoing operations in accordance with its bylaws and decisions of the members.",
    body: `
      <section class="section">
        <div class="container">
          <div class="section__head">
            <span class="section__eyebrow">Board</span>
            <h2>Board members</h2>
          </div>
          <ul class="grid grid--board plain-list">
            <li class="member"><img class="member__avatar member__avatar--photo" src="/assets/img/board/martin.jpg" alt="Martin Monperrus" width="96" height="96" /><span class="member__role">Chairperson</span><div class="member__name">Martin Monperrus</div></li>
            <li class="member"><img class="member__avatar member__avatar--photo" src="/assets/img/board/deepika.jpg" alt="Deepika Tiwari" width="96" height="96" /><span class="member__role">Treasurer</span><div class="member__name">Deepika Tiwari</div></li>
            <li class="member"><img class="member__avatar member__avatar--photo" src="/assets/img/board/long.jpg" alt="Long Zhang" width="96" height="96" /><span class="member__role">Secretary</span><div class="member__name">Long Zhang</div></li>
          </ul>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="section__head">
            <span class="section__eyebrow">Our community</span>
            <h2>Founding members</h2>
            <p class="section__lead">ASSERT Research was established by the following founding members.</p>
          </div>
          <ul class="name-grid">
            <li>Aman Sharma</li><li>Benoit Baudry</li><li>Deepika Tiwari</li>
            <li>Frank Reyes García</li><li>He Ye</li><li>Javier Ron Arteaga</li>
            <li>Jian Gu</li><li>Khashayar Etemadi</li><li>Long Zhang</li>
            <li>Martin Monperrus</li><li>Sen Fang</li><li>Sofia Bobadilla Ponce</li>
            <li>Yannik Sander</li><li>Yi Liu</li><li>Zheyuan He</li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div class="container container--narrow prose">
          <span class="section__eyebrow">Accountability</span>
          <h2>Rules and member oversight</h2>
          <p>The association's bylaws cover board composition, authorized signatories, auditors, annual meetings, voting, financial administration, amendments, and dissolution.</p>
          <div class="button-row"><a class="btn btn--primary" href="/bylaws-en.html">Read the bylaws</a><a class="btn btn--outline" href="/about.html">Organization details</a></div>
        </div>
      </section>`
  },
  {
    file: "contact.html",
    title: "Contact — ASSERT Research",
    description:
      "Contact details and physical address for ASSERT Research, organization number 802557-3893.",
    eyebrow: "Contact",
    heading: "Get in touch with ASSERT Research",
    lead:
      "Contact us about research collaboration, membership, organizational matters, or general enquiries.",
    body: `
      <section class="section">
        <div class="container contact-details">
          <div class="contact-detail-card">
            <span class="section__eyebrow">Email</span>
            <h2>Write to us</h2>
            <p><a class="contact-link" href="mailto:long@assert-research.org">long@assert-research.org</a></p>
            <p>We use this address for general enquiries, membership, and collaboration.</p>
          </div>
          <div class="contact-detail-card">
            <span class="section__eyebrow">Physical address</span>
            <h2>Visit or write</h2>
            <address>ASSERT Research<br />Vasavägen 1<br />139 33 Värmdö<br />Sweden</address>
          </div>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container container--narrow">
          <div class="section__head">
            <span class="section__eyebrow">Organization details</span>
            <h2>Official information</h2>
          </div>
          <dl class="detail-card">
            <div><dt>Legal name</dt><dd>ASSERT Research</dd></div>
            <div><dt>Organization number</dt><dd>802557-3893</dd></div>
            <div><dt>Legal form</dt><dd>Ideell förening (non-profit association)</dd></div>
            <div><dt>Registered seat</dt><dd>Stockholm, Sweden</dd></div>
            <div><dt>Domain ownership</dt><dd>assert-research.org is owned and operated by ASSERT Research.</dd></div>
          </dl>
        </div>
      </section>`
  }
];

function renderPage(page) {
  const canonical = "https://assert-research.org/" + page.file;
  return `<!doctype html>
<!-- GENERATED FILE — do not edit. Source: scripts/render-pages.js + index.html -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="https://assert-research.org/assets/img/logo.png" />
    <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${canonical}" />
${organizationJsonLd}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body>
    ${header}
    <main id="main">
      <section class="page-hero">
        <div class="container container--narrow">
          <span class="section__eyebrow">${page.eyebrow}</span>
          <h1>${page.heading}</h1>
          <p class="page-hero__lead">${page.lead}</p>
        </div>
      </section>
${page.body}
    </main>
    ${footer}
    <script src="/assets/js/main.js"></script>
  </body>
</html>
`;
}

pages.forEach(function (page) {
  fs.writeFileSync(path.join(root, page.file), renderPage(page), "utf8");
  console.log("Generated " + page.file);
});
