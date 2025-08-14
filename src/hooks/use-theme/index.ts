import { computed } from 'vue';
import { useAppStore } from '@/store';

/**
 * 主题Hook
 */
export default function useTheme() {
  const appStore = useAppStore();

  // 当前主题
  const themeColor = computed(() => appStore.getTheme);

  /**
   * 设置主题模式
   */
  const setTheme = (color: string) => {
    appStore.setTheme(color);
  };

  return {
    setTheme,
    themeColor,
  };
}
