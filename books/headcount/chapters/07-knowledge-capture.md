---
title: Knowledge Capture
subtitle: July
---

:: s7-open
On Wednesday the first of July, an app appears on every engineer's laptop.

Nobody installs it. It arrives overnight through the device-management system that IT uses for security patches, and in the morning it's there in the menu bar, a small grey icon of a dog's head in profile, with a tooltip that says *Otto Shadow: not recording*. When you click it, a window opens.

```doc Otto Shadow · Welcome
## Help Otto learn how you work :dog:

Otto Shadow records short sessions of your screen while you work on real tasks: debugging, reviewing, investigating incidents. Recordings are analysed to extract **workflows, patterns and tacit knowledge** that aren't written down anywhere.

- You choose when to record. Nothing is recorded without your consent.
- Recordings are processed by Otto and stored for 24 months.
- Personal information on screen is automatically blurred.
- Aggregated insights may inform enablement, tooling and capability planning.

**[ Review consent form ]**
```

*Capability planning.* You read it twice. It's the only phrase on the screen that doesn't sound like a help page.

By nine the fourth floor is full of people clicking the grey dog's head and reading the window and closing it again. Nobody says anything about it out loud. You can feel the floor deciding, individually and silently, what it thinks.

At 09:30 there's a Knowledge Capture kick-off in the Kantine — which isn't the Kantine anymore. The tables and chairs are still there, but the counter is shuttered with a grey roller blind, the trays are gone, and the Smart Fridge glows blue in the corner by the stairs, humming. Without Dorota and the smell of soup, it's just a large room with a lino floor and windows. Lars stands where the salad bar used to be, with a laptop and a projector, and shows a dashboard.

```doc Knowledge Capture · Product & Engineering · week 0
| Area | Critical systems | Documented | Recorded sessions | Target (30 Sep) |
|---|---:|---:|---:|---:|
| Money Movement | 14 | 2 | 0 | 80% |
| Customer Experience | 22 | 3 | 0 | 80% |
| Platform & AI Enablement | 31 | 9 | 4 | 80% |
| Data | 11 | 1 | 0 | 80% |
```

"It's not a competition," says Lars, who looks like a man who has been told that it isn't a competition by someone who very clearly thinks it is. "It's a — it's a capability investment. Every critical system gets a runbook, a decision log, a failure-mode list, and a *three-a.m. guide*: how you'd debug it if you were woken up. And, optionally, recorded sessions. Otto turns the recordings into the guides if you don't want to write them." He clicks. "Templates are in Confluence. Otto can draft from your existing PRs and incident channels. You just—" he searches for the word "—*validate*."

*You just validate.* You're sitting at the back with Sasha. Sasha has the yellow goalie rod in his back pocket. He doesn't say anything. He just takes it out and looks at it, and puts it back.

"Money Movement," says Lars, reading off the dashboard. "Fourteen critical systems. The reconciler is number one." He looks up and finds you in the room, and you can see him being sorry about it. "Jakob, I think that's — you."

* [Continue](s7-state) if DOCSHARED
* [Continue](s7-state-own) if DOCOWNER
* [Continue](s7-state-no) if DOCDECLINED

:: s7-state
It's you, Noor and Tobi. It's been the three of you since April.

The co-authored reconciler documentation is already a third written. Every Thursday in Krumme Lanke, and on many evenings: Noor writes a section and you correct it, or you write one and Tobi has to explain it back before it's allowed into Confluence. It's slow. It's the best documentation Kontor has ever had. It has a page called *Things the bank won't tell you* with Noor's twelve Sparkasse files and the Volksbank `1234.5`, and a page called *Why it's shaped like this* with Jens's A2 diagram scanned in, every annotation from 2017 to 2026. It has the thirty-one scars from Burned, each one linked to its incident.

On the Knowledge Capture dashboard it counts as one system, *documented*, and the line for Money Movement goes from two to three.

After the kick-off Rebecca stops you in the corridor. "I'd like to use the reconciler docs as the template," she says. "For every Area. The co-authorship model too, the *explain it back* rule. It's the best thing anyone's produced." She pauses. "Noor's name is on most of it. I noticed."

"She wrote most of it."

"I know," says Rebecca. "That's why I noticed." She goes on down the corridor. You realise she's just told you, in her way, that she's read paragraph one, section three, and so has Noor's documentation.

* [Continue](s7-consent)

:: s7-state-own
It's you. It's been you since April, at fifty per cent, protected in writing.

The reconciler documentation is mostly written. Thirty-eight pages in Confluence, clear and complete, and with your name on every one: *Owner: J. Lenz*. Otto drafted the scaffolding, as Rebecca said it would — the section headings, the tables, the API reference — and you supplied the truth. The PDNG entries. The Sparkasse files. Why the parser rejects the whole file on one bad entry and why that's right. The thirty-one scars from Burned, each linked to its incident. It's the best documentation you've ever written. You know it while you're writing it, which almost never happens.

On the Knowledge Capture dashboard it counts as one system, *documented*, and the line for Money Movement goes from two to three.

After the kick-off Rebecca stops you in the corridor. "The reconciler docs," she says. "I'd like to use them as the template for every Area." She pauses. "They're excellent, Jakob. I said I'd remember who did it. I will."

