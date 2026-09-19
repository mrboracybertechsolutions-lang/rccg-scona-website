// Photo lightbox for gallery tiles (a.gallery-item).
// Progressive enhancement: without JS (or <dialog> support) the tiles are
// plain links that open the full-size photo.
document.addEventListener('DOMContentLoaded', function () {
  var dialog = document.getElementById('photo-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('.lightbox-caption');

  document.querySelectorAll('a.gallery-item').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var thumb = link.querySelector('img');
      img.src = link.href;
      img.alt = thumb ? thumb.alt : '';
      caption.textContent = link.getAttribute('data-caption') || '';
      dialog.showModal();
    });
  });

  // Clicking the dimmed backdrop (which targets the dialog itself) or the
  // close button dismisses the viewer. Esc is handled natively.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('lightbox-close')) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {
    img.removeAttribute('src');
  });
});
