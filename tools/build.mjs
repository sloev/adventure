#!/usr/bin/env node
// Builds every book in books/ into:
//   dist/index.html                 library page
//   dist/<slug>/index.html          web reader
//   dist/<slug>/book.json           compiled story
//   dist/<slug>/print.html          print edition (numbered sections, paged CSS)
// Flags: --check (validate only), --stats (print reading-time report)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBook } from './lib/parse.mjs';
import { renderMarkdown, renderInline } from './lib/render.mjs';
import { validate, stats } from './lib/analyze.mjs';

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
  console.log(`\n${book.meta.title} (${slug}): ${book.passages.size} passages in ${book.chapters.length} sessions`);
  warnings.forEach((w) => console.log(`  warn  ${w}`));
  errors.forEach((e) => console.log(`  ERROR ${e}`));
  if (errors.length) {
    failed = true;
    continue;
  }
  const s = stats(book);
  if (args.has('--stats') || args.has('--check')) printStats(s, book);
  if (args.has('--check')) continue;

  const out = path.join(dist, slug);
  fs.mkdirSync(out, { recursive: true });
  const compiled = compile(book);
  fs.writeFileSync(path.join(out, 'book.json'), JSON.stringify(compiled));
  fs.writeFileSync(path.join(out, 'index.html'), readerPage(book));
  fs.writeFileSync(path.join(out, 'print.html'), printPage(book));
  library.push({ slug, meta: book.meta, sessions: book.chapters.length, hours: s.pathWords.avg / s.wpm / 60 });
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
  console.log(`  words written: ${s.totalWords.toLocaleString('en')}  |  one read-through: ~${Math.round(s.pathWords.avg).toLocaleString('en')} words ≈ ${h(s.pathWords.avg)} h at ${s.wpm} wpm (target: ${book.meta.target || 'n/a'})`);
  for (const c of s.chapters) {
    const bar = '█'.repeat(Math.min(30, Math.round(c.minutes / 2))).padEnd(30, '·');
    console.log(`  ${c.id.padEnd(28)} ${bar} ${c.minutes.toFixed(0).padStart(3)} min/read  (${c.written.toLocaleString('en')} words written)${c.draft ? '  [outline]' : ''}`);
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
    meta: { title: book.meta.title, subtitle: book.meta.subtitle, author: book.meta.author },
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
<noscript><p>The web edition needs JavaScript. A <a href="print.html">print edition</a> is available.</p></noscript>
<script src="../assets/reader.js" defer></script>`,
  });
}

function printPage(book) {
  // Sections are numbered in authored order. A choice that leads to the very
  // next section is printed as a quiet "continue", so linear stretches read
  // like an ordinary novel and you only flip pages at real decisions.
  const order = book.chapters.flatMap((c) => c.passages);
  const num = new Map(order.map((id, i) => [id, i + 1]));
  const codewords = new Set();
  for (const p of book.passages.values()) p.set.forEach((c) => codewords.add(c));

  const sections = book.chapters
    .map((c) => {
      const items = c.passages
        .map((id) => {
          const p = book.passages.get(id);
          const n = num.get(id);
          const sets = p.set.map((cw) => `<p class="cw-set">Note the codeword <b>${esc(cw)}</b>.</p>`).join('');
          const clears = p.clear.map((cw) => `<p class="cw-set">Cross out the codeword <b>${esc(cw)}</b> if you have it.</p>`).join('');
          let choices = '';
          if (p.end) choices = `<p class="ending">${esc(p.end)}</p>`;
          else if (p.tbc) choices = `<p class="ending">To be continued.</p>`;
          else if (p.choices.length === 1 && !p.choices[0].if && !p.choices[0].unless && num.get(p.choices[0].target) === n + 1)
            choices = `<p class="continue">❧</p>`;
          else if (p.choices.length === 1 && !p.choices[0].if && !p.choices[0].unless)
            choices = `<p class="goto">Turn to <b>${num.get(p.choices[0].target)}</b>.</p>`;
          else
            choices = `<ul class="choices">${p.choices
              .map((ch) => {
                const cond = ch.if
                  ? `<i>If you have the codeword${ch.if.length > 1 ? 's' : ''} ${ch.if.map((x) => `<b>${esc(x)}</b>`).join(' and ')}:</i> `
                  : ch.unless
                    ? `<i>If you do not have the codeword ${ch.unless.map((x) => `<b>${esc(x)}</b>`).join(' or ')}:</i> `
                    : '';
                return `<li>${cond}${renderInline(ch.text)} <span class="turn">turn to <b>${num.get(ch.target)}</b></span></li>`;
              })
              .join('')}</ul>`;
          return `<section class="sec" id="s${n}"><h3 class="sec-num">${n}</h3>${renderMarkdown(p.text)}${sets}${clears}${choices}</section>`;
        })
        .join('\n');
      return `<div class="chapter"><header class="chapter-head"><p class="session">Session ${c.index + 1} of ${book.chapters.length}</p><h2>${esc(c.title)}</h2><p class="subtitle">${esc(c.subtitle)}</p></header>${items}</div>`;
    })
    .join('\n');

  const front = `<div class="titlepage"><h1>${esc(book.meta.title)}</h1><p class="subtitle">${esc(book.meta.subtitle || '')}</p><p class="author">${esc(book.meta.author || '')}</p></div>
<div class="howto"><h2>How to read this book</h2>
<p>This is not an ordinary novel. You read it section by section. Most of the time a section flows straight into the next one; when you reach a choice, pick one and turn to the numbered section it names. Section numbers are printed large at the top of each section.</p>
<p>The book is divided into ${book.chapters.length} sessions of roughly an hour each. A session ends at a natural stopping point. Put a bookmark in, and come back tomorrow.</p>
<p>Some sections ask you to note a <b>codeword</b>. Write it on the sheet below. Later sections may ask whether you have it. Codewords are how the book remembers who you have been.</p>
<div class="sheet"><h3>Codeword sheet</h3><div class="sheet-grid">${Array.from({ length: 24 }, () => '<span></span>').join('')}</div><p class="muted">Bookmark (section): ______ &nbsp;&nbsp; Session: ______</p></div>
<p>Begin at section <b>1</b>.</p></div>`;

  return shell({
    title: `${book.meta.title} — print edition`,
    css: ['../assets/artifacts.css', '../assets/print.css'],
    bodyClass: 'print',
    body: front + sections,
  });
}

function libraryPage(books) {
  return shell({
    title: 'Adventure — interactive fiction',
    css: ['assets/reader.css'],
    bodyClass: 'library',
    body: `<main class="lib"><h1>Adventure</h1><p class="lede">Interactive fiction with unusual focuses. Each book is about two weeks of reading at an hour a day, and works on screen and on paper.</p>
${books
  .map(
    (b) => `<article class="book-card"><h2><a href="${b.slug}/">${esc(b.meta.title)}</a></h2><p class="subtitle">${esc(b.meta.subtitle || '')}</p>
<div class="blurb">${renderMarkdown(b.meta.blurb || '')}</div>
<p class="muted">${b.sessions} sessions · <a href="${b.slug}/">Read online</a> · <a href="${b.slug}/print.html">Print edition</a></p></article>`
  )
  .join('\n')}</main>`,
  });
}
