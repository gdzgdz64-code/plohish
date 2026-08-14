const nav = document.querySelector('#siteNav');
const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
const toTop = document.querySelector('#toTop');

const coachModal = document.querySelector('#coachModal');
const coachModalRole = document.querySelector('#coachModalRole');
const coachModalName = document.querySelector('#coachModalName');
const coachModalTagline = document.querySelector('#coachModalTagline');
const coachModalIntro = document.querySelector('#coachModalIntro');
const coachModalStats = document.querySelector('#coachModalStats');
const coachModalActivity = document.querySelector('#coachModalActivity');
const coachModalActivitySection = document.querySelector('#coachModalActivitySection');
const coachModalAchievements = document.querySelector('#coachModalAchievements');
const coachModalCombat = document.querySelector('#coachModalCombat');
const coachModalCombatSection = document.querySelector('#coachModalCombatSection');
const coachModalText = document.querySelector('#coachModalText');
const coachModalQuote = document.querySelector('#coachModalQuote');
const coachModalQuoteAuthor = document.querySelector('#coachModalQuoteAuthor');
const coachModalStoryPreview = document.querySelector('#coachModalStoryPreview');
const coachModalStoryToggle = document.querySelector('#coachModalStoryToggle');
const coachModalGallery = document.querySelector('#coachModalGallery');
const coachModalStudents = document.querySelector('#coachModalStudents');
const coachModalStudentsSection = document.querySelector('#coachModalStudentsSection');
const coachModalPhone = document.querySelector('#coachModalPhone');
const coachModalGroup = document.querySelector('#coachModalGroup');

const photoViewer = document.querySelector('#photoViewer');
const photoViewerImg = document.querySelector('#photoViewerImg');
const photoViewerCaption = document.querySelector('#photoViewerCaption');

let coachModalHistoryActive = false;
let lastFocusedElement = null;
let lastPhotoViewerFocus = null;

