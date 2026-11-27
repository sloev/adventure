# Adventure

Interactive fiction with unusual focuses. Each book is about **two weeks of reading at an hour a day** (~14 sessions), and every book is published in two forms from the same source:

- **Web**: a reader that remembers your place, your choices and your codewords, and tells you when a session is a good place to stop.
- **Print**: a gamebook typeset with **LaTeX** (A5, numbered sections, a codeword sheet, real-looking Slack threads, emails and pull requests).

## Books

| Book | Status |
|---|---|
| **[Headcount](books/headcount/)**: a software developer's year at a Berlin invoicing company, the year AI arrives and the headcount stops growing. Ultra-realistic: open office, Kantine, kicker, standups, PR reviews, PagerDuty, all-hands, works councils. | Sessions 1–2 of 14 written (~60 min each). Full plan in [`bible.md`](books/headcount/bible.md). |

## Working on a book

```sh
npm install
npm run check      # validate links/codewords, show minutes-per-session
npm run build      # web edition into dist/
npm run pdf        # + print edition via XeLaTeX → dist/<book>/<book>.pdf
npm run serve      # http://localhost:8080
```

- Source format: [`docs/FORMAT.md`](docs/FORMAT.md). Plain Markdown passages, `* [choice](target)` links, `@set CODEWORD`, and fenced blocks for in-world documents (`slack`, `dm`, `email`, `pager`, `pr`, `terminal`, `calendar`, `doc`, `phone`).
- Print layout: [`tools/latex/template.tex`](tools/latex/template.tex). Per-book override: `books/<slug>/template.tex`.
- Codewords are the only state, so every book works on paper.
- `npm run check` estimates reading time by simulating thousands of random read-throughs. Aim for ~60 minutes per session.

## Layout

```
books/<slug>/book.md         title, subtitle, blurb
books/<slug>/bible.md        story bible and session plan (not published)
books/<slug>/chapters/*.md   one file per session
tools/                       parser, validator, web + LaTeX renderers
web/                         reader JS/CSS
```
