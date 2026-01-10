export type ThemeMode = 'light' | 'dark' | 'auto';
export interface AppState {
  systemInfo: UniApp.GetSystemInfoResult;
  theme: string;
}