You walk back to your desk thinking about the word *remember*. You think about Jens at Würgeengel: *If you don't have a story, you're just a line in someone else's.* You've written your story down. Thirty-eight pages. And you're not sure, any more, whose story it is.

* [Continue](s7-consent)

:: s7-state-no
It's you. It's been you since April, when you told Rebecca you weren't going to write yourself into a prompt.

And for three months it hasn't mattered, because Lars's Knowledge Capture tool wrote a runbook for the reconciler anyway, in May, from your code and your Confluence pages and your incident messages: forty pages, eighty per cent right, with your 03:22 bypass message quoted word for word in the section on PDNG, uncredited. It's in Confluence. It's what Otto reads. It's what Noor found, in June, when she searched for *camt status codes*: not your head, the machine's version of your head.

Now there's a new step. Lars explains it at the kick-off. Every auto-generated runbook needs a human *validator* before it counts as *documented* on the dashboard. The validator's name goes on the page.

"So the reconciler runbook," Lars says, "needs Jakob to validate it."

You open it at your desk afterwards. Forty pages. Eighty per cent right. The twenty per cent that's wrong is the twenty per cent that matters: it says pending entries can be safely deduplicated by amount and date, which is Otto's fix from the February night, the one that would have counted twenty-five payments twice. It says the Deutsche Bank retry count of seven is "chosen to balance resilience with timeliness". It says nothing at all about the Volksbank `1234.5`.

If you validate it as it is, your name goes on a document that's wrong. If you fix it, you're writing yourself into the prompt after all, just more slowly, one correction at a time.

* [Continue](s7-consent)

:: s7-consent
That afternoon you click the grey dog's head again, and then **Review consent form**.

```doc Otto Shadow · Consent (v1.2)
**1. What is recorded.** Screen, active window titles, keystroke timing (not content), and voice if you enable narration.

**2. Purpose.** To extract workflows, debugging patterns and tacit knowledge for use by Otto across Kontor.

**3. Retention.** 24 months. Derived knowledge (summaries, patterns, embeddings) may be retained indefinitely.

**4. Use of insights.** Aggregated insights may inform enablement, tooling and capability planning. Individual recordings are not used for performance evaluation.

**5. Withdrawal.** You may withdraw consent at any time. Derived knowledge already incorporated into Otto cannot be withdrawn.

☐ I have read and agree to the above.
```

You read it three times. *Derived knowledge may be retained indefinitely.* *Cannot be withdrawn.* *Individual recordings are not used for performance evaluation* — individual recordings. Aggregated insights *may inform capability planning*. You know what capability planning is. You stood on the stairs with Priya in May.

At the next desk Tobi is reading the same form. He's reading it slowly, all the way through, lips moving slightly — the new Tobi, the one who reads the camt.053 spec at the speed of a normal person. When he gets to the end, he clicks the box.

"You're consenting?" you say.

"Yeah." He doesn't look away from the screen. "If it's going to learn from somebody, I'd rather it learned from the version of me that reads specs. Not the one from January." He starts a recording. A small red dot appears in his menu bar. "Plus, honestly? If I'm going to get replaced, I want it to be by something that debugs the way I do now. Slowly. Checking." He almost smiles. "That's my revenge."

Noor, across the desks, has closed the window without clicking anything. She sees you looking.

"I'm not consenting," she says simply. "I read paragraph one, section three, in May. *Knowledge.*" She taps her temple. "I'm not giving it away for free. Not until someone tells me what I get for it."

The box is still unticked on your screen.

* [Tick it. If it's going to learn, it should learn from people who've been burned.](s7-record) | If you tick the box and consent to being recorded
* [Close it. Not until someone says what you get for it.](s7-norecord) | If you close the form without consenting

:: s7-record
You tick it.

The red dot appears in your menu bar. *Otto Shadow: recording.* You feel, absurdly, the way you felt at eleven years old at the Kassel swimming pool, the first time you jumped from the five-metre board: not afraid exactly, but very aware of your own body, as if someone had switched a light on inside it.

You start working. The reconciler. A ticket about a bank in Hesse that has started sending statements with a new namespace version. Ordinary work. Except that you can feel the red dot watching, and you notice yourself doing things you'd never notice. Opening the bank's PDF specification before the code, because you always do. Checking the git blame on the parser before changing it, to see who last touched it and why. Pausing for ten seconds, doing nothing, looking at a line, because something about it feels wrong before you know why. You realise that the ten-second pause is the most valuable thing you do all day, and that it doesn't show up as anything at all. Just a still screen. Keystroke timing: none.

You wonder what Otto will make of the ten seconds.

At the end of the week there's a new line in Otto's reconciler answers, when anyone asks it about namespace changes: *Before modifying the parser, review the git history of the affected method to understand prior constraints.* It's what you do. It's phrased the way Otto phrases everything, neutrally, as if it had always known.

@set RECORDED
* [Continue](s7-write)

:: s7-norecord
You close the window without ticking anything.

The grey dog's head stays in the menu bar: *Otto Shadow: not recording*. Every morning when you open the laptop, a small notification slides in from the corner of the screen: *Help Otto learn how you work! Record a session today* :dog:. You dismiss it. It comes back the next morning. After a week you find the setting that turns the notifications off, three menus deep, and turn them off.

