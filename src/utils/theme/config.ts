import type { ThemeColors } from './types';

// 浅色主题
export const lightTheme: ThemeColors = {
  // 主色调
  primary: '#21d59d',
  primaryDark: '#76a3fd',
  success: '#3ed268',
  warning: '#fe9831',
  error: '#fa4e62',

  // 文字颜色
  mainColor: '#1b233b',
  contentColor: '#60687e',
  tipsColor: '#7e869a',
  lightColor: '#bdc3d2',
  disabledColor: '#dce0eb',

  // 背景颜色
  bgColor: '#ffffff',
  bgColorSecondary: '#f8f9fa',
  bgColorTertiary: '#f1f7f7',

  // 边框颜色
  borderColor: '#e9ecef',
  borderColorLight: '#f2f7f7',

  // 阴影
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowColorLight: 'rgba(0, 0, 0, 0.05)',
};

// 深色主题
export const darkTheme: ThemeColors = {
  // 主色调
  primary: '#21d59d',
  primaryDark: '#76a3fd',
  success: '#3ed268',
  warning: '#fe9831',
  error: '#fa4e62',

  // 文字颜色
  mainColor: '#ffffff',
  contentColor: '#b0b8c1',
  tipsColor: '#8a8f95',
  lightColor: '#6c757d',
  disabledColor: '#495057',

  // 背景颜色
  bgColor: '#1a1a1a',
  bgColorSecondary: '#2d2d2d',
  bgColorTertiary: '#3a3a3a',

  // 边框颜色
  borderColor: '#404040',
  borderColorLight: '#4a4a4a',

  // 阴影
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowColorLight: 'rgba(0, 0, 0, 0.2)',
};

// 主题配置
export const THEME_CONFIG = {
  // 主题切换动画时长
  transitionDuration: 300,
  // 主题存储键名
  storageKey: 'theme_mode',
  // 默认主题
  defaultMode: 'light' as const,
} as const;
