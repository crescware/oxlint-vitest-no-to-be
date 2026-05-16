declare const value: unknown;
declare const expect: (value: unknown) => {
  toBe: (expected: unknown) => void;
};

// oxlint-disable-next-line crescware-no-to-be/no-to-be
expect(value).toBe(value);
