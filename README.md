# TillSwift (`https://tillswift.com/`)

Senior software support engineer-led London Point of Sale (POS) systems
engineering hub, custom POS software integration practice, and 3-year Total
Cost of Ownership (TCO) payment provider comparison calculator.

---

## 1. Overview & Repository Structure

- **Primary Domain**: `https://tillswift.com/` (GitHub Pages static site).
- **Engineering Base**: `25 Corringham Court, London NW11 7BY`, serving Greater
  London and UK clients (`020 4520 9114`, `hello@tillswift.com`).
- **Sister Practice**: `https://itoldyouso.tech/` (`IToldYouSo Computing`,
  generalist London Information Technology (IT) support and infrastructure).
- **Primary Pages (`sitemap.xml`, 10 Canonical Pages)**:
  - `index.html`: POS-first London engineering hub (SumUp, Square, Stripe
    Terminal, Clover, Lightspeed, and Shopify POS).
  - `sumup-pos-installation-london.html`: Dedicated London SumUp setup guide.
  - `square-pos-installation-london.html`: Dedicated London Square setup guide.
  - `stripe-terminal-installation-london.html`: Stripe Terminal & developer POS
    integrations guide.
  - `custom-pos-software-integrations.html`: Bespoke Application Programming
    Interface (API), Electronic Point of Sale (EPOS), and accounting bridge
    engineering.
  - `compare.html`: Interactive 3-year Total Cost of Ownership (TCO) card
    processing comparison calculator across UK acquirers (legacy links with
    `?demo`, `?preset`, `?txn`, `?exp`, `?sig`, `?link_id` redirect here
    automatically from `index.html`).
  - `how-it-works.html`, `about.html`, `contact.html`, `legal.html`.
- **Verification Gate**: Run `python3 scripts/verify_site.py` before any commit
  (must pass with exit code `0`).

---

## 2. Search Engine & Artificial Intelligence Discovery Optimisations

1. **POS-First Information Architecture & Commercial Keyword Alignment**:
   - Repositioned the homepage from a single calculator into a calm, editorial
     London POS engineering hub highlighting hardware + networking + full-stack
     software design capabilities, while preserving `compare.html` as a
     first-class companion tool.
   - Applied Search Engine Optimisation (SEO) and Generative Engine
     Optimisation (GEO) across four intent-specific London landing pages
     targeting high-intent commercial searches (`"SumUp POS installation
     London"`, `"Square POS setup London"`, `"Stripe Terminal developer
     installation London"`, and `"custom POS software integrations"`).
   - Expanded accessible `<details class="faq-item">` Frequently Asked
     Questions (FAQ) sections written in British Professional English.

2. **Schema.org Linked Data (`JSON-LD`) & Verbatim FAQ Parity**:
   - Embedded structured JavaScript Object Notation for Linked Data (JSON-LD)
     `@graph` blocks on every public page (`ProfessionalService`, `ITService`,
     `Service`, `OfferCatalog`, `BreadcrumbList`, and `FAQPage`).
   - Enforced character-for-character verbatim matching between JSON-LD
     `FAQPage` answers and visible HyperText Markup Language (HTML)
     `<details class="faq-item">` blocks via `scripts/verify_site.py`.

3. **Artificial Intelligence (AI) & Large Language Model (LLM) Discovery**:
   - Updated `robots.txt` to explicitly allow major AI search, retrieval, and
     traditional crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`,
     `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Perplexity-User`,
     `DeepSeekBot`, `GrokBot`, `Google-Extended`, `Bingbot`, and `Applebot`.
   - Blocked non-public print flyers and manual email drafts
     (`5x7flyer1.html`, `flyer2.html`, `manual_email.html`) via both
     `robots.txt` `Disallow:` directives and `<meta name="robots"
     content="noindex, nofollow">` tags.
   - Authored machine-readable `llms.txt` and `llms-full.txt` context files
     containing `Also Known As` synonym blocks so natural-language queries in
     ChatGPT Search, Google Gemini, DeepSeek, Claude, and Perplexity match our
     London POS engineering services.

4. **Instant Search Engine Push Notifications (IndexNow)**:
   - Provisioned root verification key `8f3c9a21d4e74b109c5a6e2d8f01b3c4.txt`.
   - Added `scripts/submit_indexnow.py` and GitHub Actions workflow
     `.github/workflows/indexnow.yml` to automatically notify
     `https://api.indexnow.org/indexnow` (Bing, Yandex, Naver, Seznam, Yep,
     and IndexNow-participating AI search engines) of all 10 `sitemap.xml`
     URLs on every deployment to `main`.

