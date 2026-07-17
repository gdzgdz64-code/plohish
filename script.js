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
const coachModalGallery = document.querySelector('#coachModalGallery');
const coachModalPhone = document.querySelector('#coachModalPhone');
const coachModalGroup = document.querySelector('#coachModalGroup');
const photoViewer = document.querySelector('#photoViewer');
const photoViewerImg = document.querySelector('#photoViewerImg');
const photoViewerCaption = document.querySelector('#photoViewerCaption');

function openPhotoViewer(src, alt, caption) {
  if (!photoViewer || !photoViewerImg || !photoViewerCaption) return;
  photoViewerImg.src = src;
  photoViewerImg.alt = alt || caption || '';
  photoViewerCaption.textContent = caption || alt || '';
  photoViewer.classList.add('open');
  photoViewer.setAttribute('aria-hidden', 'false');
}

function closePhotoViewer() {
  if (!photoViewer || !photoViewerImg || !photoViewerCaption) return;
  photoViewer.classList.remove('open');
  photoViewer.setAttribute('aria-hidden', 'true');
  photoViewerImg.src = '';
  photoViewerCaption.textContent = '';
}

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
  coachModalQuote.textContent = data.coachQuote || '';
  if (coachModalPhone) {
    coachModalPhone.href = data.coachPhone || 'tel:+79513119411';
    coachModalPhone.textContent = data.coachPhoneText ? `Позвонить: ${data.coachPhoneText}` : 'Позвонить';
  }
  if (coachModalGroup) {
    coachModalGroup.href = data.coachGroup || 'https://vk.com/public186004438';
  }
  coachModalText.replaceChildren();
  coachModalGallery?.replaceChildren();
  (data.coachGallery || '').split(';;').filter(Boolean).forEach((item) => {
    const [src, caption, alt] = item.split('|');
    if (!src) return;
    const figure = document.createElement('figure');
    const button = document.createElement('button');
    const image = document.createElement('img');
    const label = document.createElement('figcaption');
    const cleanSrc = src.trim();
    const cleanCaption = (caption || '').trim();
    const cleanAlt = (alt || caption || data.coachName || '').trim();
    button.type = 'button';
    button.setAttribute('aria-label', `Увеличить фото: ${cleanCaption || cleanAlt}`);
    image.src = cleanSrc;
    image.alt = cleanAlt;
    label.textContent = cleanCaption;
    button.append(image);
    button.addEventListener('click', () => openPhotoViewer(cleanSrc, cleanAlt, cleanCaption));
    figure.append(button, label);
    coachModalGallery?.append(figure);
  });
  (data.coachText || '').split('||').filter(Boolean).forEach((text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text.trim();
    coachModalText.append(paragraph);
  });
  coachModal.classList.add('open');
  coachModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeCoachModal() {
  if (!coachModal) return;
  closePhotoViewer();
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

photoViewer?.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', closePhotoViewer);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && photoViewer?.classList.contains('open')) {
    closePhotoViewer();
    return;
  }
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
  .querySelectorAll('.section-heading, .about-photo, .about-content, .training-card, .schedule-strip, .coach-card, .first-visit-lead, .first-visit-card, .scoreboard, .gallery-row, .album-card, .contact-card, .contact-tile, .contact-note, .footer-main')
  .forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
