### 使用uniapp+vite+vue3+uview-plus3.0 搭建的微信小程序快速开发模版

使用uniapp+vite+vue3+typescript+uview-plus3.0 搭建的H5和微信小程序快速开发模版

[uview-plus官方文档](https://uiadmin.net/uview-plus/)

本项目集众多项目的优点，打造最适合团队协作开发的项目模板。

在线预览地址：[https://oyjt.github.io/uniapp-vue3-template/](https://oyjt.github.io/uniapp-vue3-template/)

### 特性

- [x] 集成uview-plus3.0 ui库
- [x] 支持多环境打包构建
- [x] 使用pinia状态管理
- [x] 封装网络请求，并支持Typescript
- [x] 支持路径别名
- [x] 支持自动加载组件和API
- [x] 自动校验git提交代码格式
- [x] 集成ESLint、StyleLint、EditorConfig代码格式规范
- [x] Typescript支持
- [x] 集成UnoCSS
- [x] 集成z-paging下拉刷新功能
- [x] 添加页面跳转拦截，登录权限校验
- [x] 支持token无痛刷新
- [x] 支持持续集成
- [x] 项目分包
- [x] 集成小程序隐私协议授权组件
- [x] 项目构建自动删除本地图片并替换本地图片路径为线上图片

### VScode插件推荐
- 可以为pages.json、manifest.json等提供语法提示和校验工作。[uni-app-schemas](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-app-schemas-vscode)
- uni-app 基本能力代码片段。[uni-app-snippets](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-app-snippets-vscode)
- 一键创建页面、组件、分包，个人用不习惯。uni-create-view(https://marketplace.visualstudio.com/items?itemName=mrmaoddxxaa.create-uniapp-view)


### 目录结构
项目中采用目前最新的技术方案来实现，目录结构清晰。
```
uniapp-vue3-project     
├ build                 vite插件统一管理
│  ├ vite               
│  └ constant.ts        
├ scripts               一些脚本
│  └ verifyCommit.js    
├ src                   
│  ├ api                接口管理
│  ├ components         公共组件
│  ├ hooks              常用hooks封装
│  ├ pages              页面管理
│  ├ static             静态资源
│  ├ store              状态管理
│  ├ utils              一些工具
│  ├ App.vue            
│  ├ main.ts            
│  ├ manifest.json      
│  ├ pages.json         
│  ├ permission.ts      页面访问权限控制
│  └ uni.scss           
├ types                 全局typescript类型文件
│  ├ auto-imports.d.ts  
│  ├ components.d.ts    
│  ├ global.d.ts        
│  └ module.d.ts        
├ README.md             
├ eslint.config.js      
├ index.html            
├ package.json          
├ pnpm-lock.yaml        
├ tsconfig.json         
├ uno.config.ts         
└ vite.config.ts        
```

#### vite插件管理
```
build                  
├ vite                 
│  ├ plugins           
│  │  ├ autoImport.ts  自动导入api
│  │  ├ component.ts   自动导入组件
│  │  ├ imagemin.ts    图片压缩
│  │  ├ index.ts       入口文件
│  │  └ unocss.ts      unocss插件
│  └ proxy.ts          跨域代理配置
└ constant.ts          一些常量
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
│  └ type.ts          
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
# 构建测试环境
pnpm build:h5
pnpm build:mp-weixin

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

### 注意事项
1. 如果项目中不需要压缩图片，可以移除`vite-plugin-imagemin`插件后再初始化，以避免由于网路问题造成初始化报错的情况
2. 自动构建处理本地图片资源，使用了`vite-plugin-clean-build`和`vite-plugin-replace-image-url`这两个插件，默认不开启相关功能，如果需要使用再`build/vite/plugins/index.ts`文件中移除相关注释即可
3. 使用`vite-plugin-replace-image-url`插件，想要图片自动替换生效，需要在项目中使用绝对路径引入图片资源，如下示例所示。

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