// Black curtain menu: it drops from the top while the page shell is pushed down and away.
// Markup in Nav.astro: button.menu-toggle + #menu.menu[hidden] .menu-link* .menu-sub*
import { gsap, ScrollTrigger, SplitText, lenis, reducedMotion } from "./lenis-gsap";
import { CLIP } from "./eases";

const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  void document.fonts.ready.then(() => initMenu(toggle, menu));
}

function initMenu(toggle: HTMLButtonElement, menu: HTMLElement): void {
  let isOpen = false;
  let lastFocus: HTMLElement | null = null;
  const links = SplitText.create(menu.querySelectorAll(".menu-link"), { type: "lines", mask: "lines", linesClass: "line", aria: "none" });
  const subs = menu.querySelectorAll<HTMLElement>(".menu-sub");
  gsap.set(links.lines, { yPercent: 110 });
  gsap.set(subs, { opacity: 0 });

  const d = reducedMotion ? 0.01 : 1;
  const tl = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      menu.hidden = true;
      lastFocus?.focus();
    },
  })
    .to(menu, { clipPath: CLIP.full, duration: 1.2 * d, ease: "hop" }, 0)
    .to(".toggle-word span", { yPercent: -100, duration: 0.6, ease: "power3.inOut" }, 0.1)
    .to(links.lines, { yPercent: 0, duration: d, stagger: 0.07, ease: "power4.out" }, 0.7 * d)
    .to(subs, { opacity: 1, duration: 0.6 * d, stagger: 0.06, ease: "power2.out" }, 0.95 * d);

  const focusables = (): HTMLElement[] => Array.from(menu.querySelectorAll<HTMLElement>("a, button"));

  const setOpen = (open: boolean): void => {
    if (open === isOpen) return;
    isOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    document.querySelector("main")?.toggleAttribute("inert", open);
    // Moving .page while a pin is active would make the pinned section jump: skip the push then.
    const pinActive = ScrollTrigger.getAll().some((t) => t.pin && t.isActive);
    if (open) {
      lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      menu.hidden = false;
      lenis?.stop();
      tl.timeScale(1).play();
      if (!reducedMotion && !pinActive) gsap.to(".page", { y: "45vh", scale: 0.92, transformOrigin: "50% 0%", duration: 1.2, ease: "hop", overwrite: true });
      focusables()[0]?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      tl.timeScale(1.6).reverse();
      gsap.to(".page", { y: 0, scale: 1, duration: 0.9, ease: "hop", overwrite: true, clearProps: "transform" });
    }
  };

  toggle.addEventListener("click", () => setOpen(!isOpen));
  menu.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Tab") {
      const items = [toggle, ...focusables()];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
      e.preventDefault();
      items[next]?.focus();
    }
  });
}
