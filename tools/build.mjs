#!/usr/bin/env node
// Builds every book in books/ into:
//   dist/index.html                 library page
//   dist/<slug>/index.html          web reader
//   dist/<slug>/book.json           compiled story
//   dist/<slug>/<slug>.tex          print edition source (LaTeX, see tools/latex/template.tex)
//   dist/<slug>/<slug>.pdf          print edition, with --pdf (needs xelatex)
//   dist/<slug>/<slug>-1bit.pdf     strictly 1-bit black & white print master (tools/onebit)
// Flags: --check (validate only), --stats (reading-time report), --pdf (compile LaTeX)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBook } from './lib/parse.mjs';
import { renderMarkdown, renderInline } from './lib/render.mjs';
import { validate, stats } from './lib/analyze.mjs';
import { bookToLatex, templateFor, sheetLines } from './lib/latex.mjs';
import { audit } from './lib/audit.mjs';
import { verifyPdf } from './lib/verify-pdf.mjs';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const booksDir = path.join(root, 'books');
const dist = path.join(root, 'dist');
const webDir = path.join(root, 'web');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugs = fs
  .readdirSync(booksDir)
  .filter((d) => fs.existsSync(path.join(booksDir, d, 'book.md')))
  .filter((d) => !only.length || only.includes(d));

let failed = false;
const library = [];

for (const slug of slugs) {
  const book = loadBook(path.join(booksDir, slug));
  const { errors, warnings } = validate(book);
  console.log(`\n${book.meta.title} (${slug}): ${book.passages.size} passages in ${book.chapters.length} chapters`);
  warnings.forEach((w) => console.log(`  warn  ${w}`));
  errors.forEach((e) => console.log(`  ERROR ${e}`));
  if (errors.length) {
    failed = true;
    continue;
  }
  const s = stats(book);
  if (args.has('--stats') || args.has('--check')) printStats(s, book);
  else console.log(`  one read-through ≈ ${(s.pathWords.avg / s.wpm / 60).toFixed(1)} h`);
  if (args.has('--check')) continue;

  const out = path.join(dist, slug);
  fs.mkdirSync(out, { recursive: true });
  const compiled = compile(book);
  fs.writeFileSync(path.join(out, 'book.json'), JSON.stringify(compiled));
  fs.writeFileSync(path.join(out, 'index.html'), readerPage(book));
  const tex = bookToLatex(book, templateFor(book.dir, root));
  fs.writeFileSync(path.join(out, `${slug}.tex`), tex);
  // 1-bit edition source: identical layout, no grey text (see template.tex).
  fs.writeFileSync(path.join(out, `${slug}-1bit.tex`), '\\def\\gbonebit{}\n' + tex);
  if ((args.has('--pdf') || args.has('--audit')) && !compilePdf(out, slug, book)) failed = true;
  else if (args.has('--pdf') && !args.has('--no-1bit') && !compileOneBit(out, slug)) failed = true;
  if (args.has('--audit')) {
    const aux = path.join(out, 'latex', `${slug}.aux`);
    const labels = fs.existsSync(aux)
      ? Object.fromEntries([...fs.readFileSync(aux, 'utf8').matchAll(/\\newlabel\{p:([^}]+)\}\{\{[^}]*\}\{(\d+)\}/g)].map((m) => [m[1], +m[2]]))
      : {};
    const a = audit(book, { labels, pdfPath: path.join(out, `${slug}.pdf`), ledgerPath: path.join(book.dir, 'codewords.md'), sheetLines: sheetLines(book) });
    fs.writeFileSync(path.join(book.dir, 'AUDIT.md'), a.markdown);
    console.log(`  audit: books/${slug}/AUDIT.md — ${a.issues.length} issue(s), max ${a.maxHeld} codewords held on one route`);
    a.issues.forEach((i) => console.log(`  audit ${i}`));
  }
  library.push({ slug, meta: book.meta, chapters: book.chapters.length, pdf: fs.existsSync(path.join(out, `${slug}.pdf`)), onebit: fs.existsSync(path.join(out, `${slug}-1bit.pdf`)) });
}

if (!args.has('--check') && !failed) {
  fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
  for (const f of fs.readdirSync(webDir)) fs.copyFileSync(path.join(webDir, f), path.join(dist, 'assets', f));
  fs.writeFileSync(path.join(dist, 'index.html'), libraryPage(library));
  console.log(`\nBuilt ${library.length} book(s) into dist/`);
}
process.exit(failed ? 1 : 0);

