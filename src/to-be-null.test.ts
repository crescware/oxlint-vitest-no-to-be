// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeNull", () => {
  test("positive", () => {
    expect(null).toBeNull();
  });
  test("negated", () => {
    expect(1).not.toBeNull();
  });
});
