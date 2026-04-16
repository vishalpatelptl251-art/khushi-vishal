
const cfg = window.INVITE_CONFIG;
const bgLayer = document.getElementById('bg-layer');
const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const statusEl = document.getElementById('message-status');

bgLayer.style.backgroundImage = `url(${cfg.customBackground || cfg.fallbackBackground})`;

if (cfg.customMusic) audio.src = cfg.customMusic;

let musicOn = false;

if (cfg.customMusic) {
  window.addEventListener("load", async () => {
    try {
      await audio.play();
      musicOn = true;
      musicBtn.textContent = "Music On";
    } catch {
      musicOn = false;
      musicBtn.textContent = "Music Off";
    }
  });
}

function updateCountdown() {
  const target = new Date(cfg.eventTime);
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  document.getElementById('days').textContent = String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');
  document.getElementById('hours').textContent = String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,'0');
  document.getElementById('minutes').textContent = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,'0');
  document.getElementById('seconds').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const recipients = cfg.mailRecipients.join(',');
  const subject = encodeURIComponent(cfg.mailSubject);
  const body = encodeURIComponent(text);
  window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
  statusEl.hidden = false;
  input.value = '';
  setTimeout(() => { statusEl.hidden = true; }, 3000);
});
