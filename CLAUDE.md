# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / showcase site for Romain Desmeulemester, hosted on GitHub Pages at `https://v0latix.github.io/`.

**Stack:** Pure static HTML + CSS + vanilla JS — no build step, no framework, no package manager. Files are served directly by GitHub Pages.

**Deployment:** Push to `main` → GitHub Pages auto-deploys. No CI needed.

## Structure

```
index.html        # Hub page (landing)
pro.html          # Professional section: CV, projects, certifications, skills
perso.html        # Personal section: rating lists (films, beers, etc.)
css/styles.css    # Single stylesheet — all styles live here
js/theme.js       # Dark/light mode toggle (shared across all pages)
assets/           # Static assets: CV PDF, favicon, og-image
```

## Visual Identity

All styling must match the Flashcards project (`https://github.com/V0latix/Flashcards`). Key constraints:

- **Fonts:** Syne (display/headings, 800 weight) + Space Mono (body) — loaded from Google Fonts
- **`border-radius: 0` everywhere** — no rounded corners, ever
- **No `box-shadow`** (`--shadow: none`)
- **Borders:** `2px solid var(--border)` for structural elements, `1px` for lighter elements
- **Dark mode** via `data-theme="dark"` on `<html>` — toggled by `js/theme.js`, persisted in `localStorage`
- **Anti-FOUC** inline script in each page's `<head>` reads localStorage before render

### CSS tokens

```css
/* Light */
--surface: #eeeee8; --surface-muted: #e5e5df; --text: #0a0a0a;
--muted: #777777;   --border: #0a0a0a;         --primary: #1a56db;

/* Dark (on :root[data-theme="dark"]) */
--surface: #1a1a18; --surface-muted: #222220;  --text: #f0f0ee;
--muted: #888884;   --border: #333330;          --primary: #4d7aef;

/* Body background (not via custom property) */
/* Light: #f7f7f5   Dark: #0d0d0b */
```

## Adding content

**New project card** in `pro.html` — copy an existing `.card.project-card` block.

**New perso list** in `perso.html` — duplicate a `.list-card` article, update the emoji, title, and `list-count` span. Each entry is a `<tr>` with `.item-name`, `.item-meta`, and `.rating` cells. Rating uses `★☆` characters (1–5).

**New page** — copy the header/footer/nav from an existing page, add `is-active` class to the correct nav link.

## Key links

- GitHub: `https://github.com/V0latix`
- Flashcards demo: `https://v0latix.github.io/Flashcards/`
- LinkedIn: `https://www.linkedin.com/in/desmeulemester-romain-0563301b9/`
