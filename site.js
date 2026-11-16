/* ============================================================================
 * FILE: site.js
 *
 * PURPOSE:
 * Lightweight progressive-enhancement controls for TillSwift editorial pages:
 * 1. Responsive mobile navigation drawer toggle.
 * 2. Accessible Accessible Rich Internet Applications (ARIA) platform tabs on
 *    index.html.
 *
 * WHAT THIS FILE IS NOT FOR:
 * Not used by compare.html (the 3-year payment fee calculator retains its own
 * standalone scripts).
 *
 * INVARIANTS:
 * 1. Zero external dependencies or tracking calls.
 * 2. All tab content remains present in the Document Object Model (DOM) for
 *    search engine and Artificial Intelligence (AI) crawlers.
 * ============================================================================
 */

(function () {
  'use strict';

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
   * Side effects: Updates aria-selected and hidden states across tabs/panels.
   */
  function initTabs() {
    var tablist = document.querySelector('[role="tablist"]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(
      tablist.querySelectorAll('[role="tab"]')
    );

    /**
     * Activate the requested tab and reveal its associated panel.
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

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initTabs();
  });
})();
