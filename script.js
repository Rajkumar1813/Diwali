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

   // Check if stored data is less than 10 minutes old
   if (storedName && storedTime && currentTime - storedTime < 10 * 60 * 1000) {
     return storedName;
   } else {
     // Prompt for name and store in local storage with a timestamp
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

 // Button click event for celebration and animations
 function startCelebration() {
   document.getElementById("celebrateButton").classList.add("active");

   // Launch fireworks and rocket animations continuously
   setInterval(createFireworks, 500);
   setInterval(createRocket, 1000);
   setInterval(createSparkler, 700);
 }

 // Fireworks creation function with festive visuals
 function createFireworks() {
   const particles = [];
   for (let i = 0; i < 100; i++) {
     particles.push({
       x: canvas.width / 2,
       y: canvas.height / 2,
       size: random(2, 4),
       speedX: random(-5, 5),
       speedY: random(-5, 5),
       color: `hsl(${random(0, 360)}, 100%, 50%)`,
       opacity: 1
     });
   }

   function animate() {
     ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);

     particles.forEach((p, i) => {
       p.x += p.speedX;
       p.y += p.speedY;
       p.size *= 0.98;
       p.opacity -= 0.02;

       ctx.fillStyle = `${p.color}`;
       ctx.globalAlpha = p.opacity;
       ctx.beginPath();
       ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
       ctx.fill();
       ctx.globalAlpha = 1;  // Reset global alpha

       if (p.size < 0.5 || p.opacity < 0) particles.splice(i, 1);
     });

     if (particles.length > 0) {
       requestAnimationFrame(animate);
     }
   }

   animate();
 }

 // Rocket animation function
 function createRocket() {
   ctx.beginPath();
   ctx.moveTo(random(0, canvas.width), canvas.height);
   ctx.lineTo(random(0, canvas.width), random(canvas.height / 2, 0));
   ctx.strokeStyle = `hsl(${random(0, 360)}, 100%, 50%)`;
   ctx.lineWidth = 3;
   ctx.stroke();
 }

 // Sparkler animation function
 function createSparkler() {
   const sparkles = [];
   for (let i = 0; i < 20; i++) {
     sparkles.push({
       x: random(0, canvas.width),
       y: random(0, canvas.height),
       size: random(1, 3),
       color: `hsl(${random(0, 360)}, 100%, 70%)`,
       opacity: 1
     });
   }

   sparkles.forEach((s, i) => {
     ctx.globalAlpha = s.opacity;
     ctx.fillStyle = s.color;
     ctx.beginPath();
     ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
     ctx.fill();
     ctx.globalAlpha = 1;
     s.opacity -= 0.02;
   });
 }
