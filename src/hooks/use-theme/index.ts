import type { ThemeMode } from '@/utils/theme/types';
import { computed } from 'vue';
import { useAppStore } from '@/store';

/**
 * 主题Hook
 */
export default function useTheme() {
  const appStore = useAppStore();

  // 当前主题模式
  const themeMode = computed(() => appStore.getThemeMode);

  // 是否为深色主题
  const isDark = computed(() => appStore.getIsDark);

  // 当前主题颜色
  const themeColors = computed(() => appStore.getThemeColors);

  /**
   * 设置主题模式
   */
  const setThemeMode = (mode: ThemeMode) => {
    appStore.setThemeMode(mode);
  };

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    appStore.toggleTheme();
  };

  /**
   * 获取主题颜色值
   */
  const getThemeColor = (key: keyof typeof themeColors.value) => {
    return themeColors.value[key];
  };

  return {
    themeMode,
    isDark,
    themeColors,
    setThemeMode,
    toggleTheme,
    getThemeColor,
  };
}
