# eslint-plugin-crescware-no-to-be

An [oxlint](https://oxc.rs/docs/guide/usage/linter) plugin that forbids
Vitest `.toBe*` matchers in favor of `.toEqual()` or explicit boolean
assertions.

## Rules

| Matcher              | Replacement                            |
| -------------------- | -------------------------------------- |
| `.toBe()`            | `.toEqual()`                           |
| `.toBeDefined()`     | `expect(exists(v)).toEqual(true)`      |
| `.toBeNull()`        | `.toEqual(null)`                       |
| `.toBeInstanceOf(T)` | `expect(v instanceof T).toEqual(true)` |
| `.toBeTruthy()`      | `.toEqual(true)`                       |
| `.toBeFalsy()`       | `.toEqual(false)`                      |
| `.toBeNaN()`         | `.toEqual(NaN)`                        |

Only the matchers listed above are reported. Other `.toBeXxx()`
matchers such as `.toBeCloseTo()`, `.toBeGreaterThan()`,
`.toBeUndefined()`, etc. are not flagged.

## Setup

Register the plugin in your `oxlintrc.json`.

```json
{
  "jsPlugins": [
    "./node_modules/eslint-plugin-crescware-no-to-be/dist/index.js"
  ],
  "rules": {
    "crescware-no-to-be/no-to-be": "error"
  }
}
```

## Disabling a specific line

Use oxlint's standard disable directive on the line directly above the
offending expression.

```ts
// oxlint-disable-next-line crescware-no-to-be/no-to-be
expect(value).toBe(expected);
```

## Stack

- **Runtime**: Node.js 24 (via [mise](https://mise.jdx.dev/))
- **Package manager**: pnpm (via corepack)
- **Language**: TypeScript ([native preview](https://github.com/microsoft/typescript-go))
- **Test**: [Vitest](https://vitest.dev/)
- **Lint**: [oxlint](https://oxc.rs/docs/guide/usage/linter)
- **Format**: [oxfmt](https://github.com/oxc-project/oxfmt)
- **Unused code**: [Knip](https://knip.dev/)

## Setup (development)

```sh
mise install
corepack enable
pnpm install
```

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `pnpm build`         | Compile to `dist/`                       |
| `pnpm check`         | Run all checks (types, lint, knip, test) |
| `pnpm check:types`   | Type check                               |
| `pnpm check:lint`    | Lint and format check                    |
| `pnpm check:knip`    | Unused files/exports check               |
| `pnpm exec:fixtures` | Run oxlint against fixtures (raw JSON)   |
| `pnpm test`          | Run integration tests                    |
| `pnpm format`        | Fix lint and format                      |
