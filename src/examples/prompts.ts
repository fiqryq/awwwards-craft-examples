// Prompts that recreate each example with the awwwards-craft skill (shown + copyable on the gallery).
// Keep them in sync with each example's BRIEF.md.

export const PROMPTS: Record<string, string> = {
  "001": `Use the awwwards-craft skill to build a single-page site for "Firstcrack",
roast-management software for small specialty coffee roasteries (1–15 kg roasters).

Concept: every roast is a curve — scrolling heats the bean.
Palette #7: cream #FDF2DE + cornflower blue #3B60C5, no brown.
Fonts: Cabinet Grotesk Extrabold + Satoshi Medium + JetBrains Mono for live readouts.
Signature: a pinned scene where scroll draws the bean-temperature curve through
Drying → Maillard → First crack → Development → Drop, with live readouts
(bean temp °C, rate of rise, elapsed time). Mobile: a static annotated curve.
Sections: preloader, hero with a product dashboard mock, roastery marquee, the roast
scene, 4 sticky stacked module cards, numbers, 3 pricing tiers, testimonial, CTA,
footer with wordmark and live clock.
Preloader: temperature counter 020° → 205° with a progress bar, then clip away upward.
Menu: inline links on desktop, full overlay clipped in from the bottom on mobile.
No photography — UI mocks in HTML/CSS/SVG. Calm, precise motion.`,

  "002": `Use the awwwards-craft skill to build a single-page site for "Sinyal", a fictional
3-night broadcast-sound music festival at Pelabuhan Sunda Kelapa, Jakarta,
14–16 Nov 2026, with 4 stages and invented artists.

Concept: the festival is a radio band — scrolling turns the dial.
Palette #6: mustard #E5CF4F + ultramarine #190BB6.
Fonts: Khand Bold (condensed, uppercase) + Switzer + DM Mono.
Signature: a pinned FM tuner (87.5–108 MHz). A frequency scale slides under a fixed
needle; between stations the readout shows "No carrier" and the waveform is noise; at
each stage's frequency it locks, the waveform becomes a clean sine and that stage's
line-up rises in. Mobile: the stations as a stacked list.
Sections: type-only hero with a giant "SINYAL" and a live countdown, scroll-reactive
artist marquee, tuner, line-up by night (rows invert on hover), passes as ticket stubs
with % sold, harbour info + FAQ, footer with CTA, giant wordmark and Jakarta clock.
Preloader: a grid of blue blocks flickers while a frequency counter sweeps to
98.3 MHz, then the blocks collapse in random order.
Menu: three colored layers drop in from the top, then the links rise.
Loud, graphic, punchy motion.`,

  "003": `Use the awwwards-craft skill to build a single-page site for "Lengkung"
("arch"), a fictional architecture studio in Yogyakarta that designs houses, prayer
houses and small public buildings.

Concept: a house is a sequence of thresholds — every key moment is entered
through an arch-shaped doorway.
Palette #2: lavender-grey #E0DEE1 + ink #0F0F0F.
Fonts: Boska Medium (with italics) + General Sans Light/Regular.
Signature: a pinned "Thresholds" scene with 4 rooms. An arch opens in the middle
of the screen, grows to fill the viewport, and the next arch opens inside that
room. A paper caption card names each room. Mobile: stacked arch-topped images.
Sections: full-bleed photo hero with overlaid type ("Rooms for slow light"), practice
statement whose words fill in on scroll + stats, thresholds, project index rows with an
arch-shaped preview image that follows the cursor, process (sticky heading, 4 steps),
footer with CTA, giant wordmark and Yogyakarta clock.
Preloader: a small arch rises, flicks through 5 project photos with a 000→100
counter, then expands to full screen and becomes the hero photo.
Menu: a circle clip that grows from the menu button.
Use Unsplash architecture photos. Slow, quiet motion.`,

  "004": `Use the awwwards-craft skill to build a single-page site for "Bayang" ("shadow"),
a fictional free photography gallery on Jalan Braga, Bandung. Now showing:
"Sisa Cahaya — What light leaves", 7 invented photographers.

Concept: the site is a darkroom — works arrive as negatives and develop into
positives as they cross the light.
Colors: strictly black & white — palette #4, #FFFFFF + #000000; photos converted to
true greyscale.
Fonts: Gambarino (serif display) + Supreme.
Signature: a pinned horizontal strip of 7 prints moving past a fixed glowing vertical
line in the middle of the screen. Right of the line the page is inverted (black
background, negative prints); left of it everything is positive. Mobile: a vertical list.
Sections: split headline "What light / leaves / behind." with a small photo inset,
now-showing statement + credits, develop scene, programme rows that hard-invert on
hover, artist-name marquee + archive photos on black, visit info with live open/closed
status and today's hours highlighted, black footer with giant wordmark and clock.
Preloader: on black, a square frame draws in uneven steps, an aperture dot appears,
then it opens as a white iris that fills the screen onto the hero.
Menu: a black curtain drops while the page is pushed down and away.
Nav uses mix-blend-mode: difference. Hover states are hard inversions, not fades.`,
};

export const TEMPLATE = `Use the awwwards-craft skill to add example-00N to my awwwards-craft-examples project:
a single-page site for [brand], a [type of business] in [city].
Colors: [e.g. black & white / warm / pick from the palette library].
Mood: [3–4 words]. Signature idea (optional): [what scrolling should feel like].
Register it in the gallery like the others.`;
