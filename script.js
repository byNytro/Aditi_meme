// ========== CUSTOMIZE HERE ==========
const CONFIG = {
  name: "Aditi",
  message:
    "Happy birthday! I made this little surprise just for you. " +
    "You mean so much to me — hope this made you smile. More coming soon 💕",
  signed: "— With love",
  // Optional: add music/birthday.mp3 — falls back to a soft tune if missing
  musicUrl: "music/birthday.mp3",
};

const STEPS = [
  { text: "Do you wanna see what I made?", btn: "Yes!" },
  { text: "Let's turn the lights on ✨", btn: "Lights on" },
  { text: "Ready for some music? 🎵", btn: "Play music" },
  { text: "Time to decorate! 🎈", btn: "Decorate" },
  { text: "Now… cut the cake! 🎂", btn: "Show the cake" },
  { text: "Well, I have a message for you 💌", btn: "Read it" },
];

let step = 0;
let musicStarted = false;
let musicPlaysLeft = 0;
let cakeShown = false;
let cakeCut = false;
let waitingForCakeCut = false;

/** Full track plays this many times, then stops. */
const MUSIC_PLAY_COUNT = 2;

const promptText = document.getElementById("prompt-text");
const promptBtn = document.getElementById("prompt-btn");
const promptWrap = document.getElementById("prompt-wrap");
const lightsWrap = document.getElementById("lights-wrap");
const bunting = document.getElementById("bunting");
const balloons = document.getElementById("balloons");
const confettiLayer = document.getElementById("confetti-layer");
const cakeScene = document.getElementById("cake-scene");
const cake = document.getElementById("cake");
const cakeHint = document.getElementById("cake-hint");
const flame = document.getElementById("flame");
const messageOverlay = document.getElementById("message-overlay");
const messageBody = document.getElementById("message-body");
const messageSigned = document.getElementById("message-signed");
const bgMusic = document.getElementById("bg-music");

function showPrompt() {
  if (step >= STEPS.length) return;
  promptWrap.classList.remove("fade-out");
  promptWrap.style.display = "";
  promptText.textContent = STEPS[step].text;
  promptBtn.textContent = STEPS[step].btn;
  promptBtn.style.display = "";
}

function showCakeCutPrompt() {
  promptWrap.classList.remove("fade-out");
  promptText.textContent = "Go on, tap the cake to cut it! 🎂";
  promptBtn.style.display = "none";
}

function nextStep() {
  if (waitingForCakeCut) return;

  promptWrap.classList.add("fade-out");
  setTimeout(() => {
    const current = step;
    runStepAction(current);
    step++;

    if (current === 4) {
      waitingForCakeCut = true;
      showCakeCutPrompt();
      return;
    }

    if (step < STEPS.length) {
      showPrompt();
    } else {
      promptWrap.style.display = "none";
    }
  }, 450);
}

function runStepAction(index) {
  switch (index) {
    case 1:
      turnLightsOn();
      break;
    case 2:
      playMusic();
      break;
    case 3:
      decorate();
      break;
    case 4:
      showCake();
      break;
    case 5:
      showMessage();
      break;
  }
}

function turnLightsOn() {
  document.body.classList.add("lit");
  lightsWrap.classList.add("on");
}

function playMusic() {
  if (musicStarted) return;
  musicStarted = true;

  if (CONFIG.musicUrl) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.loop = false;
    bgMusic.volume = 0.45;
    musicPlaysLeft = MUSIC_PLAY_COUNT;
    bgMusic.onended = () => {
      musicPlaysLeft -= 1;
      if (musicPlaysLeft > 0) {
        bgMusic.currentTime = 0;
        void bgMusic.play().catch(() => {});
      } else {
        bgMusic.onended = null;
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
    };
    bgMusic.play().catch(() => playFallbackTune());
  } else {
    playFallbackTune();
  }
}

function playFallbackTune() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [262, 294, 330, 349, 392, 440, 494, 523];
    let t = ctx.currentTime;

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
      t += 0.28;
    });
  } catch (_) {
    /* silent fallback */
  }
}

function decorate() {
  bunting.classList.add("on");
  spawnBalloons(8);
  spawnConfetti(50);
}

function spawnBalloons(count) {
  const icons = ["🎈", "🎈", "🎀", "✨"];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "balloon";
    b.textContent = icons[i % icons.length];
    b.style.left = 5 + Math.random() * 90 + "%";
    b.style.animationDuration = 4 + Math.random() * 3 + "s";
    b.style.animationDelay = Math.random() * 1.5 + "s";
    b.style.fontSize = 1.8 + Math.random() * 1.2 + "rem";
    balloons.appendChild(b);
    b.addEventListener("animationend", () => b.remove());
  }
}

function spawnConfetti(count) {
  const colors = ["#ff6b9d", "#ffb3c6", "#ffd6a5", "#fff5f8", "#c9184a"];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = "-10px";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.animationDuration = 2 + Math.random() * 2 + "s";
    dot.style.animationDelay = Math.random() * 0.5 + "s";
    confettiLayer.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  }
}

function showCake() {
  cakeShown = true;
  cakeScene.classList.add("on");
  cakeScene.setAttribute("aria-hidden", "false");
}

function cutCake() {
  if (!cakeShown || cakeCut) return;
  cakeCut = true;
  cake.classList.add("cut");
  flame.classList.add("out");
  cakeHint.classList.add("hidden");
  spawnConfetti(30);

  if (waitingForCakeCut) {
    waitingForCakeCut = false;
    setTimeout(() => {
      if (step < STEPS.length) showPrompt();
    }, 800);
  }
}

function showMessage() {
  promptWrap.style.display = "none";
  messageOverlay.classList.remove("hidden");
  typeMessage(CONFIG.message, () => {
    messageBody.classList.add("done");
    messageSigned.textContent = CONFIG.signed;
    messageSigned.classList.add("show");
    spawnConfetti(40);
  });
}

function typeMessage(text, onDone) {
  let i = 0;
  messageBody.textContent = "";

  function tick() {
    if (i < text.length) {
      messageBody.textContent += text[i];
      i++;
      setTimeout(tick, 32);
    } else if (onDone) {
      onDone();
    }
  }

  tick();
}

promptBtn.addEventListener("click", nextStep);
cake.addEventListener("click", cutCake);

document.addEventListener("DOMContentLoaded", () => {
  document.title = "For you ✨";
  showPrompt();
});
