#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Load .env variables
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envData = fs.readFileSync(envPath, "utf8");
  envData.split("\n").forEach(line => {
    const [key, value] = line.split("=");
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

const isLintDisabled = process.env.DISABLE_BRANCH_LINT === "true";

if (isLintDisabled) {
  console.log("⚠️ Branch linting is disabled via .env. Skipping checks...");
  process.exit(0);
}

const branchName = process.argv[2];
const prohibitPush = process.argv.includes("--prohibit");
const omitProhibit = process.argv.includes("--omit-prohibited");

if (!branchName) {
  console.error("❌ No branch name provided!");
  process.exit(1);
}

const TYPES = [
  "fix",
  "docs",
  "misc",
  "improve",
  "introduce",
  "feat",
  "feature",
  "bugfix",
  "hotfix",
  "release",
  "chore",
  "style",
  "config",
];

const PROHIBITED = [
  "ci",
  "wip",
  "main",
  "test",
  "build",
  "master",
  "release",
  "main",
  "dev",
  "development",
];

// Define allowed branch naming pattern
const BRANCH_PATTERN = new RegExp(`^(${TYPES.join("|")})\/[a-z0-9-]+$`);

// Block pushes to main or dev if --prohibit flag is set
if (prohibitPush && PROHIBITED.includes(branchName)) {
  if (omitProhibit) {
    process.exit(0);
  }

  console.error(`🚫 Pushing directly to "${branchName}" is not allowed!`);
  console.error("🔒 Please use a feature branch and open a merge request.");
  process.exit(1);
}

// Validate branch naming
if (!BRANCH_PATTERN.test(branchName)) {
  console.error(`❌ Invalid branch name: "${branchName}"`);
  console.error("✅ Allowed formats:");
  TYPES.sort((a, b) => a.length - b.length).forEach(t => {
    console.log(`   -- ${t}/branch-name`);
  });

  process.exit(1);
}

console.log("✅ Branch name is valid!");
process.exit(0);
