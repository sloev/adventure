// Markdown rendering with "artifact" blocks: Slack threads, emails, pager alerts,
// pull requests, terminals, calendars and generic documents. The same HTML is
// used by the web reader and the print edition; CSS decides how it looks.
import { Marked } from 'marked';
import { emojiToUnicode, smartQuotes } from './text.mjs';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Prose text tokens get typographic quotes and emoji; code is left alone.
const typography = {
  walkTokens(token) {
    if (token.type === 'text' && !token.tokens) token.text = emojiToUnicode(smartQuotes(token.text));
  },
};
const inlineMd = new Marked({ gfm: true, breaks: false }).use(typography);
const inline = (s) => inlineMd.parseInline(s);

// Chat-style lines:  Name [09:14]: message
// Continuation lines (indented by two spaces) belong to the previous message.
// Reaction lines start with "~ ", e.g. "~ :eyes: 3  :+1: 2".
// Thread replies start with "> ".
const MSG_RE = /^(>\s*)?(.+?) \[([^\]]+)\]:\s?(.*)$/;
export function chatLines(src) {
  const out = [];
  for (const raw of src.split('\n')) {
    if (!raw.trim()) continue;
    const m = raw.match(MSG_RE);
    if (m) {
      const prev = out[out.length - 1];
      const who = m[2].trim();
      // Like Slack: consecutive messages from the same person are grouped.
      const cont = !!prev && prev.who === who && prev.reply === !!m[1];
      out.push({ reply: !!m[1], who, when: m[3], body: [m[4]], reactions: '', cont });
    } else if (raw.startsWith('~ ') && out.length) {
      out[out.length - 1].reactions = raw.slice(2).trim();
    } else if (raw.startsWith('-- ')) {
      out.push({ divider: raw.slice(3).trim() });
    } else if (out.length && !out[out.length - 1].divider) {
      out[out.length - 1].body.push(raw.replace(/^\s{1,2}/, ''));
    } else {
      out.push({ system: raw.trim() });
    }
  }
  return out;
}

