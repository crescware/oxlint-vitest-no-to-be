import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, test } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const oxlintBin = resolve(repoRoot, "node_modules/.bin/oxlint");
const fixturesDir = resolve(repoRoot, "fixtures");
const configPath = resolve(fixturesDir, "oxlintrc.fixtures.json");

type Diagnostic = {
  message: string;
  filename: string;
  severity: string;
};

type OxlintReport = { diagnostics: Diagnostic[] };

let allDiagnostics: Diagnostic[] = [];

const runFixturesOnce = (): Diagnostic[] => {
  const result = spawnSync(
    oxlintBin,
    ["-c", configPath, "--no-ignore", "-f", "json", resolve(fixturesDir) + "/"],
    { cwd: repoRoot, encoding: "utf8" },
  );
  if (result.error !== undefined && result.error !== null) {
    throw result.error;
  }
  const parsed = JSON.parse(result.stdout ?? "") as OxlintReport;
  return parsed.diagnostics;
};

const messagesFor = (filename: string): string[] => {
  return allDiagnostics
    .filter((v) => v.filename.endsWith(`/${filename}`))
    .map((v) => v.message);
};

beforeAll(() => {
  const probe = spawnSync(oxlintBin, ["--version"], { encoding: "utf8" });
  if (probe.status !== 0) {
    throw new Error(`oxlint not runnable: ${probe.stderr ?? ""}`);
  }
  allDiagnostics = runFixturesOnce();
});

describe("OK fixtures produce no diagnostics", () => {
  test.each([
    "ok-to-equal.ts",
    "ok-to-have-been-called.ts",
    "ok-disable-comment.ts",
    "ok-non-target.ts",
    "ok-computed.ts",
  ])("%s", (file) => {
    expect(messagesFor(file)).toEqual([]);
  });
});

describe("NG fixtures match exactly", () => {
  test("ng-to-be.ts", () => {
    expect(messagesFor("ng-to-be.ts")).toEqual([
      "Use .toEqual() instead of .toBe()",
    ]);
  });

  test("ng-to-be-defined.ts", () => {
    expect(messagesFor("ng-to-be-defined.ts")).toEqual([
      "Use expect(exists(v)).toEqual(true) instead of .toBeDefined()",
    ]);
  });

  test("ng-to-be-null.ts", () => {
    expect(messagesFor("ng-to-be-null.ts")).toEqual([
      "Use .toEqual(null) instead of .toBeNull()",
    ]);
  });

  test("ng-to-be-instance-of.ts", () => {
    expect(messagesFor("ng-to-be-instance-of.ts")).toEqual([
      "Use expect(v instanceof T).toEqual(true) instead of .toBeInstanceOf(T)",
    ]);
  });

  test("ng-to-be-truthy.ts", () => {
    expect(messagesFor("ng-to-be-truthy.ts")).toEqual([
      "Use .toEqual(true) instead of .toBeTruthy()",
    ]);
  });

  test("ng-to-be-falsy.ts", () => {
    expect(messagesFor("ng-to-be-falsy.ts")).toEqual([
      "Use .toEqual(false) instead of .toBeFalsy()",
    ]);
  });

  test("ng-to-be-nan.ts", () => {
    expect(messagesFor("ng-to-be-nan.ts")).toEqual([
      "Use .toEqual(NaN) instead of .toBeNaN()",
    ]);
  });

  test("ng-expect-soft.ts", () => {
    expect(messagesFor("ng-expect-soft.ts")).toEqual([
      "Use expect(exists(v)).toEqual(true) instead of .toBeDefined()",
    ]);
  });

  test("ng-not-to-be.ts", () => {
    expect(messagesFor("ng-not-to-be.ts")).toEqual([
      "Use .toEqual() instead of .toBe()",
    ]);
  });

  test("ng-multiple.ts", () => {
    expect(messagesFor("ng-multiple.ts")).toEqual([
      "Use expect(exists(v)).toEqual(true) instead of .toBeDefined()",
      "Use .toEqual(null) instead of .toBeNull()",
    ]);
  });

  test("ng-computed-literal.ts", () => {
    expect(messagesFor("ng-computed-literal.ts")).toEqual([
      "Use .toEqual() instead of .toBe()",
      "Use expect(exists(v)).toEqual(true) instead of .toBeDefined()",
    ]);
  });
});

describe("Totals", () => {
  test("no diagnostics emitted from OK fixtures", () => {
    const okMessages = allDiagnostics
      .filter((v) => /\/ok-/.test(v.filename))
      .map((v) => v.message);
    expect(okMessages).toEqual([]);
  });
});
