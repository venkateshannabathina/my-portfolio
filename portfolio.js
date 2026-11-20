const motion = matchMedia("(prefers-reduced-motion: reduce)");
const navigation = document.querySelector("nav");
const menu = Array.from(navigation.querySelectorAll("a"));
const markers = menu.map((link) => document.getElementById(link.hash.slice(1)));
const articles = markers.map((marker) => marker.nextElementSibling);
let selected = -1;

function updateSection() {
  const top = parseFloat(getComputedStyle(markers[0]).scrollMarginTop) + 1;
  let next = 0;
  for (let i = 1; i < markers.length; i++) {
    if (markers[i].getBoundingClientRect().top > top) break;
    next = i;
  }
  const markerTop = markers[next].getBoundingClientRect().top;
  const range =
    articles[next].offsetHeight -
    Math.max(0, -parseFloat(getComputedStyle(articles[next]).marginBottom));
  const progress = Math.min(
    1,
    Math.max(0, (top - markerTop) / Math.max(1, range)),
  );
  articles[next].style.setProperty("--push", (-8 * progress).toFixed(2) + "px");
  if (next === selected) return;
  articles.forEach((article, i) => {
    article.inert = i !== next;
    article.classList.toggle("is-entering", selected !== -1 && i === next);
    if (i === next) menu[i].setAttribute("aria-current", "location");
    else menu[i].removeAttribute("aria-current");
  });
  if (
    selected >= 0 &&
    (!location.hash || menu.some((link) => link.hash === location.hash))
  ) {
    const hash = menu[next].hash;
    if (location.hash !== hash) history.replaceState(history.state, "", hash);
  }
  selected = next;
}
function measureArticles() {
  navigation.parentElement.style.setProperty(
    "--nav-height",
    navigation.offsetHeight + "px",
  );
  for (const article of articles) {
    const height = article.offsetHeight;
    const available =
      innerHeight - parseFloat(getComputedStyle(markers[0]).scrollMarginTop);
    article.classList.toggle("is-tall", height > available);
    article.style.setProperty("--article-height", height + "px");
  }
  updateSection();
}
measureArticles();
document.querySelector(".sections").classList.add("single-section");
const sizes = new ResizeObserver(measureArticles);
for (const element of [navigation, ...articles]) sizes.observe(element);
window.addEventListener("scroll", updateSection, { passive: true });
window.addEventListener("pageshow", measureArticles);
window.addEventListener("resize", measureArticles);
const orb = document.querySelector(".orb");
function syncMotion() {
  if (motion.matches) orb.pause();
  else orb.play().catch(() => {});
}
syncMotion();
motion.addEventListener("change", syncMotion);
const taglines = document.querySelectorAll(".identity p span");
let taglineIndex = 0;
window.setInterval(() => {
  if (document.hidden) return;
  taglines[taglineIndex].setAttribute("aria-hidden", "true");
  taglineIndex = (taglineIndex + 1) % taglines.length;
  taglines[taglineIndex].removeAttribute("aria-hidden");
}, 4500);
const blink = document.getElementById("blink");
const replay = document.querySelector(".replay");
function playBlink() {
  blink.currentTime = 0;
  blink.play().catch(() => {
    replay.textContent = "Play blink";
  });
}
replay.addEventListener("click", playBlink);
blink.addEventListener("playing", () => {
  replay.textContent = "Replay blink";
});
if (!motion.matches) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting) && !articles[0].inert) {
      playBlink();
      observer.disconnect();
    }
  });
  observer.observe(blink);
}
const stories = [
  {
    src: "assets/events/deepmind-01.jpg",
    title: "Google DeepMind Hackathon",
    summary: "Bangalore · July 2026. A photo from the hackathon floor.",
    alt: "Two attendees in front of the blue hackathon sign",
  },
  {
    src: "assets/events/deepmind-02.jpg",
    title: "At the DeepMind stage",
    summary: "Bangalore · July 2026. A second photo in front of the stage.",
    alt: "Two attendees giving thumbs up in front of the stage",
  },
  {
    src: "assets/events/cinema.jpg",
    title: "At the movies",
    summary: "A costume scene from a night at the cinema.",
    alt: "A costumed ensemble on a cinema screen",
  },
  {
    src: "assets/events/meta-openenv.jpg",
    title: "OpenEnv × Scaler",
    summary: "My participant badge from the Meta hackathon.",
    alt: "Orange and pink OpenEnv Hackathon participant badge",
  },
  {
    src: "assets/events/campus-tech.jpg",
    title: "Campus access terminal",
    summary: "An access terminal at LPU, with its camera and status light.",
    alt: "Campus access terminal with a red status light and a blue screen",
  },
  {
    src: "assets/events/hack-n-win.jpg",
    title: "Hack-N-Win 3.0",
    summary: "The stage at CGC University in Mohali.",
    alt: "Hack-N-Win stage backdrop at CGC University",
  },
  {
    src: "assets/events/companion-prototype.jpg",
    title: "Companion prototype",
    summary: "A 3D character on screen during development.",
    alt: "A 3D character in the AI companion prototype",
  },
  {
    src: "assets/events/pencil-sketch.jpg",
    title: "Pencil study",
    summary:
      "A portrait built from the angle of the eyes and the weight of the pencil marks.",
    alt: "Pencil drawing of a swordsman beside a blue pencil",
  },
  {
    src: "assets/events/character-study.jpg",
    title: "Sketchbook reference",
    summary: "The reference stays open on the laptop beside the drawing.",
    alt: "Character study in a sketchbook with the reference on a laptop",
  },
];
let story = 0;
function showPhoto(offset) {
  story = (story + offset + stories.length) % stories.length;
  const item = stories[story],
    image = document.getElementById("event-image");
  image.src = item.src;
  image.alt = item.alt;
  document.getElementById("event-title").textContent = item.title;
  document.getElementById("event-summary").textContent = item.summary;
  document.getElementById("event-count").textContent =
    story + 1 + " / " + stories.length;
}
document.getElementById("prev").onclick = () => showPhoto(-1);
document.getElementById("next").onclick = () => showPhoto(1);
showPhoto(0);
