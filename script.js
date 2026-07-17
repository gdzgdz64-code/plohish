const nav = document.querySelector('#siteNav');
const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
const toTop = document.querySelector('#toTop');
const coachModal = document.querySelector('#coachModal');
const coachModalImg = document.querySelector('#coachModalImg');
const coachModalRole = document.querySelector('#coachModalRole');
const coachModalName = document.querySelector('#coachModalName');
const coachModalRank = document.querySelector('#coachModalRank');
const coachModalText = document.querySelector('#coachModalText');
const coachModalQuote = document.querySelector('#coachModalQuote');

function syncScrollState() {
  const moved = window.scrollY > 24;
  nav?.classList.toggle('scrolled', moved);
  toTop?.classList.toggle('show', window.scrollY > 520);
}

window.addEventListener('scroll', syncScrollState, { passive: true });
syncScrollState();

menuButton?.addEventListener('click', () => {
  const opened = navLinks?.classList.toggle('open') ?? false;
  menuButton.classList.toggle('active', opened);
  menuButton.setAttribute('aria-expanded', String(opened));
  document.body.classList.toggle('menu-open', opened);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function openCoachModal(card) {
  if (!coachModal) return;
  const data = card.dataset;
  coachModalImg.src = data.coachImg || '';
  coachModalImg.alt = data.coachName || '';
  coachModalRole.textContent = data.coachRole || '';
  coachModalName.textContent = data.coachName || '';
  coachModalRank.textContent = data.coachRank || '';
  coachModalText.textContent = data.coachText || '';
  coachModalQuote.textContent = data.coachQuote || '';
  coachModal.classList.add('open');
  coachModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeCoachModal() {
  if (!coachModal) return;
  coachModal.classList.remove('open');
  coachModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.coach-card').forEach((card) => {
  card.addEventListener('click', () => openCoachModal(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCoachModal(card);
    }
  });
});

coachModal?.querySelectorAll('[data-modal-close]').forEach((button) => {
  button.addEventListener('click', closeCoachModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCoachModal();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document
  .querySelectorAll('.section-heading, .about-photo, .about-content, .training-card, .schedule-strip, .coach-card, .scoreboard, .gallery-row, .album-card, .contact-card, .contact-tile, .contact-note, .footer-main')
  .forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
