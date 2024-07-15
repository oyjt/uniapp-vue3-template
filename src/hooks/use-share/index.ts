/**
 * 小程序分享
 */
interface UseShareOptions {
  title?: string;
  path?: string;
  query?: string;
  imageUrl?: string;
}

export default function useShare(options?: UseShareOptions) {
  // #ifdef MP-WEIXIN
  const title = options?.title ?? '';
  const path = options?.path ?? '';
  const query = options?.query ?? '';
  const imageUrl = options?.imageUrl ?? '';
  onShareAppMessage(() => {
    return {
      title,
      path: path ? `${path}${query ? `?${query}` : ''}` : '',
      imageUrl,
    };
  });
  onShareTimeline(() => {
    return {
      title,
      query: options?.query ?? '',
      imageUrl,
    };
  });
  // #endif
}
