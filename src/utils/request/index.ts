// 引入配置
import type { HttpRequestConfig } from 'uview-plus/libs/luch-request/index';
import { requestInterceptors, responseInterceptors } from './interceptors';
import type { IResponse } from './type';

// 引入拦截器配置
export function setupRequest() {
  uni.$u.http.setConfig((defaultConfig: HttpRequestConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_APP_BASE_API;
    return defaultConfig;
  });
  requestInterceptors();
  responseInterceptors();
}

export function request<T = any>(config: HttpRequestConfig): Promise<T> {
  return new Promise((resolve) => {
    uni.$u.http.request(config).then((res: IResponse) => {
      const { result } = res;
      resolve(result as T);
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
