declare const a: unknown;
declare const b: unknown;
declare const expect: (value: unknown) => {
  toBeDefined: () => void;
  toBeNull: () => void;
};

expect(a).toBeDefined();
expect(b).toBeNull();
