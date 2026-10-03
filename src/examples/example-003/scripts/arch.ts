// Arch-shaped clip paths: an inset() with only the top corners rounded to a half circle.
// Every state uses the same function, so tweening between them is just interpolating numbers.
import { gsap } from "./lenis-gsap";

const { interpolate } = gsap.utils;

export interface ArchBox {
  /** arch width in px */
  w: number;
  /** arch height in px (bottom edge to crown) */
  h: number;
}

/** Arch of size {w,h} centered in a W×H frame. `open` 0..1 grows it to fill the frame. */
export function archClip(W: number, H: number, { w, h }: ArchBox, open = 0, rise = 1): string {
  const aw = interpolate(w, W, open);
  const ah = interpolate(h, H, open) * rise;
  const r = interpolate(w / 2, 0, open);
  const left = (W - aw) / 2;
  const bottom = interpolate((H - h) / 2, 0, open);
  const top = Math.max(0, H - bottom - ah);
  return `inset(${top.toFixed(1)}px ${left.toFixed(1)}px ${bottom.toFixed(1)}px ${left.toFixed(1)}px round ${r.toFixed(1)}px ${r.toFixed(1)}px 0px 0px)`;
}

/** A doorway proportion that fits the viewport: ~1 : 1.5. */
export function doorway(W: number, H: number, scale = 1): ArchBox {
  const h = Math.min(H * 0.58, W * 0.5) * scale;
  return { w: h / 1.5, h };
}