const trainers = [
  {
    id: 'polina',
    name: 'Полина Александра Юрьевна',
    position: 'Мастер спорта России',
    image: 'media/alek.webp',
    tagline: 'ТРЕНЕР · СПОРТСМЕН · НАСТАВНИК',
    intro: 'Мастер спорта России, 2 дан и многократная чемпионка международных и всероссийских соревнований.',
    stats: [['МС', 'Россия', 'Мастер спорта России'], ['2 дан', 'черный пояс', 'Второй мастерский уровень чёрного пояса'], ['17+', 'лет в каратэ'], ['9+', 'лет тренерского стажа']],
    activity: ['Профессиональный тренер по всестилевому и WKC каратэ', 'Тренерский стаж — более 9 лет'],
    achievements: [
      ['БРОНЗА', 'Чемпионат мира', '3-х кратная чемпионка мира'],
      ['ЗОЛОТО', 'Чемпионат России', '3-х кратная чемпионка России'],
      ['СЕРЕБРО', 'Кубок России', 'Серебряный призер'],
      ['ПРИЗЁР', 'Международные старты', 'Многократный победитель и призер']
    ],
    combat: [],
    students: [
      'Чемпион России',
      'Победители и призеры первенства и фестиваля ЦФО',
      'Победители и призеры всероссийских соревнований',
      'Победители и призеры межрегиональных и областных соревнований по каратэ'
    ],
    quote: 'В спорте хочется постоянно доказывать себе, что способна на большее и покорять новые вершины.',
    quoteAuthor: 'Полина Александра Юрьевна',
    story: '10 лет назад мой брат начал посещать секцию каратэ, и мне тоже захотелось попробовать. С самой первой тренировки у меня загорелись глаза. И они горят до сих пор.||Самым значимым событием в своей спортивной карьере я считаю Первенство России в 2016 году. Это была одна из сложнейших побед, но я была удовлетворена своей работой на 100%. Поддержка близких и наставления тренера помогли мне настроиться, за что я им очень благодарна.||Ничего более, чем каратэ, не дает мне такого рвения и азарта. В спорте хочется постоянно доказывать себе, что способна на большее и покорять новые вершины.||А юным спортсменам хотелось бы пожелать быть трудолюбивыми и упорными в тренировках!',
    gallery: [
      ['media/alek.webp', 'Портрет', 'Полина Александра Юрьевна'],
      ['media/alek_s_uchenikami.webp', 'С учениками клуба', 'Тренер и ученики клуба'],
      ['media/blagodarnosti.webp', 'Спортивный путь', 'Спортивные моменты клуба'],
      ['media/blagodarnosti_prosto.webp', 'Награждение', 'Награждение клуба'],
      ['media/commanda.webp', 'Команда', 'Команда Федерации каратэ WKC']
    ]
  },
  {
    id: 'plohikh',
    name: 'Плохих Дмитрий Юрьевич',
    position: 'Президент Федерации',
    image: 'media/Dim.webp',
    tagline: 'ТРЕНЕР · СПОРТСМЕН · НАСТАВНИК',
    intro: 'Профессиональный тренер по всестилевому и WKC каратэ, мастер спорта и обладатель 2 дана.',
    stats: [['МС', 'всестилевое каратэ', 'Мастер спорта по всестилевому каратэ'], ['2 дан', 'черный пояс', 'Второй мастерский уровень чёрного пояса'], ['7+', 'лет тренерского стажа'], ['WKC', 'всестилевое каратэ', 'World Karate Confederation · международное направление спортивного каратэ']],
    activity: ['Тренер-преподаватель', 'Тренер по всестилевому и WKC каратэ', 'Тренерский стаж — 7+ лет'],
    achievements: [
      ['БРОНЗА', 'Чемпионат мира', 'Бронзовый призёр Чемпионата Мира'],
      ['ЗОЛОТО', 'Чемпионат России', 'Победитель · командные соревнования'],
      ['СЕРЕБРО', 'Чемпионат России', 'Серебряный призёр'],
      ['БРОНЗА', 'Чемпионат России', 'Бронзовый призёр'],
      ['СЕРЕБРО', 'Кубок России', 'Серебряный призёр'],
      ['ПОБЕДИТЕЛЬ', 'Всероссийские турниры', 'Победитель всероссийских турниров']
    ],
    combat: [
      ['ЗОЛОТО', 'Панкратион', 'Чемпион СНГ по панкратиону'],
      ['ПОБЕДИТЕЛЬ', 'MMA', 'Победитель турниров по MMA · смешанные единоборства']
    ],
    students: ['Победитель Первенства России по всестилевому каратэ', 'Призёры всероссийских и областных соревнований'],
    quote: 'Главное в единоборствах — не победа. Главное — не сойти с пути и остаться на нем до конца.',
    quoteAuthor: 'Дмитрий Юрьевич Плохих',
    story: 'В каратэ я пришел в возрасте 8 лет. Я сразу понял, что это — мое! Я ждал тренировок весь день, бежал в зал сразу после школы, иногда даже не доделывая уроки.||Конечно, были и сложные переломные моменты. В подростковом возрасте я попал в «плохую» компанию, в которой спортом никто не занимался. Вернуться к прежним занятиям мне помогла моя мама, за что я ей очень благодарен. У мамы всегда была мечта воспитать во мне мужчину, воина и настоящего спортсмена.||Одним из самых запоминающихся моментов моей спортивной жизни были областные соревнования, когда я в возрасте 16 лет выступил в категории мужчин, занял 1 место и выполнил норматив кандидата в мастера спорта.||Тогда я впервые почувствовал внутреннюю силу, уверенность и собранность, которые помогают побеждать не только на татами, но и в жизни.||Вместе со спортом я обрел свой жизненный путь, по которому должен идти. И постараюсь никогда с него не сойти.||Каратэ меня воспитало, выстроило мои жизненные ориентиры, помогло понять свое предназначение.||Я желаю всем спортсменам терпения. Помните, что главное в единоборствах — не победа. Главное — не сойти с пути, остаться на нем до конца.||Травмы, огорчения, эмоциональное выгорание — все это может возникнуть, но не должно остановить вас.||Обретите мечту и следуйте за ней до конца!',
    gallery: [
      ['media/Dim.webp', 'Портрет', 'Плохих Дмитрий Юрьевич'],
      ['media/dim_s_ushenikami.webp', 'С учениками', 'Дмитрий Юрьевич с учениками клуба'],
      ['media/commanda.webp', 'Команда', 'Команда клуба'],
      ['media/vmeste.webp', 'Тренировка', 'Команда Федерации каратэ WKC'],
      ['media/GTOsMedved.webp', 'Спортивный момент', 'Спортивное мероприятие клуба']
    ]
  }
];

function trackGoal(goal) {
  if (typeof window.ym === 'function') {
    window.ym(110827456, 'reachGoal', goal);
  }
}

