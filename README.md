### 使用uniapp+vite+vue3+uview-plus3.0 搭建的微信小程序快速开发模版

使用uniapp+vite+vue3+uview-plus3.0 搭建的H5和微信小程序快速开发模版

[uview-plus官方文档](https://uiadmin.net/uview-plus/)

### 待办完成

- [x] uview-plus3.0 ui库集成
- [x] 统一编译器规范
- [x] 多环境支持
- [x] pinia封装
- [x] 网络请求封装
- [x] 路径别名
- [x] 数据持久化
- [x] 自动导包
- [x] 代码格式校验
- [x] git提交格式校验
- [x] 集成ESLint、StyleLint、Prettier代码格式规范
- [x] 集成@uni-helper/uni-deploy和@uni-helper/uni-use

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
