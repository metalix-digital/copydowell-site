// Lightweight cookie-consent banner for CopydoWell.
// Works with Google Consent Mode v2: analytics is denied by default (set in the
// page <head>), and only granted here once the visitor clicks "Accept".
// The choice is remembered in localStorage so the banner shows only once.
(function () {
  var KEY = 'cdw_consent';

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === 'granted' || choice === 'denied') return; // already decided — no banner

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (value === 'granted' && typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    var bar = document.getElementById('cookie-consent');
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
  }

  function build() {
    var bar = document.createElement('div');
    bar.id = 'cookie-consent';
    bar.className = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<span class="cc-text">We use Google Analytics cookies to measure site traffic. ' +
      'You can accept or decline. See our <a href="privacy.html">Privacy Policy</a>.</span>' +
      '<span class="cc-actions">' +
      '<button type="button" class="cc-btn cc-decline">Decline</button>' +
      '<button type="button" class="cc-btn cc-accept">Accept</button>' +
      '</span>';
    document.body.appendChild(bar);
    bar.querySelector('.cc-accept').addEventListener('click', function () { setConsent('granted'); });
    bar.querySelector('.cc-decline').addEventListener('click', function () { setConsent('denied'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
