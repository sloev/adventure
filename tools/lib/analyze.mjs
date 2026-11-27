// Validation and reading-time statistics.
import { wordCount } from './render.mjs';

export function validate(book) {
  const errors = [...book.errors];
  const warnings = [];
  const { passages, chapters } = book;
  const setAnywhere = new Set();
  const testedAnywhere = new Set();

  for (const p of passages.values()) {
    p.set.forEach((c) => setAnywhere.add(c));
    for (const ch of p.choices) {
      if (!passages.has(ch.target)) errors.push(`${ch.loc}: choice points to unknown passage "${ch.target}"`);
      [...(ch.if || []), ...(ch.unless || [])].forEach((c) => testedAnywhere.add(c));
    }
    if (!p.choices.length && !p.end && !p.tbc) errors.push(`${p.loc}: dead end — "${p.id}" has no choices and no @end/@tbc`);
    if (p.choices.length && p.choices.every((c) => c.if)) warnings.push(`${p.loc}: every choice in "${p.id}" is conditional (needs an unconditional fallback)`);
    if (!p.text) warnings.push(`${p.loc}: passage "${p.id}" has no text`);
  }
  for (const c of testedAnywhere) if (!setAnywhere.has(c)) errors.push(`codeword ${c} is tested but never set`);
  for (const c of setAnywhere) if (!testedAnywhere.has(c)) warnings.push(`codeword ${c} is set but never tested (yet)`);

  // Reachability, ignoring conditions.
  const start = chapters[0]?.start;
  const seen = new Set();
  const stack = start ? [start] : [];
  while (stack.length) {
    const id = stack.pop();
    if (seen.has(id) || !passages.has(id)) continue;
    seen.add(id);
    passages.get(id).choices.forEach((c) => stack.push(c.target));
  }
  for (const p of passages.values()) if (!seen.has(p.id)) warnings.push(`${p.loc}: "${p.id}" is unreachable`);
  return { errors, warnings };
}

// Monte Carlo walks through the whole book, respecting codewords, to estimate
// how many words a reader actually reads per session (chapter) and in total.
export function stats(book, { walks = 3000, wpm } = {}) {
  wpm = wpm || Number(book.meta.wpm) || 230;
  const { passages, chapters } = book;
  const words = new Map([...passages.values()].map((p) => [p.id, wordCount(p.text)]));
  const perChapter = new Map(chapters.map((c) => [c.id, []]));
  const totals = [];
  const endings = new Map();
  let rng = 12345;
  const rand = () => ((rng = (rng * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

  for (let w = 0; w < walks; w++) {
    const cw = new Set();
    const acc = new Map();
    let id = chapters[0].start;
    let total = 0;
    for (let steps = 0; steps < 5000 && id; steps++) {
      const p = passages.get(id);
      if (!p) break;
      const n = words.get(id);
      total += n;
      acc.set(p.chapter, (acc.get(p.chapter) || 0) + n);
      p.set.forEach((c) => cw.add(c));
      p.clear.forEach((c) => cw.delete(c));
      if (p.end || p.tbc) {
        const key = p.end ? `END: ${p.end}` : 'to be continued';
        endings.set(key, (endings.get(key) || 0) + 1);
        break;
      }
      const options = p.choices.filter(
        (c) => (!c.if || c.if.every((x) => cw.has(x))) && (!c.unless || !c.unless.some((x) => cw.has(x)))
      );
      if (!options.length) break;
      id = options[Math.floor(rand() * options.length)].target;
    }
    totals.push(total);
    for (const [ch, n] of acc) perChapter.get(ch).push(n);
  }
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const totalWords = [...words.values()].reduce((a, b) => a + b, 0);
  return {
    wpm,
    totalWords,
    pathWords: { avg: avg(totals), min: Math.min(...totals), max: Math.max(...totals) },
    chapters: chapters.map((c) => {
      const arr = perChapter.get(c.id);
      const written = c.passages.reduce((a, id) => a + words.get(id), 0);
      return { id: c.id, title: c.title, draft: c.draft, written, avgPath: avg(arr), minutes: avg(arr) / wpm };
    }),
    endings: [...endings.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => [k, n / walks]),
  };
}
