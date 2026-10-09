import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vahennys, vertaa } from './kotitalousvahennys.ts';

const kv = { prosentti: 40, omavastuu: 150, enimmaismaaraHenkilo: 2100 };

test('yksi henkilö', () => {
  assert.equal(vahennys(3000, 1, kv).yhteensa, 1050);
  assert.equal(vahennys(4500, 1, kv).yhteensa, 1650);
  assert.equal(vahennys(5625, 1, kv).yhteensa, 2100);
  assert.equal(vahennys(9000, 1, kv).yhteensa, 2100);
  assert.equal(vahennys(300, 1, kv).yhteensa, 0);
});

test('kaksi henkilöä', () => {
  assert.equal(vahennys(11250, 2, kv).yhteensa, 4200);
  assert.equal(vahennys(4500, 2, kv).yhteensa, 1500);
});

test('suositus: alle 5 625 € yksi henkilö, isommissa kaksi', () => {
  assert.equal(vertaa(4500, kv).parempi.henkilot, 1);
  assert.equal(vertaa(9000, kv).parempi.henkilot, 2);
});