function openPhotoViewer(src, alt, caption) {
  if (!photoViewer || !photoViewerImg || !photoViewerCaption) return;
  
  lastPhotoViewerFocus = document.activeElement;
  photoViewerImg.src = src;
  photoViewerImg.alt = alt || caption || '';
  photoViewerCaption.textContent = caption || alt || '';
  
  photoViewer.classList.add('open');
  photoViewer.setAttribute('aria-hidden', 'false');
  photoViewer.inert = false;
  if (!coachModal?.classList.contains('open')) document.body.classList.add('modal-open');

  const closeBtn = photoViewer.querySelector('.photo-viewer__close');
  closeBtn?.focus();
}

function closePhotoViewer() {
  if (!photoViewer || !photoViewerImg || !photoViewerCaption) return;
  
  photoViewer.classList.remove('open');
  photoViewer.setAttribute('aria-hidden', 'true');
  photoViewer.inert = true;
  photoViewerImg.src = '';
  photoViewerCaption.textContent = '';
  if (!coachModal?.classList.contains('open')) document.body.classList.remove('modal-open');

  if (lastPhotoViewerFocus && typeof lastPhotoViewerFocus.focus === 'function') {
    lastPhotoViewerFocus.focus({ preventScroll: true });
  }
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
  menuButton.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('menu-open', opened);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('menu-open');
  });
});

function scrollToSection(target, updateUrl = true) {
  if (!target) return;
  const navOffset = (nav?.getBoundingClientRect().height || 0) + 28;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navOffset);

  if (updateUrl) {
    window.history.pushState({}, '', `#${target.id}`);
  }

  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const selector = link.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    scrollToSection(target);
  });
});

