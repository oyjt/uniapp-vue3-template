/**
 * loading 提示框
 * @example
 * const {showLoading, hideLoading} = useLoading()
 * // 显示loading
 * showLoading()
 * // 隐藏loading
 * hideLoading()
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
