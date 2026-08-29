# volta-yard-sample

A deliberately imperfect little project. It exists to be a **safe first target** for
[volta-yard](https://github.com/opaopa6969/volta-yard) — so you can watch a coding agent
work on a real repository without pointing it at anything you care about.

Nothing here is precious. Break it, fix it, throw it away, clone it again.

日本語は下にあります。

---

## What is in here

A tiny duration library (`"1h30m"` ⇄ `5400000`), with problems planted on purpose:

| Problem | How you find it |
|---|---|
| `parseDuration("1h30m")` cannot read compound forms | **a test fails** |
| `formatDuration(5400000)` rounds to `"2h"` and loses the 30 minutes | **a test fails** |
| `parseDuration("banana")` returns `NaN` silently | **no test covers it — you have to notice** |

```
npm test      # 3 of 4 tests fail. That is the starting line.
```

That mix is the point. Some problems are pinned by a failing test, so "did the agent fix
it" has an objective answer. One is not, so it rewards actually reading the code.

---

## The exercise: three phases, three permissions

volta-yard's distinctive idea is that **a job is `targets × phases`, and each phase carries
its own permission**. You start narrow and widen once you trust what came back. This repo is
built so you can feel that in three runs.

### Phase 1 — Look only

> **Permission:** Look only  ·  **Prompt:** `Find the problems in this repository and explain each one. Do not change anything.`

You get a report. Then check:

```
git status     # clean. Nothing was written.
```

That is the lesson. *Look only* is not a promise in a prompt — it is enforced. The agent
could not have edited a file even if it decided to.

A good answer mentions the two failing tests **and** the silent `NaN`, which no test covers.
If it only repeats the test output, it did not read the code.

### Phase 2 — Fix files

> **Permission:** Fix files  ·  **Prompt:** `Make the failing tests pass. Do not change the tests.`

```
npm test       # 4 of 4 pass
git diff       # only src/duration.js changed
```

Now the answer is objective — the tests decide, not your impression of the summary.
"Do not change the tests" matters: without it, deleting the assertion is also a way to
make tests pass.

### Phase 3 — Commit, push, PR

> **Permission:** Commit, push, PR  ·  **Prompt:** `Commit the fix on a branch and open a pull request explaining what was wrong.`

A pull request appears. Read it — a good one says *why* the old code was wrong, not just
what changed.

### Then: put the three together

Run all three as **one job with three phases**. Later phases see what earlier ones produced,
so phase 2 works from phase 1's findings. There is **no barrier between phases**: with
several targets, one that finishes phase 1 moves straight to phase 2 while the others are
still on phase 1.

---

## Why this teaches something a README cannot

You could read that yard has permission presets and believe it. Running phase 1 and then
typing `git status` is different — you *see* that nothing was written. That is worth more
than the paragraph above.

---

<a name="ja"></a>

# 日本語

**わざと不完全に作ってある小さなプロジェクト**です。
[volta-yard](https://github.com/opaopa6969/volta-yard) の**最初の練習台**として置いてあります。
大事なリポジトリを触らずに、コーディング agent が実際に動くところを見られます。

壊して構いません。直しても、捨てても、また clone しても大丈夫です。

## 中身

期間の文字列を変換する小さな道具（`"1h30m"` ⇄ `5400000`）に、問題をわざと入れてあります。

| 問題 | どう見つかるか |
|---|---|
| `parseDuration("1h30m")` が単位を並べた形を読めない | **テストが落ちる** |
| `formatDuration(5400000)` が `"2h"` に丸めて 30 分を捨てる | **テストが落ちる** |
| `parseDuration("banana")` が黙って `NaN` を返す | **テストが無い。読んで気づくしかない** |

```
npm test      # 4 件中 3 件が落ちます。ここが出発点です。
```

この混ぜ方に意味があります。テストで固定された問題は「直ったか」に**客観的な答え**が出ます。
固定されていない問題が 1 つあるので、**コードを実際に読んだか**が分かります。

## 練習：3 つの段、3 つの権限

volta-yard の特徴は、**job が `対象 × 段` で、段ごとに権限が変わる**ことです。
狭く始めて、返ってきたものを信用できたら広げます。この repo は、それを 3 回の実行で
体感できるように作ってあります。

### 第 1 段 — 観測のみ

> **権限:** 観測のみ  ·  **指示:** `このリポジトリの問題を挙げて、それぞれ説明して。何も変更しないで。`

報告が返ってきたら、確かめてください。

```
git status     # 何も変わっていない
```

ここが肝です。「観測のみ」は**指示文のお願いではなく、実際に効く制限**です。
agent が書こうと判断しても書けません。

良い答えは、落ちているテスト 2 件に加えて、**テストの無い `NaN`** に触れます。
テストの出力をなぞっただけなら、コードを読んでいません。

### 第 2 段 — ファイルを直す

> **権限:** ファイルを直す  ·  **指示:** `落ちているテストが通るように直して。テストは変えないで。`

```
npm test       # 4 件とも通る
git diff       # src/duration.js だけが変わっている
```

ここでは答えが客観的です。要約の印象ではなく、**テストが判定します**。
「テストは変えないで」が効いています。これが無いと、assert を消すのも「通す」方法だからです。

### 第 3 段 — commit・push・PR

> **権限:** commit・push・PR  ·  **指示:** `直したものをブランチに commit して、何が悪かったかを説明する PR を出して。`

PR が出ます。読んでみてください。良い PR は「何を変えたか」ではなく
**「なぜ前のコードが間違っていたか」**を書きます。

### そして 3 つを 1 つの job にする

3 段を**1 つの job**として走らせてみてください。後の段は前の段の結果を見られるので、
第 2 段は第 1 段の指摘から作業します。**段の間に待ち合わせはありません**。対象が複数あれば、
第 1 段を終えたものは、他がまだ第 1 段でもすぐ第 2 段に進みます。

## なぜ README では代わりにならないか

「yard には権限の段階がある」と読んで、信じることはできます。
でも第 1 段を走らせたあとに `git status` と打って、**本当に何も書かれていない**のを見るのは
別の経験です。上の説明文より、そちらの方が価値があります。
