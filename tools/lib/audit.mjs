// Structural audit of a book: explores every reachable state (passage +
// codewords held) instead of sampling, and reports decisions, destinations,
// codeword ledger, maximum codewords held on any route, unreachable choices,
// endings, and sparse printed pages. Output is Markdown for human review.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const available = (ch, cw) => (!ch.if || ch.if.every((x) => cw.has(x))) && (!ch.unless || !ch.unless.some((x) => cw.has(x)));

// Codewords that can still matter after passage p: those checked by p's own
// choices or by any passage reachable from p (ignoring conditions).
function liveCodewords(passages) {
  const live = new Map([...passages.keys()].map((id) => [id, new Set()]));
  for (const p of passages.values())
    for (const ch of p.choices) [...(ch.if || []), ...(ch.unless || [])].forEach((c) => live.get(p.id).add(c));
  for (let changed = true; changed; ) {
    changed = false;
    for (const p of passages.values()) {
      const mine = live.get(p.id);
      for (const ch of p.choices)
        for (const c of live.get(ch.target) || [])
          if (!mine.has(c)) { mine.add(c); changed = true; }
    }
  }
  return live;
}

// Most codewords a reader can be holding at once. Longest path over the story
// graph, counting each passage's newly set codewords (an upper bound: it can
// only overcount when the same codeword is set twice on one route).
function maxHeldBound(passages, start) {
  const memo = new Map(), onStack = new Set();
  let cyclic = false;
  const best = (id) => {
    if (memo.has(id)) return memo.get(id);
    if (onStack.has(id)) { cyclic = true; return { n: 0, set: [] }; }
    onStack.add(id);
    const p = passages.get(id);
    let tail = { n: 0, set: [] };
    for (const ch of p.choices) {
      const t = best(ch.target);
      if (t.n > tail.n) tail = t;
    }
    onStack.delete(id);
    const r = { n: tail.n + p.set.length - p.clear.length, set: [...p.set, ...tail.set], at: id };
    memo.set(id, r);
    return r;
  };
  const r = best(start);
  return { n: Math.max(0, r.n), set: [...new Set(r.set)].sort(), at: start, cyclic };
}

export function explore(book) {
  // Explores every reachable state exactly. A state is (passage, codewords that
  // can still matter from here); codewords nobody will ever check again are
  // dropped from the state, which keeps this exact but tractable.
  const { passages, chapters } = book;
  const live = liveCodewords(passages);
  const seen = new Set();
  const reachedPassages = new Set();
  const usedChoices = new Set(); // "from->to"
  const endings = new Map(); // id -> count of distinct states
  const stack = [[chapters[0].start, []]];
  let states = 0;
  const stuck = new Set();
  while (stack.length) {
    const [id, cwArr] = stack.pop();
    const key = id + '|' + cwArr.join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    states++;
    const p = passages.get(id);
    if (!p) continue;
    reachedPassages.add(id);
    const cw = new Set(cwArr);
    p.set.forEach((c) => cw.add(c));
    p.clear.forEach((c) => cw.delete(c));
    if (p.end || p.tbc) {
      endings.set(id, (endings.get(id) || 0) + 1);
      continue;
    }
    if (!p.choices.some((ch) => available(ch, cw))) stuck.add(`${id} with [${[...cw].sort().join(', ')}]`);
    for (const ch of p.choices) {
      if (!available(ch, cw)) continue;
      usedChoices.add(`${id}->${ch.target}`);
      const keep = live.get(ch.target) || new Set();
      stack.push([ch.target, [...cw].filter((c) => keep.has(c)).sort()]);
    }
  }
  const maxHeld = maxHeldBound(passages, chapters[0].start);
  return { states, reachedPassages, usedChoices, endings, maxHeld, stuck };
}

function pageTexts(pdfPath) {
  const r = spawnSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 1 << 28 });
  return r.error ? null : r.stdout.split('\f');
}