function printStats(s, book) {
  const h = (w) => (w / s.wpm / 60).toFixed(1);
  console.log(`  words written: ${s.totalWords.toLocaleString('en')}  |  one read-through: ~${Math.round(s.pathWords.avg).toLocaleString('en')} words ≈ ${h(s.pathWords.avg)} h at ${s.wpm} wpm (target: ${book.meta.target_hours ? `~${book.meta.target_hours} h` : book.meta.target || 'n/a'})`);
  for (const c of s.chapters) {
    const bar = '█'.repeat(Math.min(30, Math.round(c.minutes / 2))).padEnd(30, '·');
    console.log(`  ${c.id.padEnd(28)} ${bar} ${c.minutes.toFixed(0).padStart(3)} min  (${c.written.toLocaleString('en')} words written)${c.draft ? '  [outline]' : ''}`);
  }
  console.log('  endings reached by random readers:');
  for (const [k, f] of s.endings) console.log(`    ${(f * 100).toFixed(1).padStart(5)}%  ${k}`);
}

function compile(book) {
  const passages = {};
  for (const p of book.passages.values()) {
    passages[p.id] = {
      c: p.chapter,
      h: renderMarkdown(p.text),
      ...(p.set.length && { set: p.set }),
      ...(p.clear.length && { clear: p.clear }),
      ...(p.end && { end: p.end }),
      ...(p.tbc && { tbc: true }),
      ch: p.choices.map((c) => ({ t: renderInline(c.text), to: c.target, ...(c.if && { if: c.if }), ...(c.unless && { unless: c.unless }) })),
    };
  }
  return {
    meta: { title: book.meta.title, subtitle: book.meta.subtitle, author: book.meta.author, chaptersPlanned: Number(book.meta.chapters_planned || book.meta.sessions_planned) || book.chapters.length },
    start: book.chapters[0].start,
    chapters: book.chapters.map((c) => ({ id: c.id, title: c.title, subtitle: c.subtitle, start: c.start })),
    passages,
  };
}

