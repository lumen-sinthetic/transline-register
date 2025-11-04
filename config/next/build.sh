#!/bin/bash

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

# Run Biome check unless linting is disabled
if [ "$DISABLE_BUILD_LINTING" = "false" ]; then
  npx biome check
  biome_exit_code=$?

  # Exit if Biome check failed
  if [ "$biome_exit_code" -ne 0 ]; then
    echo "❌ Biome check failed. Build aborted."
    exit 1
  fi
fi

# Run Next.js build
npx next build
