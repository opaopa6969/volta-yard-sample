import { test } from 'node:test';
import assert from 'node:assert';
import { parseDuration, formatDuration } from '../src/duration.js';

test('単位ひとつなら読める', () => {
  assert.equal(parseDuration('500ms'), 500);
  assert.equal(parseDuration('90s'), 90_000);
  assert.equal(parseDuration('2h'), 7_200_000);
});

test('単位を並べた形も読める', () => {
  // 人が書くのはこちらの形が多い。"1h30m" を 1 時間半として読めてほしい
  assert.equal(parseDuration('1h30m'), 5_400_000);
  assert.equal(parseDuration('2m30s'), 150_000);
});

test('端数があるときは単位を並べて出す', () => {
  assert.equal(formatDuration(500), '500ms');
  // 90 秒を "2m" にすると 30 秒が消える。**丸めて情報を捨てない**
  assert.equal(formatDuration(90_000), '1m30s');
  assert.equal(formatDuration(5_400_000), '1h30m');
});

test('★ 往復しても値が変わらない', () => {
  // format した結果をもう一度 parse して同じ値に戻ることが、
  // この道具に期待される一番大事な性質
  for (const ms of [500, 90_000, 5_400_000, 150_000]) {
    assert.equal(parseDuration(formatDuration(ms)), ms, `${ms} が往復しない`);
  }
});
