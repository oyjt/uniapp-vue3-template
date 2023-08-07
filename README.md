### 使用uniapp+vite+vue3+uview-plus3.0 搭建的微信小程序快速开发模版

使用uniapp+vite+vue3+uview-plus3.0 搭建的H5和微信小程序快速开发模版

### 使用方法
```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev:h5

# 启动微信小程序
npm run dev:mp-weixin
```

### 发布
```bash
# 构建测试环境
npm run build:h5

# 构建生产环境
npm run build:mp-weixin
```