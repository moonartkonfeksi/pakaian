const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link, .nav-contact');
const sections = document.querySelectorAll('main section[id]');
document.getElementById('year').textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Smooth section navigation with an active state that follows the visible frame.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));

// Make the product dropdown comfortable to use on touch screens.
const productTrigger = document.querySelector('.product-trigger');
productTrigger.addEventListener('click', event => {
  if (window.matchMedia('(max-width: 680px)').matches) {
    const dropdown = productTrigger.closest('.nav-dropdown');
    if (!dropdown.classList.contains('open')) {
      event.preventDefault();
      dropdown.classList.add('open');
    }
  }
});
