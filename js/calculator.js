// ── Flash animation helper ───────────────────────────────────
function flash(...els) {
  els.forEach(el => {
    el.classList.remove('flash');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('flash');
  });
}

// ── Core calculation ─────────────────────────────────────────
function calculateValues() {
  const cal_mm   = parseFloat(caliberInput.value) || 0;
  const wt       = parseFloat(weightInput.value)  || 0;
  const vel      = parseFloat(velInput.value)      || 0;
  const weight_g = (weightUnit.value === 'grains') ? wt * GRAIN_TO_GRAM : wt;
  const vel_ms   = (velUnit.value === 'fps')        ? vel * FPS_TO_MS    : vel;
  const massKg   = Math.max(weight_g / 1000, 0);
  const energyJ  = (massKg > 0 && vel_ms > 0) ? 0.5 * massKg * vel_ms * vel_ms : 0;

  return {
    cal_mm,
    cal_in:        cal_mm * MM_TO_IN,
    weight_g,
    weight_grains: weightUnit.value === 'grains' ? wt : weight_g / GRAIN_TO_GRAM,
    vel_ms,
    vel_fps:       velUnit.value === 'fps' ? vel : vel_ms / FPS_TO_MS,
    energyJ,
    energyFt:      energyJ * J_TO_FTPLB,
  };
}

// ── Update result display ────────────────────────────────────
function calculateAndDisplay() {
  const v = calculateValues();

  outEnergyJ.innerHTML    = `${v.energyJ.toFixed(2)}<span class="unit">J</span>`;
  outEnergyFt.textContent = `${v.energyFt.toFixed(2)} ft·lbf`;
  outCalMm.innerHTML      = `${v.cal_mm.toFixed(3)}<span class="unit">mm</span>`;
  outCalIn.textContent    = `${v.cal_in.toFixed(3)}"`;
  outWeightG.innerHTML    = `${v.weight_g.toFixed(3)}<span class="unit">g</span>`;
  outWeightGr.textContent = `${v.weight_grains.toFixed(2)} gr`;
  outVelMs.innerHTML      = `${v.vel_ms.toFixed(2)}<span class="unit">m/s</span>`;
  outVelFps.textContent   = `${v.vel_fps.toFixed(1)} fps`;

  flash(outEnergyJ, outEnergyFt, outCalMm, outCalIn, outWeightG, outWeightGr, outVelMs, outVelFps);

  // Swedish legal indicator
  if (v.energyJ > 0 && lang === 'sv') {
    const msg = v.energyJ <= LEGAL_LIMIT_J ? t('legalOk') : t('legalWarn');
    legalSidenote.textContent    = msg;
    legalSidenote.style.display  = msg ? 'block' : 'none';
  } else {
    legalSidenote.style.display = 'none';
  }
}
