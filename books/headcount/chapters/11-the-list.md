---
title: The List
subtitle: November
---

:: s11-open
November in Berlin is the colour of a wet pavement. The sun comes up at half past seven and gives up at four. The lindens on Herrfurthstraße are bare. The canal is black. The swans' cygnets have gone white at last, and one morning in the first week you realise you can't tell the young ones from the parents any more, and the next morning they've all flown off somewhere, and the water's empty.

Mila brings home a lantern from school, a paper one shaped like a hedgehog, for St Martin's Day on the eleventh, and practises the lantern song in the bath — *Ich geh mit meiner Laterne* — every evening, very loudly, until Sanne says that if she hears it one more time she's going to emigrate to a country without lanterns, and Mila asks which country that is, and Sanne can't think of one.

Your father is in Bad Wildungen. He calls every other evening from the rehab clinic's payphone in the corridor, because he refuses to learn to use the mobile you bought him, and tells you about the other patients. A retired policeman from Fulda who cheats at Skat. A woman of ninety-one who does more lengths of the pool than he does. "I'm the youngest in the dining room," he says. "They call me *der Junge*." The boy.

And at Kontor, on Thursday the fifth of November, the negotiations begin.

* [Continue](s11-table-dir) if DIRECTOR
* [Continue](s11-table-council) if CANDIDATE
* [Continue](s11-table-none) unless DIRECTOR, CANDIDATE

:: s11-table-dir
You're at the table. On the company's side of it.

The negotiation is in Müggelsee, because it's the only room with a table long enough for two sides and their advisers. The company's side, by the windows: Rebecca, Marta the CFO, Karin Sommer, an employment lawyer from a big Frankfurt firm called Dr. Albers, who wears a grey suit and says almost nothing and writes everything, and you, Director of Money Movement for five weeks, with Priya's buff folder in front of you on the table. MONEY MOVEMENT on the front. *Not twice. Promise?* inside the flap, where nobody else can see it.

Across the table, by the wall: the works council's negotiating team. Fatma, as chair, with her reading glasses on her nose and a ring binder three inches thick. Sasha, beside her, enormous, with the yellow goalie rod in his back pocket. Ben, for Liste 2. And the council's two advisers, paid for by the company, as the law requires: a labour lawyer from Schöneberg, Dr. Kessler, a small sharp woman in her sixties with a silver bob, who used to represent IG Metall; and an economist from a consultancy that only works for works councils, a tall young man called Jannik with a laptop covered in stickers.

Sasha catches your eye across the table as you sit down. He doesn't nod. He doesn't smile. He looks at you the way he looked at you on the roof in March, when he said *it's an X-ray*. Then he looks down at his papers.

Fatma opens. "We'd like to start," she says, "with the list of knowledge holders you intend to exclude from the social selection under paragraph one, section three." She takes her glasses off. "And the criteria you used to make it."

Rebecca looks at you. It's your Area. It's your list to explain.

* [Continue](s11-list)

:: s11-table-council
You're at the table. On the council's side of it.

The negotiation is in Müggelsee, because it's the only room with a table long enough for two sides and their advisers. The council's team, by the wall: Fatma, as chair, with her reading glasses on her nose and a ring binder three inches thick. Sasha, enormous, with the yellow goalie rod in his back pocket. Ben, for Liste 2. You. And the council's two advisers, paid for by the company, as the law requires: a labour lawyer from Schöneberg, Dr. Kessler, a small sharp woman in her sixties with a silver bob, who used to represent IG Metall; and an economist from a consultancy that only works for works councils, a tall young man called Jannik with a laptop covered in stickers.

Across the table, by the windows: Rebecca, Marta the CFO, Karin Sommer, an employment lawyer from a big Frankfurt firm called Dr. Albers, who wears a grey suit and says almost nothing and writes everything, and — for Money Movement — Lars, interim Director, who looks as though he would rather be anywhere else on earth, including Kharkiv.

Rebecca looks at you across the table as she sits down. She doesn't smile. She just nods, very slightly, the way you'd nod at an opponent before a game. *I'd find it very interesting to negotiate with you.*

Fatma opens. "We'd like to start," she says, "with the list of knowledge holders you intend to exclude from the social selection under paragraph one, section three." She takes her glasses off. "And the criteria you used to make it."

* [Continue](s11-list)

:: s11-table-none
You're not at the table. You're not a Director and you're not on the council. You're one of three hundred and seventy-nine employees, and the negotiations happen in Müggelsee behind a closed door with a sheet of A4 taped to it — *Verhandlung. Bitte nicht stören.* Negotiation. Please do not disturb. — and you walk past it on the way to the Smart Fridge, and you can hear voices through the glass, low and even, and occasionally one voice raised, Fatma's or Rebecca's, and then lower again.

