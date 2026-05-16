// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeNaN", () => {
  test("positive", () => {
    expect(NaN).toBeNaN();
  });
  test("negated", () => {
    expect(1).not.toBeNaN();
  });
});
