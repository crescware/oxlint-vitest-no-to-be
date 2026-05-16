// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeDefined", () => {
  test("positive", () => {
    expect(1).toBeDefined();
  });
  test("negated", () => {
    expect(undefined).not.toBeDefined();
  });
});
