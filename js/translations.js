// ── Translation strings ──────────────────────────────────────
const T = {
  sv: {
    pelletSelectLabel:    'Välj kula',
    pelletSelectDefault:  '— Välj preset —',
    pelletNameLabel:      'Namn (för favoriter)',
    pelletNamePlaceholder:'Valfritt...',
    caliberLabel:         'Kaliber (mm)',
    weightLabel:          'Vikt',
    unitLabel:            'Enhet',
    gramsOpt:             'gram',
    velocityLabel:        'Hastighet',
    resultLabel:          'Resultat',
    energyLabel:          'Energi',
    caliberResultLabel:   'Kaliber',
    weightResultLabel:    'Pelletvikt',
    saveBtn:              'Spara favorit',
    clearBtn:             'Rensa fält',
    note:                 'Tips: tryck på uppladdningsikonen på en favorit för att ladda in värdena. Favoriterna sparas lokalt i din enhet.',
    favTitle:             'Favoriter',
    favSubtitle:          'Spara & återanvänd',
    favFooter:            '<strong>Behålls mellan sessioner</strong> — sparas lokalt på enheten.',
    favEmpty:             'Inga favoriter sparade ännu.',
    exportBtn:            'Export',
    importBtn:            'Import',
    installText:          'Installera SteWeb som app',
    installBtn:           'Installera',
    legalOk:              '* Under 10 J — tillståndsfritt i Sverige.',
    legalWarn:            '* Över 10 J — vapentillstånd krävs i Sverige.',
    alertNoName:          'Ange ett namn på kulan/pellet!',
    confirmDuplicate:     (n) => `"${n}" finns redan. Ersätta den?`,
    importError:          'Fel vid import: ',
    favMeta:              (f) => `${f.values.cal_mm.toFixed(2)} mm · ${f.values.weight_g.toFixed(2)} g · ${f.values.vel_ms.toFixed(1)} m/s · ${f.values.energyJ.toFixed(2)} J`,
  },
  en: {
    pelletSelectLabel:    'Select pellet',
    pelletSelectDefault:  '— Select preset —',
    pelletNameLabel:      'Name (for favorites)',
    pelletNamePlaceholder:'Optional...',
    caliberLabel:         'Caliber (mm)',
    weightLabel:          'Weight',
    unitLabel:            'Unit',
    gramsOpt:             'grams',
    velocityLabel:        'Velocity',
    resultLabel:          'Result',
    energyLabel:          'Energy',
    caliberResultLabel:   'Caliber',
    weightResultLabel:    'Pellet weight',
    saveBtn:              'Save favorite',
    clearBtn:             'Clear',
    note:                 'Tip: tap the upload icon on a favorite to load its values. Favorites are stored locally on your device.',
    favTitle:             'Favorites',
    favSubtitle:          'Save & reuse',
    favFooter:            '<strong>Persists between sessions</strong> — stored locally on device.',
    favEmpty:             'No favorites saved yet.',
    exportBtn:            'Export',
    importBtn:            'Import',
    installText:          'Install SteWeb as an app',
    installBtn:           'Install',
    legalOk:              '',
    legalWarn:            '',
    alertNoName:          'Enter a name for the pellet!',
    confirmDuplicate:     (n) => `"${n}" already exists. Replace it?`,
    importError:          'Import error: ',
    favMeta:              (f) => `${f.values.cal_mm.toFixed(2)} mm · ${f.values.weight_g.toFixed(2)} g · ${f.values.vel_ms.toFixed(1)} m/s · ${f.values.energyJ.toFixed(2)} J`,
  }
};

// ── Language state & helpers ─────────────────────────────────
let lang = localStorage.getItem('stewebLang') || 'sv';

function t(key) {
  return T[lang][key];
}

function setLang(l) {
  lang = l;
  localStorage.setItem('stewebLang', lang);
  document.documentElement.lang = lang;
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (T[lang][key] !== undefined) el.innerHTML = T[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (T[lang][key] !== undefined) el.placeholder = T[lang][key];
  });
  document.querySelectorAll('[data-i18n-opt]').forEach(el => {
    const key = el.dataset.i18nOpt;
    if (T[lang][key] !== undefined) el.textContent = T[lang][key];
  });

  document.getElementById('langSE').classList.toggle('active', lang === 'sv');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');

  // Rebuild preset select options with translated default label
  const current = pelletSelect.value;
  pelletSelect.innerHTML =
    `<option value="">${t('pelletSelectDefault')}</option>` +
    PELLET_PRESETS.map((p, i) => `<option value="${i}">${p.name} · ${p.grains} gr</option>`).join('');
  pelletSelect.value = current;

  calculateAndDisplay();
  renderFavorites();
}
