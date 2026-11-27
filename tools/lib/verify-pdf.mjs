// Proof-reads the compiled print edition: every passage must begin on the page
// that LaTeX recorded for it, i.e. every "turn to page N" lands on the right text.
// Uses pdftotext (poppler-utils); skipped with a warning if it isn't installed.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const norm = (s) =>
  s
    .replace(/ﬃ/g, 'ffi').replace(/ﬀ/g, 'ff').replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬄ/g, 'ffl')
    .replace(/-\n/g, '')
    .replace(/[“”‘’"'*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export function verifyPdf(book, pdfPath, auxPath) {
  const r = spawnSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8', maxBuffer: 1 << 28 });
  if (r.error) return { skipped: 'pdftotext not installed' };
  const pages = r.stdout.split('\f');
  const aux = fs.readFileSync(auxPath, 'utf8');
  const labels = Object.fromEntries([...aux.matchAll(/\\newlabel\{p:([^}]+)\}\{\{[^}]*\}\{(\d+)\}/g)].map((m) => [m[1], +m[2]]));
  // Arabic page 1 is the first page of the main matter (chapter 1's opening page).
  const first = pages.findIndex((t) => /CHAPTER 1(?!\d)/.test(t));
  const bad = [];
  for (const [id, p] of book.passages) {
    const pg = labels[id];
    if (!pg) {
      bad.push(`${id}: no page label`);
      continue;
    }
    // Compare the first words of the first prose paragraph (artifact boxes are skipped).
    const firstPara = p.text.replace(/```[\s\S]*?```/g, '\n\n').split(/\n\s*\n/).map((x) => x.trim()).find(Boolean) || '';
    const opening = norm(firstPara.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')).split(' ').slice(0, 5).join(' ');
    if (!opening) continue;
    if (!norm(pages[first + pg - 1] || '').includes(opening)) bad.push(`${id}: expected on page ${pg}, opening "${opening}" not found there`);
  }
  return { checked: book.passages.size, bad };
}
