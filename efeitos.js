function startConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  function createParticle(x, y) {
    const colors = ["#ff0043", "#14fc56", "#1e90ff", "#ffcc00"];
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    return { x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, alpha: 1, color: colors[Math.floor(Math.random()*colors.length)] };
  }
  function explode(x, y) {
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle(x, y));
    }
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  setInterval(() => explode(Math.random()*canvas.width, Math.random()*canvas.height/2), 700);
  animate();
}

function startLights() {
  const canvas = document.getElementById("lights");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let lights = [];
  for (let i = 0; i < 50; i++) {
    lights.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: "rgba(255,255,255," + Math.random().toFixed(2) + ")"
    });
  }
  function animateLights() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let l of lights) {
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.radius, 0, Math.PI * 2);
      ctx.fillStyle = l.color;
      ctx.fill();
      l.y -= 0.5;
      if (l.y < 0) l.y = canvas.height;
    }
    requestAnimationFrame(animateLights);
  }
  animateLights();
}

window.onload = () => {
  startConfetti();
  startFireworks();
  startLights();
};
