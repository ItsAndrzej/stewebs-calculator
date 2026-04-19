// ── Pellet presets ───────────────────────────────────────────
const PELLET_PRESETS = [
  { name: 'JSB Exact 4.52',               cal: 4.52, grains: 15.89 },
  { name: 'H&N Field Target Trophy 4.51', cal: 4.51, grains: 8.64  },
  { name: 'RWS Superdome 4.50',           cal: 4.50, grains: 7.0   },
  { name: 'Gamo Round 4.50',              cal: 4.50, grains: 8.0   },
  { name: 'JSB King Exact 4.52',          cal: 4.52, grains: 18.13 },
  { name: 'H&N Baracuda Match 4.50',      cal: 4.50, grains: 8.18  },
  { name: 'RWS Hobby 4.50',               cal: 4.50, grains: 7.0   },
  { name: 'Gamo Hunter 4.50',             cal: 4.50, grains: 10.0  },
];

// ── Unit conversion constants ────────────────────────────────
const GRAIN_TO_GRAM  = 0.06479891;
const FPS_TO_MS      = 0.3048;
const J_TO_FTPLB     = 0.737562149;
const MM_TO_IN       = 1 / 25.4;
const LEGAL_LIMIT_J  = 10;
