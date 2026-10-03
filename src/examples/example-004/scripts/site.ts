// Site-wide behaviour for Bayang: anchors, reveals, open/closed status, clock.
import { gsap, ScrollTrigger, lenis } from "./lenis-gsap";
import { onPage } from "./lifecycle";
import { HOURS, DAYS } from "../data";

/** Document offset from layout (offsetTop chain): unaffected by the menu's page push. */
const absTop = (el: HTMLElement): number => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
  }
  return y;
};

/** Gallery-local weekday + decimal hour. */
const jakartaNow = (): { day: number; hour: number; time: string } => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string): string => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const h = Number(get("hour"));
  const m = Number(get("minute"));
  return { day, hour: h + m / 60, time: `${get("hour")}:${get("minute")}` };
};

const status = (): string => {
  const { day, hour } = jakartaNow();
  const today = HOURS[day];
  if (today && hour >= today[0] && hour < today[1]) return `Open now · until ${today[1]}:00`;
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (!h) continue;
    if (i === 0 && hour < h[0]) return `Closed · opens today ${h[0]}:00`;
    if (i > 0) return `Closed · opens ${i === 1 ? "tomorrow" : DAYS[d]} ${h[0]}:00`;
  }
  return "Closed";
};

onPage("main", (root, { reduced, onCleanup }) => {
  const onClick = (e: MouseEvent): void => {
    const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!a) return;
    const id = a.getAttribute("href") ?? "";
    const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    const y = target === 0 ? 0 : absTop(target);
    if (lenis) lenis.scrollTo(y, { duration: 1.8, force: true });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };
  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));

  // Live status + clock + today's row in the hours table.
  const statuses = root.querySelectorAll<HTMLElement>("[data-status]");
  const clocks = root.querySelectorAll<HTMLElement>("[data-clock]");
  const tick = (): void => {
    const now = jakartaNow();
    statuses.forEach((s) => { s.textContent = status(); });
    clocks.forEach((c) => { c.textContent = now.time; });
    root.querySelectorAll<HTMLElement>("[data-day]").forEach((row) => {
      row.classList.toggle("is-today", Number(row.dataset.day) === now.day);
    });
  };
  tick();
  const id = window.setInterval(tick, 20_000);
  onCleanup(() => window.clearInterval(id));

  const ups = root.querySelectorAll<HTMLElement>(".reveal-up");
  const clips = Array.from(root.querySelectorAll<HTMLElement>(".reveal-clip")).filter((c) => !c.closest(".hero"));
  if (reduced) {
    if (ups.length) gsap.set(ups, { opacity: 1 });
    if (clips.length) gsap.set(clips, { clipPath: "none" });
    return;
  }
  ScrollTrigger.batch(ups, {
    start: "top 88%", once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.07 }),
  });
  clips.forEach((c) => {
    gsap.timeline({ scrollTrigger: { trigger: c, start: "top 85%", once: true } })
      .to(c, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "hop" }, 0)
      .fromTo(c.querySelector("img"), { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "glide" }, 0);
  });
});

void document.fonts.ready.then(() => {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});
