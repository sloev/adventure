// Markdown + artifact blocks → LaTeX, using the macros in tools/latex/template.tex.
import fs from 'node:fs';
import path from 'node:path';
import { Lexer } from 'marked';
import { EMOJI, smartQuotes } from './text.mjs';
import { chatLines, headerAndBody, initials, hue } from './render.mjs';

const ESC = { '\\': '\\textbackslash{}', '{': '\\{', '}': '\\}', $: '\\$', '&': '\\&', '#': '\\#', _: '\\_', '%': '\\%', '^': '\\textasciicircum{}', '~': '\\textasciitilde{}' };
const escRaw = (s) => s.replace(/[\\{}$&#_%^~]/g, (c) => ESC[c]);

// Prose text: emoji shortcodes → \twemoji, quotes → typographic, specials escaped.
function escText(s, { quotes = true } = {}) {
  const out = [];
  let last = 0;
  for (const m of s.matchAll(/:([a-z0-9_+-]+):/g)) {
    if (!EMOJI[m[1]]) continue;
    out.push(prose(s.slice(last, m.index), quotes), `\\twemoji{${EMOJI[m[1]]}}`);
    last = m.index + m[0].length;
  }
  out.push(prose(s.slice(last), quotes));
  return out.join('');
}
function prose(s, quotes) {
  if (quotes) s = smartQuotes(s);
  return escRaw(s).replace(/\.\.\./g, '…').replace(/(\d)–(\d)/g, '$1--$2');
}
// Code: escaped, with break points after punctuation so long identifiers wrap.
const escCode = (s) => escRaw(s).replace(/([./:,–-])/g, '$1\\allowbreak{}');

function unescapeHtml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

export function inline(tokens) {
  return (tokens || [])
    .map((t) => {
      switch (t.type) {
        case 'text':
          return t.tokens ? inline(t.tokens) : escText(unescapeHtml(t.text));
        case 'escape':
          return escText(t.text, { quotes: false });
        case 'strong':
          return `\\textbf{${inline(t.tokens)}}`;
        case 'em':
          return `\\emph{${inline(t.tokens)}}`;
        case 'del':
          return `\\sout{${inline(t.tokens)}}`;
        case 'codespan':
          return `\\gbcode{${escCode(unescapeHtml(t.text))}}`;
        case 'link':
          return inline(t.tokens);
        case 'br':
          return '\\\\';
        case 'html':
          return '';
        default:
          return escText(t.raw || '');
      }
    })
    .join('');
}

export const inlineMd = (s) => inline(Lexer.lexInline(s));

function chat(src) {
  return chatLines(src)
    .map((l) => {
      if (l.divider) return `\\gbdivider{${escText(l.divider)}}`;
      if (l.system) return `\\gbsystem{${inlineMd(l.system)}}`;
      const color = avatarHex(l.who);
      const body = l.body.map(inlineMd).join('\\\\ ');
      const msg = l.cont
        ? `\\${l.reply ? 'gbreplycont' : 'gbcont'}{${body}}`
        : `\\${l.reply ? 'gbreply' : 'gbmsg'}{${color}}{${escRaw(initials(l.who))}}{${escText(l.who)}}{${escText(l.when, { quotes: false })}}{${body}}`;
      const reactions = l.reactions
        ? `\n\\gbreactions{${l.reactions
            .split(/\s{2,}/)
            .map((r) => `\\gbreaction{${escText(r, { quotes: false })}}`)
            .join('')}}`
        : '';
      return msg + reactions;
    })
    .join('\n');
}

function avatarHex(name) {
  // Mid-dark tints so initials stay legible and print to distinct greys.
  const h = hue(name) / 360, s = 0.42, l = 0.4;
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

const fields = (fs) => fs.map(([k, v]) => `\\gbfield{${escText(k)}}{${inlineMd(v)}}`).join('\n');

const blocks = {
  slack: (info, src) => `\\begin{gbslack}{${escText(info || '#general', { quotes: false })}}\n${chat(src)}\n\\end{gbslack}`,
  dm: (info, src) => `\\begin{gbdm}{${escText(info || 'Direct message')}}\n${chat(src)}\n\\end{gbdm}`,
  phone: (info, src) => `\\begin{gbphone}{${escText(info || 'Messages')}}\n${chat(src)}\n\\end{gbphone}`,
  email(info, src) {
    const { fields: f, body } = headerAndBody(src);
    return `\\begin{gbemail}\n${fields(f)}\n\\gbfieldrule\n${blockMd(body, { indent: false })}\n\\end{gbemail}`;
  },
  pager(info, src) {
    const { fields: f, body } = headerAndBody(src);
    const title = f.find(([k]) => k === 'title')?.[1] || '';
    return `\\begin{gbpager}{${escText((info || 'P2').toUpperCase())}}\n{\\small\\bfseries ${inlineMd(title)}\\par}\\vspace{1mm}\n${fields(
      f.filter(([k]) => k !== 'title')
    )}${body ? `\n\\vspace{1mm}{\\ttfamily\\footnotesize ${escCode(body)}\\par}` : ''}\n\\end{gbpager}`;
  },
  pr(info, src) {
    const m = (info || '').match(/^(#\d+)\s+(.*)$/) || [null, '', info || ''];
    const [headSrc, ...rest] = src.split(/\n---\n/);
    const { fields: f } = headerAndBody(headSrc);
    const status = f.find(([k]) => k.toLowerCase() === 'status')?.[1] || 'open';
    const meta = f.filter(([k]) => k.toLowerCase() !== 'status');
    return `\\begin{gbpr}{\\gbtag{${escText(status)}}\\enspace ${inlineMd(m[2])} {\\mdseries\\color{muted}${escText(m[1])}}}\n${fields(meta)}${
      rest.length ? `\n\\gbfieldrule\n${chat(rest.join('\n'))}` : ''
    }\n\\end{gbpr}`;
  },
  terminal(info, src) {
    const lines = src
      .split('\n')
      .map((l) => (l.length ? escRaw(l).replace(/ /g, '\\ ') : '\\mbox{}'))
      .join('\\\\\n');
    return info ? `\\begin{gbterminal}{${escRaw(info)}}\n${lines}\n\\end{gbterminal}` : `\\begin{gbterminalnotitle}\n${lines}\n\\end{gbterminalnotitle}`;
  },
  calendar(info, src) {
    const rows = src
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => {
        const m = l.match(/^(\d{1,2}:\d{2}(?:\s*[–-]\s*\d{1,2}:\d{2})?)\s+(.*)$/);
        return m ? `\\gbcalrow{${escText(m[1].replace(/-/g, '–'))}}{${inlineMd(m[2])}}` : `\\gbcalnote{${inlineMd(l)}}`;
      })
      .join('\n');
    return `\\begin{gbcalendar}{${escText(info || 'Calendar')}}\n${rows}\n\\end{gbcalendar}`;
  },
  doc(info, src) {
    const body = blockMd(src, { indent: false });
    return info ? `\\begin{gbdoc}{${escText(info)}}\n${body}\n\\end{gbdoc}` : `\\begin{gbdocnotitle}\n${body}\n\\end{gbdocnotitle}`;
  },
};

function table(t) {
  const n = t.header.length;
  const spec = t.align.map((a, i) => (i === n - 1 ? '>{\\raggedright\\arraybackslash}X' : a === 'right' ? 'r' : 'l')).join(' ');
  const row = (cells) => cells.map((c) => inline(c.tokens)).join(' & ') + ' \\\\';
  return `\\par\\noindent\\begin{tabularx}{\\linewidth}{@{}${spec}@{}}\n\\toprule\n{\\bfseries}${row(t.header)}\n\\midrule\n${t.rows
    .map(row)
    .join('\n')}\n\\bottomrule\n\\end{tabularx}\\par\\vspace{1mm}`;
}

export function blockMd(src, { indent = true } = {}) {
  const tokens = new Lexer({ gfm: true }).lex(src);
  const out = [];
  let first = true;
  for (const t of tokens) {
    switch (t.type) {
      case 'space':
        continue;
      case 'paragraph':
        out.push(`${first || !indent ? '\\noindent ' : ''}${inline(t.tokens)}\\par`);
        break;
      case 'hr':
        out.push('\\gbscenebreak');
        first = true;
        continue;
      case 'heading':
        out.push(`\\par\\vspace{1mm}{\\bfseries ${inline(t.tokens)}\\par}\\vspace{0.5mm}`);
        break;
      case 'list':
        out.push(
          `\\begin{${t.ordered ? 'enumerate' : 'itemize'}}[leftmargin=1.2em,itemsep=0.3mm,topsep=0.8mm,parsep=0pt]\n${t.items
            .map((i) => `\\item ${i.tokens.map((x) => (x.tokens ? inline(x.tokens) : escText(x.text || ''))).join(' ')}`)
            .join('\n')}\n\\end{${t.ordered ? 'enumerate' : 'itemize'}}`
        );
        break;
      case 'table':
        out.push(table(t));
        break;
      case 'blockquote':
        out.push(`\\begin{quote}\\itshape\n${blockMd(t.text, { indent: false })}\n\\end{quote}`);
        break;
      case 'code': {
        const [kind, ...rest] = (t.lang || '').split(/\s+/);
        out.push(blocks[kind] ? blocks[kind](rest.join(' ').trim(), t.text) : blocks.terminal('', t.text));
        first = true;
        continue;
      }
      case 'html':
        continue;
      default:
        out.push(escText(t.raw));
    }
    first = false;
  }
  return out.join('\n\n');
}

export function bookToLatex(book, templatePath) {
  // Page-based gamebook layout (the classic "turn to page N" convention):
  //  - every passage the reader can jump to starts at the top of a new page;
  //  - a passage only flows on from the one before it when that is its single
  //    way in, so you never read into a branch you didn't choose;
  //  - every reference is a real page number, resolved by LaTeX (\pageref).
  const order = book.chapters.flatMap((c) => c.passages);
  const incoming = new Map(order.map((id) => [id, []]));
  for (const id of order) {
    const p = book.passages.get(id);
    const single = p.choices.length === 1 && !p.choices[0].if && !p.choices[0].unless;
    for (const ch of p.choices) incoming.get(ch.target)?.push({ from: id, single });
  }
  const label = (id) => `p:${id}`;
  const page = (id) => `\\gbpage{${label(id)}}`;
  const flowsFrom = (id, prev) => {
    const inc = incoming.get(id);
    return !!prev && inc.length === 1 && inc[0].from === prev && inc[0].single && book.passages.get(prev).chapter === book.passages.get(id).chapter;
  };
  const cwPhrase = (xs) => (xs.length === 1 ? `the codeword \\gbcw{${escRaw(xs[0])}}` : `the codewords ${xs.map((x) => `\\gbcw{${escRaw(x)}}`).join(' and ')}`);
  const neither = (xs) => (xs.length === 1 ? `If you do not have the codeword \\gbcw{${escRaw(xs[0])}}` : `If you have none of the codewords ${xs.map((x) => `\\gbcw{${escRaw(x)}}`).join(', ')}`);

  function choiceSentence(ch) {
    const cond = ch.if ? `If you have ${cwPhrase(ch.if)}` : ch.unless ? neither(ch.unless) : '';
    const phrase = ch.print ? inlineMd(ch.print) : '';
    const to = `turn to page ${page(ch.target)}.`;
    if (cond && phrase) return `${cond} ${phrase}, ${to}`;
    if (cond) return `${cond}, ${to}`;
    if (phrase) return `${phrase}, ${to}`;
    return `\\emph{${inlineMd(ch.text)}} — ${to}`;
  }

  const body = book.chapters
    .map((c) => {
      const out = [`\\gbsession{${c.index + 1}}{${planned(book)}}{${escText(c.title)}}{${escText(c.subtitle)}}`];
      c.passages.forEach((id, i) => {
        const p = book.passages.get(id);
        const prev = i > 0 ? c.passages[i - 1] : null;
        if (i > 0) out.push(flowsFrom(id, prev) ? '\\gbflow' : '\\gbnewpage');
        out.push(`\\gbanchor{${label(id)}}`, blockMd(p.text));
        p.set.forEach((cw) => out.push(`\\gbcodeword{${escRaw(cw)}}`));
        p.clear.forEach((cw) => out.push(`\\gbclearcodeword{${escRaw(cw)}}`));
        const next = c.passages[i + 1];
        const single = p.choices.length === 1 && !p.choices[0].if && !p.choices[0].unless;
        if (p.end) out.push(`\\gbtheend{${escText(p.end)}}`);
        else if (p.tbc) out.push('\\gbtbc');
        else if (single && p.choices[0].target === next && flowsFrom(next, id)) {
          /* flows straight on */
        } else if (single && book.passages.get(p.choices[0].target).chapter !== c.id)
          out.push(`\\gbsessionend{${c.index + 1}}{${label(p.choices[0].target)}}`);
        else if (single) out.push(`\\gbturnto{${label(p.choices[0].target)}}`);
        else out.push(`\\begin{gbchoices}\n${p.choices.map((ch) => `\\gbchoice{${choiceSentence(ch)}}`).join('\n')}\n\\end{gbchoices}`);
      });
      return out.join('\n\n');
    })
    .join('\n\n');

  const sheetRows = Array.from({ length: Math.ceil(sheetLines(book) / 3) }, () => '\\rule{0pt}{8mm} & & \\\\ \\cline{1-3}').join('\n');
  const blurb = blockMd(book.meta.blurb || '', { indent: true });
  const coverPath = path.join(book.dir, 'cover.tex');
  const tpl = fs
    .readFileSync(templatePath, 'utf8')
    .replace('%%COVER%%', () => (fs.existsSync(coverPath) ? fs.readFileSync(coverPath, 'utf8') : ''));
  const fill = {
    TITLE: escText(book.meta.title || ''),
    SUBTITLE: escText(book.meta.subtitle || ''),
    AUTHOR: escText(book.meta.author || ''),
    START: label(order[0]),
    SESSIONS: sessionsSentence(book),
    EDITION: escText(edition(book)),
    YEAR: String(book.meta.year || new Date().getFullYear()),
    ISBN: book.meta.isbn ? `\\noindent ISBN ${escRaw(book.meta.isbn)}\\par` : '',
    BLURB: blurb,
    SHEET: sheetRows,
    BODY: body,
  };
  return tpl.replace(/%%([A-Z]+)%%/g, (m, k) => (k in fill ? fill[k] : m));
}

function planned(book) {
  return Number(book.meta.chapters_planned || book.meta.sessions_planned) || book.chapters.length;
}
function edition(book) {
  const n = book.chapters.length, p = planned(book);
  if (n >= p) return book.meta.edition || 'First edition';
  return `Instalment: chapters 1–${n} of ${p}`;
}
function sessionsSentence(book) {
  // Only an instalment note; the book never tells the reader how long to read.
  const n = book.chapters.length, p = planned(book);
  if (n >= p) return '';
  return `\\textbf{This is an instalment.} It contains the first ${n} of ${p} chapters and ends at a page marked \\textsc{To be continued}; there are no endings yet. Keep your codeword sheet: your codewords carry over into the next instalment.`;
}

export function sheetLines(book) {
  return Number(book.meta.codeword_sheet) || 36;
}

export function templateFor(bookDir, root) {
  const own = path.join(bookDir, 'template.tex');
  return fs.existsSync(own) ? own : path.join(root, 'tools', 'latex', 'template.tex');
}
