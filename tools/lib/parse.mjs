// Parser for the adventure book source format. See docs/FORMAT.md.
import fs from 'node:fs';
import path from 'node:path';

const PASSAGE_RE = /^::\s*([A-Za-z0-9_.-]+)\s*$/;
// * [Web text](target) [if|unless CODEWORD, ...] [| Print phrasing]
const CHOICE_RE = /^\*\s*\[(.+?)\]\(([A-Za-z0-9_.-]+)\)\s*(?:(if|unless)\s+([A-Z0-9_ ,]+?))?\s*(?:\|\s*(.+?))?\s*$/;
const DIRECTIVE_RE = /^@(set|clear|end|tbc|note)\b\s*(.*)$/;

export function parseFrontmatter(src) {
  const meta = {};
  if (!src.startsWith('---')) return { meta, body: src };
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { meta, body: src };
  for (const line of src.slice(3, end).split('\n')) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1');
  }
  return { meta, body: src.slice(src.indexOf('\n', end + 1) + 1) };
}

function codewordList(s) {
  return s.split(/[ ,]+/).map((x) => x.trim()).filter(Boolean);
}

export function parseChapter(src, file) {
  const { meta, body } = parseFrontmatter(src);
  const passages = [];
  let cur = null;
  let inFence = false;
  const lines = body.split('\n');
  lines.forEach((line, i) => {
    const loc = `${file}:${i + 1 + (src.split('\n').length - lines.length)}`;
    if (/^```/.test(line)) inFence = !inFence;
    if (!inFence) {
      const pm = line.match(PASSAGE_RE);
      if (pm) {
        cur = { id: pm[1], loc, text: [], set: [], clear: [], choices: [], end: null, tbc: false, notes: [] };
        passages.push(cur);
        return;
      }
    }
    if (!cur) {
      if (line.trim()) throw new Error(`${loc}: text before first passage marker (:: id)`);
      return;
    }
    if (!inFence) {
      const cm = line.match(CHOICE_RE);
      if (cm) {
        const choice = { text: cm[1], target: cm[2], loc };
        if (cm[3] === 'if') choice.if = codewordList(cm[4]);
        if (cm[3] === 'unless') choice.unless = codewordList(cm[4]);
        if (cm[5]) choice.print = cm[5];
        cur.choices.push(choice);
        return;
      }
      const dm = line.match(DIRECTIVE_RE);
      if (dm) {
        const [, kind, arg] = dm;
        if (kind === 'set') cur.set.push(...codewordList(arg));
        else if (kind === 'clear') cur.clear.push(...codewordList(arg));
        else if (kind === 'end') cur.end = arg || 'The End';
        else if (kind === 'tbc') cur.tbc = true;
        else if (kind === 'note') cur.notes.push(arg); // author note, never rendered
        return;
      }
    }
    cur.text.push(line);
  });
  for (const p of passages) p.text = p.text.join('\n').trim();
  return { meta, passages };
}

export function loadBook(dir) {
  const bookFile = path.join(dir, 'book.md');
  const { meta, body } = parseFrontmatter(fs.readFileSync(bookFile, 'utf8'));
  const chapterDir = path.join(dir, 'chapters');
  const files = fs.readdirSync(chapterDir).filter((f) => f.endsWith('.md')).sort();
  const chapters = [];
  const passages = new Map();
  const errors = [];
  for (const f of files) {
    const rel = path.relative(process.cwd(), path.join(chapterDir, f));
    const parsed = parseChapter(fs.readFileSync(path.join(chapterDir, f), 'utf8'), rel);
    const chapter = {
      id: f.replace(/\.md$/, ''),
      index: chapters.length,
      title: parsed.meta.title || f,
      subtitle: parsed.meta.subtitle || '',
      draft: parsed.meta.draft === 'true',
      start: parsed.passages[0]?.id,
      passages: parsed.passages.map((p) => p.id),
    };
    chapters.push(chapter);
    for (const p of parsed.passages) {
      if (passages.has(p.id)) errors.push(`${p.loc}: duplicate passage id "${p.id}" (first at ${passages.get(p.id).loc})`);
      p.chapter = chapter.id;
      passages.set(p.id, p);
    }
  }
  return {
    slug: path.basename(dir),
    dir,
    meta: { ...meta, blurb: body.trim() },
    chapters,
    passages,
    errors,
  };
}
