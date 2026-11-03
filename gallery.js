import { items } from './gallery-data.js';

const gallery = document.querySelector('.gallery');
const scrollArea = document.querySelector('.gallery-scroll');
const list = document.querySelector('.gallery-list');
const mediaLayer = document.querySelector('.gallery-media');
const faceButton = document.querySelector('.face-button');
const clock = document.querySelector('.clock');
const aboutName = document.querySelector('.about-name');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const rows = items.map(item => {
  const row = document.createElement('li');
  if (item.accent) {
    row.classList.add('row-accent');
  }

  const symbol = document.createElement('img');
  symbol.className = `row-symbol${item.accent ? ' row-eye' : ''}`;
  symbol.src = item.symbol;
  symbol.alt = '';
  symbol.setAttribute('aria-hidden', 'true');

  const left = document.createElement('span');
  left.className = 'row-title';
  left.textContent = item.title;
  row.append(left, symbol);
  list.append(row);
  return row;
});

const media = items.map(item => {
  const element = document.createElement(item.kind);
  element.src = item.src;
  if (item.kind === 'video') {
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = 'metadata';
  } else {
    element.alt = '';
    element.loading = 'lazy';
  }
  mediaLayer.append(element);
  return element;
});

let width = gallery.clientWidth || 1200;
let visible = true;
let frame = null;

function update() {
  frame = null;
  const height = scrollArea.clientHeight;
  const travel = Math.max(0, height / 2 - mediaLayer.lastElementChild.offsetHeight / 2 - 64);
  const scrollDistance = travel * 1.5;
  gallery.style.setProperty('--star-travel', `${scrollDistance}px`);
  const range = scrollArea.scrollHeight - height - scrollDistance;
  const extraScroll = Math.max(0, Math.min(scrollDistance, scrollArea.scrollTop - range));
  const progressIntoStar = scrollDistance > 0 ? extraScroll / scrollDistance : 0;
  const reveal = reducedMotion.matches
    ? Number(progressIntoStar >= .5)
    : progressIntoStar ** 2 * (3 - 2 * progressIntoStar);
  const lift = travel * reveal;
  gallery.style.setProperty('--star-lift', `${lift}px`);
  gallery.style.setProperty('--star-row-offset', `${extraScroll - lift}px`);
  gallery.style.setProperty('--star-reveal', `${reveal * 100}%`);
  const wipeTop = height * (1 - reveal);
  document.body.classList.toggle('star-light', wipeTop < clock.getBoundingClientRect().bottom);
  const progress = (range > 0 ? Math.min(1, scrollArea.scrollTop / range) : 0) * Math.max(items.length - 1, 1);
  const amplitude = reducedMotion.matches ? 0 : Math.min(94, width * .12);
  const selected = Math.max(0, Math.min(items.length - 1, Math.round(progress)));
  faceButton.hidden = items[selected].title !== 'Artifacts';
  aboutName.dataset.visible = String(selected === 0);
  aboutName.setAttribute('aria-hidden', String(selected !== 0));

  const galleryTop = gallery.getBoundingClientRect().top;
  rows.forEach((row, index) => {
    const rowBottom = row.getBoundingClientRect().bottom - galleryTop;
    row.classList.toggle('row-devoured', progressIntoStar > 0 && rowBottom >= wipeTop && !items[index].accent);
    const distance = index - progress;
    row.style.paddingInline = `${(Math.sin(distance * Math.PI / 5) + 1) * amplitude}px`;
    const isSelected = index === selected;
    media[index].style.opacity = isSelected ? '1' : '0';
    media[index].style.visibility = isSelected ? 'visible' : 'hidden';
    row.dataset.selected = String(isSelected);
    if (media[index] instanceof HTMLVideoElement) {
      if (!reducedMotion.matches && isSelected && visible) media[index].play().catch(() => {});
      else media[index].pause();
    }
  });
}

function scheduleUpdate() {
  if (frame === null && visible) frame = requestAnimationFrame(update);
}
new ResizeObserver(([entry]) => {
  width = entry.contentRect.width;
  scheduleUpdate();
}).observe(gallery);
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  if (!visible) media.forEach(element => { if (element instanceof HTMLVideoElement) element.pause(); });
}, {threshold:0}).observe(gallery);
scrollArea.addEventListener('scroll', scheduleUpdate, {passive:true});
scheduleUpdate();
