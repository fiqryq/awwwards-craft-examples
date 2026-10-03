// Layered overlay menu: three colored layers drop from the top (stagger 0.1), then links rise.
// Markup in Nav.astro: button.menu-toggle + #menu.menu[hidden] > .menu-layer*3 + .menu-panel
// Single page: in-page links close the menu first, then site.ts scrolls to the anchor.
import { gsap, SplitText, lenis, reducedMotion } from "./lenis-gsap";

const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  void document.fonts.ready.then(() => initMenu(toggle, menu));
}

function initMenu(toggle: HTMLButtonElement, menu: HTMLElement): void {
  let isOpen = false;
  let lastFocus: HTMLElement | null = null;
  const layers = menu.querySelectorAll<HTMLElement>(".menu-layer");
  const links = SplitText.create(menu.querySelectorAll(".menu-link"), { type: "lines", mask: "lines", linesClass: "line", aria: "none" });
  const subs = menu.querySelectorAll<HTMLElement>(".menu-sub");
  const rules = menu.querySelectorAll<HTMLElement>(".menu-item");
  gsap.set(links.lines, { yPercent: 105 });
  gsap.set(subs, { opacity: 0 });
  gsap.set(rules, { borderBottomColor: "transparent" });

  const r = reducedMotion;
  const tl = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      menu.hidden = true;
      lastFocus?.focus();
    },
  })
    .fromTo(layers, { scaleY: 0 }, { scaleY: 1, duration: r ? 0.01 : 0.75, ease: "power3.inOut", stagger: r ? 0 : 0.1 }, 0)
    .to(".toggle-word span", { yPercent: -100, duration: 0.5, ease: "power3.inOut" }, 0.1)
    .to(links.lines, { yPercent: 0, duration: r ? 0.01 : 0.9, stagger: 0.06, ease: "power4.out" }, r ? 0 : 0.6)
    .to(rules, { borderBottomColor: "rgba(229, 207, 79, 0.25)", duration: 0.4 }, r ? 0 : 0.8)
    .to(subs, { opacity: 1, duration: r ? 0.01 : 0.05, stagger: { amount: r ? 0 : 0.4, from: "random" } }, r ? 0 : 0.85);

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
      tl.timeScale(1).play();
      focusables()[0]?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      tl.timeScale(1.8).reverse(); // exits faster than entrances
    }
  };

  toggle.addEventListener("click", () => setOpen(!isOpen));
  menu.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", () => setOpen(false))
  );
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
