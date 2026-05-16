// @expect-diagnostics: 3
import { describe, expect, test } from "vitest";

describe("toBe", () => {
  test("positive", () => {
    expect(1).toBe(1);
  });
  test("negated", () => {
    expect(1).not.toBe(2);
  });
  test("computed string literal", () => {
    expect(1)["toBe"](1);
  });
});
