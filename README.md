# Amanda C. Pegues — People OS

A fast, dependency-free personal portfolio and interactive clean-room People OS prototype.

## What is included

- Semantic, responsive HTML
- Accessible keyboard interactions and visible focus states
- Recruiter / hiring-leader / builder routing
- Interactive synthetic People OS demo
- Social sharing card and favicon
- GitHub Pages-ready file structure
- Automatic résumé fallback: if `assets/resume.pdf` is missing, the button becomes an email request

## Before publishing

1. Add the current résumé as `assets/resume.pdf`.
2. Read every public claim and make sure it is accurate and employer-safe.
3. Replace `YOURCODE` in `index.html` only if GoatCounter analytics is enabled.
4. After the final URL exists, add an absolute canonical URL and absolute Open Graph image URL in `index.html`.
5. Test the email, LinkedIn, and résumé links.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish

See [PUBLISHING.md](PUBLISHING.md) for GitHub Desktop, command-line, and GitHub Pages instructions.

## Editing guide

- Page content: `index.html`
- Colors and layout: `styles.css` variables at the top
- People OS workflow content and interactions: `script.js`
- Social share image: `assets/og-card.png`
- Site icon: `assets/favicon.svg`

## Privacy standard

All examples are synthetic. Do not commit confidential employer, client, candidate, or employee information to this public repository.
