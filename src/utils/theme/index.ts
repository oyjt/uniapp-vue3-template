import type { ThemeColors } from 'types/theme';
import storage from '@/utils/storage';

const ThemeKey = 'theme';

/**
 * 设置CSS变量
 */
export function setCSSVariable(colors: ThemeColors): void {
  // #ifdef H5
  // H5：改 CSS 变量
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }
  // #endif

  // #ifndef H5
  // 微信小程序 & App（uView 提供的动态配置）
  if (uni.$u && typeof uni.$u.setConfig === 'function') {
    uni.$u.setConfig({
      config: {
        color: colors,
      },
    });
  }
  // #endif
}

/**
 * 应用主题
 */
export function applyTheme(theme: ThemeColors): void {
  setCSSVariable(theme);
}

/**
 * 获取存储的主题模式
 */
export function getStoredTheme() {
  try {
    const stored = storage.getJSON(ThemeKey);
    return stored;
  }
  catch {
    return null;
  }
}

/**
 * 保存主题
 */
export function saveTheme(theme: ThemeColors): void {
  try {
    storage.setJSON(ThemeKey, theme);
  }
  catch (error) {
    console.error('保存主题失败:', error);
  }
}