function shell({ title, body, css, extraHead = '', bodyClass = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap">
${css.map((c) => `<link rel="stylesheet" href="${c}">`).join('\n')}
${extraHead}
</head>
<body class="${bodyClass}">
${body}
</body>
</html>
`;
}

function readerPage(book) {
  return shell({
    title: book.meta.title,
    css: ['../assets/artifacts.css', '../assets/reader.css'],
    bodyClass: 'reader',
    body: `<header class="topbar">
  <a class="home" href="../">← Library</a>
  <div class="progress" aria-hidden="true"><div class="progress-fill"></div></div>
  <div class="tools">
    <button id="btn-undo" title="Undo last choice">Undo</button>
    <button id="btn-codewords" title="Your codewords">Codewords</button>
    <button id="btn-theme" title="Toggle dark mode">◐</button>
    <button id="btn-restart" title="Start over">Restart</button>
  </div>
</header>
<main id="story" aria-live="polite"></main>
<dialog id="codewords"><h2>Codewords</h2><p class="muted">The print edition asks you to note these on your codeword sheet. Here, the book remembers for you.</p><ul></ul><form method="dialog"><button>Close</button></form></dialog>
<noscript><p>The web edition needs JavaScript. See the print edition (PDF) in the library.</p></noscript>
<script src="../assets/reader.js" defer></script>`,
  });
}

function xelatex(out, job) {
  // Rerun until page references are stable (page numbers can shift the layout).
  const build = path.join(out, 'latex');
  fs.mkdirSync(build, { recursive: true });
  for (let pass = 1; pass <= 5; pass++) {
    const r = spawnSync('xelatex', ['-interaction=nonstopmode', '-halt-on-error', `-output-directory=${build}`, path.join(out, `${job}.tex`)], { encoding: 'utf8' });
    if (r.error || r.status !== 0) return r;
    if (pass >= 2 && !/Rerun to get|Label\(s\) may have changed/.test(fs.readFileSync(path.join(build, `${job}.log`), 'utf8'))) break;
  }
  return { status: 0 };
}

function compileOneBit(out, slug) {
  const r = xelatex(out, `${slug}-1bit`);
  if (r.status !== 0) {
    console.log(`  ERROR xelatex failed for the 1-bit edition (see dist/${slug}/latex/${slug}-1bit.log)`);
    return false;
  }
  const pagesOf = (f) => (spawnSync('pdfinfo', [f], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1];
  const src = path.join(out, 'latex', `${slug}-1bit.pdf`);
  if (pagesOf(src) !== pagesOf(path.join(out, `${slug}.pdf`))) {
    console.log('  ERROR the 1-bit edition does not have the same page count as the colour edition');
    return false;
  }
  const t0 = Date.now();
  const s = spawnSync('python3', [path.join(root, 'tools', 'onebit', 'onebit.py'), src, path.join(out, `${slug}-1bit.pdf`)], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
  if (s.status !== 0) {
    console.log('  ERROR 1-bit screening failed (needs python3 with numpy + Pillow, cc, poppler-utils)');
    return false;
  }
  const list = spawnSync('pdfimages', ['-list', path.join(out, `${slug}-1bit.pdf`)], { encoding: 'utf8' }).stdout.split('\n').slice(2).filter(Boolean);
  const notOneBit = list.filter((l) => l.trim().split(/\s+/)[7] !== '1');
  if (!list.length || notOneBit.length) {
    console.log(`  ERROR 1-bit edition contains ${notOneBit.length} image(s) that are not 1 bit per pixel`);
    return false;
  }
  console.log(`  1-bit edition: dist/${slug}/${slug}-1bit.pdf (${list.length} pages, all 1 bpp, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  return true;
}

function compilePdf(out, slug, book) {
  // Two passes so running heads and PDF bookmarks settle.
  const build = path.join(out, 'latex');
  fs.mkdirSync(build, { recursive: true });
  // Rerun until page references are stable (page numbers can shift the layout).
  for (let pass = 1; pass <= 5; pass++) {
    const r = spawnSync('xelatex', ['-interaction=nonstopmode', '-halt-on-error', `-output-directory=${build}`, path.join(out, `${slug}.tex`)], { encoding: 'utf8' });
    if (r.error) {
      console.log('  ERROR xelatex not found — install TeX Live (texlive-xetex, texlive-latex-extra, tex-gyre, fonts-texgyre, fonts-dejavu)');
      return false;
    }
    if (r.status !== 0) {
      const log = r.stdout.split('\n');
      const i = log.findIndex((l) => l.startsWith('!'));
      console.log(`  ERROR xelatex failed:\n${log.slice(Math.max(0, i - 2), i + 12).join('\n')}\n  full log: ${path.relative(root, path.join(build, slug + '.log'))}`);
      return false;
    }
    if (pass >= 2 && !/Rerun to get|Label\(s\) may have changed/.test(fs.readFileSync(path.join(build, `${slug}.log`), 'utf8'))) break;
  }
  fs.copyFileSync(path.join(build, `${slug}.pdf`), path.join(out, `${slug}.pdf`));
  // pdfinfo, not the TeX log: the log wraps lines at 79 chars, sometimes mid-number.
  const pages = (spawnSync('pdfinfo', [path.join(out, `${slug}.pdf`)], { encoding: 'utf8' }).stdout.match(/Pages:\s+(\d+)/) || [])[1];
  console.log(`  print edition: dist/${slug}/${slug}.pdf (${pages} pages, A5)`);
  const v = verifyPdf(book, path.join(out, `${slug}.pdf`), path.join(build, `${slug}.aux`));
  if (v.skipped) console.log(`  warn  page references not verified: ${v.skipped}`);
  else if (v.bad.length) {
    v.bad.forEach((b) => console.log(`  ERROR ${b}`));
    return false;
  } else console.log(`  page references verified: all ${v.checked} passages start on the page they are referenced as`);
  return true;
}

function libraryPage(books) {
  return shell({
    title: 'Adventure — interactive fiction',
    css: ['assets/reader.css'],
    bodyClass: 'library',
    body: `<main class="lib"><h1>Adventure</h1><p class="lede">Interactive fiction with unusual focuses. Each book is around fourteen hours of reading, and works on screen and on paper.</p>
${books
  .map(
    (b) => `<article class="book-card"><h2><a href="${b.slug}/">${esc(b.meta.title)}</a></h2><p class="subtitle">${esc(b.meta.subtitle || '')}</p>
<div class="blurb">${renderMarkdown(b.meta.blurb || '')}</div>
<p class="muted">${b.chapters} chapters · <a href="${b.slug}/">Read online</a>${b.pdf ? ` · <a href="${b.slug}/${b.slug}.pdf">Print edition (PDF)</a>` : ''}${b.onebit ? ` · <a href="${b.slug}/${b.slug}-1bit.pdf">1-bit print master</a>` : ''}</p></article>`
  )
  .join('\n')}</main>`,
  });
}
