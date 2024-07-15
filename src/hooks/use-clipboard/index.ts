/**
 * 剪切板
 */

interface SetClipboardDataOptions {
  data: string;
  showToast?: boolean;
}

export default function useClipboard() {
  const setClipboardData = ({ data, showToast = true }: SetClipboardDataOptions) => {
    return new Promise<string>((resolve, reject) => {
      uni.setClipboardData({
        data,
        showToast,
        success: ({ data }) => resolve(data),
        fail: error => reject(error),
      });
    });
  };
  const getClipboardData = () => {
    return new Promise<string>((resolve, reject) => {
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
