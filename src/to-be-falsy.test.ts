// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeFalsy", () => {
  test("positive", () => {
    expect(0).toBeFalsy();
  });
  test("negated", () => {
    expect(1).not.toBeFalsy();
  });
});
