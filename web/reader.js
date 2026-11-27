// Web reader. The whole reading state is a log of visited passage ids; codewords
// and everything else are derived by replaying it, which makes undo trivial.
(async function () {
  const story = document.getElementById('story');
  const slug = location.pathname.split('/').filter(Boolean).slice(-1)[0] || 'book';
  const KEY = `adventure:${slug}`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };

  const theme = store.get('adventure:theme', null);
  if (theme) document.documentElement.dataset.theme = theme;
  document.getElementById('btn-theme').onclick = () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
    store.set('adventure:theme', document.documentElement.dataset.theme);
  };

  let book;
  try {
    book = await (await fetch('book.json')).json();
  } catch (e) {
    story.innerHTML = '<p>Could not load the book.</p>';
    return;
  }
  document.title = book.meta.title;
  const total = book.meta.sessionsPlanned || book.chapters.length;
  const chapterIndex = Object.fromEntries(book.chapters.map((c, i) => [c.id, i]));

  let state = store.get(KEY, null);
  if (!state || !Array.isArray(state.log) || !state.log.every((id) => book.passages[id])) state = { log: [book.start], breakAt: null };
  const save = () => store.set(KEY, state);

  function codewords(upto = state.log.length) {
    const cw = new Set();
    for (const id of state.log.slice(0, upto)) {
      const p = book.passages[id];
      (p.set || []).forEach((c) => cw.add(c));
      (p.clear || []).forEach((c) => cw.delete(c));
    }
    return cw;
  }
  const available = (ch, cw) => (!ch.if || ch.if.every((x) => cw.has(x))) && (!ch.unless || !ch.unless.some((x) => cw.has(x)));

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function sessionHeader(ci) {
    const c = book.chapters[ci];
    const h = el('header', 'session-head');
    h.innerHTML = `<p class="session">Session ${ci + 1} of ${total}</p><h1>${c.title}</h1>${c.subtitle ? `<p class="subtitle">${c.subtitle}</p>` : ''}`;
    return h;
  }

  function render({ scroll = 'last' } = {}) {
    story.innerHTML = '';
    const log = state.log;
    const last = log[log.length - 1];
    const ci = chapterIndex[book.passages[last].c];
    document.querySelector('.progress-fill').style.width = `${((ci + 0.5) / total) * 100}%`;

    if (state.breakAt === log.length - 1) {
      const prev = book.chapters[ci - 1];
      const card = el('section', 'session-break');
      card.innerHTML = `<p class="session">End of session ${ci} of ${total}</p><h1>${prev ? prev.title : ''}</h1>
<p>That was about an hour of reading. This is a good place to stop for today — the book will remember where you are.</p>`;
      const btn = el('button', 'primary', `Begin session ${ci + 1}: ${book.chapters[ci].title}`);
      btn.onclick = () => { state.breakAt = null; save(); render({ scroll: 'top' }); };
      card.append(btn);
      story.append(card);
      window.scrollTo({ top: 0 });
      return;
    }

    // Show this session so far: from the first log entry in the current chapter.
    let from = log.length - 1;
    while (from > 0 && book.passages[log[from - 1]].c === book.passages[last].c) from--;
    story.append(sessionHeader(ci));
    let lastEl;
    for (let i = from; i < log.length; i++) {
      const p = book.passages[log[i]];
      const sec = el('section', 'passage', p.h);
      if (i < log.length - 1) {
        const chosen = p.ch.find((c) => c.to === log[i + 1]);
        if (chosen && p.ch.length > 1) sec.append(el('p', 'chosen', chosen.t));
        sec.classList.add('past');
      } else {
        const cw = codewords();
        if (p.set) p.set.forEach((c) => sec.append(el('p', 'cw-note', `Codeword noted: <b>${c}</b>`)));
        if (p.end) {
          sec.append(el('p', 'ending', p.end));
          const again = el('button', 'primary', 'Read again from the beginning');
          again.onclick = restart;
          sec.append(again);
        } else if (p.tbc) {
          sec.append(el('p', 'ending', 'To be continued'));
          sec.append(el('p', 'muted', `You have reached the end of session ${book.chapters.length} of ${total}. The rest of this book is still being written; your place and your codewords are saved.`));
        } else {
          const opts = p.ch.filter((c) => available(c, cw));
          const ul = el('div', 'choices');
          for (const c of opts) {
            const b = el('button', opts.length === 1 ? 'choice continue' : 'choice', opts.length === 1 && /^continue$/i.test(c.t) ? 'Continue' : c.t);
            b.onclick = () => choose(c.to);
            ul.append(b);
          }
          sec.append(ul);
        }
      }
      story.append(sec);
      lastEl = sec;
    }
    if (scroll === 'last' && lastEl && log.length - from > 1) lastEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0 });
  }

  function choose(to) {
    const cur = book.passages[state.log[state.log.length - 1]];
    state.log.push(to);
    if (book.passages[to].c !== cur.c) state.breakAt = state.log.length - 1;
    save();
    render();
  }

  function restart() {
    if (state.log.length > 1 && !confirm('Start the book over from the beginning? Your current place will be lost.')) return;
    state = { log: [book.start], breakAt: null };
    save();
    render({ scroll: 'top' });
  }

  document.getElementById('btn-undo').onclick = () => {
    if (state.log.length < 2) return;
    state.log.pop();
    if (state.breakAt != null && state.breakAt >= state.log.length) state.breakAt = null;
    save();
    render();
  };
  document.getElementById('btn-restart').onclick = restart;
  const dlg = document.getElementById('codewords');
  document.getElementById('btn-codewords').onclick = () => {
    const cw = [...codewords()];
    dlg.querySelector('ul').innerHTML = cw.length ? cw.map((c) => `<li>${c}</li>`).join('') : '<li class="muted">None yet.</li>';
    dlg.showModal();
  };

  render({ scroll: 'top' });
})();
