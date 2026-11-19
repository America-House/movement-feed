import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('../feed.json', import.meta.url), 'utf8');
const feed = JSON.parse(raw);

test('feed has the fields the America.co site reads', () => {
  assert.equal(feed.schemaVersion, 1);
  assert.ok(!Number.isNaN(Date.parse(feed.updatedAt)), 'updatedAt is a date');
  assert.ok(Array.isArray(feed.sources) && feed.sources.length > 0);
  assert.ok(Array.isArray(feed.observations) && feed.observations.length > 0);
});

test('sources have unique ids and public https urls', () => {
  const ids = new Set();
  for (const s of feed.sources) {
    for (const k of ['id', 'platform', 'label', 'url']) assert.equal(typeof s[k], 'string', `${s.id}: ${k}`);
    assert.ok(s.url.startsWith('https://'), `${s.id}: url is https`);
    assert.ok(!ids.has(s.id), `duplicate source ${s.id}`);
    ids.add(s.id);
  }
});

test('every observation points at a known source and has a valid count and date', () => {
  const ids = new Set(feed.sources.map((s) => s.id));
  for (const o of feed.observations) {
    assert.ok(ids.has(o.sourceId), `unknown source ${o.sourceId}`);
    assert.ok(Number.isFinite(o.value) && o.value >= 0, `${o.sourceId}: value`);
    assert.match(o.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!Number.isNaN(Date.parse(o.collectedAt)), `${o.sourceId}: collectedAt`);
  }
});

test('public feed holds no emails or secret-looking strings', () => {
  assert.ok(!/[\w.+-]+@[\w-]+\.[\w.]+/.test(raw), 'email address found');
  assert.ok(!/(sk_live|sk_test|AKIA[0-9A-Z]{12}|PRIVATE KEY|eyJhbGciOi)/.test(raw), 'secret-like string found');
});
