---
name: antfu-eslint-config
description: ESLint flat config for formatting and linting - replaces Prettier
---

# @antfu/eslint-config

A comprehensive ESLint flat config that handles both linting and formatting. Designed to replace Prettier entirely.

## Key Characteristics

- **No Prettier needed** - Handles all formatting via ESLint
- **ESLint Flat config** - Uses the new `eslint.config.js` format
- **Auto-detection** - TypeScript and Vue are detected automatically
- **Style principle**: Single quotes, no semicolons, sorted imports, dangling commas
- **Respects `.gitignore`** by default

## Basic Configuration

Create `eslint.config.mjs` (or `eslint.config.js` with `// @ts-check`):

```js
// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu()
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint"
  }
}
```

## Configuration Options

```js
import antfu from '@antfu/eslint-config'

export default antfu({
  // Project type: 'lib' for libraries, 'app' (default) for applications
  type: 'lib',

  // Global ignores (extends defaults, doesn't override)
  ignores: ['**/fixtures', '**/dist'],

  // Stylistic options
  stylistic: {
    indent: 2,        // 2, 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // Framework support (auto-detected, but can be explicit)
  typescript: true,
  vue: true,

  // Disable specific language support
  jsonc: false,
  yaml: false,
})
```

## Framework Support

### Vue

Vue accessibility:

```js
export default antfu({
  vue: {
    a11y: true
  },
})
// Requires: pnpm add -D eslint-plugin-vuejs-accessibility
```

### React

```js
export default antfu({
  react: true,
})
// Requires: pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Next.js

```js
export default antfu({
  nextjs: true,
})
// Requires: pnpm add -D @next/eslint-plugin-next
```

### Svelte

```js
export default antfu({
  svelte: true,
})
// Requires: pnpm add -D eslint-plugin-svelte
```

### Astro

```js
export default antfu({
  astro: true,
})
// Requires: pnpm add -D eslint-plugin-astro
```

### Solid

```js
export default antfu({
  solid: true,
})
// Requires: pnpm add -D eslint-plugin-solid
```

### UnoCSS

```js
export default antfu({
  unocss: true,
})
// Requires: pnpm add -D @unocss/eslint-plugin
```

## Formatters (CSS, HTML, Markdown)

For files ESLint doesn't handle natively:

```js
export default antfu({
  formatters: {
    css: true,      // Format CSS, LESS, SCSS (uses Prettier)
    html: true,     // Format HTML (uses Prettier)
    markdown: 'prettier' // or 'dprint'
  }
})
// Requires: pnpm add -D eslint-plugin-format
```

## Rule Overrides

### Global overrides

```js
export default antfu(
  {
    // First argument: antfu config options
  },
  // Additional arguments: ESLint flat configs
  {
    rules: {
      'style/semi': ['error', 'never'],
    },
  }
)
```

### Per-integration overrides

```js
export default antfu({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
})
```

### File-specific overrides

```js
export default antfu(
  { vue: true, typescript: true },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  }
)
```

## Plugin Prefix Renaming

The config renames plugin prefixes for consistency:

| New Prefix | Original |
|------------|----------|
| `ts/*` | `@typescript-eslint/*` |
| `style/*` | `@stylistic/*` |
| `import/*` | `import-lite/*` |
| `node/*` | `n/*` |
| `yaml/*` | `yml/*` |
| `test/*` | `vitest/*` |
| `next/*` | `@next/next` |

Use the new prefix when overriding or disabling rules:

```ts
// eslint-disable-next-line ts/consistent-type-definitions
type Foo = { bar: 2 }
```

## Type-Aware Rules

Enable TypeScript type checking:

```js
export default antfu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

## Config Composer API

Chain methods for flexible composition:

```js
export default antfu()
  .prepend(/* configs before main */)
  .override('antfu/stylistic/rules', {
    rules: {
      'style/generator-star-spacing': ['error', { after: true, before: false }],
    }
  })
  .renamePlugins({
    'old-prefix': 'new-prefix',
  })
```

## Less Opinionated Mode

Disable Anthony's most opinionated rules:

```js
export default antfu({
  lessOpinionated: true
})
```

## Lint-Staged Setup

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

```bash
pnpm add -D lint-staged simple-git-hooks
npx simple-git-hooks
```

## VS Code Settings

Add to `.vscode/settings.json`:

```jsonc
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "astro",
    "svelte",
    "css",
    "less",
    "scss"
  ]
}
```

<!-- 
Source references:
- https://github.com/antfu/eslint-config
- https://raw.githubusercontent.com/antfu/eslint-config/refs/heads/main/README.md
-->
