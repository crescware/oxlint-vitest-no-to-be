# oxlint-vitest-no-to-be (verification repo)

> Repository directory will be renamed to match `oxlint-vitest-no-to-be`.

Verification setup for [oxlint](https://oxc.rs/docs/guide/usage/linter)'s
built-in `vitest/no-restricted-matchers` rule, configured to ban a fixed
set of Vitest matchers in favor of `.toEqual()` or explicit boolean
assertions.

This repository exists only to document the configuration and provide
fixtures to manually verify oxlint's behavior. There is no plugin code
or build artifact — the rule is already part of oxlint itself.

## Banned matchers

| Matcher              | Replacement                                |
| -------------------- | ------------------------------------------ |
| `.toBe()`            | `.toEqual()`                               |
| `.toBeDefined()`     | existence check on `.toEqual(true\|false)` |
| `.toBeNull()`        | `.toEqual(null)`                           |
| `.toBeInstanceOf(T)` | `.toEqual()` with `instanceof` check       |
| `.toBeTruthy()`      | `.toEqual(true\|false)`                    |
| `.toBeFalsy()`       | `.toEqual(false\|true)`                    |
| `.toBeNaN()`         | `.toEqual(NaN)`                            |

## Covered chain prefixes

The rule does exact string match on the dotted chain (`not`, `rejects`,
`resolves` are special-cased to `starts_with`, but `soft` is not). Each
matcher above is therefore registered under all 8 of the following
chain prefixes, so any of them on any matcher above is reported:

```
toBe                    not.toBe
soft.toBe               soft.not.toBe
resolves.toBe           resolves.not.toBe
rejects.toBe            rejects.not.toBe
```

(7 matchers × 8 chains = 56 entries, generated at oxlint runtime from
`config/restricted-matchers.ts`.)

## Config layout

- `oxlint.config.ts` (experimental TS config; auto-discovered by oxlint)
  imports `restrictedMatchers` from `config/restricted-matchers.ts`.
- `config/restricted-matchers.ts` defines the matcher list (7 rows) and
  the chain prefix list (1 row), and derives the 56-entry map via
  `Object.fromEntries(matchers.flatMap(...))`.

Editing means changing the matcher row or the prefix row, never the
56 entries themselves.

## Not covered

Deeper chain combinations (e.g. `soft.resolves.toBe`,
`soft.rejects.not.toBe`) are intentionally not configured. See
`src/uncovered-chains.test.ts` for examples that pass without
diagnostics. Add explicit entries to `.oxlintrc.json` if needed.

## Fixtures

`src/*.test.ts` each demonstrate one slice (matcher per file, async
chain prefixes, non-target matchers, disable directive, uncovered
combinations). Each fixture declares its expected diagnostic count via
a header comment:

```ts
// @expect-diagnostics: 3
```

`scripts/verify.mjs` reads those headers, runs oxlint, and asserts
the per-file count matches. Add or remove cases without touching any
aggregated total.

## Setup

```sh
mise install
corepack enable
pnpm install
```

## Scripts

| Command       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `pnpm check`  | Per-fixture diagnostic count assertion + format check |
| `pnpm verify` | Per-fixture diagnostic count assertion only           |
| `pnpm format` | Apply oxfmt to all files                              |

To inspect raw diagnostics:

```sh
pnpm exec oxlint -f json src/
```
