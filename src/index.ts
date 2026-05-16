type Position = { line: number; column: number };
type Loc = { start: Position; end: Position };

type StringLiteral = {
  type: "Literal" | "StringLiteral";
  value?: unknown;
  loc?: Loc;
};

type MemberExpression = {
  type: "MemberExpression";
  computed?: boolean;
  property?: { type: string; name?: string; value?: unknown };
};

type CallExpression = {
  type: "CallExpression";
  callee: { type: string };
};

type ReportDescriptor = { message: string; node: unknown };
type RuleContext = { report: (descriptor: ReportDescriptor) => void };

type Visitor = Record<string, (node: never) => void>;

type Rule = {
  meta?: Record<string, unknown>;
  create: (context: RuleContext) => Visitor;
};

const forbiddenMatchers: ReadonlyMap<string, string> = new Map([
  ["toBe", "Use .toEqual() instead of .toBe()"],
  [
    "toBeDefined",
    "Use expect(exists(v)).toEqual(true) instead of .toBeDefined()",
  ],
  ["toBeNull", "Use .toEqual(null) instead of .toBeNull()"],
  [
    "toBeInstanceOf",
    "Use expect(v instanceof T).toEqual(true) instead of .toBeInstanceOf(T)",
  ],
  ["toBeTruthy", "Use .toEqual(true) instead of .toBeTruthy()"],
  ["toBeFalsy", "Use .toEqual(false) instead of .toBeFalsy()"],
  ["toBeNaN", "Use .toEqual(NaN) instead of .toBeNaN()"],
]);

const getForbiddenMatcher = (
  call: CallExpression,
): { message: string; node: unknown } | null => {
  const callee = call.callee as unknown as MemberExpression;
  if (callee.type !== "MemberExpression") {
    return null;
  }
  const property = callee.property;
  if (property === undefined) {
    return null;
  }

  const name = ((): string | null => {
    if (callee.computed === true) {
      const literal = property as unknown as StringLiteral;
      if (literal.type !== "Literal" && literal.type !== "StringLiteral") {
        return null;
      }
      return typeof literal.value === "string" ? literal.value : null;
    }
    if (property.type !== "Identifier") {
      return null;
    }
    return typeof property.name === "string" ? property.name : null;
  })();
  if (name === null) {
    return null;
  }

  const message = forbiddenMatchers.get(name);
  if (message === undefined) {
    return null;
  }
  return { message, node: property };
};

const rule: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow a fixed set of Vitest matchers (.toBe, .toBeDefined, .toBeNull, .toBeInstanceOf, .toBeTruthy, .toBeFalsy, .toBeNaN); prefer .toEqual() or explicit boolean assertions.",
    },
    schema: [],
  },
  create(context) {
    const onCallExpression = (node: CallExpression) => {
      const found = getForbiddenMatcher(node);
      if (found === null) {
        return;
      }
      context.report({ message: found.message, node: found.node });
    };

    return {
      CallExpression: onCallExpression as unknown as (node: never) => void,
    };
  },
};

const plugin = {
  meta: { name: "crescware-no-to-be" },
  rules: {
    "no-to-be": rule,
  },
};

export default plugin;