if (window.location.hash) {
  window.addEventListener('load', () => {
    const target = document.querySelector(window.location.hash);
    if (target) window.setTimeout(() => scrollToSection(target, false), 0);
  }, { once: true });
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !navLinks?.classList.contains('open')) return;
  navLinks.classList.remove('open');
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('menu-open');
  menuButton?.focus();
});

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function openCoachModal(card) {
  if (!coachModal) return;
  
  lastFocusedElement = document.activeElement;
  const data = trainers.find((trainer) => trainer.id === card.dataset.coachId);
  if (!data) return;

  if (coachModalRole) coachModalRole.textContent = data.position;
  if (coachModalName) coachModalName.textContent = data.name;
  if (coachModalTagline) coachModalTagline.textContent = data.tagline || '';
  if (coachModalIntro) coachModalIntro.textContent = data.intro || '';

  const renderItems = (container, items, className, renderItem) => {
    if (!container) return;
    container.replaceChildren();
    items.forEach((item, index) => {
      const element = renderItem(item, index);
      element.classList.add(className);
      container.append(element);
    });
  };

  renderItems(coachModalStats, data.stats || [], 'coach-modal__stat', ([value, label, tooltip]) => {
    const element = document.createElement('div');
    element.tabIndex = tooltip ? 0 : -1;
    if (tooltip) element.dataset.tooltip = tooltip;
    element.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    return element;
  });

  if (coachModalActivity) {
    coachModalActivity.replaceChildren();
    (data.activity || []).forEach((item) => {
      const element = document.createElement('p');
      element.textContent = item;
      coachModalActivity.append(element);
    });
  }
  if (coachModalActivitySection) coachModalActivitySection.hidden = !(data.activity || []).length;

  const achievementCard = ([medal, title, text], index) => {
    const element = document.createElement('article');
    element.innerHTML = `<span class="coach-modal__item-number">${String(index + 1).padStart(2, '0')}</span><span class="coach-modal__medal">${medal}</span><b>${title}</b><p>${text}</p>`;
    return element;
  };
  renderItems(coachModalAchievements, data.achievements || [], 'coach-modal__achievement', achievementCard);
  renderItems(coachModalCombat, data.combat || [], 'coach-modal__achievement', achievementCard);
  if (coachModalCombatSection) coachModalCombatSection.hidden = !(data.combat || []).length;

  if (coachModalPhone) {
    coachModalPhone.href = 'tel:+79513119411';
    coachModalPhone.textContent = 'Позвонить: +7 951 311-94-11';
  }
  
  if (coachModalGroup) {
    coachModalGroup.href = 'https://vk.com/public186004438';
  }

  if (coachModalText) {
    coachModalText.replaceChildren();
    data.story.split('||').filter(Boolean).forEach((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text.trim();
      coachModalText.append(paragraph);
    });
    coachModalText.hidden = true;
  }
  if (coachModalStoryPreview) {
    const preview = data.story.split('||').filter(Boolean).slice(0, 2).join(' ');
    coachModalStoryPreview.textContent = `${preview.slice(0, 230)}${preview.length > 230 ? '…' : ''}`;
  }
  if (coachModalStoryToggle) {
    coachModalStoryToggle.textContent = 'Читать историю +';
    coachModalStoryToggle.setAttribute('aria-expanded', 'false');
    coachModalStoryToggle.onclick = () => {
      const expanded = coachModalStoryToggle.getAttribute('aria-expanded') === 'true';
      coachModalStoryToggle.setAttribute('aria-expanded', String(!expanded));
      coachModalStoryToggle.textContent = expanded ? 'Читать историю +' : 'Свернуть историю −';
      if (coachModalText) coachModalText.hidden = expanded;
    };
  }
  if (coachModalQuote) coachModalQuote.textContent = data.quote || '';
  if (coachModalQuoteAuthor) coachModalQuoteAuthor.textContent = data.quoteAuthor || data.name;
  if (coachModalGallery) coachModalGallery.replaceChildren();

  const gallery = data.gallery?.length
  ? data.gallery
  : data.image
    ? [[data.image, 'Портрет', data.name]]
    : [[null, 'Фото тренера', data.name]];
  gallery.forEach(([src, caption, alt]) => {
    const figure = document.createElement('figure');
    if (!src) {
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = 'Фото тренера можно заменить позже';
      figure.append(placeholder);
      const label = document.createElement('figcaption');
      label.textContent = caption || '';
      figure.append(label);
      coachModalGallery?.append(figure);
      return;
    }

    const button = document.createElement('button');
    const image = document.createElement('img');
    const label = document.createElement('figcaption');

    const cleanSrc = src.trim();
    const cleanCaption = (caption || '').trim();
    const cleanAlt = (alt || caption || data.name || '').trim();

    button.type = 'button';
    button.setAttribute('aria-label', `Увеличить фото: ${cleanCaption || cleanAlt}`);
    
    image.src = cleanSrc;
    image.alt = cleanAlt;
    image.addEventListener('error', () => {
      image.replaceWith(Object.assign(document.createElement('div'), {
        className: 'image-placeholder',
        textContent: 'Фото тренера можно заменить позже'
      }));
    }, { once: true });
    label.textContent = cleanCaption;

    button.append(image);
    button.addEventListener('click', () => openPhotoViewer(cleanSrc, cleanAlt, cleanCaption));
    
    figure.append(button, label);
    coachModalGallery?.append(figure);
  });

  if (coachModalStudents) {
    coachModalStudents.replaceChildren();
    (data.students || []).forEach((student, index) => {
      const item = document.createElement('article');
      item.innerHTML = `<strong>${String(index + 1).padStart(2, '0')}</strong><span>${student}</span>`;
      coachModalStudents.append(item);
    });
  }
  if (coachModalStudentsSection) coachModalStudentsSection.hidden = !(data.students || []).length;

  coachModal.classList.add('open');
  coachModal.setAttribute('aria-hidden', 'false');
  coachModal.inert = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => coachModal.classList.add('content-ready'));

  const closeBtn = coachModal.querySelector('.coach-modal__close') || coachModal.querySelector('[data-modal-close]');
  closeBtn?.focus();

  trackGoal('coach_open');

  // Keep the current document entry so closing never restores an old scroll position.
  window.history.replaceState({ ...(window.history.state || {}), coachModalOpen: true }, '', window.location.href);
  coachModalHistoryActive = false;
}

function closeCoachModal({ fromHistory = false } = {}) {
  if (!coachModal || !coachModal.classList.contains('open')) return;

  closePhotoViewer();
  coachModal.classList.remove('open');
  coachModal.setAttribute('aria-hidden', 'true');
  coachModal.inert = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus({ preventScroll: true });
  }


  coachModalHistoryActive = false;
}

document.querySelectorAll('.coach-card').forEach((card) => {
  const photo = card.querySelector('.coach-photo');
  photo?.addEventListener('error', () => photo.parentElement?.classList.add('is-placeholder'), { once: true });
  card.addEventListener('click', () => openCoachModal(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCoachModal(card);
    }
  });
});

