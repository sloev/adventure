#!/usr/bin/env node
// Renders dist/<slug>/print.html to dist/<slug>/<slug>.pdf with headless Chromium.
// Usage: npm run pdf [-- slug]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright is required for PDF output: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const only = process.argv.slice(2);
const slugs = fs.readdirSync(dist).filter((d) => fs.existsSync(path.join(dist, d, 'print.html')) && (!only.length || only.includes(d)));

const browser = await chromium.launch();
for (const slug of slugs) {
  const page = await browser.newPage();
  await page.goto('file://' + path.join(dist, slug, 'print.html'), { waitUntil: 'networkidle' });
  const out = path.join(dist, slug, `${slug}.pdf`);
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  console.log(`wrote ${path.relative(root, out)}`);
  await page.close();
}
await browser.close();
