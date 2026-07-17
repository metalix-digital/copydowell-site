// Lightweight cookie-consent banner for CopydoWell.
// Works with Google Consent Mode v2: analytics is denied by default (set in the
// page <head>), and only granted here once the visitor clicks "Accept".
// The choice is remembered in localStorage so the banner shows only once —
// but a "Manage cookies" link (class="manage-cookies") can re-open it anytime.
(function () {
  var KEY = 'cdw_consent';

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function removeBar() {
    var bar = document.getElementById('cookie-consent');
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
    }
    removeBar();
  }

  function build() {
    if (document.getElementById('cookie-consent') || !document.body) return;
    var current = getChoice();
    var bar = document.createElement('div');
    bar.id = 'cookie-consent';
    bar.className = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<span class="cc-text">We use Google Analytics cookies to measure site traffic. ' +
      'You can accept or decline. See our <a href="privacy.html">Privacy Policy</a>.' +
      (current ? ' <em>Current choice: ' + current + '.</em>' : '') +
      '</span>' +
      '<span class="cc-actions">' +
      '<button type="button" class="cc-btn cc-decline">Decline</button>' +
      '<button type="button" class="cc-btn cc-accept">Accept</button>' +
      '</span>';
    document.body.appendChild(bar);
    bar.querySelector('.cc-accept').addEventListener('click', function () { setConsent('granted'); });
    bar.querySelector('.cc-decline').addEventListener('click', function () { setConsent('denied'); });
  }

  function wireManageLinks() {
    var links = document.querySelectorAll('.manage-cookies');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { e.preventDefault(); build(); });
    }
  }

  function init() {
    wireManageLinks();
    var choice = getChoice();
    if (choice !== 'granted' && choice !== 'denied') build(); // first visit — show banner
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
