declare const value: unknown;
declare const expect: (value: unknown) => {
  toBeNull: () => void;
};

expect(value).toBeNull();
