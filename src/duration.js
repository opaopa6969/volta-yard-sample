// 期間の文字列と数値(ミリ秒)を相互に変換する小さな道具。
//
// このファイルには**わざと問題が入れてあります**。README.md の練習に使います。
// 直してしまって構いません(それが練習です)。

const UNITS = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

/**
 * "90s" や "2h" のような文字列をミリ秒にする。
 * @param {string} text
 * @returns {number} ミリ秒
 */
export function parseDuration(text) {
  const m = String(text).match(/^(\d+)(ms|s|m|h|d)$/);
  if (!m) return NaN;
  return Number(m[1]) * UNITS[m[2]];
}

/**
 * ミリ秒を読める文字列にする。
 * @param {number} ms
 * @returns {string}
 */
export function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) return '0ms';
  if (ms < UNITS.s) return `${ms}ms`;
  if (ms < UNITS.m) return `${Math.round(ms / UNITS.s)}s`;
  if (ms < UNITS.h) return `${Math.round(ms / UNITS.m)}m`;
  return `${Math.round(ms / UNITS.h)}h`;
}
