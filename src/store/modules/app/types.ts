import type { ThemeState } from '@/utils/theme/types';

export interface AppState {
  systemInfo: UniApp.GetSystemInfoResult;
  theme: ThemeState;
}
