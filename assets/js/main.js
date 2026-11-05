/* LJP Records: small progressive enhancements. The site works without this file. */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  /* ---- Click-to-load Spotify players: nothing is requested from Spotify until a visitor asks for it ---- */
  document.querySelectorAll('.spotify-embed').forEach(function (box) {
    var id = (box.getAttribute('data-spotify-artist') || '').trim();
    if (!/^[A-Za-z0-9]{22}$/.test(id)) { box.hidden = true; return; }
    var btn = box.querySelector('.spotify-load');
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://open.spotify.com/embed/artist/' + id + '?utm_source=generator&theme=0';
      f.title = box.getAttribute('data-title') || 'Spotify player';
      f.width = '100%';
      f.height = '352';
      f.loading = 'lazy';
      f.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
      box.innerHTML = '';
      box.appendChild(f);
      f.focus();
    });
  });

  /* ---- Contact form (Web3Forms) ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var submit = form.querySelector('[type="submit"]');
    var say = function (msg, kind) {
      status.textContent = msg;
      status.className = 'form-status ' + (kind || '');
      status.focus();
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        var bad = form.querySelector(':invalid');
        say('Please fill in the required fields marked with *.', 'is-error');
        if (bad) bad.focus();
        return;
      }
      var key = form.querySelector('[name="access_key"]').value;
      if (!key || key === 'PASTE_KEY_HERE') {
        say('The form isn’t connected yet. Please email management@ljprecords.ca instead.', 'is-error');
        return;
      }
      var data = new FormData(form);
      if (!data.has('news_opt_in')) data.set('news_opt_in', 'No');
      submit.disabled = true;
      say('Sending…', '');
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j && res.j.success) {
            form.reset();
            form.classList.remove('was-validated');
            say('Thank you. Your message has been sent, and we’ll be in touch.', 'is-success');
          } else {
            say('Sorry, something went wrong (' + ((res.j && res.j.message) || 'unknown error') + '). Please try again or email management@ljprecords.ca.', 'is-error');
          }
        })
        .catch(function () {
          say('Sorry, the message couldn’t be sent. Please check your connection, or email management@ljprecords.ca.', 'is-error');
        })
        .then(function () { submit.disabled = false; });
    });
  }
})();
