declare const obj: { toBe: (v: unknown) => void };
declare const value: unknown;
declare const key: "toBe";

obj[key](value);
