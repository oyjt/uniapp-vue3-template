import type { ThemeMode } from '@/store/modules/app/types';
import { computed } from 'vue';
import { useAppStore } from '@/store';

/**
 * 主题Hook
 */
export default function useTheme() {
  const appStore = useAppStore();

  // 当前主题模式
  const theme = computed(() => appStore.getTheme);

  // 是否为深色主题
  const isDark = computed(() => appStore.getTheme === 'dark');

  /**
   * 设置主题
   */
  const setTheme = (mode: ThemeMode) => {
    appStore.setTheme(mode);
  };

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    appStore.setTheme(newTheme);
  };

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
