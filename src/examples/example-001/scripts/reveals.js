// Site-specific reveals: pricing cards, count-up numbers, smooth anchor links, trigger ordering.
import { gsap, ScrollTrigger, lenis } from "./lenis-gsap.js";
import { onPage } from "./lifecycle.js";

onPage("main", (root, { reduced, onCleanup }) => {
  // Smooth in-page anchors through Lenis (the pinned scene changes real offsets, Lenis handles it).
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : document.querySelector(id);
    if (target === null) return;
    e.preventDefault();
    // Measure without the menu's page push (.page may still be translated while the menu closes).
    const pushed = Number(gsap.getProperty(".page", "y")) || 0;
    const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - pushed;
    lenis ? lenis.scrollTo(y, { duration: 1.6, force: true }) : scrollTo({ top: y, behavior: "smooth" });
  };
  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));

  if (reduced) {
    gsap.set(root.querySelectorAll(".reveal-up"), { opacity: 1 });
    return;
  }

  ScrollTrigger.batch(root.querySelectorAll(".reveal-up"), {
    start: "top 85%", once: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }),
  });

  root.querySelectorAll("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const obj = { v: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(obj, {
      v: end, duration: 1.6, ease: "power3.out",
      onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });
});

// Triggers are created per component in source order, but pins change offsets below them:
// sort by position and refresh once fonts (and therefore line heights) are final.
document.fonts.ready.then(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
