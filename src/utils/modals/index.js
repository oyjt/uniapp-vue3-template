/**
 * 轻提示
 * @param {string} content 提示内容
 * @param {object} option 配置
 */
export function Toast(content, option = {}) {
  uni.showToast({
    title: content,
    icon: 'none',
    mask: true,
    duration: 1500,
    ...option,
  });
}

/**
 * Loading 提示框
 * @param {string} content 提示内容
 */
export const Loading = {
  show: (content = '加载中') => {
    uni.showLoading({
      title: content,
      mask: true,
    });
  },
  hide: () => {
    uni.hideLoading();
  },
};

/**
 * Dialog 提示框
 * @param {string} content 提示内容
 * @param {object} option 配置
 */
export function Dialog(content, option = {}) {
  option.showCancel = false;
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '温馨提示',
      content,
      showCancel: false,
      confirmColor: '#1677FF',
      success(res) {
        if (res.confirm)
          resolve(res);
      },
      fail() {
        reject(new Error('Alert 调用失败 !'));
      },
      ...option,
    });
  });
}