const benefits = [
  {
    number: '01',
    label: 'Характер',
    title: 'Становиться спокойнее и увереннее',
    text: 'Дисциплина, ответственность и спокойствие перед сложным заданием.',
    detail: 'Ребёнок учится доводить дело до конца, слушать тренера и спокойно относиться к ошибкам. Постепенно дисциплина становится привычкой, которая помогает и в зале, и за его пределами.',
    image: 'media/PEXNQVzJujCZxvyy72DrzmYZqDEWD3tbYF_Nj1YVGRoDA6ZVbWMcL9wWPFue3cC-LiUNFv7NhUD2RmuqYrBRrXmD.webp',
    alt: 'Тренировка в Федерации каратэ WKC Курской области'
  },
  {
    number: '02',
    label: 'Общение',
    title: 'Учиться быть частью команды',
    text: 'Уважение к партнёру, работа в паре и место в команде.',
    detail: 'На тренировках ребёнок учится взаимодействовать с другими, поддерживать партнёра и быть частью команды. Совместная работа помогает уважать границы, принимать помощь и самому быть надёжным.',
    image: 'media/commanda.webp',
    alt: 'Команда Федерации каратэ WKC Курской области'
  },
  {
    number: '03',
    label: 'Спорт',
    title: 'Расти через практику',
    text: 'Техника, цели, аттестации и соревнования — по готовности.',
    detail: 'Ребёнок постепенно понимает, как тренировки превращаются в результат. Каждое занятие добавляет немного точности, выносливости и уверенности перед следующей целью.',
    image: 'media/IMG_6311.webp',
    alt: 'Спортивная тренировка в клубе'
  },
  {
    number: '04',
    label: 'Тело',
    title: 'Двигаться увереннее',
    text: 'Координация, выносливость и контроль движения складываются из регулярных упражнений.',
    detail: 'Тело становится собраннее, а движение — точнее и увереннее. Регулярные упражнения развивают координацию, помогают лучше чувствовать баланс и справляться с нагрузкой в своём темпе.',
    image: 'media/nastovlenie.webp',
    alt: 'Детали тренировки в Федерации каратэ WKC Курской области'
  }
];

const benefitsSlider = document.querySelector('#benefitsSlider');
const benefitImage = document.querySelector('#benefitImage');
const benefitNumber = document.querySelector('#benefitNumber');
const benefitLabel = document.querySelector('#benefitLabel');
const benefitTitle = document.querySelector('#benefitTitle');
const benefitText = document.querySelector('#benefitText');
const benefitDetail = document.querySelector('#benefitDetail');
const benefitTabs = [...document.querySelectorAll('.benefit-tab')];
let activeBenefit = 0;
let benefitTimer = null;
let benefitTouchStart = 0;

function switchBenefit(index, { immediate = false } = {}) {
  const nextIndex = (index + benefits.length) % benefits.length;
  const data = benefits[nextIndex];
  if (!data || !benefitImage || !benefitTitle) return;

  const update = () => {
    benefitImage.src = data.image;
    benefitImage.alt = data.alt;
    if (benefitNumber) benefitNumber.textContent = data.number;
    if (benefitLabel) benefitLabel.textContent = data.label;
    benefitTitle.textContent = data.title;
    if (benefitText) benefitText.textContent = data.text;
    if (benefitDetail) benefitDetail.textContent = data.detail;
    benefitTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === nextIndex;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    activeBenefit = nextIndex;
    benefitsSlider?.classList.add('benefit-content-ready');
  };

  if (immediate || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }

  benefitsSlider?.classList.remove('benefit-content-ready');
  window.setTimeout(update, 180);
}

function restartBenefitTimer() {
  if (benefitTimer) window.clearInterval(benefitTimer);
  benefitTimer = window.setInterval(() => switchBenefit(activeBenefit + 1), 9000);
}

benefitTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    switchBenefit(index);
    restartBenefitTimer();
  });
});

benefitsSlider?.addEventListener('mouseenter', () => benefitTimer && window.clearInterval(benefitTimer));
benefitsSlider?.addEventListener('mouseleave', restartBenefitTimer);
benefitsSlider?.addEventListener('touchstart', (event) => { benefitTouchStart = event.changedTouches[0].clientX; }, { passive: true });
benefitsSlider?.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - benefitTouchStart;
  if (Math.abs(distance) < 45) return;
  switchBenefit(activeBenefit + (distance < 0 ? 1 : -1));
  restartBenefitTimer();
}, { passive: true });
switchBenefit(0, { immediate: true });
restartBenefitTimer();

