// markdown-render-speed-02 — entrypoint the harness runs as `node /bot/main.ts`.
//
// It reads every case from /input/cases.json (a JSON array of {id, markdown}),
// renders each case on its own with parse() from ./parse.js — no state is kept
// between cases — and writes the HTML strings, in the cases' order, to
// /output/html.json. Outside the harness container, MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /input and /output.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8')) as { id: string; markdown: string }[];

const html = new Array<string>(cases.length);
for (let i = 0; i < cases.length; i++) {
  html[i] = parse(cases[i]!.markdown);
}

writeFileSync(join(outputDir, 'html.json'), JSON.stringify(html));
