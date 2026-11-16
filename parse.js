// parse.js — the drop-in this competition races: parse(markdown) returns the
// HTML marked 18.1.3 renders with its default options (GFM on, async off),
// byte for byte, but faster.
//
// How: vendor/marked/marked.esm.js is a fork of marked's single-file ESM
// build (MIT, see vendor/marked/LICENSE and NOTICE) with speed-only changes,
// and this module drives its Lexer and Parser directly on one shared,
// pre-wired options object. marked.parse() would rebuild that options object
// (two spreads, an error-handler closure, hook checks) and re-select the
// tokenizer/renderer on every single call; here that work happens once, at
// load. The lex/parse pipeline itself — and therefore its output — is
// unchanged.

import { Lexer, Parser, Tokenizer, Renderer, defaults } from './vendor/marked/marked.esm.js';

// marked's defaults (gfm: true, breaks: false, pedantic: false, async:
// false), copied once. The tokenizer and renderer are attached up front so
// the Lexer/Parser constructors find them already wired instead of building
// fresh ones per parse.
const options = { ...defaults };
options.tokenizer = new Tokenizer(options);
options.renderer = new Renderer(options);

// One Lexer and one Parser, reused for every case. A Lexer's constructor
// state is exactly: tokens (+ their links map), the inline queue and the
// state flags — parse() restores all three to their constructor values
// before lexing, so reuse is indistinguishable from a fresh instance
// (verified against upstream on the practice corpus and a differential
// fuzz). The Parser carries no per-document state of its own.
const lexer = new Lexer(options);
const parser = new Parser(options);

/** The HTML marked 18.1.3 renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  lexer.tokens = [];
  lexer.tokens.links = Object.create(null);
  lexer.inlineQueue = [];
  lexer.state = { inLink: false, inRawBlock: false, linkEmitted: false, linkParenPossible: true, top: true };
  const tokens = lexer.lex(markdown);
  return parser.parse(tokens);
}
