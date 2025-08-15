import type { ThemeColors } from 'types/theme';

export interface AppState {
  systemInfo: UniApp.GetSystemInfoResult;
  theme: ThemeColors;
}
