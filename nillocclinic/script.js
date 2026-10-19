(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('#year').textContent = new Date().getFullYear();

  // Demo-only interaction: connect this form to a real booking API or form service.
  const form = document.querySelector('#appointment-form');
  const note = document.querySelector('#form-note');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    note.textContent = `Thanks${name ? `, ${name}` : ''}! This demo form is working locally, but it is not yet connected to a clinic booking system.`;
    note.classList.add('form-success');
  });

  // Subtle reveal-on-scroll effect; content remains visible when reduced motion is enabled.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.about-visual, .about-copy, .service-card, .appointment > *');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealItems.forEach(item => item.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  }
})();
