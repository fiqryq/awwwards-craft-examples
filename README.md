# Awwwards Craft — Examples

Four example websites made with the `awwwards-craft` skill, in one project.

## Run it

```sh
npm install
npm run dev
```

Open http://localhost:4321

## Pages

| URL | Site |
| --- | --- |
| `/` | Gallery of all examples (with copy-prompt buttons) |
| `/example-001/` | Firstcrack — coffee roasting software |
| `/example-002/` | Sinyal — music festival |
| `/example-003/` | Lengkung — architecture studio |
| `/example-004/` | Bayang — black & white photo gallery |

## Tips

- The intro animation plays once per browser tab. Open a new tab to see it again.
- Add `?reduced` to a URL to see the version without animation.
- The big scroll effects only run on desktop-width screens (over 1000px).

## Where things are

- `src/examples/example-00N/` — everything for one site (its `BRIEF.md` explains the design)
- `src/examples/prompts.ts` — the prompt used for each site
- `src/pages/` — the routes

## Add a new example

Copy the template prompt from the gallery page, fill it in, and give it to Claude with the `awwwards-craft` skill.

Brands are fictional. Photos are from Unsplash (listed in each `BRIEF.md`).
