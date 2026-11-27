# Next of Kin: story bible and plan

Working document for writers. Not part of the book. Spoilers are in `canon.md`; read it before writing anything. The book is inspired by a real Danish family-history project; `inspiration.md` lists the patterns we borrow from it (patterns, never people).

Proposed `book.md` front matter (to be added in the same PR as chapter 1, which is when the book goes live in the build):

```
---
title: Next of Kin
subtitle: A year in the family archive
author: Adventure
target: about two weeks at an hour a day
chapters_planned: 14
codeword_sheet: 36
wpm: 230
---
Struer, January. You are Søren Kjær, forty-nine, a land surveyor from Aarhus, and you have just buried your father. In his kitchen drawer, under the warranty for the dishwasher, is a DNA kit your daughter gave him for Christmas. He never opened it.

Over one year of church books in Gothic script, census rolls, reading rooms, DNA match lists, Facebook groups, doorbells in Thy and phone calls that go quiet, you will build your family tree back into the 1600s. You will decide what to look for, what to ask, and what to do with what you find.

Everything in this book is the kind of thing that turns up in a shoebox.
```

## Promise

**Ultra-realistic family-history research as interactive fiction.** The drama is the drama that real genealogy produces in ordinary families: a name that isn't in the church book where it should be, a DNA match list with a stranger at the top, an uncle who changes the subject, a letter from a firm that wants a third of an inheritance before it will tell you whose it is. No treasure maps, no conspiracies, no evil twins. Everything that is found could be found by a patient amateur with a laptop, a library card and a car.

The second promise: **the past is fixed; only what you learn and what you do with it changes.** `canon.md` fixes what really happened. Choices decide which threads you pull, which doors you knock on, who you tell, what you publish and what you bury again. Two readers can finish with different family trees, both "correct" as far as they got, because one never tested and the other never went to Viborg.

## Rules

