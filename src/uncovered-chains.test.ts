// @expect-diagnostics: 0
import { describe, expect, test } from "vitest";

describe("uncovered chain combinations (intentionally not configured)", () => {
  test("soft.resolves.toBe", async () => {
    await expect.soft(Promise.resolve(1)).resolves.toBe(1);
  });
  test("soft.rejects.toBe", async () => {
    await expect.soft(Promise.reject(new Error("x"))).rejects.toBe("x");
  });
  test("resolves.not.toBe via soft", async () => {
    await expect.soft(Promise.resolve(1)).resolves.not.toBe(2);
  });
});
