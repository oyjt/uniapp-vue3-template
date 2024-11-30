import type { ShareOptions } from './types';

/**
 * 小程序分享
 * @param {object} options
 * @example
 * // 必须要调用onShareAppMessage，onShareTimeline才能正常分享
 * // 因为小程序平台，必须在注册页面时，主动配置onShareAppMessage, onShareTimeline才可以
 * // 组合式API是运行时才能注册，框架不可能默认给每个页面都开启这两个分享，所以必须在页面代码里包含这两个API的字符串，才会主动去注册。
 * // 相关说明链接：https://ask.dcloud.net.cn/question/150353
 * const {onShareAppMessage, onShareTimeline} = useShare({title: '分享标题', path: 'pages/index/index', query: 'id=1', imageUrl: 'https://xxx.png'})
 * onShareAppMessage()
 * onShareTimeline()
 */
export default function useShare(options?: ShareOptions) {
  // #ifdef MP-WEIXIN
  const title = options?.title ?? '';
  const path = options?.path ?? '';
  const query = options?.query ?? '';
  const imageUrl = options?.imageUrl ?? '';

  const shareApp = (params: ShareOptions = {}) => {
    onShareAppMessage(() => {
      return {
        title,
        path: path ? `${path}${query ? `?${query}` : ''}` : '',
        imageUrl,
        ...params,
      };
    });
  };

  const shareTime = (params: ShareOptions = {}) => {
    onShareTimeline(() => {
      return {
        title,
        query: options?.query ?? '',
        imageUrl,
        ...params,
      };
    });
  };
  return {
    onShareAppMessage: shareApp,
    onShareTimeline: shareTime,
  };
  // #endif
}