What you know, you know from the minutes. The council publishes a summary after every session on its intranet page, the way the law allows: no names, numbers and positions only. And you know from Sasha, on the roof, who tells you nothing confidential and everything else, which turns out to be a lot.

"First session," he says, on Thursday evening, smoking in the cold. "Fatma asks for the knowledge list. Paragraph one, section three. Who they want to keep out of the selection." He breathes smoke at the black river. "Rebecca brings it. On paper. Four names in Money Movement."

* [Continue](s11-list)

:: s11-list
The knowledge-holder list for Money Movement is one page.

```doc Anlage 3 · Leistungsträger gem. § 1 Abs. 3 S. 2 KSchG · Money Movement (Entwurf)
| Role | Specific knowledge | Justification |
|---|---|---|
| Senior Backend Engineer (reconciliation) | Reconciler; camt.053; bank integrations; incident history | Sole documented owner of critical system; runbook author |
| SRE (payment paths) | Gateway, PSP, on-call; payment-path reviewer | Irreplaceable operational knowledge ("Call Sasha") |
| Senior Backend Engineer (dunning) | Dunning service, retries, PSP idempotency | Owner of post-INC-2026-0312 remediation |
| Backend Engineer (card retries) | Card retry flow (Invoicing) | Sole implementer |
```

Four roles. No names, because the law prefers roles. Everybody at the table knows the names. *Senior Backend Engineer (reconciliation)*: you, or whoever holds that title in the HR system, which is you. *SRE*: Sasha. *Dunning*: Tobi, it turns out; after March he took ownership of the remediation, and it's in his Lattice file. *Card retries*: Ben, who is sitting at the table, for the council, and goes very red.

And there's no row for *Backend Engineer, junior (reconciliation/integrations)*.

Dr. Kessler, the council's lawyer, reads the page for a long time. Then she puts it down and folds her small hands on top of it.

"You've listed the senior engineer who owns the reconciler," she says, in a soft precise Schöneberg voice, "as the knowledge holder for the reconciler." She looks at Rebecca. "And you've listed the junior engineer who co-owns it as a role to be cut." She turns a page in her own folder. "I have here the reconciler runbook, from your Confluence, which the council received under paragraph eighty. Forty pages, or twenty-two, depending on the version. And I have the source attribution on your AI system's answers about it, which the company introduced in July." She reads. "*Source: Reconciler runbook (J. Lenz, N. Haddad, T. Brandt).*" Or just *J. Lenz*, depending on what was agreed in July; Dr. Kessler reads whichever it is, without inflection. "I also have three incident reports this year in which the junior engineer ran a payment-critical incident alone." She looks up. "I'm curious, Frau Lindqvist, how the company distinguishes *specific knowledge* in the senior role from the same knowledge in the junior one."

Nobody answers immediately.

Rebecca's face doesn't change. But she glances, for a fraction of a second, at the end of the table. At you, if you're there on either side. At Lars, if you're not.

"That's a fair question," she says. "I'd like to come back to it next week, with data."

"Please do," says Dr. Kessler, and writes something. "And the calibration notes. Peer reviews. Anything the company relied on." She smiles, very slightly. "Paragraph eighty, section two."

* [Continue](s11-martin)

:: s11-points
The points table comes the following week.

It's the heart of a Sozialauswahl, and it's the thing Simone described at lunch in April, though she never showed you one. Every company that dismisses for operational reasons in Germany uses one, negotiated with the council if there is a council. Points for every year of age. Points for every year of service. Points for every child you support. Points for a severe disability. Within each group of comparable employees, the person with the fewest points goes first. It's the law's attempt to be fair: to protect the people who would suffer most. It's arithmetic. It's very German. It's the most humane cruel thing you've ever read.

```doc Anlage 4 · Punkteschema Sozialauswahl (Entwurf, Verhandlungsstand 12.11.)
| Criterion | Points |
|---|---:|
| Age | 1 per full year of life |
| Length of service | 1.5 per full year |
| Dependants (children with maintenance obligation) | 4 per child |
| Spouse / registered partner with maintenance obligation | 4 |
| Severe disability (GdB ≥ 50) | 6 |

*Comparable group "Backend Engineer, payments/reconciliation" (anonymised):*

| Employee | Age | Service | Children | Spouse | Total |
|---|---:|---:|---:|---:|---:|
| A | 41 | 7 → 10.5 | 1 → 4 | — | **55.5** |
| B | 29 | 2 → 3 | — | — | **32** |
| C | 34 | 4 → 6 | 2 → 8 | 4 | **52** |
| D | 24 | 1 → 1.5 | — | — | **25.5** |
```

