declare const value: unknown;
declare const expect: (value: unknown) => {
  toEqual: (expected: unknown) => void;
};

expect(value).toEqual(null);
