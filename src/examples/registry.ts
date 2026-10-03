// The gallery at / is generated from this list. Add an entry when you add src/examples/example-00N.
import type { ImageMetadata } from "astro";
import p001 from "../assets/previews/001.jpg";
import p001b from "../assets/previews/001-b.jpg";
import p002 from "../assets/previews/002.jpg";
import p002b from "../assets/previews/002-b.jpg";
import p003 from "../assets/previews/003.jpg";
import p003b from "../assets/previews/003-b.jpg";
import p004 from "../assets/previews/004.jpg";
import p004b from "../assets/previews/004-b.jpg";

export interface ExampleEntry {
  n: string;
  href: string;
  name: string;
  kind: string;
  concept: string;
  palette: { no: number; colors: string[] };
  type: string;
  signature: string;
  variants: string;
  preview: ImageMetadata;
  previewAlt: ImageMetadata;
}

export const EXAMPLES: ExampleEntry[] = [
  {
    n: "001", href: "/example-001/", name: "Firstcrack", kind: "SaaS · roast management software",
    concept: "Every roast is a curve — scroll heats the bean and draws a live roast curve from charge to drop.",
    palette: { no: 7, colors: ["#fdf2de", "#3b60c5"] },
    type: "Cabinet Grotesk + Satoshi + JetBrains Mono",
    signature: "Pinned roast curve with live BT / RoR readouts",
    variants: "Counter preloader · bottom-clip menu",
    preview: p001, previewAlt: p001b,
  },
  {
    n: "002", href: "/example-002/", name: "Sinyal", kind: "Festival · broadcast sound, Jakarta",
    concept: "The festival is a radio band — scrolling turns the dial, and each stage locks in out of the static.",
    palette: { no: 6, colors: ["#e5cf4f", "#190bb6"] },
    type: "Khand + Switzer + DM Mono",
    signature: "Pinned FM tuner: needle, waveform and stage line-ups",
    variants: "Block-grid preloader · layered menu",
    preview: p002, previewAlt: p002b,
  },
  {
    n: "003", href: "/example-003/", name: "Lengkung", kind: "Architecture studio, Yogyakarta",
    concept: "A house is a sequence of thresholds — every key moment is entered through an arch that opens into the next room.",
    palette: { no: 2, colors: ["#e0dee1", "#0f0f0f"] },
    type: "Boska + General Sans",
    signature: "Pinned arches you walk through, room by room",
    variants: "Arch-window preloader · circle-clip menu",
    preview: p003, previewAlt: p003b,
  },
  {
    n: "004", href: "/example-004/", name: "Bayang", kind: "Photography gallery, Bandung",
    concept: "A darkroom you scroll through — prints arrive as negatives and develop into positives as they cross a line of light.",
    palette: { no: 4, colors: ["#ffffff", "#000000"] },
    type: "Gambarino + Supreme",
    signature: "Pinned negative → positive strip split by a line of light",
    variants: "Aperture iris preloader · curtain menu with page push",
    preview: p004, previewAlt: p004b,
  },
];
