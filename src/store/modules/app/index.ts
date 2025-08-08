import type { AppState } from './types';
import type { ThemeColors, ThemeMode } from '@/utils/theme/types';
import { defineStore } from 'pinia';
import {
  applyTheme,
  getStoredThemeMode,
  getSystemTheme,
  getThemeColors,
  saveThemeMode,
} from '@/utils/theme';
import { lightTheme, THEME_CONFIG } from '@/utils/theme/config';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as UniApp.GetSystemInfoResult,
    theme: {
      mode: THEME_CONFIG.defaultMode,
      isDark: false,
      colors: lightTheme,
    },
  }),
  getters: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      return this.systemInfo;
    },
    getThemeMode(): ThemeMode {
      return this.theme.mode;
    },
    getIsDark(): boolean {
      return this.theme.isDark;
    },
    getThemeColors(): ThemeColors {
      return this.theme.colors;
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
      const storedMode = getStoredThemeMode();
      const finalMode = storedMode === 'auto' ? getSystemTheme() : storedMode;

      this.setThemeMode(finalMode);
    },
    /**
     * 设置主题模式
     */
    setThemeMode(mode: ThemeMode) {
      const isDark = mode === 'dark';
      const colors = getThemeColors(mode);

      this.theme.mode = mode;
      this.theme.isDark = isDark;
      this.theme.colors = colors;

      // 应用主题
      applyTheme(mode);

      // 保存到本地存储
      saveThemeMode(mode);
    },
    /**
     * 切换主题
     */
    toggleTheme() {
      const newMode = this.theme.isDark ? 'light' : 'dark';
      this.setThemeMode(newMode);
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
