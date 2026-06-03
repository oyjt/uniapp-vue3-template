# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 技术栈

- 框架: uni-app（Vue 3 + Composition API）
- 打包构建工具: Vite 5.0+
- 状态管理: Pinia
- UI 组件库: uview-plus 3.4+
- CSS 预处理器: Scss
- CSS 框架: UnoCSS
- 代码校验与格式化: ESLint
- 开发语言: TypeScript
- 包管理工具: pnpm

## 目录结构

```sh
├ build                 # vite配置统一管理
│  ├ config             # vite配置管理
│  └ plugins            # vite插件管理
├ env                   # 环境变量
├ scripts               # 一些脚本
│  ├ post-upgrade.js    # 依赖库清理
│  └ verify-commit.js   # git提交检验
├ src
│  ├ api                # 接口管理
│  ├ components         # 公共组件
│  ├ hooks              # 常用hooks封装
│  ├ locale             # 国际化语言管理
│  ├ pages              # 页面管理
│  ├ plugins            # 插件管理
│  ├ router             # 路由管理
│  ├ static             # 静态资源
│  ├ store              # 状态管理
│  ├ utils              # 一些工具
│  ├ App.vue            # 根组件
│  ├ main.ts            # 入口文件
│  ├ manifest.json      # uniapp 项目配置
│  ├ pages.json         # uniapp 页面配置
│  └ uni.scss           # 全局scss变量
├ types                 # 全局typescript类型文件
├ cz.config.js          # cz-git配置
├ eslint.config.js      # eslint配置
├ index.html            # html入口文件
├ stylelint.config.js   # stylelint配置
├ tsconfig.json         # ts 配置
├ uno.config.ts         # unocss配置
└ vite.config.ts        # vite配置
```

## 常用命令

```bash
# 安装依赖（必须使用 pnpm）
pnpm install

# 开发
pnpm dev:h5                  # H5 开发环境
pnpm dev:mp-weixin           # 微信小程序开发环境
pnpm dev:app                 # App 开发环境

# 构建（支持 dev / test / prod 三套环境）
pnpm build:h5                # H5 默认环境
pnpm build:h5-test           # H5 测试环境
pnpm build:h5-prod           # H5 生产环境
pnpm build:mp-weixin-prod    # 微信小程序生产环境

# 代码检查
pnpm eslint                  # ESLint 检查
pnpm eslint:fix              # ESLint 自动修复
pnpm stylelint               # StyleLint 检查
pnpm stylelint:fix           # StyleLint 自动修复
pnpm type-check              # TypeScript 类型检查

# 提交代码（引导式）
pnpm cz

# 微信小程序 CI（需先 build）
pnpm preview                 # 预览（生成二维码）
pnpm upload:prod             # 上传到体验版
```

## 架构概览

### 多端条件编译

使用 `// #ifdef PLATFORM` / `// #endif` 处理平台差异。H5 代理通过 `VITE_APP_PROXY=true` 开关控制，此时 `baseURL` 改为 `VITE_API_PREFIX`（默认 `/api`）。

### 路由与鉴权

路由表由 [src/router/index.ts](src/router/index.ts) 在运行时解析 `pages.json` 生成，不存在独立路由文件。

- **普通页面鉴权**：在 `pages.json` 对应页面配置中设置 `"needLogin": true`，路由拦截器会自动处理。
- **TabBar 页面鉴权**：微信小程序点击 TabBar 不触发 `uni.switchTab`，必须在页面 `onShow` 中手动调用 `usePermission()` Hook。参考 `@/pages/tab/user/index.vue`。

### 网络请求

基于 uview-plus 内置的 luch-request 封装，入口为 [src/utils/request/index.ts](src/utils/request/index.ts)。

- Token 挂载在请求 header 的 `token` 字段，`custom.auth = false` 可跳过。
- 响应 401 自动触发 Token 无感刷新（`refreshToken`），期间队列其他请求等待重试。
- `custom` 扩展参数：`loading`（显示 loading）、`toast`（错误弹窗，默认 true）、`repeatSubmit`（防重复提交，POST 默认开启）。

### 状态管理

Pinia 使用 `pinia-plugin-persistedstate` 持久化，存储层替换为 `uni.getStorageSync / uni.setStorageSync` 以兼容小程序。Store 按模块划分在 `src/store/modules/`，优先使用 Setup store 语法。

### Vite 插件管理

所有插件统一在 [build/plugins/index.ts](build/plugins/index.ts) 注册：

- **图片 CDN 替换**（默认关闭）：取消 `ReplaceUrlPlugin()` 和 `CleanImagePlugin()` 注释即可开启。开启后图片必须通过 JS 模块化导入或 `@/static` 绝对路径引用，否则替换不生效。
- **包体积分析**（默认关闭）：取消 `VisualizerPlugin()` 注释。

### 环境变量

环境变量文件位于 `env/` 目录（`.env`、`.env.test`、`.env.production`），关键变量：`VITE_API_BASE_URL`、`VITE_APP_PROXY`、`VITE_API_PREFIX`、`VITE_DROP_CONSOLE`。

## 代码规范

### Vue 组件

- 必须使用 `<script setup lang="ts">` + Composition API
- 响应式变量优先用 `ref`，避免 `reactive`
- 复杂的模板表达式应重构为计算属性或方法
- 使用 `v-for` 时必须提供唯一的 `key`（不要轻易使用数组下标 `index` 当做 `key`）
- 不要在同一元素上同时使用 `v-if` 和 `v-for`
- 避免直接操作 DOM，尽可能编写原子化组件
- 样式优先使用 UnoCSS 内联，其次 `<style scoped lang="scss">`，禁用 `!important`
- 禁用 Prettier，格式化由 ESLint 负责
- 参考示例文件：`src/pages/tab/home/index.vue`

### 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `LangSelect/index.vue` |
| 页面文件 | kebab-case | `pages/tab/home/index.vue` |
| Composable | camelCase | `use-clipboard/index.ts` |
| TS/JS 文件 | kebab-case | `utils/index.ts` |
| Props 声明 | camelCase | `defineProps<{ isActive: boolean }>()` |
| Props 传递 | kebab-case | `:is-active="true"` |
| 类型/接口 | PascalCase | `interface UserInfo {}` |
| 常量 | UPPER_CASE | `const API_BASE_URL` |

### TypeScript

- 对象类型优先用 `interface`，联合/交叉/映射类型用 `type`
- 禁用 `any`，未知类型用 `unknown`
- 使用泛型实现可复用的类型模式
- 不可变属性使用 `readonly`
- 公共函数需有显式返回类型
- 捕获可能的异常并进行处理，实现适当的空值检查
- 避免不必要的类型断言和类型体操，以可读性为主
- 全局类型定义放 `types/` 目录

### API 模块结构

每个模块包含 `index.ts`（请求函数）和 `types.ts`（类型定义），统一从 `src/api/index.ts` 导出。

## Git 提交规范

格式：`type: message`（英文冒号后有一个空格）

`type` 枚举值：

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复错误 |
| `perf` | 性能优化 |
| `refactor` | 重构代码 |
| `docs` | 文档和注释 |
| `types` | 类型相关 |
| `test` | 单测相关 |
| `ci` | 持续集成、工作流 |
| `revert` | 撤销更改 |
| `chore` | 琐事（更新依赖、修改配置等） |

分支说明：`main / master` 为主分支，`gh-pages` 为 GitHub Pages 构建分支。

提交信息通过 `scripts/verify-commit.js` 校验，pre-commit 触发 lint-staged 自动修复。使用 `pnpm cz` 通过交互式命令行提交，避免手动写提交信息格式错误。