On the Knowledge Capture dashboard there's a column for *recorded sessions*, and Money Movement's number goes up through July: Tobi, and the two engineers from Lars's old gateway team, and Ben's people on card retries. It doesn't include you or Noor or Sasha. Sasha says he consented to nothing since 1991, when he consented to the Soviet Union ending, and that one he'd like to withdraw too, depending on the day.

In the second week, in the managers' sync, Priya is asked why Money Movement's recording rate is below the company median. She tells you this in the kitchen, at the Smart Fridge, holding a quinoa bowl she isn't eating.

"I said it's voluntary," she says. "That's what the form says. *Voluntary.*" She puts the bowl back in the fridge. The fridge's screen says *Item returned. You have not been charged.* "Rebecca said yes, it is, and moved on. She didn't push." Priya looks at the fridge. "She doesn't need to push. It's on the dashboard. Everyone in the room saw the number."

* [Continue](s7-write)

:: s7-write
And underneath the recordings, the real question, the one the dashboard can't see: what you actually write down.

Because the reconciler is number one on Money Movement's list, and whatever is in Confluence on the thirtieth of September will be what Otto knows about it, and what Noor and Tobi learn from, and what the next person is woken up by at three in the morning. And it will be what anyone looking at a list in November can point to and say: *it's documented now*.

You know the difference between documentation that's correct and documentation that's complete. You've read a thousand runbooks. A correct one tells you what the system does. A complete one tells you what it does when it's wrong, and why, and what happened the last four times, and which bank lies about which field, and which ten-second pause you should take before you touch which line. The correct one is enough for Otto to answer questions. The complete one is enough to replace you.

You've written complete ones all your career. It's what Jens taught you, at Würgeengel and before that. *Write it so they know what you knew.*

You sit at your desk on the second Monday in July, in the heat, with the reconciler's Confluence space open, and the Knowledge Capture template, and the cursor blinking under the heading Rebecca's template requires: **How I'd debug this at 3am**.

* [Write it completely. Every scar, every pause, everything you know.](s7-honest) | If you write it completely, every scar and every pause
* [Write it correctly but thinly: what the system does, not everything you know.](s7-thin) | If you write it correctly, but thinly
* [Before writing anything, take written terms to Rebecca: attribution, and no use in reviews or selection.](s7-terms) | If you take written terms to Rebecca before you write anything

:: s7-honest
You write it completely.

It takes three weeks, in the evenings and on the Thursdays, with the window open and the fan on and Jens's diagram unrolled across the kitchen table at home on the last Sunday, weighed down at the corners with Mila's pebbles from the Baltic. Forty-one pages. Every scar. Every pause. *Before touching the CAMT parser, read the last five commits to it and the incident each one fixed.* *If a statement file is shorter than yesterday's by more than 30%, assume the bank truncated it, and call Herr Wolff.* *When you're tired and the fix looks obvious, wait ten seconds; the obvious fix to a reconciliation problem is almost always to make two things look equal that aren't.*

You write the ten-second pause down. You don't know how else to write it. It's the last section, and it's three sentences long, and it took you twenty years.

When it's done, Noor reads it in one sitting, at her desk, from the first page to the last, and doesn't say anything for a long time. Then she says: "It's all here." She sounds almost frightened. "Everything you know. Is all of it here?"

"Most of it."

"Then—" she stops.

You know what she was going to say. *Then what are you for?* She doesn't say it. She's too kind, or too careful. She just looks at you across the desks for a moment longer than usual, and then goes back to reading it from the beginning.

On the Knowledge Capture dashboard, the reconciler goes green. *Documented. Validated. Owner: J. Lenz.* By the end of the month, when anyone asks Otto how to debug the reconciler at three in the morning, it answers in your words. Some of your sentences. The ten-second pause too, in a slightly different form: *Pause before applying obvious fixes to reconciliation logic.*

It's good advice. It's yours. It doesn't have your name on it.

@set HONESTDOC
* [Continue](s7-validate)

:: s7-thin
You write it correctly. Not completely.

It's not a lie. Nothing in it is wrong. Twenty-two pages: what the reconciler does, how it's deployed, its dependencies, its alerts, the standard procedure for each one. The camt.053 format. The PDNG rule, because that's in the code anyway. A table of banks and their file-delivery times. It's a good runbook. It's better than most runbooks at Kontor. It's the kind of runbook that would get someone through a normal night.

What it doesn't have is the scars. Not all of them. Not Herr Wolff. Not the ten-second pause. Not why the Deutsche Bank retry count is seven, or which of the Sparkasse fields lies on which weekday, or what the obvious fix to a reconciliation problem almost always is and why you mustn't make it. Those you leave in your head, and in the thirty-one scars in Burned, which aren't in Knowledge Capture's scope, and in Jens's A2 diagram on top of the wardrobe at home, which isn't in anyone's scope at all.

You tell yourself it's what everyone does. It probably is. You tell yourself that a complete runbook takes three weeks and the template says *as needed*. You tell yourself what Jens said: *Don't write it down for the thing that replaces you. Not until you have to.*

You don't feel good about it. You don't feel terrible either. You feel the way you feel when you leave a spare key with a neighbour and keep a second one in your own pocket.

