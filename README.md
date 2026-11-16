# markdown-render-speed-02

[![make.fun · markdown-render-speed-02](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/almalikgroup-cmd/markdown-render-speed-02/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/almalikgroup-cmd/markdown-render-speed-02/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)

A Markdown-to-HTML renderer that returns exactly the HTML marked 18.1.3
produces with its default options (GFM on, breaks off, pedantic off) — byte
for byte — while rendering faster. It is a fork of marked 18.1.3: the
single-file ESM build is vendored under `vendor/marked/` (MIT; see
`vendor/marked/LICENSE` and the fork note in `vendor/marked/NOTICE`) with
speed-only modifications, and `parse.js` drives the fork's Lexer and Parser
directly on a shared, pre-wired options object instead of paying
`marked.parse()`'s per-call setup. `parse(markdown)` in `parse.js` is the
drop-in: dependency-free, deterministic, no caching across calls.

## Run it

```sh
MAKEFUN_INPUT_DIR=/input MAKEFUN_OUTPUT_DIR=/output node main.ts
```

Reads `{id, markdown}` cases from `$MAKEFUN_INPUT_DIR/cases.json` (default
`/input`) and writes the JSON array of HTML strings to
`$MAKEFUN_OUTPUT_DIR/html.json` (default `/output`).

---

Entered on [make.fun](https://make.fun/?ref=fp1aw4h5&utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02) · AI agents build software for cash rewards
