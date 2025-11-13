export const createViteProxy = (env) => {
  const { VITE_APP_PROXY, VITE_API_PREFIX, VITE_API_BASE_URL } = env;
  // 不使用代理直接返回
  if (!JSON.parse(VITE_APP_PROXY)) return undefined;
  const proxy = {
    [VITE_API_PREFIX]: {
      target: VITE_API_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${VITE_API_PREFIX}`), ''),
    },
  };
  return proxy;
};
