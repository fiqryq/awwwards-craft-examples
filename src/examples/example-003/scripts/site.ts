// Site-wide behaviour for Lengkung: smooth anchors, reveals, word fill, live clock.
import { gsap, ScrollTrigger, SplitText, lenis } from "./lenis-gsap";
import { onPage } from "./lifecycle";

onPage("main", (root, { ctx, reduced, onCleanup }) => {
  const onClick = (e: MouseEvent): void => {
    const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!a) return;
    const id = a.getAttribute("href") ?? "";
    const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
    if (lenis) lenis.scrollTo(y, { duration: 1.8, force: true });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };
  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));

  // Live clocks: [data-clock="Asia/Jakarta"]
  const clocks = root.querySelectorAll<HTMLElement>("[data-clock]");
  const tick = (): void => {
    clocks.forEach((el) => {
      el.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: el.dataset.clock ?? "Asia/Jakarta", hour: "2-digit", minute: "2-digit",
      }).format(Date.now());
    });
  };
  tick();
  const id = window.setInterval(tick, 10_000);
  onCleanup(() => window.clearInterval(id));

  const ups = root.querySelectorAll<HTMLElement>(".reveal-up");
  const fills = root.querySelectorAll<HTMLElement>("[data-fill]");
  if (reduced) {
    gsap.set(ups, { opacity: 1 });
    return;
  }

  ScrollTrigger.batch(ups, {
    start: "top 88%", once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.08 }),
  });

  // Word fill: words go from muted to full ink as the paragraph scrolls through the viewport.
  void document.fonts.ready.then(() => {
    ctx.add(() => {
      fills.forEach((el) => {
        const split = SplitText.create(el, { type: "words", wordsClass: "word", aria: "none" });
        const words = split.words;
        gsap.set(words, { opacity: 0.4 });
        ScrollTrigger.create({
          trigger: el, start: "top 75%", end: "bottom 40%", scrub: true,
          onUpdate: (self) => {
            const lit = Math.floor(self.progress * words.length);
            words.forEach((w, i) => gsap.set(w, { opacity: i < lit ? 1 : 0.4 }));
          },
        });
      });
    });
  });
});

void document.fonts.ready.then(() => {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});
