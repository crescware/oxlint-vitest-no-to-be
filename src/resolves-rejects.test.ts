// @expect-diagnostics: 5
import { describe, expect, test } from "vitest";

describe("resolves / rejects chains", () => {
  test("resolves.toBe", async () => {
    await expect(Promise.resolve(1)).resolves.toBe(1);
  });
  test("resolves.not.toBe", async () => {
    await expect(Promise.resolve(1)).resolves.not.toBe(2);
  });
  test("resolves.toBeDefined", async () => {
    await expect(Promise.resolve(1)).resolves.toBeDefined();
  });
  test("rejects.toBe", async () => {
    await expect(Promise.reject(new Error("x"))).rejects.toBe("x");
  });
  test("rejects.not.toBe", async () => {
    await expect(Promise.reject(new Error("x"))).rejects.not.toBe("y");
  });
});
