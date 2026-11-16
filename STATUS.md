# Project Status & Search / Discovery Log

Repository state and off-site search-engine actions for `tillswift.com`
(`TillSwift`), London Point of Sale (POS) systems engineering, custom POS
software integrations, and three-year Total Cost of Ownership (TCO) payment
provider comparison.

---

## Done (In-Repository, 16 Nov 2026)

- **POS-first site architecture (`535b55b`)**: Repurposed `index.html` into
  a calm, software-engineer-led London POS and till engineering hub across
  SumUp, Square, Stripe Terminal, Clover, Lightspeed, and Shopify POS.
- **Preserved 3-year payment fee calculator (`535b55b`)**: Moved the
  existing calculator intact to `compare.html` and added a query-parameter
  forwarder on `index.html` so shared `?demo`, `?preset`, `?txn`, and
  temporary-access links (`?exp`, `?sig`, `?link_id`) continue to work.
- **Dedicated London vendor & custom software pages (`535b55b`)**: Published
  `sumup-pos-installation-london.html`,
  `square-pos-installation-london.html`,
  `stripe-terminal-installation-london.html`, and
  `custom-pos-software-integrations.html` sharing `styles.css` and `site.js`,
  with verbatim `FAQPage` JavaScript Object Notation for Linked Data
  (JSON-LD) and British Professional English copy.
- **IndexNow, verification, and crawler hygiene (`49a13d3`, `6239a54`)**:
  Added IndexNow key `8f3c9a21d4e74b109c5a6e2d8f01b3c4.txt`,
  `scripts/submit_indexnow.py`, `.github/workflows/indexnow.yml`,
  `scripts/verify_site.py`, `Also Known As` synonym blocks in `llms.txt` and
  `llms-full.txt`, `noindex, nofollow` + `Disallow` rules for print/email
  utility pages, and the Bing Webmaster Tools `msvalidate.01` meta tag.
- **Full Google Analytics 4 (GA4) instrumentation (`f314e5e`)**: Added the
  `G-V22KGRG9RS` Google tag to `legal.html` for 100% coverage across all 10
  public pages, wired `site.js` site-wide (`phone_call_click`,
  `email_enquiry_click`, `open_fee_calculator`, `pos_guide_click`,
  `outbound_click`, `platform_tab_select`, `faq_expand`, `scroll_depth`),
  forwarded non-Personally Identifiable Information (PII) calculator
  events from `compare.html`, and enforced `gtag.js` + `site.js` in
  `scripts/verify_site.py`.
- **Online discovery documentation (`753c758`)**: Created `README.md`
  documenting Search Engine Optimisation (SEO), Generative Engine
  Optimisation (GEO), Artificial Intelligence (AI) crawler configuration,
  IndexNow automation, Google Analytics 4 (GA4), and a post-crawl checklist,
  with 80-column verification enforced in `scripts/verify_site.py`.
- **Full-service turnkey POS lifecycle (`7d4ca96`)**: Expanded `index.html`,
  `how-it-works.html`, platform pages, `contact.html`, `llms.txt`,
  `llms-full.txt`, and `README.md` with the 5-stage consultancy workflow
  (initial call, system design, equipment sourcing on the client's behalf,
  on-site installation and staff training, and ongoing engineer support),
  dedicated `#hardware` and `#sectors` sections, and matching verbatim
  `FAQPage` items.
- **London-based & Hampstead base opening copy (`2ff4a41`)**: Updated the
  opening statements across `index.html`, `about.html`, `how-it-works.html`,
  `contact.html`, the four platform pages, `llms.txt`, and `llms-full.txt`
  to highlight that TillSwift is London-based, operating from Hampstead.

---

## Done (Off-Site / Browser Actions, 16 Nov 2026)

- **IndexNow live push**: Submitted all 10 canonical Uniform Resource
  Locators (URLs) from `sitemap.xml` to `https://api.indexnow.org/indexnow`
  (`HTTP 200`).
- **Google Search Console (GSC)**:
  - Verified ownership for `https://tillswift.com/` via the existing Google
    Analytics (`G-V22KGRG9RS`) tag.
  - Submitted `sitemap.xml` (`Status: Success`, `10` discovered pages, read
    `16 Nov 2026`).
  - Submitted **Request Indexing** on `/`,
    `square-pos-installation-london.html`,
    `stripe-terminal-installation-london.html`,
    `custom-pos-software-integrations.html` (after clearing reCAPTCHA), and
    `compare.html`.
  - Checked `sumup-pos-installation-london.html`: currently shows
    `Discovered – currently not indexed` (`Sitemaps:
    https://tillswift.com/sitemap.xml`, `Last crawl: N/A`) while awaiting
    `Googlebot`'s asynchronous initial crawl.
- **Bing Webmaster Tools**: Added and verified `https://tillswift.com/` via
  the `msvalidate.01` HTML meta tag, submitted `https://tillswift.com/sitemap.xml`,
  and submitted all 6 priority URLs via Bing URL Submission (`Success: 6 URLs
  submitted Succesfully`).

---

## Next (Check Back From Thursday, 19 November 2026)

- **Submitted Date:** Monday, 16 November 2026.
- **Check Back From (Initial Crawl Verification):** Thursday,
  19 November 2026 (24–72 hours post-submission).
- **Check Back From (Search & AI Ranking Review):** Monday,
  23 November 2026 to Monday, 30 November 2026 (7–14 days post-submission).
- [ ] **Check back & verify search crawl (from 19 November 2026)**:
  Google Search Console still initially shows *"URL is not on Google"* and
  *"Last crawl: N/A"* while the crawl queue runs asynchronously. Revisit
  *Indexing → Pages* and *URL Inspection* **from Thursday, 19 November 2026**
  onwards to confirm all 10 URLs (especially
  `sumup-pos-installation-london.html` and the new landing pages) report
  **URL is on Google** with a fresh crawl timestamp, then verify live
  `site:tillswift.com` results on Google UK, Bing UK, and AI search engines
  (OpenAI ChatGPT, Google Gemini, DeepSeek, Perplexity) **from Monday,
  23 November 2026** alongside live events in GA4 (`G-V22KGRG9RS`).
- [ ] **Optional manual Request Indexing boost**: Once rate limiting resets,
  optionally click **Request Indexing** directly in GSC for
  `sumup-pos-installation-london.html` and any remaining un-requested pages
  from `sitemap.xml` (`about.html`, `how-it-works.html`, `contact.html`).
- [ ] **External UK citations & partner directories**: Add consistent Name,
  Address, and Phone (NAP) listings (`TillSwift`, `25 Corringham Court,
  London NW11 7BY`, `020 4520 9114`, `hello@tillswift.com`) and links to
  `https://tillswift.com/` on Square Solutions Partner Directory, Stripe
  Partner Ecosystem, LinkedIn, Trustpilot, Yell, Bark, and FreeIndex.
- [ ] **Client reviews**: Ask recent London SumUp, Square, and till clients
  for reviews mentioning the installed platform and London location.
