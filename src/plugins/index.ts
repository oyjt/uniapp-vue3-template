import type { App } from 'vue';
import setupI18n from '@/locales';
import setupStore from '@/store';
import setupRequest from '@/utils/request';
import setupPermission from './permission';
import setupUI from './ui';

export default {
  install(app: App) {
    // UI扩展配置
    setupUI(app);
    // 状态管理
    setupStore(app);
    // 国际化
    setupI18n(app);
    // 路由拦截
    setupPermission();
    // 网络请求
    setupRequest();
  },
};
