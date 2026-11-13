const canvas = document.getElementById("aiCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// AI Tree Lines + Dot
const branches = [];
for (let i = 0; i < 80; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const length = Math.random() * 100 + 50;
  const angle = Math.random() * 2 * Math.PI;
  branches.push({ x, y, length, angle, offset: 0 });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(0, 200, 255, 0.2)";
  ctx.lineWidth = 1;

  branches.forEach(branch => {
    const { x, y, length, angle, offset } = branch;
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Moving Dot
    const dotX = x + Math.cos(angle) * (offset % length);
    const dotY = y + Math.sin(angle) * (offset % length);
    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
    ctx.fill();

    branch.offset += 0.5; // dot speed
  });

  requestAnimationFrame(draw);
}

draw();


const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0');
      entry.target.classList.add('slide-up');

      // Start count animation
      const counters = entry.target.querySelectorAll('.count');
      counters.forEach(counter => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');
        const increment = Math.ceil(target / 60);

        const updateCounter = () => {
          const current = +counter.innerText;
          if (current < target) {
            counter.innerText = `${Math.min(current + increment, target)}`;
            setTimeout(updateCounter, 30);
          }
        };
        updateCounter();
      });

      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.observe').forEach(el => observer.observe(el));


  const toggleBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('menuClose');
  const menu = document.getElementById('mobileMenu');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
  });

  // Optional: Close on link click
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });