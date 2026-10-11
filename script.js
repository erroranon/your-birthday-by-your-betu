// Navigation State
function nextScene(step) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const activeScreen = document.getElementById(`scene-${step}`);
  if (activeScreen) {
    activeScreen.classList.add('active');
  }
}

// Step 4 -> 5: Blow Candle + Launch Confetti
function blowCandle() {
  const flame = document.getElementById('cake-flame');
  if (flame) flame.classList.add('out');
  burstConfetti();
  setTimeout(() => {
    nextScene(5);
  }, 700);
}

// Step 7: 3D Card Flip Handler
let isOpened = false;
function toggleCard() {
  const card = document.getElementById('greeting-card');
  const btn = document.getElementById('card-btn');
  isOpened = !isOpened;
  if (isOpened) {
    card.classList.add('opened');
    btn.innerText = 'Close the Card';
    burstConfetti();
  } else {
    card.classList.remove('opened');
    btn.innerText = 'Open the Card ✉️';
  }
}

// Self-contained Zero-Dependency Canvas Confetti
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resize);
resize();

function burstConfetti() {
  const colors = ['#e91e63', '#ffb703', '#00f5d4', '#7b2cbf', '#ff5400'];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 3,
      alpha: 1
    });
  }
}

function renderParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; // Gravity
    p.alpha -= 0.015;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(p.alpha, 0);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    if (p.alpha <= 0) particles.splice(index, 1);
  });
  requestAnimationFrame(renderParticles);
}
renderParticles();
