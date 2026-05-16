import { restrictedMatchers } from "./config/restricted-matchers.ts";

export default {
  plugins: ["vitest"],
  categories: {
    correctness: "off",
    suspicious: "off",
    pedantic: "off",
    perf: "off",
    style: "off",
    restriction: "off",
    nursery: "off",
  },
  rules: {
    "vitest/no-restricted-matchers": ["error", restrictedMatchers],
  },
};
