// 引入配置
import type { HttpRequestConfig, HttpResponse } from 'uview-plus/libs/luch-request/index';
import type { IResponse } from './type';
import Request from 'uview-plus/libs/luch-request/index';
import { requestInterceptors, responseInterceptors } from './interceptors';

const http = new Request();

// 引入拦截器配置
export function setupRequest() {
  http.setConfig((defaultConfig: HttpRequestConfig) => {
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

export function request<T = any>(config: HttpRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    http.request(config).then((res: HttpResponse<IResponse<T>>) => {
      console.log('[ res ] >', res);
      const { result } = res.data;
      resolve(result as T);
    }).catch((err) => {
      console.error('[ err ] >', err);
      reject(err);
    });
  });
}

export function get<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

export function post<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}

export function upload<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'UPLOAD' });
}

export function download<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'DOWNLOAD' });
}

export default setupRequest;
