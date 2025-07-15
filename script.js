// 다크 모드 토글
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkModeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
}

// fade-in 애니메이션 (Intersection Observer)
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// 카드 hover 인터랙션 (추가 효과)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 12px 36px rgba(0,0,0,0.18)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// 카드 플립 효과
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', function (e) {
    // 링크 클릭 시에는 플립 방지
    if (e.target.tagName === 'A') return;
    card.classList.toggle('flipped');
  });
});

// 타이핑 애니메이션
const typingText = '안녕하세요. 저는 광양고등학교 2학년에 재학 중인 박한결입니다.\ncospro 3급 자격증을 취득하였으며, 가천대 조기취업학과 진학을 목표로 열심히 공부하고 있습니다.\n논리적 사고와 꾸준함을 바탕으로 성장하는 개발자가 되고자 합니다.';
const typingEl = document.getElementById('typing');
let typingIdx = 0;
function typingEffect() {
  if (typingEl) {
    typingEl.textContent = typingText.slice(0, typingIdx);
    typingIdx++;
    if (typingIdx <= typingText.length) {
      setTimeout(typingEffect, 35);
    } else {
      typingEl.classList.add('caret');
    }
  }
}
typingEffect();

// 부드러운 스크롤 내비게이션

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 유성우(별똥별) 애니메이션 (파란색 선 형태, 직선에 가까운 빠른 유성우)
const meteorCanvas = document.getElementById('meteor-canvas');
let ctx = null;
if (meteorCanvas) {
  ctx = meteorCanvas.getContext('2d');
}
let meteors = [];
const METEOR_COUNT = 12;
const METEOR_COLOR = 'rgba(0,160,255,0.7)';

function resizeMeteorCanvas() {
  if (!meteorCanvas) return;
  meteorCanvas.width = window.innerWidth;
  meteorCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeMeteorCanvas);
resizeMeteorCanvas();

function createMeteor() {
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight * 0.3;
  const length = 180 + Math.random() * 80;
  const speed = 7 + Math.random() * 4;
  const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
  return {
    x: startX,
    y: startY,
    length,
    speed,
    angle,
    alpha: 1.0
  };
}

function drawMeteors() {
  if (!ctx || !meteorCanvas) return;
  ctx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
  for (let meteor of meteors) {
    ctx.save();
    ctx.globalAlpha = meteor.alpha;
    ctx.strokeStyle = METEOR_COLOR;
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#00cfff';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(
      meteor.x + Math.cos(meteor.angle) * meteor.length,
      meteor.y + Math.sin(meteor.angle) * meteor.length
    );
    ctx.stroke();
    ctx.restore();
  }
}

function updateMeteors() {
  for (let meteor of meteors) {
    meteor.x += Math.cos(meteor.angle) * meteor.speed;
    meteor.y += Math.sin(meteor.angle) * meteor.speed;
    meteor.alpha -= 0.008 + Math.random() * 0.004;
  }
  meteors = meteors.filter(m => m.alpha > 0 && m.x < window.innerWidth && m.y < window.innerHeight);
  while (meteors.length < METEOR_COUNT) {
    meteors.push(createMeteor());
  }
}

function animateMeteor() {
  updateMeteors();
  drawMeteors();
  requestAnimationFrame(animateMeteor);
}
for (let i = 0; i < METEOR_COUNT; i++) meteors.push(createMeteor());
animateMeteor(); 