export function initials(name) {
  return name.replace(/[^\p{L}\s_-]/gu, '').split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export function hue(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

function renderChat(lines, cls = 'chat') {
  return lines
    .map((l) => {
      if (l.divider) return `<div class="${cls}-divider"><span>${esc(l.divider)}</span></div>`;
      if (l.system) return `<div class="${cls}-system">${inline(l.system)}</div>`;
      const reactions = l.reactions
        ? `<div class="${cls}-reactions">${l.reactions
            .split(/\s{2,}/)
            .map((r) => `<span>${esc(emojiToUnicode(r))}</span>`)
            .join('')}</div>`
        : '';
      if (l.cont)
        return `<div class="${cls}-msg cont${l.reply ? ' reply' : ''}"><div class="avatar-gap" aria-hidden="true"></div><div class="${cls}-content"><div class="${cls}-body" title="${esc(l.when)}">${l.body.map(inline).join('<br>')}</div>${reactions}</div></div>`;
      return `<div class="${cls}-msg${l.reply ? ' reply' : ''}">
<div class="avatar" style="--h:${hue(l.who)}" aria-hidden="true">${esc(initials(l.who))}</div>
<div class="${cls}-content"><div class="${cls}-head"><b>${esc(l.who)}</b> <time>${esc(l.when)}</time></div>
<div class="${cls}-body">${l.body.map(inline).join('<br>')}</div>${reactions}</div></div>`;
    })
    .join('\n');
}

export function headerAndBody(src) {
  const [head, ...rest] = src.split(/\n\s*\n/);
  const fields = [];
  for (const line of head.split('\n')) {
    const m = line.match(/^([\w -]+):\s*(.*)$/);
    if (m) fields.push([m[1], m[2]]);
  }
  return { fields, body: rest.join('\n\n') };
}

const blocks = {
  slack(info, src) {
    const channel = info || '#general';
    return `<figure class="artifact slack"><figcaption><span class="slack-channel">${esc(channel)}</span></figcaption>
<div class="slack-log">${renderChat(chatLines(src))}</div></figure>`;
  },
  dm(info, src) {
    return `<figure class="artifact slack dm"><figcaption><span class="slack-channel">${esc(info || 'Direct message')}</span></figcaption>
<div class="slack-log">${renderChat(chatLines(src))}</div></figure>`;
  },
  email(info, src) {
    const { fields, body } = headerAndBody(src);
    return `<figure class="artifact email"><dl class="email-head">${fields
      .map(([k, v]) => `<div class="email-${esc(k.toLowerCase())}"><dt>${esc(k)}</dt><dd>${inline(v)}</dd></div>`)
      .join('')}</dl><div class="email-body">${new Marked({ gfm: true }).use(typography).parse(body)}</div></figure>`;
  },
  pager(info, src) {
    const { fields, body } = headerAndBody(src);
    const sev = (info || 'P2').toUpperCase();
    const title = fields.find(([k]) => k === 'title')?.[1] || '';
    return `<figure class="artifact pager sev-${esc(sev.toLowerCase())}"><div class="pager-bar"><span class="pager-sev">${esc(sev)}</span> <span class="pager-state">TRIGGERED</span></div>
<div class="pager-title">${inline(title)}</div><dl>${fields
      .filter(([k]) => k !== 'title')
      .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${inline(v)}</dd></div>`)
      .join('')}</dl>${body ? `<div class="pager-body">${inline(body)}</div>` : ''}</figure>`;
  },
  pr(info, src) {
    // info: "#4821 Title of the PR"
    const m = (info || '').match(/^(#\d+)\s+(.*)$/) || [null, '', info || ''];
    const [headSrc, ...rest] = src.split(/\n---\n/);
    const { fields } = headerAndBody(headSrc);
    const get = (k) => fields.find(([f]) => f.toLowerCase() === k)?.[1];
    const status = (get('status') || 'open').toLowerCase();
    const meta = fields.filter(([k]) => !['status'].includes(k.toLowerCase()));
    return `<figure class="artifact pr"><div class="pr-head"><span class="pr-status pr-${esc(status)}">${esc(status)}</span>
<span class="pr-title">${inline(m[2])} <span class="pr-num">${esc(m[1])}</span></span></div>
<dl class="pr-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${inline(v)}</dd></div>`).join('')}</dl>
${rest.length ? `<div class="pr-comments">${renderChat(chatLines(rest.join('\n')), 'chat')}</div>` : ''}</figure>`;
  },
  terminal(info, src) {
    return `<figure class="artifact terminal">${info ? `<figcaption>${esc(info)}</figcaption>` : ''}<pre><code>${esc(src)}</code></pre></figure>`;
  },
  calendar(info, src) {
    const rows = src
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => {
        const m = l.match(/^(\d{1,2}:\d{2}(?:\s*[–-]\s*\d{1,2}:\d{2})?)\s+(.*)$/);
        return m ? `<li><time>${esc(m[1])}</time><span>${inline(m[2])}</span></li>` : `<li class="cal-note">${inline(l)}</li>`;
      })
      .join('');
    return `<figure class="artifact calendar"><figcaption>${esc(info || 'Calendar')}</figcaption><ul>${rows}</ul></figure>`;
  },
  doc(info, src) {
    return `<figure class="artifact doc">${info ? `<figcaption>${esc(info)}</figcaption>` : ''}<div class="doc-body">${new Marked({ gfm: true }).use(typography).parse(src)}</div></figure>`;
  },
  phone(info, src) {
    return `<figure class="artifact phone"><figcaption>${esc(info || 'Messages')}</figcaption><div class="phone-log">${renderChat(chatLines(src), 'chat')}</div></figure>`;
  },
};

export const blockKinds = Object.keys(blocks);

const md = new Marked({ gfm: true }).use(typography);
md.use({
  renderer: {
    code({ text, lang }) {
      const [kind, ...rest] = (lang || '').split(/\s+/);
      if (blocks[kind]) return blocks[kind](rest.join(' ').trim(), text);
      return `<pre><code>${esc(text)}</code></pre>`;
    },
  },
});

export function renderMarkdown(src) {
  return md.parse(src);
}

export function renderInline(src) {
  return inline(src);
}

export function wordCount(src) {
  return src
    .replace(/^```.*$/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^.+? \[[^\]]+\]:/gm, '') // chat headers
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}
