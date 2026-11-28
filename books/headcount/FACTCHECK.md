# Headcount — fact-check list for specialist readers

The book's credibility depends on its technical and legal detail. This is what it claims, how sure the author is, and what a specialist should confirm. Nothing here has been silently "corrected"; changes made are listed as such.

## For a payments engineer

| # | Claim in the book | Where | Confidence | Please verify |
|---|---|---|---|---|
| 1 | SEPA Core direct debits returned with **AM04** (insufficient funds) or **MS03** (reason not specified) may be re-presented; **MD06** (debtor refund request) should not be retried. | S1 PR #4821, S2 | High | Whether creditors commonly re-present after MS03, and typical retry timing in practice (we say "back-off by business days"). |
| 2 | Debtors have an unconditional **8-week refund right** for SEPA Core debits; a bank reversal causes return fees for the creditor (we say ~€3–9). | S3 incident | High on the right; medium on fee range | Typical R-transaction fees charged to small German merchants. |
| 3 | A PSP **timeout does not mean the request failed**; the PSP deduplicates on an **Idempotency-Key** for ~24 h; reusing the key is the fix. | S1, S2, S3 | High as a pattern | That a PSP for SEPA debits would plausibly offer key-based dedupe and a status endpoint. The PSP is fictional. |
| 4 | Business-day back-off uses the **TARGET calendar** (closing days: 1 Jan, Good Friday, Easter Monday, 1 May, 25–26 Dec). | S1 | High | **Changed:** earlier drafts said "TARGET2". TARGET2 was replaced by T2 in March 2023; the calendar is "TARGET closing days". |
| 5 | **camt.053** end-of-day statements; entries carry `<Sts>` with **BOOK** / **PDNG**; pending entries lack `<BookgDt>`; a bank starting to include PDNG entries would break a strict parser. | S2 on-call | Medium-high | That `<Sts><Cd>PDNG</Cd></Sts>` matches the camt.053 version German banks deliver in 2026 (status became a code structure in later versions), and that pending entries in an EOD statement are plausible. |
| 6 | `AcctSvcrRef` can be empty in some Sparkasse files; banks occasionally send the same entry with different booking dates across a weekend. | S1, S2 | Medium (plausible, invented specifics) | Plausibility only. |
| 7 | Kotlin `BigDecimal` equality: `==` calls `equals()`, which is **scale-sensitive** (`1234.50 != 1234.5`); `compareTo()` is not. | S2 | High | — |
| 8 | Refunds of duplicates as **SEPA credit transfers**, submitted by a PSP cut-off to settle next day. | S3 | Medium | Realistic cut-off times and same/next-day settlement for a batch of ~1,300 SCTs (SCT Inst would be same-second; we chose standard SCT deliberately). |
| 9 | Exec numbers: €187k duplicated; ~€61k already paid out and recovered by netting; unrecoverable ≈ €52k + churn. | S3 postmortem | Invented | Whether the netting/payout model is how a German payment facilitator would actually handle it (licensing: Kontor would need to be, or sit behind, a payment institution). |

## For a German employment lawyer / works-council practitioner

