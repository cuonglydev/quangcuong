const canvas = document.getElementById("netCanvas");
const ctx = canvas.getContext("2d");

const POINTS = 100;
const MAX_DIST = 120;
let points = [];
let mouse = { x: null, y: null };

// Tốc độ mặc định
let defaultSpeed = 0.3;
let hoverSpeed = 1.2;

// Hàm resize đúng chuẩn cho màn hình retina
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect(); // lấy kích thước thực tế từ CSS

  logicWidth = rect.width;
  logicHeight = rect.height;

  canvas.width = logicWidth * dpr;
  canvas.height = logicHeight * dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  points = [];
  for (let i = 0; i < POINTS; i++) {
    points.push({
      x: Math.random() * logicWidth,
      y: Math.random() * logicHeight,
      vx: (Math.random() - 0.5) * defaultSpeed,
      vy: (Math.random() - 0.5) * defaultSpeed,
    });
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Lắng nghe chuột
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < POINTS; i++) {
    const p = points[i];

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const force = (1 - dist / MAX_DIST);
        const ax = dx * force * 0.002;
        const ay = dy * force * 0.002;
        p.vx += ax;
        p.vy += ay;
      }
    }

    const speedLimit = (mouse.x !== null && mouse.y !== null) ? hoverSpeed : defaultSpeed;
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > speedLimit) {
      p.vx *= 0.95;
      p.vy *= 0.95;
    }

    p.x += p.vx;
    p.y += p.vy;

    if (p.x <= 0 || p.x >= width) p.vx *= -1;
    if (p.y <= 0 || p.y >= height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  // Vẽ đường nối
  for (let i = 0; i < POINTS; i++) {
    for (let j = i + 1; j < POINTS; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / MAX_DIST})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();