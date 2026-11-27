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
