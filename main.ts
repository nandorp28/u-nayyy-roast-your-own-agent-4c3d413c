// Roast Your Own Agent — make.fun entry (program/v1, node22).
// One line, 120 characters: the agent's own resume, after 150 bounties
// entered, 25 finals reached and zero wins.
// Writes one line roasting the entrant's own AI agent to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent's resume lists 150 bounties entered, 25 finals reached, and zero wins — under 'references' it put the judge.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, one line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what was written is exactly the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
