// Circle-clip menu that grows from the toggle. Links rise in masked lines.
// Markup in Nav.astro: button.menu-toggle + #menu.menu[hidden] .menu-link* .menu-sub*
import { gsap, SplitText, lenis, reducedMotion } from "./lenis-gsap";

const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  void document.fonts.ready.then(() => initMenu(toggle, menu));
}

function initMenu(toggle: HTMLButtonElement, menu: HTMLElement): void {
  let isOpen = false;
  let lastFocus: HTMLElement | null = null;
  let tl: gsap.core.Timeline | null = null;
  const links = SplitText.create(menu.querySelectorAll(".menu-link"), { type: "lines", mask: "lines", linesClass: "line", aria: "none" });
  const subs = menu.querySelectorAll<HTMLElement>(".menu-sub");
  gsap.set(links.lines, { yPercent: 110 });
  gsap.set(subs, { opacity: 0 });

  // The circle grows from wherever the toggle is right now (it moves between breakpoints).
  const build = (): gsap.core.Timeline => {
    const r = toggle.getBoundingClientRect();
    const at = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    const radius = Math.hypot(window.innerWidth, window.innerHeight);
    const d = reducedMotion ? 0.01 : 1;
    return gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        menu.hidden = true;
        lastFocus?.focus();
      },
    })
      .fromTo(menu, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(${radius}px at ${at})`, duration: 1.2 * d, ease: "glide" }, 0)
      .to(".toggle-word span", { yPercent: -100, duration: 0.6, ease: "power3.inOut" }, 0.1)
      .to(links.lines, { yPercent: 0, duration: d, stagger: 0.08, ease: "power4.out" }, 0.55 * d)
      .to(subs, { opacity: 1, duration: 0.6 * d, stagger: 0.04, ease: "power2.out" }, 0.8 * d);
  };

  const focusables = (): HTMLElement[] => Array.from(menu.querySelectorAll<HTMLElement>("a, button"));

  const setOpen = (open: boolean): void => {
    if (open === isOpen) return;
    isOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    document.querySelector("main")?.toggleAttribute("inert", open);
    if (open) {
      lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      menu.hidden = false;
      lenis?.stop();
      tl?.kill();
      tl = build();
      tl.play();
      focusables()[0]?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      tl?.timeScale(1.7).reverse();
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
