// @expect-diagnostics: 2
import { describe, expect, test } from "vitest";

describe("toBeInstanceOf", () => {
  test("positive", () => {
    expect(new AbortController().signal).toBeInstanceOf(AbortSignal);
  });
  test("negated", () => {
    expect({}).not.toBeInstanceOf(AbortSignal);
  });
});