On the Knowledge Capture dashboard, the reconciler goes green. *Documented. Validated. Owner: J. Lenz.* Nobody can tell the difference from the dashboard. Noor can. She reads it at her desk and comes over afterwards and says, quietly, "Where's the part about the obvious fix?"

You look at her.

"You told me in January," she says. "*Ninety-five per cent fine everywhere.* The bakery in Leipzig." She waits. "It's not in here."

"No."

She nods slowly. She doesn't ask why. She goes back to her desk and opens her notebook and writes something in it, and you can guess what, and it isn't about the reconciler.

@set THINDOC
* [Continue](s7-validate)

:: s7-terms
Before you write a word, you write a page.

One page, in plain language, the way you wrote to Rebecca about the AI-assisted PR metric in February. *Terms for documenting the reconciler under Knowledge Capture.* Three points.

```doc Terms for documenting the reconciler · J. Lenz · draft
1. **Attribution.** Documentation and any derived Otto guidance keeps the authors' names, visibly, in Confluence and in Otto's answers ("Source: reconciler runbook, J. Lenz, N. Haddad").
2. **No use in performance or selection.** Knowledge Capture output, recordings and dashboard figures are not used in performance reviews, calibration, or any selection for redundancy, individually or in aggregate.
3. **Review by the works council.** Once elected, the works council reviews points 1–2 as part of co-determination under §87(1) Nr. 6 BetrVG.
```

You send it on Tuesday the seventh at 09:10, cc Priya, cc Bettina as chair of the election board.

Rebecca asks you to Wannsee at 14:00. The plant on the windowsill has grown so much someone has moved it to a bigger pot.

"Point one," she says, before you've sat down. "Yes. Today. I'll ask Lars to add source attribution to Otto's answers for all Knowledge Capture content. It's a good idea. It should have been in the design." She writes something. "Point three. Yes, obviously. If there's a council, it'll have that right whether I agree or not. I'd rather agree."

"And point two?"

Rebecca closes the pen.

"Point two I can't give you," she says. "Not in writing. Not today." She looks at you directly. "I can tell you that I have no intention of using anyone's documentation against them. I can tell you that I think it would be a betrayal of exactly the thing I'm asking for. But if there's a second round, the criteria will be negotiated with the council, under the law, and *knowledge, abilities and performance* are in the law." She pauses. "Your documentation is evidence of knowledge. I can't promise that nobody will ever point at it. That would be a promise I can't keep, and I've stopped making those."

You sit in Wannsee with your one page. Two out of three.

"So I should write it," you say, "knowing that."

"You should write it knowing that," Rebecca agrees. "That's all I'm asking. That you know." She stands. "And Jakob — thank you for asking first. Almost nobody asks first. They just write it, or they don't, and I find out from the dashboard which one they chose."

That week, Otto's answers about the reconciler start ending with a grey line: *Source: Reconciler runbook (J. Lenz, N. Haddad, T. Brandt).* Or just your name, depending on who you wrote it with. It's a small thing. When Noor sees her name under an Otto answer for the first time, she takes a screenshot and sends it to her mother.

You write the runbook. Completely. Every scar. Knowing.

@set TERMS
* [Continue](s7-validate)

:: s7-priya
On Wednesday the fifteenth, Priya tells you on the roof.

"I took it," she says. "Hamburg."

She's sitting in the plastic chair from 2019 with her feet on the parapet again, in sunglasses, with an iced coffee from the Späti that's melting faster than she can drink it. It's thirty-three degrees. Below, the Spree is low and green and smells faintly of algae, and the tourist boats are full of people in sun hats.

"Container shipping," she says. "Head of Engineering. Two hundred people. They start their AI rollout in January." She laughs. "Their January. Our January was this January. I'm going to live it again, from the other side of the stage."

"When?"

"Notice period's three months. I gave it on Monday. Last day thirtieth of September." She takes her sunglasses off and rubs her eyes. "I told Rebecca first, then Christoph. Christoph cried a bit. Rebecca didn't. She said *congratulations* and *thank you* and then, about four seconds later, *who do you think should lead Money Movement?*" Priya puts the glasses back on. "Four seconds. I counted."

You don't say anything.

"I said you," says Priya. "Obviously. And Sasha, if you won't. And that she should ask Noor in three years." She looks at the river. "She's going to ask you. Probably in August, after the holidays. She'll do it properly, in Wannsee, with the plant. She'll offer you Director of Money Movement, fifteen people, the operating review every Monday, and the folder." She turns her head and looks at you through the sunglasses. "I'm telling you now so you've got the summer to think. Not in the room. You should never decide anything in Wannsee. That plant is hypnotic."

You laugh, despite everything.

"What would you do?" you ask.

Priya thinks about it for a long time, honestly, the way she always does.

"I don't know," she says. "I genuinely don't. If you take it, you'll be good at it. You'll fight for them. You'll be in the room, and somebody good should be in the room." She finishes the iced coffee. "And you'll stop writing code, and in a year you'll be me, sitting on a roof telling someone else you're going to Hamburg." She stands up, and picks up the empty cup, and stops. "Or you'll be better than me at it, and stay. I really don't know which. I've only ever been me."

* [Continue](s7-sasha)

