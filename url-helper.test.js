// Run with: node url-helper.test.js
// No test framework — just plain assertions. Keep it this simple as long as
// url-helper.js stays this small.

const assert = require("assert");
const { looksLikeBareDomain } = require("./url-helper.js");

const cases = [
  // [input, expected, why]
  ["github.com/you", true, "bare domain with a path"],
  ["example.com", true, "bare domain, no path"],
  ["example.co.uk", true, "multi-part TLD"],
  ["sub.example.com/path/to/page", true, "subdomain with a deep path"],

  ["https://github.com/you", false, "already has https://"],
  ["http://example.com", false, "already has http://"],
  ["mailto:me@example.com", false, "already has a protocol (mailto)"],
  ["ftp://files.example.com", false, "already has a protocol (ftp)"],

  ["hello world", false, "plain sentence with a space"],
  ["just some text", false, "plain sentence, no dot"],
  ["hello.world how are you", false, "contains a dot but has spaces"],
  ["", false, "empty string"],
  ["localhost", false, "no dot, not a domain shape"],
  ["a.b", true, "shortest possible domain shape"],
];

let passed = 0;
let failed = 0;

for (const [input, expected, why] of cases) {
  const actual = looksLikeBareDomain(input);
  if (actual === expected) {
    passed++;
    console.log(`PASS  looksLikeBareDomain(${JSON.stringify(input)}) === ${expected}  (${why})`);
  } else {
    failed++;
    console.log(`FAIL  looksLikeBareDomain(${JSON.stringify(input)}) expected ${expected}, got ${actual}  (${why})`);
  }
}

console.log(`\n${passed} passed, ${failed} failed, ${cases.length} total`);

if (failed > 0) {
  process.exitCode = 1;
}
