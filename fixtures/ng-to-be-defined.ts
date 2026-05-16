declare const value: unknown;
declare const expect: (value: unknown) => {
  toBeDefined: () => void;
};

expect(value).toBeDefined();