:: s7-holiday
Berlin's school summer holidays start on Thursday the ninth of July, and on Monday the thirteenth the Kita closes for three weeks, as it does every summer, for the *Schließzeit*: cleaning, painting, the Erzieherinnen's holidays. It's Mila's last Schließzeit. When it ends she won't go back. In August she'll start school.

Sanne is off. Teachers are off, officially, though Sanne is in her cupboard office in Wedding three days a week anyway, planning next year as deputy head, with the timetable on the wall and every Post-it, for the first time in two years, yellow or green. So you juggle, the way every Berlin family juggles in July. Sanne takes Mondays to Wednesdays. You work from home on Thursdays, which means working at the kitchen table with Mila drawing at your feet and the Otto Shadow dog's head in the menu bar asking you, every morning until you find the setting, to record a session. Fridays the Özdemirs take her, or Sanne's colleague with the twins, or—

On Friday the seventeenth, nobody can. So you take her to the office.

* [Continue](s7-mila)

:: s7-mila
Mila has been to the office once before, on her fifth birthday, when it still had a Kantine and Dorota gave her lentil soup and a chocolate pudding with a wafer stuck in it like a flag. She's been talking about the pudding ever since. When you tell her on the U-Bahn that there's no Kantine any more, she's quiet all the way from Hermannplatz to Kottbusser Tor.

"Where did Dorota go?"

"She works at a bakery now. I think."

"Did someone throw her out of the gate?"

"Sort of."

"Did someone catch her?"

"I don't know," you say honestly, and Mila looks out of the window at the elevated tracks and the graffiti and the green copper roofs of Kreuzberg, and thinks about it.

The fourth floor on a Friday in July is half empty. People are on holiday, or working from home in the heat. Mila walks down the long room holding your hand, looking at everything: the arched windows, the plants, the felt sound-panels hanging from the ceiling ("are those clouds?"), the six grey Focus Pods ("are those toilets?"). You put her at Tobi's desk, because Tobi is in Gotland with Mats, with a set of felt-tip pens and a stack of printer paper, and she draws.

She draws the office. The windows, the clouds, the toilets. Then she draws people, and you're surprised how many she knows by now from your stories. Sasha, enormous, with a stick in his pocket — the yellow goalie rod, which he shows her and lets her hold, gravely, as if it were a sword. Noor, whom she has never met, and who comes over shyly at ten, and whom Mila draws with a notebook and a long dress and a very serious face, and whom Noor, looking at the drawing, laughs at so hard she has to sit down.

At eleven, Mila needs the loo, and on the way back she sees the Smart Fridge.

She stands in front of it for a long time, in the corner by the stairs where the Kantine used to be. It glows blue. It hums. Behind its glass door are rows of plastic tubs with labels. *Protein Box. Quinoa Bowl. Hummus Wrap.*

"Where's the pudding?" she says.

"There isn't any pudding."

"Where's Dorota?"

"Dorota's gone, Mila. This is instead of Dorota."

Mila looks at the fridge. Then she reaches up and presses her hand flat against its glass door, the way she pressed it against the glass of the axolotl tank at the Aquarium in the Zoo, and leaves a small sticky handprint.

"It doesn't know my name," she says.

You badge it open for her. The little screen inside says *Hallo Jakob! Guten Appetit!*

"It knows *your* name," says Mila. She thinks about this. "Does it know Dorota's name?"

---

In the afternoon, while you're in a meeting in a Focus Pod, Mila finds the grey dog's head in the menu bar of Tobi's laptop, which he left on his desk with the lid closed and which she opens because she's six and it's there. Tobi has consented. The red dot comes on. Mila, who has seen you talk to your laptop on calls a hundred times, leans close to the microphone and says, very clearly, in her best explaining voice:

"Hello. I'm Mila. I'm going to tell you about axolotls. They can regrow their brains. Parts of their brains. And their legs. And their hearts. They never grow up. They stay babies forever and they're still grown-ups. They live in Mexico in one lake and the lake is nearly gone." A pause. "That's all. You can tell other people now."

When Tobi comes back from Gotland on Monday he finds a four-minute recording in his Otto Shadow history labelled *Untitled session — Fri 17 Jul, 14:12*. He watches it at his desk with his headphones on, and laughs until he cries, and then, very carefully, doesn't delete it.

* [Continue](s7-election)

:: s7-election
On Friday the twenty-fourth, the election board publishes the *Wahlausschreiben*: the notice of election.

It goes on the noticeboard by the Smart Fridge, next to the electoral register, on four pages of A4, and it's the most German document you've ever been proud to have seen being made. The date of the election: **Tuesday 22 September**, 08:00 to 18:00, in Müggelsee, by secret ballot. The number of council members: nine. The deadline for candidate lists: two weeks before the election. The rules for postal votes. The minimum number of seats for the minority gender (the law has a formula; Mats spent a whole afternoon on it). And at the bottom, signed: *Der Wahlvorstand*. Bettina's signature. Mats's. And yours, or Petra's.

On Saturday at ten, Fatma calls. Not Slack. Your phone, on a Saturday, while you're in the courtyard with Mila, finally, actually, trying to fix the rear brake on the Hercules with a new brake pad from the bike shop on Hermannstraße and a YouTube video.

