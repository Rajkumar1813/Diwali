// Set up the canvas for fireworks 
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Display greeting with user's name
window.onload = function() {
  let userName = getUserName();
  document.getElementById("userGreeting").innerHTML = `Hello, <span class="user-name">${userName}</span> ❤️ आपको आनंदमय दिवाली की शुभकामनाएं!`;
};

function promptUserName() {
  let userName;
  while (!userName) {
    userName = prompt("कृपया अपना नाम डालें...!");
    if (!userName) alert("क्या आप अपना नाम भूल गए है ? कृपया अपना नाम डालें...!");
  }
  return userName;
}

function getUserName() {
  const storedName = localStorage.getItem("userName");
  const storedTime = localStorage.getItem("userNameTime");
  const currentTime = new Date().getTime();

  if (storedName && storedTime && currentTime - storedTime < 10 * 60 * 1000) {
    return storedName;
  } else {
    const userName = promptUserName();
    localStorage.setItem("userName", userName);
    localStorage.setItem("userNameTime", currentTime);
    return userName;
  }
}

// Utility function to generate a random number in a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Button click event to start celebration animations
function startCelebration() {
  document.getElementById("celebrateButton").classList.add("active");

  setInterval(createFireworks, 500);
  setInterval(createRocket, 1200);
  setInterval(createSparkler, 700);
  setInterval(createCrackers, 1500);
  setInterval(createCandles, 3000);
  setInterval(createGarlands, 2000);
  setInterval(createLoveVibes, 1000);
}

// Fireworks creation function with festive visuals
function createFireworks() {
  const particles = [];
  const baseX = random(0, canvas.width);
  const baseY = random(0, canvas.height / 2);

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: baseX,
      y: baseY,
      size: random(2, 5),
      speedX: random(-3, 3),
      speedY: random(-3, 3),
      color: `hsl(${random(0, 360)}, 100%, 60%)`,
      opacity: 1
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.size *= 0.98;
      p.opacity -= 0.015;
      p.speedY += 0.02;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (p.size < 0.5 || p.opacity < 0) particles.splice(i, 1);
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Rocket animation function with trailing effects
function createRocket() {
  const rocketX = random(0, canvas.width);
  const rocketTrail = [];

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rocketTrail.push({
      x: rocketX,
      y: canvas.height,
      speedY: random(-10, -15),
      color: `hsl(${random(0, 360)}, 100%, 50%)`
    });

    rocketTrail.forEach((rocket, index) => {
      rocket.y += rocket.speedY;

      ctx.strokeStyle = rocket.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rocket.x, canvas.height);
      ctx.lineTo(rocket.x, rocket.y);
      ctx.stroke();

      rocket.speedY += 0.5;

      if (rocket.y < canvas.height / 2 || rocket.speedY >= 0) {
        rocketTrail.splice(index, 1);
      }
    });

    if (rocketTrail.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Sparkler animation function with trails
function createSparkler() {
  const sparkles = [];
  for (let i = 0; i < 20; i++) {
    sparkles.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      size: random(1, 3),
      speedX: random(-2, 2),
      speedY: random(-2, 2),
      color: `hsl(${random(0, 360)}, 100%, 70%)`,
      opacity: 1
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sparkles.forEach((s, i) => {
      s.x += s.speedX;
      s.y += s.speedY;
      s.size *= 0.98;
      s.opacity -= 0.02;

      ctx.globalAlpha = s.opacity;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (s.size < 0.5 || s.opacity < 0) sparkles.splice(i, 1);
    });

    if (sparkles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Crackers animation for sparkling effect
function createCrackers() {
  const crackerX = random(0, canvas.width);
  const crackerY = random(canvas.height / 2, canvas.height - 50);
  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: crackerX,
      y: crackerY,
      size: random(2, 4),
      speedX: random(-5, 5),
      speedY: random(-5, 5),
      color: `hsl(${random(0, 360)}, 100%, 50%)`,
      opacity: 1
    });
  }

  function animate() {
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.size *= 0.98;
      p.opacity -= 0.02;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (p.size < 0.5 || p.opacity < 0) particles.splice(i, 1);
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Create candles with flickering flame
function createCandles() {
  const candleX = random(50, canvas.width - 50);
  const candleY = canvas.height - 50;

  ctx.fillStyle = "orange";
  ctx.fillRect(candleX - 5, candleY, 10, 30); // Candle base

  function flicker() {
    ctx.beginPath();
    ctx.arc(candleX, candleY - 10, random(5, 7), 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
  }

  flicker();
}

// Garlands animation with blinking lights
function createGarlands() {
  for (let y = 100; y < canvas.height / 2; y += 50) {
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.fillStyle = `hsl(${random(0, 360)}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Love vibes with hearts animation
function createLoveVibes() {
  const hearts = [];
  const heartX = random(0, canvas.width);
  const heartY = random(0, canvas.height / 2);

  for (let i = 0; i < 10; i++) {
    hearts.push({
      x: heartX + random(-10, 10),
      y: heartY + random(-10, 10),
      size: random(10, 15),
      opacity: 1,
      color: "rgba(255, 0, 127, 0.7)"
    });
  }

  function animate() {
    hearts.forEach((h, i) => {
      h.opacity -= 0.02;
      h.size += 0.1;
      ctx.fillStyle = h.color;
      ctx.globalAlpha = h.opacity;
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (h.opacity <= 0) hearts.splice(i, 1);
    });

    if (hearts.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
