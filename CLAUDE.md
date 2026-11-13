# khalilsgueye.github.io

Static personal site on GitHub Pages: plain HTML, no build step. Sections are `writeups/`, `blog/`, `portfolio/` and `videos/`. All styling sits inline in each page, with `assets/retro.css` loaded last on every page as the site-wide retro theme (Times New Roman, blue header bar, flat boxes).

## Publishing from `_raw-content/`

This is the only way content gets added. The owner no longer uses the publishing bots.

The owner drops source content into the matching subfolder of `_raw-content/` at the repo root: one file per piece, in any format (.md, .txt, .docx, .pdf, rough notes), with a title at the top. Images can sit alongside it. The subfolder decides the section:

- `_raw-content/writeups/` → a new page in `writeups/`
- `_raw-content/blog/` → a new page in `blog/`
- `_raw-content/portfolio/` → a new page in `portfolio/`

Folders starting with `_` aren't published by GitHub Pages (Jekyll skips them), so raw drafts never go live.

When asked to "update the site", handle each file in those three subfolders, skipping `published/` and `.gitkeep`. If a file is sitting loose in `_raw-content/` itself, ask which section it belongs to.

**Format preference:** the owner wants one clean writeup made of plain paragraphs under subtitles. Use the source's own headings as the `h2` subtitles, in its order, with each section's text as `<p>` paragraphs in `.prose`. Don't add bullet lists, numbered step blocks or tag chips unless the source itself uses them. The top of the page has only the back link, the title, a `<p class="byline">Khalil Gueye</p>` line directly under the title, and a one-sentence summary.

1. **Read the whole source.** Keep the owner's words and facts. Clean up formatting and typos, but don't invent results, commands, flags or details. If something essential is missing (for a writeup: target, platform, difficulty, root cause), ask rather than guess.
2. **Pick a slug** from the title: lowercase, hyphenated, ASCII (for example `htb-sherlock-brutus`). Don't overwrite an existing page; if the slug is taken, ask.
3. **Build the page by copying the newest existing page in that section** and keeping its `<head>` and its inline `<style>`, nav, footer and the `<link rel="stylesheet" href="/assets/retro.css" id="retro-style">` line just before `</head>`. Set `<title>` to `<Title> — Khalil Gueye`, and replace only the content between the nav and the footer.
   - **Writeups** (template: `writeups/htb-sherlock-brutus.html`): `.case-hero` has a back link, `h1`, `p.summary`, a `.meta-strip` (Target / Platform / Difficulty / Root cause) and an `.attck-row` of `.chip` technique IDs (only if the source names them). `article.doc` holds one `<section>` per phase: `.sec-label` (Scenario, Enumeration, Foothold, Privilege Escalation, Closing Thoughts…), `h2`, paragraphs, commands in `<div class="term"><pre>…</pre></div>`, and "why it works" asides in `<div class="mech"><span class="lbl">Mechanism first</span><p>…</p></div>`. HTML-escape command output.
   - **Blog** (template: newest page in `blog/`): `section.hero` has a back link, `h1`, `p.summary` and `.tags`, followed by a `section.section` holding `div.prose`.
   - **Portfolio** (template: newest page in `portfolio/`): `section.hero` as in blog, then `section.section` blocks for "How it works" (`.steps` / `.step` / `.n`) and other sections in `.prose`.
4. **Images** in the source go in `assets/` and are referenced with relative paths.
5. **List it on the section index** (`<section>/index.html`): add a row in the format shown in the TEMPLATE comment directly above `<!-- NEW-WRITEUP-HERE -->`, and increase the number between `<!-- COUNT -->` and `<!-- /COUNT -->` by one.
6. **Move the source** (and its images, once they've been copied to `assets/`) into that subfolder's `published/` folder (for example `_raw-content/writeups/published/`).
7. **Check it locally.** Serve with `python3 -m http.server 8000` from the repo root and open the new page and the index.
8. **Don't commit or push unless asked.** Pushing publishes the site. Commit messages follow the existing pattern: `Add writeup: <Title>` and `List writeup: <Title>` (or `blog` / `portfolio`).

## Notes

- The `NEW-WRITEUP-HERE` and `COUNT` markers in the index pages came from the old bots. Keep using them, since they mark where new rows go.
- Before editing, run `git pull` in case anything was pushed from elsewhere.
- `archive/index.html` still references the deleted `nav.js`.
