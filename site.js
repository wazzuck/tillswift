/* ============================================================================
 * FILE: site.js
 *
 * PURPOSE:
 * Lightweight progressive-enhancement controls and Google Analytics 4 (GA4)
 * event instrumentation across all public TillSwift pages:
 * 1. Responsive mobile navigation drawer toggle.
 * 2. Accessible Accessible Rich Internet Applications (ARIA) platform tabs on
 *    index.html.
 * 3. First-party Google Tag (`gtag.js`, measurement ID `G-V22KGRG9RS`)
 *    interaction and conversion event reporting.
 *
 * WHAT THIS FILE IS NOT FOR:
 * Does not execute fee calculation or lead storage inside compare.html,
 * which keeps its own standalone calculator while sharing GA4 page listeners.
 *
 * INVARIANTS:
 * 1. Zero external dependencies beyond the first-party Google Tag declared in
 *    HTML `<head>` elements; listeners degrade silently when gtag is absent.
 * 2. All tab content remains present in the Document Object Model (DOM) for
 *    search engine and Artificial Intelligence (AI) crawlers.
 * ============================================================================
 */

(function () {
  'use strict';

  // Canonical list of Point of Sale (POS) platform guide slugs for funnel
  // attribution across landing and navigation links.
  var POS_GUIDE_SLUGS = [
    'sumup-pos-installation-london.html',
    'square-pos-installation-london.html',
    'stripe-terminal-installation-london.html',
    'custom-pos-software-integrations.html'
  ];

  /**
   * Dispatch a structured event to Google Analytics 4 (GA4) if available.
   *
   * @param {string} eventName - Lower-snake-case GA4 event identifier.
   * @param {Object} [params] - Flat scalar key-value metadata for reporting.
   */
  function trackEvent(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  /**
   * Normalise anchor text into a concise label capped for GA4 dimensions.
   *
   * @param {HTMLElement} el - Clicked anchor or summary element.
   * @returns {string} Trimmed text label of at most 80 characters.
   */
  function cleanLabel(el) {
    if (!el || !el.textContent) return '';
    return el.textContent.replace(/\s+/g, ' ').trim().slice(0, 80);
  }

  /**
   * Initialise mobile navigation drawer behaviour when the DOM is ready.
   *
   * Side effects: Toggles the 'is-open' class and 'aria-expanded' attribute
   * on the primary navigation menu when the toggle button is clicked.
   */
  function initMobileNav() {
    var btn = document.querySelector('[data-nav-toggle]');
    var menu = document.getElementById('primary-nav-links');
    if (!btn || !menu) return;

    // 1. Toggle drawer open/closed when the Menu button is activated.
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      menu.classList.toggle('is-open', !expanded);
    });

    // 2. Close drawer automatically once a mobile visitor clicks a link.
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      });
    });
  }

  /**
   * Initialise accessible platform tabs on pages containing a [role="tablist"].
   *
   * Side effects: Updates aria-selected and hidden states across tabs/panels
   * and emits a `platform_tab_select` GA4 event when the selection changes.
   */
  function initTabs() {
    var tablist = document.querySelector('[role="tablist"]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(
      tablist.querySelectorAll('[role="tab"]')
    );

    /**
     * Activate the requested tab, reveal its panel, and record the selection.
     *
     * @param {HTMLElement} targetTab - The tab button to activate.
     */
    function activateTab(targetTab) {
      var targetPanelId = targetTab.getAttribute('aria-controls');

      tabs.forEach(function (tab) {
        var isTarget = tab === targetTab;
        tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        tab.setAttribute('tabindex', isTarget ? '0' : '-1');

        var panelId = tab.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          panel.hidden = panelId !== targetPanelId;
        }
      });

      // Step 6 (Analytics): Emit platform_tab_select when switching tabs.
      trackEvent('platform_tab_select', {
        tab_id: targetTab.id || targetPanelId || '',
        page_path: window.location.pathname
      });
    }

    // 1. Bind click and Left/Right arrow keyboard navigation on every tab.
    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });

      tab.addEventListener('keydown', function (event) {
        var nextIdx = idx;
        if (event.key === 'ArrowRight') {
          nextIdx = (idx + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIdx = (idx - 1 + tabs.length) % tabs.length;
        } else {
          return;
        }
        event.preventDefault();
        tabs[nextIdx].focus();
        activateTab(tabs[nextIdx]);
      });
    });
  }

  /**
   * Wire site-wide GA4 conversion, FAQ engagement, and scroll depth tracking.
   *
   * Narrative walkthrough:
   * Step 1: Delegate telephone (`tel:`) clicks as `phone_call_click`.
   * Step 2: Delegate email (`mailto:`) clicks as `email_enquiry_click`.
   * Step 3: Delegate fee calculator (`compare.html`) CTA clicks as
   *         `open_fee_calculator`.
   * Step 4: Delegate visits to the four POS platform guides as
   *         `pos_guide_click`.
   * Step 5: Delegate external HTTPS links as `outbound_click`.
   * Step 7: Track `<details class="faq-item">` expansions as `faq_expand`.
   * Step 8: Track 50% and 90% scroll milestones once per page view.
   */
  function initAnalyticsTracking() {
    var pagePath = window.location.pathname;

    // Steps 1-5: Single delegated click handler for all tracked anchors.
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (!link) return;

      var href = link.getAttribute('href') || '';
      var label = cleanLabel(link);

      // Step 1: Telephone call link conversion.
      if (href.indexOf('tel:') === 0) {
        trackEvent('phone_call_click', {
          page_path: pagePath,
          link_text: label
        });
        return;
      }

      // Step 2: Direct email enquiry conversion.
      if (href.indexOf('mailto:') === 0) {
        trackEvent('email_enquiry_click', {
          page_path: pagePath,
          link_text: label
        });
        return;
      }

      // Step 3: Payment fee calculator navigation.
      if (href.indexOf('compare.html') !== -1) {
        trackEvent('open_fee_calculator', {
          page_path: pagePath,
          link_text: label
        });
        return;
      }

      // Step 4: Dedicated POS installation / integration guide navigation.
      for (var i = 0; i < POS_GUIDE_SLUGS.length; i++) {
        if (href.indexOf(POS_GUIDE_SLUGS[i]) !== -1) {
          trackEvent('pos_guide_click', {
            guide_slug: POS_GUIDE_SLUGS[i],
            page_path: pagePath,
            link_text: label
          });
          return;
        }
      }

      // Step 5: Outbound clicks to sister practices or partner sites.
      if (
        href.indexOf('http://') === 0 ||
        href.indexOf('https://') === 0
      ) {
        if (href.indexOf('tillswift.com') === -1) {
          trackEvent('outbound_click', {
            destination_url: href.slice(0, 120),
            page_path: pagePath,
            link_text: label
          });
        }
      }
    });

    // Step 7: Track FAQ accordion opens (toggle event does not bubble).
    document.querySelectorAll('details.faq-item').forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        var summary = item.querySelector('summary');
        trackEvent('faq_expand', {
          faq_question: cleanLabel(summary),
          page_path: pagePath
        });
      });
    });

    // Step 8: Track 50% and 90% scroll depth milestones once per load.
    var reached = { 50: false, 90: false };
    function checkScrollDepth() {
      var doc = document.documentElement;
      var scrollRange = doc.scrollHeight - window.innerHeight;
      if (scrollRange <= 0) return;
      var pct = ((window.scrollY || doc.scrollTop) / scrollRange) * 100;

      [50, 90].forEach(function (milestone) {
        if (!reached[milestone] && pct >= milestone) {
          reached[milestone] = true;
          trackEvent('scroll_depth', {
            percent_scrolled: milestone,
            page_path: pagePath
          });
        }
      });
    }

    window.addEventListener('scroll', checkScrollDepth, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initTabs();
    initAnalyticsTracking();
  });
})();
