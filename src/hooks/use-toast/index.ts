/**
 * 提示消息 hook
 * @example
 * const {showToast} = useToast()
 * // 显示成功提示
 * showToast('操作成功', 'success')
 * // 显示错误提示
 * showToast('操作失败', 'error')
 * // 显示普通提示
 * showToast('提示信息')
 * // 自定义显示时长
 * showToast('提示信息', 'none', 3000)
 */
export default function useToast() {
  const showToast = (content: string, type: 'success' | 'error' | 'none' = 'none', duration: number = 1500) => {
    uni.showToast({
      title: content,
      icon: type,
      duration,
      mask: true,
    });
  };

  return {
    showToast,
  };
}
