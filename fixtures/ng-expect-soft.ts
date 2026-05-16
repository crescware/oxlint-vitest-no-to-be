declare const value: unknown;
declare const expect: {
  soft: (value: unknown) => { toBeDefined: () => void };
};

expect.soft(value).toBeDefined();
