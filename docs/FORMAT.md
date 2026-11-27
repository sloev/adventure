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

A passage with a single unconditional choice is a "continue". In print, if the target is the next section it simply flows on; otherwise the reader is told which section to turn to. Every passage with choices must have at least one unconditional choice.

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

Sections are numbered in authored order. A choice that leads to the very next
section prints as a quiet fleuron, so linear stretches read like a novel; real
choices print as a dotted list with *turn to N*. In the PDF every section
number is a link.

Requirements (Debian/Ubuntu): `texlive-xetex texlive-latex-extra
texlive-fonts-recommended tex-gyre fonts-texgyre fonts-dejavu`.
