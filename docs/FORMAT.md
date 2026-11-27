# Book source format

Every book lives in `books/<slug>/`:

```
books/<slug>/
  book.md          metadata (front matter) + blurb (body)
  bible.md         writers' notes, never published
  chapters/
    01-kickoff.md  one file per reading session (~1 hour)
    02-....md
```

Chapters are read in filename order. A chapter is one **session**: the reader is told when one ends and invited to stop for the day. Aim for about an hour on a single path through each session; `npm run stats` measures it.

## Chapter files

```markdown
---
title: Kickoff
subtitle: Monday, 12 January
---

:: s1-alarm
The alarm goes at 06:40. ...

* [Take the bike](s1-bike)
* [Take the U-Bahn](s1-ubahn)

:: s1-bike
...
* [Continue](s1-office)
```

- `:: passage-id` starts a passage. IDs are global to the book, so prefix them by session (`s1-`, `s2-` …).
- The first passage of the first chapter is where the book begins. The first passage of each chapter is that session's start.
- Passage text is Markdown. `---` on its own line becomes a scene break (⁂).

### Choices

```markdown
* [Text the reader clicks](target-id)
* [Only shown with a codeword](target-id) if REVIEWED
* [Needs both](target-id) if MENTOR, KICKER
* [Hidden if you have it](target-id) unless HOLDOUT
```

Every real choice also carries its **print wording** after a `|`. The web edition shows the short button text; the print edition prints the classic gamebook sentence and adds the page number:

```markdown
* [Take the bike. It's only drizzle.](s1-bike) | If you take the bike, sleet or no sleet
* [Take the U-Bahn.](s1-ubahn) | If you take the U-Bahn and read Slack on the way in
* [Ask about the data.](s2-ask-data) if ASKED | and want to follow up on your all-hands question
```

prints as

> If you take the bike, sleet or no sleet, turn to page **4**.
> If you take the U-Bahn and read Slack on the way in, turn to page **6**.
> If you have the codeword **ASKED** and want to follow up on your all-hands question, turn to page **31**.

For conditional choices the wording continues the sentence "If you have the codeword X …", so start it with *and*. A conditional `Continue` needs no wording ("If you have the codeword X, turn to page N."). A passage with a single unconditional choice is a "continue": in print it flows straight on, or says "Turn to page N." Every passage with choices must have at least one unconditional choice.

### Directives

| Directive | Meaning |
|---|---|
| `@set CODEWORD` | The reader gains a codeword. Print: "Note the codeword …". |
| `@clear CODEWORD` | The reader loses a codeword. |
| `@end Title of ending` | An ending. |
| `@tbc` | "To be continued" — for books still being written. |
| `@note anything` | A writer's note; never rendered. |

Codewords are UPPERCASE. They are the only state, because they must work on paper.

## In-world documents

Fenced blocks with these languages render as styled artifacts on the web and as clean boxes in print.

````markdown
```slack #settlements
Priya Raman [09:02]: Morning all :wave: standup at 9:45 as usual
Tobi Brandt [09:03]: morning!! I have something to show you all
  (continuation line of the same message)
~ :eyes: 3  :fire: 2
> Noor Haddad [09:05]: a thread reply
-- Today
```
````

- `Name [time]: text` starts a message; indented lines continue it; `~ ` lines are reactions; `> ` makes a thread reply; `-- label` is a date divider; any other line is a system line ("*Noor Haddad joined #settlements*").
- `dm Name` — a direct message, same syntax.
- `phone Contact` — text messages on a phone, same syntax.

````markdown
```email
From: Karin Sommer <karin.sommer@kontor.de>
To: Jakob Lenz
Subject: Quick sync

Body in **Markdown**.
```

```pager P1
title: [Datadog] debit-gateway: duplicate collection rate > 0.5%
service: debit-gateway
urgency: high
assigned: Jakob Lenz

Optional monospace detail line.
```

```pr #4821 Dunning: smart retries for failed SEPA debits
status: open
author: tobibrandt
changes: +1,912 −204 · 31 files
reviewers: jakob-lenz, otto-bot
---
otto-bot [10:14]: Summary of changes …
jakob-lenz [14:02]: `DebitRetryWorker.kt:118` …
```

```terminal ~/src/reconciler (main)
$ ./gradlew test
```

```calendar Monday 12 January
09:45–10:00 Settlements standup
11:00–12:00 All-hands: Kickoff
```

```doc Confluence · Settlements / Runbooks
Any **Markdown**, including tables.
```
````

## Commands

```
npm run check     validate every book and print reading-time stats
npm run stats     same, then build
npm run build     build dist/ (web reader, library page, LaTeX source)
npm run pdf       build, then typeset the print editions with XeLaTeX
npm run serve     serve dist/ on http://localhost:8080
```

## Print edition (LaTeX)

The book layout is done by LaTeX. `tools/lib/latex.mjs` turns passages and
artifact blocks into macros (`\gbsec`, `\gbchoice`, `gbslack`, `gbpr`, …) that
are defined in `tools/latex/template.tex`, which owns every typographic
decision: A5 trim, TeX Gyre Pagella body text, section-range running heads,
codeword sheet, in-world document boxes, emoji (via `twemojis`). To restyle a
single book, copy the template to `books/<slug>/template.tex` and edit it.

The print edition is a **page-based gamebook** in the classic choose-your-path tradition:

- The reader navigates by **page number** ("turn to page 47"). Page numbers are resolved by LaTeX (`\pageref`), and XeLaTeX is rerun until they are stable.
- **Every passage that can be jumped to starts at the top of a new page.** A passage flows on from the previous one only when that is its single way in, so a reader never reads into a branch they didn't choose.
- Choices sit at the end of a passage as full sentences: *If you …, turn to page N.*
- Codewords are written on a codeword sheet in the front matter (as in Fabled Lands or Lone Wolf); conditional choices ask *If you have the codeword X …*.
- Each session ends with a box telling the reader which page to write down as a bookmark.
- Endings print *The End*; unfinished books print *To be continued …*.
- The front matter tells the reader not to read straight through.
- `npm run pdf` **proof-reads the PDF**: it extracts the text of every page and checks that each passage really starts on the page it is referenced as. A wrong page reference fails the build.
- In the PDF every page reference is also a link.

### Two PDFs

`npm run pdf` produces both:

- `dist/<book>/<book>.pdf`: the edition as designed, with greys, colour avatars and emoji, links and searchable text.
- `dist/<book>/<book>-1bit.pdf`: a **strictly 1-bit black-and-white print master**. The same LaTeX is compiled with `\gbonebit` (no grey text or rules; text never sits on a tint), every page is rasterised at 1200 dpi without anti-aliasing, and every remaining tone is screened with the stochastic clustered-dot halftone from [sloev/grudgebook](https://github.com/sloev/grudgebook) (`tools/onebit/halftone.c`, vendored unchanged; `dot_threshold` and `dot_gain_inverse` ported from its `halftone.py`). Pages are CCITT Group 4, 1 bit per pixel; the build checks every image with `pdfimages`. Layout and page numbers are identical to the colour edition.

Set `ONEBIT_DPI=600` for faster proofs, or pass `--no-1bit` to skip it.

Requirements (Debian/Ubuntu): `texlive-xetex texlive-latex-extra
texlive-fonts-recommended tex-gyre fonts-texgyre fonts-dejavu`, plus `poppler-utils`, and for the 1-bit edition Python 3 with NumPy and Pillow and a C compiler.
