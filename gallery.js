import Lenis from './assets/vendor/lenis-1.3.25.mjs';
import { items } from './gallery-data.js?v=section-intros';

const list = document.querySelector('.section-list');
const intros = document.querySelectorAll('.section-intro');
const captionNumber = document.querySelector('.section-number');
const captionName = document.querySelector('.section-name');
const dialog = document.querySelector('.section-dialog');
const dialogTitle = dialog.querySelector('h2');
const dialogMedia = dialog.querySelector('.section-media');
const dialogProjectLink = dialog.querySelector('.dialog-project-link');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
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

const rows = items.map(item => {
  const row = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = item.title;
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => openSection(item));
  row.append(button);
  list.append(row);
  return button;
});

// Sample the demo's 350 ms spring with bounce 0.25.
const springDuration = 350;
const dampingRatio = 0.75;
const oscillationRatio = Math.sqrt(1 - dampingRatio ** 2);
const decay = Math.log(dampingRatio / (0.001 * oscillationRatio));
const frequency = decay * oscillationRatio / dampingRatio;
const spring = Array.from({ length: 36 }, (_, step) => {
  const time = step / 35;
  if (step === 35) return 1;
  return 1 - Math.exp(-decay * time) * (
    Math.cos(frequency * time) + dampingRatio / oscillationRatio * Math.sin(frequency * time)
  );
});

function highlight(button, current, animate) {
  const initialColor = getComputedStyle(button).color;
  labelAnimations.get(button)?.cancel();
  if (current) button.setAttribute('aria-current', 'true');
  else button.removeAttribute('aria-current');

  if (!animate || reducedMotion.matches) return;
  const targetColor = getComputedStyle(button).color;
  const from = initialColor.match(/[\d.]+/g).map(Number);
  const to = targetColor.match(/[\d.]+/g).map(Number);
  const keyframes = spring.map(progress => {
    // Match the demo's squared RGB interpolation, including the spring overshoot.
    const channels = from.map((value, channel) => {
      const mixed = value ** 2 + (to[channel] ** 2 - value ** 2) * progress;
      return Math.min(255, Math.round(Math.sqrt(Math.max(0, mixed))));
    });
    return { color: `rgb(${channels.join(', ')})` };
  });
  labelAnimations.set(button, button.animate(keyframes, springDuration));
}

let selected = -1;
let frame = 0;

function select(index) {
  if (index === selected) return;
  const isFirstSelection = selected === -1;
  if (!isFirstSelection) highlight(rows[selected], false, true);
  highlight(rows[index], true, !isFirstSelection);
  selected = index;

  const item = items[index];
  for (const intro of intros) {
    intro.classList.toggle('is-active', intro.dataset.intro === item.title);
  }
  captionNumber.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  captionName.textContent = item.title;
}

function updateSelection() {
  frame = 0;
  const bounds = list.parentElement.getBoundingClientRect();
  // The demo evenly distributes 40 px scroll targets across the showcase.
  const targetSpacing = (bounds.height - 40) / (rows.length - 1);
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
    smoothScroll = undefined;
    return;
  }

  smoothScroll = new Lenis({
    duration: 1.2,
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
