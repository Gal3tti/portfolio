(function () {
  try {
    var v = localStorage.getItem('theme');
    if (v === 'light' || v === 'dark') document.documentElement.setAttribute('data-theme', v);
  } catch (e) {}
})();
