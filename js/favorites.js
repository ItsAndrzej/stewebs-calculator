// ── Save ─────────────────────────────────────────────────────
function saveFavorite() {
  const name = pelletInput.value.trim();
  if (!name) { alert(t('alertNoName')); return; }

  const v    = calculateValues();
  let favs   = JSON.parse(localStorage.getItem('stewebFavs') || '[]');
  const dup  = favs.findIndex(f => f.name === name);

  if (dup !== -1) {
    if (!confirm(t('confirmDuplicate')(name))) return;
    favs.splice(dup, 1);
  }

  favs.push({ name, values: v });
  localStorage.setItem('stewebFavs', JSON.stringify(favs));
  renderFavorites();
}

// ── Render list ──────────────────────────────────────────────
function renderFavorites() {
  favListEl.innerHTML = '';
  const favs = JSON.parse(localStorage.getItem('stewebFavs') || '[]');

  if (favs.length === 0) {
    favListEl.innerHTML = `<div class="fav-empty">${t('favEmpty')}</div>`;
    return;
  }

  favs.forEach((f, i) => {
    const div = document.createElement('div');
    div.className = 'fav-item';
    div.innerHTML = `
      <div>
        <div class="fav-name">${f.name}</div>
        <div class="fav-meta">${t('favMeta')(f)}</div>
      </div>
      <div class="fav-actions">
        <button class="fav-icon-btn" onclick="loadFavorite(${i})" title="Load">
          <i class="fas fa-upload"></i>
        </button>
        <button class="fav-icon-btn del" onclick="deleteFavorite(${i})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
    favListEl.appendChild(div);
  });
}

// ── Load ─────────────────────────────────────────────────────
function loadFavorite(i) {
  const favs = JSON.parse(localStorage.getItem('stewebFavs') || '[]');
  if (!favs[i]) return;

  const v          = favs[i].values;
  pelletInput.value  = favs[i].name;
  caliberInput.value = v.cal_mm;
  weightInput.value  = weightUnit.value === 'grams' ? v.weight_g : v.weight_grains;
  velInput.value     = velUnit.value === 'm/s' ? v.vel_ms : v.vel_fps;
  calculateAndDisplay();
}

// ── Delete ───────────────────────────────────────────────────
function deleteFavorite(i) {
  const favs = JSON.parse(localStorage.getItem('stewebFavs') || '[]');
  favs.splice(i, 1);
  localStorage.setItem('stewebFavs', JSON.stringify(favs));
  renderFavorites();
}
