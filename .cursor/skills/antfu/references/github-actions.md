---
name: github-actions
description: Anthony Fu's preferred GitHub Actions workflows using sxzz/workflows
---

# GitHub Actions

When setting up a new project, add these workflows. Skip if workflows already exist.

## Autofix Workflow

**`.github/workflows/autofix.yml`** - Auto-fix linting on PRs:

```yaml
name: autofix.ci

on: [pull_request]

jobs:
  autofix:
    uses: sxzz/workflows/.github/workflows/autofix.yml@v1
    permissions:
      contents: read
```

## Unit Test Workflow

**`.github/workflows/unit-test.yml`** - Run tests on push/PR:

```yaml
name: Unit Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions: {}

jobs:
  unit-test:
    uses: sxzz/workflows/.github/workflows/unit-test.yml@v1
```

## Release Workflow

**`.github/workflows/release.yml`** - Publish on tag (library projects only):

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    uses: sxzz/workflows/.github/workflows/release.yml@v1
    with:
      publish: true
    permissions:
      contents: write
      id-token: write
```

All workflows use [sxzz/workflows](https://github.com/sxzz/workflows) reusable workflows.
