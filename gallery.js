import { items } from './gallery-data.js?v=scroll-sync';

const list = document.querySelector('.section-list');
const preview = document.querySelector('.section-preview');
const previewButton = preview.querySelector('.preview-button');
const symbol = preview.querySelector('img');
const captionNumber = preview.querySelector('.section-number');
const captionName = preview.querySelector('.section-name');
const projectLink = preview.querySelector('.project-link');
const dialog = document.querySelector('.section-dialog');
const dialogTitle = dialog.querySelector('h2');
const dialogMedia = dialog.querySelector('.section-media');
const dialogProjectLink = dialog.querySelector('.dialog-project-link');

function updateProjectLink(link, project) {
  link.hidden = !project;
  if (project) link.href = project;
}

function openSection(item) {
  dialogTitle.textContent = item.title;
  dialogMedia.src = item.src;
  updateProjectLink(dialogProjectLink, item.project);
  dialog.showModal();
}

const rows = items.map(item => {
  const row = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = item.title;
  button.setAttribute('aria-haspopup', 'dialog');
  if (item.accent) row.style.setProperty('--active-color', item.accent);
  button.addEventListener('click', () => openSection(item));
  row.append(button);
  list.append(row);
  return button;
});

let selected = -1;
let frame = 0;

function select(index) {
  if (index === selected) return;
  rows[selected]?.removeAttribute('aria-current');
  selected = index;
  rows[index].setAttribute('aria-current', 'true');

  const item = items[index];
  symbol.src = item.symbol;
  preview.dataset.accent = String(Boolean(item.accent));
  captionNumber.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  captionName.textContent = item.title;
  previewButton.setAttribute('aria-label', `View ${item.title}`);
  updateProjectLink(projectLink, item.project);
}

function updateSelection() {
  frame = 0;
  const first = rows[0].getBoundingClientRect();
  const firstCenter = window.scrollY + first.top + first.height / 2;
  const anchor = Math.min(window.innerHeight / 2, firstCenter);
  let index = 0;
  let previous = first;

  for (let i = 1; i < rows.length; i++) {
    const next = rows[i].getBoundingClientRect();
    if (anchor < (previous.bottom + next.top) / 2) break;
    index = i;
    previous = next;
  }

  select(index);
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateSelection);
}

previewButton.addEventListener('click', () => openSection(items[selected]));
dialog.addEventListener('close', () => dialogMedia.removeAttribute('src'));
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
document.fonts.ready.then(scheduleUpdate);
updateSelection();
