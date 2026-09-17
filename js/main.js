const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const form = document.querySelector('[data-demo-form]');
const formStatus = document.querySelector('[data-form-status]');

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Otvori meni');
  navigation?.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Otvori meni' : 'Zatvori meni');
  navigation.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-sticky', window.scrollY > 70);
}, { passive: true });

document.querySelectorAll('[data-accordion] article').forEach((item) => {
  const button = item.querySelector('button');
  button.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach((field) => {
      const invalid = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      field.classList.toggle('is-invalid', invalid);
      valid = valid && !invalid;
    });

    if (!valid) {
      formStatus.textContent = 'Proverite označena polja.';
      formStatus.style.color = '#b42318';
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    formStatus.textContent = 'Demo uspešan: forma je ispravna, ali podaci nisu poslati.';
    formStatus.style.color = '#176b39';
  });

  form.querySelectorAll('[required]').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('is-invalid'));
    field.addEventListener('change', () => field.classList.remove('is-invalid'));
  });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.service-card, .process-list li, .principles > div, .gallery-shot, .gallery-note');
  targets.forEach((element) => element.setAttribute('data-reveal', ''));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((element) => observer.observe(element));
}
