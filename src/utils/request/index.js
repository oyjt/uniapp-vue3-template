import Request from 'uview-plus/libs/luch-request/index';
import { requestInterceptors, responseInterceptors } from './interceptors';

const http = new Request();

// 引入拦截器配置
export function setupRequest() {
  http.setConfig((defaultConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_API_BASE_URL;
    // #ifdef H5
    if (import.meta.env.VITE_APP_PROXY === 'true') {
      defaultConfig.baseURL = import.meta.env.VITE_API_PREFIX;
    }
    // #endif
    return defaultConfig;
  });
  requestInterceptors(http);
  responseInterceptors(http);
}

export function request(config) {
  return new Promise((resolve, reject) => {
    http.request(config).then((res) => {
      console.log('[ res ] >', res);
      const { result } = res.data;
      resolve(result);
    }).catch((err) => {
      console.error('[ err ] >', err);
      reject(err);
    });
  });
}

export function get(url, config) {
  return request({ ...config, url, method: 'GET' });
}
export function post(url, config) {
  return request({ ...config, url, method: 'POST' });
}
export function upload(url, config) {
  return request({ ...config, url, method: 'UPLOAD' });
}
export function download(url, config) {
  return request({ ...config, url, method: 'DOWNLOAD' });
}

export default setupRequest;