| # | Claim | Where | Confidence | Please verify |
|---|---|---|---|---|
| 10 | Employees of a company with **≥5 permanent employees** may elect a **Betriebsrat**; **three employees** (or a union) can convene the election meeting (§17 Abs. 3 BetrVG); the employer cannot prevent it. | S2 (Fatma) | High | Wording of Fatma's simplified explanation. |
| 11 | With a Betriebsrat, operational changes (*Betriebsänderungen*) require consultation, an *Interessenausgleich* and a *Sozialplan*; dismissals follow **Sozialauswahl** (tenure, age, dependants, severe disability). | Bible, planned S11 | High | Thresholds for mass-dismissal notification (§17 KSchG) at ~420 employees. |
| 12 | Fixed-term contracts (*befristet*) ending is "not a layoff". | S1, S2 | High | — |
| 13 | **Individual-level AI-usage data** visible to a "champions" group. In Germany this is legally sensitive: with a works council, technical systems suited to monitoring performance are subject to **co-determination (§87 Abs. 1 Nr. 6 BetrVG)**; regardless, GDPR / §26 BDSG apply to employee data. | S2 | High that it's sensitive | **Story note:** currently no character says so. Planned: Fatma's works council challenges the dashboard under §87(1) Nr. 6 in S5–S7. A lawyer should confirm how a real company would justify or restrict it. |
| 14 | No AC obligation; heat in old buildings; *Krankschreibung* rules (no doctor's note needed for the first 3 days unless the employer asks). | S3, planned S8/S14 | High | Company-specific note requirements. |
| 15 | School placement appeal (*Widerspruch*) in Berlin citing §55a SchulG; capacity reasons; appeals sometimes upheld. | S2, S3 | Medium | Whether the paragraph cited is right for Berlin primary-school catchment decisions. |

## Continuity (checked)

- Sasha's full name **Oleksandr Kovalenko** now introduced at the first standup (S1) before it appears in dashboards.
- Jakob joined 2019; Sasha 2016; Ines 2018; Priya 2021; Jens VP since 2017; Noor ten months in as of January.
- Dates follow a year in which 12 January is a Monday.

## Added in chapters 5–9

| # | Claim | Where | Confidence | Please verify |
|---|---|---|---|---|
| 16 | A works council at 201–400 employees has **9 members** (§9 BetrVG); list election seats allocated by **d'Hondt** (Wahlordnung). | ch09 | High | — |
| 17 | Directors may or may not be **leitende Angestellte** (§5(3) BetrVG) depending on independent hiring/firing authority; senior executives can neither vote nor stand; a wrongly admitted candidate makes the election challengeable (§19 BetrVG). | ch06, ch09 | Medium-high | How an election board would actually decide an "area Director" in a 420-person company. |
| 18 | Members of the election board and the first three inviting employees, and elected council members, have special protection against ordinary dismissal (§15 KSchG, incl. Abs. 3a). | ch05–ch09 | High | Exact durations (we say "four years and one after" for members). |
| 19 | **Aufhebungsvertrag** + Arbeitsagentur **Sperrzeit** (12 weeks) unless the agreement records that an operational dismissal would otherwise have followed at the same date and the severance is within the usual range. | ch05 | Medium-high | Current Arbeitsagentur guidance (Fachliche Weisungen §159 SGB III). |
| 20 | Mass-dismissal notification thresholds (§17 KSchG) for ~420 employees and 38 departures within 30 days. | ch05 | Medium | Whether agreements count towards the threshold (they can, if employer-initiated). |
| 21 | Council information right **§80(2) BetrVG** and co-determination on monitoring systems **§87(1) Nr. 6**. | ch09 | High | — |
| 22 | Berlin Einschulung on a **Saturday** before the first school week (we use Sat 22 Aug, school from Mon 24 Aug). | ch08 | Medium | 2026/27 Berlin school calendar. |
| 23 | Employer's written notification to the council before a mass dismissal (**§17(2) KSchG**) and the council's right to an external adviser in larger companies (**§111 S. 2 BetrVG**, >300 employees). | ch10 | High | — |
| 24 | Hip fracture in an elderly patient → **Hüft-TEP** the same day; then **Anschlussheilbehandlung** (rehab, e.g. in Bad Wildungen), **Kurzzeitpflege** if needed, **Pflegegrad** application and assessment by the Medizinischer Dienst. | ch10 | High | Typical timings in Hesse. |
| 25 | Each dismissal requires a prior **council hearing (§102 BetrVG)**, one week to object; objections on listed grounds (§102(3)). | ch12 | High | — |
| 26 | **Transfergesellschaft** (beE) for up to 12 months with Transferkurzarbeitergeld; we say 6 months at 80 % net. | ch12 | Medium | Typical top-up levels. |
| 27 | **Ringtausch** clauses in Interessenausgleich / Freiwilligenprogramm. | ch11–12 | Medium | How common, and whether "must offer" is enforceable as written. |
| 28 | **Krankschreibung** (AU) never states the diagnosis to the employer. | ch14 | High | — |
