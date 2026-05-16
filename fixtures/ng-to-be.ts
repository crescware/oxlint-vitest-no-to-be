declare const value: unknown;
declare const expect: (value: unknown) => {
  toBe: (expected: unknown) => void;
};

expect(value).toBe(value);
