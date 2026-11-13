import { setupMediaPortal } from './about-portal.js?v=soft-portal-edges';
import Lenis from './assets/vendor/lenis-1.3.25.mjs';
import { items } from './gallery-data.js?v=browser-camera-nov07';
import { setupEventStories } from './event-stories.js?v=soft-portal-edges';

const list = document.querySelector('.section-list');
const aboutPortal = document.querySelector('.about-portal');
const aboutTags = document.querySelector('.about-tags');
const workProjects = document.querySelector('.work-projects');
const artifactTags = document.querySelector('.artifact-tags');
const contactTags = document.querySelector('.contact-tags');
const intros = document.querySelectorAll('.section-intro');
const captionNumber = document.querySelector('.section-number');
const captionName = document.querySelector('.section-name');
const caption = captionName.closest('.section-caption');
const dialog = document.querySelector('.section-dialog');
const dialogTitle = dialog.querySelector('h2');
const dialogMedia = dialog.querySelector('.section-media');
const dialogProjectLink = dialog.querySelector('.dialog-project-link');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const eventsPortal = document.querySelector('.events-portal');
const updateAboutPlayback = setupMediaPortal(aboutPortal, reducedMotion);
const showEventStories = setupEventStories(eventsPortal, reducedMotion);
const labelAnimations = new WeakMap();
let smoothScroll;

function updateProjectLink(link, project) {
  link.hidden = !project;
  if (project) link.href = project;
}

function openSection(item) {
  dialogTitle.textContent = item.title;
  dialogMedia.src = item.src;
  updateProjectLink(dialogProjectLink, item.project);
  dialog.showModal();
  smoothScroll?.stop();
}

const rows = items.map((item, index) => {
  const row = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = item.title;
  if (item.title === 'Events' || item.title === 'Contact') {
    button.setAttribute('aria-controls', item.title === 'Events' ? eventsPortal.id : contactTags.id);
    button.addEventListener('click', () => scrollToSection(index));
  } else {
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', () => openSection(item));
  }
  row.append(button);
  list.append(row);
  return button;
});

const revealEasing = 'cubic-bezier(.22, 1, .36, 1)';

function highlight(button, current, animate) {
  const initialColor = getComputedStyle(button).color;
  labelAnimations.get(button)?.cancel();
  if (current) button.setAttribute('aria-current', 'true');
  else button.removeAttribute('aria-current');

  if (!animate || reducedMotion.matches) return;
  const targetColor = getComputedStyle(button).color;
  labelAnimations.set(button, button.animate(
    [{ color: initialColor }, { color: targetColor }],
    { duration: 520, easing: revealEasing }
  ));
}

let selected = -1;
let frame = 0;
let sectionAnimations = [];

function select(index) {
  if (index === selected) return;
  const isFirstSelection = selected === -1;
  const direction = index > selected ? 1 : -1;
  if (!isFirstSelection) highlight(rows[selected], false, true);
  highlight(rows[index], true, !isFirstSelection);
  selected = index;

  sectionAnimations.forEach(animation => animation.cancel());
  sectionAnimations = [];

  const item = items[index];
  aboutPortal.hidden = item.title !== 'About';
  aboutTags.hidden = aboutPortal.hidden;
  workProjects.hidden = item.title !== 'Work';
  artifactTags.hidden = item.title !== 'Artifacts';
  contactTags.hidden = item.title !== 'Contact';
  updateAboutPlayback();
  showEventStories(item.title === 'Events');
  let activeIntro;
  for (const intro of intros) {
    const isActive = intro.dataset.intro === item.title;
    intro.classList.toggle('is-active', isActive);
    if (isActive) activeIntro = intro;
  }
  captionNumber.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  captionName.textContent = item.title;

  if (isFirstSelection || reducedMotion.matches) return;
  const parts = [caption];
  if (activeIntro) parts.push(activeIntro);
  if (!aboutPortal.hidden) parts.push(aboutPortal);
  if (!eventsPortal.hidden) parts.push(eventsPortal);
  sectionAnimations = parts.map(part => part.animate(
    [{ opacity: 0, translate: `0 ${direction * 18}px` }, { opacity: 1, translate: '0 0' }],
    { duration: 680, easing: revealEasing }
  ));

  const tags = document.querySelectorAll('.section-tags:not([hidden]) > li');
  tags.forEach((tag, tagIndex) => {
    sectionAnimations.push(tag.animate(
      [{ opacity: 0, translate: `0 ${direction * 14}px` }, { opacity: 1, translate: '0 0' }],
      { duration: 580, delay: tagIndex * 40, easing: revealEasing, fill: 'backwards' }
    ));
  });
}

function sectionSpacing(height) {
  return (height - 40) / (rows.length - 1);
}

function scrollToSection(index) {
  const bounds = list.getBoundingClientRect();
  const distance = (index + .5) * sectionSpacing(bounds.height);
  const top = distance + Math.max(0, window.scrollY + bounds.top - window.innerHeight / 2 - 1);
  if (smoothScroll) smoothScroll.scrollTo(top, { duration: 1.15 });
  else window.scrollTo(0, top);
}

function updateSelection() {
  frame = 0;
  const bounds = list.getBoundingClientRect();
  // The demo evenly distributes 40 px scroll targets across the showcase.
  const targetSpacing = sectionSpacing(bounds.height);
  // Keep the activation line at or above the first target on the initial screen.
  const distance = Math.min(window.scrollY, window.innerHeight / 2 + 1 - bounds.top);
  const index = Math.max(0, Math.min(rows.length - 1, Math.floor(distance / targetSpacing)));

  select(index);
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateSelection);
}

function updateScrollMotion() {
  smoothScroll?.destroy();
  if (reducedMotion.matches) {
    rows.forEach(row => labelAnimations.get(row)?.cancel());
    sectionAnimations.forEach(animation => animation.cancel());
    sectionAnimations = [];
    smoothScroll = undefined;
    return;
  }

  smoothScroll = new Lenis({
    duration: 1.55,
    easing: progress => 1 - Math.pow(1 - progress, 4),
    wheelMultiplier: 0.72,
    autoRaf: true,
    anchors: true,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
  });
  if (dialog.open) smoothScroll?.stop();
}

updateScrollMotion();
reducedMotion.addEventListener('change', updateScrollMotion);

dialog.addEventListener('close', () => {
  if (dialog.open) return;
  dialogMedia.removeAttribute('src');
  smoothScroll?.start();
});
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
document.fonts.ready.then(scheduleUpdate);
updateSelection();
