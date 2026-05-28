const offsets = {
  mercury: 37,
  venus:   40,
  earth:   44,
  mars:    47,
  jupiter: 50,
  saturn:  53,
  uranus:  57,
  neptune: 62
};

const planetData = {
  mercury: { name: "Mercury", dist: "57.9M km",  day: "58D 15H",  desc: "The smallest planet and closest to the Sun." },
  venus:   { name: "Venus",   dist: "108.2M km", day: "116D 18H", desc: "Spinning in the opposite direction, Venus is the hottest planet." },
  earth:   { name: "Earth",   dist: "149.6M km", day: "24 Hours", desc: "Our home planet, the only place we know of with life." },
  mars:    { name: "Mars",    dist: "227.9M km", day: "24H 37M",  desc: "The Red Planet, home to the largest volcano in the solar system." },
  jupiter: { name: "Jupiter", dist: "778.5M km", day: "9H 56M",   desc: "The king of planets, a gas giant with a Great Red Spot." },
  saturn:  { name: "Saturn",  dist: "1.4B km",   day: "10H 42M",  desc: "Famous for its spectacular and complex ring system." },
  uranus:  { name: "Uranus",  dist: "2.9B km",   day: "17H 14M",  desc: "An ice giant that rotates on its side at a 90-degree angle." },
  neptune: { name: "Neptune", dist: "4.5B km",   day: "16H 6M",   desc: "The farthest planet, a cold and dark world of super-winds." }
};

/* ── DOM refs ── */
const appContainer = document.getElementById('app');
const navTextPath  = document.getElementById('navTextPath');
const planetName   = document.getElementById('planet-name');
const planetDesc   = document.getElementById('planet-description');
const statDist     = document.getElementById('stat-dist');
const statDay      = document.getElementById('stat-day');
const planetImage  = document.querySelector('.planet-image');
const planetLinks  = document.querySelectorAll('.planet-link');

/* ── Smooth startOffset animation ── */
let animId = null;

function animateOffset(toValue) {
  const from = parseFloat(navTextPath.getAttribute('startOffset')) || 42;
  const to   = parseFloat(toValue);
  if (animId) cancelAnimationFrame(animId);

  const startTime = performance.now();
  const duration  = 1200;

  function step(now) {
    const t     = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    navTextPath.setAttribute('startOffset', (from + (to - from) * eased) + '%');
    if (t < 1) animId = requestAnimationFrame(step);
  }
  animId = requestAnimationFrame(step);
}



/* ── Select a planet ── */
function selectPlanet(id) {
  const info = planetData[id];
  if (!info) return;

  animateOffset(offsets[id]);
  appContainer.setAttribute('data-current-planet', id);

  planetName.innerText = info.name;
  planetDesc.innerText = info.desc;
  statDist.innerText   = info.dist;
  statDay.innerText    = info.day;
  planetImage.style.backgroundImage = `url(${id}.png)`;
}

/* ── Click listeners ── */
planetLinks.forEach(link => {
  link.addEventListener('click', e => {
    selectPlanet(e.target.getAttribute('data-planet'));
  });
});

/* ── Init ── */
selectPlanet('earth');
