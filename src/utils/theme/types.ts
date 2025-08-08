export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // 主色调
  primary: string;
  primaryDark: string;
  success: string;
  warning: string;
  error: string;

  // 文字颜色
  mainColor: string;
  contentColor: string;
  tipsColor: string;
  lightColor: string;
  disabledColor: string;

  // 背景颜色
  bgColor: string;
  bgColorSecondary: string;
  bgColorTertiary: string;

  // 边框颜色
  borderColor: string;
  borderColorLight: string;

  // 阴影
  shadowColor: string;
  shadowColorLight: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
}
