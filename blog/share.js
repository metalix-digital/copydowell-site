// Copy-link button for the blog share bar. Share links themselves are plain
// anchors (share intents) and work without this script.
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.share-copy');
  if (!btn) return;
  var url = btn.getAttribute('data-url') || window.location.href;
  var label = btn.querySelector('.share-copy-label');
  function done() {
    if (!label) return;
    var original = label.textContent;
    label.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      label.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (err) {}
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(done, fallback);
  } else {
    fallback();
  }
});
