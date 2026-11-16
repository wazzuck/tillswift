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

---

## Done (Off-Site / Browser Actions, 16 Nov 2026)

- **IndexNow live push**: Submitted all 10 canonical URLs from
  `sitemap.xml` to `https://api.indexnow.org/indexnow` (`HTTP 200`).
- **Google Search Console (GSC)**: Added `https://tillswift.com/` and
  auto-verified ownership via the existing Google Analytics (`gtag.js`
  `G-V22KGRG9RS`) tag. Clicked **Request Indexing** on `/`,
  `square-pos-installation-london.html`, and
  `stripe-terminal-installation-london.html` until GSC presented a
  reCAPTCHA challenge on `custom-pos-software-integrations.html`, where
  automation stopped safely.
- **Bing Webmaster Tools**: Added and verified `https://tillswift.com/` via
  the `msvalidate.01` HTML meta tag, submitted `https://tillswift.com/sitemap.xml`
  (status: `Submitted - Processing`), and submitted all 6 priority URLs
  via Bing URL Submission (`Success: 6 URLs submitted Succesfully`).

---

## Next (Manual Follow-Up in Browser & Off-Site)

- [ ] **Complete GSC sitemap & remaining Request Indexing checks**: Clear the
  visible reCAPTCHA on the open GSC tab in Chromium, submit `sitemap.xml`
  under `https://tillswift.com/` Sitemaps, and finish requesting indexing
  for `sumup-pos-installation-london.html`,
  `custom-pos-software-integrations.html`, and `compare.html`.
- [ ] **External UK citations & partner directories**: Add consistent Name,
  Address, and Phone (NAP) listings (`TillSwift`, `25 Corringham Court,
  London NW11 7BY`, `020 4520 9114`, `hello@tillswift.com`) and links to
  `https://tillswift.com/` on Square Solutions Partner Directory, Stripe
  Partner Ecosystem, LinkedIn, Trustpilot, Yell, Bark, and FreeIndex.
- [ ] **Client reviews**: Ask recent London SumUp, Square, and till clients
  for reviews mentioning the installed platform and London location.
