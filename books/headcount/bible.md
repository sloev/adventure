# Headcount — story bible

Working document for writers. Not part of the book.

## Promise

Ultra-realism. The drama is the drama of ordinary office life under pressure: who you sit with at lunch, what you write in a code review, whether you answer the pager on a Saturday, what you say when the People partner asks if you have "a minute". No villains, no conspiracies, no robots. Everyone is reasonable from where they stand. The reader should finish a session and think *that is exactly what it is like*.

Rules:

1. **Second person, present tense.** You are Jakob. Others call him Jakob, Jakob Lenz, or "Lenz" (Sasha only).
2. **Show the artifacts.** Slack threads, PR reviews, emails, PagerDuty pages, calendar views, Confluence pages, Slido questions. They carry at least a quarter of the information. Use the fenced blocks (see `docs/FORMAT.md`).
3. **Real mechanics.** SEPA direct debits, idempotency keys, Kafka consumers, German employment law (Kündigungsschutzgesetz, Sozialauswahl, Betriebsrat, Aufhebungsvertrag, Sozialplan), Elternzeit, Krankschreibung, Kita and Einschulung. Get them right.
4. **Time is real.** Each session covers one or a few concrete days. Dates are those of a year where 12 January is a Monday. Weather is Berlin weather.
5. **Choices are small and moral, not heroic.** Most choices change a relationship, a codeword, or what you learn. Branches rejoin quickly (branch-and-bottleneck). Big consequences surface sessions later, through codewords.
6. **Length is a whole-book property.** The finished book should be ~14 hours on a single path (≈190k words at 230 wpm), i.e. "an hour a day for two weeks" as a hint, never as structure. Chapters are as long as their story needs (so far 13–21k words written each). `npm run stats` measures it.
7. **Every real choice gets print wording** (`| If you …`): concrete, in the second person, without revealing what follows.
8. **No real company is depicted.** Real tools (Slack, GitHub, PagerDuty, Datadog, Jira, Google Meet, Personio) are fine as props. The AI system is Kontor's internal agent platform, **Otto**, named after the CEO's dog; the vendor is never named.

## Setting

**Kontor GmbH.** B2B invoicing, dunning and payments for small businesses in Germany, Austria and the Netherlands. ~420 employees (~140 in Product & Engineering). Founded 2015. Series D in 2023 at a valuation it is "growing into". ARR ~€70m, burning money more slowly than before.

**The office.** Floors 3 and 4 of a converted 1890s brick factory on the Spree side of Kreuzberg, five minutes from Schlesisches Tor. Floor 4 is Product & Engineering: open plan, long white desk rows, monitors on arms, a few standing desks that nobody raises, plants watered by a service on Thursdays. Six phone booths, always booked. Meeting rooms named after Berlin lakes (Wannsee, Müggelsee, Schlachtensee, Krumme Lanke — the small one with no window). The kitchen has the espresso machine everyone calls *the Marzocco*, a Brita tap ("the watercooler"), oat milk that runs out by 10:30, and the **kicker table** (foosball), a Leonhart with a sticky goalkeeper rod on the yellow side. The roof terrace is reachable by the fire stairs and smells of cigarettes.

**The Kantine** is on the ground floor, run by a catering contractor. Weekly menu printed on A4 by the trays: *Hauptgericht*, *Vegan*, *Suppe*, salad bar. Wednesday is Schnitzel. Friday is fish. **Dorota** runs the till, knows everyone's usual, and calls Jakob "der Herr mit dem Fahrrad". Long tables; teams sit in clusters by habit. The all-hands is held in the Kantine because it is the only room large enough.

