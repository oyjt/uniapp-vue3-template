import type { AxiosResponse } from 'axios';
import type { IRequestConfig, IResponse } from './types';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import axios from 'axios';
import { requestInterceptors, responseInterceptors } from './interceptors';

// 引入拦截器配置
export function request<T = any>(config?: IRequestConfig): Promise<T> {
  let baseURL = import.meta.env.VITE_API_BASE_URL;
  // #ifdef H5
  if (import.meta.env.VITE_APP_PROXY === 'true') {
    baseURL = import.meta.env.VITE_API_PREFIX;
  }
  // #endif
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...config,
    adapter: createUniAppAxiosAdapter(),
  });

  requestInterceptors(instance);
  responseInterceptors(instance);

  return new Promise((resolve, reject) => {
    instance.request(config!).then((res: AxiosResponse<IResponse<T>>) => {
      console.log('[ res ] >', res);
      const { result } = res.data;
      resolve(result as T);
    }).catch((err: any) => {
      console.error('[ err ] >', err);
      reject(err);
    });
  });
};

export function get<T = any>(url: string, config?: IRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'get' });
}

export function post<T = any>(url: string, config?: IRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'post' });
}

// 将data转换为FormData
const transformFromData = (data: { [key: string]: string }) => {
  const formData = new FormData();
  for (const key in data) {
    data[key] && formData.append(key, data[key]);
  }
  return formData;
};

export function upload<T = any>(url: string, config?: IRequestConfig): Promise<T> {
  if (config?.data) {
    config.data = transformFromData(config?.data);
  }
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    ...config,
    url,
    method: 'upload',
  });
}

export function download<T = any>(url: string, config?: IRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'download' });
}