// Общий просмотр содержательных фотографий страницы. Фотографии внутри
// модалки тренера остаются в её собственной gallery/photo-viewer логике.
document.querySelectorAll('.hero-photo img, .about-photo img, .benefits-visual img, .karate-story__media img, .album-card img, .story-step__media img').forEach((image) => {
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Открыть фото: ${image.alt || 'увеличить'}`);
  const show = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openPhotoViewer(image.currentSrc || image.src, image.alt, image.alt);
  };
  image.addEventListener('click', show);
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') show(event);
  });
});

// Закрытие при клике на крестик или оверлей
coachModal?.addEventListener('click', (event) => {
  if (event.target.closest('[data-modal-close]') || event.target === coachModal) {
    closeCoachModal();
  }
});

photoViewer?.addEventListener('click', (event) => {
  if (event.target.closest('[data-modal-close]') || event.target.tagName === 'BUTTON' || event.target === photoViewer) {
    closePhotoViewer();
  }
});

// Управление клавиатурой (Accessibility / Trap focus)
document.addEventListener('keydown', (event) => {
  const isCoachOpen = coachModal?.classList.contains('open');
  const isPhotoOpen = photoViewer?.classList.contains('open');

  if (event.key === 'Escape') {
    if (isPhotoOpen) {
      closePhotoViewer();
      return;
    }
    if (isCoachOpen) {
      closeCoachModal();
      return;
    }
  }

  if (event.key === 'Tab') {
    const activeModal = isPhotoOpen ? photoViewer : (isCoachOpen ? coachModal : null);
    if (!activeModal) return;

    const focusable = activeModal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

window.addEventListener('popstate', () => {
  if (coachModal?.classList.contains('open')) {
    closeCoachModal({ fromHistory: true });
  }
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => trackGoal('phone_click'));
});

document.querySelectorAll('a[href*="vk."]').forEach((link) => {
  link.addEventListener('click', () => trackGoal('vk_click'));
});
// Расчет ширины скроллбара для предотвращения дергания экрана при открытии модалок
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.01, rootMargin: '0px 0px -8% 0px' });

document
  .querySelectorAll('.section-heading, .about-photo, .about-content, .story-intro, .story-step, .training-card, .schedule-strip, .coach-card, .first-visit-card, .first-visit-cta, .growth-feature, .growth-rail article, .karate-story__media, .karate-story__copy, .results-hero-card, .scoreboard, .results-notes, .trust-item, .trust-quote, .gallery-row, .album-card, .faq-list, .contact-card, .contact-tile, .contact-note, .footer-main')
  .forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', element.classList.contains('story-step') ? `${index * 70}ms` : '0ms');
    observer.observe(element);
  });

// Direct hash loads and fast jumps still reveal content that is already in view.
requestAnimationFrame(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight * .94) element.classList.add('visible');
  });
});

// Progressive enhancement: GSAP adds subtle image scale and section timing,
// while the IntersectionObserver above keeps the page functional offline.
if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.hero-photo img, .about-photo img, .album-card img').forEach((image) => {
    gsap.fromTo(image,
      { scale: 1.08 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: image, start: 'top 90%', end: 'bottom 10%', scrub: 1.2 } }
    );
  });

  gsap.utils.toArray('.about-photo img, .growth-feature img, .karate-story__media img').forEach((image) => {
    gsap.fromTo(image,
      { clipPath: 'inset(0 12% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: image, start: 'top 82%' } }
    );
  });

  gsap.to('.story-line', { '--story-progress': '100%', ease: 'none', scrollTrigger: { trigger: '.story-line', start: 'top 76%', end: 'bottom 68%', scrub: 1 } });
  gsap.utils.toArray('.hero-copy > *, .hero-stats .hero-stat').forEach((element, index) => {
    gsap.from(element, { y: 24, opacity: 0, duration: .8, delay: index * .07, ease: 'power3.out' });
  });

  gsap.utils.toArray('.results-hero-card > span').forEach((number) => {
    const target = Number(number.textContent.trim()) || 0;
    const counter = { value: target };
    ScrollTrigger.create({
      trigger: number,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        counter.value = 0;
        gsap.to(counter, {
          value: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => { number.textContent = String(Math.round(counter.value)); }
        });
      }
    });
  });
}
