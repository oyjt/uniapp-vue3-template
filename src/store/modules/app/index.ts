import type { AppState } from './types';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as UniApp.GetSystemInfoResult,
  }),
  getters: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      return this.systemInfo;
    },
  },
  actions: {
    setSystemInfo(info: UniApp.GetSystemInfoResult) {
      this.systemInfo = info;
    },
    initSystemInfo() {
      uni.getSystemInfo({
        success: (res: UniApp.GetSystemInfoResult) => {
          this.setSystemInfo(res);
        },
        fail: (err: any) => {
          console.error(err);
        },
      });
    },
    checkUpdate() {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate((res: UniApp.OnCheckForUpdateResult) => {
        // 请求完新版本信息的回调

        console.log(res.hasUpdate);
      });
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用?',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
      updateManager.onUpdateFailed((res: any) => {
        console.error(res);
        // 新的版本下载失败
        uni.showToast({
          title: '更新失败',
          icon: 'error',
        });
      });
    },
  },
});

export default useAppStore;