*A, 41, seven years, one child.* You. You know your own numbers. *B, 29, two years.* Tobi. *C*, one of the gateway engineers, with two children. *D, 24, one year.*

Twenty-five and a half points. The lowest number on the page. The lowest number in Money Movement. Possibly the lowest in the building.

You notice something else, reading it a second time. *Spouse with maintenance obligation: 4.* If you and Sanne were married, you'd have four more points. You're not married. You have fifty-five and a half instead of fifty-nine and a half, and it doesn't matter at all, because you're nowhere near the bottom, and you think about it anyway, for a long, strange minute, at your desk or at the table, because it's the first time in twelve years that the state has put a number on your not having asked.

* [Continue](s11-noor-tells) if NOORTRUST
* [Continue](s11-noor-learns) unless NOORTRUST

:: s11-noor-tells
On Friday the thirteenth, Noor asks you to come for a walk.

You go east along the river in the dark at five, past the shuttered floating pool, past the old harbour cranes lit from below, under the plane trees by the Treptow bridge where she told you about the Bundesbank in June. The trees are bare now. The river's black and fast.

"I know I'm D," she says.

You stop walking.

"Nobody told me. Nobody can. It's confidential." She keeps walking; you catch up. "But I can do arithmetic. And I read the points scheme on the council's intranet page. And I know my own age and my own start date." She laughs, very slightly. "Twenty-five and a half. I worked it out on the U-Bahn. Twice." She stops under a plane tree. "I wanted to tell you that I know. Before anyone else. Because you're the one who told me in June to take the Bundesbank. Even though you'd lose me." She looks at you. "I trust you to tell me the truth now too."

"What do you want to know?"

"Whether there's anything," Noor says. "Anything at all. Under the law. That I haven't read." She takes out her notebook, in the dark, and doesn't open it. "I've read paragraph one so many times I can say it in my sleep. Section three. *Knowledge, abilities and performance.* I've tried to become the knowledge. I don't know if I have." She holds the notebook in both hands. "Have I?"

* [Continue](s11-choice)

:: s11-noor-learns
On Friday the thirteenth, the points scheme goes up on the council's intranet page, anonymised, as the law allows. You see Noor read it at her desk at 10:20. You watch her take a pencil and her notebook and do arithmetic, carefully, on a clean page. Her age. Her start date. One and a half points per year of service.

She does it twice. Then she closes the notebook and puts it in her bag and puts on her headphones and opens the reconciler, and doesn't take the headphones off for the rest of the day, and at six she goes home without saying goodbye to anyone, which she has never done.

You sit at your desk until seven, with the reconciler open and nothing typed, and the number in your head. *Twenty-five and a half.*

* [Continue](s11-choice)

:: s11-choice
On Monday the sixteenth, the company and the works council agree the first piece of the deal. Not the whole Interessenausgleich; that will take weeks. Just one annex, signed by Fatma and Rebecca in Müggelsee at 18:40 after a nine-hour session, and posted on the intranet at 19:00, in front of witnesses.

```doc Anlage 5 · Freiwilligenprogramm (vereinbart 16.11.)
**Voluntary programme.** Before any dismissals, every employee in an affected comparable group, and any employee in Product & Engineering who could be offered as a swap, may apply for a voluntary termination agreement until **Friday 27 November, 12:00**.

**Severance:** 1.2 gross monthly salaries per year of service (minimum 4), plus €5,000 per dependent child, plus 3 months' salary if signed before 27 Nov. Agreement records that an operational dismissal would otherwise have followed (no Sperrzeit).

**Ringtausch (swap):** If an employee who is *not* selected for dismissal leaves voluntarily, the company **must** offer the vacated position to a selected employee in the same Area who is qualified for it, in order of points (lowest first), before dismissing that employee. Qualification is assessed jointly by the company and the council.

**Deadline:** Friday 27 November, 12:00.
```

*Ringtausch.* A ring exchange. A swap. You've never heard the word before this month. Dr. Kessler, the council's lawyer, proposed it in the third session, Sasha tells you on the roof, or you hear it yourself across the table: it's an old trick from the steel industry in the nineties, she says, from the Ruhr. When the people who can afford to go, go, so that the people who can't afford to go can stay.

If someone not on the list leaves voluntarily, their job is offered to someone who is on the list. In order of points, lowest first. If they're *qualified*.

*Senior Backend Engineer (reconciliation).* Your role. Qualification assessed jointly.

