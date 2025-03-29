import { currentRoute, isPathExists, isTabBarPath } from '@/router';

interface RouterOptions {
  success?: () => void;
  fail?: (err: any) => void;
  complete?: () => void;
}

interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * 将对象转换为查询字符串
 */
function stringifyQuery(params: QueryParams): string {
  const parts: string[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return parts.length ? `?${parts.join('&')}` : '';
}

/**
 * 将查询字符串转换为对象
 */
function parseQuery(query: string): QueryParams {
  const params: QueryParams = {};
  if (!query) return params;

  const search = query.startsWith('?') ? query.slice(1) : query;
  const parts = search.split('&');

  parts.forEach((part) => {
    const [key, value] = part.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });

  return params;
}

export default function useRouter() {
  /**
   * 获取当前路由
   */
  const getCurrentRoute = () => {
    return currentRoute();
  };

  /**
   * 获取当前路由参数
   */
  const getCurrentParams = (): QueryParams => {
    const route = getCurrentRoute();
    const query = route.split('?')[1] || '';
    return parseQuery(query);
  };

  /**
   * 判断路径是否存在
   */
  const checkPathExists = (path: string) => {
    return isPathExists(path);
  };

  /**
   * 判断是否是 tabbar 页面
   */
  const checkIsTabBar = (path: string) => {
    return isTabBarPath(path);
  };

  /**
   * 页面跳转
   */
  const push = (url: string, params?: QueryParams, options?: RouterOptions) => {
    const fullUrl = params ? `${url}${stringifyQuery(params)}` : url;
    if (!checkPathExists(url)) {
      options?.fail?.(new Error('页面不存在'));
      return;
    }

    uni.navigateTo({
      url: fullUrl,
      ...options,
    });
  };

  /**
   * 重定向页面
   */
  const replace = (url: string, params?: QueryParams, options?: RouterOptions) => {
    const fullUrl = params ? `${url}${stringifyQuery(params)}` : url;
    if (!checkPathExists(url)) {
      options?.fail?.(new Error('页面不存在'));
      return;
    }

    uni.redirectTo({
      url: fullUrl,
      ...options,
    });
  };

  /**
   * 切换 tabBar 页面
   */
  const switchTab = (url: string, params?: QueryParams, options?: RouterOptions) => {
    const fullUrl = params ? `${url}${stringifyQuery(params)}` : url;
    if (!checkIsTabBar(url)) {
      options?.fail?.(new Error('不是 tabBar 页面'));
      return;
    }

    uni.switchTab({
      url: fullUrl,
      ...options,
    });
  };

  /**
   * 返回上一页
   */
  const back = (delta = 1, options?: RouterOptions) => {
    uni.navigateBack({
      delta,
      ...options,
    });
  };

  /**
   * 重启动并打开页面
   */
  const reLaunch = (url: string, params?: QueryParams, options?: RouterOptions) => {
    const fullUrl = params ? `${url}${stringifyQuery(params)}` : url;
    if (!checkPathExists(url)) {
      options?.fail?.(new Error('页面不存在'));
      return;
    }

    uni.reLaunch({
      url: fullUrl,
      ...options,
    });
  };

  return {
    getCurrentRoute,
    getCurrentParams,
    checkPathExists,
    checkIsTabBar,
    push,
    replace,
    switchTab,
    back,
    reLaunch,
  };
}
