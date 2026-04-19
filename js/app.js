// ── DOM references ───────────────────────────────────────────
const pelletSelect  = document.getElementById('pelletSelect');
const pelletInput   = document.getElementById('pellet');
const caliberInput  = document.getElementById('caliber');
const weightInput   = document.getElementById('weight');
const weightUnit    = document.getElementById('weightUnit');
const velInput      = document.getElementById('velocity');
const velUnit       = document.getElementById('velUnit');

const outEnergyJ    = document.getElementById('outEnergyJ');
const outEnergyFt   = document.getElementById('outEnergyFt');
const outCalMm      = document.getElementById('outCalMm');
const outCalIn      = document.getElementById('outCalIn');
const outWeightG    = document.getElementById('outWeightG');
const outWeightGr   = document.getElementById('outWeightGr');
const outVelMs      = document.getElementById('outVelMs');
const outVelFps     = document.getElementById('outVelFps');
const legalSidenote = document.getElementById('legalSidenote');

const saveBtn   = document.getElementById('saveBtn');
const clearBtn  = document.getElementById('clearBtn');
const favListEl = document.getElementById('favList');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');

// ── Input listeners ──────────────────────────────────────────
[caliberInput, weightInput, weightUnit, velInput, velUnit].forEach(el =>
  el.addEventListener('input', calculateAndDisplay)
);

// ── Pellet preset select ─────────────────────────────────────
pelletSelect.addEventListener('change', () => {
  const idx = parseInt(pelletSelect.value);
  if (isNaN(idx)) return;

  const p          = PELLET_PRESETS[idx];
  pelletInput.value  = p.name;
  caliberInput.value = p.cal;
  weightUnit.value   = 'grains';
  weightInput.value  = p.grains;

  [caliberInput, weightInput].forEach(el =>
    el.dispatchEvent(new Event('input', { bubbles: true }))
  );
  calculateAndDisplay();
});

// ── Save & Clear ─────────────────────────────────────────────
saveBtn.addEventListener('click', saveFavorite);

clearBtn.addEventListener('click', () => {
  pelletSelect.value = '';
  pelletInput.value  = '';
  caliberInput.value = '';
  weightInput.value  = '';
  velInput.value     = '';
  [caliberInput, weightInput, velInput].forEach(el =>
    el.dispatchEvent(new Event('input', { bubbles: true }))
  );
  calculateAndDisplay();
});

// ── Export / Import ──────────────────────────────────────────
exportBtn.addEventListener('click', () => {
  const blob = new Blob([localStorage.getItem('stewebFavs') || '[]'], { type: 'application/json' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'steweb_favorites.json';
  a.click();
});

importBtn.addEventListener('click', () => {
  const input    = document.createElement('input');
  input.type     = 'file';
  input.accept   = 'application/json';
  input.onchange = e => {
    const reader   = new FileReader();
    reader.onload  = evt => {
      try {
        localStorage.setItem('stewebFavs', JSON.stringify(JSON.parse(evt.target.result)));
        renderFavorites();
      } catch (err) {
        alert(t('importError') + err.message);
      }
    };
    reader.readAsText(e.target.files[0]);
  };
  input.click();
});

// ── PWA install prompt ───────────────────────────────────────
let deferredPrompt      = null;
const installBanner     = document.getElementById('installBanner');
const installBtn        = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.style.display = 'flex';
});

installBtn.addEventListener('click', () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    installBanner.style.display = 'none';
  });
});

window.addEventListener('appinstalled', () => {
  installBanner.style.display = 'none';
});

// ── Service worker ───────────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
});