You read it at your desk, or at the table, or on your phone on the U-Bahn home, and you understand, slowly, the way you understand a stack trace, that the whole year has led to this paragraph. Every Thursday in Krumme Lanke. The runbook. Her name on the source line under Otto's answers, if it's there. The peer review you wrote at the kitchen table in September. The incident reports. Volksbank, Commerzbank, the four that weren't duplicates. *Qualified for it.*

If you leave, Noor could have your job.

* [Continue](s11-sanne)

:: s11-sanne
That night you tell Sanne. On the kitchen floor, with your backs against the cupboard. Where else.

You tell her about the Ringtausch. About Noor's twenty-five and a half points. About the role. About the severance: you've done the arithmetic too, on the U-Bahn, the way Noor did hers. Seven years at 1.2 salaries a year is eight and a half months' pay. Plus five thousand for Mila. Plus three months for signing by the twenty-seventh. Nearly a year's salary.

* [Continue](s11-sanne-offer) if INTERVIEWED
* [Continue](s11-sanne-no-offer) unless INTERVIEWED

:: s11-sanne-offer
"And the Köln people called," you say. "On Friday. Anja K. They want me. Head of Payments Engineering. Two days a week in Köln, three from Berlin. Less money. A pension. A canteen. Thirty days' holiday." You almost laugh. "*We're very boring. That's the offer.*"

Sanne is quiet for a long time.

"So you could leave," she says slowly, "with a year's money, and start in Köln in February, and Noor gets your job."

"If she's qualified. If they agree she's qualified."

"Is she?"

You think about the August namespace night. About the four that weren't duplicates. About the Volksbank `1234.5`.

"Yes," you say. "She's more than qualified. She's better than I was at her age. She's better than I am at some of it now."

* [Continue](s11-decide)

:: s11-sanne-no-offer
"And I don't have anything else," you say. "No offer. I didn't look. I thought I'd look in spring." You stare at the opposite cupboard. "I'd be unemployed. In January. With a year's money. In a market where every company in Berlin is doing what Kontor's doing."

Sanne is quiet for a long time.

"I'm deputy head now," she says finally. "Paid, from next year. It's not a fintech salary. But it's a salary. And the rent's the rent." She looks at you. "We wouldn't starve, Jakob. We'd have to be careful for a year. That's all."

"And Noor gets my job."

"If she's qualified," Sanne says. "Is she?"

You think about the August namespace night. About the four that weren't duplicates. About the Volksbank `1234.5`.

"Yes," you say. "She's more than qualified."

* [Continue](s11-decide)

:: s11-decide
Sanne puts her hand on your knee on the cold kitchen floor.

"I'm not going to tell you what to do," she says. "You know that. I'll just say what I'd be afraid of, like you did for Noor in June." She looks at the radiator. "I'd be afraid that you'd do it to be a good person, and then be unhappy, and blame yourself for being unhappy because you'd done a good thing." She pauses. "And I'd be afraid that you'd *not* do it, and stay, and be safe, and watch her go in January with a box with her notebook on top, and never forgive yourself." She takes her hand back. "Both of those are real. You have to choose which one you can live with."

Mila, from the bedroom, half asleep, sings a line of the lantern song. *Da oben leuchten die Sterne, und unten leuchten wir.* Up there the stars shine, and down here, we do. And then stops.

You have until Friday the twenty-seventh at twelve.

* [Continue](s11-tobi)

:: s11-tobi
Tobi decides first.

He tells you on Tuesday the seventeenth, at the Brita tap, at nine, before anyone else is in. He's in a coat, with his bag over his shoulder, as if he's just arrived, or just leaving.

"I'm going," he says. "I signed this morning. The voluntary thing. I'm on the knowledge list, did you know? *Dunning, PSP idempotency, owner of post-incident remediation.*" He laughs, short. "I'm on the list because of March. Because I owned the fix for my own bug. That's the knowledge they want to keep." He fills a glass and doesn't drink it. "So I'm not getting cut. I could stay. They'd keep me." He puts the glass down. "So I'm going. Because if I go, my role's free, and under the swap thing it goes to someone on the list. Lowest points first."

You look at him.

"C," Tobi says. "The gateway guy. Two kids. He's qualified for dunning; he did half the post-March fixes with me. If I go, he gets my job, and his kids get a dad with a job." He shrugs. "Lumenwerk said yes. January-Tobi for twice the money. And honestly? I'll be good at it. I'll be the only one there who knows what PDNG means. I'll be insufferable." He picks up the glass again. "Or I'll quit in six months and hang doors in Osnabrück. Either way."

"Tobi—"

