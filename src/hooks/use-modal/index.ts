/**
 * Dialog 提示框
 */
export default function useModal() {
  const showModal = (content: string, options: UniApp.ShowModalOptions) => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title: '温馨提示',
        content,
        showCancel: false,
        confirmColor: '#1677FF',
        success: res => resolve(res),
        fail: () => reject(new Error('Alert 调用失败 !')),
        ...options,
      })
    })
  }
  return {
    showModal,
  }
}
