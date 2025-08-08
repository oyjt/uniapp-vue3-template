import type { Theme } from './types';
import { defineStore } from 'pinia';

const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as Theme,
  }),
  actions: {
    // 初始化主题
    init() {
      // 尝试从本地存储获取
      const savedTheme = uni.getStorageSync('app-theme') as Theme;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        this.setTheme(savedTheme);
      }
      else {
      // 否则获取系统主题
        const systemInfo = uni.getSystemInfoSync();
        this.setTheme(systemInfo.theme as Theme || 'light');
      }

      // 监听系统主题变化
      uni.onThemeChange((res) => {
      // 仅当用户未手动选择时才跟随系统
        if (!uni.getStorageSync('app-theme')) {
          this.setTheme(res.theme);
        }
      });
    },

    // 设置主题
    setTheme(theme: Theme) {
      this.theme = theme;
      // 小程序中无法直接操作 page，class 的绑定将在页面层完成
      // 但我们需要将选择持久化
      uni.setStorageSync('app-theme', theme);
    },

    // 切换主题
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    },
  },
});

export default useThemeStore;
