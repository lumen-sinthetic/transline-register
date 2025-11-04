import blacklistPlugin from "./config/linting/commitlint-blacklist.cjs";

export default {
  extends: ["@commitlint/config-conventional"],
  plugins: [blacklistPlugin],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "ticket",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "remove",
      ],
    ],
    "header-max-length": [2, "always", 100],
    blacklist: [2, "always"],
  },
};
