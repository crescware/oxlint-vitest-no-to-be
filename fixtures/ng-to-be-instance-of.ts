declare const value: unknown;
declare const expect: (value: unknown) => {
  toBeInstanceOf: (target: unknown) => void;
};

expect(value).toBeInstanceOf(AbortSignal);
