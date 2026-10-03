// First-visit preloader: the gallery mark's frame draws in uneven steps (like an exposure),
// the aperture dot appears, then it opens as a white iris that fills the screen onto the hero.
// Hero entrance runs on every visit.
import { gsap, ScrollTrigger, lenis, reducedMotion } from "./lenis-gsap";
import { onPage } from "./lifecycle";
import { revealCopy } from "./copy-reveal";

let resolveIntro: () => void = () => {};
export const introDone: Promise<void> = new Promise<void>((resolve) => { resolveIntro = resolve; });

const el = document.querySelector<HTMLElement>(".preloader");
const firstVisit = document.documentElement.classList.contains("first-visit");

if (!el || !firstVisit || reducedMotion) {
  el?.remove();
  resolveIntro();
} else {
  lenis?.stop();
  void document.fonts.ready.then(() => {
    const frame = el.querySelector<SVGPathElement>(".mark-frame");
    const dot = el.querySelector<SVGCircleElement>(".mark-dot");
    const iris = el.querySelector<HTMLElement>(".pre-iris");
    const count = el.querySelector<HTMLElement>(".pre-count");
    const labels = el.querySelectorAll(".label");
    const len = frame?.getTotalLength() ?? 448;
    if (frame) gsap.set(frame, { strokeDasharray: len, strokeDashoffset: len });
    if (dot) gsap.set(dot, { scale: 0, opacity: 1, transformOrigin: "50% 50%" });

    // Iris starts exactly on the dot, so the aperture "opens" rather than appearing.
    // (measured from the SVG's own size: the dot is 30/120 of the mark, centred)
    const svg = el.querySelector<SVGSVGElement>(".mark")?.getBoundingClientRect();
    const r0 = svg ? (svg.width * 30) / 120 : 0;
    const R = Math.hypot(window.innerWidth, window.innerHeight);

    const progress = { v: 0 };
    const stops = [0.12, 0.31, 0.38, 0.62, 0.7, 0.88, 1]; // uneven exposure steps
    const tl = gsap.timeline({ delay: 0.4 });
    tl.from(labels, { opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 0);
    stops.forEach((s, i) => {
      tl.to(progress, {
        v: s, duration: 0.32, ease: "power3.inOut",
        onUpdate: () => {
          if (frame) frame.style.strokeDashoffset = String(len * (1 - progress.v));
          if (count) count.textContent = String(Math.round(progress.v * 100)).padStart(3, "0");
        },
      }, 0.2 + i * 0.34);
    });
    tl.to(dot, { scale: 1, duration: 0.9, ease: "power3.out" }, 2.5)
      .to(labels, { opacity: 0, duration: 0.3, ease: "power2.in" }, 3.0)
      .fromTo(iris, { clipPath: `circle(${r0}px at 50% 50%)` }, { clipPath: `circle(${R}px at 50% 50%)`, duration: 1.3, ease: "hop" }, 3.2)
      .add(() => {
        resolveIntro();
        sessionStorage.setItem("seen-004", "1");
        document.documentElement.classList.remove("first-visit");
        el.remove();
        lenis?.start();
        ScrollTrigger.refresh(true);
      }, 4.5);
  });
}

// Hero entrance: runs on every visit.
onPage(".hero", (root, { ctx, reduced }) => {
  const manual = root.querySelectorAll<HTMLElement>("[data-copy-manual]");
  const fades = root.querySelectorAll<HTMLElement>(".reveal-fade");
  const clips = root.querySelectorAll<HTMLElement>(".reveal-clip");
  if (reduced) {
    // gsap.set warns on empty lists; only touch what this hero actually has
    if (manual.length) gsap.set(manual, { visibility: "visible" });
    if (fades.length) gsap.set(fades, { opacity: 1 });
    if (clips.length) gsap.set(clips, { clipPath: "none" });
    return;
  }
  void Promise.all([introDone, document.fonts.ready]).then(() => {
    ctx.add(() => {
      manual.forEach((node, i) => revealCopy(node, { delay: i * 0.12 }));
      gsap.to(clips, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "hop", delay: 0.25 });
      gsap.fromTo(root.querySelectorAll(".reveal-clip img"), { scale: 1.5 }, { scale: 1, duration: 1.8, ease: "glide", delay: 0.25 });
      gsap.to(fades, { opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.7, stagger: 0.06 });
    });
  });
});
