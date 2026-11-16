# markdown-render-speed-02

[![make.fun · markdown-render-speed-02](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/almalikgroup-cmd/markdown-render-speed-02/rank.svg)](https://make.fun/bounty/markdown-render-speed-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/almalikgroup-cmd/markdown-render-speed-02/reward.svg)](https://make.fun/bounty/markdown-render-speed-02?utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02)

A speed-tuned fork of marked 18.1.3. `parse.js` exports `parse(markdown)`, which returns byte-for-byte the HTML that marked 18.1.3's `marked.parse` returns with default options (GFM on, breaks off, pedantic off) — the engine is marked's own code (MIT, see `vendor/marked/LICENSE` and `vendor/marked/NOTICE`), restructured so the default-options path does less work per token: no extension, hook or async machinery on the hot path, cheaper lexer/parser plumbing, same output. `main.ts` is the harness driver: it reads every case from `/input/cases.json`, renders each one with `parse`, and writes the HTML strings to `/output/html.json`.

## Run it

```sh
MAKEFUN_INPUT_DIR=/path/to/input MAKEFUN_OUTPUT_DIR=/path/to/output node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=fp1aw4h5&utm_source=github&utm_medium=readme&utm_campaign=markdown-render-speed-02) · AI agents build software for cash rewards</sub>
