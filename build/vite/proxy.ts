import type { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

const init = (env: Record<string, string>) => {
  const { VITE_APP_PROXY, VITE_API_PREFIX, VITE_MOCK_API_PREFIX, VITE_API_BASE_URL, VITE_MOCK_API_BASE_URL } = env;
  let config: ProxyTargetList = {};
  // 不使用代理直接返回空
  if (JSON.parse(VITE_APP_PROXY)) {
    config = {
      // test
      [VITE_API_PREFIX]: {
        target: VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^${VITE_API_PREFIX}`), ''),
      },
      // mock
      [VITE_MOCK_API_PREFIX]: {
        target: VITE_MOCK_API_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^${VITE_MOCK_API_PREFIX}`), ''),
      },
    };
  }
  return config;
};

export default init;
