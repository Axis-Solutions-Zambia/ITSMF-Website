import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

// Exercise the actual pure date/URL helpers without loading Firebase or a browser.
const sourceText = fs.readFileSync('src/pages/Events.tsx','utf8');
const source = ts.createSourceFile('Events.tsx', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const helpers = source.statements.filter(node => ts.isFunctionDeclaration(node) && ['eventDate','safeEventUrl'].includes(node.name?.text)).map(node => node.getText(source)).join('\n');
const javascript = ts.transpile(helpers, {target:ts.ScriptTarget.ES2022});
const {eventDate, safeEventUrl} = new Function(`${javascript}; return {eventDate,safeEventUrl};`)();

test('calendar rejects impossible and ambiguous dates', () => {
  assert.equal(eventDate('2026-06-04'), '2026-06-04');
  assert.equal(eventDate('2024-02-29'), '2024-02-29');
  for (const date of ['2026-02-29','2026-13-01','04/06/2026','2026-04-31',null]) assert.equal(eventDate(date), undefined);
});
test('editable event links reject script and protocol-relative destinations', () => {
  assert.equal(safeEventUrl('/events#calendar'), '/events#calendar');
  assert.equal(safeEventUrl('https://example.org/recap'), 'https://example.org/recap');
  for (const url of ['javascript:alert(1)','data:text/html,hello','//example.org','/\\example.org','',null]) assert.equal(safeEventUrl(url), undefined);
});
test('all public route builds have useful HTML before JavaScript loads', () => {
  const metadata = JSON.parse(fs.readFileSync('src/lib/routeMetadata.json','utf8'));
  for (const route of Object.keys(metadata)) {
    const html = fs.readFileSync(`dist${route === '/' ? '' : route}/index.html`,'utf8');
    assert.match(html, /<h1>[^<]+<\/h1>/);
    assert.match(html, /name="description"/);
    assert.match(html, /property="og:title"/);
    assert.ok(html.includes(`https://itsmf.org.zm${route}`));
    assert.match(html, /<script[^>]+src="\/assets\//);
  }
});
