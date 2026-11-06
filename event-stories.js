const stories = [
  { file: 'deepmind-01', title: 'Google DeepMind Hackathon', summary: 'Bangalore · July 2026', alt: 'Two attendees in front of the blue hackathon sign', wide: true },
  { file: 'deepmind-02', title: 'Google DeepMind Hackathon', summary: 'Bangalore · July 2026', alt: 'Two attendees giving thumbs up in front of the stage', wide: true, position: '56% center' },
  { file: 'cinema', title: 'Cinema', summary: 'A night at the movies', alt: 'A costumed ensemble on a cinema screen' },
  { file: 'meta-openenv', title: 'Meta Hackathon', summary: 'OpenEnv × Scaler', alt: 'Orange and pink OpenEnv Hackathon participant badge', position: '45% center' },
  { file: 'campus-tech', title: 'Campus Tech', summary: 'Access terminal at LPU', alt: 'Campus access terminal with a red status light and a blue screen', position: '42% center' },
  { file: 'hack-n-win', title: 'Hack-N-Win 3.0', summary: 'CGC University, Mohali', alt: 'Hack-N-Win stage backdrop at CGC University' },
  { file: 'companion-prototype', title: 'Projects', summary: '3D AI companion', alt: 'A 3D character in the AI companion prototype', position: '54% center' },
  { file: 'pencil-sketch', title: 'ART', summary: 'Pencil portrait', alt: 'Pencil drawing of a swordsman beside a blue pencil' },
  { file: 'character-study', title: 'ART', summary: 'Sketchbook character study', alt: 'Character study in a sketchbook with the reference on a laptop' },
];

const storyDuration = 5500;

export function setupEventStories(viewer, reducedMotion) {
  const card = viewer.querySelector('.story-card');
  const photos = viewer.querySelector('.story-photos');
  const progress = viewer.querySelector('.story-progress');
  const label = viewer.querySelector('.story-label');
  const title = viewer.querySelector('.story-title');
  const summary = viewer.querySelector('.story-summary');
  const playback = viewer.querySelector('.story-playback');
  const slides = [];
  const fills = [];
  let index = 0;
  let elapsed = 0;
  let frame = 0;
  let lastTime;
  let press;
  let paused = reducedMotion.matches;

  for (const story of stories) {
    const layer = document.createElement('div');
    layer.className = 'story-photo';
    if (story.wide) layer.classList.add('story-photo-wide');
    const photo = document.createElement('img');
    photo.alt = story.alt;
    photo.decoding = 'async';
    photo.draggable = false;
    if (story.position) photo.style.objectPosition = story.position;
    layer.append(photo);
    photos.append(layer);
    slides.push({ layer, photo });

    const track = document.createElement('span');
    const fill = document.createElement('i');
    track.append(fill);
    progress.append(track);
    fills.push(fill);
  }

  function wrap(storyIndex) {
    return (storyIndex + stories.length) % stories.length;
  }

  function loadNearby() {
    for (const i of [index, wrap(index + 1), wrap(index - 1)]) {
      const { layer, photo } = slides[i];
      if (photo.hasAttribute('src')) continue;
      photo.src = `assets/events/${stories[i].file}.jpg`;
      if (stories[i].wide) layer.style.setProperty('--story-backdrop', `url("${photo.src}")`);
    }
  }

  function show(nextIndex) {
    index = wrap(nextIndex);
    if (!viewer.hidden) loadNearby();
    elapsed = 0;
    lastTime = undefined;
    title.textContent = stories[index].title;
    summary.textContent = stories[index].summary;
    slides.forEach(({ layer }, i) => {
      const current = i === index;
      layer.classList.toggle('is-current', current);
      layer.setAttribute('aria-hidden', String(!current));
      fills[i].style.transform = i < index ? 'scaleX(1)' : 'scaleX(0)';
    });
  }

  function tick(time) {
    if (lastTime !== undefined) elapsed += time - lastTime;
    if (elapsed >= storyDuration) show(index + 1);
    lastTime = time;
    fills[index].style.transform = `scaleX(${elapsed / storyDuration})`;
    frame = requestAnimationFrame(tick);
  }

  function syncPlayback() {
    playback.toggleAttribute('data-paused', paused);
    playback.setAttribute('aria-label', paused ? 'Play stories' : 'Pause stories');
    label.setAttribute('aria-live', paused ? 'polite' : 'off');
    if (viewer.hidden || document.hidden || paused || press) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = undefined;
    } else if (!frame) {
      frame = requestAnimationFrame(tick);
    }
  }

  viewer.querySelector('.story-previous').addEventListener('click', () => show(index - 1));
  viewer.querySelector('.story-next').addEventListener('click', () => show(index + 1));
  playback.addEventListener('click', () => {
    paused = !paused;
    syncPlayback();
  });
  viewer.addEventListener('keydown', event => {
    const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!direction) return;
    event.preventDefault();
    paused = true;
    syncPlayback();
    show(index + direction);
  });

  card.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
    card.setPointerCapture(event.pointerId);
    syncPlayback();
  });

  card.addEventListener('pointerup', event => {
    if (press?.id !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
    if (moved < 10 && event.timeStamp - press.time < 250) {
      const rect = card.getBoundingClientRect();
      show(index + (event.clientX < rect.left + rect.width / 2 ? -1 : 1));
    }
    press = undefined;
    syncPlayback();
  });

  card.addEventListener('lostpointercapture', event => {
    if (press?.id !== event.pointerId) return;
    press = undefined;
    syncPlayback();
  });

  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    syncPlayback();
  });
  show(0);

  return function setActive(active) {
    viewer.hidden = !active;
    if (active) loadNearby();
    if (!active) press = undefined;
    syncPlayback();
  };
}
