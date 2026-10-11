// Step Navigation State
function nextScene(step) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`scene-${step}`);
  if (target) {
    target.classList.add('active');
  }
}

// Blow Candles Action
function blowCandles() {
  document.getElementById('flame-1').classList.add('flame-out');
  document.getElementById('flame-2').classList.add('flame-out');
  document.getElementById('flame-3').classList.add('flame-out');
  fireConfettiBurst();
  setTimeout(() => {
    nextScene(5);
  }, 750);
}

// 3D Card Unfolding
let isCardOpen = false;
function toggleBookCard() {
  const card = document.getElementById('card3d');
  const btn = document.getElementById('card-action-btn');
  isCardOpen = !isCardOpen;
  
  if (isCardOpen) {
    card.classList.add('open');
    btn.innerText = 'Close Card';
    fireConfettiBurst();
  } else {
    card.classList.remove('open');
    btn.innerText = 'Open Your Card ✉️';
  }
}

// Lightweight Confetti Particles
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function fitCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', fitCanvas);
fitCanvas();

function fireConfettiBurst() {
  const colors = ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#ff758f'];
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10 - 3,
      life: 1
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.18; // gravity
    p.life -= 0.015;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) particles.splice(idx, 1);
  });
  requestAnimationFrame(updateConfetti);
}
updateConfetti();
