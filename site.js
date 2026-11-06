(function () {
  var D = document, $ = function (id) { return D.getElementById(id); };
  function el(tag, text, cls) {
    var e = D.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }
  function link(label, url) {
    var a = el('a', label);
    a.href = url;
    if (/^https?:/.test(url)) a.rel = 'noopener';
    return a;
  }

  var sel = $('theme');
  if (sel) {
    try { sel.value = localStorage.getItem('theme') || 'auto'; } catch (e) {}
    sel.addEventListener('change', function () {
      var v = sel.value, root = D.documentElement;
      if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v);
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', v); } catch (e) {}
    });
  }

  function renderLinks(box, links) {
    (links || []).forEach(function (l) {
      var li = el('li');
      li.appendChild(link(l.label, l.url));
      box.appendChild(li);
    });
  }

  function home(c) {
    D.title = c.name;
    $('name').textContent = c.name;
    $('tagline').textContent = c.tagline || '';
    $('about').textContent = c.about || '';
    var groups = [];
    c.projects.forEach(function (p) {
      if (groups.indexOf(p.group) < 0) groups.push(p.group);
    });
    groups.forEach(function (g) {
      $('projects').appendChild(el('p', g, 'grp'));
      var ul = el('ul', '', 'projects');
      c.projects.filter(function (p) { return p.group === g; }).forEach(function (p) {
        var li = el('li'), h = el('h3');
        h.appendChild(link(p.title, 'progetto.html?p=' + encodeURIComponent(p.slug)));
        li.appendChild(h);
        li.appendChild(el('p', p.summary));
        if (p.tags && p.tags.length) li.appendChild(el('p', p.tags.join(', '), 'tags'));
        ul.appendChild(li);
      });
      $('projects').appendChild(ul);
    });
    renderLinks($('links'), c.links);
  }

  function detail(c) {
    var slug = new URLSearchParams(location.search).get('p');
    var p = c.projects.filter(function (x) { return x.slug === slug; })[0];
    if (!p) {
      $('p-title').textContent = 'Progetto non trovato';
      return;
    }
    D.title = p.title + ' · ' + c.name;
    $('p-title').textContent = p.title;
    $('p-meta').textContent = [p.group].concat(p.tags || []).join(', ');
    (p.body || []).forEach(function (t) { $('p-body').appendChild(el('p', t)); });
    renderLinks($('p-links'), p.links);
  }

  fetch('content.json')
    .then(function (r) { return r.json(); })
    .then(function (c) { if ($('projects')) home(c); else if ($('project')) detail(c); })
    .catch(function () {
      var box = $('about') || $('p-body');
      if (box) box.textContent = 'Impossibile caricare i contenuti (content.json).';
    });
})();