export function audit(book, { labels = {}, pdfPath, ledgerPath, sheetLines }) {
  const { passages, chapters } = book;
  const ex = explore(book);
  const page = (id) => (labels[id] ? `p. ${labels[id]}` : '—');
  const opening = (id) => {
    const t = passages.get(id).text.replace(/```[\s\S]*?```/g, ' [document] ').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
    return t.split(' ').slice(0, 12).join(' ') + '…';
  };
  const out = [];
  const issues = [];

  // Codeword ledger
  const setIn = new Map(), testedIn = new Map();
  for (const p of passages.values()) {
    p.set.forEach((c) => (setIn.get(c) || setIn.set(c, []).get(c)).push(p.id));
    for (const ch of p.choices) [...(ch.if || []), ...(ch.unless || [])].forEach((c) => (testedIn.get(c) || testedIn.set(c, []).get(c)).push(p.id));
  }
  const planned = new Map();
  if (ledgerPath && fs.existsSync(ledgerPath)) {
    for (const line of fs.readFileSync(ledgerPath, 'utf8').split('\n')) {
      const cells = line.split('|').map((c) => c.trim());
      if (cells.length < 4 || !/`[A-Z0-9_]+`/.test(cells[1])) continue;
      for (const m of cells[1].matchAll(/`([A-Z0-9_]+)`/g)) planned.set(m[1], cells[cells.length - 2]);
    }
  }
  const allCw = [...new Set([...setIn.keys(), ...testedIn.keys()])].sort();

  // Unavailable choices and unreachable passages
  for (const p of passages.values()) {
    if (!ex.reachedPassages.has(p.id)) issues.push(`Passage \`${p.id}\` (${page(p.id)}) is never reached on any route.`);
    else for (const ch of p.choices) if (!ex.usedChoices.has(`${p.id}->${ch.target}`)) issues.push(`Choice in \`${p.id}\` → \`${ch.target}\` is never available on any route (condition can't be met).`);
  }
  for (const st of ex.stuck) issues.push(`Dead end: a reader can arrive at \`${st}\` and no choice is open to them.`);
  for (const c of allCw) {
    if (testedIn.has(c) && !setIn.has(c)) issues.push(`Codeword ${c} is checked but never awarded.`);
    if (setIn.has(c) && !testedIn.has(c) && !planned.get(c)) issues.push(`Codeword ${c} is awarded but never checked, and has no planned use in the ledger.`);
  }
  if (ex.maxHeld.n > sheetLines) issues.push(`A reader can hold ${ex.maxHeld.n} codewords at once but the sheet has ${sheetLines} lines.`);

  // Sparse pages
  const sparse = [];
  const texts = pdfPath ? pageTexts(pdfPath) : null;
  if (texts) {
    const first = texts.findIndex((t) => /CHAPTER 1(?!\d)/.test(t));
    texts.slice(first).forEach((t, i) => {
      const lines = t.split('\n').filter((l) => l.trim()).length - 1; // minus running head
      if (lines > 0 && lines <= 4) sparse.push({ page: i + 1, lines });
    });
  }

  out.push(`# ${book.meta.title} — structural audit`, '', '_Generated by `npm run audit` from the sources and the compiled PDF. Do not edit by hand._', '');
  out.push('## Summary', '');
  out.push(`| | |`, `|---|---:|`);
  out.push(`| Chapters | ${chapters.length} |`, `| Passages | ${passages.size} |`);
  out.push(`| Decisions (passages with 2+ choices) | ${[...passages.values()].filter((p) => p.choices.length > 1).length} |`);
  out.push(`| Distinct reachable states explored (passage × codewords that still matter) | ${ex.states.toLocaleString('en')} |`);
  out.push(`| Distinct codewords | ${allCw.length} |`);
  out.push(`| Most codewords held at once on any route | **${ex.maxHeld.n}** (sheet has ${sheetLines} lines) |`);
  out.push(`| Endings reachable | ${[...ex.endings.keys()].filter((id) => passages.get(id).end).length} |`);
  out.push(`| "To be continued" points reachable | ${[...ex.endings.keys()].filter((id) => passages.get(id).tbc).length} |`);
  out.push(`| Printed pages with ≤4 lines of text | ${texts ? sparse.length : 'n/a'} |`, '');
  out.push(`Largest codeword set (reached at \`${ex.maxHeld.at}\`): ${ex.maxHeld.set.map((c) => `\`${c}\``).join(', ')}`, '');

  out.push('## Issues', '');
  out.push(issues.length ? issues.map((i) => `- ${i}`).join('\n') : '- None found.', '');

  out.push('## Codeword ledger', '');
  out.push('| Codeword | Awarded in | Checked in | Planned use |', '|---|---|---|---|');
  for (const c of allCw)
    out.push(`| \`${c}\` | ${(setIn.get(c) || []).map((id) => `${id} (${page(id)})`).join('<br>') || '**never**'} | ${(testedIn.get(c) || []).map((id) => `${id} (${page(id)})`).join('<br>') || '—'} | ${planned.get(c) || ''} |`);
  out.push('');

  out.push('## Decisions', '');
  out.push('Every decision, its options, where each leads, and what it awards. Read the *destination opens with* column to check that each destination matches its choice.', '');
  for (const c of chapters) {
    out.push(`### Chapter ${c.index + 1}: ${c.title}`, '');
    for (const id of c.passages) {
      const p = passages.get(id);
      if (p.choices.length < 2) continue;
      out.push(`**\`${id}\`** — ${page(id)}`, '');
      out.push('| Choice (print) | Requires | → | Destination opens with | Awards |', '|---|---|---|---|---|');
      for (const ch of p.choices) {
        const t = passages.get(ch.target);
        const req = ch.if ? ch.if.join(' + ') : ch.unless ? `not ${ch.unless.join('/')}` : '';
        out.push(`| ${(ch.print || ch.text).replace(/\|/g, '\\|')} | ${req} | ${page(ch.target)} | ${opening(ch.target).replace(/\|/g, '\\|')} | ${t.set.join(', ')} |`);
      }
      out.push('');
    }
  }

  out.push('## Routes to endings', '');
  for (const [id, n] of ex.endings) out.push(`- \`${id}\` (${page(id)}): ${passages.get(id).end || 'to be continued'} — reached in ${n.toLocaleString('en')} distinct codeword states`);
  out.push('');

  if (texts) {
    out.push('## Sparse pages', '', 'Pages with four lines or fewer, usually the tail of a passage before the next jump target starts a new page.', '');
    out.push(sparse.length ? sparse.map((s) => `p. ${s.page} (${s.lines} lines)`).join(', ') : 'None.', '');
  }
  return { markdown: out.join('\n'), issues, maxHeld: ex.maxHeld.n };
}