**The stack** (Settlements' corner of it): Kotlin/Spring Boot services on Kubernetes, Postgres, Kafka. Key services: `invoice-core`, `dunning-service`, `debit-gateway` (talks to the PSP), and **`reconciler`** — a 2017 Kotlin service, written by two engineers long gone, that matches incoming bank statements (camt.053) against expected payments. Jakob is one of three people who understand it. Datadog for metrics, PagerDuty for on-call, Jira project `SET`, GitHub org `kontor`. Otto runs as a coding agent in IDEs and in CI, as `otto-bot` on GitHub and as `@otto` in Slack.

## Cast

**You — Jakob Lenz**, 41. Senior backend engineer, joined 2019 as employee ~60. Competent, slightly tired, dry humour, conflict-avoidant until he isn't. Lives in Neukölln (Schillerkiez), cycles to work (Hercules city bike, bad brakes). Partner **Sanne de Vries**, 39, Dutch, primary school teacher (Grundschule in Wedding — long commute). Daughter **Mila**, 6, in her last Kita year, starts school in August; obsessed with axolotls. Rent €1,540 warm, raised in January. Jakob's father in Kassel is slowly getting worse; that is a background thread.

**Settlements team** (payments squad, 7 people in January):

- **Priya Raman**, 36 — engineering manager. Ex-consultancy, joined 2021. Kind, organised, honest to the edge of what she's allowed. Increasingly squeezed between her team and the new leadership. Has a two-year-old.
- **Tobias "Tobi" Brandt**, 29 — backend engineer. Fast, generous, genuinely talented, an early and loud Otto adopter (posts in `#ai-wins`). Insecure about not having a CS degree. Not a villain; his arc is the hardest one.
- **Noor Haddad**, 24 — junior backend engineer, ten months in. TU Berlin graduate, came from Aleppo at 13. Careful, takes notes, eats lunch from a Tupperware at her desk. Most exposed to the year.
- **Oleksandr "Sasha" Kovalenko**, 46 — SRE embedded with Settlements. Moved from Kharkiv in 2014. Has seen three hype cycles. Kicker champion, smokes on the roof, on-call veteran, knows the cleaners by name. Partner Olena ("we tried wife"); son Danylo, 16, Berlin-born German, "embarrassed by him" (revealed S4, May Day).
- **Hanne Vogel**, 33 — product manager. OKR-fluent, anxious, wants to be liked by leadership and by the team and increasingly cannot be both.
- **Ines Carvalho**, 38 — QA engineer, Portuguese, joined 2018. Owns the end-to-end test suite and the manual regression checklist for SEPA. First to be made "redundant by automation" (May).
- **Felix Wagner**, 31 — frontend engineer shared with Invoicing. Mostly offstage; headphones.

**Wider cast:**

- **Christoph Ahrens**, 44 — CEO and co-founder. Patagonia vest, earnest, believes everything he says on stage at the moment he says it. Owner of Otto the dog (a Vizsla).
- **Rebecca Lindqvist**, 47 — new CTO from February, previously at a large US fintech. Metrics, "leverage", "operating rhythm". Not cruel; precise.
- **Jens Kühn**, 50 — VP Engineering since 2017. Beloved, outdated, edged out in April.
- **Karin Sommer** — People Business Partner for Product & Engineering. Calendar invites titled "Quick sync".
- **Fatma Yılmaz**, 42 — Customer Support team lead; Otto is piloted on her team first. Starts the **Betriebsrat** (works council) election initiative in May.
- **Dorota** — Kantine till. **Mehmet** — night cleaner, seen during the 3 a.m. incident.
- **Lars** from Platform, **Aylin** from Data, **Ben** from Invoicing — the background of every all-hands.

## The year (session plan)

| # | Session | Dates | Core events | Key choices → codewords |
|---|---|---|---|---|
| 1 | **Kickoff** | Mon 12 Jan | Back after holidays. All-hands: "The Year of Leverage", Otto for everyone, "no headcount growth this year". Tobi's 1,900-line agent-written PR #4821 lands on your desk. Lunch. Kicker or Noor. Priya asks you to be Settlements' "Otto champion". | Review #4821 properly → `REVIEWED`; let Otto review it → `OTTOREVIEW`; skim and approve → `RUBBERSTAMP`. Offer Noor real pairing → `MENTOR`. Play kicker → `KICKER`. Accept champion role → `CHAMPION`; decline → `HOLDOUT`. |
| 2 | **Adoption** | Feb | Rebecca arrives. The Otto adoption dashboard; "AI leverage" per engineer appears in Looker. Mandatory "AI fluency" training. The Kraków contractor team is ended in a two-line Slack message. Ines's suite is "augmented" with generated tests. | Game the dashboard or not; defend Ines's test plan in planning. |
| 3 | **Sev-1** | Thu–Fri, mid-March | 03:12 page: duplicate SEPA collections. If `RUBBERSTAMP`/`OTTOREVIEW`, the root cause is #4821's timeout path and your approval is on it. If `REVIEWED`, a different agent-written change caused it, and your earlier comment is quoted in the postmortem. Mehmet mopping the 4th floor at 4 a.m. Blameless postmortem that isn't. | Who you name in the postmortem; whether you take the blame. |
| 4 | **Flattening** | April | Reorg memo. Jens's farewell in the Kantine. Priya now has 14 reports across three teams. Team retro goes sideways (the "Start/Stop/Continue" board with one anonymous sticky: *Stop pretending*). Agent Week hackathon. | Speak in the retro or not. |
| 5 | **Reduction** | Tue 12 May | "Quick sync" invites at 08:57. 9% of the company. Ines and Hanne go; Felix goes. Slack avatars grey out through the afternoon. The Kantine at lunch. Fatma posts in `#random` about a works council. | Go to the first Betriebsrat meeting in the bar on Wrangelstraße → `COUNCIL`. |
| 6 | **Survivors** | June | Summer party downsized to a Späti-beer terrace evening. Fruit delivery cancelled. The kicker table is moved to make room for "focus pods". Half the on-call rota left; you are on-call every second week. Noor nearly quits. | Cover Noor's on-call, or not; push back on the rota. |
| 7 | **Knowledge capture** | July | Everyone must write "workflow documentation" and record screen sessions "to help Otto help us". Everyone understands what it is for. The `reconciler` runbook is yours to write. | Write it fully / write it badly / negotiate via the works council → `HONESTDOC`, `THINDOC`. |
| 8 | **Einschulung** | August | Berlin heat, no AC in the old building. Mila's first school day on a Saturday with a Schultüte. Pager during the school ceremony. Sanne's patience. | Answer the page → `ALWAYSON`; let it roll to secondary → `HOMEFIRST`. |
| 9 | **Calibration** | September | Performance cycle with the new rubric ("impact per engineer, normalised for AI leverage"). 1:1 with Priya. A calibration spreadsheet leaks in a shared Drive. | What you write in Noor's and Tobi's peer reviews. |
| 10 | **Rumours** | October | Q3 board meeting. Recruiters on LinkedIn. You interview at an insurance company in Köln and at an AI startup in Mitte. Tobi admits he cannot debug code he shipped. Father's fall in Kassel. | Take the interviews → `INTERVIEWED`. |
| 11 | **The list** | early November | Leadership announces a second "restructuring" — 25% of Product & Engineering. German law: if there is a works council, it must be consulted (Interessenausgleich, Sozialplan); dismissals follow **Sozialauswahl** (tenure, age, dependants, disability). A voluntary severance programme (*Freiwilligenprogramm*) opens first. Noor, short tenure, no dependants, is high on any social-selection list. You, with seven years and a child, are low. | Apply for the voluntary package (which may protect a colleague) → `VOLUNTEER`. |
| 12 | **Consultation** | late November | Negotiations; the Christmas market on Lausitzer Platz; Tobi breaks down in a phone booth; the Otto team itself is cut (the irony is noted, not dwelt on). | Testify at the works council; support Tobi. |
| 13 | **Weihnachtsfeier** | December | Last days. Farewell Slack messages. Laptops returned in a cardboard box at reception. The Christmas party, which is smaller and better. | Final conversations. |
| 14 | **January again** | the next January | Epilogue. One morning, one year later. | Endings resolve from codewords. |

## Codewords in use

Set in session 1: `ASKED`, `CANDID` (all-hands); `TEAMTABLE`, `SUPPORTTABLE`, `NOORLUNCH` (lunch); `REVIEWED`, `OTTOREVIEW`, `RUBBERSTAMP` (PR #4821); `KICKER` or `MENTOR` (15:30); `CHAMPION` / `HOLDOUT` (Priya; undecided readers choose at the start of session 2).

Set in session 2: `BUSFACTOR`, `METRICSDOUBT` (skip-level answer); `CANDOUR` (asked Rebecca a hard question); `GAMED` / `PUSHEDBACK` (adoption metric); `SIGNED` (promised Fatma to sign the works-council invitation); `INESALLY` / `BACKEDAUTO` (Regression 2.0).

Set in session 3: `WAITED` (sent the page back to Tobi), `DECLARED` / `QUIET` (woke people at once / investigated alone first), `WARROOM` (went to the office; Mehmet's coffee), postmortem stance `TOOKBLAME` / `NAMEDTOBI` / `DEFENDEDTOBI` / `SYSTEMIC` / `BLAMEDOTTO`.

Session 3 facts for later: €187,406.20 duplicated, 1,308 refunds (Noor caught 4 false positives), 11 customers churned, unrecoverable cost ≈ one mid-level engineer per year (Marta). `@kontor/payment-path-reviewers` = Jakob + Sasha. Rebecca offers a protected "documentation project" (→ July). Tobi asks to sit in on the reconciler work. Mila got the school round the corner (the appeal Otto wrote). Jakob's father walks with a *Wanderstock*; Easter in Utrecht or Kassel unresolved.

Set in session 4: `KASSEL`, `DOCSHARED`/`DOCOWNER`/`DOCDECLINED`, `CAUTIOUS`, `SPOKE`.

Session 4 facts for later: Priya is Director of Money Movement (19 people); Hanne is PM for the whole Area (three jobs), wrote the *Stop pretending* sticky; Simone (ex-manager, Leipzig, Sachsen LB 2009 Sozialauswahl) went back to IC; Sanne is acting deputy head (kommissarisch, unpaid year one), twelve red Post-its; Support at 63% Otto, sick days +110%, Bettina; Ines applied to Lisbon ×2 and Hamburg (insurer), asked Jakob for a reference, filed SET-1517 (step 117, umlaut mandate) which Jakob assigned to himself; Jens gave Jakob the only copy of the 2017 A2 reconciler diagram (on top of the wardrobe); *Burned* agent exists (31 scars if Jakob joined, 19 + 12 sent later if not) and goes on all payment-path PRs by end of May; smart retries at 100% from early May; Fatma's beer at Würgeengel 12 May 19:00; Sasha: 9% company-wide on 12 May, Aufhebungsverträge offered in 15-minute slots, no works council.

Already consequential: `REVIEWED` decides whether the 27 Feb PSP timeouts double-debit two pilot customers (session 2 ending) and therefore what the March Sev-1 is about.

Threads opened in session 2 for later: Jakob's `notes.md` (Jens's advice: keep a record of what only you could fix); Jens becomes "Head of Engineering Excellence" from 1 April; Mila's school Widerspruch, written with Otto; Dorota noticing Rebecca asked about the catering contract; Mehmet's hours cut because of the floor robot; Marek: "when they start with the contractors, it's because they're practising"; Tobi's incident-prediction tool flags the reconciler.

## Editorial notes from the March review (to act on in later sessions)

- **Fatma and Support** deserve more room than "the department that gets automated": give a Support session its own point of view (S5/S6), and use the works council to challenge the per-user Otto dashboard under §87(1) Nr. 6 BetrVG.
- **Sanne** must keep her own life and arc (her school's staffing crisis, her own career choice), not only be Jakob's conscience.
- **Consequences**: decisions should become tangible later (see `codewords.md` for each codeword's planned payoff). Retire spent codewords with `@clear` so the sheet stays short.
- **Tobi** stays complex: talented, careless, decent. Never the antagonist.
- **Rebecca** stays ambiguous and honest.
- Specialist fact-checks are tracked in `FACTCHECK.md`.

## Endings as written (chapter 14)

Resolved by a chain in ch14, first match wins: `VOLUNTEER` → *The Package*; `EXIT` → *The Exit*; `DIRECTOR` → *The Orchestrator*; `CANDIDATE` → *The Council*; `ALWAYSON` → *The Burnout*; otherwise *The Engineer*. The plans below were the original sketch.

## Endings (original plan)

- **The Orchestrator** (`CHAMPION`, no `COUNCIL`): you stayed and now "supervise" agent workflows for three former teams. Well paid. The Kantine contract was not renewed; you eat at your desk.
- **The Package** (`VOLUNTEER`): you took the Aufhebungsvertrag. Seven months' salary, a Sperrzeit question with the Arbeitsagentur, a spring of taking Mila to school and fixing the bike brakes.
- **The Council** (`COUNCIL` + `MENTOR`): elected to the Betriebsrat, protected from ordinary dismissal, perpetually tired, Noor still employed.
- **The Exit** (`INTERVIEWED`): an insurer in Köln, a slower codebase, a commute by ICE, a team that has never heard of Otto and is about to.
- **The Burnout** (`ALWAYSON` + no `HOMEFIRST`): a Krankschreibung in January; the epilogue is a walk around Tempelhofer Feld.
- **Variants** for whether `REVIEWED`/`RUBBERSTAMP` turned the March incident into your story.

## Recurring texture (use often)

- The Marzocco is broken on Mondays. The oat milk runs out. Someone always leaves a single tea bag in the sink.
- Kicker: Sasha + Ben vs. anyone; the yellow goalie rod sticks; "no spinning" rule enforced only when Sasha is losing.
- Kantine: Dorota, the trays, the A4 menu, Wednesday Schnitzel, the table by the window where Support sits.
- Slack: `#settlements`, `#settlements-alerts`, `#incidents`, `#general`, `#random`, `#ai-wins` (created by Christoph over the holidays), `#kantine-menu` (a bot), `#lost-and-found`.
- Grey avatars. "This channel has been archived." `:pray:` reactions on farewell posts.
- Jira: `SET-` tickets. PRs in the 4800s in January, 6000s by December (agents write a lot of PRs).
