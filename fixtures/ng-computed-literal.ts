declare const obj: {
  toBe: (v: unknown) => void;
  toBeDefined: () => void;
};
declare const value: unknown;

obj["toBe"](value);
obj["toBeDefined"]();
