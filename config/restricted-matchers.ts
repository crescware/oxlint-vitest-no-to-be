const MATCHERS: ReadonlyArray<readonly [string, string]> = [
  ["toBe", "Use .toEqual() instead of .toBe()"],
  [
    "toBeDefined",
    "Use an existence check on .toEqual(true|false) instead of .toBeDefined()",
  ],
  ["toBeNull", "Use .toEqual(null) instead of .toBeNull()"],
  [
    "toBeInstanceOf",
    "Use .toEqual() with an `instanceof` check instead of .toBeInstanceOf(T)",
  ],
  ["toBeTruthy", "Use .toEqual(true|false) instead of .toBeTruthy()"],
  ["toBeFalsy", "Use .toEqual(false|true) instead of .toBeFalsy()"],
  ["toBeNaN", "Use .toEqual(NaN) instead of .toBeNaN()"],
];

const CHAIN_PREFIXES: readonly string[] = [
  "",
  "not.",
  "soft.",
  "soft.not.",
  "resolves.",
  "resolves.not.",
  "rejects.",
  "rejects.not.",
];

export const restrictedMatchers: Readonly<Record<string, string>> =
  Object.fromEntries(
    MATCHERS.flatMap(([matcher, message]) =>
      CHAIN_PREFIXES.map((prefix) => [`${prefix}${matcher}`, message]),
    ),
  );
