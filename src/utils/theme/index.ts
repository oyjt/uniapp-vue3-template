const ThemeKey = 'theme-color';

/**
 * 设置CSS变量
 */
export function setCSSVariable(color: string): void {
  // #ifdef H5
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const cssVar = `--theme-primary`;
    root.style.setProperty(cssVar, color);
  }
  // #endif
}

/**
 * 应用主题
 */
export function applyTheme(color?: string): void {
  if (!color) return;
  setCSSVariable(color);
}

/**
 * 获取存储的主题模式
 */
export function getStoredTheme() {
  try {
    const stored = uni.getStorageSync(ThemeKey);
    return stored;
  }
  catch {
    return null;
  }
}

/**
 * 保存主题模式
 */
export function saveTheme(color: string): void {
  try {
    uni.setStorageSync(ThemeKey, color);
  }
  catch (error) {
    console.error('保存主题失败:', error);
  }
}

/**
 * 初始化主题
 */
export function initTheme() {
  const themeColor = getStoredTheme();
  applyTheme(themeColor);
}