"There'll be lists," Fatma says, without preamble. "That's how it works at our size. Candidates go on lists, people vote for lists, seats are split. I'm making a list. It's called *Kontor für alle*. Kontor for everyone." She pauses. "Support. Platform. Finance. Money Movement. Old and young. People who were here in 2015 and people who started this year. I want nine names that look like the building." Another pause. "I'd like one of them to be yours."

You stand in the courtyard holding a brake pad.

"Candidates can't be dismissed in the ordinary way from when the list's published," Fatma says. "You know that. And if you're elected, not for your whole term and a year after. Simone told everyone in June. Everyone knows." She says it flatly. "Some people will say that's why you stood. I'm telling you because I'd rather you heard it from me first."

"What else?"

"You'd be in the room," Fatma says. "When they come with the next round. Not Rebecca's room. The other room. Across the table." She waits. "And you'd stop being the knowledge, a bit. You'd be the council. People would stop asking you about the reconciler and start asking you about their contracts." She sighs. "It's a lot. I'm not going to pretend it isn't. Ask Sanne. Tell me by the end of August."

* [Say yes. Put your name on the list.](s7-candidate) | If you agree to stand as a candidate
* [Say no. You'll vote, and you'll help. But not on the list.](s7-notcandidate) | If you decline to stand, but promise to vote and help

:: s7-candidate
"Yes," you say.

Fatma doesn't say anything for a second.

"You didn't ask Sanne," she says.

"Sanne's standing right here." You look at Sanne, who has come down into the courtyard with two glasses of iced tea and has heard every word, because Fatma's voice carries. Sanne looks back at you for a long moment over the glasses. Then she nods. Once.

"She nodded," you tell Fatma.

"Good," says Fatma. "Then I've got eight. Tell her thank you." A pause. "And Jakob — fix that brake. Dorota told me about it. I'm not having a works-council member arrive at meetings sounding like a dying seagull."

You fix the brake. It takes two hours and the wrong-sized Allen key and a second trip to the bike shop. When it's done, you ride the Hercules once round the courtyard, and it stops in total silence, smooth and obedient, for the first time since October, and Mila, watching from the steps, claps, and you feel a strange pang of loss for the noise.

@set CANDIDATE
* [Continue](s7-dorota)

:: s7-notcandidate
"No," you say. "I'm sorry. I'll vote. I'll help. I'll stand up at a meeting if you need me. But not on the list."

Fatma is quiet for a moment.

"Can I ask why?" she says. Not angry. The same question she asked at Würgeengel in May, if she asked it then.

"Because if I'm on the council, I'm not the knowledge any more," you say. "And Noor needs someone to be the knowledge until she is. Through the autumn. Through whatever comes." You look at Mila, who's sitting on the steps holding the YouTube video on your phone, very seriously, like a surgeon's assistant. "And because Sanne's deputy head now. One of us has to be home sometimes."

"That's honest," says Fatma. "Thank you." She sighs. "I'll find someone. Mats, maybe. He's young. Young is good. They can't say it's all old people who are afraid." Another pause. "Fix the brake, Jakob. Dorota told me about it."

You fix the brake. It takes two hours and the wrong-sized Allen key and a second trip to the bike shop. When it's done, you ride the Hercules once round the courtyard, and it stops in total silence, smooth and obedient, for the first time since October, and Mila, watching from the steps, claps, and you feel a strange pang of loss for the noise.

* [Continue](s7-dorota)

:: s7-dorota
On Saturday afternoon you ride to the bakery on Hermannstraße to buy a Streuselkuchen, and the bike makes no sound at all, and you go past the bakery without noticing because you're listening to the silence. You turn round at the lights and come back.

It's a Turkish-German bakery near the U-Bahn, *Bäckerei Yıldız*, with a long glass counter of Simit and Börek and Berliner and a coffee machine almost as big as the Marzocco. There's a queue. You join it.

Behind the counter, in a white apron and a paper hat, with red glasses on a beaded chain, is Dorota.

She sees you. She stops, a paper bag in one hand and a pair of tongs in the other. Then she looks past you, out of the window, at the Hercules locked to the railings.

"*Herr Fahrrad*," she says. "*Ich habe Sie nicht gehört.*" I didn't hear you.

"I fixed the brake."

Dorota looks at you over her glasses for a long, long time, the way she looked at the notice by the Kantine in May.

"*Schade*," she says. Pity. And then she laughs, the big laugh from behind the till, and the queue turns round to look. "*Was wollen Sie?*" What do you want?

"Streuselkuchen."

"*Streuselkuchen*." She puts two pieces in a paper bag, then a third, then a Berliner with pink icing and sprinkles. "*Für die Kleine.*" For the little one. She waves your card away, exactly as she did on the last day. "*Hier bin ich Chefin von der Kasse. Ich entscheide.*" Here I'm boss of the till. I decide.

"How is it here?"

Dorota thinks about it, tongs in hand.

"*Kleiner*," she says. Smaller. "*Aber sie kennen meinen Namen.*" But they know my name. She nods at the owner, a woman of about seventy at the back, rolling dough. "*Frau Yıldız. Sie hat mich gefragt, am ersten Tag. Wie heißen Sie?*" She asked me, on the first day. What's your name? "*Und dann hat sie es nie mehr gefragt. Weil sie es weiß.*" And then she never asked again. Because she knows it.

