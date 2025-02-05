# uniapp 团队协作开发实践模板(Vue3)

[![GitHub Repo stars](https://img.shields.io/github/stars/oyjt/uniapp-vue3-template?style=flat&logo=github)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub forks](https://img.shields.io/github/forks/oyjt/uniapp-vue3-template?style=flat&logo=github)](https://github.com/oyjt/uniapp-vue3-template)
[![node version](https://img.shields.io/badge/node-%3E%3D18-green)](https://github.com/oyjt/uniapp-vue3-template)
[![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D8-green)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/oyjt/uniapp-vue3-template)](https://github.com/oyjt/uniapp-vue3-template)
[![GitHub License](https://img.shields.io/github/license/oyjt/uniapp-vue3-template)](https://github.com/oyjt/uniapp-vue3-template)


使用uniapp+vite+vue3+typescript+uview-plus+unocss 搭建的适合团队协作的快速开发模版

[uview-plus官方文档](https://uiadmin.net/uview-plus/)

本项目集众多项目的优点，打造最适合团队协作开发的项目模板。

在线预览地址：[https://oyjt.github.io/uniapp-vue3-template/](https://oyjt.github.io/uniapp-vue3-template/)

### 特性

- [x] 集成`uview-plus3.0 ui`库
- [x] 支持多环境打包构建
- [x] 使用`pinia`状态管理
- [x] 封装网络请求，并支持`Typescript`
- [x] 支持路径别名
- [x] 支持自动加载组件和`API`
- [x] 自动校验`git`提交代码格式
- [x] 集成`ESLint`、`StyleLint`、`EditorConfig`代码格式规范
- [x] `Typescript`支持
- [x] 集成`UnoCSS`
- [x] 集成`iconify`图标库
- [x] 集成`z-paging`下拉刷新功能
- [x] 添加页面跳转拦截，登录权限校验
- [x] 支持`token`无感刷新
- [x] 项目分包
- [x] 集成小程序隐私协议授权组件
- [x] 项目构建自动删除本地图片并替换本地图片路径为线上图片
- [x] 集成包体积视图分析插件
- [x] 支持国际化
- [x] 集成`alova`网络请求（具体使用请切换到 [feature/alova](https://github.com/oyjt/uniapp-vue3-template/tree/feature/alova) 分支）
- [x] 集成`axios`网络请求（具体使用请切换到 [feature/axios](https://github.com/oyjt/uniapp-vue3-template/tree/feature/axios) 分支）

### uniapp插件推荐
- [uniapp 插件精选（https://github.com/oyjt/awesome-uniapp）](https://github.com/oyjt/awesome-uniapp)

### 目录结构
项目中采用目前最新的技术方案来实现，目录结构清晰。
```
uniapp-vue3-project
├ build                 vite配置统一管理
│  ├ config
│  └ plugins
├ env                   环境变量
├ scripts               一些脚本
│  ├ post-upgrade.js     依赖库清理
│  └ verify-commit.js    git提交检验
├ src
│  ├ api                接口管理
│  ├ components         公共组件
│  ├ hooks              常用hooks封装
│  ├ locale             国际化语言管理
│  ├ pages              页面管理
│  ├ plugins            插件管理
│  ├ router             路由管理
│  ├ static             静态资源
│  ├ store              状态管理
│  ├ utils              一些工具
│  ├ App.vue
│  ├ main.ts
│  ├ manifest.json      项目配置
│  ├ pages.json         页面配置
│  └ uni.scss           全局scss变量
├ types                 全局typescript类型文件
│  ├ auto-imports.d.ts
│  ├ components.d.ts
│  ├ global.d.ts
│  └ module.d.ts
├ LICENSE
├ README.md
├ cz.config.js          cz-git配置
├ eslint.config.js      eslint配置
├ index.html
├ package.json
├ pnpm-lock.yaml
├ stylelint.config.js   stylelint配置
├ tsconfig.json
├ uno.config.ts         unocss配置
└ vite.config.ts        vite配置
```

#### vite插件管理
```
build
├ config            vite配置
│  ├ index.ts       入口文件
│  └ proxy.ts       跨域代理配置
└ plugins           vite插件
   ├ autoImport.ts  自动导入api
   ├ cleanImage.ts  自动清理图片文件
   ├ component.ts   自动导入组件
   ├ imagemin.ts    图片压缩
   ├ index.ts       入口文件
   ├ replaceUrl.ts  自动替换图片地址为CDN地址
   ├ unocss.ts      unocss配置
   └ visualizer.ts  包体积视图分析

```

#### 接口管理
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

#### hooks管理
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

### 页面管理
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

#### 状态管理
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

### 工具方法
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

### 使用方法

```bash
# 安装依赖
pnpm install

# 启动H5
pnpm dev:h5

# 启动微信小程序
pnpm dev:mp-weixin
```

### 发布

```bash
# 构建开发环境
pnpm build:h5
pnpm build:mp-weixin

# 构建测试环境
pnpm build:h5-test
pnpm build:mp-weixin-test

# 构建生产环境
pnpm build:h5-prod
pnpm build:mp-weixin-prod
```

### 代码提交
```bash
pnpm cz
```

### 更新uniapp版本

更新uniapp相关依赖到最新正式版
```bash
npx @dcloudio/uvm@latest
```
或者执行下面的命令
```bash
pnpm uvm
```

在升级完后，会自动添加很多无用依赖，执行下面的代码减小保体积
```
pnpm uvm-rm
```

### `v3` 代码块
在 `vue` 文件中，输入 `v3` 按 `tab` 即可快速生成页面模板，可以大大加快页面生成。
> 原理：基于 VSCode 代码块生成。

### 登录鉴权
1. 页面如果需要登录才能访问，只需在 `pages.json` 文件中需要鉴权的页面下设置 `needLogin` 属性设置为 `true` 即可，比如
```
{
  "pages": [
    {
      "path": "pages/test/test",
      "needLogin": true,
      "style": {
        "navigationBarTitleText": "",
      },
    }
  ]
}
```

2. 如果有`tab`页面需要登录才能访问，上面的设置在小程序中点击`tabbar`时无效，因为在小程序中点击tabbar不会触发`uni.switchTab`方法，下面是官方给出的回复及解决方案。

> 拦截uni.switchTab本身没有问题。但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。

可参考`pages/tab/user/index.vue`中的代码，核心代码如下：
```
<script setup lang="ts">
// 引入鉴权hooks
import { usePermission } from "@/hooks";

onShow(async () => {
  console.log("tabbar page onShow");
  const hasPermission = await usePermission();
  console.log(hasPermission ? "已登录" : "未登录，拦截跳转");
});
</script>
```

### 注意事项
1. 如果项目中不需要压缩图片，可以移除`vite-plugin-imagemin`插件后再初始化，以避免由于网路问题造成初始化报错的情况
2. 微信小程序开发者工具中内置的打包分析不准确，本项目使用了`rollup-plugin-visualizer`来分析小程序包体积，默认不开启，有需要的移除相关注释即可
3. 自动构建处理本地图片资源，使用了`vite-plugin-clean-build`和`vite-plugin-replace-image-url`这两个插件，默认不开启相关功能，如果需要使用再`build/vite/plugins/index.ts`文件中移除相关注释即可
4. 使用`vite-plugin-replace-image-url`插件，想要图片自动替换生效，需要在项目中使用绝对路径引入图片资源，如下示例所示。

    示例一：style中的图片使用
    ```
    <template>
      <view :style="`background-image: url('${bgImg}')`">
        ...
      </view>
    </template>
    <script setup lang="ts">
    import bgImg from '@/static/images/bg_img.png';
    </script>
    ```

    示例二：js中的图片使用

    ```
    <script setup lang="ts">
    import walletIcon from '@/static/images/icon_wallet.png';
    const menuList = [
      {
        name: 'wallet',
        title: '钱包',
        icon: walletIcon,
      },
      ...
    ];
    </script>
    ```

    示例二：css中的图片使用
    ```
    <style lang="scss">
    .icon {
      background-image: url('@/static/images/icon.png')
    }
    </style>
    ```

6. 部分用户构建微信小程序如下错误，原因是微信开发者工具缺失了对应的依赖。
```
This @babel/plugin-proposal-private-property-in-object version is not meant to
be imported.
```
此时升级微信开发者工具，或者安装`@babel/plugin-proposal-private-property-in-object`依赖即可解决问题。

### 捐赠

如果你觉得这个项目对你有帮助，你可以请作者喝饮料🍹

<p align='center'>
<img alt="微信收款码" src="./src/static/images/pay.png" height="330" style="display:inline-block; height:330px;">
</p>
