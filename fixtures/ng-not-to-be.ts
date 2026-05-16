declare const value: unknown;
declare const expect: (value: unknown) => {
  not: { toBe: (expected: unknown) => void };
};

expect(value).not.toBe(value);
