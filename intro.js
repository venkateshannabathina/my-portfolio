const clock = document.querySelector('.clock');
const time = document.querySelector('#live-datetime');
const main = document.querySelector('main');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
});
const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric',
});

function tick() {
  const now = new Date();
  time.dateTime = now.toISOString();
  time.textContent = `${timeFormat.format(now)} - ${dateFormat.format(now)}`.replace(/[\u00a0\u202f]/g, ' ');
  setTimeout(tick, 1000 - Date.now() % 1000);
}

function sizeDockedClock() {
  const fontSize = parseFloat(getComputedStyle(clock).fontSize);
  clock.style.setProperty('--clock-dock-scale', String(16 / fontSize));
}

tick();
sizeDockedClock();
window.addEventListener('resize', sizeDockedClock, {passive: true});

// Start the three-second hold after the reference font is ready.
await Promise.race([
  document.fonts.load('700 42px Satoshi'),
  new Promise(resolve => setTimeout(resolve, 1500)),
]).catch(() => {});

setTimeout(() => {
  document.body.dataset.introPhase = 'transition';
  document.body.classList.add('is-docked');
  setTimeout(() => {
    document.body.dataset.introPhase = 'complete';
    main.inert = false;
  }, reducedMotion.matches ? 250 : 1000);
}, 3000);
