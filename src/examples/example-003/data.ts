// Content for Lengkung — a fictional architecture studio in Yogyakarta.
import type { ImageMetadata } from "astro";
import hero from "./assets/hero.jpg";
import arches from "./assets/arches.jpg";
import curve from "./assets/curve.jpg";
import stair from "./assets/stair.jpg";
import courtyard from "./assets/courtyard.jpg";
import glass from "./assets/glass.jpg";
import angle from "./assets/angle.jpg";
import living from "./assets/living.jpg";
import villa from "./assets/villa.jpg";
import bath from "./assets/bath.jpg";
import bluecurve from "./assets/bluecurve.jpg";

export { hero };

/** Photos the preloader arch flicks through; the last one is the hero. */
export const PRELOAD: ImageMetadata[] = [arches, curve, stair, courtyard, hero];

export interface Room {
  name: string;
  project: string;
  place: string;
  year: number;
  note: string;
  img: ImageMetadata;
  alt: string;
}

export const ROOMS: Room[] = [
  {
    name: "The arcade", project: "Langgar Ngasem", place: "Ngasem, Yogyakarta", year: 2024,
    note: "Seven plastered arches step down to the ablution court. Shade first, then the view.",
    img: arches, alt: "A white plastered arcade of repeated arches stepping down a stair",
  },
  {
    name: "The stair", project: "Rumah Dua Teras", place: "Kaliurang, Sleman", year: 2023,
    note: "A stair that is also a reading room — every landing faces a different window.",
    img: stair, alt: "A bright stairwell with timber handrails and white walls",
  },
  {
    name: "The light well", project: "Omah Sumur", place: "Kotagede, Yogyakarta", year: 2022,
    note: "Brick curves pull noon light four storeys down into the kitchen.",
    img: curve, alt: "Curved terracotta walls rising toward a blue sky",
  },
  {
    name: "The garden", project: "Rumah Kabut", place: "Tawangmangu, Karanganyar", year: 2025,
    note: "The last threshold is outside: timber box, deep eaves, a lawn for the mist to sit on.",
    img: courtyard, alt: "A timber-clad modern house opening onto a gravel garden",
  },
];

export interface Project {
  name: string;
  type: string;
  place: string;
  year: number;
  img: ImageMetadata;
  alt: string;
}

export const PROJECTS: Project[] = [
  { name: "Rumah Kabut", type: "House", place: "Tawangmangu", year: 2025, img: glass, alt: "Glass-walled living room opening to a pool" },
  { name: "Langgar Ngasem", type: "Prayer house", place: "Yogyakarta", year: 2024, img: bluecurve, alt: "Curved balconies seen from below against the sky" },
  { name: "Rumah Dua Teras", type: "House", place: "Sleman", year: 2023, img: living, alt: "A calm living room with linen sofas and tall windows" },
  { name: "Paviliun Kali Code", type: "Public pavilion", place: "Yogyakarta", year: 2023, img: angle, alt: "A white angular building with a faceted facade" },
  { name: "Omah Sumur", type: "House + studio", place: "Kotagede", year: 2022, img: bath, alt: "A dark-tiled bathroom with a freestanding tub" },
  { name: "Wisma Tepi", type: "Guesthouse", place: "Gunungkidul", year: 2021, img: villa, alt: "A white villa with a long pool" },
];

export const STEPS = [
  { n: "01", title: "Listen", body: "Two weeks on your land before a single line: where the sun lands at 7am, where the rain runs, where you take your shoes off." },
  { n: "02", title: "Draw by hand", body: "Sections first, plans second. We build card models at 1:50 and walk them with you, threshold by threshold." },
  { n: "03", title: "Build with the tukang", body: "We work with the same three crews from Bantul and Klaten. Brick, teak and lime plaster, sourced inside 60 km." },
  { n: "04", title: "Stay a year", body: "We visit through one full wet and dry season and adjust shading, gutters and planting after you move in." },
] as const;
