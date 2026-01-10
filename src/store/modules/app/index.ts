import type { AppState } from './types';
import { defineStore } from 'pinia';
import storage from '@/utils/storage';

// 缓存的主题
const THEME_KEY = 'app-theme';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as UniApp.GetSystemInfoResult,
    theme: storage.get(THEME_KEY) || 'light',
  }),
  getters: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      return this.systemInfo;
    },
    getTheme(): string {
      return this.theme;
    },
  },
  actions: {
    setSystemInfo(info: UniApp.GetSystemInfoResult) {
      this.systemInfo = info;
    },
    initSystemInfo() {
      uni.getSystemInfo({
        success: (res: UniApp.GetSystemInfoResult) => {
          this.setSystemInfo(res);
        },
        fail: (err: any) => {
          console.error(err);
        },
      });
    },
    /**
     * 设置主题
     */
    setTheme(theme: string) {
      this.theme = theme;

      // 保存到本地存储
      storage.set(THEME_KEY, this.theme);
    },
  },
});

export default useAppStore;