5. **Bidirectional Sister-Site Authority & NAP Consistency**:
   - Aligned links and Schema.org `sameAs` references between `tillswift.com`
     and `https://itoldyouso.tech/` with consistent Name, Address, and Phone
     (NAP) entity records (`25 Corringham Court, London NW11 7BY`,
     `020 4520 9114`).

6. **Full Google Analytics 4 (`gtag.js`, `G-V22KGRG9RS`) Instrumentation**:
   - Added the first-party Google Tag (`G-V22KGRG9RS`) and shared `site.js`
     script across all 10 public HTML pages (`legal.html` and `compare.html`
     included), enforced automatically by `scripts/verify_site.py`.
   - Instrumented conversion and engagement events in `site.js`:
     `phone_call_click`, `email_enquiry_click`, `open_fee_calculator`,
     `pos_guide_click`, `outbound_click`, `platform_tab_select`, `faq_expand`,
     and `scroll_depth` (50% and 90%).
   - Forwarded non-Personally Identifiable Information (PII) calculator
     funnel events (`calc_session_started`, `calc_view_results`,
     `calc_provider_opened`, `calc_sort_changed`, `calc_notify_opened`,
     `calc_notify_submitted`) from `compare.html` into `window.gtag`.

7. **Search Engine Console Verification & Sitemap Submissions (16 Nov 2026)**:
   - Verified `https://tillswift.com/` ownership in Google Search Console (GSC)
     via Google Analytics 4 (GA4) tag `G-V22KGRG9RS` and submitted
     `sitemap.xml` (`Success`, 10 pages discovered).
   - Verified `https://tillswift.com/` ownership in Microsoft Bing Webmaster
     Tools via `<meta name="msvalidate.01" ...>`, submitted `sitemap.xml`, and
     submitted priority Uniform Resource Locators (URLs) via Bing URL
     Submission.
   - Confirmed `IToldYouSo Computing` Google Business Profile status is
     `Verified`.

---

## 3. Check Back & Verify Search Crawl & Live Rankings (Action Required Later)

> **Important Note on Crawl Latency (16 Nov 2026):** Immediately after
> submitting `sitemap.xml` and queueing **Request Indexing**, Google Search
> Console URL Inspection continues to display **"URL is not on Google"** and
> **"Last crawl: N/A"** (`Discovered – currently not indexed`) until
> `Googlebot` processes the asynchronous crawl queue. Sitemap status
> **`Success` (10 discovered pages)** confirms Google has accepted the
> sitemap; actual indexing and live Search Engine Results Page (SERP)
> inclusion typically take **24–72 hours** for initial crawl and
> **7–14 days** (plus external UK directory citations and reviews) for
> ranking movement across search and AI engines.

Please revisit and verify the following checks after waiting **24–72 hours**
and again at **7–14 days**:

1. **Google Search Console (`https://search.google.com/search-console`)**:
   - Open `https://tillswift.com/` → *Indexing → Pages* and confirm all 10
     pages move out of *Discovered – currently not indexed* into *Indexed*.
   - Run *URL Inspection* on `/`, `sumup-pos-installation-london.html`,
     `square-pos-installation-london.html`,
     `stripe-terminal-installation-london.html`, and
     `custom-pos-software-integrations.html` and verify **Last crawl** shows
     a post-`16 Nov 2026` timestamp and **URL is on Google**.
2. **Bing Webmaster Tools (`https://www.bing.com/webmasters`)**:
   - Check *Site Explorer* and *URL Inspection* to confirm all 10 pages are
     indexed (note Bing feeds OpenAI ChatGPT Search and Copilot answers).
3. **Live UK Search Engine Queries (`google.co.uk`, `bing.com`)**:
   - Run `site:tillswift.com` and `site:itoldyouso.tech` to confirm fresh
     titles, descriptions, and new POS pages appear in live search results.
   - Test `"SumUp POS installation London"`, `"Square POS installer London"`,
     `"Stripe Terminal setup London"`, and `"IToldYouSo Computing London"`.
4. **Live AI Assistant Verification**:
   - Ask OpenAI ChatGPT (with web search), Google Gemini, DeepSeek, and
     Perplexity: *"Who can install a SumUp, Square or Stripe POS system
     on-site for my shop in London?"* and record citation progress in
     `STATUS.md`.
5. **Google Analytics 4 (`G-V22KGRG9RS`) Real-Time & Events Check**:
   - Open Google Analytics 4 → *Reports → Realtime* and *Engagement → Events*
     while browsing `/` and `compare.html` to confirm custom conversion events
     (`phone_call_click`, `open_fee_calculator`, `pos_guide_click`,
     `calc_view_results`) are recording cleanly.
