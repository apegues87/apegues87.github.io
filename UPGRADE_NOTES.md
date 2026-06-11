# Upgrade notes

## Strategic changes

- Reframed the hero around the value proposition: people systems for complex organizations.
- Added a clearer senior-level identity: Principal HRBP, organizational architect, and talent systems designer.
- Replaced the ambiguous “LIVE” label with “INTERACTIVE” and “clean-room prototype.”
- Added a capability strip and stronger section introductions so a hiring leader can scan the page quickly.
- Refined visitor routing for recruiting, executive/hiring leaders, and technical builders.
- Preserved the original four operating patterns and enterprise deployment story while sharpening the language.

## Experience and accessibility

- Added a skip link and visible keyboard focus states.
- Converted expandable cards and experience entries to native `<details>` / `<summary>` controls.
- Converted every orbit node to a real button with `aria-pressed` state.
- Added live-region status messaging that announces demo completion without reading every typewriter character.
- Pauses motion during hover or keyboard focus and respects reduced-motion preferences.
- Improved mobile navigation, orbit scaling, CTA layout, and card stacking.

## Engineering changes

- Split the original single file into `index.html`, `styles.css`, and `script.js`.
- Added robust null checks, progressive enhancement, and browser API fallbacks.
- Added metadata for Open Graph, Twitter cards, theme color, and Schema.org Person markup.
- Added `404.html`, `.nojekyll`, `robots.txt`, favicon, and a 1200×630 social card.
- Added an automatic résumé fallback when `assets/resume.pdf` has not yet been uploaded.
- Added README and publishing instructions for GitHub Desktop, GitHub CLI, and standard Git.

## Validation performed

- JavaScript syntax validation with Node.
- HTML validation with `html-validate`.
- DOM interaction regression test for routing, model selection, demo execution, output generation, dynamic year, and résumé fallback.
- Local-reference and duplicate-ID checks.

## One required action before launch

Place the current résumé at `assets/resume.pdf`. Until then, the published site automatically changes the button from “Download résumé” to “Request résumé.”
