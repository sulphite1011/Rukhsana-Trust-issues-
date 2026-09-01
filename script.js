// Audio Player logic
const audio = document.getElementById('audio-player');
const musicBtn = document.getElementById('music-toggle-btn');
const playIcon = document.getElementById('play-icon');
const eqContainer = document.getElementById('eq-container');

let isPlaying = false;

function toggleMusic() {
  if (audio.paused) {
    audio.play().then(() => {
      isPlaying = true;
      playIcon.textContent = '⏸';
      eqContainer.style.display = 'inline-flex';
    }).catch(err => {
      console.log('Autoplay policy caught:', err);
    });
  } else {
    audio.pause();
    isPlaying = false;
    playIcon.textContent = '▶';
    eqContainer.style.display = 'none';
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

// Step Navigation
const steps = ['step-intro', 'step-story', 'step-trust', 'step-question', 'step-celebration'];
let currentStepIdx = 0;

function showStep(idx) {
  currentStepIdx = idx;
  steps.forEach((stepId, i) => {
    const el = document.getElementById(stepId);
    if (el) {
      if (i === idx) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Update progress dots indicator
  const progressDots = document.getElementById('progress-dots');
  if (progressDots) {
    if (idx === 4) {
      progressDots.style.display = 'none';
    } else {
      progressDots.style.display = 'flex';
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
          if (i === idx) {
            dot.style.width = '32px';
            dot.style.background = 'linear-gradient(to right, #ff4f9a, #8c52ff)';
          } else if (i < idx) {
            dot.style.width = '8px';
            dot.style.background = 'rgba(255, 79, 154, 0.6)';
          } else {
            dot.style.width = '8px';
            dot.style.background = 'rgba(255, 255, 255, 0.2)';
          }
        }
      }
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Step 1 -> Step 2
const btnStart = document.getElementById('btn-start');
if (btnStart) {
  btnStart.addEventListener('click', () => {
    if (audio.paused) toggleMusic();
    showStep(1);
  });
}

// Step 2 -> Back/Next
const btnStoryBack = document.getElementById('btn-story-back');
const btnStoryNext = document.getElementById('btn-story-next');

if (btnStoryBack) {
  btnStoryBack.addEventListener('click', () => showStep(0));
}
if (btnStoryNext) {
  btnStoryNext.addEventListener('click', () => {
    showStep(2);
    startTrustCounter();
  });
}

// Step 3 Trust Meter Animation
let counterRunning = false;
function startTrustCounter() {
  if (counterRunning) return;
  counterRunning = true;

  const counterEl = document.getElementById('trust-counter');
  const barEl = document.getElementById('trust-progress-bar');
  const milestoneEl = document.getElementById('trust-milestone');
  const nextBtn = document.getElementById('btn-trust-next');

  let current = 30;
  const target = 100;
  const duration = 2200;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(30 + (target - 30) * ease);

    if (counterEl) counterEl.textContent = current;
    if (barEl) barEl.style.width = `${current}%`;

    if (milestoneEl) {
      if (current < 50) {
        milestoneEl.textContent = '⚡ Level 1: TikTok Inbox Salam & First Hello 💬';
      } else if (current < 75) {
        milestoneEl.textContent = '🎯 Level 2: The "Rukhsana" Name Guess 🎯';
      } else if (current < 100) {
        milestoneEl.textContent = '✨ Level 3: Deep Conversations & Understanding ✨';
      } else {
        milestoneEl.textContent = '👑 Maximum Trust: 100% Pure, Complete & Genuine Trust 💜';
        if (nextBtn) nextBtn.removeAttribute('disabled');
      }
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counterRunning = false;
    }
  }
  requestAnimationFrame(animate);
}

const btnTrustBack = document.getElementById('btn-trust-back');
const btnTrustNext = document.getElementById('btn-trust-next');

if (btnTrustBack) {
  btnTrustBack.addEventListener('click', () => showStep(1));
}
if (btnTrustNext) {
  btnTrustNext.addEventListener('click', () => showStep(3));
}

// Step 4 Question & Dodging No
const noBtn = document.getElementById('btn-no');
const yesBtn = document.getElementById('btn-yes');
const questionCard = document.getElementById('question-card');
const hintEl = document.getElementById('playful-hint');
let noCount = 0;

const phrases = [
  'No 😈',
  'Are you sure? 😏',
  'Wait, think again! 😜',
  'Wrong button! 🏃‍♀️',
  'Still trying? 😂',
  'You cannot escape! 💜',
  '100% is inevitable! ✨'
];

function dodgeNo(e) {
  if (e) e.preventDefault();
  noCount++;
  const phrase = phrases[Math.min(noCount, phrases.length - 1)];
  if (noBtn) noBtn.textContent = phrase;

  if (questionCard && noBtn) {
    const rect = questionCard.getBoundingClientRect();
    const padding = 60;
    const maxL = Math.max(0, rect.width - 160);
    const maxT = Math.max(0, rect.height - 100);

    const randX = Math.floor(Math.random() * (maxL - padding)) + padding / 2;
    const randY = Math.floor(Math.random() * (maxT - padding)) + padding / 2;

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;
  }

  if (yesBtn) {
    const scale = Math.min(1 + noCount * 0.22, 2.4);
    yesBtn.style.transform = `scale(${scale})`;
  }

  if (hintEl) {
    hintEl.style.display = 'block';
  }
}

if (noBtn) {
  noBtn.addEventListener('click', dodgeNo);
  noBtn.addEventListener('mouseenter', () => {
    if (noCount > 0) dodgeNo();
  });
  noBtn.addEventListener('touchstart', dodgeNo, { passive: false });
}

const btnQuestionBack = document.getElementById('btn-question-back');
if (btnQuestionBack) {
  btnQuestionBack.addEventListener('click', () => showStep(2));
}

// Step 4 YES -> Step 5 Celebration
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    showStep(4);
    fireConfetti();
    if (audio.paused) toggleMusic();
  });
}

function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } }), 300);
    setTimeout(() => confetti({ particleCount: 120, spread: 120, origin: { y: 0.4 } }), 600);
  }
}

// Step 5 Actions
const btnReplay = document.getElementById('btn-replay');
if (btnReplay) {
  btnReplay.addEventListener('click', () => {
    noCount = 0;
    if (noBtn) {
      noBtn.style.position = 'relative';
      noBtn.style.left = 'auto';
      noBtn.style.top = 'auto';
      noBtn.textContent = 'No 😈';
    }
    if (yesBtn) {
      yesBtn.style.transform = 'scale(1)';
    }
    if (hintEl) {
      hintEl.style.display = 'none';
    }
    showStep(0);
  });
}

const btnShare = document.getElementById('btn-share');
if (btnShare) {
  btnShare.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      btnShare.textContent = '✔ Link Copied!';
      setTimeout(() => { btnShare.textContent = '🔗 Share Story'; }, 2500);
    }
  });
}

// Floating hearts on tap
document.addEventListener('click', (e) => {
  if (currentStepIdx === 4) {
    const heart = document.createElement('div');
    heart.textContent = '💜';
    heart.style.position = 'fixed';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.transition = 'all 1s ease-out';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = 'translateY(-80px) scale(1.6)';
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1000);
  }
});
