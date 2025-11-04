branch_name=$(git rev-parse --abbrev-ref HEAD)

node $(pwd)/config/linting/branchlint.cjs "$branch_name" --prohibit
