import type { ThemeColors } from 'types/theme';
import type { AppState } from './types';
import { defineStore } from 'pinia';
import {
  applyTheme,
  getStoredTheme,
  saveTheme,
} from '@/utils/theme';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as UniApp.GetSystemInfoResult,
    theme: getStoredTheme() || { primary: '#21d59d' },
  }),
  getters: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      return this.systemInfo;
    },
    getTheme(): ThemeColors {
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
     * 初始化主题
     */
    initTheme() {
      const theme = getStoredTheme();
      if (!theme) return;
      this.setTheme(theme);
    },
    /**
     * 设置主题
     */
    setTheme(theme: ThemeColors) {
      this.theme = Object.assign(this.theme, theme);

      // 应用主题
      applyTheme(this.theme);

      // 保存到本地存储
      saveTheme(this.theme);
    },
    checkUpdate() {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate((res: UniApp.OnCheckForUpdateResult) => {
        // 请求完新版本信息的回调

        console.log(res.hasUpdate);
      });
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用?',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
      updateManager.onUpdateFailed((res: any) => {
        console.error(res);
        // 新的版本下载失败
        uni.showToast({
          title: '更新失败',
          icon: 'error',
        });
      });
    },
  },
});

export default useAppStore;