"Don't." He drinks the water, all of it, and puts the glass in the dishwasher, which nobody but Sasha ever does. "I owe Kontor a hundred and eighty-seven thousand euros. This is the most I can pay back." He looks at you, and for a second he looks nineteen, the way he looked at standup on the twelfth of January, plugging his laptop into the TV. "And I owe you the bench. In Hasenheide. So I'm not going to tell you what to do about Noor. You don't need me to." He picks up his bag. "But I'm doing mine."

He goes to his desk and opens his laptop, and the terminal isn't scrolling by itself. He's reading a spec.

* [Continue](s11-rebecca)

:: s11-friday
Friday the twenty-seventh is grey and very cold, the first frost of the year. The cobbles on Herrfurthstraße are white at seven. Mila slides on them all the way to school, shrieking, holding your hand, the hedgehog lantern from St Martin's swinging from her satchel because she refuses to take it off.

At the office you sit at your desk at 08:30 with the agreement open in a PDF on your screen. *Aufhebungsvertrag.* Eleven pages. The sentence about the Sperrzeit, exactly as Dr. Kessler negotiated it. The severance, in euros, to the cent. The date: thirty-first of January. A box for your signature, which you'd do with a stylus on the laptop, the way people sign everything now.

Twelve o'clock is the deadline. It's 08:31.

Across the desks, Noor is at her desk, very upright, notebook open. She doesn't know about the PDF on your screen. She doesn't know about the kitchen floor. She knows she's D, twenty-five and a half points, and that the list of dismissals will be finalised after the voluntary programme closes, and that a box with her name on it might be on Mehmet's trolley in January, if Mehmet still cleaned the fourth floor, which he doesn't.

* [Continue](s11-friday-dir) if DIRECTOR
* [Continue](s11-friday-council) if CANDIDATE
* [Continue](s11-friday-plain) unless DIRECTOR, CANDIDATE

:: s11-friday-dir
If you sign, you stop being Director of Money Movement in January. Rebecca will have to find another one, from outside, in the middle of the restructuring. You'll have held Priya's folder for four months. There's one page in it: the scenario planning from October. *Not twice. Promise?* You'd be keeping the promise, in a way. You'd be not doing it twice by not being there to do it.

You'd also be the Director who took the package. People will say that. People will say a lot of things.

* [Continue](s11-sign)

:: s11-friday-council
If you sign, you leave the works council in January. Your protection under paragraph fifteen ends; it doesn't matter, because you're leaving anyway. Mats moves up from the substitutes. Fatma will have to negotiate the rest of the Interessenausgleich and the Sozialplan without you. *Be the person across the table I'd want to negotiate with.* She'll say you did the right thing. She'll also say *you left in the middle*. Both will be true.

* [Continue](s11-sign)

:: s11-friday-plain
If you sign, you're just an engineer who took a package. Nobody will put it on a slide. Nobody needs to know why, except you and Sanne, and Noor, if she works it out, which she will, because she can do arithmetic.

* [Continue](s11-sign)

:: s11-sign
It's 11:40.

You look across the desks at Noor. She's writing something in her notebook. She looks up, feels you looking, looks back. She doesn't smile. She just looks, the way she looks at a bank statement.

* [Sign it. Free the role. Let the swap give it to her.](s11-sign-yes) | If you sign it, so the swap can give your role to Noor
* [Close the PDF. Stay. Fight for her on the knowledge list instead.](s11-sign-no) | If you close it, stay, and fight to get her onto the knowledge list instead

:: s11-sign-yes
You pick up the stylus.

Your signature on the screen looks strange, the way it looked on the works-council invitation in May, if you signed that, and on the Widerspruch in February: too careful, like a child's. *Jakob Lenz.* 11:43. You press *Submit*. The PDF goes grey and a small green tick appears, and an automatic email from Karin Sommer's system arrives four seconds later: *Ihr Antrag auf Teilnahme am Freiwilligenprogramm ist eingegangen.* Your application to the voluntary programme has been received.

No confetti. Lattice does confetti. This system doesn't.

You sit there for a while. Then you get up and walk round the desks to Noor's.

She takes her headphones off.

"I signed the voluntary agreement," you say. "Just now. My role's free from February. Under the swap, it goes to someone on the list, lowest points first, if they're qualified." You stop. "You're qualified. I'll make sure everyone at that table knows it. I've written it down already, if you saw my peer review. Every incident."

Noor looks at you for a very long time. She doesn't say anything. Her face does nothing at all, the way Simone's did on the twelfth of May.

Then she closes her notebook, very carefully, and puts both hands flat on top of it.

"Why?" she says.

You think about all the answers. Paragraph one, section three. The swap. The arithmetic. *Somebody should catch them.*