"Rebecca asked your name too," you say.

"*Ja*," says Dorota. "*Aber sie hat gefragt, um zu wissen, wann der Vertrag endet.*" Yes. But she asked so she'd know when the contract ended. She hands you the bag. "*Das ist der Unterschied.*" That's the difference. "*Nächster!*"

You ride home with the warm paper bag on the handlebars, in total silence, the brake perfect, Herrfurthstraße full of the smell of linden and hot cobblestones. Mila eats the Berliner on the steps of the building and gets pink icing on her nose and sprinkles on her T-shirt, and you don't tell her who it's from until she's finished, and then she says, "*Dorota*?", and runs inside to tell Sanne that somebody caught her.

* [Continue](s7-father)

:: s7-end
On Friday the thirty-first of July, the last day of the month, the heat finally breaks.

It breaks the way Berlin heat always breaks: at five in the afternoon, after a week of thirty-plus, the sky over Friedrichshain goes the colour of a bruise, the wind gets up off the river and blows the Facilities desk fans' paperwork across the fourth floor, and then the rain comes all at once, in sheets, so loud on the old factory's roof that Otto's standup summary is read out to nobody, because everyone's at the arched windows watching the Spree boil.

At 17:20, while it's still pouring, you ask Otto a question. You don't know why. You've been reading the Knowledge Capture dashboard — Money Movement at seventy-four per cent, the reconciler green — and something makes you open the panel, the little dog face, and type the question Noor asked you on the first Monday in January:

*How should I deduplicate camt.053 entries when AcctSvcrRef is empty?*

It answers in four seconds.

* [Continue](s7-end-full) unless THINDOC
* [Continue](s7-end-thin) if THINDOC

:: s7-end-full
```dm Otto
Otto [17:20]: Don't rely on amount and date: two customers can pay the same amount on the same day. Use the end-to-end ID when present; otherwise compare the full entry within a three-business-day window, normalising amounts with `compareTo()` (Volksbank sends `1234.50` and `1234.5`). Before changing the parser, read its last five commits and the incident each one fixed.
  Pause before applying an obvious fix to reconciliation logic: the obvious fix usually makes two things look equal that aren't. :dog:
```

You read it twice. It's right. It's completely right. It's Noor's answer from January, and her Volksbank discovery from February, and your ten-second pause, and Jens's *read the commits*, in one paragraph, in four seconds, with a dog emoji. If you took Rebecca your terms, there's a grey line underneath it with names in it. If you didn't, there isn't.

Six months ago it took Noor three days of reading files one by one over Christmas to find this. It took you twenty years to learn the pause. Now it takes four seconds, and anyone can ask.

Across the desks, Noor is standing at the window watching the rain. Sasha is beside her, the yellow rod in his back pocket. Tobi is back from Gotland, sunburnt, at his desk, watching a four-minute recording of a six-year-old explaining axolotls, for the third time, with his headphones on.

You close the panel.

Outside, the rain is stopping as suddenly as it started. The courtyard is steaming. Somebody's bike is going past below the window, and its brake screams at the corner, and for a second your heart jumps — *Dorota will hear* — and then you remember, and it's someone else's bike, and the Hercules, locked in the courtyard, is silent.

* [Continue](s8-open)

:: s7-end-thin
```dm Otto
Otto [17:20]: Don't rely on amount and date alone: two customers can pay the same amount on the same day. Use the end-to-end ID when present; otherwise compare the full entry, including remittance information, within a window of a few business days. :dog:
```

You read it twice. It's right. It's correct. It's the answer you wrote down in the runbook in July: the twenty-two-page version. It doesn't mention Volksbank. It doesn't mention `compareTo()`. It doesn't mention the obvious fix, or the ten seconds. Those are still in your head, and in Burned's scar list, and in Noor's notebook, and on top of the wardrobe in a cardboard tube.

It's good enough for a normal night. It's not good enough for a bad one. You know exactly which nights are which. Otto doesn't.

You sit with that for a moment, and you aren't sure whether what you feel is safety or shame. Probably both. Both is allowed.

Across the desks, Noor is standing at the window watching the rain. Sasha is beside her, the yellow rod in his back pocket. Tobi is back from Gotland, sunburnt, at his desk, watching a four-minute recording of a six-year-old explaining axolotls, for the third time, with his headphones on.

You close the panel.

Outside, the rain is stopping as suddenly as it started. The courtyard is steaming. Somebody's bike is going past below the window, and its brake screams at the corner, and for a second your heart jumps — *Dorota will hear* — and then you remember, and it's someone else's bike, and the Hercules, locked in the courtyard, is silent.

* [Continue](s8-open)

:: s7-validate
The reconciler is one of fourteen.

That's the thing nobody says at the Knowledge Capture kick-off and everybody understands by the second week. Money Movement has fourteen critical systems, and Otto has drafted a runbook for every one of them from code and PRs and incident channels, overnight, in the first week of July. Thirteen of those runbooks are waiting for a human validator. The validator has to be someone who knows the system. For the payment paths, Lars's guidance says, *ideally a member of payment-path-reviewers*.

There are two members of payment-path-reviewers.

