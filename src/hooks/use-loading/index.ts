/**
 * loading 提示框
 */

export default function useLoading() {
  const showLoading = (content = '加载中') => {
    uni.showLoading({
      title: content,
      mask: true,
    });
  };
  const hideLoading = () => {
    uni.hideLoading();
  };
  return {
    showLoading,
    hideLoading,
  };
}
