# CLAUDE.md

## 技术栈

uni-app（Vue 3 + Composition API）/ Vite 5+ / Pinia / uview-plus 3.4+ / UnoCSS / Scss / TypeScript / ESLint / pnpm

## 目录结构

```
├ build/                # Vite 配置与插件
├ env/                  # 环境变量（.env / .env.test / .env.production）
├ scripts/              # 构建脚本（post-upgrade / verify-commit）
├ src/
│  ├ api/               # 接口（模块/index.ts + types.ts）
│  ├ components/        # 公共组件
│  ├ hooks/             # Composables
│  ├ locale/            # i18n
│  ├ pages/             # 页面
│  ├ plugins/           # 插件
│  ├ router/            # 路由（运行时解析 pages.json）
│  ├ static/            # 静态资源
│  ├ store/modules/     # Pinia Store（按模块划分）
│  └ utils/             # 工具函数
├ types/                # 全局 TS 类型
└ uno.config.ts         # UnoCSS 配置
```

## 常用命令

```bash
pnpm install                 # 安装依赖（必须用 pnpm）
pnpm dev:h5                  # H5 开发
pnpm dev:mp-weixin           # 微信小程序开发
pnpm build:h5-prod           # H5 生产构建
pnpm build:mp-weixin-prod    # 微信小程序生产构建
pnpm eslint:fix              # ESLint 自动修复
pnpm stylelint:fix           # StyleLint 自动修复
pnpm type-check              # TypeScript 类型检查
pnpm cz                      # 引导式 Git 提交
```

## 架构要点

- **条件编译**: `// #ifdef PLATFORM` / `// #endif` 处理多端差异
- **路由鉴权**: pages.json 中设置 `"needLogin": true`；TabBar 页面在 `onShow` 中调用 `usePermission()`
- **网络请求**: `src/utils/request/index.ts`，Token 在 header `token` 字段，`custom.auth = false` 跳过鉴权，401 自动刷新 Token
- **状态持久化**: pinia-plugin-persistedstate + uni.getStorageSync/setStorageSync
- **环境变量**: `VITE_API_BASE_URL` / `VITE_APP_PROXY` / `VITE_API_PREFIX` / `VITE_DROP_CONSOLE`
- **Vite 插件**: 统一注册在 `build/plugins/index.ts`，CDN 替换和体积分析默认关闭