So in the second half of July you validate. In the mornings, before the heat. Ben's card-retry service: twenty-six pages, Otto-drafted, mostly right, except that it describes the card retry back-off as using the TARGET calendar, which it doesn't, because card schemes don't care about TARGET; you find it because you remember Ben asking at lunch in March whether he could reuse your library, and Sasha saying *let it run a quarter first*. The invoice-core payment-matching runbook: thirty pages, fluent, describing a fallback that was removed in 2024. The mandate service: fine, actually, entirely fine, which is somehow the most unsettling of all, because it means you read thirty pages carefully to find nothing, and the dashboard can't tell the difference between a validation that found nothing and a validation that didn't look.

Sasha validates the gateway and the dunning service. He does it the way he reviews PRs now, on his phone, on the U-Bahn, with an expression of pure misery. He finds eleven things. He tells you about the worst one on the roof: the dunning runbook says, in a section called *Recovering from a failed batch*, that you can safely re-run the batch with the same parameters. Which is true. Unless the batch failed halfway through a PSP latency event, in which case some of it executed and some didn't, and re-running it with the same parameters is March.

"It's March," says Sasha, flatly, smoking. "Written in a runbook. In very good English. Waiting for a tired person at three in the morning to follow it." He flicks ash into the coffee tin. "We used to have a review tide. Now we have a validation tide. Same tide. Different water."

By the end of July the Knowledge Capture dashboard says Money Movement is seventy-four per cent documented. What it means is that two people have read about four hundred pages of runbooks written by something that doesn't sleep, and signed their names under them. You don't know what it would have said if you hadn't. You suspect the dashboard would have said the same.

* [Continue](s7-priya)

:: s7-sasha
That evening, still on the roof, after Priya has gone back down, Sasha comes up the fire stairs with two cans of Club-Mate and sits in Priya's chair.

"She told you," he says. Not a question.

"She told me."

"She told me last week." He opens his can. "She asked if I'd want Director. I said no. I said I'd rather be dead in a ditch in Kharkiv." He drinks. "She said that was a no." He hands you the other can. "So it's you, Lenz. Or it's someone from outside. Or it's Lars with two Areas, God help us."

You don't say anything. The river below is green and slow.

"Did you write your runbook?" you ask. "For Knowledge Capture?"

Sasha laughs. A big laugh, startling a pigeon off the parapet.

"I wrote it," he says. "One page. You want to see?" He takes out his phone and shows you. It's a Confluence page, titled *Platform / SRE: How I'd debug this at 3am (O. Kovalenko)*. It has one line.

*Call Sasha.*

"Lars asked me to expand it," says Sasha, putting the phone away. "I said: this is complete. This is the most accurate runbook in the company. Every other runbook, if you follow it at three in the morning, there is a chance you make it worse. This one, never." He drinks. "He marked it *validated*. He's a good boy, Lars. He understands."

You laugh, because it's funny, and then you stop, because you see his face.

"I'm forty-six, Lenz," says Sasha. "Danylo finishes school next summer. Then university. Olena's mother is in Kyiv and she's eighty-one. I have maybe six more years of being woken up at three in the morning in me. Maybe." He looks at the river. "And when I go, they'll have whatever's in the drawer. Whatever's in the runbook. Whatever Otto watched me do." He shrugs, the big slow shrug. "So I'm not putting it in the drawer. Not yet. Not for free. When they want what's in my head, they can ask me properly. Across a table. With a council in the room." He taps the yellow goalie rod in his back pocket. "Until then: call Sasha."

* [Continue](s7-holiday)

:: s7-father
On Sunday evening your father calls. It's your Sunday; you'd have called him. He calls first, which he hasn't done since your mother died.

"I saw on the news," he says. "Heat in Berlin. Thirty-four. Are you all right? Is the little one all right?"

"We're fine, Papa. It broke on Friday. Thunderstorm."

"Good. Good." A pause. You can hear the radio in the background, the Hessischer Rundfunk evening programme, a brass band. "And work?"

You tell him. Not all of it. The Kantine. The documentation. Priya leaving. You don't tell him about Director; you don't know what you'd say. You tell him about the works council, the election on the twenty-second of September, and Fatma's list, and whether your name's on it.

He's quiet for a long time. The brass band on the radio finishes something and starts something else.

"A works council," he says finally. "At a computer company." He laughs, very softly. "In 1993 I didn't think there'd be any more. Your mother said the unions were finished. She said in twenty years everyone would work for themselves on computers and there'd be nobody to organise." Another pause. "She was half right."

"Which half?"

"The computers," says your father. Then: "Do you remember Klaus Hartmann? From the Baunatal works? He came for Christmas when you were small. Big moustache. He was on the works council for twenty-two years. He negotiated the four-day week in 1993. He used to say: *the works council doesn't stop anything. It just makes them say it out loud, slowly, in front of witnesses.*" Your father coughs. "He died last year. I didn't tell you. I went to the funeral. There were four hundred people."

You stand at the kitchen window with the phone. Down in the courtyard, the Hercules is locked to the railings, silent.

"Out loud, slowly, in front of witnesses," you say.

"That's all it is," says your father. "That's all it ever was." The brass band swells. "I'm proud of you, Jakob. Whatever you decide. I wanted to say it while I remember to."

He hangs up before you can answer, as he always does, as if saying goodbye on the telephone were an extravagance from a richer age.

* [Continue](s7-end)
