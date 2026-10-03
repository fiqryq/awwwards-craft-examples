// A plausible bean-temperature curve for a 12 kg batch: charge 200°C, turning point ~92°C at 1:00,
// yellowing ~160°C, first crack ~205°C at 8:30, drop at 10:30 (development ≈ 19%).
export const DROP = 630; // seconds
export const FIRST_CRACK = 510;
const TP = 60, K = 0.004, NORM = 1 - Math.exp(-K * (DROP - TP));

export function beanTemp(t) {
  if (t <= TP) return 200 - 108 * Math.sin((t / TP) * (Math.PI / 2));
  return 92 + (213 - 92) * (1 - Math.exp(-K * (t - TP))) / NORM;
}

// Rate of rise in °C/min (smoothed numeric derivative)
export function rateOfRise(t) {
  const dt = 6;
  return ((beanTemp(t + dt) - beanTemp(Math.max(0, t - dt))) / (t + dt - Math.max(0, t - dt))) * 60;
}

export const PHASES = [
  { id: "charge",      label: "Charge",       start: 0,   note: "12 kg of washed Guji hits a 200° drum." },
  { id: "drying",      label: "Drying",       start: 20,  note: "Moisture leaves. Firstcrack watches the turning point and flags a stalled drum." },
  { id: "maillard",    label: "Maillard",     start: 236, note: "Yellowing at 160°. Sugars and amino acids start building sweetness and body." },
  { id: "crack",       label: "First crack",  start: 510, note: "Audible crack logged automatically. The development clock starts." },
  { id: "development", label: "Development",  start: 525, note: "RoR declining smoothly — no flick, no crash. DTR target 18–20%." },
  { id: "drop",        label: "Drop",         start: 625, note: "Dropped at 213° · 10:30 · DTR 19.0%. Saved to profile v14." },
];

// Chart mapping
export const W = 1000, H = 520, PAD = { l: 0, r: 0, t: 30, b: 30 };
export const x = (t) => PAD.l + (t / DROP) * (W - PAD.l - PAD.r);
export const y = (temp) => PAD.t + (1 - (temp - 80) / (230 - 80)) * (H - PAD.t - PAD.b);

export function curvePath(step = 5) {
  let d = "";
  for (let t = 0; t <= DROP; t += step) d += `${t ? "L" : "M"}${x(t).toFixed(1)},${y(beanTemp(t)).toFixed(1)}`;
  return d;
}

// RoR mapped onto the same chart (0–30 °C/min on the lower half), shown once it has settled after the turning point
export function rorPath(step = 6) {
  let d = "";
  for (let t = TP + 40; t <= DROP; t += step) {
    const r = Math.max(0, Math.min(30, rateOfRise(t)));
    d += `${d ? "L" : "M"}${x(t).toFixed(1)},${(H - PAD.b - (r / 30) * (H * 0.5)).toFixed(1)}`;
  }
  return d;
}

export const fmtTime = (t) => `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
