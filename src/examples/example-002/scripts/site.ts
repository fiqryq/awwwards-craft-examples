// Site-wide behaviour for Sinyal: smooth anchors, batch reveals, live countdown and clock.
import { gsap, ScrollTrigger, lenis } from "./lenis-gsap";
import { onPage } from "./lifecycle";

const pad = (n: number, len = 2): string => String(n).padStart(len, "0");

onPage("main", (root, { reduced, onCleanup }) => {
  // In-page anchors through Lenis (the tuner pin changes real offsets).
  const onClick = (e: MouseEvent): void => {
    const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!a) return;
    const id = a.getAttribute("href") ?? "";
    const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
    if (lenis) lenis.scrollTo(y, { duration: 1.6, force: true });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };
  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));

  // Countdown to doors: [data-countdown="ISO date"]
  const countdowns = root.querySelectorAll<HTMLElement>("[data-countdown]");
  // Live clocks: [data-clock="Asia/Jakarta"]
  const clocks = root.querySelectorAll<HTMLElement>("[data-clock]");
  const tick = (): void => {
    const now = Date.now();
    countdowns.forEach((el) => {
      const diff = Math.max(0, new Date(el.dataset.countdown ?? "").getTime() - now);
      const s = Math.floor(diff / 1000);
      el.textContent = diff
        ? `${pad(Math.floor(s / 86400), 3)}d ${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`
        : "On air now";
    });
    clocks.forEach((el) => {
      el.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: el.dataset.clock ?? "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit",
      }).format(now);
    });
  };
  tick();
  const id = window.setInterval(tick, 1000);
  onCleanup(() => window.clearInterval(id));

  const ups = root.querySelectorAll<HTMLElement>(".reveal-up");
  if (reduced) {
    gsap.set(ups, { opacity: 1 });
    return;
  }
  ScrollTrigger.batch(ups, {
    start: "top 88%", once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }),
  });
});

// Pins change offsets below them: sort and refresh once fonts are final.
void document.fonts.ready.then(() => {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});
