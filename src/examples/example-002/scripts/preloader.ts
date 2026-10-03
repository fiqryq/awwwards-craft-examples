// First-visit preloader (grid of blocks + frequency sweep) and the hero entrance on every visit.
// The head script adds `first-visit` when !sessionStorage["seen-002"].
import { gsap, ScrollTrigger, lenis, reducedMotion } from "./lenis-gsap";
import { onPage } from "./lifecycle";
import { revealCopy } from "./copy-reveal";

let resolveIntro: () => void = () => {};
export const introDone: Promise<void> = new Promise<void>((resolve) => { resolveIntro = resolve; });

const el = document.querySelector<HTMLElement>(".preloader");
const firstVisit = document.documentElement.classList.contains("first-visit");
const HERO_OVERLAP = 0.7;

if (!el || !firstVisit || reducedMotion) {
  el?.remove();
  resolveIntro();
} else {
  lenis?.stop();
  void document.fonts.ready.then(() => {
    const tiles = el.querySelectorAll<HTMLElement>(".tile");
    const value = el.querySelector<HTMLElement>(".pre-freq-value");
    const status = el.querySelector<HTMLElement>(".pre-status");
    const content = el.querySelector<HTMLElement>(".pre-content");
    const sweep = { f: 87.5 };
    const END = 4.4;

    const tl = gsap.timeline({ delay: 0.3 });
    // flicker on: an even number of yoyo legs ends visible
    tl.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 0.05, repeat: 4, yoyo: true, ease: "none" }, 0)
      // tiles flicker while the dial searches
      .to(tiles, {
        opacity: () => gsap.utils.random(0.88, 1), duration: 0.06, repeat: 9, yoyo: true,
        stagger: { each: 0.004, from: "random" }, ease: "none",
      }, 0.2)
      .to(sweep, {
        f: 98.3, duration: 2.6, ease: "power2.inOut",
        onUpdate: () => { if (value) value.textContent = sweep.f.toFixed(1).padStart(5, "0"); },
      }, 0.2)
      .add(() => { if (status) status.textContent = "Locked · 98.3 MHz"; }, 2.8)
      .to(content, { opacity: 0, duration: 0.05, repeat: 3, yoyo: true }, 3.1)
      .set(content, { opacity: 0 }, 3.35)
      .to(tiles, { scaleY: 0, duration: 0.6, ease: "power3.in", stagger: { amount: 0.75, from: "random" } }, 3.3)
      .add(() => resolveIntro(), END - HERO_OVERLAP)
      .add(() => {
        sessionStorage.setItem("seen-002", "1");
        document.documentElement.classList.remove("first-visit");
        el.remove();
        lenis?.start();
        ScrollTrigger.refresh(true);
      }, END);
  });
}

// Hero entrance: runs on every visit.
onPage(".hero", (root, { ctx, reduced }) => {
  const manual = root.querySelectorAll<HTMLElement>("[data-copy-manual]");
  const fades = root.querySelectorAll<HTMLElement>(".reveal-fade");
  if (reduced) {
    gsap.set(manual, { visibility: "visible" });
    gsap.set(fades, { opacity: 1 });
    return;
  }
  void Promise.all([introDone, document.fonts.ready]).then(() => {
    ctx.add(() => {
      manual.forEach((node, i) => revealCopy(node, { delay: i * 0.12 }));
      gsap.to(fades, { opacity: 1, duration: 0.05, repeat: 3, yoyo: false, delay: 0.6, stagger: { each: 0.08, from: "random" } });
    });
  });
});
