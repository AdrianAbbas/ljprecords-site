// Click-to-load Spotify players: nothing is requested from Spotify until a visitor asks for it.
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
