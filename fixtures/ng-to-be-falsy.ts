declare const value: unknown;
declare const expect: (value: unknown) => {
  toBeFalsy: () => void;
};

expect(value).toBeFalsy();
