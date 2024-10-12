import type { App } from 'vue';
import { createPinia } from 'pinia';
// 数据持久化
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 导入子模块
import useAppStore from './modules/app';
import useUserStore from './modules/user';

// 安装pinia状态管理插件
function setupStore(app: App) {
  const store = createPinia();
  store.use(createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }));

  app.use(store);
}

// 导出模块
export { useAppStore, useUserStore };
export default setupStore;
