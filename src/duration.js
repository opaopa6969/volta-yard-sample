// 期間の文字列と数値(ミリ秒)を相互に変換する小さな道具。
//
// このファイルには**わざと問題が入れてあります**。README.md の練習に使います。
// 直してしまって構いません(それが練習です)。

const UNITS = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

// 大きい単位から順に並べたもの。format はこの順で書き出し、parse も同じ形を読む。
const ORDER = ['d', 'h', 'm', 's', 'ms'];

/**
 * "90s" や "2h" のほか、"1h30m" のように単位を並べた形もミリ秒にする。
 * @param {string} text
 * @returns {number} ミリ秒
 */
export function parseDuration(text) {
  const s = String(text);
  if (!/^(?:\d+(?:ms|s|m|h|d))+$/.test(s)) return NaN;
  let total = 0;
  for (const m of s.matchAll(/(\d+)(ms|s|m|h|d)/g)) {
    total += Number(m[1]) * UNITS[m[2]];
  }
  return total;
}

/**
 * ミリ秒を読める文字列にする。端数は丸めず、単位を並べて出す。
 * @param {number} ms
 * @returns {string}
 */
export function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) return '0ms';
  let rest = Math.round(ms);
  const parts = [];
  for (const unit of ORDER) {
    const size = UNITS[unit];
    const n = Math.floor(rest / size);
    if (n > 0) {
      parts.push(`${n}${unit}`);
      rest -= n * size;
    }
  }
  return parts.length ? parts.join('') : '0ms';
}
