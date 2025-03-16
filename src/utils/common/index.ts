// 小程序更新检测
export function mpUpdate() {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate);
  });
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '检测到新版本，是否下载新版本并重启小程序？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false,
    });
  });
}

/**
 * @description 取一个区间数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function random(min: number, max: number) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}
