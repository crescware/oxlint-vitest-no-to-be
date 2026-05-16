declare const value: number;
declare const expect: (v: number) => {
  toBeCloseTo: (n: number) => void;
  toBeGreaterThan: (n: number) => void;
  toBeLessThan: (n: number) => void;
  toBeOneOf: (xs: readonly number[]) => void;
  toBeUndefined: () => void;
};

expect(value).toBeCloseTo(0.1);
expect(value).toBeGreaterThan(0);
expect(value).toBeLessThan(10);
expect(value).toBeOneOf([1, 2, 3]);
expect(value).toBeUndefined();
