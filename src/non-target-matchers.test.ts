// @expect-diagnostics: 0
import { describe, expect, test } from "vitest";

describe("non-target matchers (no diagnostic expected)", () => {
  test("toEqual", () => {
    expect(1).toEqual(1);
  });
  test("toHaveBeenCalled", () => {
    const fn = () => {};
    expect(fn).toHaveBeenCalled();
  });
  test("toBeCloseTo", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
  test("toBeGreaterThan", () => {
    expect(1).toBeGreaterThan(0);
  });
  test("toBeLessThan", () => {
    expect(1).toBeLessThan(2);
  });
  test("toBeUndefined", () => {
    expect(undefined).toBeUndefined();
  });
  test("toBeOneOf", () => {
    expect(1).toBeOneOf([1, 2, 3]);
  });
});
