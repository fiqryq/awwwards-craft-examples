// Content for Bayang — a fictional photography gallery in Bandung. Artists and works are invented.
import type { ImageMetadata } from "astro";
import circle from "./assets/circle.jpg";
import arcade from "./assets/arcade.jpg";
import portraitDark from "./assets/portrait-dark.jpg";
import portraitBun from "./assets/portrait-bun.jpg";
import portraitCalm from "./assets/portrait-calm.jpg";
import neon from "./assets/neon.jpg";
import stripes from "./assets/stripes.jpg";
import hood from "./assets/hood.jpg";
import towers from "./assets/towers.jpg";
import glass from "./assets/glass.jpg";
import block from "./assets/block.jpg";
import curves from "./assets/curves.jpg";

export const HERO = { img: circle, alt: "A young man sits on a ledge in front of a circular window, his shadow cast long across the wall" };
export const SIDE = { img: arcade, alt: "A woman in a long coat stands at the end of a vaulted arcade" };

export const EXHIBITION = {
  title: "Sisa Cahaya",
  english: "What light leaves",
  dates: "12 Sep — 30 Nov 2026",
  curator: "Curated by Ratri Anggraeni",
  rooms: "Rooms 1 — 3",
} as const;

export interface Work {
  artist: string;
  title: string;
  year: number;
  medium: string;
  img: ImageMetadata;
  alt: string;
}

export const WORKS: Work[] = [
  { artist: "Dimas Haryo", title: "Ledge, 16:40", year: 2025, medium: "Silver gelatin print, 50 × 62 cm", img: circle, alt: "A man seated before a circular window" },
  { artist: "Sekar Wulan", title: "Arcade (Braga)", year: 2024, medium: "Archival pigment print, 60 × 90 cm", img: arcade, alt: "A woman at the end of an arcade" },
  { artist: "Nadine Oei", title: "Sitter No. 7", year: 2026, medium: "Platinum-palladium print, 40 × 60 cm", img: portraitDark, alt: "Portrait of a woman against a dark ground" },
  { artist: "Arif Lubis", title: "Facade with Weather", year: 2023, medium: "Silver gelatin print, 75 × 50 cm", img: towers, alt: "Glass towers seen from below under heavy cloud" },
  { artist: "Maya Siregar", title: "Neon, Unlit", year: 2025, medium: "Archival pigment print, 60 × 90 cm", img: neon, alt: "A figure in striped trousers posing under a neon sign" },
  { artist: "Nadine Oei", title: "Sitter No. 11", year: 2026, medium: "Platinum-palladium print, 40 × 50 cm", img: portraitBun, alt: "Close portrait of a young woman with her hair tied up" },
  { artist: "Arif Lubis", title: "Curve Study II", year: 2024, medium: "Silver gelatin print, 50 × 64 cm", img: curves, alt: "Curving balconies of a tower against the sky" },
];

export interface Event {
  date: string;
  kind: string;
  title: string;
  note: string;
}

export const PROGRAMME: Event[] = [
  { date: "12.09", kind: "Opening", title: "Sisa Cahaya — opening night", note: "18:00 – 22:00 · free · all artists present" },
  { date: "27.09", kind: "Walkthrough", title: "With the curator", note: "Sat 11:00 · 45 min · 20 places" },
  { date: "11.10", kind: "Workshop", title: "Cyanotype to silver: a darkroom day", note: "Sat 10:00 – 16:00 · IDR 450K · materials incl." },
  { date: "25.10", kind: "Talk", title: "Nadine Oei on the slow portrait", note: "Sat 16:00 · free · Bahasa Indonesia" },
  { date: "08.11", kind: "Screening", title: "Shadows in Indonesian cinema, 1955 — 1980", note: "Sat 19:00 · 35mm · free" },
  { date: "06.12", kind: "Next", title: "Garis Tanah — new landscape photography", note: "Opens Sat 6 Dec 2026" },
];

export const ARTISTS = [
  "Dimas Haryo", "Sekar Wulan", "Nadine Oei", "Arif Lubis", "Maya Siregar", "Tirta Lembayung", "Putu Ardana",
];

export const PORTRAITS = [
  { img: portraitCalm, alt: "Portrait of a woman with slicked-back hair" },
  { img: stripes, alt: "Portrait of a woman in a striped shirt at dusk" },
  { img: hood, alt: "A man in a hoodie and denim jacket laughing against a wall" },
  { img: block, alt: "An apartment block with stacked balconies" },
  { img: glass, alt: "Reflective office towers converging overhead" },
];

/** Opening hours, gallery local time (Asia/Jakarta). 0 = Sunday. null = closed. */
export const HOURS: (readonly [number, number] | null)[] = [
  [10, 17], null, [10, 18], [10, 18], [10, 18], [10, 20], [10, 18],
];
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
