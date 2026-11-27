# Adventure

Interactive fiction with unusual focuses. Each book is about **two weeks of reading at an hour a day** (a target for the whole book, not a structure inside it), and every book is published in two forms from the same source:

- **Web**: a reader that remembers your place, your choices and your codewords, and lets you put it down anywhere.
- **Print**: a classic page-based gamebook typeset with **LaTeX**: "If you…, turn to page 47", every branch starting at the top of a page, a codeword sheet, real-looking Slack threads, emails and pull requests. The build proof-reads the PDF to make sure every page reference lands on the right text.

## Books

| Book | Status |
|---|---|
| **[Headcount](books/headcount/)**: a software developer's year at a Berlin invoicing company, the year AI arrives and the headcount stops growing. Ultra-realistic: open office, Kantine, kicker, standups, PR reviews, PagerDuty, all-hands, works councils. | Sessions 1–3 of 14 written (~60 min each). Full plan in [`bible.md`](books/headcount/bible.md). |
| **[Next of Kin](books/next-of-kin/)**: a land surveyor buries his father in Struer and spends a year building the family tree: church books in Gothic script, DNA match lists, reading rooms, Facebook groups, doorbells in Thy. Ultra-realistic; some of what he finds he'd rather not know. | Chapters 1–2 of 14 written. Plan in [`bible.md`](books/next-of-kin/bible.md). |

## Working on a book

Several writers work here in parallel. Read [`AGENTS.md`](AGENTS.md) first: branches, claiming chapters, shared files, codewords and tooling rules.


```sh
npm install
npm run check      # validate links/codewords, show reading-time estimates
npm run build      # web edition into dist/
npm run pdf        # + print editions: <book>.pdf and <book>-1bit.pdf (1-bit B&W, grudgebook halftone)
npm run audit      # + structural audit → books/<book>/AUDIT.md
npm run serve      # http://localhost:8080
```

- Source format: [`docs/FORMAT.md`](docs/FORMAT.md). Plain Markdown passages, `* [choice](target)` links, `@set CODEWORD`, and fenced blocks for in-world documents (`slack`, `dm`, `email`, `pager`, `pr`, `terminal`, `calendar`, `doc`, `phone`).
- Print layout: [`tools/latex/template.tex`](tools/latex/template.tex). Per-book override: `books/<slug>/template.tex`.
- Codewords are the only state, so every book works on paper. Each book keeps a codeword ledger (`codewords.md`) with the planned payoff of every codeword; `npm run audit` explores every reachable state and fails loudly on dead ends, impossible choices, orphan codewords, or more codewords than the sheet holds.
- `npm run check` estimates reading time by simulating thousands of random read-throughs. Aim for about two weeks at an hour a day for the whole book (≈ 14 hours on an average read-through); chapters are as long as the story needs.

## Layout

```
books/<slug>/book.md         title, subtitle, blurb
books/<slug>/bible.md        story bible and chapter plan (not published)
books/<slug>/chapters/*.md   one file per chapter
tools/                       parser, validator, web + LaTeX renderers
web/                         reader JS/CSS
```
