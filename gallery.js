import { items } from './gallery-data.js';

const gallery = document.querySelector('.gallery');
const scrollArea = document.querySelector('.gallery-scroll');
const list = document.querySelector('.gallery-list');
const mediaLayer = document.querySelector('.gallery-media');
const counter = document.querySelector('.gallery-counter');
const aboutName = document.querySelector('.about-name');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// The right-hand label keeps its width when the selected symbol replaces it.
const rows = items.map(item => {
  const row = document.createElement('li');
  if (item.accent) {
    row.classList.add('row-accent');
  }

  const right = document.createElement('span');
  right.className = 'row-right';
  right.lang = 'ja';
  right.setAttribute('aria-label', item.subtitle);
  const japanese = document.createElement('span');
  japanese.className = 'row-japanese';
  japanese.textContent = item.subtitle;
  const symbol = document.createElement('img');
  symbol.className = `row-symbol${item.accent ? ' row-eye' : ''}`;
  symbol.src = item.symbol;
  symbol.alt = '';
  symbol.setAttribute('aria-hidden', 'true');
  right.append(japanese, symbol);

  const left = document.createElement('span');
  left.className = 'row-title';
  left.textContent = item.title;
  row.append(right, left);
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
let active = 0;

function update() {
  frame = null;
  const range = scrollArea.scrollHeight - scrollArea.clientHeight;
  const progress = (range > 0 ? scrollArea.scrollTop / range : 0) * Math.max(items.length - 1, 1);
  const amplitude = reducedMotion.matches ? 0 : Math.min(94, width * .12);
  const selected = Math.max(0, Math.min(items.length - 1, Math.round(progress)));
  aboutName.dataset.visible = String(selected === 0);
  aboutName.setAttribute('aria-hidden', String(selected !== 0));

  rows.forEach((row, index) => {
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

  if (selected !== active) {
    active = selected;
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  }
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