"Because somebody taught me to read code with a pencil," you say, "and then he got cut in 2009, and I never found out what happened to him." You pause. "And because you're better at this than I was at twenty-four. And because I'm forty-one with a year's money and a woman who said yes on a kitchen floor." Or *who's waiting*, if you didn't ask; you say whichever is true. "And you're twenty-four with twenty-five and a half points."

Noor doesn't cry. She looks down at her hands on the notebook. When she looks up again her eyes are bright and her voice is perfectly steady.

"I'll need you to teach me the last bits," she says. "Before January. Everything that isn't in the runbook."

"There's nothing that isn't in the runbook."

"There's always something," says Noor. "You told me that. In January." She opens the notebook again, to a clean page, and writes the date at the top. *27.11.* And underneath, small: *Ringtausch.* And underneath that, after a moment: *Thursdays until January.*

@set VOLUNTEER
* [Continue](s11-after)

:: s11-sign-no
You close the PDF.

Not because you don't care. Because you think there's another way, and you want to fight for it. Paragraph one, section three. *Knowledge, abilities and performance.* If Noor can be put on the knowledge list, she's out of the selection entirely, and nobody has to leave for her to stay. Dr. Kessler asked the question across the table: *how does the company distinguish specific knowledge in the senior role from the same knowledge in the junior one?* Rebecca said *with data, next week*. The data is the runbook, the source lines, the incident reports, the peer reviews. Some of which you wrote.

It's a harder fight. It might not work. If it doesn't, she goes in January, and you'll be at your desk, safe, with seven years and a child and a role on the list, watching.

At 12:00 the voluntary programme closes. At 12:04 Noor gets up from her desk and goes to the Smart Fridge and comes back with nothing, and sits down, and you see her look at the clock on her screen, and then at you, and then away.

That afternoon you write a document. Four pages. *The case for Backend Engineer, junior (reconciliation/integrations) under §1(3) KSchG.* Every incident, with numbers. The four that weren't duplicates. The Volksbank namespace. The bank-quirk rules in Burned. The runbook attribution, if there is one. Your own peer review, if you wrote it as a case. You send it — to Rebecca, if you're Director; to Fatma and Dr. Kessler, if you're on the council; to both, cc each other, if you're neither, *in front of witnesses*.

At 23:10 you're still at the kitchen table. Sanne comes in and reads it over your shoulder, all four pages, and puts her hand on the back of your neck.

"It's the best thing you've ever written," she says. "Better than the Widerspruch." A pause. "I hope it works."

"So do I."

"And if it doesn't?"

You don't answer. You don't know. You'll find out in December.

* [Continue](s11-after)

:: s11-after
On Monday the thirtieth, the voluntary programme results go to the council. Numbers only, in the minutes, by Friday.

```doc Betriebsrat · Protokoll (Auszug) · 30.11.
**Item 2: Freiwilligenprogramm (Anlage 5): applications received by 27.11., 12:00**
- Product & Engineering: **14 applications** (of 31 roles to be reduced).
- Of these, **6 from employees not selected** for dismissal → Ringtausch positions available.
- Money Movement: **2 applications from non-selected employees** (Senior Backend Engineer, dunning; and one other).
- Remaining dismissals after voluntary programme and Ringtausch (provisional): **17** (P&E).
- Next session: Thursday 3 December. Interessenausgleich and Sozialplan.
```

Fourteen volunteers. Six swaps. Seventeen still to go. The arithmetic has moved. It hasn't finished.

*Money Movement: 2 applications from non-selected employees.* Tobi, *dunning*. And *one other*, which is you, if you signed. Or someone else, if you didn't. You'll find out who in December. Everyone finds out everything in December.

That evening the first Christmas market opens on Lausitzer Platz, ten minutes from the office, in the square in front of the Emmaus church: wooden huts with mulled wine and Langos and candles and hand-knitted socks, a small carousel, a brass band from a church in Neukölln playing carols badly in the cold. You go after work, without deciding to. Sasha is there, with Olena and Danylo, Danylo pretending not to be with them. Fatma is there, with a mug of Glühwein, talking to Bettina. Noor is there, with a woman who must be her mother, small and smiling, in a headscarf, holding Noor's arm. Tobi is there, with a cup of hot chocolate, alone, looking at the carousel.

Nobody talks about the list. Everybody's thinking about it. You stand in the cold with a mug of Glühwein and watch the carousel go round, horses and a fire engine and a swan, with children on it, and the brass band starts *Stille Nacht* in the wrong key, and nobody minds.

* [Continue](s12-open)

:: s11-martin
On Wednesday the eleventh it's St Martin's Day, and at five o'clock, in the dark, the whole of Schillerkiez walks behind a horse.

