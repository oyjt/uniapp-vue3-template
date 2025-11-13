/**
 * 剪切板
 * @example
 * const {setClipboardData, getClipboardData} = useClipboard()
 * // 设置剪切板
 * setClipboardData({data: '1234567890'})
 * // 获取剪切板
 * const data = await getClipboardData()
 */
export default function useClipboard() {
  const setClipboardData = ({ data, showToast = true }) => {
    return new Promise((resolve, reject) => {
      uni.setClipboardData({
        data,
        showToast,
        success: ({ data }) => resolve(data),
        fail: error => reject(error),
      });
    });
  };
  const getClipboardData = () => {
    return new Promise((resolve, reject) => {
      uni.getClipboardData({
        success: ({ data }) => resolve(data),
        fail: error => reject(error),
      });
    });
  };
  return {
    setClipboardData,
    getClipboardData,
  };
}
