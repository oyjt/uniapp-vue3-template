# ✨ uni-app 团队协作开发实践模板 (Vue3)

[![GitHub Repo stars](https://img.shields.io/github/stars/oyjt/uniapp-vue3-template?style=flat&logo=github)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub forks](https://img.shields.io/github/forks/oyjt/uniapp-vue3-template?style=flat&logo=github)](https://github.com/oyjt/uniapp-vue3-template)
[![node version](https://img.shields.io/badge/node-%3E%3D18-green)](https://github.com/oyjt/uniapp-vue3-template)
[![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D8-green)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/oyjt/uniapp-vue3-template)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub License](https://img.shields.io/github/license/oyjt/uniapp-vue3-template)](https://github.com/oyjt/uniapp-vue3-template)


使用 **uni-app + vite + vue3 + typescript + uview-plus + unocss** 搭建的适合**团队协作**的快速开发模版。本项目集众多优秀项目的优点，旨在打造最适合团队协作开发的高效脚手架。

| 技术栈 |  描述  |
| ---  | ----- |
|框架/构建 |	Uni-app, Vue 3, Vite, TypeScript|
|UI 库 |	uview-plus (默认) / wot-ui / shadcn-ui (分支)|
|样式 |	UnoCSS, StyleLint, EditorConfig|
|状态管理 |	Pinia |
|网络请求 |	luch-request（默认） / axios (分支) / alova (分支)|
|代码规范 |	ESLint, StyleLint, Git Hooks (Commit 校验)|

## 🔗 链接与文档
- 国内仓库地址 (Gitee)：[https://gitee.com/ouyang/uniapp-vue3-template](https://gitee.com/ouyang/uniapp-vue3-template)

- 在线预览地址：[https://oyjt.github.io/uniapp-vue3-template/](https://oyjt.github.io/uniapp-vue3-template/)

- uview-plus 官方文档：[https://uiadmin.net/uview-plus/](https://uiadmin.net/uview-plus/)

- wot-ui 官方文档：[https://wot-ui.cn/](https://wot-ui.cn/)

- shadcn-ui 官方文档：[https://ui.shadcn.com/](https://ui.shadcn.com/)

- uni-app 插件精选: [https://github.com/oyjt/awesome-uniapp](https://github.com/oyjt/awesome-uniapp)

## 🚀 项目核心特性

#### 📦 开发与工程化
- [x] **技术栈:** TypeScript 全面支持。

- [x] **构建优化:** 支持多环境打包构建 (`dev`, `test`, `prod`)。

- [x] **模块化:** 支持路径别名 (`@/`)、组件和 API **自动加载**。

- [x] **代码规范:** 集成 ESLint、StyleLint、EditorConfig，自动校验 Git 提交代码格式。

- [x] **AI 支持:** 更好地适配 `cursor` 和 `trae` 规则，集成 `MCP` 插件。

- [x] **包体积分析:** 集成包体积视图分析插件 (`rollup-plugin-visualizer`)。

- [x] **无 TS 版本:** 查看 `base-js` 分支

- [x] **自动化构建：** 支持微信小程序自动化构建（preview / upload）

#### 🎨 UI 与样式
- [x] **UI 库:** 集成 `uview-plus 3.0` (默认)。

  - *分支支持:* `wot-ui` (查看 [feature/wot-design-uni]((https://github.com/oyjt/uniapp-vue3-template/tree/feature/wot-design-uni)) 分支)。

  - *分支支持:* `shadcn-ui` (查看 [feature/shadcn-ui](https://github.com/oyjt/uniapp-vue3-template/tree/feature/shadcn-ui) 分支)。

- [x] **原子化 CSS:** 集成 `UnoCSS`，支持快速样式开发。

- [x] **图标库:** 集成 `Iconify` 图标库。

#### 🌐 业务功能与优化
- [x] **状态管理:** 使用 `Pinia`。

- [x] **网络请求:** 封装网络请求（支持 TypeScript），支持 **Token 无感刷新**。

  - *分支支持*：`alova` (查看 [feature/alova](https://github.com/oyjt/uniapp-vue3-template/tree/feature/alova) 分支)。
  - *分支支持*：`axios` (查看 [feature/axios](https://github.com/oyjt/uniapp-vue3-template/tree/feature/axios) 分支)。

- [x] **权限控制:** 添加页面跳转拦截，实现 登录权限校验。

- [x] **分包策略:** 支持项目分包，优化加载速度。

- [x] **组件优化:** 集成 `z-paging` 下拉刷新/上拉加载功能。

- [x] **国际化:** 支持多语言 (i18n)。

- [x] **小程序特定:** 集成小程序隐私协议授权组件。

#### 🖼️ 资源处理优化
- [x] **图片优化:** 项目构建时，**自动删除本地图片并替换本地路径为线上 CDN 路径** (需配置)。


## 📁 目录结构概览
清晰的目录结构是团队协作的基础。本项目采用目前主流的技术方案。
```
uniapp-vue3-project/
├── build/             # Vite 配置和插件统一管理
├── env/               # 环境变量配置
├── scripts/           # 自动化脚本 (如 Git Commit 校验, 小程序 CI/CD)
├── src/
│   ├── api/           # 接口管理 (按模块划分, 包含类型定义)
│   ├── components/    # 公共组件
│   ├── hooks/         # 常用自定义 Hooks 封装
│   ├── locale/        # 国际化语言资源
│   ├── pages/         # 页面管理 (主包与分包)
│   ├── plugins/       # uni-app 插件初始化
│   ├── router/        # 路由管理
│   ├── static/        # 静态资源 (图片, 字体等)
│   ├── store/         # Pinia 状态管理 (按模块划分)
│   ├── utils/         # 工具函数 (请求、鉴权、弹窗等)
│   ├── App.vue
│   ├── main.ts
│   ├── manifest.json  # 项目配置
│   ├── pages.json     # 页面配置 (路由、分包、TabBar)
│   └── uni.scss       # 全局 scss 变量
└── types/             # 全局 TypeScript 类型文件 (包含自动生成的文件)
```

#### 🔧 Vite 插件管理
```
build
├ config            vite配置
│  ├ index.ts       入口文件
│  └ proxy.ts       跨域代理配置
└ plugins           vite插件
   ├ autoImport.ts  自动导入api
   ├ cleanImage.ts  自动清理图片文件
   ├ component.ts   自动导入组件
   ├ index.ts       入口文件
   ├ replaceUrl.ts  自动替换图片地址为CDN地址
   ├ unocss.ts      unocss配置
   └ visualizer.ts  包体积视图分析

```

#### 🧩 API 管理结构
```
api
├ common       通用api
│  ├ index.ts
│  └ types.ts
├ user         用户相关api
│  ├ index.ts
│  └ types.ts
└ index.ts     入口文件
```

#### 🔗 Hooks 管理
```
hooks
├ use-clipboard  剪切板
│  └ index.ts
├ use-loading    loading
│  └ index.ts
├ use-modal      模态框
│  └ index.ts
├ use-permission 校验权限
│  └ index.ts
├ use-share      分享
│  └ index.ts
└ index.ts       入口文件
```

#### 📁 页面结构
```
pages
├ common           公共页面（分包common）
│  ├ login
│  │  └ index.vue
│  └ webview
│     └ index.vue
└ tab              主页面（主包）
   ├ home
   │  └ index.vue
   ├ list
   │  └ index.vue
   └ user
      └ index.vue
```

#### 📦 状态管理（Pinia）
```
store
├ modules
│  ├ app          app状态
│  │  ├ index.ts
│  │  └ types.ts
│  └ user         用户状态
│     ├ index.ts
│     └ types.ts
└ index.ts        入口文件
```

#### 🔧 工具类（utils）
```
utils
├ auth                token相关方法
│  └ index.ts
├ common              通用方法
│  └ index.ts
├ modals              弹窗相关方法
│  └ index.ts
├ request             网络请求相关方法
│  ├ index.ts
│  ├ interceptors.ts
│  ├ status.ts
│  └ types.ts
└ index.ts            入口文件
```

## 🛠️ 使用方法

#### 1. 项目启动

推荐使用 `pnpm` 作为包管理工具。

```bash
# 安装依赖
pnpm install

# 启动H5
pnpm dev:h5

# 启动微信小程序
pnpm dev:mp-weixin
```

#### 2. 项目发布（构建）

```bash
# 构建开发环境 (H5 / 小程序)
pnpm build:h5
pnpm build:mp-weixin

# 构建测试环境 (H5 / 小程序)
pnpm build:h5-test
pnpm build:mp-weixin-test

# 构建生产环境 (H5 / 小程序)
pnpm build:h5-prod
pnpm build:mp-weixin-prod
```

#### 3. 代码提交规范

本项目集成 `cz-git`，通过交互式命令行提交代码。

```bash
# 引导式代码提交
pnpm cz
```

#### 4. 更新 uni-app 版本

使用 UVM (uni-app version manager) 统一管理依赖版本。

```bash
# 更新 uni-app 相关依赖到最新正式版
pnpm uvm

# 升级完成后，清理可能产生的冗余依赖，减小包体积
pnpm uvm-rm
```

#### 5. 同步最新代码

1. 在自己的仓库里面新增开源仓库地址
```bash
git remote add upstream https://github.com/oyjt/uniapp-vue3-template
```

2. 从开源仓库拉取最新代码
```bash
git fetch upstream
```

3. 合并更新，拉取开源项目更新代码
```bash
# 切换到本地 main 分支
git checkout main

# 合并更新
git merge upstream/main
```

4. 代码有冲突时，解决冲突，解决完冲突后提交代码即可

## ⚡ 页面模板代码块（VSCode Snippet）
在 `vue` 文件中，输入 `v3` 按 `tab` 即可快速生成页面模板，可以加快页面生成。
> 原理：基于 VSCode 代码块生成。

## 🔑 核心功能指南

#### 1. 登录鉴权 (路由拦截)

##### A. 普通页面鉴权
在 `pages.json` 中，通过在目标页面的配置对象中设置 `needLogin: true` 来启用鉴权。
```json
{
  "pages": [
    {
      "path": "pages/test/test",
      "needLogin": true,  // <-- 开启鉴权
      "style": {
        "navigationBarTitleText": ""
      }
    }
  ]
}
```

##### B. TabBar 页面鉴权（小程序平台兼容）

在微信小程序中，点击 `TabBar` 不会触发 `uni.switchTab`，因此常规的路由拦截会失效。解决方案是在 `TabBar` 页面的生命周期 `onShow` 中手动进行权限校验。

> 拦截uni.switchTab本身没有问题。但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。

- 参考文件: `pages/tab/user/index.vue`

- 核心实现:
```ts
<script setup lang="ts">
import { usePermission } from "@/hooks";

onShow(async () => {
  console.log("tabbar page onShow");
  // 核心：调用鉴权 Hook，如果未登录将进行拦截或跳转到登录页
  const hasPermission = await usePermission(); 
  console.log(hasPermission ? "已登录" : "未登录，拦截跳转");
});
</script>
```

#### 2. 资源处理（本地图片转 CDN）

为了优化小程序/App 包体积，本项目提供了在构建时自动清理本地图片并替换为线上 CDN 地址的功能。

- **默认状态:** 默认不开启。

- **开启方法:** 在 `build/vite/plugins/index.ts` 文件中，移除 `vite-plugin-clean-build` 和 `vite-plugin-replace-image-url` 相关的注释。

**⚠️ 规范要求：图片必须使用绝对路径引入**
为确保插件替换生效，所有图片资源必须通过 **JS 模块化导入**或使用 `@/static` 绝对路径引入。

示例一：模板中绑定的图片
```html
<template>
  <view :style="`background-image: url('${bgImg}')`">
    ...
  </view>
</template>
<script setup lang="ts">
import bgImg from '@/static/images/bg_img.png'; // <-- 必须通过 JS 模块化导入
</script>
```

示例二：CSS 中的图片使用
```scss
<style lang="scss">
.icon {
  background-image: url('@/static/images/icon.png') // <-- 使用绝对路径
}
</style>
```


## 🤖 微信小程序自动化构建 (CI/CD)

本项目提供基于 `miniprogram-ci` 工具的 `Node.js` 脚本 (`scripts/mini-ci.js`)，用于自动化**预览 (preview)** 和**上传 (upload)** 微信小程序代码。

#### 1. 编译前置要求

在执行自动化脚本前，必须先完成 uni-app 的编译流程：

```bash
pnpm build:mp-weixin  # 生成产物目录：dist/build/mp-weixin
```

#### 2. 授权配置（AppID & 私钥）
脚本需要小程序的 AppID 和私钥文件。**强烈建议在 CI/CD 环境中使用环境变量传入**，以确保安全。

| 方式        | 变量名   |  描述  |
| ---   | ----  | -----  |
| 推荐 (CI/CD)     | `MINI_APPID` |   小程序 AppID。     |
| 推荐 (CI/CD)        |   `MINI_PRIVATE_KEY`   |   开发者私钥文件（`private.<appid>.key`）的内容。**注意：需替换所有换行符 `\n`** 。  |
| 回退 (本地)        |   文件查找   |  脚本会在 `scripts/` 目录下查找私钥文件。**不推荐提交到 Git 仓库**。 |


#### 3. 脚本执行命令

命令格式：`pnpm <mode> [env]`

##### 💡 预览 (Preview) - 生成二维码

```bash
# 预览开发环境 (dev)
pnpm preview 

# 预览测试环境 (test)
pnpm preview test
```

- **输出:** 产物目录下会生成 `preview-<env>.png` (二维码图片) 和 `preview-<env>.html` (浏览器查看页)。

##### ⬆️ 上传 (Upload) - 到体验版

```bash
# 上传开发环境代码到体验版
pnpm upload

# 上传生产环境代码到体验版
pnpm upload prod
```

- **版本号/描述:**

  - **版本号 (`version`):** 来源于 `package.json` 中的 `version` 字段 (`x.y.z`)。

  - **描述信息 (`desc`):** 包含 `[环境] + package.json 版本 + 日期 + Git Commit Short Hash`。

## ❌ 常见问题 (FAQ)
#### 1. 关于包体积分析不准确？

  微信开发者工具内置的打包分析不准确。本项目已集成 `rollup-plugin-visualizer`，如需使用，请在 Vite 配置中移除相关注释。

#### 2. 构建小程序时出现 Babel 错误？

  错误信息:` This @babel/plugin-proposal-private-property-in-object version is not meant to be imported.`

  **解决办法:** 升级微信开发者工具版本，或手动安装缺失的依赖：`pnpm install @babel/plugin-proposal-private-property-in-object`。

#### 3. Shadcn-ui 分支说明

  `feature/shadcn-ui` 分支采用最新的 `tailwindcss v4.1`，Unocss 对其支持还不够完善。**Shadcn-ui 不太适合移动端**，如不需要可切换回主分支或移除相关配置。

### ❤️ 捐赠支持

如果这个项目帮助了你，可以请作者喝饮料🍹

<p align='center'>
<img alt="微信收款码" src="./src/static/images/pay.png" height="330" style="display:inline-block; height:330px;">
</p>
