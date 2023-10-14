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

### 目录结构
项目中采用目前最新的技术方案来实现，目录结构清晰。
```
uniapp-vue3-project         
├ build                     vite插件统一管理
│  ├ vite                   
│  │  ├ plugins             
│  │  │  ├ autoImport.ts    自动导入api插件
│  │  │  ├ component.ts     自动导入组件插件
│  │  │  ├ imagemin.ts      图片压缩插件
│  │  │  ├ index.ts         
│  │  │  └ unocss.ts        unocss插件
│  │  └ proxy.ts            跨域代理配置
│  └ constant.ts            
├ scripts                   
│  └ verifyCommit.js        代码提交校验
├ src                       
│  ├ api                    
│  │  ├ common              通用api
│  │  │  ├ index.ts         
│  │  │  └ types.ts         
│  │  ├ user                用户相关api
│  │  │  ├ index.ts         
│  │  │  └ types.ts         
│  │  └ index.ts            
│  ├ components             公共组件
│  │  └ page-nav            
│  │     └ page-nav.vue     
│  ├ hooks                  一些常用hooks封装
│  │  ├ use-clipboard       
│  │  │  └ index.ts         
│  │  ├ use-loading         
│  │  │  └ index.ts         
│  │  ├ use-modal           
│  │  │  └ index.ts         
│  │  ├ use-share           
│  │  │  └ index.ts         
│  │  └ index.ts            
│  ├ pages                  一些页面
│  │  ├ index               
│  │  │  └ index.vue        
│  │  ├ list                
│  │  │  └ index.vue        
│  │  ├ login               
│  │  │  └ index.vue        
│  │  ├ user                
│  │  │  └ index.vue        
│  │  └ webview             
│  │     └ index.vue        
│  ├ static                 静态资源
│  │  ├ images              图片
│  │  ├ styles              样式
│  │  │  └ common.scss      
│  │  └ logo.png            
│  ├ store                  状态管理
│  │  ├ modules             
│  │  │  ├ app              
│  │  │  │  ├ index.ts      
│  │  │  │  └ types.ts      
│  │  │  └ user             
│  │  │     ├ index.ts      
│  │  │     └ types.ts      
│  │  └ index.ts            
│  ├ utils                  一些工具
│  │  ├ request             网络请求
│  │  │  ├ index.ts         
│  │  │  ├ interceptors.ts  
│  │  │  ├ status.ts        
│  │  │  └ type.ts          
│  │  ├ auth.ts             
│  │  ├ index.ts            
│  │  └ modals.ts           
│  ├ App.vue                
│  ├ main.ts                
│  ├ manifest.json          
│  ├ pages.json             
│  ├ permission.ts          页面访问权限控制
│  └ uni.scss               
├ types                     typescript类型文件
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