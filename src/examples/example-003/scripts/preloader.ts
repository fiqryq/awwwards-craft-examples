// First-visit preloader: an arch rises, flicks through project photos while a counter runs,
// then opens to full screen on the hero photo (identical to the hero below), and is removed.
// Hero entrance runs on every visit.
import { gsap, ScrollTrigger, SplitText, lenis, reducedMotion } from "./lenis-gsap";
import { onPage } from "./lifecycle";
import { revealCopy } from "./copy-reveal";
import { archClip, doorway } from "./arch";

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
    const archEl = el.querySelector<HTMLElement>(".pre-arch");
    const imgs = Array.from(el.querySelectorAll<HTMLElement>(".pre-img"));
    const count = el.querySelector<HTMLElement>(".pre-count");
    const title = SplitText.create(el.querySelector(".pre-title"), { type: "chars", mask: "chars", charsClass: "char" });
    const ui = el.querySelectorAll(".pre-top p, .pre-count");

    const W = window.innerWidth;
    const H = window.innerHeight;
    const box = doorway(W, H, 0.62);
    const state = { rise: 0, open: 0 };
    const paint = (): void => { if (archEl) archEl.style.clipPath = archClip(W, H, box, state.open, state.rise); };
    paint();

    const n = { v: 0 };
    const tl = gsap.timeline({ delay: 0.4 });
    tl.from(ui, { opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }, 0)
      .from(title.chars, { yPercent: 105, duration: 1.1, ease: "power4.out", stagger: 0.05 }, 0.15)
      .to(n, {
        v: 100, duration: 3.1, ease: "power2.inOut",
        onUpdate: () => { if (count) count.textContent = String(Math.round(n.v)).padStart(3, "0"); },
      }, 0)
      .to(state, { rise: 1, duration: 1.1, ease: "hop", onUpdate: paint }, 0.2);
    // flick through the photos inside the arch; the last one (the hero) stays
    imgs.forEach((img, i) => {
      tl.set(img, { visibility: "visible" }, 0.2 + i * 0.55)
        .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.4, ease: "glide" }, 0.2 + i * 0.55);
    });
    tl.to(title.chars, { yPercent: -105, duration: 0.7, ease: "power3.in", stagger: 0.03 }, 3.2)
      .to(ui, { opacity: 0, duration: 0.4, ease: "power2.in" }, 3.3)
      .to(state, { open: 1, duration: 1.5, ease: "hop", onUpdate: paint }, 3.55)
      .add(() => {
        resolveIntro();
        sessionStorage.setItem("seen-003", "1");
        document.documentElement.classList.remove("first-visit");
        el.remove();
        lenis?.start();
        ScrollTrigger.refresh(true);
      }, 5.1);
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
      manual.forEach((node, i) => revealCopy(node, { delay: i * 0.15 }));
      gsap.to(fades, { opacity: 1, duration: 1, ease: "power2.out", delay: 0.5, stagger: 0.08 });
    });
  });
});