1. **Second person, present tense.** You are Søren. Mette calls him Søren or "skat"; Uncle Bent calls him "knægt" (boy) when he's being fond and "Søren Poul" when he isn't; Ida calls him "far".
2. **English prose, Danish texture.** Danish words where an English reader can follow them from context or where translation would lose something (*kirkebog*, *folketælling*, *mindekaffe*, *dødsbo*, *plejehjem*, *hygge* only if ironic). Gloss once, naturally, then use freely. Quoted records are given in the original Danish (or German, Latin) with Søren's working translation, exactly as an amateur would scribble it.
3. **Show the documents.** Church-book entries, census transcriptions, DNA match lists, emails from archives, Facebook group threads, text messages with family, web pages, scanned letters, probate notices. They carry at least a third of the information and are where the reader does the actual detective work. Use the fenced blocks (see `docs/FORMAT.md` and "Artifacts" below).
4. **Real mechanics, done right.** Patronymic naming (until it was fixed by law in the 1800s and actually stuck much later in the countryside); Gothic handwriting (*gotisk skrift*) and the letters that fool beginners; *faddere* (godparents) as evidence; census years; *lægdsruller* (military levying rolls); *skifteprotokoller* (probate); *fæsteprotokoller* (tenancy); the 75/100-year access rules at Rigsarkivet and how to apply for dispensation; CPR (since 1968); centimorgans and what ranges actually mean; the Leeds method; why MyHeritage "Smart Matches" merge the wrong Jens Christensen; consent and DNA of people who can't consent. Get them right; track uncertain claims in `FACTCHECK.md`.
5. **Research takes real time.** DNA results take 4–8 weeks. An archive email gets an auto-reply and an answer three weeks later. The reading room is open Tuesday to Friday and needs a booking. The reader feels the waiting; chapters cover the days when something happens, and the gaps are honest about the weeks in between.
6. **Time is real.** Dates are 2026 (1 January is a Thursday) and January 2027. Weather is West Jutland weather: wind first, then everything else.
7. **Choices are small and personal, not heroic.** Which record to order, whose doorbell to ring, whether to ask Bent at the mindekaffe or later, whether to swab your mother, whether to answer a match's message, what to write in a Facebook post, what to tell your daughter. Branches rejoin quickly (branch and bottleneck). Consequences surface chapters later through codewords.
8. **Research costs something.** Evenings, money (subscriptions, train tickets, a flight), and patience at home. The book tracks it lightly: choices that put the research ahead of the family are marked and add up (see the `LATE` codewords in the ledger). Nobody delivers a lecture about it; Mette just stops asking how it's going.
9. **Nobody is a villain.** Bent protects his father's memory because he loved him. The heir-hunting firm is legal and does real work. Your mother's silence was a promise. The doctor is dead. Everyone is reasonable from where they stand, including the people who did bad things in 1942.
10. **Length belongs to the whole book, not to chapters.** The book as a whole aims at about two weeks for someone reading an hour a day (≈ 14 hours, ≈ 190k words on an average path at 230 wpm). Chapters are as long as their story: the funeral weekend may be long, the day the DNA email arrives may be four pages. Nothing in the book mentions sessions, reading time or stopping for the day. Every real choice gets print wording (`| If you …`), concrete, second person, never revealing what follows.
11. **Real institutions and sites as props, invented people and firms.** Rigsarkivet and its reading rooms (Copenhagen, Viborg, Odense, Aabenraa), Arkivalieronline, Danish Family Search, the Danish Demographic Database, Politiets Registerblade, arkiv.dk, Det Danske Udvandrerarkiv (Aalborg), FamilySearch, MyHeritage, Ancestry, GEDmatch, Find a Grave, the Museum of Danish America in Elk Horn: fine, shown accurately and neutrally, never accused of anything. The heir-hunting firm, the fertility clinic, the Facebook groups, the lokalarkiv volunteers and every private person are invented.
12. **Not everything gets solved.** Real research ends with open questions: the 1798 child's father, the 1898 paternity case, a photo nobody can identify. Leave them open, visibly, and let Søren learn to write "unresolved" without shame.
13. **Family story is evidence too, labelled as such.** Bent's version, Karen's fragments, Holger's legend: record them, test them, keep them visible next to what the records say. Never let the prose quietly upgrade a family story to fact, or quietly sneer at it.
14. **Handle the dark material with care.** Frikorps Danmark, the post-war treason trials, children of German soldiers, the women's institution on Sprogø and the sterilisation laws, donor conception without consent: shown through records and people, without sensationalism, without excusing, without retrospective cartoon villainy. Research the history properly; when in doubt, understate.

## Setting

**Søren's home: Aarhus, Viby J.** A 1960s brick *parcelhus* on a quiet road near Viby Torv, with a garden Mette loves and Søren mows. Søren's desk is in the former kids' room upstairs, now "the office", which over the year becomes "the archive" (Mette's word, not entirely kind).

