# Leonida Legend — GTA VI Trophy Guide & Tracker

[![make.fun](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/AT79x/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/AT79x/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

An offline guide and tracker for all **55 PlayStation 5 trophies** of
Grand Theft Auto VI, built for make.fun's **GTA 6 trophy guide** bounty
(`gta6-trophy-guide-01`). Every trophy has its official name, description
and grade as PlayStation publishes it, plus a guide in our own words that
names its sources, a roadmap to the platinum, and a checklist that saves
your progress.

## What it covers

- **All 55 trophies** — 1 platinum (“Vice Got a Price!”), 2 gold, 6 silver,
  46 bronze, 28 hidden. Official names and descriptions shown verbatim;
  every guide written in our own words, each citing its sources
  (PowerPyx, Kengamer, Output Lag, GTA Vice City Hub, GTA Zone,
  Exophase / PSNProfiles).
- **Roadmap to the platinum** — story chapters 1–4 and the final mission,
  side-character finales, activities and collectibles, 100% completion
  last. About 200 hours, no online trophies, no difficulty trophies.
- **The one missable trophy** — Positive Mental Attitude: Lucia's balcony
  meditation in Chapter 1 disappears after that chapter and there is no
  mission replay, so the guide tells you to do it in Chapter 1 and keep a
  manual save at the start of every chapter.
- **Tracker** — checklist saved in localStorage, export progress to a
  file and import it back, filters (story, missable, collectibles,
  activities, online — the game has none — earned, remaining), search,
  and a spoiler-safe mode that hides story trophy names and descriptions
  until they are earned.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Static files only — `app/index.html` and its ES modules, no build step,
no network requests at runtime. Deterministic screenshot views:
`?shot=checklist|detail|roadmap|filter`.

## How it is built

| File | Job |
| --- | --- |
| `app/index.html` | Page shell: hero, progress, roadmap, filters, checklist |
| `app/style.css` | Original Vice City sunset / neon look |
| `app/app.js` | Tracker: render, filters, spoiler mode, export/import, `?shot=` states |
| `app/data.js` | Loads `app/data/trophies.json`; list counts and story checks |
| `app/roadmap.js` | The six-step roadmap to the platinum |
| `app/data/trophies.json` | All 55 trophies: official name/description/grade, guide, sources, kind, missable flag, roadmap stage |
| `TROPHIES.md` | Verification notes: sources, the missable trophy, discrepancies |
| `main.ts` | Hands the entry in: copies `app/` + `screenshots/`, writes `dossier.json` |

## Screenshots

`shots.json` records the four views: checklist overview (cover), one
trophy's guide open with its sources, the roadmap to the platinum, and
the missable filter on.

## License

MIT. Unofficial fan guide — not affiliated with or endorsed by Rockstar
Games. No Rockstar logo, artwork or game screenshots are used.
