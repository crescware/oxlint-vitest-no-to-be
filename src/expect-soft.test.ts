// @expect-diagnostics: 4
import { describe, expect, test } from "vitest";

describe("expect.soft chain", () => {
  test("soft.toBe", () => {
    expect.soft(1).toBe(1);
  });
  test("soft.not.toBe", () => {
    expect.soft(1).not.toBe(2);
  });
  test("soft.toBeDefined", () => {
    expect.soft(1).toBeDefined();
  });
  test("soft.not.toBeNull", () => {
    expect.soft(1).not.toBeNull();
  });
});
