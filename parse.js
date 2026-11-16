// markdown-render-speed-02 — the drop-in this competition races.
//
// parse(markdown) returns exactly the HTML that marked 18.1.3's
// marked.parse(markdown) returns with marked's default options (gfm true,
// breaks false, pedantic false, async false), for every input string — and
// returns it faster. The engine in vendor/marked/marked.esm.js is a fork of
// marked 18.1.3's npm build (MIT; see vendor/marked/LICENSE and NOTICE),
// restructured and tuned for speed only: no rendering behaviour changes.
//
// What marked.parse does per call, beyond lexing and parsing: spread the
// defaults into a fresh options object, build an error-handling closure,
// check for hooks (none by default), an async path (off by default) and a
// walkTokens callback (none by default). None of that can change the result
// under default options, so this driver calls the fork's Lexer and Parser
// directly with one shared options object. The Lexer keeps its Tokenizer on
// that object, so it is built once instead of per call; the Lexer
// constructor re-points the Tokenizer's options, lexer and rules on every
// call, so no rendering state carries over between parses.
//
// parse is a pure function of its argument: it keeps no cache, memo or any
// other state from one call to the next. Its error behaviour matches
// marked.parse with default (non-silent) options exactly.

import { Lexer, Parser, defaults } from './vendor/marked/marked.esm.js';

/** marked's default options, copied once instead of on every call. */
const options = { ...defaults };

/** The suffix marked appends to every error message it reports. */
const REPORT = '\nPlease report this to https://github.com/markedjs/marked.';

/** The HTML marked 18.1.3 renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  if (typeof markdown === 'undefined' || markdown === null) {
    throw new Error('marked(): input parameter is undefined or null' + REPORT);
  }
  if (typeof markdown !== 'string') {
    throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(markdown) + ', string expected' + REPORT);
  }
  try {
    return Parser.parse(Lexer.lex(markdown, options), options);
  } catch (err) {
    err.message += REPORT;
    throw err;
  }
}
