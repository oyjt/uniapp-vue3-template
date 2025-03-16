import type { App } from 'vue';
import setupStore from '@/store';
import setupRequest from '@/utils/request';
import setupPermission from './permission';

export default {
  install(app: App) {
    // 状态管理
    setupStore(app);
    // 路由拦截
    setupPermission();
    // 网络请求
    setupRequest();
  },
};