**Struer** (the dead father's town): a small West Jutland harbour town on the Limfjord; Bang & Olufsen's factory, where Poul worked for 38 years as a toolmaker and later foreman. The *rækkehus* (terraced house) on a street near the station, with a carport and a garden shed. Struer Kirke for the funeral; mindekaffe at a hotel by the harbour. Karen's plejehjem is in Struer.

**Thy** (the mother's side): the windswept north-west. Vigsø, Hanstholm, Hurup, Thisted. Dunes, North Sea fishing, small farms on poor soil, Inner Mission chapels, the cold-water surf crowd at Klitmøller. Mette's father's family is also from Thy, which is where Søren and Mette met, at a wedding in Thisted in 1998.

**The archives, physically:** Rigsarkivet's reading room in **Viborg** (two hours' drive; Søren goes there in April, booking, lockers, pencils only, the microfilm reader nobody uses any more); a volunteer-run **lokalarkiv** in Hurup open Tuesdays 14–17; the **Udvandrerarkiv** in Aalborg (emigration records); the **Frihedsmuseet** resistance database (online) as a counterpoint to Frikorps records; church registers on **Arkivalieronline**, read late at night on two monitors.

**Online:** a Danish Facebook help group (invented) called **"Slægtsforskning: hjælp til læsning af gotisk"**, where retired schoolteacher Birthe reads anything within twenty minutes; a DNA-focused group **"DNA-slægt Danmark"**; MyHeritage (most Danes test there); Ancestry (most Americans); GEDmatch for cross-site comparison; Find a Grave; US county probate court web portals.

## Cast

**You — Søren Kjær**, 49 (b. 14 March 1977 in Holstebro). Land surveyor (*landinspektør*) at a mid-sized firm in Aarhus: reads old cadastral maps and matrikel numbers for a living, which turns out to be genuinely useful (farms are traceable by matrikel number through the *fæsteprotokoller*). Methodical, conflict-shy, dry, a little lonely in a way he wouldn't call that. Not religious; sings the hymns anyway. Drives a 2017 Škoda Octavia estate.

**Family (living):**

- **Mette Kjær** (née Vestergaard), 48. Nurse at Aarhus Universitetshospital, Skejby, cardiology ward, rotating shifts. Warm, quick, practical, funny, and private about her own family. Her own arc: she's been offered the job of ward sister (*afdelingssygeplejerske*) and doesn't know if she wants it; her father **Holger Vestergaard**, 78, in Thisted, is a retired fisherman with opinions.
- **Ida Kjær**, 17, 2.g at Aarhus Katedralskole, history and biology. Gave everyone DNA kits for Christmas because of a school project on migration. Sharp, online, ahead of her father at every step of the DNA work. She sees things in the match list before he does.
- **Magnus Kjær**, 21, studies engineering at DTU in Lyngby. Lives in a shared flat in Copenhagen; within reach of Rigsarkivet's Copenhagen reading room if Søren asks. Kind, distracted, very online about other things.
- **Karen Kjær** (née Overgaard), 76, Søren's mother. Alzheimer's, moved into the plejehjem in Struer in 2024. Has good mornings. Grew up in Vigsø. Remembers 1962 better than last Tuesday.
- **Lene Kjær Mortensen**, 45, Søren's younger sister, Odense, school secretary, two children, husband Jesper. Practical, sceptical, wants the house sold and the estate finished. Does not want to know anything she doesn't need to know.
- **Bent Kjær**, 74, Poul's younger brother, Holstebro, retired lorry driver, widower. The keeper of Kjær family stories and the guardian of his father Aksel's memory. Loud at the mindekaffe, quiet on the phone.

**Family (dead, the people the research is about)**, details in `canon.md`:

- **Poul Kjær** (1947–2026), Søren's father. Toolmaker, B&O. Dies 2 January 2026 at Gødstrup hospital after a stroke.
- **Aksel Kjær** (1921–1989) and **Inger Kjær** née Bach (1923–2011), Poul's parents.
- **The Overgaards** of Vigsø: fishermen and smallholders back to the 1600s; Karen's great-uncle **Jens Peter Overgaard**, who emigrated to Iowa in 1903.

**Researchers, helpers, strangers:**

- **Birthe Lauritsen**, 71, Skive, retired Danish teacher, the gothic-script reader of the Facebook group. Writes in lowercase with many dots. Gentle, precise, has seen every kind of family secret and says so.
- **Kurt Holm**, 80, volunteer at the Hurup lokalarkiv. Knows every farm by its old name. Smells of pipe tobacco and photocopier.
- **Anne-Marie Dahl**, reading-room archivist in Viborg. Professional, kind, strict about pencils.
- **Camilla Bruun**, 46, Silkeborg, physiotherapist. Appears in the DNA match list as "close family". See canon.
- **Rasmus Vinther**, case manager at **Nordisk Arveudredning ApS** (invented), a Copenhagen heir-research firm working with a US partner. Polite, persistent, contractually careful.
- **Linda Sørensen Haugaard**, 63, Elk Horn, Iowa, volunteer at the Museum of Danish America's genealogy centre; distant cousin. Emails in long paragraphs with exclamation marks.
- **Hans-Jørgen Nielsen**, 84, Sønderborg. See canon.

## The binder (method as mechanic)

Søren is a surveyor: he documents. From chapter 2 he keeps a research binder (later a folder of Markdown files, if `AIHELPER`). Each finding becomes a **claim** with four headings: *Claim, Evidence, Missing, Next*, and a validation level: *lead, low, moderate, high, confirmed*. He writes down what a source does **not** prove and records negative searches ("searched Hansted burials 1860–65, no Peder Jensen"). Legal father, biological father, foster parents and household are never merged into one line.

This is the book's quiet game: readers who keep claims honest (check the church book behind the MyHeritage hint, read the image instead of trusting the transcription, audit the noble line) are rewarded later with stronger evidence, better conversations, and a tree nobody can embarrass in public. Shown with the `claim` block (see Artifacts).

## Research threads

The book is built around five threads the reader can pull. Each has its own records, people and codewords; all are true (see canon) but no reader has time, money and family goodwill to follow all of them to the end in one year. Most readers will finish two or three deeply.

| Thread | Line | Starts from | The truth at the end of it |
|---|---|---|---|
| **The photograph** | Kjær (father's father) | A photo in the shoebox: a young man in a uniform with the collar patch scratched out | Grandfather Aksel volunteered for Frikorps Danmark in 1941 and was convicted in the treason trials |
| **The other child** | Bach (father's mother) | A 1942 adoption receipt folded in Inger's hymn book | Inger had a son with a German soldier; he was adopted away and is alive |
| **The match list** | Søren himself | The DNA results; no Kjær cousins in the list; strangers at the top | Søren and Lene were donor-conceived; Poul was not their biological father |
| **The letter from Iowa** | Overgaard (mother's side) | A 1962 airmail letter, then in May a letter from an heir-research firm | A distant cousin died intestate in Iowa; Karen is among the heirs |
| **The dunes** | Overgaard deep line + Mette | The church books of Vigsø; then Mette's DNA | The tree runs back to the 1600s in Thy, and Søren and Mette are related (double third cousins) |

A sixth, lighter thread runs through all of them: **the legend** of "Kaptajn Thomsen" (canon §6), a family story that is beloved, harmless and false, and the online tree that attaches it to medieval nobility. It is where the reader learns to audit, at low stakes, before the stakes are high.

The threads cross: the match list makes the Kjær threads "not your blood" without making them less your family; the Iowa inheritance makes Søren's mother's legal capacity a practical problem; the dunes thread is the only one where nothing terrible is found, and that matters too.

## The year (chapter plan)

Fourteen chapters, following the year's months; that number comes from the story, not from reading time. Lengths in the table are rough story weight, not minutes: *long*, *medium*, *short*. Passage IDs use the `c<N>-` prefix (`c1-funeral`), hand-off notes are `notes/01.md` …

| # | Chapter | Dates | Core events | Key choices → codewords |
|---|---|---|---|---|
| 1 | **Mindekaffe** | Fri 9 – Sun 11 Jan | Poul's funeral at Struer Kirke; the mindekaffe at the harbour hotel; Bent's speech; Lene wants the house cleared by March. Clearing the rækkehus over the weekend: the shed, the drawer with the unopened DNA kit, the shoebox (photos, the scratched uniform photo, a 1962 airmail letter from Iowa, Inger's hymn book). Karen at the plejehjem on Sunday morning, a good morning. | Ask Bent about the photo at the mindekaffe → `ASKEDBENT`; take the shoebox home → `SHOEBOX` (or leave it for Lene); keep Poul's DNA kit → `KIT`; ask Karen about Iowa / about Poul → `KARENIOWA` / `KARENPOUL`. |
| 2 | **Gothic** | late Jan | First evenings on Arkivalieronline. Learning to read gotisk; the 1801/1834/1845 censuses; patronymics. MyHeritage merges the wrong Jens Christensen. First post in Birthe's group. Getting the Kjærs back to 1787 and the Overgaards to 1700, or getting stuck. | Post in the group → `BIRTHE`; pay for a MyHeritage subscription → `MYHERITAGE`; let Ida set up an AI assistant to transcribe and draft claims → `AIHELPER`; accept a MyHeritage Smart Match without checking the church book → `MERGED` (a wrong death year, a line moved to the wrong parish; corrected later by Birthe or not); stay up past 2 a.m. twice → `LATE1`. |
| 3 | **Spit** | Feb (Fastelavn, Sun 15 Feb) | Ida's DNA kits: who tests? Søren, Mette, Lene (refuses at first), Bent ("what for?"), Karen (consent, capacity, the nursing staff). Ordering Aksel's records? Starting the emigration search in the Udvandrerarkiv database. Waiting. | Test yourself → `TESTED`; swab Karen → `KARENDNA` (ethics scene); ask Bent to test → `BENTDNA`; apply for Aksel's case file → `APPLIED`. |
| 4 | **Matches** | mid-March (Søren's 49th birthday, Sat 14 Mar) | Results. The match list. No Kjær side. Camilla Bruun as "close family" (~1,700 cM). Ida's results show the same. Mette and Søren share 150 cM; Ida notices first. The Leeds method on the kitchen table. | Message Camilla → `CAMILLA`; tell Mette what you think it means → `TOLDMETTE`; tell Lene → `TOLDLENE`; ignore the list for now → `PARKED`. |
| 5 | **Reading room** | April (after Easter) | Rigsarkivet, Viborg: Aksel's treason case (landssvigersag), his own statement, the Frikorps enlistment, Demyansk, the 1946 sentence. Pencils only. Anne-Marie Dahl. Bent rings while Søren is in the reading room. | Photograph the whole file → `AKSELFILE`; tell Bent what you found → `BENTTOLD`; write it up in the family's Facebook group / keep it private. |
| 6 | **Heirs** | May (Kristi Himmelfart, Thu 14 May) | The letter from Nordisk Arveudredning: "you may be entitled to a share of an estate"; sign a 33 % agreement before they'll say which. The race: can Søren find the estate himself from the 1962 letter, Find a Grave and Iowa court portals? Karen's capacity: værgemål through Familieretshuset. | Sign → `SIGNED`; research it yourself → `DIY`; tell Lene → `LENEHEIR`; apply to be Karen's guardian → `VAERGE`. |
| 7 | **Doorbells** | June (Sankt Hans, Tue 23 Jun) | Road trip to Thy. The Hurup lokalarkiv and Kurt. Farms by their old names. Knocking at the farm where the Overgaards were tenants; the woman who says "you look like the Overgaards". The graveyard in Vigsø. Holger Vestergaard at Sankt Hans in Thisted, and the cousin conversation with Mette's family. | Knock on the farm door → `KNOCKED`; tell Holger about the 150 cM → `HOLGER`; skip Sankt Hans with Mette's family to keep researching → `LATE2`. |
| 8 | **Half** | July (summer holiday) | Camilla answers (or writes first, if you never did). Coffee in Silkeborg. Her list of other half-siblings. The name of the doctor in Holstebro. A good morning with Karen, or a bad one. | Meet Camilla → `MET`; ask Karen directly → `ASKEDKAREN`; join the half-sibling group chat → `SIBLINGS`. |
| 9 | **Sønderborg** | August | The 1942 receipt; Inger's thread; adoption records and Mødrehjælpen; Sprogø or not (see canon). Finding Hans-Jørgen. The doorbell in Sønderborg. | Write to him first / ring the bell → `HANSJORGEN`; tell Bent his mother had another son → `BENTINGER`. |
| 10 | **Iowa** | September | The estate: Linda in Elk Horn, a probate attorney on Zoom at 22:00, the family-tree affidavit, what a share really comes to after fees and tax. Possibly a trip to Iowa (money, time, Mette's new job). | Fly to Iowa → `IOWA` (+ `LATE3` if it costs the family); prove the line yourself → affects payout. |
| 11 | **Bent** | October (autumn holidays, week 42) | Bent's birthday. Everything Søren knows that Bent doesn't, and vice versa. Bent's own DNA result, if he tested. The photo. | What you tell Bent; whether you show him the file. |
| 12 | **The tree** | November | Karen's last weeks (she dies on Sun 22 Nov). Publishing the tree: what goes on MyHeritage, Geni, in the family's Christmas letter. Writing an article for the local-history yearbook about the Overgaards, or about Aksel. | What may be published: living people hidden, DNA data never, people born after ~1926 without a death date anonymised. The noble line: audit it or publish it (`LEGEND`). Publish everything → `PUBLISHED`; publish the dunes only → `DUNES`; keep it all in the drawer → `DRAWER`. |
| 13 | **Jul** | December | Christmas Eve in Viby with Bent, Lene's family, perhaps Camilla, perhaps nobody new. Ida's history project, finished. What you say at the table. | Final conversations. |
| 14 | **Lørdag** | Sat 9 Jan 2027 | Epilogue: one year after the funeral. One morning. | Endings resolve from codewords. |

The `@tbc` rule applies: until chapter 14 exists, the last written chapter ends with `@tbc`.

## Endings (resolved in chapter 14)

- **The Archivist** (`PUBLISHED` + three threads followed): the tree is public, footnoted and correct. Two relatives no longer speak to you; four new ones do.
- **The Keeper** (`DRAWER`): you know; nobody else does. The binder sits in the office. Mette asks once, in January, whether you're going to do anything with it.
- **The Heir** (`DIY` + `IOWA`, or `SIGNED`): a sum of money that is smaller than it sounds and larger than nothing, and an email from Linda every Sunday. Variant on how much went to the firm.
- **The Half-Brother** (`MET` + `SIBLINGS`): Saturday coffee in Silkeborg once a month; the group chat of twenty-three people with the same chin.
- **The Long Evening** (`LATE1` + `LATE2` + `LATE3`): the research is magnificent and the house is quiet; Mette took the ward-sister job and the night shifts, and you are fine, mostly.
- **Variants** for Bent (told / not told), Hans-Jørgen (found / not found), Mette's family (laughing / not laughing).

## Artifacts

Existing blocks to use now: `email`, `phone` (texts), `dm` (Messenger), `doc` (record transcriptions, tables, web pages), `calendar`, `terminal` (no; not this book). Proposed new block types, to be added as a separate **tooling PR** per `AGENTS.md` §8 before or alongside chapter 2:

| Block | For | Notes |
|---|---|---|
| `record` | A church-book or census entry: source line, a column table, the transcription, Søren's working translation | Print: a ruled "archive slip" box |
| `dna` | A DNA match list or a single match card: name, relationship estimate, shared cM, longest segment, side | Print: plain table, no colour dependency |
| `post` | A Facebook group post with comments and reactions (chat-like syntax) | Like `slack` |
| `letter` | A letter (typed or handwritten), with date line and signature | Print: serif, no box |
| `web` | A web page or search results: address bar, title, body | Like `doc`, with a URL caption |
| `claim` | Søren's research note: title, status/validation line, then *Claim / Evidence / Missing / Next* sections | Print: index-card box; the four headings in small caps |

Until they exist, use `doc` with a caption naming the source.

## Recurring texture (use often)

- The two monitors on the office desk; the magnifying glass from Poul's toolbox, used on screen scans; a notebook in which Søren writes every source in surveyor's block capitals.
- West Jutland wind, always from the west. The Limfjord ferry at Oddesund. Rugbrød with leverpostej at the plejehjem. Filter coffee in Thermos jugs at every Danish gathering.
- Birthe's "*hej søren. det står der vist… 'uægte'. ja. det er det ord.*" Kurt's "*Det var Overgaard-stedet. Nu hedder det noget med Feriepark.*"
- Catalogue routes noted like a real researcher: archive, series, volume, *opslag* (image) number, package number from the DAISY catalogue; "Start bestilling".
- The midwife protocol, the *skifteprotokol*, the *Dansk Jord* farm index in a scanned PDF from Slægtsforskernes Bibliotek, a county yearbook article from 1978 with footnotes to family papers nobody has seen since.
- If `AIHELPER`: the assistant's drafts arrive fast and fluent, with a confident wrong reading of one Gothic word per page; Søren learns to check every name, date and relationship term against the image.
- MyHeritage emails: "*You have 3 new Smart Matches™*". Ancestry: "*New DNA match*". The little green leaf hint.
- Ida doing in ten minutes on her phone what took Søren an evening.
- The shoebox on the kitchen table, then the desk, then a shelf, then a binder, then three.
