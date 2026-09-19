const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealNodes = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealNodes.forEach((node) => observer.observe(node));
}

const contactForm = document.querySelector('[data-mailto-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || '';
    const organization = data.get('organization') || '';
    const service = data.get('service') || 'Research inquiry';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`Trellis Economics inquiry: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nOrganization: ${organization}\nArea of interest: ${service}\n\n${message}`
    );
    window.location.href = `mailto:mdohiul.islam@wmich.edu?subject=${subject}&body=${body}`;
  });
}