It's a Berlin tradition, and a German one, and an older one than either. Every school and Kita does a lantern walk on the eleventh of November: the children carry paper lanterns on sticks, with candles or, these days, small battery lights, and walk through the streets singing, behind a man on a horse dressed as a Roman soldier with a red cloak. St Martin. The soldier who, the story goes, met a freezing beggar at the gate of a city in winter, and took his sword and cut his own cloak in half, and gave the beggar one half and kept the other.

Mila's school's procession starts in the schoolyard and goes up Herrfurthstraße, round the Herrfurthplatz past the church, along the edge of the Tempelhofer Feld in the dark, and back. Two hundred children with lanterns. Three hundred parents. A police car at the front with its blue light turning slowly, silently, and a horse — a real one, a big patient brown horse called Bruno, borrowed every year from a riding school in Rudow — with a father from class 3a on it in a plastic Roman helmet and a red blanket for a cloak, looking terrified and proud.

Mila's lantern is the hedgehog. She holds it very carefully, at arm's length, as if it might bite. Sanne walks on one side of her. You walk on the other. The class sings, raggedly, at the top of their voices, in the cold:

*Ich geh mit meiner Laterne, und meine Laterne mit mir.*
*Da oben leuchten die Sterne, und unten leuchten wir.*

I go with my lantern, and my lantern with me. Up there the stars shine, and down here, we do.

At the edge of the Feld, where the procession stops for a moment, the man on the horse is supposed to act out the scene. A teacher in a blanket plays the beggar, sitting on the kerb. The father on Bruno takes out a plastic sword, with great seriousness, and cuts the red blanket — it's been pre-cut and attached with Velcro, you can hear the rip — and hands half of it down to the teacher, and two hundred children cheer as if they've seen a miracle.

"Why did he only give *half*?" says Mila, on the walk back, swinging the hedgehog.

"So they'd both be warm," says Sanne.

"But then they're both a bit cold."

"Yes," says Sanne. "That's the point. That's the whole point."

Mila thinks about this for a long time, all the way past the church and down Herrfurthstraße, while the lanterns bob around her in the dark like a slow river of small lights.

"I'd give the *whole* cloak," she announces finally, at the door of your building. "And then go home. Because I've got a home."

You stand in the doorway with your key in the lock. Sanne looks at you over Mila's head. Neither of you says anything. Up the stairs, in the flat, the radiator is ticking, and the hedgehog lantern goes on glowing on the hall table until its battery runs out at midnight.

* [Continue](s11-jannik)

:: s11-jannik
On Thursday the twelfth, after the second negotiating session, the works council does something no one at Kontor has seen before. It posts the economist's slides on the intranet.

Not all of them. The ones the law allows: the company's own figures, which the council received under paragraph eighty and which Jannik, the tall young economist with the sticker-covered laptop, has turned into eleven slides with very large numbers in very plain type. People read them at their desks, in the Focus Pods, at the Smart Fridge. By lunchtime everyone has. By two o'clock one slide has been screenshotted into every private group chat in the building.

```doc Betriebsrat · Wirtschaftliche Bewertung (Auszug) · Folie 7
## What the 31 roles cost, and what replaces them

| | per year |
|---|---:|
| 31 roles (fully loaded: salary, social security, office) | **€3.4m** |
| Otto (licences, compute, AI Enablement team) — current | €1.1m |
| Otto — projected after reduction (company estimate) | €1.6m |
| **Net saving claimed** | **€2.9m** |

**Council's questions:**
1. The company's own incident cost in March was ~€52k + churn. How many such incidents does the saving assume will *not* happen with 17–31 fewer engineers?
2. Review load on payment paths is already 2 people for ~300 PRs/month. Who reviews after the reduction?
3. Alternative: hiring freeze + natural attrition (12 resignations this year) + voluntary programme + part-time on request reaches **−24** by Q3 next year without dismissals. Saving: €2.3m. Difference to company plan: €0.6m.
```

*Difference to company plan: €0.6m.*

Six hundred thousand euros a year. The difference between seventeen dismissals and none. Three hundred and seventy-nine people read that number on the twelfth of November, and you can feel the building change around it, the way the air changes before a storm. Not anger, exactly. Arithmetic. Everybody doing it at once.

Ben, from Liste 2, the *constructive partner*, comes to the Brita tap at three looking as though he hasn't slept.

"I didn't know," he says, to nobody, to the tap. "I'm on the council. I sat in the room. I didn't know it was six hundred thousand until Jannik put it on a slide." He fills his glass. "Six hundred thousand. That's — that's the Smart Fridge and the Focus Pods and the Otto Shadow licence." He drinks. "That's *two Christophs*."

