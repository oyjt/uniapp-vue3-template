import type { App } from 'vue';
import setupI18n from '@/locales';
import setupStore from '@/store';
import setupRequest from '@/utils/request';
import setupPermission from './permission';
import setupUI from './ui';

export default {
  install(app: App) {
    // UI扩展配置
    app.use(setupUI);
    // 状态管理
    app.use(setupStore);
    // 国际化
    app.use(setupI18n);
    // 路由拦截
    app.use(setupPermission);
    // 网络请求
    app.use(setupRequest);
  },
};
