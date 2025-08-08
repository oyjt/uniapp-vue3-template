import type { ThemeColors, ThemeMode } from './types';
import { darkTheme, lightTheme, THEME_CONFIG } from './config';

/**
 * 获取主题颜色
 */
export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === 'dark' ? darkTheme : lightTheme;
}

/**
 * 检测系统主题
 */
export function getSystemTheme(): 'light' | 'dark' {
  // #ifdef H5
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  // #endif

  // #ifdef MP-WEIXIN
  const systemInfo = uni.getSystemInfoSync();
  const theme = systemInfo.theme as string;
  return theme === 'dark' ? 'dark' : 'light';
  // #endif

  return 'light';
}

/**
 * 设置CSS变量
 */
export function setCSSVariables(colors: ThemeColors): void {
  // #ifdef H5
  if (typeof document !== 'undefined') {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }
  // #endif
}

/**
 * 应用主题
 */
export function applyTheme(mode: ThemeMode): void {
  const colors = getThemeColors(mode);
  setCSSVariables(colors);

  // 设置页面背景色
  // #ifdef H5
  if (typeof document !== 'undefined') {
    document.body.style.backgroundColor = colors.bgColor;
    document.body.style.color = colors.mainColor;
  }
  // #endif
}

/**
 * 获取存储的主题模式
 */
export function getStoredThemeMode(): ThemeMode {
  try {
    const stored = uni.getStorageSync(THEME_CONFIG.storageKey);
    return stored || THEME_CONFIG.defaultMode;
  }
  catch {
    return THEME_CONFIG.defaultMode;
  }
}

/**
 * 保存主题模式
 */
export function saveThemeMode(mode: ThemeMode): void {
  try {
    uni.setStorageSync(THEME_CONFIG.storageKey, mode);
  }
  catch (error) {
    console.error('保存主题模式失败:', error);
  }
}

/**
 * 初始化主题
 */
export function initTheme(): ThemeMode {
  const storedMode = getStoredThemeMode();
  const finalMode = storedMode === 'auto' ? getSystemTheme() : storedMode;

  applyTheme(finalMode);
  return finalMode;
}