"Are you still on Liste 2?" says Sasha, from behind him, in the queue.

Ben looks at him for a long moment. "I'm on the council," he says. "There aren't lists any more. There's just the council." He puts his glass in the dishwasher. "Christoph wanted *a range of voices*. He's got one."

* [Continue](s11-points)

:: s11-rebecca
On Thursday the nineteenth you stay late. Not for any reason. Since the restructuring started, everyone stays late; the building has the feeling of a hospital at night, lights on in odd places, people at desks for no clear purpose. At 21:30 you go down for a hummus wrap from the Smart Fridge, which is the only thing open, and Rebecca is there.

She's standing in front of the fridge, in the dark Kantine, with the shuttered counter behind her and the blue light of the fridge on her face. She's holding a Protein Box she clearly isn't going to eat. When she sees you she doesn't startle. She just nods.

"Jakob."

"Rebecca."

You badge the fridge open. *Hallo Jakob! Guten Appetit!* You take a wrap. You stand there, the two of you, in the empty Kantine, in the blue light.

"Can I tell you something?" Rebecca says. "Not as the CTO. It's ten at night. I'm tired."

You wait.

"2009," she says. "Stockholm. I was thirty. A bank, the IT department, payments. The crisis came. They cut a third of us." She looks at the Protein Box. "I was on the list. I'd been there two years. No children. Swedish law is different from yours, but not that different: last in, first out, roughly. I was out." She turns the box over in her hands. "There was a union rep. An old man, a mainframe programmer, Bengt. He'd been there thirty years. He sat in the negotiations for nine weeks and argued that three of the young ones on the list were the only people who understood the new payment system. He got us moved to the knowledge exception. Me and two others." She puts the box back in the fridge. The fridge says *Item returned. You have not been charged.* "I never thanked him properly. He died in 2015. I found out from LinkedIn."

The fridge hums.

"I'm telling you," says Rebecca, "because Dr. Kessler asked me a question on the fifth of November that I couldn't answer. *How does the company distinguish specific knowledge in the senior role from the same knowledge in the junior one.*" She looks at you. "And I've spent two weeks trying to find a good answer. And the honest answer is: it doesn't. Not in this case. Not with this junior." She closes the fridge door. "I'm going to say that in the session on the third of December. On the record. With Dr. Albers sitting next to me wishing I wouldn't."

"Why are you telling me?"

"Because you're the one person in the building who's been arguing it all year without ever saying it out loud," says Rebecca. "And because I owe Bengt." She picks up her coat from a chair. "Goodnight, Jakob. Eat something better than that."

She goes out through the side door, the one Christoph used in May, the one the catering staff used to use. You stand in the Kantine with your wrap, in the blue light, and think about a mainframe programmer called Bengt, whom you'll never meet, in Stockholm, in 2009, in a room with a list.

* [Continue](s11-father)

:: s11-father
On Saturday the twenty-first, your father calls from Bad Wildungen on the payphone in the corridor. He's going home on Monday. He's walking with two sticks now, and climbed a full flight of stairs in the physiotherapy room on Thursday, *zwölf Stufen*, twelve steps, which he says the physiotherapist cheered as if he'd climbed the Herkules. The Pflegegrad assessment is in December. Frau Brandau will look in on him every morning. He doesn't want a care service. You argue. He wins, as he always does on the phone, by hanging up.

He calls back an hour later, which he has never done.

"I've been thinking," he says. "About 1993. The four-day week. I told you at Easter, or on the phone, I can't remember."

"You told me."

"I didn't tell you the end." The payphone crackles. In the background, the retired policeman from Fulda is shouting about Skat. "When the works council agreed it, everyone took less. Ten per cent less money. Everybody. The old ones too, who didn't need to. Klaus Hartmann, who'd been there thirty years and could never be fired, took it too. He could have said, I'm protected, let the young ones take it. He didn't." The line hisses. "Your mother was angry for a year. We didn't go to Italy. And in 1995 they hired back. And Klaus's apprentice, a boy called Marco, who'd have been first out, is the head of the paint shop now. Fifty years old. I saw him at Klaus's funeral. He cried more than the family."

You stand at the kitchen window with the phone. Down in the courtyard, Mila is riding her bike in circles in the dark, under the one light, very slowly, round and round.

"Why are you telling me?" you say. It's the third time someone has told you a story this week and you've asked them that.

"Because you're my son," says your father, "and I can hear on the phone that you're deciding something." The policeman from Fulda shouts again. "That's all. I'm not telling you what. I just wanted you to know the end of the story." A pause. "Most people only tell the beginning."

He hangs up.

* [Continue](s11-friday)
