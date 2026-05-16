// @expect-diagnostics: 0
import { describe, expect, test } from "vitest";

describe("disable directive (no diagnostic expected)", () => {
  test("oxlint-disable-next-line suppresses next line", () => {
    // oxlint-disable-next-line vitest/no-restricted-matchers
    expect(1).toBe(1);
  });
});
