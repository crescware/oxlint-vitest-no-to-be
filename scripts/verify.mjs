import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const SRC_DIR = "src";

const expected = new Map();
for (const file of readdirSync(SRC_DIR)) {
  if (!file.endsWith(".test.ts")) {
    continue;
  }
  const content = readFileSync(join(SRC_DIR, file), "utf8");
  const match = content.match(/^\/\/ @expect-diagnostics: (\d+)$/m);
  if (match === null) {
    console.error(`${file}: missing "// @expect-diagnostics: N" header`);
    process.exit(1);
  }
  expected.set(file, Number.parseInt(match[1], 10));
}

const result = spawnSync(
  "./node_modules/.bin/oxlint",
  ["-f", "json", `${SRC_DIR}/`],
  { encoding: "utf8" },
);
if (result.error !== null && result.error !== undefined) {
  throw result.error;
}
const diagnostics = JSON.parse(result.stdout ?? "").diagnostics;

const actual = new Map();
for (const d of diagnostics) {
  const fname = basename(d.filename);
  actual.set(fname, (actual.get(fname) ?? 0) + 1);
}

let failed = false;
for (const [file, exp] of [...expected].sort()) {
  const act = actual.get(file) ?? 0;
  const status = act === exp ? "OK" : "NG";
  console.log(`${status}  ${file}: expected ${exp}, got ${act}`);
  if (act !== exp) {
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
