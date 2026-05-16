// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeTruthy", () => {
  test("positive", () => {
    expect(1).toBeTruthy();
  });
  test("negated", () => {
    expect(0).not.toBeTruthy();
  });
});
