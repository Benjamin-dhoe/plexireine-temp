(function () {
  // Language dropdown
  var toggle = document.querySelector('[data-lang-toggle]');
  var menu = document.querySelector('[data-lang-menu]');

  function openMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      var current = menu.querySelector('[aria-current="page"]') || menu.querySelector('a');
      current.focus();
    }
  }

  toggle.addEventListener('click', function () { openMenu(menu.hidden); });
  menu.addEventListener('keydown', function (e) {
    var items = Array.prototype.slice.call(menu.querySelectorAll('a'));
    var i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!menu.hidden && !e.target.closest('[data-lang-switch]')) openMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { openMenu(false); toggle.focus(); }
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
