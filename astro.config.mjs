// @ts-check
import { defineConfig, fontProviders } from "astro/config";
// Each example owns its own font variables; a layout only emits the <Font> tags it uses,
// so a page never loads another example's fonts.
export default defineConfig({
  fonts: [
    // index (gallery)
    { provider: fontProviders.fontshare(), name: "General Sans", cssVariable: "--font-index", weights: [400, 500, 600] },

    // example-001 · Firstcrack
    { provider: fontProviders.fontshare(), name: "Cabinet Grotesk", cssVariable: "--font-display", weights: [800] },
    { provider: fontProviders.fontshare(), name: "Satoshi", cssVariable: "--font-body", weights: [400, 500, 700] },
    { provider: fontProviders.google(), name: "JetBrains Mono", cssVariable: "--font-mono", weights: [400, 500] },

    // example-002 · Sinyal
    { provider: fontProviders.fontshare(), name: "Khand", cssVariable: "--f2-display", weights: [700] },
    { provider: fontProviders.fontshare(), name: "Switzer", cssVariable: "--f2-body", weights: [400, 500] },
    { provider: fontProviders.google(), name: "DM Mono", cssVariable: "--f2-mono", weights: [400, 500] },

    // example-003 · Lengkung
    { provider: fontProviders.fontshare(), name: "Boska", cssVariable: "--f3-display", weights: [500], styles: ["normal", "italic"] },
    { provider: fontProviders.fontshare(), name: "General Sans", cssVariable: "--f3-body", weights: [300, 400, 500] },

    // example-004 · Bayang
    { provider: fontProviders.fontshare(), name: "Gambarino", cssVariable: "--f4-display", weights: [400] },
    { provider: fontProviders.fontshare(), name: "Supreme", cssVariable: "--f4-body", weights: [300, 400, 500] },
  ],
});
