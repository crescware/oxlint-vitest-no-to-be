declare const value: unknown;
declare const expect: (value: unknown) => {
  toBeTruthy: () => void;
};

expect(value).toBeTruthy();
